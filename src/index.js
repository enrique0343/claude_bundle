const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json; charset=utf-8' },
  });
}

// ── Odoo helpers ─────────────────────────────────────────────────────────────

async function authenticate(env) {
  const res = await fetch(`${env.ODOO_URL}/jsonrpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0', method: 'call',
      params: { service: 'common', method: 'authenticate',
        args: [env.ODOO_DB, env.ODOO_USER, env.ODOO_PASSWORD, {}] },
    }),
  });
  const j = await res.json();
  if (!j.result) throw new Error('Autenticación fallida en Odoo');
  return j.result;
}

async function odooCall(env, model, method, args = [], kwargs = {}) {
  const uid = await authenticate(env);
  const res = await fetch(`${env.ODOO_URL}/jsonrpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0', method: 'call',
      params: { service: 'object', method: 'execute_kw',
        args: [env.ODOO_DB, uid, env.ODOO_PASSWORD, model, method, args, kwargs] },
    }),
  });
  const j = await res.json();
  if (j.error) throw new Error(j.error.data?.message || 'Odoo RPC error');
  return j.result;
}

// ── Odoo → D1: snapshot semanal ───────────────────────────────────────────────

async function snapshotSemanal(env) {
  const today = new Date().toISOString().split('T')[0];
  const d = new Date();
  const week = `${d.getFullYear()}-W${String(getISOWeek(d)).padStart(2, '0')}`;

  // Stock disponible consolidado
  const quants = await odooCall(env, 'stock.quant', 'search_read',
    [[['location_id.usage', '=', 'internal']]],
    { fields: ['product_id', 'quantity', 'reserved_quantity', 'company_id'], limit: 5000 }
  );

  let valor_inventario = 0;
  quants.forEach(q => { valor_inventario += (q.quantity - q.reserved_quantity) * 0; }); // costo no disponible vía RPC básico

  // OCs confirmadas
  const ocs = await odooCall(env, 'purchase.order', 'search_read',
    [[['state', 'in', ['purchase', 'done']]]],
    { fields: ['amount_total'], limit: 1000 }
  );
  const gasto_compras = ocs.reduce((s, o) => s + o.amount_total, 0);

  // Lotes por vencer
  const hoy = new Date();
  const en30 = new Date(hoy.getTime() + 30 * 86400000).toISOString().split('T')[0] + ' 23:59:59';
  const lotes30 = await odooCall(env, 'stock.lot', 'search_read',
    [[['expiration_date', '<=', en30], ['expiration_date', '!=', false]]],
    { fields: ['id', 'name', 'product_id', 'expiration_date', 'product_qty'], limit: 500 }
  );

  await env.DB.prepare(`
    INSERT INTO kpi_semanal
      (semana, fecha_corte, gasto_compras, fugas_mes)
    VALUES (?, ?, ?, 0)
    ON CONFLICT(semana, company_id) DO UPDATE SET
      gasto_compras = excluded.gasto_compras,
      fecha_corte   = excluded.fecha_corte
  `).bind(week, today, gasto_compras).run();

  // Guardar lotes por vencer como alertas si no existen hoy
  for (const l of lotes30.slice(0, 50)) {
    const vencido = new Date(l.expiration_date) < hoy;
    await env.DB.prepare(`
      INSERT INTO alertas (fecha, tipo, severidad, producto_id, producto, detalle, valor_usd)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `).bind(
      today,
      'VENCIMIENTO',
      vencido ? 'CRITICO' : 'ADVERTENCIA',
      l.product_id[0],
      l.product_id[1],
      JSON.stringify({ lote: l.name, fecha_venc: l.expiration_date, qty: l.product_qty })
    ).run();
  }

  return { semana: week, gasto_compras, lotes_riesgo: lotes30.length };
}

function getISOWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}

// ── Router principal ──────────────────────────────────────────────────────────

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS });

  // Dashboard HTML
  if (path === '/' || path === '/index.html') return env.ASSETS.fetch(request);

  // ── Health ────────────────────────────────────────────────────────────────
  if (path === '/health') {
    return json({ status: 'ok', db: env.ODOO_DB, ts: new Date().toISOString() });
  }

  // ── Odoo live ─────────────────────────────────────────────────────────────
  if (path === '/stock' && request.method === 'GET') {
    const companyId = url.searchParams.get('company_id');
    const domain = companyId
      ? [['company_id', '=', parseInt(companyId)], ['qty_available', '>', 0]]
      : [['qty_available', '>', 0]];
    const records = await odooCall(env, 'product.product', 'search_read', [domain], {
      fields: ['id', 'name', 'qty_available', 'virtual_available', 'uom_id'], limit: 100,
    });
    return json({ count: records.length, records });
  }

  if (path === '/purchases' && request.method === 'GET') {
    const state = url.searchParams.get('state') || 'purchase';
    const records = await odooCall(env, 'purchase.order', 'search_read',
      [[['state', '=', state]]],
      { fields: ['id', 'name', 'partner_id', 'date_order', 'amount_total', 'state'],
        limit: 50, order: 'date_order desc' }
    );
    return json({ count: records.length, records });
  }

  if (path === '/expiring' && request.method === 'GET') {
    const days = parseInt(url.searchParams.get('days') || '30');
    const limit = new Date(Date.now() + days * 86400000).toISOString().split('T')[0] + ' 23:59:59';
    const records = await odooCall(env, 'stock.lot', 'search_read',
      [[['expiration_date', '<=', limit], ['expiration_date', '!=', false]]],
      { fields: ['id', 'name', 'product_id', 'expiration_date', 'product_qty'],
        limit: 100, order: 'expiration_date asc' }
    );
    return json({ days_ahead: days, count: records.length, records });
  }

  // ── D1: KPIs ──────────────────────────────────────────────────────────────
  if (path === '/d1/kpis' && request.method === 'GET') {
    const limit = parseInt(url.searchParams.get('limit') || '13');
    const { results } = await env.DB.prepare(
      'SELECT * FROM kpi_semanal ORDER BY semana DESC LIMIT ?'
    ).bind(limit).all();
    return json({ count: results.length, results });
  }

  if (path === '/d1/kpis' && request.method === 'POST') {
    const body = await request.json();
    const { semana, fecha_corte, company_id = 0, valor_inventario = 0,
      capital_riesgo = 0, ahorro_potencial = 0, fugas_mes = 0,
      continuidad_pct = 0, gasto_compras = 0, consumo_operativo = 0 } = body;
    if (!semana || !fecha_corte) return json({ error: 'semana y fecha_corte son requeridos' }, 400);
    await env.DB.prepare(`
      INSERT INTO kpi_semanal
        (semana, fecha_corte, company_id, valor_inventario, capital_riesgo,
         ahorro_potencial, fugas_mes, continuidad_pct, gasto_compras, consumo_operativo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(semana, company_id) DO UPDATE SET
        valor_inventario  = excluded.valor_inventario,
        capital_riesgo    = excluded.capital_riesgo,
        ahorro_potencial  = excluded.ahorro_potencial,
        fugas_mes         = excluded.fugas_mes,
        continuidad_pct   = excluded.continuidad_pct,
        gasto_compras     = excluded.gasto_compras,
        consumo_operativo = excluded.consumo_operativo,
        fecha_corte       = excluded.fecha_corte
    `).bind(semana, fecha_corte, company_id, valor_inventario, capital_riesgo,
             ahorro_potencial, fugas_mes, continuidad_pct, gasto_compras, consumo_operativo).run();
    return json({ ok: true, semana });
  }

  // ── D1: Alertas ───────────────────────────────────────────────────────────
  if (path === '/d1/alertas' && request.method === 'GET') {
    const tipo      = url.searchParams.get('tipo');
    const resuelta  = url.searchParams.get('resuelta') ?? '0';
    const limit     = parseInt(url.searchParams.get('limit') || '50');
    let q = 'SELECT * FROM alertas WHERE resuelta = ?';
    const params = [parseInt(resuelta)];
    if (tipo) { q += ' AND tipo = ?'; params.push(tipo); }
    q += ' ORDER BY created_at DESC LIMIT ?';
    params.push(limit);
    const { results } = await env.DB.prepare(q).bind(...params).all();
    return json({ count: results.length, results });
  }

  if (path === '/d1/alertas' && request.method === 'POST') {
    const body = await request.json();
    const { fecha, tipo, severidad, producto_id = null, producto, sede = null,
      detalle = null, valor_usd = 0 } = body;
    if (!fecha || !tipo || !severidad || !producto) return json({ error: 'Campos requeridos: fecha, tipo, severidad, producto' }, 400);
    const { meta } = await env.DB.prepare(`
      INSERT INTO alertas (fecha, tipo, severidad, producto_id, producto, sede, detalle, valor_usd)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(fecha, tipo, severidad, producto_id, producto, sede,
             detalle ? JSON.stringify(detalle) : null, valor_usd).run();
    return json({ ok: true, id: meta.last_row_id });
  }

  if (path.startsWith('/d1/alertas/') && request.method === 'PUT') {
    const id = parseInt(path.split('/')[3]);
    const body = await request.json();
    await env.DB.prepare(
      'UPDATE alertas SET resuelta = ? WHERE id = ?'
    ).bind(body.resuelta ? 1 : 0, id).run();
    return json({ ok: true, id });
  }

  // ── D1: Acuerdos ──────────────────────────────────────────────────────────
  if (path === '/d1/acuerdos' && request.method === 'GET') {
    const estado = url.searchParams.get('estado');
    let q = 'SELECT * FROM acuerdos';
    const params = [];
    if (estado) { q += ' WHERE estado = ?'; params.push(estado); }
    q += ' ORDER BY plazo ASC';
    const { results } = await env.DB.prepare(q).bind(...params).all();
    return json({ count: results.length, results });
  }

  if (path === '/d1/acuerdos' && request.method === 'POST') {
    const { fecha_comite, titulo, responsable, plazo, estado = 'pendiente',
      impacto_usd = 0, notas } = await request.json();
    if (!fecha_comite || !titulo) return json({ error: 'fecha_comite y titulo son requeridos' }, 400);
    const { meta } = await env.DB.prepare(`
      INSERT INTO acuerdos (fecha_comite, titulo, responsable, plazo, estado, impacto_usd, notas)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(fecha_comite, titulo, responsable, plazo, estado, impacto_usd, notas).run();
    return json({ ok: true, id: meta.last_row_id });
  }

  if (path.startsWith('/d1/acuerdos/') && request.method === 'PUT') {
    const id = parseInt(path.split('/')[3]);
    const { estado, notas } = await request.json();
    await env.DB.prepare(`
      UPDATE acuerdos SET estado = ?, notas = ?, updated_at = datetime('now') WHERE id = ?
    `).bind(estado, notas, id).run();
    return json({ ok: true, id });
  }

  // ── D1: Snapshot desde Odoo → D1 ─────────────────────────────────────────
  if (path === '/d1/snapshot' && request.method === 'POST') {
    const result = await snapshotSemanal(env);
    return json({ ok: true, ...result });
  }

  return json({ error: 'Endpoint no encontrado' }, 404);
}

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env);
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }
  },
};

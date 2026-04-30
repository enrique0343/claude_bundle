const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function odooCall(env, model, method, args = [], kwargs = {}) {
  const uid = await authenticate(env);
  const body = JSON.stringify({
    jsonrpc: '2.0',
    method: 'call',
    params: {
      service: 'object',
      method: 'execute_kw',
      args: [env.ODOO_DB, uid, env.ODOO_PASSWORD, model, method, args, kwargs],
    },
  });

  const res = await fetch(`${env.ODOO_URL}/jsonrpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const json = await res.json();
  if (json.error) throw new Error(json.error.data?.message || 'Odoo RPC error');
  return json.result;
}

async function authenticate(env) {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    method: 'call',
    params: {
      service: 'common',
      method: 'authenticate',
      args: [env.ODOO_DB, env.ODOO_USER, env.ODOO_PASSWORD, {}],
    },
  });

  const res = await fetch(`${env.ODOO_URL}/jsonrpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const json = await res.json();
  if (!json.result) throw new Error('Autenticación fallida en Odoo');
  return json.result;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json; charset=utf-8' },
  });
}

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  // GET /health
  if (path === '/health') {
    return json({ status: 'ok', db: env.ODOO_DB });
  }

  // GET /stock — stock disponible por producto
  if (path === '/stock' && request.method === 'GET') {
    const companyId = url.searchParams.get('company_id');
    const domain = companyId
      ? [['company_id', '=', parseInt(companyId)], ['qty_available', '>', 0]]
      : [['qty_available', '>', 0]];

    const records = await odooCall(env, 'product.product', 'search_read', [domain], {
      fields: ['id', 'name', 'qty_available', 'virtual_available', 'uom_id'],
      limit: 100,
    });
    return json({ count: records.length, records });
  }

  // GET /purchases — órdenes de compra activas
  if (path === '/purchases' && request.method === 'GET') {
    const state = url.searchParams.get('state') || 'purchase';
    const records = await odooCall(env, 'purchase.order', 'search_read',
      [[['state', '=', state]]],
      {
        fields: ['id', 'name', 'partner_id', 'date_order', 'amount_total', 'state'],
        limit: 50,
        order: 'date_order desc',
      }
    );
    return json({ count: records.length, records });
  }

  // GET /expiring — productos próximos a vencer (lotes con fecha <= 30 días)
  if (path === '/expiring' && request.method === 'GET') {
    const days = parseInt(url.searchParams.get('days') || '30');
    const today = new Date();
    const limit = new Date(today.getTime() + days * 86400000);
    const dateStr = limit.toISOString().split('T')[0] + ' 23:59:59';

    const records = await odooCall(env, 'stock.lot', 'search_read',
      [[['expiration_date', '<=', dateStr], ['expiration_date', '!=', false]]],
      {
        fields: ['id', 'name', 'product_id', 'expiration_date', 'product_qty'],
        limit: 100,
        order: 'expiration_date asc',
      }
    );
    return json({ days_ahead: days, count: records.length, records });
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

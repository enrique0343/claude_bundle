#!/usr/bin/env python3
"""
refresh_dashboard.py — Genera un nuevo dashboard ejecutivo Avante para hoy.

Pasos que ejecuta:
  1. Crea reports/YYYY-MM-DD/
  2. Copia y adapta los scripts del ciclo anterior (parchea BASE en generate_dashboard.py)
  3. ETL 1 — inventario, orderpoints, OCs, alertas, maestro_precios
  4. ETL 2 — histórico semanal (inventario, compras, consumo, lead time, fugas)
  5. ETL 3 — consumo y compras detallados (02, 02b, 02c, 03)
  6. ETL 4 — reconciliación auditoría (07_reconciliacion_inventario_vs_cargos.csv)
  7. Copia cartera_iniciativas.csv del ciclo anterior (editar si hay cambios PMO)
  8. Copia hist acumulativos (hist_precios, hist_cambios_precio, hist_valor_compuesto)
  9. Ejecuta generate_dashboard.py con el directorio correcto
 10. Imprime la ruta del dashboard generado

Uso:
  python3 refresh_dashboard.py              # usa fecha de hoy
  python3 refresh_dashboard.py 2026-05-15   # fuerza una fecha específica
"""
import os, sys, shutil, subprocess, csv, psycopg2, datetime
from pathlib import Path

# ── rutas base ─────────────────────────────────────────────────────────────────
BUNDLE   = Path(__file__).parent
REPORTS  = BUNDLE / 'reports'
DOCS     = BUNDLE / 'docs'
ENV_FILE = BUNDLE / '.env'

# ── fecha de corte ─────────────────────────────────────────────────────────────
import re as _re
_arg = sys.argv[1] if len(sys.argv) > 1 else ''
if _arg and not _re.match(r'^\d{4}-\d{2}-\d{2}$', _arg):
    print(f"Uso: python3 refresh_dashboard.py [YYYY-MM-DD]")
    sys.exit(0)
TODAY = _arg or datetime.date.today().isoformat()

# ── cargar .env ────────────────────────────────────────────────────────────────
if ENV_FILE.exists():
    for ln in open(ENV_FILE):
        if '=' in ln and not ln.strip().startswith('#'):
            k, v = ln.strip().split('=', 1)
            os.environ.setdefault(k, v.strip('"').strip("'"))

PG_URL = os.getenv('ODOO_PG_READONLY_URL', '')
if 'sslmode=require' in PG_URL:
    PG_URL = PG_URL.replace('?sslmode=require', '?sslmode=disable')

print(f"\n{'='*60}")
print(f"  REFRESH DASHBOARD — Avante · {TODAY}")
print(f"{'='*60}\n")

# ── 1. directorio de salida ────────────────────────────────────────────────────
OUT = REPORTS / TODAY
OUT.mkdir(parents=True, exist_ok=True)
print(f"[1/9] Directorio: {OUT}")

# ── identificar el ciclo anterior (el más reciente antes de hoy) ──────────────
prev_dirs = sorted([d for d in REPORTS.iterdir()
                    if d.is_dir() and d.name < TODAY], reverse=True)
PREV = prev_dirs[0] if prev_dirs else None
print(f"      Ciclo anterior: {PREV.name if PREV else 'ninguno'}")

# ── 2. copiar y adaptar scripts ───────────────────────────────────────────────
SCRIPTS = [
    'etl_inventario_compras_odoo.py',
    'etl_historico_odoo.py',
    'etl_detalle_odoo_extendido.py',
    'generate_dashboard.py',
]

print(f"\n[2/9] Copiando y adaptando scripts...")
if PREV:
    for s in SCRIPTS:
        src = PREV / s
        dst = OUT  / s
        if src.exists():
            text = src.read_text(encoding='utf-8')
            # Parchear BASE hardcodeado
            old_base = f"BASE = '{str(PREV)}/'"
            new_base = f"BASE = '{str(OUT)}/'"
            text = text.replace(old_base, new_base)
            old_base2 = f'BASE = "{str(PREV)}/"'
            new_base2 = f'BASE = "{str(OUT)}/"'
            text = text.replace(old_base2, new_base2)
            # Parchear nombre del dashboard HTML hardcodeado (dashboard_avante_YYYY-MM-DD.html)
            text = text.replace(
                f"dashboard_avante_{PREV.name}.html",
                f"dashboard_avante_{TODAY}.html"
            )
            dst.write_text(text, encoding='utf-8')
            print(f"      ✓ {s}")
        else:
            print(f"      ⚠ {s} no encontrado en ciclo anterior")
else:
    print("      ⚠ Sin ciclo anterior — copia los scripts manualmente a:", OUT)

# ── 3-5. ejecutar los 3 ETLs de Odoo ─────────────────────────────────────────
etls = [
    ('ETL 1 · Inventario + Compras snapshot',  'etl_inventario_compras_odoo.py'),
    ('ETL 2 · Histórico semanal',              'etl_historico_odoo.py'),
    ('ETL 3 · Consumo y Compras detallados',   'etl_detalle_odoo_extendido.py'),
]
for i, (label, script) in enumerate(etls, 3):
    print(f"\n[{i}/9] {label}...")
    script_path = OUT / script
    if not script_path.exists():
        print(f"      ⚠ {script} no existe en {OUT} — omitiendo")
        continue
    result = subprocess.run(
        [sys.executable, str(script_path)],
        capture_output=False, text=True
    )
    if result.returncode != 0:
        print(f"      ✗ Error en {script} (returncode={result.returncode})")
    else:
        print(f"      ✓ {label} completado")

# ── 6. ETL 4: reconciliación auditoría ───────────────────────────────────────
print(f"\n[6/9] ETL 4 · Reconciliación auditoría (07_reconciliacion_inventario_vs_cargos.csv)...")
CATEG_IDS = (172, 175, 176)   # INSUMOS · MEDICAMENTOS · MEDICAMENTOS CONTROLADOS
HPT = 'medicament'
AUDIT_CSV = OUT / '07_reconciliacion_inventario_vs_cargos.csv'

SQL_AUDIT = """
WITH despachos AS (
    SELECT
        sm.hospitalization_id                               AS hosp_fk,
        sm.company_id,
        sm.product_id,
        MAX(sm.date::date)                                  AS move_date,
        MAX(COALESCE(ori.complete_name, ori.name, ''))      AS origin_location,
        SUM(sm.product_qty)                                 AS qty_dispensed,
        AVG(ROUND(COALESCE(
            (pp.standard_price->>sm.company_id::text)::numeric, 0
        ), 4))                                              AS cost_unit
    FROM stock_move sm
    JOIN stock_location dst  ON dst.id = sm.location_dest_id
    JOIN stock_location ori  ON ori.id = sm.location_id
    JOIN product_product pp  ON pp.id  = sm.product_id
    JOIN product_template pt ON pt.id  = pp.product_tmpl_id
    JOIN product_category pc ON pc.id  = pt.categ_id
    WHERE sm.state = 'done'
      AND dst.usage = 'customer'
      AND sm.hospitalization_id IS NOT NULL
      AND sm.company_id IN (1, 2)
      AND pt.categ_id IN %(categ)s
      AND pt.hospital_product_type = %(hpt)s
      AND sm.date >= NOW() - INTERVAL '6 months'
    GROUP BY sm.hospitalization_id, sm.company_id, sm.product_id
),
cargos AS (
    SELECT
        hcl.hospitalization_id  AS hosp_fk,
        hcl.product_id,
        SUM(hcl.qty)            AS qty_charged,
        SUM(hcl.subtotal)       AS valor_cobrado
    FROM hms_consumable_line hcl
    WHERE hcl.hospitalization_id IS NOT NULL
      AND hcl.create_date >= NOW() - INTERVAL '7 months'
    GROUP BY hcl.hospitalization_id, hcl.product_id
)
SELECT
    ah.name                                                         AS hospitalization_id,
    CASE WHEN d.company_id=1 THEN 'AVANTE CENTRO MEDICO ESPECIALIZADO'
         WHEN d.company_id=2 THEN 'Avante Hospital Especializado'
         ELSE '' END                                                AS company,
    ah.state                                                        AS hosp_state,
    d.move_date,
    COALESCE(pp.default_code, '')                                   AS internal_ref,
    COALESCE(pt.name->>'es_419', pt.name->>'en_US', '')             AS product_name,
    COALESCE(pc.complete_name, pc.name, '')                         AS category,
    d.origin_location,
    ROUND(d.qty_dispensed::numeric, 2)                              AS qty_dispensed,
    ROUND(COALESCE(c.qty_charged, 0)::numeric, 2)                   AS qty_charged,
    ROUND((d.qty_dispensed - COALESCE(c.qty_charged, 0))::numeric, 2) AS diferencia,
    d.cost_unit,
    ROUND((d.qty_dispensed * d.cost_unit)::numeric, 2)              AS total_cost,
    ROUND(((d.qty_dispensed - COALESCE(c.qty_charged, 0)) * d.cost_unit)::numeric, 2) AS valor_fuga_costo,
    CASE
        WHEN c.qty_charged IS NULL                             THEN 'SIN CARGO'
        WHEN d.qty_dispensed > COALESCE(c.qty_charged, 0)     THEN 'FUGA PARCIAL'
        WHEN d.qty_dispensed < COALESCE(c.qty_charged, 0)     THEN 'CARGO > DESPACHO'
        ELSE 'OK'
    END AS estado
FROM despachos d
JOIN acs_hospitalization ah ON ah.id = d.hosp_fk
JOIN product_product pp     ON pp.id = d.product_id
JOIN product_template pt    ON pt.id = pp.product_tmpl_id
JOIN product_category pc    ON pc.id = pt.categ_id
LEFT JOIN cargos c ON c.hosp_fk = d.hosp_fk AND c.product_id = d.product_id
ORDER BY d.move_date DESC, ah.name, pt.name->>'es_419'
"""

try:
    conn = psycopg2.connect(PG_URL)
    conn.set_session(readonly=True, autocommit=True)
    cur = conn.cursor()
    cur.execute(SQL_AUDIT, {'categ': CATEG_IDS, 'hpt': HPT})
    rows = cur.fetchall()
    header = ['hospitalization_id','company','hosp_state','move_date','internal_ref',
              'product_name','category','origin_location','qty_dispensed','qty_charged',
              'diferencia','cost_unit','total_cost','valor_fuga_costo','estado']
    with open(AUDIT_CSV, 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(rows)
    print(f"      ✓ 07_reconciliacion_inventario_vs_cargos.csv: {len(rows):,} filas")
    conn.close()
except Exception as e:
    print(f"      ✗ Error generando auditoría: {e}")
    # Si falla, copiar del ciclo anterior para que el dashboard no falle
    if PREV and (PREV / '07_reconciliacion_inventario_vs_cargos.csv').exists():
        shutil.copy(PREV / '07_reconciliacion_inventario_vs_cargos.csv', AUDIT_CSV)
        print(f"      ⚠ Usando reconciliación del ciclo anterior ({PREV.name})")

# ── 7. cartera_iniciativas.csv (manual) ──────────────────────────────────────
print(f"\n[7/9] Cartera PMO (cartera_iniciativas.csv)...")
cartera_dst = OUT / 'cartera_iniciativas.csv'
if not cartera_dst.exists():
    if PREV and (PREV / 'cartera_iniciativas.csv').exists():
        shutil.copy(PREV / 'cartera_iniciativas.csv', cartera_dst)
        print(f"      ✓ Copiada del ciclo anterior ({PREV.name})")
        print(f"      ⚠ ACCIÓN MANUAL: actualiza {cartera_dst} si hay nuevas iniciativas")
    else:
        # Crear archivo vacío con headers correctos
        with open(cartera_dst, 'w', newline='', encoding='utf-8') as f:
            csv.writer(f).writerow([
                'id','nombre','area','dueno','estado','prioridad','fecha_inicio',
                'fecha_objetivo','siguiente_hito','fecha_hito','valor_esperado_usd',
                'valor_capturado_usd','KPI_objetivo','riesgo_jci','dependencias',
                'comite_origen','riesgo','bloqueo','decision_requerida',
                'fuente_origen','ultima_actualizacion','documento_soporte'
            ])
        print(f"      ✓ Archivo vacío creado — agrega iniciativas manualmente")
else:
    print(f"      ✓ Ya existe en {OUT}")

# ── 8. históricos acumulativos ────────────────────────────────────────────────
print(f"\n[8/9] Históricos acumulativos (carryover desde ciclo anterior)...")
HIST_ACUM = ['hist_precios_productos.csv', 'hist_cambios_precio.csv', 'hist_valor_compuesto.csv']
if PREV:
    for h in HIST_ACUM:
        src = PREV / h
        dst = OUT  / h
        if src.exists() and not dst.exists():
            shutil.copy(src, dst)
            print(f"      ✓ {h} ({src.stat().st_size//1024} KB copiado)")
        elif dst.exists():
            print(f"      ✓ {h} ya existe")
        else:
            # Buscar en _backup_113d del ciclo anterior
            backup = PREV / '_backup_113d' / h
            if backup.exists():
                shutil.copy(backup, dst)
                print(f"      ✓ {h} (desde _backup_113d)")
            else:
                print(f"      ⚠ {h} no encontrado — se creará desde cero")
else:
    print("      ⚠ Sin ciclo anterior — los históricos acumulativos empezarán desde cero")

# ── 9. generar el dashboard ───────────────────────────────────────────────────
print(f"\n[9/9] Generando dashboard HTML...")
gen_script = OUT / 'generate_dashboard.py'
if not gen_script.exists():
    print(f"      ✗ generate_dashboard.py no encontrado en {OUT}")
    print(f"        Cópialo manualmente y ajusta BASE = '{OUT}/'")
    sys.exit(1)

result = subprocess.run(
    [sys.executable, str(gen_script)],
    capture_output=False, text=True
)
if result.returncode != 0:
    print(f"      ✗ Error en generate_dashboard.py (returncode={result.returncode})")
    sys.exit(1)

# ── helpers GitHub Pages ───────────────────────────────────────────────────────
def _update_index(date_iso: str, html_filename: str):
    """Registra el nuevo dashboard en docs/index.html (array DASHBOARDS)."""
    index_path = DOCS / 'index.html'
    if not index_path.exists():
        print(f"        ⚠ docs/index.html no encontrado — omitiendo registro")
        return

    content = index_path.read_text(encoding='utf-8')
    marker = 'const DASHBOARDS = ['
    if marker not in content:
        print(f"        ⚠ Marcador DASHBOARDS no encontrado en index.html")
        return

    if f"date:  '{date_iso}'" in content or f'date: "{date_iso}"' in content:
        print(f"        ✓ Fecha {date_iso} ya registrada en index.html")
        return

    new_entry = (
        f"\n    {{\n"
        f"      date:  '{date_iso}',\n"
        f"      file:  '{date_iso}/{html_filename}',\n"
        f"      label: 'Dashboard operativo · generado {date_iso}'\n"
        f"    }},"
    )
    content = content.replace(marker, marker + new_entry, 1)
    index_path.write_text(content, encoding='utf-8')
    print(f"        ✓ Registrado en docs/index.html")

# ── resultado ─────────────────────────────────────────────────────────────────
dashboard = OUT / f'dashboard_avante_{TODAY}.html'
if not dashboard.exists():
    htmls = list(OUT.glob('dashboard*.html'))
    dashboard = htmls[0] if htmls else None

print(f"\n{'='*60}")
print(f"  ✅ DASHBOARD GENERADO")
if dashboard:
    print(f"  📄 {dashboard}")
else:
    print(f"  ⚠ HTML no encontrado en {OUT}")
print(f"{'='*60}\n")

# ── 10. publicar en docs/ para GitHub Pages ────────────────────────────────────
if dashboard and dashboard.exists():
    print(f"[10/10] Publicando en docs/ para GitHub Pages...")
    docs_day = DOCS / TODAY
    docs_day.mkdir(parents=True, exist_ok=True)
    shutil.copy(dashboard, docs_day / dashboard.name)
    print(f"        ✓ Copiado: docs/{TODAY}/{dashboard.name}")
    _update_index(TODAY, dashboard.name)
else:
    print(f"[10/10] ⚠ Sin dashboard que publicar en docs/")

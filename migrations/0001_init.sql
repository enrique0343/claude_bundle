-- KPIs semanales de inventario
CREATE TABLE IF NOT EXISTS kpi_semanal (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  semana      TEXT NOT NULL,          -- ISO week: '2026-W18'
  fecha_corte TEXT NOT NULL,          -- '2026-04-30'
  company_id  INTEGER DEFAULT 0,      -- 0 = consolidado
  valor_inventario  REAL DEFAULT 0,
  capital_riesgo    REAL DEFAULT 0,
  ahorro_potencial  REAL DEFAULT 0,
  fugas_mes         REAL DEFAULT 0,
  continuidad_pct   REAL DEFAULT 0,
  gasto_compras     REAL DEFAULT 0,
  consumo_operativo REAL DEFAULT 0,
  created_at  TEXT DEFAULT (datetime('now')),
  UNIQUE(semana, company_id)
);

-- Alertas operativas (productos críticos, vencimientos, quiebres)
CREATE TABLE IF NOT EXISTS alertas (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha       TEXT NOT NULL,
  tipo        TEXT NOT NULL,   -- 'QUIEBRE' | 'VENCIMIENTO' | 'SOBRESTOCK' | 'FUGA'
  severidad   TEXT NOT NULL,   -- 'CRITICO' | 'ADVERTENCIA' | 'INFO'
  producto_id INTEGER,
  producto    TEXT NOT NULL,
  sede        TEXT,
  detalle     TEXT,            -- JSON con contexto adicional
  valor_usd   REAL DEFAULT 0,
  resuelta    INTEGER DEFAULT 0,
  created_at  TEXT DEFAULT (datetime('now'))
);

-- Acuerdos de comité con seguimiento
CREATE TABLE IF NOT EXISTS acuerdos (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha_comite TEXT NOT NULL,
  titulo       TEXT NOT NULL,
  responsable  TEXT,
  plazo        TEXT,
  estado       TEXT DEFAULT 'pendiente',  -- 'pendiente' | 'en_curso' | 'cerrado'
  impacto_usd  REAL DEFAULT 0,
  notas        TEXT,
  created_at   TEXT DEFAULT (datetime('now')),
  updated_at   TEXT DEFAULT (datetime('now'))
);

-- Snapshots de lotes por vencer (historial FEFO)
CREATE TABLE IF NOT EXISTS vencimientos_snapshot (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha       TEXT NOT NULL,
  lot_id      INTEGER,
  producto    TEXT NOT NULL,
  sede        TEXT,
  fecha_venc  TEXT,
  qty         REAL DEFAULT 0,
  valor_usd   REAL DEFAULT 0,
  rango       TEXT,            -- 'vencido' | '0-30' | '31-60' | '61-90'
  created_at  TEXT DEFAULT (datetime('now'))
);

-- Índices para consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_kpi_semana    ON kpi_semanal (semana, company_id);
CREATE INDEX IF NOT EXISTS idx_alertas_fecha ON alertas (fecha, tipo, resuelta);
CREATE INDEX IF NOT EXISTS idx_acuerdos_est  ON acuerdos (estado);
CREATE INDEX IF NOT EXISTS idx_venc_fecha    ON vencimientos_snapshot (fecha, rango);

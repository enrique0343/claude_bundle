# Repositorio de agentes de análisis operativo

Repositorio base para operar agentes de Claude Code orientados a análisis de inventario hospitalario, reportería y documentación técnica sobre Odoo v18.

## Estructura

```
.
├── CLAUDE.md                          Reglas globales del proyecto
├── .mcp.json                          MCPs configurados (Postgres, SharePoint, Outlook)
├── .env.example                       Plantilla de variables de entorno
├── .gitignore                         Exclusiones de datos sensibles
├── .claude/
│   ├── agents/
│   │   ├── analista.md                  Inventario, rotación, vencimientos y alertas JCI
│   │   ├── estratega-de-compras.md      Compras, OCs, proveedores y operación diaria
│   │   ├── auditor.md                   Fugas de ingresos y conciliación hospitalaria
│   │   ├── asistente-director.md        Traducción ejecutiva para Dirección
│   │   ├── programador.md               Escritura controlada sobre Odoo vía XML-RPC
│   │   ├── consultor-medico-y-comercial.md Rotación clínico-comercial
│   │   ├── controlador-financiero-operativo.md Impacto económico y control de gestión
│   │   ├── gestor-maestro-de-datos.md   Calidad del dato maestro
│   │   ├── monitor-operativo-diario.md  Tablero diario de prioridades
│   │   ├── documentador-procesos.md     SOPs, minutas y documentación auditable
│   │   └── pmo-experto-operativo.md     PMO experto para cartera de iniciativas operativas
│   └── skills/
│       ├── odoo-inventory/            Marcos de análisis de inventario
│       ├── strategic-procurement/     Estrategia de compras y Lean/JIT
│       ├── multi-company-balancing/   Optimización inter-compañía
│       ├── lean-operations-hospital/  Filosofía Lean y eficiencia operativa
│       ├── demand-forecasting-clinical/ Pronóstico de demanda y stock dinámico
│       ├── hospital-billing-reconciliation/ Auditoría ACS Hospitalización
│       ├── clinical-commercial-rotation/ Rotación clínico-comercial (FEFO, márgenes)
│       ├── financial-operational-control/ Control financiero operativo
│       ├── master-data-governance-odoo/ Gobierno del dato maestro en Odoo
│       ├── daily-ops-command-center/ Centro de mando operativo diario
│       ├── process-documentation-hospital/ Documentación de procesos hospitalarios
│       ├── operational-pmo-governance/ Gobierno de PMO operativo
│       ├── sql-readonly-reporting/    Reglas para SQL de solo lectura
│       └── executive-brief/           Formato ejecutivo para dirección
```

## Primer uso

1. Clonar el repositorio y abrirlo en VS Code.
2. Copiar `.env.example` a `.env` y completar credenciales. El archivo `.env` está ignorado por Git.
3. Ajustar endpoints en `.mcp.json` si los MCPs HTTP requieren URLs distintas.
4. Abrir Claude Code en el directorio raíz. El archivo `CLAUDE.md` se carga automáticamente.
5. Invocar un agente con `@analista`, `@estratega-de-compras`, `@monitor-operativo-diario` o el nombre correspondiente desde el chat de Claude Code.

## Seguridad

- El usuario PostgreSQL debe ser read-only a nivel de base.
- Los agentes de análisis operan en modo solo lectura salvo `@programador`, que es el único autorizado para escrituras controladas en Odoo.
- Exportaciones CSV/XLSX con datos de pacientes o inventario no deben versionarse (cubiertas por `.gitignore`).

## Cumplimiento

Todo hallazgo con implicación JCI (MMU, PCI) o regulatoria se marca explícitamente en la salida del agente. Todo entregable Word o PDF aplica formato Avante: negro #1A1A1A, gris carbón #4A4A4A, Century Gothic.

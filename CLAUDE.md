# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Objetivo del proyecto
Repositorio para diseñar y operar agentes de Claude Code orientados a análisis operativo, inventario hospitalario, reportería y documentación técnica sobre Odoo v18.

## Contexto institucional
- Entorno hospitalario con acreditación JCI.
- ERP: Odoo v18, PostgreSQL como base transaccional.
- Acceso SQL de solo lectura habilitado.
- Fuentes documentales vía MCP: SharePoint y Outlook.

## Arquitectura del repositorio

### Agentes (`.claude/agents/`)
Cada agente es un sub-agente especializado invocable con `@nombre-agente` desde el chat de Claude Code. Los agentes componen skills de la carpeta `.claude/skills/`.

| Agente | Invocación | Propósito principal | Skills cargados | Modo |
|---|---|---|---|---|
| `analista` | `@analista` | Inventario, vencimientos, rotación, valorización, alertas JCI. | odoo-inventory, sql-readonly-reporting, executive-brief, multi-company-balancing, lean-operations-hospital, demand-forecasting-clinical | Solo lectura |
| `estratega-de-compras` | `@estratega-de-compras` | Acceso en tiempo real al módulo de compras Odoo. OCs en todos los estados, informe diario con instrucciones por área. Coordina con `@analista` y `@asistente-director`. | strategic-procurement, sql-readonly-reporting, executive-brief, odoo-inventory, multi-company-balancing, lean-operations-hospital, demand-forecasting-clinical | Lectura en vivo (Bash + Read + Grep + Glob) |
| `auditor` | `@auditor` | Auditoría de ingresos hospitalarios: concilia consumo real vs. cuenta facturada (AlmightyCS). | hospital-billing-reconciliation, sql-readonly-reporting, executive-brief, odoo-inventory, lean-operations-hospital | Solo lectura |
| `asistente-director` | `@asistente-director` | Traduce propuestas técnicas u operativas en lectura de valor para Directorio. | executive-brief, sql-readonly-reporting, odoo-inventory, lean-operations-hospital, demand-forecasting-clinical | Solo lectura |
| `programador` | `@programador` | Ejecuta escrituras controladas en Odoo vía XML-RPC: orderpoints, OCs, proveedores, parámetros de producto. Siempre preview → confirmación → ejecución → verificación. | sql-readonly-reporting, odoo-inventory, strategic-procurement, executive-brief | **Escritura** (Bash + Read) |
| `consultor-medico-y-comercial` | `@consultor-medico-y-comercial` | Optimiza rotación de inventario combinando visión clínica y comercial. Evita vencimientos y maximiza rentabilidad. | clinical-commercial-rotation, odoo-inventory, executive-brief, lean-operations-hospital | Solo lectura |
| `controlador-financiero-operativo` | `@controlador-financiero-operativo` | Convierte señales operativas en impacto económico: capital inmovilizado, ahorro potencial, costo evitado y recuperación de ingresos. | financial-operational-control, executive-brief, sql-readonly-reporting, odoo-inventory, strategic-procurement, hospital-billing-reconciliation, lean-operations-hospital | Solo lectura |
| `gestor-maestro-de-datos` | `@gestor-maestro-de-datos` | Audita la calidad del dato maestro en Odoo: productos, proveedores, UoM, costos, lotes y orderpoints. | master-data-governance-odoo, sql-readonly-reporting, odoo-inventory, strategic-procurement, executive-brief, lean-operations-hospital | Solo lectura |
| `monitor-operativo-diario` | `@monitor-operativo-diario` | Consolida alertas diarias de inventario, compras, vencimientos, quiebres y fugas para priorizar acciones por área. | daily-ops-command-center, executive-brief, odoo-inventory, strategic-procurement, hospital-billing-reconciliation, multi-company-balancing, lean-operations-hospital, demand-forecasting-clinical | Solo lectura |
| `documentador-procesos` | `@documentador-procesos` | Convierte operación y hallazgos en SOPs, instructivos, minutas, políticas y documentación auditable. | process-documentation-hospital, executive-brief, sql-readonly-reporting, odoo-inventory, lean-operations-hospital | Solo lectura |
| `pmo-experto-operativo` | `@pmo-experto-operativo` | Gobierna la cartera de iniciativas operativas: priorización, hitos, bloqueos, comité, captura de valor y cierre formal de proyectos. | operational-pmo-governance, executive-brief, financial-operational-control, process-documentation-hospital, sql-readonly-reporting, lean-operations-hospital | Solo lectura |

Los agentes de análisis tienen `tools: Read, Grep, Glob` — solo lectura. `estratega-de-compras` tiene `tools: Bash, Read, Grep, Glob` para consultar Odoo en tiempo real (solo lectura vía psycopg2). El agente `programador` tiene `tools: Bash, Read` y es el único autorizado para escribir en producción vía XML-RPC API.

### Flujo multi-agente principal

```
@estratega-de-compras  →  consulta OCs en Odoo (Bash/SQL)
        ↓
@analista              →  aporta DOI e inventario actual
        ↓
@asistente-director    →  formatea informe ejecutivo con semáforos
        ↓
@programador           →  ejecuta instrucciones en Odoo si se requiere
```

El `@estratega-de-compras` coordina el flujo. El usuario puede lanzarlo solo con: `@estratega-de-compras genera el informe diario de compras`.

Flujos complementarios sugeridos:

```
@monitor-operativo-diario         →  consolida prioridades del día
        ↓
@pmo-experto-operativo            →  convierte hallazgos en cartera y seguimiento
        ↓
@controlador-financiero-operativo →  cuantifica impacto económico
        ↓
@asistente-director               →  traduce decisión para Dirección
        ↓
@documentador-procesos            →  formaliza acuerdo, SOP o minuta
```

### Skills (`.claude/skills/`)
Los skills son marcos de análisis reutilizables. Se cargan automáticamente cuando el agente los declara en su frontmatter. También son invocables directamente como `/nombre-skill` en Claude Code.

| Skill | Función |
|---|---|
| `odoo-inventory` | Marcos de análisis de stock, vencimientos, rotación, quiebre, valorización. Incluye anexo de modelos Odoo v18. |
| `sql-readonly-reporting` | Reglas y secuencia para escribir SQL seguro y auditable contra PostgreSQL de Odoo v18. |
| `executive-brief` | Convierte análisis técnicos en formato ejecutivo accionable para Dirección o Comité. |
| `strategic-procurement` | Análisis de compras, Lean/JIT, clasificación por criticidad, visión financiera de procurement. |
| `multi-company-balancing` | Optimización de stock entre compañías; identifica excedentes que evitan compras. |
| `lean-operations-hospital` | Marco Lean hospitalario: identificación de Muda, Kanban, Poka-Yoke, JIT. |
| `demand-forecasting-clinical` | Pronóstico de demanda clínica y ajuste dinámico de stock de seguridad y puntos de reorden. |
| `hospital-billing-reconciliation` | Auditoría cruzada entre salidas de bodega (`stock.move`) y cargos al paciente (`acs.hospitalization`). |
| `financial-operational-control` | Marco para clasificar y cuantificar impacto económico operativo: ahorro, costo evitado, capital liberable y recuperación de ingresos. |
| `master-data-governance-odoo` | Gobierno del dato maestro en Odoo: productos, UoM, costos, proveedores, lotes, multi-compañía y orderpoints. |
| `daily-ops-command-center` | Tablero de mando operativo diario con prioridades, semáforos, responsables y decisiones del día. |
| `process-documentation-hospital` | Estructura de SOPs, instructivos, minutas, RACI, políticas y evidencia auditable de procesos hospitalarios. |
| `operational-pmo-governance` | Gobierno de cartera operativa: priorización, bloqueos, hitos, captura de valor, comité y cierre formal de proyectos. |

### MCP (`.mcp.json`)
Tres servidores MCP configurados en `.mcp.json`:
- `odoo-postgres-readonly` — vía `@modelcontextprotocol/server-postgres` con la URL del `.env`. Conexión read-only a la base de Odoo v18.
- `sharepoint` — endpoint HTTP con token Bearer para documentos en SharePoint.
- `outlook` — endpoint HTTP con token Bearer para correo institucional.

Variables necesarias en `.env` (nunca versionar este archivo):
```
# Lectura — MCP PostgreSQL read-only
ODOO_PG_READONLY_URL=postgresql://READONLY_USER:PASSWORD@HOST:5432/ODOO_DB?sslmode=require

# Escritura — odoo-write-operator (XML-RPC API)
ODOO_URL=https://odoo.complejoavante.com
ODOO_DB=AvanteProd
ODOO_USER=usuario_api@avante.com
ODOO_PASSWORD=contraseña_api

# Documentos y correo
SHAREPOINT_MCP_TOKEN=...
OUTLOOK_MCP_TOKEN=...
```

Ajustar URLs de `sharepoint` y `outlook` en `.mcp.json` si los endpoints difieren del valor placeholder.

## Principios de trabajo
- Priorizar precisión sobre velocidad.
- Separar siempre dato confirmado de inferencia.
- No inventar campos, tablas, rutas, endpoints ni modelos.
- Si falta contexto, explicitar el supuesto antes de seguir.
- Toda consulta a Odoo, PostgreSQL u otra fuente operativa se hace en modo solo lectura salvo indicación expresa en contrario.

## Estándar de respuesta
Responder en español formal, con lenguaje ejecutivo y operativo. Oraciones cortas y directas, sin relleno. Preferir prosa sobre listas; usar listas solo para pasos secuenciales o comparaciones. Evitar negritas en exceso.

Usar esta estructura cuando aplique:
1. Resumen ejecutivo
2. Hallazgos clave
3. Riesgo e impacto
4. Recomendación concreta
5. Siguientes pasos

## Alerta regulatoria obligatoria
Avisar explícitamente cuando un hallazgo o recomendación tenga implicaciones:
- legales
- regulatorias (COFEPRIS, normativa sanitaria local)
- de acreditación JCI (MMU, PCI, IPSG cuando aplique)

Formato sugerido: bloque "Implicación JCI" o "Implicación regulatoria" con estándar citado y riesgo de no conformidad.

## Reglas para análisis de datos
- Indicar siempre el período analizado.
- Indicar la fuente usada: archivo, SQL, exportación, MCP o combinación.
- Identificar vacíos de datos, duplicados, nulos y supuestos relevantes.
- Si el análisis usa SQL, privilegiar consultas seguras y legibles.
- Si el análisis usa exportaciones CSV/XLSX, validar nombres de columnas antes de concluir.

## Reglas para Odoo v18
- Odoo es sistema transaccional crítico; no proponer escrituras directas ni cambios masivos sin validación explícita.
- Respetar multi-compañía: filtrar por `company_id` cuando aplique.
- En inventario, distinguir entre stock físico, stock disponible, reservado y movimientos.
- En vencimientos, separar productos vencidos, por vencer y sin fecha válida.
- En valorización, aclarar la lógica usada y cualquier limitación del costo (`property_cost_method`, `property_valuation`).
- No asumir campos custom sin confirmar esquema.

## Reglas para entregables ejecutivos
- Ser concreto; evitar teoría innecesaria.
- Priorizar riesgos clínicos, regulatorios y financieros.
- Priorizar quick wins cuando el impacto sea material.
- Cuando se presenten tablas, incluir una breve interpretación ejecutiva.
- Evitar jerga técnica si el destinatario es dirección.

## Formato obligatorio para documentos Word y PDF
Todo entregable exportado debe aplicar el formato GS1/BAES con colores Avante:
- Negro principal: #1A1A1A
- Gris carbón: #4A4A4A
- Fuente: Century Gothic

## Regla para documentación técnica
Cuando se documente un flujo, incluir como mínimo:
- objetivo
- alcance
- actores
- disparador
- entradas
- proceso
- salidas
- riesgos
- controles

## Qué evitar
- Respuestas ambiguas
- Listados extensos sin priorización
- Recomendaciones sin impacto esperado
- Automatizaciones con escritura sin mecanismo de control
- Suposiciones sobre estructura de datos sin validar esquema

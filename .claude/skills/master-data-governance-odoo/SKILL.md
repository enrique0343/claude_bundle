---
name: master-data-governance-odoo
description: Audita y gobierna el dato maestro de Odoo v18 para productos, proveedores, categorías, UoM, costos, lotes, multi-compañía y reglas de reabastecimiento. Enfocado en detectar inconsistencias que afectan compras, inventario, reportería y automatización.
---

# Skill: master-data-governance-odoo

## Cuándo usar este skill
Úsalo cuando el usuario necesite revisar la calidad del catálogo maestro o explicar por qué una operación, reporte o automatización está fallando por datos mal definidos.

## Objetivo
Detectar anomalías de estructura y configuración antes de que se conviertan en errores de compra, inventario, facturación o cumplimiento.

## Dominios de gobierno
- productos y variantes
- `default_code` y nomenclatura
- categorías y clasificación
- unidades de medida y conversiones
- costos y métodos de valorización
- proveedores por producto
- trazabilidad por lote o serie
- configuración multi-compañía
- orderpoints y parámetros de reabastecimiento

## Tipos de hallazgo
- **Dato faltante:** el atributo crítico no existe.
- **Dato inconsistente:** el mismo concepto aparece con valores conflictivos.
- **Dato duplicado:** existen registros equivalentes sin criterio de unicidad.
- **Configuración riesgosa:** el registro existe pero expone a error operativo.
- **Política no definida:** el sistema refleja ausencia de regla de negocio.

## Reglas obligatorias
- No diagnostiques “error” sin mostrar el patrón o evidencia.
- Prioriza el impacto operativo y financiero del defecto.
- Distingue entre problema puntual y problema sistémico.
- Si hay implicación JCI, de trazabilidad o de control interno, márcala explícitamente.
- No propongas limpieza masiva sin criterio de prioridad.

## Patrones prioritarios a revisar

### 1. Identidad del producto
- `default_code` duplicado o nulo
- nombres demasiado parecidos entre productos equivalentes
- variantes mal construidas

### 2. Trazabilidad y cumplimiento
- productos críticos sin seguimiento por lote o serie
- categorías clínicas sin metadatos mínimos
- configuraciones que rompen trazabilidad entre compañías

### 3. Compra y abastecimiento
- productos sin proveedor activo
- proveedores múltiples sin preferencia clara
- lead times incoherentes
- orderpoints obsoletos o inexistentes

### 4. Valorización y costo
- costos nulos, extremos o desactualizados
- método de costo inapropiado para el tipo de producto
- diferencias injustificadas entre compañías

### 5. UoM y operación
- unidades de compra distintas a inventario sin conversión confiable
- múltiplos de compra incompatibles con el consumo real

## Formato de salida
1. Resumen ejecutivo
2. Hallazgos críticos del dato maestro
3. Impacto sobre operación, finanzas y cumplimiento
4. Priorización de remediación
5. Reglas de gobierno sugeridas
6. Riesgos residuales si no se corrige

## Qué evitar
- listar anomalías sin jerarquía
- confundir ausencia de dato con decisión de negocio válida
- recomendar correcciones sin explicar el riesgo que resuelven

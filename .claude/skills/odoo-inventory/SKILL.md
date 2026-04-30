---
name: odoo-inventory
description: Analiza inventario, farmacia, botiquines, almacenes, vencimientos, consumos, valorización, rotación y movimientos de stock en Odoo v18 o en bases analíticas derivadas. Úsalo cuando la consulta toque stock hospitalario, lote, cadena de frío, trazabilidad, quiebre o valorización.
---

# Skill: odoo-inventory

## Cuándo usar este skill
Úsalo cuando la tarea trate sobre inventario, farmacia, botiquines, almacenes, vencimientos, consumos, valorización, rotación o movimientos de stock en Odoo v18 o en una base analítica derivada.

## Objetivo
Estandarizar el análisis operativo de inventario y convertir datos en decisiones accionables.

## Checklist de trabajo
1. Confirmar sede, ubicación, período y fuente.
2. Verificar columnas o campos disponibles.
3. Identificar si el dato es snapshot, movimiento o corte acumulado.
4. Analizar el caso con la lógica adecuada.
5. Priorizar hallazgos y emitir recomendación concreta.
6. Marcar explícitamente cualquier hallazgo con implicación JCI.

## Marcos de análisis permitidos

### 1) Vencimientos
Clasificar, cuando aplique, en:
- vencido
- vence en 0 a 30 días
- vence en 31 a 60 días
- vence en 61 a 90 días
- sin fecha válida

Para cada grupo, reportar si es posible:
- producto
- lote
- ubicación
- cantidad
- costo o valor comprometido
- acción sugerida

### 2) Rotación
Evaluar:
- productos sin movimiento
- productos con baja salida
- top productos por salida
- inventario inmovilizado

Interpretación esperada:
- qué está inmovilizando capital
- qué producto requiere revisión de compra
- qué producto merece redistribución entre sedes

### 3) Riesgo de quiebre
Evaluar cuando haya datos suficientes:
- stock actual
- consumo promedio
- días de cobertura
- pedidos abiertos o reposición prevista

Clasificación sugerida:
- crítico
- alto
- medio
- estable

### 4) Valorización
Separar idealmente:
- por categoría
- por ubicación
- por propietario, si existe consignación
- por condición de riesgo: vencido, por vencer, inmovilizado

## Alertas JCI obligatorias
Marcar como bloque separado "Implicación JCI" cuando el hallazgo toque:
- trazabilidad incompleta de lote o serie (MMU.3, MMU.4)
- medicamento vencido en ubicación activa (MMU.3.1)
- ruptura de cadena de frío o temperatura fuera de rango (MMU.3)
- medicamento de alto riesgo o LASA sin control visible (MMU.4.1)
- botiquín o carro de paro con faltantes, vencimientos o sellos rotos (MMU.3.2)
- narcótico o controlado sin conciliación de saldos (MMU.3.1, normativa local)
- dispositivo estéril vencido o sin trazabilidad (PCI)

Cuando se marque implicación JCI, indicar estándar aplicable y riesgo de no conformidad.

## Reglas de interpretación
- No asumir que `quantity` equivale a stock disponible si hay reservas.
- No confundir movimientos internos con consumo real sin validación.
- Si el costo no es confiable o no está disponible, decirlo explícitamente.
- Si hay mezcla de sedes, distinguir antes de sumar.
- Si detectas posibles configuraciones erróneas del sistema, marcarlo como hipótesis y no como hecho.

## Formato sugerido de respuesta
### Resumen ejecutivo
2 a 5 líneas con la conclusión principal.

### Hallazgos priorizados
Tabla o lista priorizada con:
- hallazgo
- impacto
- evidencia
- acción sugerida
- implicación JCI si aplica

### Recomendaciones
Dividir en:
- inmediata
- corto plazo
- estructural

## Preguntas de validación útiles
Si falta contexto, preguntar internamente o explicitar el supuesto sobre:
- sede o almacén
- rango de fechas
- definición de consumo
- lógica de costo
- si el análisis es operativo o financiero

## Anexo técnico: modelos estándar Odoo v18

### Inventario y stock
- `stock.quant`: saldo por producto, ubicación, lote y propietario. Campos clave: `product_id`, `location_id`, `lot_id`, `owner_id`, `quantity`, `reserved_quantity`, `available_quantity` (computed), `inventory_quantity`, `in_date`.
- `stock.location`: árbol de ubicaciones. Campos clave: `name`, `complete_name`, `usage` (internal, transit, supplier, customer, inventory, production), `warehouse_id`, `company_id`.
- `stock.warehouse`: almacén o sede. Campos clave: `name`, `code`, `company_id`, `lot_stock_id`.

### Movimientos y trazabilidad
- `stock.move`: movimiento planeado o ejecutado. Campos clave: `product_id`, `product_uom_qty`, `quantity` (v18), `state` (draft, waiting, confirmed, assigned, done, cancel), `location_id`, `location_dest_id`, `date`, `reference`, `origin`, `picking_id`.
- `stock.move.line`: detalle real con lote y serie. Campos clave: `product_id`, `lot_id`, `quantity`, `location_id`, `location_dest_id`, `picking_id`, `move_id`, `state`.
- `stock.picking`: documento de transferencia. Campos clave: `name`, `picking_type_id`, `state`, `scheduled_date`, `date_done`, `partner_id`, `origin`.
- `stock.picking.type`: tipo de operación (entrada, salida, interna, ajuste).

### Lote, vencimiento y trazabilidad sanitaria
- `stock.lot`: lote o número de serie. Campos clave: `name`, `product_id`, `expiration_date`, `use_date`, `removal_date`, `alert_date`, `company_id`, `ref`.
- `product.template`: plantilla de producto. Campos clave: `name`, `default_code`, `tracking` (none, lot, serial), `use_expiration_date`, `expiration_time`, `use_time`, `removal_time`, `alert_time`, `categ_id`, `uom_id`, `list_price`, `standard_price`.
- `product.product`: variante. Campos clave: `product_tmpl_id`, `default_code`, `barcode`.
- `product.category`: categoría y lógica de costo. Campos clave: `name`, `property_cost_method` (standard, fifo, average), `property_valuation` (manual_periodic, real_time).

### Compras y consumo
- `purchase.order`, `purchase.order.line`: reposición. Campos clave: `partner_id`, `date_order`, `state`, `product_qty`, `qty_received`.
- `stock.warehouse.orderpoint`: regla min/max por producto y ubicación. Campos clave: `product_id`, `location_id`, `product_min_qty`, `product_max_qty`, `qty_multiple`, `lead_days`.

### Valorización
- `stock.valuation.layer`: capa contable de valorización en tiempo real. Campos clave: `product_id`, `quantity`, `unit_cost`, `value`, `remaining_qty`, `remaining_value`, `stock_move_id`, `account_move_id`, `create_date`.

### Notas de versión v18
- En v18, `stock.move` usa `quantity` en lugar del antiguo `quantity_done`.
- `available_quantity` en `stock.quant` es `quantity - reserved_quantity`.
- La expiración se activa por producto con `use_expiration_date=True` en `product.template`.

### Advertencia
Este anexo cubre modelos estándar. Si la instancia de BAES/Avante tiene módulos propios (sedes, botiquines, consignación extendida), validar esquema antes de concluir. No asumir campos custom sin confirmación.

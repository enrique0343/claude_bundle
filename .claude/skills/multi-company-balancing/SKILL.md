---
name: multi-company-balancing
description: Analiza y optimiza los niveles de stock a través de múltiples compañías en Odoo v18. Identifica excedentes en una sede que pueden cubrir necesidades en otra, calculando el ahorro financiero por "Compra Evitada".
---

# Skill: multi-company-balancing

## Cuándo usar este skill
Úsalo cuando el hospital opere con múltiples razones sociales o sedes (compañías en Odoo) y se busque reducir el inventario global mediante transferencias internas en lugar de nuevas compras.

## Lógica de Análisis (El Algoritmo de Balanceo)

### 1. Cálculo de Consumo y Cobertura
Para cada SKU y cada Compañía:
- **DAC (Daily Average Consumption):** Consumo promedio diario basado en los últimos 90 días de movimientos de salida (`stock.move` con `location_dest_id.usage = 'customer'`).
- **DOI (Days of Inventory):** Stock actual en ubicaciones internas / DAC.
- **DOI Objetivo:** El rango ideal de días de stock (ej. 15-45 días).

### 2. Identificación de Desbalances
- **Sede con Excedente:** DOI > 90 días (o el triple del objetivo).
- **Sede con Necesidad:** DOI < 10 días (o por debajo del stock de seguridad) O con Órdenes de Compra pendientes para ese SKU.

### 3. Propuesta de Transferencia Inter-compañía
Generar una propuesta técnica:
- **Origen:** Sede con mayor exceso y menor rotación.
- **Destino:** Sede con necesidad inminente.
- **Cantidad Sugerida:** La necesaria para equilibrar ambas sedes al DOI Objetivo.
- **Impacto Financiero:** `Cantidad x Costo Unitario` = **Ahorro por Compra Evitada**.

## Reglas Hospitalarias / JCI
- **Trazabilidad Prioritaria:** El movimiento debe conservar el lote y la fecha de vencimiento original.
- **Cercanía Logística:** Si hay varias sedes con exceso, priorizar la más cercana al destino si existe esa metadata.
- **Costo de Movimiento:** No sugerir movimientos de productos de bajísimo valor donde el flete sea mayor al ahorro, a menos que sea por riesgo de vencimiento.

## Modelos de Odoo Relacionados
- `stock.quant`: Para ver stock por `company_id`.
- `stock.move`: Para calcular el historial de consumo por sede.
- `res.company`: Para identificar las entidades legales involucradas.
- `stock.picking.type`: Para identificar las rutas de "Transferencia Interna" o "Inter-Company".

## Formato de Salida Sugerido
1. **Resumen de Oportunidades de Balanceo** (Total $ de compras evitables).
2. **Tabla de Movimientos Sugeridos:**
   - [Producto] | [De Sede A] | [A Sede B] | [Cantidad] | [Ahorro Estimado]
3. **Análisis de DOI Pre y Post Movimiento.**
4. **Alerta de Vencimiento:** Priorizar el movimiento de lotes próximos a vencer hacia la sede con mayor DAC (Consumo Diario).

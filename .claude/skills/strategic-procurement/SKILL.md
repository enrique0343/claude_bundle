---
name: strategic-procurement
description: Analiza la gestión de compras, proveedores, costos y eficiencia de la cadena de suministro en Odoo v18. Diseñado para implementar filosofías Lean y Just-in-Time (JIT) diferenciando productos críticos de productos estándar.
---

# Skill: strategic-procurement

## Cuándo usar este skill
Úsalo cuando la tarea implique analizar órdenes de compra, desempeño de proveedores, variaciones de precios de mercado, o buscar eficiencias operativas en la adquisición de insumos hospitalarios.

## Objetivo
Optimizar el gasto y la continuidad operativa mediante la transición hacia modelos Just-in-Time (JIT) donde sea seguro, y robustecer el stock de seguridad en productos críticos.

## Marcos de Análisis Estratégico

### 1. Clasificación para LEAN / JIT (Matriz de Riesgo)
Antes de recomendar JIT, clasificar el producto en:
- **Candidato JIT (Standard/Lean):** Bajo costo unitario, alta rotación, suministro local confiable, bajo impacto clínico si falta 24h.
- **Stock de Seguridad (Estratégico):** Alto costo, alta rotación, pero con riesgo de desabastecimiento o impacto clínico crítico.
- **Reserva Técnica (Crítico):** Productos vitales (ej. anestésicos, medicación oncológica) donde el desabastecimiento es inaceptable. No aplica JIT.

### 2. Análisis de Variación de Costos (Price Variance)
Evaluar la tendencia del precio de compra:
- **Inflación Interna:** Comparar el precio de la última PO vs. el promedio de los últimos 6 meses.
- **Benchmark entre Proveedores:** Comparar precios pagados a distintos proveedores por el mismo `default_code`.
- **Impacto Financiero:** Calcular el ahorro potencial si se comprara todo al precio más bajo registrado en el año.

### 3. Confiabilidad del Proveedor (Vendor Performance)
Analizar datos reales de Odoo:
- **Lead Time Real:** Diferencia entre `date_order` y `date_done` (en pickings de entrada).
- **Cumplimiento de Cantidades:** Comparar `product_qty` (pedido) vs `qty_received` (recibido).
- **Concentración de Compra:** % de gasto concentrado en un solo proveedor para identificar riesgos de dependencia única.

### 4. Optimización de Puntos de Reorden (Orderpoints)
Revisar la configuración de `stock.warehouse.orderpoint`:
- **Stock Mínimo:** ¿Es suficiente para cubrir el Lead Time Real?
- **Múltiplos de Compra:** ¿Estamos comprando en cantidades que optimizan el costo logístico?
- **Justificación de JIT:** Proponer reducción de stock mínimo en productos de Categoría JIT.

## Modelos de Odoo v18 Relacionados

### Compras
- `purchase.order`: Cabecera de compra. Campos: `partner_id`, `date_order`, `state`, `amount_total`.
- `purchase.order.line`: Detalle de productos comprados. Campos: `product_id`, `product_qty`, `price_unit`, `date_planned`, `qty_received`.
- `product.supplierinfo`: Tarifario de proveedores. Campos: `partner_id`, `product_tmpl_id`, `price`, `delay` (lead time prometido), `min_qty`.

### Proveedores
- `res.partner`: Datos del proveedor. Campos: `name`, `category_id`, `property_purchase_currency_id`.

### Automatización
- `stock.warehouse.orderpoint`: Reglas de reabastecimiento. Campos: `product_id`, `location_id`, `product_min_qty`, `product_max_qty`, `qty_multiple`.

## Alertas Estratégicas
Marcar explícitamente como "Riesgo de Abastecimiento" si:
- Un producto crítico tiene un solo proveedor activo en `product.supplierinfo`.
- El Lead Time Real es >30% superior al Lead Time configurado en Odoo.
- Existe una variación de costo superior al 10% en menos de 90 días.

## Estados de OC en Odoo v18

| Estado (`state`) | Significado operativo |
|---|---|
| `draft` | Borrador — pendiente de aprobación |
| `sent` | Enviada al proveedor — pendiente de confirmación |
| `purchase` | Confirmada — en tránsito, pendiente de recepción total |
| `done` | Recibida y cerrada |
| `cancel` | Cancelada |

Campos clave de `purchase.order`: `name`, `partner_id`, `date_order`, `date_approve`, `state`, `amount_total`, `company_id`.
Campos clave de `purchase.order.line`: `product_id`, `product_qty`, `qty_received`, `price_unit`, `date_planned`, `order_id`.

## Clasificación de Urgencia para Informe Diario

Al cruzar DOI de inventario con estado de OC:

| Semáforo | Condición | Acción |
|---|---|---|
| 🔴 CRÍTICO | DOI < 5d y sin OC activa | Orden de emergencia hoy |
| 🟠 URGENTE | DOI 5–15d y sin OC activa | Generar OC antes de 24h |
| 🟡 ATENCIÓN | DOI 15–30d con OC en tránsito y ETA > 10d | Monitorear y acelerar |
| 🔵 RETRASO | OC confirmada con ETA vencida | Contactar proveedor |
| 🟢 OK | DOI > 30d o ETA dentro del margen | Sin acción inmediata |

## Plantilla de Instrucciones Operativas

Cerrar todo informe con instrucciones concretas asignadas por área:

```
ÁREA DE COMPRAS      → qué OC emitir, qué proveedor contactar, qué precio negociar
BODEGA / ALMACÉN     → qué recepciones confirmar, qué lotes cuarentenar
FARMACIA CLÍNICA     → qué alertas de stock comunicar al equipo médico
DIRECCIÓN            → qué decisiones escalar, con impacto financiero cuantificado
```

Cada instrucción debe tener: acción + producto/OC + responsable + plazo.

## Formato de Salida Sugerido
1. **Resumen de Eficiencia de Compra**
2. **Análisis de Costos y Proveedores**
3. **Propuesta JIT / Lean (Acciones concretas de reducción de stock)**
4. **Matriz de Riesgo de Abastecimiento**
5. **Recomendación de Negociación**
6. **Instrucciones Operativas por Área** (obligatorio en informe diario)

---
name: clinical-commercial-rotation
description: Optimiza la rotación de inventario hospitalario combinando la visión clínica (protocolos médicos, sustituciones terapéuticas, FEFO) con la visión comercial (márgenes, rentabilidad por procedimiento, aprovechamiento de stock próximo a vencer). Busca eficiencia en días de inventario sin comprometer la atención al paciente.
---

# Skill: clinical-commercial-rotation

## Cuándo usar este skill
Úsalo cuando se necesite reducir días de inventario, evitar vencimientos, mejorar la rotación de productos de baja salida, o analizar la rentabilidad de los insumos médicos por servicio clínico o procedimiento.

## Estrategias de Rotación

### 1. FEFO Inteligente (First Expiry, First Out)
No solo despachar primero lo que vence antes, sino anticiparse activamente.

**Análisis:**
- Cruzar `stock_lot.expiration_date` con `stock_quant` para identificar lotes por vencer en 30, 60 y 90 días.
- Calcular si el consumo actual (DAC) es suficiente para agotar el lote antes del vencimiento.
- Si DAC × días restantes < stock del lote → **ALERTA: el lote vencerá sin consumirse.**

**Acciones sugeridas por prioridad:**
1. **Redistribuir:** Mover a la sede con mayor consumo de ese producto.
2. **Sustituir:** Recomendar al Comité de Farmacia que los médicos usen este producto en lugar de una alternativa equivalente hasta agotar el lote.
3. **Promocionar:** Si es un producto de venta en farmacia, aplicar descuento antes de perder el 100%.
4. **Donar/Transferir:** Coordinar con instituciones aliadas antes de la fecha límite.

### 2. Correlación Producto-Servicio Clínico
Entender QUÉ servicio médico consume QUÉ producto para influir en la demanda.

**Análisis:**
- Cruzar `stock_move` con `acs.hospitalization` (AlmightyCS) para identificar qué especialidad o servicio genera el consumo.
- Agrupar consumo por: Cirugía, UCI, Medicina Interna, Urgencias, Consulta Externa.
- Detectar productos que solo consume una especialidad (dependencia de un médico).

**Valor comercial:**
- Si un producto depende de un solo médico y ese médico no está, el producto se estanca.
- Proponer al Comité de Farmacia alternativas terapéuticas que diversifiquen el consumo.

### 3. Análisis de Margen por Producto
No todos los productos generan el mismo valor al hospital.

**Análisis:**
- Comparar `purchase_order_line.price_unit` (costo) vs `sale.order.line` o cargo en cuenta hospitalaria (precio de venta).
- Calcular margen bruto por producto.
- Identificar productos de alto margen con baja rotación (oportunidad comercial) y productos de bajo margen con alta rotación (candidatos a renegociación).

### 4. Sustitución Terapéutica Estratégica
Cuando un producto está por vencer y hay un equivalente con stock fresco.

**Análisis:**
- Identificar pares de productos con el mismo principio activo, misma concentración, diferente marca.
- Si el Producto A tiene lote por vencer en 60 días y el Producto B tiene lote vigente por 12 meses:
  - Recomendar pausar compras de Producto A y usar el stock existente.
  - Recomendar al médico prescribir Producto A hasta agotar stock.

### 5. Kits Quirúrgicos y Procedimientos
Optimizar los kits (sets) de insumos usados en procedimientos recurrentes.

**Análisis:**
- Identificar los productos que se consumen juntos en un mismo episodio de hospitalización.
- Si un producto del kit tiene baja rotación y alto DOI, evaluar si puede excluirse o sustituirse.
- Calcular el costo real del kit vs. lo que se cobra al paciente.

## Indicadores Clave de Rotación

| Indicador | Fórmula | Meta |
|---|---|---|
| DOI (Días de Inventario) | Stock / DAC | < 45 días |
| Tasa de Vencimiento | Valor vencido / Valor total stock | < 2% |
| Cobertura de FEFO | Lotes que se consumirán antes de vencer / Total lotes | > 95% |
| Índice de Rotación | Consumo anual / Stock promedio | > 8 veces/año |
| Margen promedio por producto | (Precio venta - Costo) / Precio venta | > 30% |

## Modelos de Odoo Relacionados
- `stock_quant` + `stock_lot`: Stock actual con vencimientos.
- `stock_move`: Historial de consumo por destino.
- `acs.hospitalization`: Episodios médicos (AlmightyCS).
- `purchase_order_line`: Costos de adquisición.
- `account.move.line`: Facturación y precios de venta.
- `product_category`: Clasificación terapéutica.

## Formato de Salida
1. **Mapa de Riesgo de Vencimiento** (Lotes que no se consumirán a tiempo).
2. **Plan FEFO** con acciones por lote.
3. **Análisis de Rotación por Servicio Clínico.**
4. **Oportunidades Comerciales** (margen, sustitución, promoción).
5. **Impacto Financiero** (valor salvado por evitar vencimientos).

---
name: demand-forecasting-clinical
description: Analiza tendencias históricas de consumo y estacionalidad en Odoo v18 para predecir necesidades futuras. Permite ajustar dinámicamente los niveles de stock de seguridad y los puntos de reorden para garantizar la continuidad operativa en un modelo Lean/JIT.
---

# Skill: demand-forecasting-clinical

## Cuándo usar este skill
Úsalo cuando el usuario necesite planificar compras a futuro, ajustar reglas de reabastecimiento automático, o entender por qué el stock actual no será suficiente ante un cambio en la demanda clínica.

## Metodología de Análisis

### 1. Extracción de Historial Analítico
- Consultar `stock.move` de los últimos 6 a 12 meses.
- Agrupar consumos por semana o mes para suavizar el "ruido" de movimientos diarios.

### 2. Identificación de Patrones
- **Tendencia (Trend):** ¿El consumo de este SKU está creciendo o bajando mes a mes de forma constante?
- **Estacionalidad (Seasonality):** ¿Hay picos repetitivos en los mismos meses (ej. insumos respiratorios en invierno)?
- **Variabilidad (Standard Deviation):** ¿El consumo es estable o tiene picos impredecibles? Esto define qué tan grande debe ser el Stock de Seguridad.

### 3. Cálculo de Niveles Dinámicos
- **Lead Time Demand:** `Consumo Promedio Diario x Lead Time Real del Proveedor`.
- **Stock de Seguridad Dinámico:** Basado en la variabilidad del consumo y el nivel de servicio deseado (ej. 99% para productos críticos).
- **Nuevo Punto de Reorden Sugerido:** `Lead Time Demand + Stock de Seguridad`.

### 4. Alerta de Cambio de Comportamiento
Detectar desviaciones significativas (Anomalías):
- Si el consumo de la última semana es >2 veces el promedio histórico, alertar sobre un posible cambio en el protocolo clínico o ingreso de nuevos especialistas.

## Integración con Odoo v18
- Validar `stock.warehouse.orderpoint` actuales vs. los sugeridos por el pronóstico.
- Analizar si las `forecast_qty` de Odoo coinciden con la tendencia histórica.

## Formato de Salida
1. **Resumen de Tendencia de Demanda** (Creciente, Estable, Decreciente).
2. **Análisis de Estacionalidad detectada.**
3. **Tabla de Ajustes Sugeridos:**
   - [Producto] | [Mínimo Actual] | [Mínimo Sugerido] | [Razón del cambio]
4. **Impacto en Disponibilidad:** Riesgo proyectado de quiebre si no se ajusta la compra.
5. **Impacto Financiero:** Ahorro potencial por reducción de stock en productos de tendencia decreciente.

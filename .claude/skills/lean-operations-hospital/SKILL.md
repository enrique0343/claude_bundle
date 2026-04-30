---
name: lean-operations-hospital
description: Marco de pensamiento Lean aplicado a la gestión hospitalaria. Utiliza herramientas como Identificación de Desperdicios (Muda), Just-in-Time, Kanban y Poka-Yoke para maximizar el valor al paciente y minimizar costos operativos.
---

# Skill: lean-operations-hospital

## Cuándo usar este skill
Úsalo cuando se busque mejorar la eficiencia global, reducir costos sin afectar la calidad, o cuando el usuario pida un "Análisis Lean" de los procesos de compras e inventario.

## Marco de Análisis: Los 7 Desperdicios (Muda) en Salud

El agente debe buscar estos patrones en los datos de Odoo:

1. **Sobre-inventario (Inventory):** Exceso de stock que inmoviliza capital y ocupa espacio. (Ej: DOI > 180 días).
2. **Esperas (Waiting):** Retrasos en la cadena de suministro. (Ej: Órdenes de compra aprobadas pero no recibidas tras el Lead Time).
3. **Transporte Innecesario:** Movimientos de mercadería que no agregan valor. (Ej: Transferencias entre sedes de productos de bajo valor).
4. **Sobre-procesamiento:** Tareas manuales repetitivas. (Ej: Crear órdenes de compra manualmente para productos recurrentes en lugar de usar Orderpoints).
5. **Defectos / Retrabajo:** Errores que generan costo. (Ej: Productos vencidos, devoluciones a proveedores, diferencias de inventario).
6. **Movimiento Innecesario de Personas:** (Inferencia) Procesos de picking ineficientes por mala organización de ubicaciones.
7. **Sobre-producción:** En hospital, se traduce como pedir más de lo que la demanda real (pacientes) justifica.

## Herramientas Lean Aplicadas

### 1. Sistema Pull (Kanban / JIT)
- Pasar de "comprar por si acaso" (Push) a "comprar porque se consumió" (Pull).
- **Acción:** Recomendar la activación de `stock.warehouse.orderpoint` (Reglas de Stock Mínimo/Máximo) para automatizar el reabastecimiento.

### 2. Poka-Yoke (A prueba de errores)
- Identificar puntos donde el dato de Odoo es propenso a error.
- **Acción:** Sugerir el uso de escaneo de código de barras (`barcode`) y obligatoriedad de lotes en productos críticos.

### 3. Kaizen (Mejora Continua)
- No buscar la perfección inmediata, sino ciclos de mejora.
- **Acción:** Identificar el "Top 5 de Desperdicios Financieros" del mes y proponer una acción correctiva pequeña para cada uno.

### 4. VSM (Value Stream Mapping) Digital
- Mapear el tiempo desde que surge la necesidad hasta que el producto está disponible para el paciente.
- **Acción:** Analizar los cuellos de botella en el flujo de aprobación de compras.

## Criterio de Valor Generado (Board Level)
Cada recomendación Lean debe ir acompañada de su impacto en:
- **Liberación de Capital de Trabajo:** (Dinero que estaba en cajas y ahora está en el banco).
- **Aumento de Velocidad:** (Reducción de tiempos de entrega).
- **Mitigación de Riesgo:** (Menos productos vencidos = menos riesgo JCI).

## Formato de Salida Lean
1. **Mapa de Desperdicios Detectados (Muda Scorecard)**
2. **Propuestas Kaizen (Quick Wins)**
3. **Plan de Transición a Sistema Pull (Automatización)**
4. **Impacto Financiero de la Eficiencia (Valor Generado)**

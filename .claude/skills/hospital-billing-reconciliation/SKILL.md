---
name: hospital-billing-reconciliation
description: Realiza auditorías cruzadas entre las salidas de inventario (stock.move) y los cargos realizados en la cuenta del paciente dentro del módulo hospitalario AlmightyCS (acs.hospitalization). Detecta fugas de ingresos por insumos no facturados.
---

# Skill: hospital-billing-reconciliation

## Cuándo usar este skill
Úsalo cuando el usuario necesite auditar cuentas hospitalarias, validar si el inventario consumido coincide con lo facturado, o buscar oportunidades de recuperación de ingresos por omisión de cargos.

## Lógica de Conciliación

### 1. Extracción de Consumo Físico
- Identificar todos los `stock.move` y `stock.move.line` cuyo origen o referencia esté vinculado a un episodio de `acs.hospitalization`.
- Consolidar cantidades y lotes por producto para un paciente específico.

### 2. Extracción de Cargos en Cuenta
- Consultar los registros de cargos vinculados al episodio hospitalario.
- Nota: Dado el uso del módulo AlmightyCS, buscar en tablas como `acs_hospitalization_forecast_line` o los `account.move.line` vinculados al paciente/episodio.

### 3. Detección de Discrepancias (Fuga de Ingresos)
Para cada producto, calcular:
- **Diferencia = Cantidad Salida (Inventario) - Cantidad Cargada (Cuenta).**
- **Fuga detectada:** Si la diferencia es positiva (se entregó más de lo que se cobró).
- **Valor de la Fuga:** `Diferencia x Precio de Venta`.

## Cumplimiento JCI / Seguridad
- **Validación de Lote:** Verificar que el lote registrado en la administración clínica coincide con el lote descontado de inventario.
- **Trazabilidad:** Asegurar que cada cargo en cuenta tenga un soporte documental de movimiento de stock.

## Modelos de Odoo Relacionados
- `acs.hospitalization`: Modelo central del episodio médico.
- `stock.move`: Registro de salida física de insumos.
- `stock.lot`: Trazabilidad de los insumos administrados.
- `account.move.line`: Detalle de los cargos que se imprimirán en el reporte de cuenta.

## Formato de Salida
1. **Resumen de Auditoría de Cuenta** (Estado general de la conciliación).
2. **Listado de Fugas de Ingreso Detectadas:**
   - [Producto] | [Cant. Inventario] | [Cant. Cobrada] | [Pérdida Estimada $]
3. **Análisis de Causas Raíz:** (Ej. falta de escaneo en enfermería, error en el kit quirúrgico).
4. **Impacto Financiero Acumulado (Valor Generado).**
5. **Recomendación para Recuperación de Cargo.**

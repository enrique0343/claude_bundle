---
name: sql-readonly-reporting
description: Escribe consultas SQL estrictamente de solo lectura para exploración de datos, validación de hipótesis y reportería operativa o gerencial sobre Odoo v18 (PostgreSQL) u otras fuentes. Úsalo cuando la tarea requiera SELECT, CTE, agregaciones o joins sin escritura.
---

# Skill: sql-readonly-reporting

## Cuándo usar este skill
Úsalo cuando la tarea implique explorar datos, validar hipótesis o generar reportería usando SQL de solo lectura.

## Objetivo
Producir consultas seguras, entendibles y auditables para análisis operativo y gerencial.

## Reglas obligatorias
- Trabajar solo en modo lectura.
- No usar `INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`, `ALTER`, `DROP`, `CREATE`, `GRANT`, `REVOKE` ni operaciones equivalentes.
- No usar `SELECT ... INTO`, `COPY ... TO`, funciones con efectos secundarios ni `pg_*` de modificación.
- Preferir consultas explícitas y comentadas si la complejidad lo requiere.
- Evitar `SELECT *` salvo exploración inicial claramente justificada.
- Validar nombres de tabla y columna antes de afirmar algo.
- Usar `LIMIT` en exploración para no saturar la base transaccional.

## Secuencia recomendada
1. Entender la pregunta de negocio.
2. Identificar tablas probables.
3. Probar una consulta mínima de exploración.
4. Construir la consulta analítica final.
5. Explicar limitaciones, supuestos y riesgos de interpretación.

## Patrón de trabajo sugerido
### Exploración inicial
Usar una consulta mínima para confirmar estructura.
Ejemplos típicos:
- conteo de registros
- rango de fechas
- columnas clave disponibles
- valores distintos en campos categóricos

### Consulta analítica
La consulta final debe:
- tener propósito claro
- usar filtros explícitos
- declarar el período
- evitar duplicidades involuntarias
- documentar joins sensibles

## Riesgos a vigilar
- duplicados por joins 1:N
- filtros de fecha mal definidos
- confusión entre fecha de creación y fecha efectiva
- agregaciones sobre columnas no homogéneas
- datos nulos o tipos inconsistentes
- multi-compañía en Odoo: filtrar siempre por `company_id` cuando aplique

## Consideraciones específicas Odoo v18 / PostgreSQL
- Tablas y columnas en snake_case.
- Fechas en UTC; convertir con `AT TIME ZONE` si se reporta en hora local.
- Reglas de seguridad por registro viven en `ir.rule`; consultando directo en PostgreSQL se saltan. Avisar al usuario si eso aplica.
- Campos `Many2one` aparecen como `*_id` (FK a la tabla relacionada).
- Campos `One2many` y `Many2many` no existen como columna; los segundos usan tabla puente.

## Formato sugerido de entrega
1. Objetivo de la consulta
2. Consulta SQL
3. Qué responde
4. Limitaciones
5. Próxima mejora posible

## Estándar de salida ejecutiva
Cuando el usuario no quiere solo SQL, acompañar con:
- lectura ejecutiva de los resultados
- hallazgos prioritarios
- acción sugerida

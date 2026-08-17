# Plan de implementación — Aplicación de control de limpieza (Facilities) integrada con Odoo v18

Documento de planificación previo a construcción. No contiene código productivo.
Fecha: 2026-08-17 · Área solicitante: Dirección de Operaciones / Facilities · Fuente: Odoo v18 (AvanteProd), módulo hospitalario AlmightyCS.

---

## 1. Objetivo

Disponer de una aplicación web que programe automáticamente la limpieza de habitaciones a partir del censo de pacientes hospitalizados registrado en Odoo, asigne los operarios responsables, registre la ejecución con evidencia y permita a supervisión y dirección verificar el cumplimiento en tiempo real.

## 2. Alcance

**Incluye:** habitaciones y camas de hospitalización; limpieza rutinaria, concurrente, terminal y de aislamiento; programación por turno; asignación de operarios; registro de ejecución; verificación supervisora; tablero de cumplimiento.

**Excluye en primera versión:** áreas críticas con protocolo propio (quirófano, UCI, central de esterilización), gestión de residuos, control de inventario de insumos de limpieza, nómina y control de asistencia. Se incorporan en fases posteriores si el piloto lo justifica.

## 3. Actores

| Actor | Rol en el sistema |
|---|---|
| Operario de limpieza | Ejecuta y registra la tarea desde dispositivo móvil |
| Supervisor de Facilities | Programa excepciones, reasigna, verifica en campo, cierra no conformidades |
| Jefatura de Facilities | Monitorea cumplimiento, gestiona cargas de trabajo y escalamientos |
| Enfermería / Admisión | Origina el evento en Odoo (ingreso, traslado, alta) sin trabajo adicional |
| PCI / Calidad | Audita evidencia de cumplimiento para JCI |
| Dirección de Operaciones | Consume indicadores de cumplimiento y rotación de cama |

## 4. Arquitectura propuesta

Se mantiene la ruta ya establecida en este repositorio: Cloudflare Worker + D1 + activos estáticos, con Odoo consumido en solo lectura vía JSON-RPC.

```
Odoo v18 (AvanteProd)          Cloudflare                        Usuarios
──────────────────────         ─────────────────────────         ──────────────
acs.hospitalization  ──lectura──▶  Worker "operaciones"  ──API──▶ PWA operario (móvil)
habitaciones / camas   JSON-RPC    · sincronizador censo         Panel supervisor
                                   · motor de programación       Tablero dirección
                                   · API de ejecución
                                        │
                                        ▼
                                   D1 (avante-ops)
                                   órdenes, ejecuciones,
                                   evidencia, verificaciones
```

**Odoo es la fuente de verdad del censo. La aplicación es la fuente de verdad de la limpieza.** Odoo no se modifica: no se instala módulo, no se agregan campos, no se escriben registros. Esto respeta la regla del proyecto de no ejecutar escrituras sobre el sistema transaccional sin validación explícita, y evita depender del ciclo de actualización del proveedor de AlmightyCS.

**Alternativa evaluada y descartada para la primera versión:** desarrollar un módulo nativo en Odoo. Ofrece integración total y un solo sistema de acceso, pero implica desarrollo sobre producción, dependencia de un partner Odoo, riesgo en actualizaciones y un ciclo de entrega considerablemente más largo. Puede reconsiderarse una vez que el proceso esté probado y estabilizado.

## 5. Integración con Odoo — mecanismo

No existe mecanismo de webhooks nativo aprovechable sin desarrollo en Odoo. La sincronización se hace por consulta programada (cron de Cloudflare) cada 5 a 15 minutos, comparando el censo actual contra el último snapshot almacenado en D1. De la comparación se derivan los eventos:

| Evento detectado | Orden de limpieza generada | Prioridad |
|---|---|---|
| Episodio nuevo con cama asignada | Activa ciclo de limpieza rutinaria diaria por turno | Normal |
| Cama que deja de estar ocupada (alta, traslado, defunción) | Limpieza terminal de la cama liberada | Alta — bloquea la cama |
| Episodio marcado con precaución o aislamiento | Protocolo de aislamiento con EPP y tiempo diferenciado | Alta |
| Habitación sin ocupación | Mantenimiento por calendario fijo | Baja |

La frecuencia de sincronización debe calibrarse contra la latencia real de registro del alta en Odoo. Si el alta se registra en el sistema horas después del egreso físico, la limpieza terminal se dispararía tarde y el mecanismo pierde valor. Esta medición es parte de la Fase 0 y puede obligar a habilitar un disparo manual complementario desde enfermería o el propio supervisor.

## 6. Principio de dato mínimo

Facilities no requiere identidad clínica del paciente. La aplicación sincroniza únicamente: identificador de habitación y cama, estado de ocupación, marca de precaución o aislamiento, y marca de tiempo del evento. **No se sincroniza nombre, expediente, diagnóstico ni datos demográficos.**

Esto reduce de forma material el riesgo de exposición de información sensible fuera del sistema clínico y acota el alcance de cualquier auditoría de protección de datos sobre esta aplicación.

## 7. Modelo de datos preliminar (D1)

Tablas nuevas, sin afectar las existentes del Worker:

| Tabla | Contenido |
|---|---|
| `fac_habitacion` | Catálogo local de habitaciones y camas, mapeo al identificador de Odoo, área, piso, sede, nivel de riesgo PCI |
| `fac_tipo_limpieza` | Rutinaria, concurrente, terminal, aislamiento, área común. Tiempo estándar, checklist asociado, EPP requerido |
| `fac_operario` | Personal, turno base, área asignada, PIN de acceso, estado activo |
| `fac_turno` | Definición de turnos y cobertura |
| `fac_orden` | Orden de limpieza: habitación, tipo, fecha y turno programado, origen (automático o manual), estado, SLA objetivo |
| `fac_ejecucion` | Registro de ejecución: operario, inicio, fin, checklist respondido, observaciones, evidencia fotográfica |
| `fac_verificacion` | Verificación supervisora: resultado, hallazgos, firma |
| `fac_no_conformidad` | Desviaciones, causa, acción correctiva, cierre |
| `fac_censo_snapshot` | Última fotografía del censo leído de Odoo, base de la detección de cambios |

Máquina de estados de la orden: `programada → asignada → en curso → ejecutada → verificada`, con salidas `no conforme` (regresa a programada) y `no realizada` (con motivo obligatorio).

## 8. Captura en campo y control anti-simulación

El registro debe hacerse en el punto de servicio, no en la oficina. Se propone código QR fijo por habitación más PIN de operario: el escaneo prueba presencia física y el PIN prueba identidad. Marca de tiempo de inicio y fin generada por el servidor, no por el dispositivo. Fotografía opcional obligatoria para limpieza terminal y de aislamiento.

Sin este control, el sistema documenta declaraciones en lugar de hechos, y la evidencia pierde valor ante una auditoría de acreditación.

Se requiere validar cobertura de red en pisos y sótanos. Si hay zonas sin señal, la aplicación necesita modo offline con sincronización diferida, lo que agrega complejidad y debe decidirse antes del diseño técnico.

## 9. Hallazgo de seguridad previo — bloqueante

El Worker actual (`src/index.js`) expone todos sus endpoints sin autenticación y con `Access-Control-Allow-Origin: *`. Hoy publica inventario, compras y vencimientos a cualquiera que conozca la URL. Incorporar datos de ocupación hospitalaria y de personal sobre esa misma base no es aceptable.

Antes de construir este módulo debe resolverse el control de acceso: autenticación institucional para paneles de supervisión y dirección, credenciales acotadas para la aplicación de operario, roles diferenciados y restricción del CORS a los orígenes propios. Es trabajo pequeño y de alto impacto, y condiciona todo lo demás.

## 10. Fases de trabajo

### Fase 0 — Descubrimiento de esquema en Odoo (bloqueante, 1 a 2 días)

No se asume ningún modelo ni campo. Debe confirmarse contra el esquema real, en modo solo lectura, mediante `ir.model`, `ir.model.fields` e `information_schema`:

- Nombre exacto de los modelos de habitación y cama en AlmightyCS y su relación con el episodio.
- Campos de `acs.hospitalization`: cama y habitación asignadas, fechas de ingreso y alta, campo de estado y valores posibles, `company_id`.
- Existencia de un campo de precaución, aislamiento o tipo de habitación.
- Completitud del catálogo de habitaciones: cuántas existen, cuáles están activas, si hay áreas no clínicas registradas.
- Latencia real entre el egreso físico y el registro del alta en el sistema, medida sobre los últimos tres meses.

Entregable: diccionario de datos confirmado y medición de latencia. Sin esto no se diseña nada.

### Fase 1 — Definición operativa con Facilities (3 a 5 días)

Trabajo de proceso, no técnico. Automatizar un proceso indefinido sólo acelera el desorden.

- Catálogo de habitaciones y áreas con clasificación de riesgo PCI.
- Matriz tipo de limpieza × frecuencia × tiempo estándar × insumos × EPP.
- Turnos, plantilla real de operarios y carga máxima razonable por operario y turno.
- Checklist por tipo de limpieza: qué se firma y qué se verifica.
- SLA de limpieza terminal desde el alta registrada.
- Matriz RACI: ejecuta, verifica, escala, aprueba excepciones.

Entregable: SOP borrador de limpieza hospitalaria. Corresponde a `@documentador-procesos`.

### Fase 2 — Diseño técnico y de seguridad (3 a 5 días)

Esquema D1 definitivo, contratos de la API, reglas del motor de programación y asignación, máquina de estados, matriz de roles y permisos, resolución del control de acceso descrito en el punto 9, y decisión sobre modo offline.

Entregable: especificación técnica revisada y aprobada.

### Fase 3 — Construcción y piloto (2 a 4 semanas)

Construcción del sincronizador, motor de programación, aplicación móvil de operario y panel de supervisión. Piloto acotado a un piso o una sede, en paralelo con el registro actual durante las dos primeras semanas para contrastar resultados.

Criterios de salida del piloto: cumplimiento de registro superior al 90 % de las órdenes generadas, coincidencia entre lo registrado en la aplicación y lo observado en campo, y ausencia de camas bloqueadas por fallas del sistema.

### Fase 4 — Escalamiento y reportería (2 a 3 semanas)

Despliegue al resto de sedes, tablero ejecutivo, alertas de incumplimiento y cuantificación del impacto en rotación de cama.

## 11. Indicadores del sistema

| Indicador | Uso |
|---|---|
| Cumplimiento de limpiezas programadas por turno y área | Control operativo diario |
| Tiempo desde alta registrada hasta limpieza terminal completada | Rotación de cama; traducible a impacto económico |
| Porcentaje de órdenes verificadas por supervisión | Confiabilidad de la evidencia |
| No conformidades y reincidencia por área y operario | Gestión de desempeño y capacitación |
| Cobertura de limpieza en habitaciones con aislamiento | Cumplimiento PCI |
| Carga efectiva por operario y turno | Dimensionamiento de plantilla |

El indicador de tiempo hasta limpieza terminal es el de mayor valor económico: cada hora de cama bloqueada por limpieza pendiente es capacidad instalada no utilizada. Su monetización corresponde a `@controlador-financiero-operativo` una vez existan datos del piloto.

## 12. Riesgos y controles

| Riesgo | Impacto | Control |
|---|---|---|
| Esquema de AlmightyCS no documentado o distinto al supuesto | Rediseño completo del sincronizador | Fase 0 bloqueante antes de cualquier diseño |
| Alta registrada tarde en Odoo | La limpieza terminal se dispara tarde y el automatismo pierde sentido | Medición de latencia; disparo manual complementario desde enfermería |
| Registro simulado por el operario | Evidencia sin valor ante auditoría | QR fijo por habitación, PIN, marcas de tiempo del servidor, verificación supervisora por muestreo |
| Sin cobertura de red en pisos o sótanos | Registro imposible en campo | Prueba de cobertura en Fase 1; modo offline si aplica |
| Endpoints sin autenticación en el Worker actual | Exposición de datos operativos y de ocupación | Control de acceso resuelto antes de construir (punto 9) |
| Doble captura y resistencia del personal | Baja adopción y datos incompletos | La aplicación sustituye el registro en papel, no lo duplica; capacitación y acompañamiento en piloto |
| Datos de paciente fuera del sistema clínico | Exposición de información sensible | Principio de dato mínimo (punto 6) |

## 13. Implicación JCI

**PCI — Prevención y Control de Infecciones.** La limpieza y desinfección ambiental de habitaciones, en particular la limpieza terminal y el manejo de habitaciones con precauciones de aislamiento, es materia directa de este capítulo. El estándar exige evidencia documentada y verificable del cumplimiento, no sólo la existencia del procedimiento. Un registro electrónico con responsable, fecha, hora y checklist firmado es exactamente el tipo de evidencia que un evaluador solicita, y hoy no existe de forma sistemática.

**FMS — Gestión y Seguridad de las Instalaciones.** El manejo de químicos de limpieza y el equipo de protección personal del operario deben quedar reflejados en el checklist y en el SOP asociado.

**MOI — Gestión de la Información.** El tratamiento de información del paciente fuera del sistema clínico exige justificación y control. El principio de dato mínimo del punto 6 es la medida que sostiene el cumplimiento.

Riesgo de no conformidad actual: sin registro sistemático y verificable de limpieza terminal, particularmente en habitaciones de aislamiento, la institución no puede demostrar cumplimiento ante evaluación. La aplicación cierra ese vacío siempre que la evidencia sea confiable, lo que depende del control anti-simulación del punto 8.

## 14. Decisiones que requieren definición del solicitante

1. ¿La aplicación reemplaza el registro actual en papel o convive con él durante el piloto?
2. ¿Los operarios cuentan con dispositivo móvil institucional o usan equipo personal?
3. ¿El alcance inicial es una sede o todas las compañías del grupo?
4. ¿Existe hoy un SOP de limpieza hospitalaria vigente, o debe construirse desde cero?
5. ¿Quién es el responsable funcional del proceso que aprueba la matriz de frecuencias y el SLA?
6. ¿Se requiere trazabilidad de insumos de limpieza consumidos, o queda fuera de la primera versión?

## 15. Siguientes pasos inmediatos

1. Confirmar las seis definiciones del punto 14 con Facilities.
2. Ejecutar la Fase 0 con acceso de solo lectura a Odoo y entregar el diccionario de datos confirmado junto con la medición de latencia del registro de alta.
3. Resolver el control de acceso del Worker existente, en paralelo y de forma independiente a este proyecto.
4. Convocar la sesión de definición operativa de la Fase 1 con Facilities y PCI.

Sólo al cerrar los puntos 1 a 4 se abre la construcción.

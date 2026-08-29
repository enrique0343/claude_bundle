# Modelo de procesos de referencia y matriz de brechas

**Fecha:** 29/08/2026
**Alcance:** el modelo internacional de procesos trazables para un hospital, el mapeo de cada punto de captura a su evento e identificador, y la brecha del catálogo de Avante frente a ese modelo.

---

## 1. Resumen ejecutivo

El catálogo de Avante es **mejor de lo que su estado de avance sugiere**. Contrastados sus 61 procesos contra el modelo internacional, la cadena principal está bien cubierta y hay tres aciertos que no son habituales en catálogos de esta madurez: existe un proceso dedicado a **identificar internamente los productos que llegan sin código de origen**, existe la **gestión de inventario por ubicación técnica** con el identificador correcto, y existe el **cierre de cuenta del paciente basado en eventos de consumo**, que es el equivalente exacto del proceso de conciliación que la literatura internacional considera el vínculo entre trazabilidad y recuperación de ingresos.

La brecha no está en la cadena principal. Está en dos lugares.

**Primero, en los procesos de sistema**: los que sostienen que la trazabilidad funcione y siga funcionando. Faltan por completo la gestión de excepciones y discrepancias, la verificación de la calidad de impresión y lectura de códigos, la gestión del ciclo de vida del identificador, la respuesta a solicitudes de rastreo, la retención y archivo del dato, y las pruebas periódicas del sistema. Son seis procesos que ningún grupo del catálogo cubre y que la literatura considera imprescindibles.

**Segundo, en el modelo de dato**: ningún proceso del catálogo declara qué evento de trazabilidad genera. Se documentan datos de control, que son campos de formulario. El estándar exige eventos con cinco dimensiones. Es la misma brecha señalada en la evaluación contra el estándar, y aquí se traduce en una tabla de mapeo concreta, punto de captura por punto de captura.

Y hay una omisión de identificador con consecuencia directa: **sin SSCC no hay agregación**, y sin agregación el traslado interno de una caja de medicación a una planta no es trazable como unidad. El Comité decidió usar SSCC para cajas de traslado; el modelo de datos maestros vigente no lo incluye.

---

## 2. La cadena hospitalaria y sus puntos de captura

El modelo internacional identifica dieciséis puntos donde un hospital captura dato de trazabilidad. Esta es la tabla de referencia, con el proceso de Avante que corresponde a cada uno y su estado real.

| # | Punto de captura | Qué se lee | Proceso de Avante | Estado |
|---|---|---|---|---|
| 1 | Recepción en muelle | SSCC de la etiqueta logística; GTIN, lote y vencimiento de las cajas | ILQ01 Recepción Física y Escaneo de Entrada | Documento sin datos de control |
| 2 | Control de calidad e inspección | GTIN, lote y serie | ILQ02 Inspección Técnica y Control de Calidad | Objetivo copiado de otro proceso; sin controles |
| 3 | Cuarentena y bloqueo | GTIN, lote, serie, SSCC | ILQ03 Gestión de Cuarentena | Parcial |
| 4 | Almacenamiento y acomodo | GTIN, lote, vencimiento; GLN con extensión de ubicación | ICM01 Acomodo y Reacomodo Dinámico | Parcial |
| 5 | Inventario físico y recuento | GTIN, lote, SSCC | ICM05 Auditoría de Inventarios | Parcial |
| 6 | Surtido | GTIN, lote, serie | ICM03 Picking y Packing | Identificador colisionado |
| 7 | Reposición de botiquines y carros | GTIN, lote, vencimiento; GLN del armario | ICM06 Gestión de Insumos · ILQ05 Distribución Interna | Objetivo copiado; sin controles |
| 8 | Reenvasado, monodosis y mezclas | GTIN entrante y lote; **GTIN nuevo propio del hospital** | PPC01 Fraccionamiento · PPC02 Re-etiquetado a Dosis Unitaria · PPC03 Mezclas IV y Nutrición Parenteral | **Sin hoja de detalle** |
| 9 | Dispensación | GTIN, lote o serie; identificador de la prescripción | PCC04 Prescripción y Validación Farmacéutica | **Sin contenido** |
| 10 | Administración a pie de cama | **GSRN del paciente, GSRN del cuidador**, GTIN con lote o serie, GLN de la ubicación | PCC05 Administración a Pie de Cama | **Sin contenido** |
| 11 | Quirófano e implante | GTIN con serie del implante; GSRN del paciente; GLN de quirófano; identificador de la bandeja | PCC06 Implantes y Dispositivos de Alto Valor | **Sin contenido** |
| 12 | Esterilización | Identificador del instrumento o bandeja; GLN de cada estación | SPR01 a SPR06 | **Sin hoja de detalle, los seis** |
| 13 | Laboratorio y muestras | GSRN del paciente; identificador de la muestra; GLN del laboratorio | PCC03 Trazabilidad de Muestras | Narrativa escrita, controles vacíos |
| 14 | Devolución | GTIN, lote o serie; SSCC si se reexpide | RLP01 Devoluciones de Piso a Farmacia · RLP02 Logística Inversa | **Sin hoja de detalle** |
| 15 | Destrucción y residuos | GTIN, lote o serie | RLP05 Control de Desechos | **Sin hoja de detalle** |
| 16 | Retiro de producto | GTIN y lote, más serie cuando exista | RLP03 Gestión de Retiros de Mercado | **Sin hoja de detalle** |

**Lectura de la tabla.** Los puntos 1 a 7 —la cadena logística— tienen proceso documentado, con calidad desigual. Los puntos 8 a 16 —donde la trazabilidad toca al paciente y donde está el valor clínico— **no tienen ninguno terminado**, y nueve de ellos no tienen ni siquiera hoja de detalle.

Es la inversión exacta del orden de valor: lo documentado es lo que menos protege al paciente.

### El punto de ruptura que suele quedar sin documentar

Hay un momento en el que el identificador de la unidad logística deja de tener sentido: cuando la caja se abre para repartir a plantas, el contenido cambia y **el SSCC se suspende**. Desde ahí la trazabilidad pasa a nivel de producto con su lote o serie.

Ese cambio de nivel es un punto de ruptura que los catálogos hospitalarios inmaduros no documentan, y es donde se pierde la cadena. En Avante, además, no puede documentarse todavía, porque el SSCC no existe en el modelo de datos.

---

## 3. Mapeo de punto de captura a evento

Cada punto de captura se modela como un evento con un tipo, un paso de negocio y una disposición. Esta es la correspondencia canónica, que debe incorporarse al bloque de eventos de la plantilla de proceso.

| Punto de captura | Tipo de evento | Paso de negocio | Disposición resultante |
|---|---|---|---|
| Recepción con alta en inventario | Observación | `receiving` | `in_progress` |
| Apertura de palé o caja | Agregación, acción de baja | `unpacking` | `in_progress`; `completeness_verified` si se verifica contenido |
| Inspección y control de calidad | Observación | `inspecting` | `conformant` o `non_conformant`; `damaged` si procede |
| Cuarentena | Observación | `holding` | `non_sellable_other`, o `expired` / `recalled` / `damaged` según causa |
| Discrepancia de recepción | Observación | `receiving` o `unpacking` | `mismatch_quantity`, `mismatch_class`, `mismatch_instance` |
| Acomodo | Observación | `storing` | `sellable_not_accessible` |
| Recuento cíclico | Observación | `cycle_counting` | — |
| Inventario contable | Observación | `stock_taking` | — |
| Surtido | Observación | `picking` | — |
| Armado de caja de traslado | Agregación, acción de alta | `packing` | — |
| Reposición de botiquín o carro | Observación | `stocking` | disponible en punto de uso |
| Traslado interno entre servicios | Par de observaciones | `shipping` y luego `receiving` | `in_transit` y luego `in_progress` |
| **Fraccionamiento, monodosis o mezcla** | **Transformación**, o alta del nuevo identificador | `commissioning`; `repackaging` si solo cambia el embalaje | `active` |
| Dispensación parcial | Observación | `dispensing` | `partially_dispensed` |
| Dispensación total | Observación | `dispensing` | `dispensed` |
| **Administración a pie de cama** | Observación con el paciente y el cuidador como partes | `dispensing`, con la prescripción como transacción asociada | `dispensed` |
| Implante en quirófano | Observación | `dispensing` para consumo; `installing` para instalación | `dispensed` |
| Retorno de implante no usado | Observación | `storing` o `receiving` | `sellable_not_accessible` |
| Montaje de bandeja o kit quirúrgico | Agregación | `assembling` | `active` |
| Desmontaje de kit | Desagregación | `disassembling` | — |
| Esterilización | Observación sobre el identificador del instrumento | valor genérico para pasos no enumerados | `unavailable` durante el reproceso; `available` al liberar |
| Reparación de instrumental | Observación | `repairing` | `conformant`, `non_conformant` o `needs_replacement` |
| Toma de muestra destructiva | Observación | `sampling` | debe cerrarse con evento de fin de vida |
| Devolución | Observación | `receiving`, `holding` o `shipping` | `returned` |
| Recogida para eliminación | Observación | `collecting` | `disposed` |
| **Destrucción** | Observación | `destroying` | `destroyed` |
| Baja del identificador sin destrucción | Observación | `decommissioning` | `inactive` |
| Producto retirado por seguridad | Observación | `holding` o `storing` | `recalled` |
| Producto caducado detectado | Observación | `holding` o `storing` | `expired` |
| Lectura de sensor de temperatura | Observación con dato de sensor | `sensor_reporting` | — |

### Tres advertencias de uso

**Primera: hay pasos mutuamente excluyentes.** El paso de recepción excluye la secuencia de llegada más aceptación. El de despacho excluye la secuencia de preparación, carga y salida. Hay que elegir el nivel de granularidad y ser consistente.

**Segunda: el vocabulario estándar no cubre todo lo que un hospital hace.** No existe paso propio para administración al paciente, esterilización, cuarentena farmacéutica ni devolución. La práctica documentada es usar el paso de dispensación con la prescripción como transacción asociada, el de retención con la disposición correspondiente, o el valor genérico previsto para pasos no enumerados. **Debe declararse explícitamente en el catálogo, no inventarse un valor propio**, porque un valor inventado rompe la interoperabilidad que justifica todo el proyecto.

**Tercera: la cadena de frío no se modela como atributo de origen.** Los datos de origen —vencimiento, fecha y lugar de fabricación— se declaran al crear el objeto. La temperatura cambia a lo largo de la vida del producto: es una lectura de sensor, no un atributo. Confundirlo produce un modelo de datos que no puede responder qué temperatura tuvo un lote durante el traslado.

---

## 4. Brecha por grupo de proceso

| Grupo | Cobertura del modelo internacional | Brecha principal |
|---|---|---|
| **SPS** Aprovisionamiento | Buena. Tres procesos documentados en Word con datos de control e indicadores | Falta el proceso de alta de artículo nuevo con validación de identificadores y la gestión formal de contratos. En SPS03 el GTIN se declara con estructura de «lista interna», lo que contradice el estándar |
| **ILQ** Logística de Ingreso | Muy buena en diseño. Cubre recepción, inspección, cuarentena, identificación interna, distribución y cadena de frío | ILQ04, que es el proceso de creación de objetos trazables que el estándar exige registrar, **está íntegramente vacío**. Ningún proceso del grupo declara evento |
| **ICM** Almacenamiento | Buena. Incluye ubicación técnica con el identificador correcto | Colisión de identificadores entre dos bandas. Falta la agregación en unidad logística. Ningún proceso declara evento |
| **PPC** Preparación farmacéutica | Diseño correcto: los cinco procesos son los que el modelo internacional espera | **Sin ninguna hoja de detalle.** Son los procesos de transformación, cuya relación entrada-salida el estándar exige registrar de forma explícita |
| **IDC** Tránsito Interno | Cubre despacho, ruta, cadena de frío, cambio de custodia e incidencias | Cuatro de cinco objetivos son copia literal de otro grupo. Una banda huérfana sin proceso. Sin SSCC, el cambio de custodia no es trazable como unidad |
| **PCC** Logística Clínica | El grupo mejor concebido y el más incompleto | Solo 3 de 7 procesos tienen contenido. **Faltan justo dispensación, administración a pie de cama, implantes e insumos en áreas críticas**, que son los cuatro puntos de mayor valor clínico |
| **SPR** Esterilización | Los seis procesos corresponden al ciclo internacional de reproceso | **Sin ninguna hoja de detalle.** Es el grupo con mayor exposición de control de infecciones |
| **RLP** Logística Inversa y Farmacovigilancia | Cobertura conceptual completa: devoluciones, cuarentena de salida, retiro, eventos adversos, desechos y farmacovigilancia | **Sin ninguna hoja de detalle.** Incluye el proceso de retiro de producto, que es el que la evidencia internacional muestra como el de retorno más inmediato |
| **PDT** Egreso | Incluye el cierre de cuenta basado en eventos de consumo, que es un acierto | **Sin ninguna hoja de detalle.** Falta el registro obligatorio del identificador de implantes al alta |
| **CGR** Gobernanza y Cumplimiento | Cubre auditoría de datos maestros, controlados, cadena de frío y estándares | **Sin ninguna hoja de detalle.** CGR02, sustancias controladas, es el vacío de mayor riesgo legal |
| **GTZ** Gestión de Trazabilidad | Es el grupo que sostiene todo el sistema: datos maestros, interoperabilidad, auditoría del circuito, infraestructura de captura y certificación | **Sin ninguna hoja de detalle.** El núcleo del proyecto GS1 no está documentado |

---

## 5. Procesos que faltan en el catálogo

Estos seis no corresponden a ningún proceso de los 61 y la literatura internacional los considera imprescindibles. No son refinamientos: son las razones habituales por las que un sistema de trazabilidad se degrada tras el primer año.

**1. Gestión de excepciones y discrepancias.** Qué se hace cuando lo recibido no coincide con lo declarado, cuando un código no lee, cuando falta una etiqueta o cuando un evento se registró mal. El vocabulario estándar tiene disposiciones específicas para discrepancia de cantidad, de clase y de instancia, y un mecanismo formal de declaración de error. La evidencia clínica publicada identifica precisamente la gestión deficiente de excepciones como el origen de los atajos del personal que anulan la salvaguarda.

**2. Verificación de calidad de impresión y lectura.** Existen normas internacionales de calidad de símbolo con escala de grados y formato de reporte obligatorio. Sin este proceso, la causa más frecuente de fallo del escaneo —el código ilegible— no tiene dueño ni medición. Avante tiene además un caso propio ya medido: veintitrés registros del maestro guardan el contenido íntegro del DataMatrix dentro del campo de código, lo que indica que ya hay lectura sin validación de destino.

**3. Gestión del ciclo de vida del identificador.** Alta, codificación, reserva, baja del identificador con el objeto aún existente, y baja del objeto. Con una regla que conviene fijar por escrito: **el GTIN no se reutiliza en salud**. Sin este proceso, el maestro acumula identificadores zombis y la trazabilidad histórica se corrompe.

**4. Solicitud y respuesta a rastreos.** Cómo se recibe una petición de rastreo —de un proveedor, de la autoridad sanitaria, de un comité interno—, quién la responde, en qué plazo y con qué evidencia. Es el proceso que convierte el repositorio de eventos en una capacidad utilizable.

**5. Retención y archivo del dato de trazabilidad.** El estándar lo exige de forma explícita y **ningún documento del proyecto define período de retención**. Debe alinearse con la normativa local y con el período de conservación del expediente clínico.

**6. Pruebas periódicas y simulacros.** La práctica recomendada incluye formación anual del personal clave y **simulacros periódicos de rastreo y de retiro**, con separación de roles entre quien inicia y quien aprueba un retiro. GTZ05 cubre capacitación, pero no la prueba del sistema.

### Cuatro más, según el perfil de Avante

- **Préstamos y consignación de implantes.** Recepción de bandejas en préstamo, devolución al prestador, y el stock del representante comercial que no está registrado en ningún sistema. Es un punto ciego habitual y de alto valor unitario.
- **Donaciones, bienes de terceros y muestras médicas.** Medicamentos aportados por el paciente o por un tercero pagador, y producto para ensayo clínico. Entran al circuito sin proceso de alta.
- **Trazabilidad de hemoderivados**, si Avante los maneja, con el vínculo bolsa–donante–receptor.
- **Gestión de activos y equipamiento**, con mantenimiento, reparación y baja.

---

## 6. Secuencia de trabajo propuesta

La ordena la dependencia técnica, no la urgencia percibida.

### Fase 0 — Desbloquear (0 a 6 semanas)

Cuatro acciones que no dependen de nadie más y sin las cuales lo demás no avanza.

1. **Sustituir los lectores** por equipos capaces de leer DataMatrix y verificar la cobertura inalámbrica. Vía de alquiler con cláusula de continuidad sujeta a resultado.
2. **Declarar el maestro único** de procesos y aplicar la columna de estado a los 61.
3. **Añadir el bloque de eventos** a la plantilla de proceso y corregir los defectos heredados de la duplicación de hojas.
4. **Corregir el marco regulatorio citado**: sustituir DNM por SRS y resolver la asignación del identificador de paciente al GSRN.

### Fase 1 — Cerrar el dato maestro (6 a 16 semanas)

5. **Recuperar los 23 registros** que guardan el DataMatrix completo, parseándolos a GTIN, lote y vencimiento. Es la única fuente de lote y vencimiento que hoy existe en el maestro.
6. **Crear las columnas de lote y vencimiento** y capturarlas en recepción. Es lo que exige la ley salvadoreña y lo que habilita el retiro dirigido.
7. **Cerrar la cobertura de código**, priorizando por riesgo: los nueve medicamentos controlados sin código primero, luego los insumos críticos.
8. **Definir el SSCC** y añadirlo al modelo de datos, para habilitar la agregación.
9. **Completar la asignación de GLN** con extensión hasta el nivel de ubicación fina.

### Fase 2 — Documentar donde está el valor (16 a 32 semanas)

10. Documentar con la plantilla nueva, en este orden: **retiro de producto**, **administración a pie de cama**, **identificación de productos sin código de origen**, **fraccionamiento y monodosis**, y **cierre de cuenta por eventos de consumo**. Son los cinco procesos donde la evidencia internacional muestra retorno más rápido y donde Avante tiene medida su propia debilidad.
11. Documentar los seis procesos de sistema ausentes.
12. Completar el grupo de esterilización y el de logística inversa.

### Fase 3 — Operar y medir

13. Piloto con medicamento definido y línea base medida antes de empezar.
14. Simulacro de retiro con cronómetro. Es la demostración más convincente ante Dirección y ante evaluador de acreditación.
15. Auditoría periódica y ampliación por área.

---

## 7. Indicadores del sistema

El estándar expresa cada indicador como porcentaje del alcance declarado, y **el alcance formal de Avante todavía no está declarado**, lo que es el primer prerrequisito a cubrir. Con esa salvedad, estos son los indicadores que miden el sistema.

| Indicador | Línea base actual | Meta de fase 1 |
|---|---|---|
| Productos con identificador válido y escaneable | 46,4 % | 90 % en medicamentos, 100 % en controlados |
| Productos con lote capturado | 0 % | 100 % en medicamentos e insumos críticos |
| Productos con vencimiento capturado | 0 % | 100 % en medicamentos e insumos críticos |
| Ubicaciones con identificador asignado | por confirmar | 100 % de almacenes y botiquines |
| Pacientes con identificador emitido | 0 % | 100 % de hospitalizados |
| Eventos de recepción registrados | 0 % | 100 % de las recepciones del área piloto |
| Tiempo de localización de un lote | no medible | menos de 2 horas |
| Tasa de lectura correcta al primer intento | no medida | por establecer tras el piloto |
| Calidad del dato de trazabilidad, escala del estándar | nivel 1 a 2 | nivel 4 |

Los tres primeros son medibles hoy y deberían publicarse mensualmente desde ya: son la evidencia más simple de que el proyecto avanza o no.

---

## 8. Vacíos de información pendientes

- **El alcance formal del sistema no está declarado.** El estándar exige delimitar seis variables —qué objetos, qué precisión, qué ubicaciones propias, qué proveedores, qué clientes y qué terceros— antes de poder medir cualquier indicador. Es una decisión del Comité, no un dato a investigar.
- **No consta el medicamento piloto**, comprometido y nunca definido.
- **No consta si Avante maneja hemoderivados ni implantes en consignación**, lo que determina si los procesos correspondientes entran en el catálogo.
- **El mapeo de eventos a los modelos de Odoo v18 no se pudo validar** contra producción: el servidor de solo lectura no conectó. El mapeo a nivel de modelo existe en la especificación funcional del WMS, pero **no hay mapeo a nivel de campo en ningún documento**, y cinco de los modelos citados en esa especificación no existen con ese nombre en la versión 18. Debe resolverse antes de construir.
- **El vocabulario estándar carece de paso de negocio propio** para administración al paciente, esterilización, cuarentena farmacéutica y devolución. Las alternativas están indicadas en la tabla de mapeo; la elección entre ellas es una decisión de Avante que debe quedar documentada y aplicarse de forma consistente.

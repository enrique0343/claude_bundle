# Marco internacional de GS1 Healthcare

**Fecha:** 29/08/2026
**Alcance:** qué es el sistema de estándares GS1 aplicado a salud, qué exigen los reguladores en los mercados de referencia, qué exige realmente El Salvador, y qué evidencia existe sobre lo que un hospital obtiene al implantarlo.

---

## 1. Resumen ejecutivo

Tres conclusiones ordenan este documento.

**Primera: existe una guía específica para hospitales que Avante no está usando.** El estándar que el proyecto tomó como base —el Global Traceability Standard 2.0— es sector-neutral y de 2017. GS1 publica además un **Global Traceability Standard for Healthcare con su guía de implantación**, un decálogo de implantación para prestadores de salud, y guías nombradas para GLN en hospitales, para captura automática en salud y para EPCIS y su vocabulario. Adoptar ese cuerpo, en lugar de traducir por cuenta propia un estándar genérico, ahorra meses de diseño y elimina la mayoría de los errores de asignación de identificadores detectados en el catálogo actual.

**Segunda: El Salvador no obliga a nada de esto.** La verificación sobre el texto íntegro de la Ley de Medicamentos y su Reglamento arroja **cero ocurrencias** de «trazabilidad», «código de barras» y «serialización». Lo exigible es identificación **a nivel de lote en texto legible**: lote, fecha de vencimiento y número de registro sanitario en el envase. Cualquier lectura automatizada que Avante implante es buena práctica voluntaria, no obligación legal.

Esto no debilita el proyecto: lo reencuadra. **El argumento de Avante no es el cumplimiento, es la seguridad del paciente, la acreditación y la economía de la operación.** Presentarlo como obligación regulatoria sería inexacto y además frágil, porque el primer directivo que verifique la ley encontrará que no lo es.

**Tercera: hay una corrección normativa que el proyecto arrastra.** La Dirección Nacional de Medicamentos **dejó de existir** como autoridad autónoma el 7 de agosto de 2024. La sucede la **Superintendencia de Regulación Sanitaria (SRS)**, que además absorbió funciones del Consejo Superior de Salud Pública. Varios documentos del proyecto siguen citando a la DNM como autoridad vigente, incluido el riesgo crítico de sustancias controladas de la especificación del WMS.

---

## 2. El sistema de estándares aplicado a salud

### 2.1 Las llaves de identificación

| Llave | Qué identifica | Uso hospitalario |
|---|---|---|
| **GTIN** | Producto comercial | Medicamento, insumo, dispositivo. Es también el identificador de dispositivo del UDI |
| **GTIN + lote** | Producto a nivel de lote | El nivel mínimo exigible para todo medicamento e insumo crítico |
| **GTIN + serie** | Producto a nivel de instancia | Controlados, implantes, dispositivos de alto riesgo |
| **GLN** | Parte y ubicación | Entidad legal, proveedor, sede, almacén |
| **GLN con componente de extensión** | Ubicación interna fina | Estante, contenedor, sala, cama |
| **SSCC** | Unidad logística | Palé o caja de traslado. Es lo que permite agregar y desagregar |
| **GSRN** | Persona en una relación de servicio | Paciente e identificación del profesional sanitario |
| **GIAI** | Activo individual | Equipo biomédico, instrumental |
| **GRAI** | Activo retornable | Contenedor y bandeja que vuelven al circuito |
| **GDTI** | Documento | Prescripción, orden, informe |

Los identificadores de aplicación relevantes son el 01 para el GTIN, el 10 para el lote, el 17 para el vencimiento, el 21 para la serie, el 00 para el SSCC, el 254 para la extensión de ubicación, y **el 8017 para el GSRN del prestador y el 8018 para el GSRN del receptor**.

> **Corrección necesaria en la documentación de Avante.** La especificación funcional del WMS asigna el AI 8013 al identificador de paciente y lo define de dos maneras contradictorias dentro del mismo documento. El 8013 es el número global de modelo, que identifica modelos de dispositivo, no personas. El identificador de paciente es el **GSRN con AI 8018**, tal como lo fija el modelo de datos maestros de agosto de 2026 y como lo usa el programa británico de referencia. Debe resolverse antes de construir los procesos de identidad del paciente y de egreso.

### 2.2 Portadores de datos

El DataMatrix es la simbología adoptada por el Comité de Avante, y es la elección correcta para envase de medicamento y dispositivo pequeño, porque codifica GTIN, lote, vencimiento y serie en una superficie mínima. El GS1-128 es el portador de la etiqueta logística que transporta el SSCC.

La consecuencia operativa ya está identificada en acta: **los lectores láser lineales instalados no leen DataMatrix**. Es un bloqueo de hardware, no de diseño, y detiene toda la cadena de captura.

### 2.3 Guías que conviene adoptar

| Guía | Para qué sirve en Avante |
|---|---|
| **Global Traceability Standard for Healthcare — guía de implantación** | Versión sectorial del estándar base; traduce el marco genérico a la cadena hospitalaria |
| **The 10-step guide for healthcare providers to implement GS1 standards** | Método de proyecto de diez pasos, específico para prestadores |
| **Healthcare GLN Implementation Guideline** | Cómo aplicar GLN en hospital: marcado físico de ubicación, seguridad del paciente, gestión de equipo estéril y de activos médicos |
| **AIDC Healthcare Implementation Guideline** | Qué portador usar en qué nivel de empaque, y qué datos adicionales exige cada tipo de producto |
| **GS1 DataMatrix Guideline** | Sintaxis, reglas de codificación y colocación del símbolo |
| **EPCIS and CBV Implementation Guideline** | Cómo modelar cada punto de captura como evento con su paso de negocio y su disposición |
| **Healthcare GTIN Allocation Rules** | Cuándo hay que asignar un GTIN nuevo, y quién es responsable de asignarlo cuando farmacia prepara un producto para un paciente concreto |
| **GDSN Healthcare Use Cases Guideline** | Sincronización de datos maestros con proveedores |

Las dos últimas resuelven directamente dos vacíos del catálogo actual: el proceso de identificación interna de productos sin código de origen, hoy vacío, y el protocolo de sincronización de datos maestros, hoy citado como documento de entrada pero sin contenido.

### 2.4 Verificación de calidad del código

Existe un cuerpo normativo específico para verificar que un código impreso es legible: normas internacionales de calidad de impresión para símbolos lineales y bidimensionales, con una escala de grados y un formato obligatorio de reporte.

Esto importa porque **la evidencia clínica publicada identifica la ilegibilidad del código como la principal barrera práctica del escaneo a pie de cama**: códigos arrugados, manchados, rotos, ausentes o tapados por otra etiqueta, escáneres no disponibles y fallos de lectura. La consecuencia documentada es que el personal desarrolla atajos que anulan la salvaguarda. Un proceso de verificación de calidad de impresión no es un lujo técnico: es lo que evita que el sistema se abandone en el segundo mes.

---

## 3. Qué exige la regulación internacional

Se distingue en todo momento entre obligación legal vigente, obligación futura con fecha y buena práctica voluntaria.

**Estados Unidos.** La ley de seguridad de la cadena de suministro de medicamentos obliga a trazabilidad electrónica a nivel de paquete, con serialización e intercambio de datos de eventos entre socios. Los dispositivos médicos llevan identificador único obligatorio con su base de datos pública asociada.

**Unión Europea.** La directiva de medicamentos falsificados obliga a identificador único por envase y verificación en el punto de dispensación, con un sistema europeo de repositorios. Los reglamentos de dispositivos médicos y de diagnóstico in vitro obligan al identificador único de dispositivo con su base de datos europea. Hay una obligación que conviene retener porque aplica al hospital y no al fabricante: **las instituciones sanitarias deben almacenar y conservar, preferentemente por medios electrónicos, el identificador único de los dispositivos implantables de clase III** que hayan suministrado o recibido.

**Otros mercados con mandato.** Arabia Saudí, Turquía, China, Rusia, Corea del Sur y Argentina operan sistemas nacionales de trazabilidad de medicamentos con distinto grado de madurez. India transita de un régimen de exportación a uno de mercado interno. **Brasil derogó su sistema nacional**, lo que conviene tener presente antes de citarlo como referencia regional.

**Norma internacional de identificación de medicamentos.** Existe una familia de normas ISO para la identificación estructurada de medicamentos, cuya implantación europea avanza por fases. Es relevante a medio plazo para el catálogo maestro, no para el piloto.

---

## 4. Qué exige El Salvador

### 4.1 La autoridad cambió

**La Dirección Nacional de Medicamentos dejó de existir como autoridad autónoma el 7 de agosto de 2024.** La Ley de la Superintendencia de Regulación Sanitaria, Decreto Legislativo 891, transfirió a la **SRS** las funciones, atribuciones, competencias y obligaciones de la DNM, y además absorbió funciones del Consejo Superior de Salud Pública.

Toda referencia normativa a «la Dirección» en la Ley de Medicamentos y su Reglamento debe leerse hoy como referida a la SRS.

> **Acción concreta.** La especificación funcional del WMS clasifica como riesgo crítico «activar sustancias controladas sin habilitación DNM» y asigna la gestión a Gerencia Legal. El riesgo sigue siendo válido; la autoridad citada, no. Debe corregirse en ese documento y en todos los procesos que citen a la DNM. Los procesos del grupo de Logística de Ingreso ya citan correctamente a la SRS, de modo que el cuerpo documental es hoy inconsistente consigo mismo.

### 4.2 No hay mandato de serialización ni de código de barras

La verificación se hizo sobre el texto íntegro de la Ley de Medicamentos y de su Reglamento General:

| Término buscado | Ley de Medicamentos | Reglamento |
|---|---|---|
| trazabilidad | 0 ocurrencias | 0 ocurrencias |
| código de barras | 0 ocurrencias | 0 ocurrencias |
| serialización | 0 ocurrencias | 0 ocurrencias |
| codificación | 0 | 7, todas referidas al formato del número de registro sanitario |

**El Salvador no tiene mandato legal de serialización de unidades, ni de código de barras obligatorio en el envase, ni de sistema nacional de trazabilidad de medicamentos, ni de identificador único de dispositivos médicos.** No debe afirmarse lo contrario en ningún entregable del proyecto.

### 4.3 Lo que la ley sí exige

La trazabilidad exigible es **a nivel de lote, con datos en texto legible**. El fabricante debe consignar en el envase, entre otros datos, la **fecha de caducidad**, el **número de lote de fabricación** y el **número de registro sanitario**. El titular debe presentar **certificado de control de calidad por cada lote** de producción o importación. La autoridad supervisa que exista un sistema de calidad con requisitos de recepción, almacenamiento, transporte y distribución, en el sector público y en el privado.

El registro sanitario tiene **vigencia de cinco años** y once causales de cancelación, entre ellas la adulteración, el incumplimiento de buenas prácticas de manufactura y el resultado adverso de la vigilancia posterior a la comercialización.

> **Implicación regulatoria.** La obligación legal salvadoreña —lote, vencimiento y registro sanitario— es exactamente la dimensión que **el maestro de productos de Avante no captura**: no existen columnas de lote ni de vencimiento, y el registro sanitario vive en un maestro externo con cero por ciento de integración. El riesgo no es de serialización, que no es exigible; es de no poder demostrar control de lote y de vigencia de registro ante una inspección o ante un retiro de producto.

### 4.4 Cómo se traduce esto para Avante

El caso del proyecto se sostiene en tres pilares, y ninguno es el cumplimiento de un mandato de serialización:

1. **Seguridad del paciente**, que es donde la evidencia internacional es más contundente.
2. **Acreditación JCI**, que exige trazabilidad de lote, control de conservación, identificación correcta del paciente y capacidad de retiro dirigido.
3. **Economía de la operación**: inventario liberado, merma evitada, tiempo clínico recuperado y recuperación de ingresos por consumo no facturado.

El cumplimiento legal salvadoreño se obtiene **como subproducto** de capturar lote y vencimiento, que es el primer paso del proyecto de todas formas.

---

## 5. Qué exige la acreditación

Los capítulos de JCI que este proyecto toca son los de gestión y uso de medicamentos, control de infecciones, metas internacionales de seguridad del paciente y gestión de instalaciones.

Los códigos que este entregable cita —MMU.3, MMU.3.1, MMU.3.2, MMU.4, MMU.4.1 y PCI genérico— son los ya adoptados por el repositorio institucional de Avante. **Los códigos IPSG con subnúmero se marcan siempre como propuesta a validar**, porque el repositorio nunca los ha asignado a un caso concreto y la regla institucional prohíbe presentar inferencia como dato confirmado.

Conviene notar la coincidencia de fondo: el estándar de trazabilidad formula el objetivo del sector salud como garantizar «la administración del producto médico correcto, en la cantidad correcta, en el momento correcto, al paciente correcto, por un cuidador autorizado». Es el mismo enunciado que la acreditación persigue por otra vía. **La trazabilidad no es un proyecto paralelo a la acreditación: es su instrumentación.**

---

## 6. Qué obtiene un hospital: la evidencia

El programa de referencia internacional es el británico, con seis hospitales demostradores entre 2016 y 2018 y evaluación publicada. Su marco conceptual —persona, producto, lugar, proceso— y sus tres identificadores base —GTIN para producto, GLN para ubicación y **GSRN para paciente y clínico**— son los mismos que Avante ya adoptó.

### Resultados agregados de los seis hospitales

| Métrica | Resultado |
|---|---|
| Tiempo clínico devuelto a la atención | **140.000 horas** en dos años |
| Ahorro recurrente de inventario | cerca de **£5 millones** |
| Reducción no recurrente de inventario | **£9 millones** |

### Resultados que importan para el caso de Avante

Los que se parecen a los problemas ya medidos en este hospital:

- **Retiro de producto.** Un hospital redujo el tiempo medio de recall de **8,33 días a menos de 35 minutos**, gestionando unos 500 retiros al año. Otro segregó el stock afectado **en 2 horas** y notificó a todos los facultativos en 8 horas laborables. Avante hoy no puede ejecutar un retiro dirigido, porque no captura lote.
- **Errores de dispensación.** El escaneo en farmacia produjo una **reducción del 76 %** en la tasa de errores prevenidos y la **eliminación total** de los errores por paciente equivocado, fármaco equivocado, dosis equivocada y forma equivocada, en una farmacia que dispensa más de 40.000 ítems al mes. El proceso resultó además un 7 % más rápido, y el 97 % del personal encuestado coincidió en que reduce el riesgo.
- **Caducidades ocultas.** Al reorganizar un almacén con identificación por ubicación, **el 6 % de los implantes ortopédicos en estantería ya estaba caducado**. Es exactamente el hallazgo que un inventario sin lote ni vencimiento no puede producir.
- **Tiempo de enfermería.** La toma de constantes pasó de 5 minutos 11 segundos a 3 minutos 22 segundos, una reducción del 35 %. En hemodinamia se liberó por completo a personal de enfermería de tareas de control de stock.
- **Continuidad asistencial.** Un hospital eliminó los aproximadamente **80 pacientes al año que no podían operarse por rotura de stock**.

### Dos advertencias de la misma evidencia

El retorno **tarda**: uno de los hospitales recomienda contar con veinticuatro meses para verlo. Y el hospital en déficit financiero **alquiló la tecnología en lugar de comprarla** —nueve quirófanos por doce meses, con cláusula de cancelación si no había retorno—, que es una vía sensata para el piloto de Avante dado que el bloqueo actual es de hardware.

---

## 7. Recomendación

**Primera: adoptar el cuerpo de guías sectoriales de GS1 Healthcare como referencia del proyecto**, en lugar de traducir por cuenta propia el estándar genérico. En concreto, la guía de implantación del estándar de trazabilidad para salud, el decálogo para prestadores, la guía de GLN en hospitales y las reglas de asignación de GTIN en salud. Es material publicado, gratuito y específico, y resuelve directamente los vacíos del catálogo.

**Segunda: corregir el marco regulatorio citado en toda la documentación.** Sustituir DNM por SRS, y reformular el caso del proyecto: la serialización no es obligación legal en El Salvador; lo exigible es lote, vencimiento y registro sanitario, que es justo lo que hoy no se captura.

**Tercera: reencuadrar el argumento ante Dirección.** El caso no es de cumplimiento sino de seguridad del paciente, acreditación y economía. La evidencia internacional está disponible y es cuantificada, y los resultados más contundentes —retiro dirigido en minutos, eliminación de errores de dispensación, caducados ocultos en estantería— corresponden uno a uno con las debilidades ya medidas en Avante.

**Cuarta: resolver el bloqueo de hardware por la vía de menor compromiso.** Alquiler o piloto acotado de lectores capaces de leer DataMatrix en un área, con cláusula de continuidad sujeta a resultado, siguiendo el precedente documentado.

---

## 8. Vacíos de información pendientes

- **No se localizó edición reciente del compendio anual de casos de GS1 Healthcare** bajo su nombre histórico. Antes de citarlo como publicación vigente conviene verificarlo con GS1.
- **No existe una lista global única de atributos obligatorios de datos maestros para salud.** La obligatoriedad resulta de la combinación del modelo global de datos, la guía de implantación de ítems comerciales y la capa local de cada mercado. Debe definirse con GS1 El Salvador.
- **El vocabulario de negocio no tiene un paso específico para administración al paciente, esterilización, cuarentena farmacéutica ni devolución.** La práctica documentada es usar el paso de dispensación con la prescripción como transacción asociada, el paso de retención con su disposición correspondiente, o el valor genérico previsto para pasos no enumerados. Conviene declararlo explícitamente en el catálogo de procesos **en lugar de inventar valores propios**.
- **Ninguna de las cifras de evidencia internacional es extrapolable directamente** a Avante sin ajustar por tamaño, casuística y línea base. Se citan como orden de magnitud y como demostración de que el resultado es alcanzable, no como pronóstico.

# El estándar internacional y la evaluación de Avante

**Documento base:** GS1 Global Traceability Standard (GTS), Release 2.0, ratificado en agosto de 2017.
**Fecha del análisis:** 29/08/2026
**Propósito:** establecer qué exige el estándar internacional para el diseño de un sistema de trazabilidad, y medir contra esos requisitos el estado real de Avante.

---

## 1. Resumen ejecutivo

El GTS 2.0 no es un catálogo de procesos. Es un **marco de requisitos auditables**: dieciocho requisitos numerados, agrupados en cuatro bloques, cada uno con sus propios indicadores expresados como porcentaje del alcance declarado. Esa es su utilidad práctica para Avante: **convierte «tener trazabilidad» en una medición, no en una opinión.**

Medida contra ese marco, la posición de Avante es la siguiente. El **diseño** está razonablemente avanzado: los identificadores están elegidos, el modelo de datos maestros está construido campo por campo y el catálogo de procesos existe. La **ejecución** no ha empezado: ningún identificador GS1 está emitido en producción, ningún proceso registra eventos y no existe repositorio de eventos en ningún documento del proyecto.

Hay además una brecha estructural que no se resuelve completando lo pendiente, porque es de modelo: **el estándar exige registrar eventos; Avante documenta datos de control.** No son lo mismo, y la diferencia decide si el sistema puede responder «dónde estuvo este lote y quién lo tocó» o solamente «qué campos llena este formulario».

Y hay una advertencia sobre el propio marco de referencia que conviene fijar antes de seguir, porque circula desactualizada.

---

## 2. Advertencia sobre el marco de referencia

Es frecuente encontrar citado, en material de consultoría y en presentaciones, un modelo de cinco procesos de trazabilidad —planificar y organizar, alinear datos maestros, registrar, solicitar rastreo, usar la información— y una taxonomía de roles con nombres como *traceable item source*, *creator* y *recipient*.

**Nada de eso está en el GTS 2.0.** Pertenece a la versión 1.3 del estándar, de noviembre de 2012, que la versión 2.0 sustituyó y que hoy figura únicamente como referencia bibliográfica no normativa.

Esto importa para Avante por una razón práctica: si un entregable de proveedor o consultor estructura los procesos sobre ese modelo de cinco procesos, está trabajando sobre un marco derogado hace nueve años. Es exactamente el tipo de verificación que la jerarquía de fuentes del documento anterior obliga a hacer.

De la misma manera, el GS1 Digital Link no aparece en el GTS 2.0, porque se publicó un año después. El estándar de habilitación web que el documento cita es su antecesor.

Lo que el GTS 2.0 sí ofrece, y que hay que usar en lugar del modelo derogado, son tres artefactos: los tres componentes del sistema, los cuatro bloques de requisitos y una metodología de trece pasos en tres fases.

---

## 3. Qué exige el estándar

### 3.1 Los tres componentes de un sistema de trazabilidad

1. **Identificación, marcado y atribución** de objetos trazables, partes y ubicaciones.
2. **Captura automática** —por escaneo o lectura— de los movimientos y eventos que involucran un objeto.
3. **Registro y compartición** del dato, interna y externamente, para que la visibilidad se materialice.

El orden es una dependencia, no una preferencia. Sin identificación no hay captura; sin captura no hay evento que registrar.

### 3.2 Las cinco dimensiones del dato

Todo evento de trazabilidad responde cinco preguntas: **quién, qué, cuándo, dónde y por qué**. La quinta es la que distingue un sistema de trazabilidad de un registro de inventario: el «por qué» declara qué paso de negocio ocurrió y en qué estado quedó el objeto. El propio estándar lo ilustra con un ejemplo hospitalario: *un evento de dispensación indica que un medicamento determinado fue entregado a un paciente.*

### 3.3 Los cuatro bloques de requisitos

| Bloque | Requisitos | Salida esperada |
|---|---|---|
| Identificación y dato estático | R01–R06 | Llaves GS1 asignadas y registro de datos maestros asociados |
| Captura automática | R10–R11 | Objetos marcados al nivel de precisión correcto con estándar abierto |
| Registro de datos | R20–R26 | Datos de relación por ítem y eventos críticos con sus datos clave |
| Compartición de datos | R30–R32 | Provisión y recepción en plazo, retención y estándares abiertos |

El estándar es explícito en que estos requisitos permiten **evaluar el sistema de forma no binaria**: cada indicador se expresa como porcentaje de la cantidad total en alcance. No se aprueba ni se reprueba; se mide.

### 3.4 El requisito que define el modelo de datos

El más importante para Avante es el **R23**, que fija el contenido mínimo de todo evento crítico de trazabilidad:

- Fecha y hora del evento, **incluida zona horaria y desfase respecto a UTC**
- Identificador del objeto trazable **a nivel de instancia o de lote** — el nivel de clase no es admisible para el mínimo
- Identificador de la ubicación donde ocurrió el evento
- **Paso de proceso de negocio y disposición** del objeto
- Identificador de la parte responsable, cuando difiere de quien gestiona la ubicación

Junto a él, tres requisitos cubren los casos que un hospital ejecuta a diario: el **R24** obliga a registrar la relación entre entradas y salidas cuando un objeto se **transforma**; el **R25** obliga a registrar la relación padre-hijo en cada nivel de contención cuando se **agrega o desagrega**; y el **R22** obliga a registrar el evento en que un objeto trazable **se crea por primera vez**.

### 3.5 Qué dice el estándar sobre el sector salud

El GTS 2.0 dedica un apartado específico a salud, y su formulación es notablemente cercana al lenguaje de acreditación:

> «La trazabilidad es esencial para garantizar los derechos del paciente: la administración del producto médico correcto, en la cantidad correcta, en el momento correcto, al paciente correcto, por un cuidador autorizado.»

Señala cuatro rasgos propios del sector: el **paciente y el cuidador son partes interesadas clave**; existen jurisdicciones con **requisitos regulatorios** de trazabilidad de medicamentos y dispositivos; el alcance de lo trazado va **desde registros médicos y activos móviles hasta productos sanitarios e instrumental quirúrgico**; y la trazabilidad se implanta **tanto dentro del hospital como entre socios de la cadena**.

Menciona expresamente el **escaneo a pie de cama** como técnica de captura de dato transaccional, y el **evento de dispensación** como ejemplo canónico de la dimensión «por qué». El estándar fue redactado con participación directa de hospitales y fabricantes del sector.

> **Nota de inferencia.** Los cinco «correctos» del párrafo de salud corresponden conceptualmente a los capítulos MMU e IPSG de JCI. El GTS 2.0 no cita JCI en ningún punto; la correspondencia es interpretativa y se marca como tal.

---

## 4. Evaluación de Avante contra los requisitos

La medición usa las cifras declaradas por los propios documentos del proyecto al 23–25 de agosto de 2026 y la medición independiente del repositorio de datos del sitio. **La base de Odoo v18 no se pudo consultar** en esta sesión, de modo que ninguna cifra está validada contra producción.

### Bloque 1 — Identificación

| Req. | Qué exige | Estado en Avante | Semáforo |
|---|---|---|---|
| **R01a** | Identificador único global para cada ítem comercial creado o gestionado | 53,7 % de los productos tiene código; 46,4 % es escaneable. Los productos que Avante **crea** —unidosis fraccionada, mezclas— no tienen proceso de asignación: ILQ04, que es exactamente ese proceso, está vacío | Rojo |
| **R01b** | Identificador único para cada unidad logística despachada | **Sin cobertura.** El SSCC no aparece en el modelo de datos maestros v2.0 ni en el catálogo de ítems trazables, pese a que el Comité decidió usarlo para cajas de traslado | Rojo |
| **R01c** | Identificador único para los activos gestionados | GIAI previsto para instrumental en fase 2 de la especificación del WMS; **ausente del modelo de datos v2.0**. GRAI no considerado en ningún documento | Rojo |
| **R02** | Registrar los identificadores creados por terceros y recuperar sus datos maestros | Se registra el código del fabricante, pero **no se capturan lote ni vencimiento**: la dimensión no existe como campo. 23 registros guardan el contenido íntegro del DataMatrix dentro del campo de código | Rojo |
| **R03a** | Identificación serializada donde se requiera | 9 productos con seguimiento por serie en el maestro. Medicamentos controlados: 43,8 % con código, y su condición de controlado depende de una categoría editable | Rojo |
| **R03b** | Identificación a nivel de lote donde se requiera | 4.877 productos con seguimiento por lote, pero **3.690 productos declaran seguimiento «ninguno»** y están pendientes de validación | Ámbar |
| **R04** | Identificador único para cada parte | GLN diseñado con sus identificadores de aplicación y asignación en curso; **20 % de llenado**. GSRN diseñado para paciente y personal; **cero emitidos**. Licencia profesional al 1 % | Ámbar |
| **R05** | Identificador único para cada ubicación física | 48 ubicaciones, 61 salas y 121 camas en producción. La codificación de cama está diseñada y con **0 % de adopción** | Ámbar |
| **R06** | Identificador único para documentos compartidos | GDTI asignado en el catálogo de ítems trazables a documentos administrativos y clínicos; **no implementado** | Rojo |

### Bloque 2 — Captura automática

| Req. | Qué exige | Estado en Avante | Semáforo |
|---|---|---|---|
| **R10** | Estándar abierto de captura para objetos propios, al nivel correcto de precisión | DataMatrix aprobado por unanimidad como simbología oficial. **Los lectores instalados son láser lineales y no leen DataMatrix**; consta como bloqueo en acta de comité. Calidad de la red inalámbrica sin verificar | Rojo |
| **R11** | Ídem para objetos de terceros | Mismo bloqueo de hardware. Además, el 46,3 % de los productos no tiene código que leer | Rojo |

El bloqueo de hardware es el más barato de resolver y el que hoy invalida todo lo demás: **sin lector capaz de leer la simbología adoptada, ningún proceso de captura puede ejecutarse**, por bien documentado que esté.

### Bloque 3 — Registro de datos

| Req. | Qué exige | Estado en Avante | Semáforo |
|---|---|---|---|
| **R20** | Datos de relación por ítem: socio, ubicación, período de validez | 841 proveedores registrados. Sobre la muestra medida: 4 con doble grafía y **5 cuentas internas del grupo mezcladas como proveedores**. Certificaciones de proveedor: «no existe en Odoo» | Ámbar |
| **R21** | Eventos de despacho y recepción | ILQ01 «Recepción Física y Escaneo de Entrada» existe como documento, pero **no tiene un solo dato de control poblado**. No hay registro de evento | Rojo |
| **R22** | Registro del evento en que se crea un objeto trazable | El proceso que corresponde a esta obligación —ILQ04, identificación interna de productos sin GTIN de origen— **está íntegramente vacío**: sin objetivo, sin descripciones y sin controles. El re-etiquetado a dosis unitaria, que también crea objetos trazables, no tiene hoja de detalle | Rojo |
| **R23** | Contenido mínimo del evento: cuándo con zona horaria, qué a nivel lote o instancia, dónde, paso de negocio y disposición, quién | **Sin cobertura conceptual.** Ningún proceso del catálogo declara qué evento genera. El modelo documental de Avante captura «datos de control», que son campos de formulario, no eventos con las cinco dimensiones | Rojo |
| **R24** | Relación entrada-salida en transformaciones | Los cuatro procesos de transformación del hospital —fraccionamiento, re-etiquetado a unidosis, mezclas intravenosas y esterilización— **no tienen ninguno hoja de detalle** | Rojo |
| **R25** | Relación padre-hijo en agregación y desagregación por nivel de contención | Sin SSCC no hay agregación posible. El concepto no aparece en ningún documento | Rojo |
| **R26** | Eventos críticos adicionales aplicables | El evento hospitalario de mayor valor —la administración a pie de cama— **no tiene contenido** en el catálogo GS1, y el procedimiento del HIS que sí lo describe **verifica por interrogatorio verbal, sin escaneo** | Rojo |

### Bloque 4 — Compartición de datos

| Req. | Qué exige | Estado en Avante | Semáforo |
|---|---|---|---|
| **R30** | Proveer y recibir dato en plazo, con mecanismos de autorización | EDI previsto con proveedores en la especificación del WMS. **No consta arquitectura**: las secciones de tecnología del comité de marzo son carátulas sin contenido | Rojo |
| **R31** | Retención y archivo con período adecuado | **Ningún documento del proyecto define período de retención** de dato de trazabilidad | Rojo |
| **R32** | Intercambio con estándares abiertos | EDI EANCOM y sincronización de datos maestros previstos. **Ningún documento del proyecto contempla un repositorio de eventos**; el estándar de eventos aparece solo en material formativo, nunca como componente planteado | Rojo |

### Lectura de la evaluación

Los dieciocho requisitos se evalúan en veintiuna líneas, porque R01 y R03 se desglosan por tipo de objeto trazable. De esas veintiuna líneas, **diecisiete están en rojo, cuatro en ámbar y ninguna en verde.**

Esto no descalifica el trabajo hecho. Un proyecto que aún no ha emitido su primer identificador en producción no puede estar en verde en ningún requisito de ejecución, y eso es esperable a esta altura. Lo que la tabla revela son **tres cosas que no se arreglan avanzando al ritmo actual**:

**Primera, el bloqueo físico.** Los lectores instalados no leen la simbología que el Comité adoptó. Todo el bloque de captura está detenido por una decisión de compra, no por una de diseño.

**Segunda, el hueco conceptual del evento.** El modelo documental de Avante no tiene el concepto de evento de trazabilidad. Documenta objetivo, narrativa, documentos de entrada, datos de control e indicadores. Nada de eso captura cuándo ocurrió algo, dónde, en qué paso de negocio y en qué estado quedó el objeto. Es el requisito R23, es el núcleo del estándar, y hoy **no tiene lugar donde escribirse** en la plantilla vigente.

**Tercera, la ausencia de los procesos que el estándar considera obligatorios.** Creación de objetos trazables, transformación y agregación son los tres tipos de evento que el estándar exige registrar explícitamente. En Avante, los procesos que los ejecutarían —identificación de productos sin GTIN, fraccionamiento, unidosis, mezclas, esterilización, embalaje de traslado— son precisamente los que no tienen ninguna hoja de detalle.

---

## 5. La metodología del estándar frente al camino que Avante lleva

El GTS 2.0 propone trece pasos en tres fases. Situar a Avante sobre esa secuencia explica por qué el proyecto se siente atascado.

**Fase de diseño (pasos 1 a 7).**

El paso 1 —fijar alcance y objetivos— está hecho: el Comité eligió el modelo extremo a extremo con prioridad en seguridad del paciente. El paso 3 —analizar el proceso de negocio— está hecho a medias: hay catálogo de 61 procesos y una visita de campo documentada, pero **el estándar pide explícitamente flujos que representen los cambios de estado y los movimientos del objeto trazable**, y eso es justo lo que las narrativas actuales no describen. El paso 4 —definir el nivel de identificación por entidad— está hecho y es el activo más sólido del proyecto, con la salvedad de las omisiones del catálogo heredado.

El paso 2 no consta: **no existe el catálogo de preguntas que el sistema debe poder responder**. Es un paso barato y de alto rendimiento, porque es el que permite después decidir qué se captura y qué no.

El paso 5 —definir los datos por evento cruzando las cinco dimensiones— **no se ha hecho**, y es la causa directa del hueco del R23.

Los pasos 6 y 7 —diseñar las funciones del repositorio de datos y las funciones de uso— **no constan en ningún documento**. El paso 7 es especialmente relevante porque es donde el estándar sitúa la detección de excepciones y la gestión de intervenciones, y nombra tres que son exactamente los procesos de mayor exposición de Avante: **excepción de temperatura en transporte, cuarentena, y notificación, ejecución y cierre de retiro de producto**.

**Fase de construcción (pasos 8 a 10).** El paso 8, análisis de brechas, es lo que produce este entregable. El paso 9, evaluar si el hardware y software existentes sirven o hay que comprar, **ya tiene una respuesta conocida y no atendida**: los lectores no sirven. El paso 10, piloto, está comprometido y sin medicamento piloto definido.

**Fase de despliegue (pasos 11 a 13).** El paso 12 es el que conviene leer con atención, porque el estándar enumera qué debe existir antes de operar: personas específicas responsabilizadas, **procedimientos escritos**, lista de partes a contactar, lista de personal clave para gestión de crisis **con separación de roles entre quien inicia y quien aprueba un retiro**, y plan de comunicación. Hoy Avante tiene procedimientos escritos parciales y **ninguna persona nombrada como dueña de proceso**: la matriz de roles del Comité define áreas, no personas.

---

## 6. El modelo de madurez que el estándar sí ofrece

El GTS 2.0 no incluye un modelo de madurez formal, pero sí una **escala de calidad de dato de cinco niveles** que usa como indicador en varios requisitos, y que es lo más cercano a una medida de madurez:

| Nivel | Definición del estándar |
|---|---|
| 1 | La calidad es desconocida |
| 2 | Débil: el dato no sirve a nuestras necesidades en la mayoría de los casos |
| 3 | Media: el dato sirve en la mayoría de los casos, pero no aplicamos verificaciones regulares de calidad |
| 4 | Buena: el dato sirve y aplicamos verificaciones regulares de calidad |
| 5 | Excelente: la calidad se monitorea continuamente y se usa en la toma de decisiones diaria |

Aplicada al dato de trazabilidad de Avante, la posición actual es **nivel 1 en los dominios sin medición y nivel 2 en el maestro de productos**, donde la calidad ya se conoce —está medida en este entregable— pero el dato no sirve para el uso previsto porque falta cobertura y faltan lote y vencimiento.

Que exista medición es en sí mismo el salto de 1 a 2. Establecer verificación regular es el salto de 3 a 4, y es alcanzable en el horizonte del piloto.

---

## 7. Recomendación

Tres acciones, ordenadas por dependencia y no por esfuerzo.

**Primera: desbloquear la captura.** Sustituir los lectores láser por lectores capaces de leer DataMatrix y verificar la cobertura inalámbrica en pasillos y habitaciones. Es una decisión de compra que hoy detiene los dos requisitos del bloque de captura y, por dependencia, todo el bloque de registro. Ningún avance documental lo compensa.

**Segunda: incorporar el evento al modelo documental.** Añadir a la plantilla de proceso un bloque de eventos de trazabilidad que capture, por cada paso que cambie el estado, la ubicación o la custodia de un objeto, los cinco datos mínimos del R23. Sin ese bloque, cada proceso que se documente a partir de hoy nace incompleto frente al estándar. Es la corrección de mayor rendimiento del entregable, porque afecta a los 61 procesos.

**Tercera: ejecutar el paso 2 y el paso 5 de la metodología**, que están saltados. Redactar el catálogo de preguntas que el sistema debe poder responder —«¿a qué pacientes se administró este lote?», «¿qué queda de este lote y dónde?», «¿quién recibió la custodia de esta caja y cuándo?»— y derivar de él los datos por evento. Es trabajo de mesa, sin dependencia de sistema ni de proveedor, y es lo que convierte el catálogo de procesos en un sistema de trazabilidad.

El modelo de procesos de referencia que resulta de aplicar esto, con el mapeo de cada punto de captura a su evento y a su identificador, se desarrolla en el documento siguiente.

---

## 8. Vacíos de información pendientes

- **No consta que el documento base del encargo sea este.** El enlace compartido apunta a un PDF del sitio, y los únicos PDF de referencia disponibles son el GTS 2.0, el estándar de eventos EPCIS y un caso de implantación hospitalaria. Se ha tomado el GTS 2.0 como marco principal por ser el estándar de diseño de procesos de trazabilidad, que es lo que la consulta pide. **Si el documento base pretendido era otro, conviene confirmarlo.**
- **El GTS 2.0 es de agosto de 2017.** Reconoce en su propio texto que una guía de implantación con más detalle sobre procesos, roles, responsabilidades y modelos de datos estaba pendiente de desarrollo. El marco actualizado de GS1 Healthcare se aborda en el documento siguiente.
- **Ninguna cifra de la evaluación está validada contra producción.** El servidor de solo lectura de Odoo no conectó en esta sesión. Todas las cifras provienen de los archivos del sitio de SharePoint y de las declaraciones del propio modelo de datos maestros.
- **Los semáforos son una valoración propia** contra el texto del estándar, no una certificación. El GTS 2.0 no define umbrales de aprobación: expresa cada indicador como porcentaje del alcance declarado, y el alcance formal de Avante —qué objetos, qué ubicaciones, qué proveedores y qué clientes están dentro— **no está declarado en ningún documento**, que es el prerrequisito que el propio estándar exige antes de medir.

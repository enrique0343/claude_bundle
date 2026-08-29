# Trazabilidad hospitalaria GS1 — Análisis de procesos y marco internacional

**Institución:** Avante Complejo Hospitalario · Inversiones Avante S.A. de C.V.
**Fecha:** 29 de agosto de 2026
**Origen del encargo:** revisar y analizar el libro `Avante-Documentación de procesos-Control general.xlsx`, investigar GS1 Healthcare a nivel global y contrastar los procesos contra el estándar internacional.

---

## 1. Resumen ejecutivo

El catálogo de procesos de trazabilidad de Avante está **bien concebido y mal ejecutado**. Los 61 procesos en 11 grupos cubren la cadena hospitalaria completa y contienen tres aciertos poco comunes: identificación interna de productos sin código de origen, inventario por ubicación técnica y cierre de cuenta del paciente basado en eventos de consumo. El diseño no es el problema.

El avance real sí lo es: **2 procesos terminados de 61**, y los grupos sin documentar concentran la mayor exposición clínica y regulatoria —esterilización completa, mezclas intravenosas, retiro de producto, farmacovigilancia, sustancias controladas y administración a pie de cama—. El grupo dedicado a la gestión de la trazabilidad, que es el núcleo del proyecto, está íntegramente vacío.

Debajo de eso hay tres problemas de fondo que no se resuelven documentando más rápido.

**El primero es de gobierno.** Existen tres cuerpos de documentación de procesos operando en paralelo, con tres plantillas, tres responsables y ningún índice común. El punto donde deberían encontrarse —la dispensación y la administración a pie de cama— es donde ninguno habla el lenguaje del otro: el modelo de datos exige captura por escaneo y declara «nunca digitación», mientras el procedimiento que ejecuta ese consumo, ya en versión 1.0, verifica la identidad del paciente **por interrogatorio verbal** y no captura lote ni vencimiento.

**El segundo es de modelo.** El estándar internacional exige registrar **eventos** con cinco dimensiones. Avante documenta **datos de control**, que son campos de formulario. La plantilla vigente no tiene dónde escribir un evento de trazabilidad, de modo que cada proceso que se documente a partir de hoy nace incompleto.

**El tercero es material.** Los lectores instalados son láser lineales y no leen la simbología que el Comité adoptó. Ningún avance documental compensa eso.

---

## 2. Hallazgos clave

**Sobre el archivo analizado.** 61 procesos, 11 grupos, columna de estado vacía en los 61 y versión 1 en todos, incluidos los 41 que no tienen una sola línea escrita. Las hojas de detalle se crearon duplicando la de Aprovisionamiento sin convertirla, lo que produjo colisión de identificadores de dato de control, objetivos copiados entre procesos no relacionados y encabezados que apuntan al grupo equivocado. El 40 % de los objetivos escritos está vacío o copiado.

**Sobre el dato maestro.** De 534 productos, el 53,7 % tiene código y solo el **46,4 % es escaneable hoy**. La noticia buena es que no hay códigos duplicados ni inventados: los identificadores existentes son legítimos y validan contra el algoritmo estándar, lo que abarata mucho la remediación. La noticia mala es que **no se capturan lote ni vencimiento** —la dimensión no existe como campo— y que 23 registros guardan el contenido íntegro del DataMatrix dentro del campo de código, con el lote y el vencimiento enterrados donde ninguna consulta los lee.

**Sobre el estándar.** Medido contra los dieciocho requisitos del GS1 Global Traceability Standard —evaluados en veintiuna líneas, porque dos se desglosan por tipo de objeto—, Avante tiene **diecisiete en rojo, cuatro en ámbar y ninguna en verde**. Es esperable en un proyecto que aún no emite su primer identificador en producción, pero tres brechas no se cierran avanzando al ritmo actual: el bloqueo de hardware, la ausencia del concepto de evento, y la falta de los procesos de creación, transformación y agregación de objetos trazables.

**Sobre la regulación.** Dos correcciones importantes. La Dirección Nacional de Medicamentos **dejó de existir** el 7 de agosto de 2024; la sucede la Superintendencia de Regulación Sanitaria, y varios documentos del proyecto siguen citando a la autoridad derogada. Y **El Salvador no obliga a serializar**: la verificación sobre el texto íntegro de la Ley de Medicamentos y su Reglamento arroja cero ocurrencias de «trazabilidad», «código de barras» y «serialización». Lo exigible es lote, vencimiento y registro sanitario en texto legible —que es exactamente lo que hoy no se captura—.

**Sobre la evidencia internacional.** El programa británico de referencia documentó, en seis hospitales y dos años, 140.000 horas clínicas devueltas a la atención y cerca de cinco millones de libras de ahorro recurrente de inventario. Los resultados que más se parecen a las debilidades medidas en Avante: tiempo de retiro de producto reducido de 8,33 días a menos de 35 minutos; reducción del 76 % en errores de dispensación prevenidos con eliminación total de los errores por paciente, fármaco, dosis y forma equivocados; y un 6 % de implantes ortopédicos ya caducados descubiertos al identificar por ubicación.

---

## 3. Riesgo e impacto

> **Implicación JCI.** Sin captura de lote no hay trazabilidad dosis-a-lote y un retiro dirigido no es ejecutable, lo que compromete MMU.3 y MMU.4. Los formatos que sustentan la evidencia de cadena de frío no están dados de alta como documentos controlados, de modo que la medición de MMU.3 no es demostrable ante evaluador. El 92 % de las incidencias de conciliación registradas se concentra en Botiquín, con causa raíz declarada «sin proceso definido», lo que toca MMU.3.2. Los seis procesos de esterilización no existen más allá del nombre, lo que toca PCI. La verificación de identidad del paciente por interrogatorio verbal, teniendo brazalete impreso y lectores presupuestados, es una brecha frente a IPSG, que se marca como **propuesta a validar** porque el repositorio institucional nunca ha adoptado códigos IPSG con subnúmero.

> **Implicación regulatoria.** El 43,8 % de cobertura de código en medicamentos controlados convive con un proceso de gestión de sustancias controladas que no tiene hoja de detalle y con una narrativa de recepción que se corta literalmente en «Para los medicamentos controlados:». Es un vacío documental sobre un proceso de fiscalización legal. Además, un cuerpo documental sin estado de aprobación —los 61 procesos en versión 1 con estado vacío— **no es documentación controlada** para efectos de auditoría.

---

## 4. Recomendación

Cuatro decisiones, todas de gobierno y ninguna resoluble desde Tecnología.

**Declarar el maestro único de procesos** y aplicar la columna de estado a los 61. Es la acción de menor costo y mayor efecto: convierte un índice engañoso en un tablero de avance real.

**Detener la aprobación de los procedimientos asistenciales en versión 1.0** hasta incorporar los puntos de escaneo. Una vez aprobados y capacitados, corregirlos cuesta el documento, la formación y la credibilidad del proyecto.

**Sustituir los lectores** por equipos capaces de leer DataMatrix, por la vía de alquiler con cláusula de continuidad sujeta a resultado, siguiendo el precedente documentado internacionalmente.

**Adoptar formalmente la jerarquía de fuentes y los criterios de aceptación** de este entregable, de modo que cualquier entregable futuro de proveedor se reciba contra un criterio publicado.

---

## 5. Principio de gobierno del entregable

> **El modelo de procesos lo define Avante**, anclado en el estándar GS1 y en su obligación regulatoria y de acreditación. El material de proveedores, consultores y fabricantes es **insumo auditado**, nunca fuente del modelo.

La jerarquía es: estándar GS1 → obligación regulatoria y JCI → decisión institucional de Avante → capacidad del sistema. **La capacidad del sistema es la última capa: restringe la implementación, nunca la definición.** Un proveedor que no cubre un requisito de los tres primeros niveles genera una brecha del proveedor, no una excepción del proceso.

Esto no es una preferencia de estilo. El documento interno de alcances funcionales establece que las áreas dueñas del proceso fijan el criterio funcional y Tecnología habilita. La propuesta de membresía de GS1 El Salvador excluye expresamente el diseño de arquitectura y lo traslada a Avante. Y la especificación funcional del WMS ya fijó que el sistema no es paralelo a Odoo.

---

## 6. Contenido del entregable

| Documento | Qué resuelve |
|---|---|
| [`01-analisis-control-general.md`](01-analisis-control-general.md) | Análisis del archivo: inventario de los 61 procesos, cobertura real, defectos estructurales y estado del dato maestro |
| [`02-gobierno-de-la-definicion.md`](02-gobierno-de-la-definicion.md) | Los tres cuerpos documentales en paralelo, la jerarquía de fuentes, la matriz de quién define y valida, y ocho criterios de aceptación para entregables de proveedor |
| [`03-estandar-internacional-y-evaluacion.md`](03-estandar-internacional-y-evaluacion.md) | Qué exige el GS1 Global Traceability Standard y evaluación de Avante contra sus veintiún requisitos, con semáforo |
| [`04-marco-gs1-healthcare-internacional.md`](04-marco-gs1-healthcare-internacional.md) | Sistema de estándares aplicado a salud, guías sectoriales que conviene adoptar, panorama regulatorio internacional, qué exige realmente El Salvador, y evidencia cuantificada de resultados |
| [`05-modelo-de-referencia-y-brechas.md`](05-modelo-de-referencia-y-brechas.md) | Los dieciséis puntos de captura canónicos, el mapeo de cada uno a su evento e identificador, la brecha por grupo, los procesos ausentes y la secuencia de trabajo por fases |
| [`anexos/plantilla-proceso-trazable.md`](anexos/plantilla-proceso-trazable.md) | Plantilla única obligatoria, con el bloque de eventos de trazabilidad que hoy falta, y lista de verificación de doce puntos previa a publicación |

---

## 7. Fuentes y alcance del análisis

**Documentos internos consultados.** El libro de control general y su libro hermano; los tres procesos de aprovisionamiento publicados en Word; la especificación funcional del sistema de gestión de almacenes; el plan de implantación de la consultoría; las cuatro presentaciones del Comité de Trazabilidad entre enero y marzo de 2026; el diccionario consolidado de datos maestros de agosto de 2026; los seis procedimientos asistenciales del sistema de información hospitalaria; el repositorio de datos del sitio, incluidos el maestro de productos con código de barras y el reporte de conciliación; y el documento de estructura de alcances funcionales.

**Estándares consultados.** GS1 Global Traceability Standard 2.0; estándar de eventos EPCIS 1.1; y el cuerpo publicado de guías de GS1 Healthcare, vocabulario de negocio y normativa de calidad de código.

**Marco regulatorio verificado.** Texto íntegro de la Ley de Medicamentos de El Salvador y su Reglamento General; ley de creación de la Superintendencia de Regulación Sanitaria; y panorama comparado de los mercados con mandato de trazabilidad.

### Limitaciones declaradas

- **La base de Odoo v18 no se pudo consultar.** El servidor de solo lectura no conectó en esta sesión. Ninguna cifra de este entregable está validada contra producción: todas provienen de los archivos del sitio o de lo que declaran los propios documentos del proyecto.
- **Tres hojas del libro analizado no fueron recuperables** por la herramienta de lectura, y cinco del libro hermano. Su existencia está probada por las fórmulas que las referencian; su contenido no se verificó directamente.
- **No consta cuál es el documento base pretendido por el encargo.** El enlace compartido apunta a un PDF del sitio; se tomó el Global Traceability Standard como marco principal por ser el estándar de diseño de procesos de trazabilidad. Conviene confirmarlo. De los tres PDF disponibles en la carpeta de recursos del sitio, uno no es un estándar sino la impresión de un artículo de LinkedIn.
- **Los semáforos son una valoración propia** contra el texto del estándar, no una certificación. El estándar no define umbrales de aprobación y exige declarar el alcance antes de medir; **el alcance formal de Avante no está declarado en ningún documento**.

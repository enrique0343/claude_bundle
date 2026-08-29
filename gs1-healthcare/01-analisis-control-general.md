# Análisis del libro «Avante-Documentación de procesos-Control general.xlsx»

**Fuente:** SharePoint · sitio `TRAZABILIDADGS1AVANTE` · carpeta `02-Procesos`
**Última modificación del archivo:** 29/08/2026
**Fecha del análisis:** 29/08/2026
**Método:** lectura íntegra del volcado del libro (1.658 líneas) más contraste con el libro hermano `Detalles de Procesos KIAS.xlsx`, los tres documentos de proceso publicados en Word, las actas del Comité de Trazabilidad y el repositorio de datos del sitio.

---

## 1. Resumen ejecutivo

El libro es el catálogo maestro del proyecto de trazabilidad: **61 procesos organizados en 11 grupos**, con una nomenclatura documental normalizada (`AVN-<Código>-<Proceso>-<Versión>`) y una estructura de ficha por proceso —objetivo, narrativa, documentos de entrada, datos de control e indicadores— que es metodológicamente sólida.

El problema no es el diseño. Es que **el avance real es una fracción del avance aparente**. El índice muestra 61 procesos con nombre de documento generado y versión 1, lo que se lee como catálogo completo. La medición efectiva es otra: **2 procesos terminados (3 %)**, 18 con estructura pero contenido parcial, heredado o vacío, y **41 sin ninguna hoja de detalle (67 %)**.

Hay un segundo problema, de gobierno más que de contenido: **la columna «Estado» está vacía en los 61 registros** y los 61 figuran en versión 1, incluidos los que no tienen una sola línea escrita. El libro no permite distinguir un proceso autorizado de uno no iniciado. Un cuerpo documental sin estado de aprobación no es documentación controlada, y ese es el hallazgo de mayor riesgo de auditoría.

Y hay un tercer problema, de propiedad: **existen dos libros paralelos** con el mismo índice de 61 procesos y contenidos divergentes —este y `Detalles de Procesos KIAS.xlsx`—, cada uno con hojas que el otro no tiene. Ninguno es la fuente única de verdad.

---

## 2. Qué contiene el archivo

El libro declara 8 hojas. El catálogo de procesos vive en la hoja `Índice` y el detalle se despliega en hojas por grupo.

| Hoja | Contenido | Estado |
|---|---|---|
| `Índice` | Catálogo maestro de 61 procesos en 11 grupos | Completa |
| `PCC` | Logística Clínica — detalle | 3 de 7 procesos |
| `ILQ` | Logística de Ingreso — detalle | 6 de 6, calidad desigual |
| `ICM` | Almacenamiento y Gestión de Stock — detalle | 6 bandas, una con código colisionado |
| `IDC` | Tránsito y Transporte Interno — detalle | 5 de 5, más una banda huérfana |
| `SPS` | Aprovisionamiento — detalle | Presente en el libro, no recuperable por la herramienta |
| `Listas` | Catálogos maestros de vocabulario | Presente, no recuperable |
| `Indicadores` | Consolidado de controles e indicadores | Presente, no recuperable |

La hoja `Requerimientos`, que el índice lateral anuncia como ítem C, **no cabe en las 8 hojas declaradas**: apunta a un artefacto que probablemente aún no existe.

### Estructura de la ficha por proceso

Cada proceso documentado despliega cinco bloques: **General** (código, grupo, nombre, objetivo), **Narrativa** (hasta 10 pasos con responsable y descripción), **Documentos input** (nombre y tipo, resuelto contra un catálogo maestro), **Datos de control** (identificador, nombre, descripción, tipo, estructura, posición) e **Indicadores de proceso** (identificador, nombre, descripción, tipo y controles que lo alimentan).

El vínculo indicador → dato de control es el acierto metodológico del diseño: obliga a que todo indicador sea calculable a partir de datos que el proceso realmente captura. Está implementado con fórmulas, y funciona. El problema es que **sólo está poblado en dos procesos**.

---

## 3. Cobertura real por grupo

| Grupo | Acrónimo | Procesos | Con hoja de detalle | Terminados |
|---|---|---|---|---|
| Aprovisionamiento | SPS | 6 | Sí | 3 en Word, ninguno cerrado |
| Logística de Ingreso | ILQ | 6 | Sí | 0 |
| Almacenamiento y Gestión de Stock | ICM | 6 | Sí | 0 |
| Preparación y producción farmacéutica | PPC | 5 | **No** | 0 |
| Tránsito y Transporte Interno | IDC | 5 | Sí | 0 |
| Logística Clínica | PCC | 7 | Sí, 3 de 7 | **2** |
| Central de Esterilización y RMD | SPR | 6 | **No** | 0 |
| Logística Inversa y Farmacovigilancia | RLP | 6 | **No** | 0 |
| Egreso Hospitalario y Continuidad del Cuidado | PDT | 4 | **No** | 0 |
| Gobernanza, Cumplimiento y Seguridad Regulatoria | CGR | 5 | **No** | 0 |
| Gestión de Trazabilidad | GTZ | 5 | **No** | 0 |
| **Total** | | **61** | **5 grupos** | **2** |

Los únicos dos procesos completos son **PCC01 Gestión del Listado Único de Medicamentos** y **PCC02 Gestión de Identidad Única del Paciente**: objetivo propio, narrativa coherente, matriz de datos de control íntegra e indicadores vinculados a controles. Ambos se trabajaron el 27 y 28 de agosto de 2026, es decir, en los dos días previos a este análisis.

### El dato que más importa de esta tabla

Los seis grupos sin ninguna hoja de detalle concentran **exactamente los procesos de mayor exposición clínica y regulatoria**: esterilización completa (SPR01 a SPR06), mezclas intravenosas y nutrición parenteral (PPC03), fraccionamiento y dosis unitaria (PPC01, PPC02), retiro de mercado (RLP03), farmacovigilancia y tecnovigilancia (RLP04, RLP06), sustancias controladas (CGR02) y conciliación de medicamentos al alta (PDT01).

A ellos se suman cuatro procesos que figuran en el índice lateral de la hoja PCC pero no tienen bloque de contenido: **PCC05 Administración a Pie de Cama (BCMA)**, PCC04 Prescripción y Validación Farmacéutica, PCC06 Implantes y Dispositivos de Alto Valor y PCC07 Insumos en Áreas Críticas.

Y el grupo **GTZ — Gestión de Trazabilidad**, que es el núcleo conceptual del proyecto GS1 (gobernanza de datos maestros, interoperabilidad, auditoría del circuito digital, infraestructura AIDC y certificación en estándares), **está íntegramente sin documentar**.

---

## 4. Hallazgos de calidad

### 4.1 Las hojas de detalle se crearon duplicando la hoja de Aprovisionamiento y nunca se convirtieron

Es la causa raíz de casi todos los defectos siguientes, y está probada en las fórmulas: ninguna tabla de las hojas ILQ, ICM o IDC lleva su propio acrónimo. Todas conservan el prefijo `SPS` con sufijos numéricos crecientes que trazan la cadena de copias sucesivas (`SPSControles0140` → `SPSControles014065`).

El daño no es cosmético. En la hoja ICM, la fórmula de la banda de nombres apunta a la tabla índice de la hoja ILQ, y devuelve `#N/D` en las seis bandas. Los encabezados de ICM e IDC declaran ambos «2 / Aprovisionamiento» en lugar de su propio grupo. Los índices laterales de ICM e IDC listan procesos de Aprovisionamiento. En la hoja PCC, dos filas conservan el prefijo de grupo «2» y numeran `2,06` y `2,07` donde debería decir `7,06` y `7,07`.

### 4.2 Colisión de identificadores de dato de control

En la hoja ICM, la celda de código de la cuarta banda contiene `ICM03` en vez de `ICM04`. Como los identificadores se generan por concatenación, esa banda emite `ICM03-C01` … `ICM03-C09` **duplicando** los de la banda anterior: dos definiciones distintas comparten identificador. `ICM03-C01` es a la vez «Número de Código» y «Código Interno del Producto».

En la hoja IDC hay una sexta banda sin código, en un grupo que sólo tiene cinco procesos; sus controles se emiten como `-C01` … `-C07`, literalmente sin prefijo.

La unicidad del identificador de dato de control es la base sobre la que se construyen los indicadores y la evidencia auditable. Rota esa clave, no hay trazabilidad documental posible.

### 4.3 Objetivos vacíos o copiados de otro proceso

**8 de los 20 objetivos escritos (40 %) están vacíos o son copia literal de un proceso distinto.** ILQ04 «Identificación Interna de Productos sin GTIN de Origen» tiene el objetivo en blanco. ILQ02 «Inspección Técnica y Control de Calidad» lleva el objetivo del catálogo de proveedores. ILQ05 «Distribución Interna» lleva el de recepción administrativa. Los objetivos de IDC02 a IDC05 son idénticos a los de ICM02 a ICM05.

Un documento cuyo objetivo no corresponde a su contenido es, por sí solo, una no conformidad documental.

### 4.4 La matriz de control está mayoritariamente vacía

De los 20 procesos con columna de detalle, **sólo PCC01 y PCC02 tienen la matriz de datos de control íntegramente poblada**. Cinco procesos tienen los nueve controles vacíos (PCC03, ILQ02, ILQ04, ILQ05, ILQ06) y el resto los tiene a medias.

Los indicadores existen con nombre en varios procesos, pero la columna que los vincula a controles sólo está resuelta en PCC01 y PCC02. En ILQ01, ILQ03, ICM01, ICM03, ICM05 e ICM06 **los indicadores no son medibles**: no hay ningún dato de control asociado del que calcularlos.

### 4.5 Narrativas incompletas

Trece pasos tienen responsable asignado y descripción en blanco. ILQ04 está hueco en sus cuatro pasos. Tres frases quedan truncadas en el original, una de ellas en un punto sensible: ILQ01 paso 1 termina literalmente en «Para los medicamentos controlados:». Los pasos 3 y 5 de ILQ02 son idénticos carácter por carácter. Ningún proceso del libro usa más de 6 de los 10 pasos disponibles.

### 4.6 Documentos de entrada que no existen en el catálogo maestro

Siete documentos citados como entrada no resuelven contra el catálogo de documentos, entre ellos «CONTROL DE TEMPERATURA Y HUMEDAD RELATIVA» y «RECEPCION DE PRODUCTOS EN BOTIQUIN HOSPITALARIO». Uno de ellos aparece además con dos grafías distintas en procesos distintos.

Que un formato de registro de temperatura no esté dado de alta en el catálogo maestro significa que **no es un documento controlado**, y por tanto la evidencia que produce no es defendible ante evaluador.

### 4.7 Vocabulario sin normalizar

Conviven `Administración` y `Administracion ` —sin tilde y con espacio final— como valores del mismo campo. Para cualquier filtro o tabla dinámica son categorías distintas. Bloques enteros de controles no tienen tipo asignado. Cuatro controles de ICM05 y otros cuatro de IDC05 declaran estructura de marca temporal para campos que no son fechas.

### 4.8 Dos generaciones de trabajo que nunca se realinearon

Las hojas ILQ, ICM e IDC llevan una única fecha: **14/04/2025**, la misma para las tres, coherente con haberse creado en una sola sesión de duplicación y no haberse vuelto a tocar. Los procesos PCC01 a PCC03 llevan **27 y 28/08/2026**.

Entre ambas fechas median dieciséis meses y un cambio evidente de método: los procesos de agosto de 2026 introducen vocabulario GS1 explícito, tipificación de datos y trazabilidad indicador→control; los de abril de 2025 no. **El proyecto se reinició con un estándar de documentación superior sin reprocesar lo anterior.**

---

## 5. El estado del dato maestro que estos procesos presuponen

Los procesos del libro asumen que el producto tiene un identificador escaneable. La medición sobre el repositorio de datos del propio sitio dice otra cosa.

Sobre **534 productos** con movimiento en 90 días:

| Medición | Resultado |
|---|---|
| Productos con algún código registrado | 287 (53,7 %) |
| Productos sin ningún código | 247 (46,3 %) |
| Medicamentos con código | 65,2 % |
| Insumos con código | 40,7 % |
| **Medicamentos controlados con código** | **43,8 % — 9 de 16 sin código** |
| Códigos con longitud GS1 válida | 88,9 % de los registrados |
| Dígito de control correcto (GTIN-13) | 211 de 211 — 100 % |
| Dígito de control correcto (GTIN-14) | 18 de 20 — 90 % |
| Códigos duplicados entre productos | **0** |
| **Productos efectivamente escaneables hoy** | **248 (46,4 %)** |

Dos lecturas importan aquí.

La primera es favorable: **no hay códigos inventados, ni correlativos internos, ni duplicados**. Los códigos que existen son GTIN legítimos de fabricante y validan contra el algoritmo GS1. El problema de Avante es de cobertura y de disciplina de captura, no de contaminación del maestro. Eso hace la remediación mucho más barata de lo habitual.

La segunda es un defecto concreto y recuperable: **23 registros (8 %) guardan el contenido completo del DataMatrix dentro del campo de código**, en lugar del GTIN. Por ejemplo, un registro contiene la cadena que codifica GTIN, fecha de vencimiento y lote concatenados. La ironía es que **el lote y el vencimiento sí están en el archivo**, enterrados dentro de un campo donde ninguna consulta los puede leer. Los 23 son recuperables al 100 % por parseo automático.

Diez códigos más no son GTIN bajo ninguna interpretación —cinco dígitos, once dígitos, referencias de catálogo de fabricante— y dos GTIN-14 fallan el dígito de control, uno de ellos por un cero espurio de corrección trivial.

**No existen columnas de lote, vencimiento, unidad de medida ni registro sanitario.** No es baja completitud: la dimensión no está capturada. Y sin lote capturado, ninguno de los procesos de recall, farmacovigilancia o conciliación clínica que el catálogo enumera puede ejecutarse.

---

## 6. Implicación JCI y regulatoria

> **Implicación JCI.** Los hallazgos siguientes tienen lectura directa de acreditación. Los códigos MMU y PCI se citan según el catálogo ya adoptado en el repositorio institucional. Las referencias a IPSG se marcan como **propuesta a validar**, porque el repositorio nunca las ha asignado con subnúmero a un caso concreto.

**Trazabilidad de lote y serie — MMU.3, MMU.4.** El maestro de productos no captura lote ni vencimiento como campo. Ante un retiro de producto, Avante no puede identificar por sistema qué lotes se dispensaron a qué pacientes. El proceso que sostendría esa capacidad, RLP03 Gestión de Retiros de Mercado, no tiene hoja de detalle.

**Medicamentos vencidos y conservación — MMU.3, MMU.3.1.** ILQ06 e ICM06 describen registro de temperatura, pero ILQ06 no tiene un solo dato de control poblado e ICM06 sólo dos. Los formatos que sustentan la evidencia no están dados de alta como documentos controlados. Sin indicador, meta ni frecuencia, no hay medición demostrable ante evaluador.

**Botiquín y áreas de custodia — MMU.3.2.** El 92 % de las incidencias de conciliación registradas entre el 19/02 y el 17/03 de 2026 se concentran en Botiquín. La causa raíz declarada en el 72 % de los casos es «sin proceso definido» y en el 28 % «sin punto de control en el sistema». El propio hospital ha documentado que el proceso falta.

**Sustancias controladas — MMU.3.1 y normativa sanitaria local.** El 43,8 % de cobertura de código en medicamentos controlados convive con un proceso, CGR02 Gestión de Sustancias Controladas, que no tiene hoja de detalle, y con una narrativa de recepción que se corta justo en «Para los medicamentos controlados:». Es un vacío documental sobre un proceso de fiscalización legal.

**Esterilización y dispositivos reutilizables — PCI.** Los seis procesos del grupo SPR no existen más allá del nombre. No hay soporte documental de ciclo de esterilización, carga, ni trazabilidad de instrumental.

**Identificación del paciente — IPSG (propuesta a validar).** PCC02 está bien construido y usa GSRN, pulsera y doble verificación en punto de atención. Pero PCC05, Administración a Pie de Cama, que es donde la identificación se verifica materialmente contra el medicamento, no tiene contenido alguno.

**Protección de datos del paciente.** Cuatro datos de control de ICM03 registran nombre de paciente, número de hospitalización, ubicación y habitación **sin tipo asignado**, es decir, sin clasificarse como dato de salud y sin estructura declarada.

**Control documental — transversal a JCI e ISO 9001.** Los 61 procesos están en versión 1 con la columna «Estado» vacía. No hay evidencia de revisión ni de autorización de ninguno. El catálogo de estados existe —ocho valores, de «Pendiente de documentar» a «Autorizado»— y no se usa.

---

## 7. La cuestión de fondo: quién define el proceso

El sitio contiene dos libros con el mismo índice de 61 procesos y contenidos que no coinciden. Este, `Avante-Documentación de procesos-Control general.xlsx`, tiene el detalle de Logística Clínica y Tránsito. El otro, `Detalles de Procesos KIAS.xlsx`, tiene la hoja de Aprovisionamiento y los catálogos maestros de vocabulario que a este le faltan. Cada uno es incompleto de una forma distinta y ninguno declara ser el maestro.

Esto es un problema de gobierno antes que de contenido, y tiene una consecuencia práctica: **el vocabulario que hoy define qué es trazable en Avante y con qué clave GS1 se identifica vive en el libro que lleva el nombre de un tercero.**

Ese catálogo de ítems trazables es utilizable como insumo —clasifica trece tipos de ítem y les asigna clave de identificación y granularidad— pero contiene errores que no pueden heredarse sin auditar. Entre ellos, la nota que describe el GLN como «identificación de un donante» cuando el GLN identifica localidades; la ausencia total del SSCC pese a existir una clasificación de «Unidad Logística»; la ausencia del GSRN pese a que el proceso de identidad del paciente ya lo usa; y la asignación de GIAI a instrumental quirúrgico reutilizable, donde el estándar contempla GRAI para activos retornables.

La regla de trabajo que se deriva es simple y queda fijada para el resto del entregable: **el modelo de procesos lo define Avante contra el estándar GS1 y contra su obligación regulatoria. El material de cualquier proveedor o consultor es insumo auditado, nunca fuente del modelo.**

Esta regla no es una preferencia. Tiene respaldo institucional y contractual:

- El documento `ACH-GOB-002 Estructura de Alcances Funcionales` (v1.0, marzo 2026) establece que «las áreas dueñas del proceso establecen el criterio funcional y Tecnología habilita». Definir el estándar de captura no es decisión de Tecnología ni de un proveedor, sino de Botiquín, Logística, Farmacia y Compras.
- La propuesta de membresía de GS1 El Salvador **excluye expresamente** el diseño de arquitectura tecnológica, el desarrollo y las integraciones, y los traslada íntegramente a Avante. El diseño es responsabilidad de Avante por contrato.
- La especificación funcional `AVN-WMS-EFD-001` ya fijó la decisión de arquitectura: «El WMS Avante no es un sistema paralelo a Odoo».

---

## 8. Vacíos de información pendientes

Se declaran de forma explícita, según la regla del repositorio de no rellenar lo que no consta:

1. **Tres hojas del libro no fueron recuperables** por la herramienta de lectura: `SPS`, `Listas` e `Indicadores`. Su existencia está probada por las fórmulas que las referencian, pero su contenido no se verificó en este libro. Los catálogos de vocabulario se leyeron del libro hermano, que puede tener una versión distinta.
2. **Las filas finales de la hoja IDC** no se recuperaron: contienen los indicadores del grupo y el cierre de la matriz de control.
3. **La hoja `Requerimientos` no existe** en las 8 hojas declaradas, pese a figurar en el índice lateral.
4. **No consta qué representan las fechas** de las hojas de detalle: si son fecha de elaboración, de revisión o de vigencia. La etiqueta de la fila no aparece. Debe confirmarse antes de usarlas como evidencia de auditoría.
5. **No consta el medicamento piloto.** Quedó comprometido como entregable del Comité de Trazabilidad y no aparece definido en las actas posteriores.
6. **No consta la arquitectura tecnológica.** Las secciones «Requerimientos para el área de Tecnología» y «Arquitectura de infraestructura de servicios IT» de la sesión de comité de marzo de 2026 son carátulas sin contenido.
7. **La base de Odoo v18 no se pudo consultar** en esta sesión: el servidor de sólo lectura no conectó. Ninguna cifra de este documento está validada contra producción; todas provienen de los archivos del sitio de SharePoint.

---

## 9. Recomendación

Tres acciones, en este orden, antes de escribir un solo proceso más.

**Primero, declarar el maestro único.** Fusionar los dos libros en uno, designarlo fuente única de verdad y archivar el otro. Sin esto, cada hora de documentación produce divergencia adicional.

**Segundo, poner en uso la columna «Estado».** El catálogo de ocho estados ya existe. Aplicarlo a los 61 procesos convierte un índice engañoso en un tablero de avance real, y es condición para que el cuerpo documental sea auditable. Es la acción de menor costo y mayor efecto del entregable.

**Tercero, cerrar los defectos estructurales heredados de la duplicación** —colisión de identificadores en ICM e IDC, objetivos copiados, encabezados que apuntan al grupo equivocado— antes de añadir procesos nuevos sobre una plantilla que los propaga.

La secuencia de trabajo posterior, el modelo de procesos de referencia contra el estándar internacional y la matriz de brechas se desarrollan en los documentos siguientes de este entregable.

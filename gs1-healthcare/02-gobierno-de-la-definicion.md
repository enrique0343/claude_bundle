# Gobierno de la definición de procesos

**Fecha:** 29/08/2026
**Alcance:** quién define los procesos de trazabilidad de Avante, contra qué se definen y cómo se audita lo que aporta un tercero.

---

## 1. Resumen ejecutivo

Avante tiene hoy **tres cuerpos de documentación de procesos operando en paralelo**, en dos sitios de SharePoint distintos, con tres plantillas, tres nomenclaturas, tres responsables y tres ritmos. Ninguno declara ser el maestro y no existe tabla de correspondencia entre ellos.

El punto donde los tres deberían encontrarse —la dispensación desde Botiquín y la administración a pie de cama— es precisamente donde **ninguno habla el lenguaje del otro**. El modelo de datos maestros exige que el consumo se registre por escaneo de DataMatrix y declara literalmente «nunca digitación». El procedimiento que ejecuta ese consumo, ya redactado y en versión 1.0, instruye confirmar la identidad del paciente **interrogándolo verbalmente** y comparar etiquetas **por inspección visual**. No hay un solo paso de escaneo en los nueve del procedimiento.

Si esa versión 1.0 se aprueba y se capacita personal sobre ella, Avante habrá formalizado un proceso que contradice el modelo de trazabilidad que está pagando por construir. Corregirlo después cuesta la aprobación, la capacitación y la credibilidad del proyecto.

La causa no es técnica. Es que **la definición del proceso se está produciendo en tres lugares sin una regla que diga quién define qué**. Este documento fija esa regla.

---

## 2. Los tres cuerpos documentales

| | Proyecto GS1 | Material de tercero | Procesos del HIS |
|---|---|---|---|
| **Nomenclatura** | `AVN-<Grupo><NN>-<Proceso>-<Versión>` | Sin nomenclatura propia | `PRO-MED-00N` |
| **Sitio** | `TRAZABILIDADGS1AVANTE` | `TRAZABILIDADGS1AVANTE` | `TecnologiayTransformacionDigital` |
| **Responsable** | Gerencia de Operaciones | Tercero | Gerencia de Tecnología |
| **Fecha** | Abril 2026, reactivado agosto 2026 | Abril 2025 / enero 2026 | Junio–julio 2026 |
| **Cadena que cubre** | Aprovisionamiento y logística | Aprovisionamiento y logística | Cadena asistencial |
| **Plantilla** | Objetivo · Narrativa · Documentos · Datos de control · Indicadores · Flujograma | Hoja de cálculo por bandas | Control documental · Marco contextual · Arquitectura · RACI · BPMN · Narrativa · Medición y riesgos · Referencias |
| **Vocabulario GS1** | Sí, parcial | Sí, con errores | **Ninguno** |
| **Índice maestro** | Sí | Sí, divergente | **No tiene** |
| **Estado** | Candidate, sin firmas | Sin estado | v1.0, sin firmas |

Los tres son trabajo legítimo y ninguno debe descartarse. El problema es que **compiten por el mismo objeto**: qué se hace, en qué orden, quién lo hace y qué se registra.

### La fractura concreta

El modelo de datos maestros consolidado, entregado al Comité el 25 de agosto de 2026, define para el registro de existencias que su fuente de origen es «Escaneo GS1 DataMatrix (AIs 01/10/17/21) — nunca digitación». Define el identificador del paciente como GSRN con AI(8018) y el del personal asistencial como GSRN con AI(8017).

El procedimiento de administración de medicamentos, versión 1.0 de julio de 2026, no menciona GS1, GTIN, GSRN ni DataMatrix en ninguna de sus páginas. Su paso de verificación instruye comparar «las etiquetas físicas contra el plan terapéutico activo en el Kardex Digital e interrogar verbalmente al paciente para confirmar su identidad a pie de cama». No se captura lote ni fecha de vencimiento en ningún momento de la administración.

El procedimiento de ingreso hospitalario sí imprime y coloca el brazalete, pero lo describe únicamente como «brazalete físico de identificación institucional», sin simbología ni contenido de datos. **Ningún proceso posterior lo lee.**

Ambos procedimientos listan lectores de códigos de barras entre sus recursos. Es decir: **el equipo está previsto en la sección de recursos y ningún paso del flujo lo usa.** Se compra el lector y no se define qué se lee.

> **Implicación JCI — propuesta a validar.** Confirmar la identidad del paciente por interrogatorio verbal, teniendo brazalete impreso y lectores presupuestados, es una brecha frente al criterio de dos identificadores con uso consistente de la tecnología disponible (IPSG). Sin captura de lote ni vencimiento en la administración no hay trazabilidad dosis-a-lote, lo que compromete MMU.3 y MMU.4. El modelo de datos contempla un estado de calidad para producto retirado del mercado, pero **ningún proceso lo alimenta**: un retiro dirigido hoy no es ejecutable. El riesgo de no conformidad es directo y verificable por cualquier evaluador que siga una dosis desde la recepción hasta el paciente.

---

## 3. La regla: quién define, quién valida, quién habilita

> **Principio rector.** La definición del proceso es de Avante. Está anclada en el estándar internacional GS1 y en la obligación regulatoria y de acreditación de la institución. Ningún proveedor, consultor ni fabricante de software es la fuente del modelo.

Esto invierte la relación habitual. El proveedor no propone el proceso para que el hospital lo valide. **El hospital define el proceso, los eventos de trazabilidad, los datos que deben capturarse, los controles y los indicadores; y el proveedor demuestra cómo su herramienta los ejecuta.**

### Jerarquía de fuentes

Cuando dos fuentes se contradicen, manda la de nivel superior.

| Nivel | Fuente | Qué determina |
|---|---|---|
| **1** | Estándar GS1 — Global Traceability Standard, EPCIS y CBV, guías de GS1 Healthcare | Qué es un evento de trazabilidad, qué identificadores existen, qué datos deben capturarse y en qué momento |
| **2** | Obligación regulatoria y de acreditación — JCI, DNM y normativa sanitaria de El Salvador, obligación tributaria | Qué es exigible por ley o por acreditación, y qué evidencia debe poder mostrarse |
| **3** | Decisión institucional de Avante — Comité de Trazabilidad, dueños de proceso por área, política de datos maestros, estructura documental del repositorio | Alcance, prioridad, responsables, nomenclatura y formato |
| **4** | Capacidad del sistema — Odoo v18, HIS, WMS, middleware | Cómo se implementa, en qué fase y con qué esfuerzo |

**La capacidad del sistema es la última capa. Restringe la implementación, nunca la definición.** Un proveedor que no cubre un requisito de los niveles 1 a 3 genera una brecha del proveedor, no una excepción del proceso.

### Respaldo institucional de la regla

No es una preferencia de estilo. Está sostenida por tres documentos ya vigentes:

- **`ACH-GOB-002 Estructura de Alcances Funcionales`** (v1.0, marzo 2026) establece que «las áreas dueñas del proceso establecen el criterio funcional y Tecnología habilita». Definir el estándar de captura no es decisión de Tecnología ni de un proveedor, sino de Botiquín, Logística, Farmacia y Compras. El mismo documento tipifica a Botiquín como unidad funcional crítica obligada a preservar «identificación, lote, vencimiento y trazabilidad», lo que produce una contradicción que conviene nombrar: **Botiquín tiene hoy la responsabilidad formal sin la herramienta que la haga ejecutable.**
- **La propuesta de membresía de GS1 El Salvador** excluye expresamente el diseño de arquitectura tecnológica, el desarrollo y las integraciones, y los traslada íntegramente a Avante. El diseño es responsabilidad de Avante por contrato, no por preferencia.
- **La especificación funcional `AVN-WMS-EFD-001`** ya fijó la decisión de arquitectura: «El WMS Avante no es un sistema paralelo a Odoo». La arquitectura está decidida por Avante y un tercero no la redefine.

### Matriz de decisión

| Objeto de decisión | Define | Valida | Habilita | Ejecuta |
|---|---|---|---|---|
| Qué procesos existen y su alcance | Gerencia de Operaciones | Comité de Trazabilidad | — | Dueño de proceso |
| Qué se captura en cada paso y con qué identificador GS1 | Dueño de proceso del área | Comité de Trazabilidad | Tecnología | Personal del área |
| Estructura y formato del dato maestro | Data Owner del dominio | Comité de Trazabilidad | Tecnología | Data Owner |
| Punto de escaneo y momento de captura | Dueño de proceso del área | Regente Farmacéutico si toca medicamento | Tecnología | Personal del área |
| Controles, indicadores y metas | Dueño de proceso del área | Comité de Trazabilidad | Tecnología | Dueño de proceso |
| Criterio clínico y de seguridad del paciente | Gerencia Médica y Regente | Comité de Trazabilidad | — | Personal asistencial |
| Arquitectura, integración y hardware | Tecnología | Comité de Trazabilidad | Proveedor | Tecnología |
| Cómo la herramienta ejecuta el proceso definido | Proveedor | Dueño de proceso | — | Proveedor |

La última fila es la única donde el proveedor define. Y lo que define es **cómo**, nunca **qué**.

---

## 4. Cómo se trata el material de un tercero

Todo entregable de proveedor, consultor o fabricante se recibe como **insumo auditado**. Nunca se adopta por referencia.

**Regla de marcado.** Toda estructura, terminología, codificación o alcance que provenga de un tercero y no de una decisión de Avante se marca de forma explícita en el documento y queda sujeta a revalidación por el dueño de proceso correspondiente.

**Regla de brecha.** Donde el material de un tercero se aparte del estándar GS1 o de una obligación regulatoria, se levanta hallazgo contra el tercero, no excepción contra el proceso.

**Regla de restricción.** Donde el material de un tercero recorte el alcance por limitación de su herramienta, se documenta como restricción de implementación con responsable y fecha. **El requisito de Avante permanece vigente.**

### Aplicación: auditoría del catálogo de ítems trazables heredado

El vocabulario que hoy define qué es trazable en Avante y con qué clave GS1 se identifica vive en el libro que lleva el nombre de un tercero. Es utilizable como insumo —clasifica trece tipos de ítem con clave de identificación y granularidad— pero contiene errores que no pueden heredarse sin corregir.

| Hallazgo | Qué dice el material del tercero | Qué establece el estándar |
|---|---|---|
| Definición del GLN | «Número único de identificación de un donante» | El GLN identifica localidades y partes, no personas |
| Unidad logística sin clave | Existe la clasificación «Unidad Logística» y **ninguna fila le asigna clave** | El SSCC es la clave de la unidad logística; sin él no hay agregación ni cambio de custodia trazable |
| Identidad de personas ausente | El GSRN **no aparece** en el catálogo | El proceso de identidad del paciente ya usa GSRN, y el modelo de datos maestros lo ancla en AI(8018) para paciente y AI(8017) para personal |
| Instrumental reutilizable | Asigna GIAI a instrumental quirúrgico | El estándar contempla GRAI para activos retornables; la elección entre GIAI y GRAI debe decidirla Avante y justificarse |
| Etiquetado UDI invertido | Asigna «UDI-DI» a un identificador serializado y «UDI-PI» a otro | El UDI-DI es el identificador del dispositivo (el GTIN); el UDI-PI es el identificador de producción (lote, serie, vencimiento). No son alternativos: coexisten |
| Numeración corrupta | La columna de numeración del catálogo de estructuras se reinicia y repite valores | — |
| Códigos sin poblar | La columna de código está vacía en las trece filas | — |

Ninguno de estos hallazgos invalida el trabajo del tercero. Todos exigen que Avante lo revise antes de adoptarlo, que es exactamente el punto.

### Criterios de aceptación para cualquier entregable de proveedor

Un entregable de proceso se acepta sólo si cumple los ocho criterios. Cualquiera que falle devuelve el entregable.

1. **Estructura completa.** Contiene objetivo, alcance, actores, disparador, entradas, proceso, salidas, riesgos y controles, en ese orden, conforme al estándar documental de Avante.
2. **Identificador correcto.** Cada ítem que el proceso toca declara su clave de identificación GS1 y su nivel de granularidad, y la asignación es defendible contra el estándar.
3. **Evento declarado.** Cada paso que cambia el estado, la ubicación o la custodia de un ítem declara qué evento de trazabilidad genera y qué datos captura.
4. **Punto de captura definido.** Cada dato declarado tiene un momento y un responsable de captura. No se acepta un dato que nadie captura.
5. **Control con evidencia observable.** Cada control produce evidencia identificable y auditable. No se aceptan controles cuya verificación dependa de la memoria del operador.
6. **Indicador calculable.** Cada indicador se calcula a partir de datos de control que el propio proceso captura. No se acepta un indicador sin controles vinculados.
7. **Trazabilidad regulatoria.** Todo proceso que toque medicamento, dispositivo, muestra o paciente declara su implicación JCI y regulatoria con el estándar citado.
8. **Estado documental.** El documento declara su estado en el catálogo institucional, con responsable de revisión y de autorización nombrados.

El sexto criterio, por sí solo, habría detenido la mayoría de los defectos del catálogo actual: hoy hay procesos con indicadores nombrados y sin ningún dato de control del que calcularlos.

---

## 5. Decisiones que este documento requiere del Comité

Ninguna es técnica. Las cuatro son de gobierno y ninguna puede resolverse desde Tecnología.

**Primera: declarar el maestro único de procesos.** Un solo índice, una sola nomenclatura, un solo sitio. Los otros dos cuerpos se conservan como fuente y se archivan, o se migran. Mientras existan tres, cada hora de documentación produce divergencia adicional.

**Segunda: detener la aprobación de los procedimientos asistenciales en versión 1.0** hasta incorporar los puntos de escaneo. Concretamente: lectura del brazalete con GSRN en el ingreso hospitalario, y escaneo de GTIN, lote y vencimiento antes de aplicar en la administración de medicamentos. Es la brecha más costosa de corregir tarde, porque una vez aprobada y capacitada obliga a rehacer documento, formación y evidencia.

**Tercera: nombrar al dueño de proceso de cada uno de los 61 procesos**, con nombre y apellido, no con cargo. Hoy la matriz de roles del Comité define áreas y no personas, y de toda la documentación sólo cuatro personas aparecen nombradas.

**Cuarta: adoptar formalmente la jerarquía de fuentes y los criterios de aceptación** de este documento, de modo que cualquier entregable futuro de proveedor se reciba contra un criterio publicado y no contra el juicio de quien lo revise.

---

## 6. Vacíos de información pendientes

- **No consta acta del Comité del 27 de agosto de 2026.** Las cinco decisiones que el modelo de datos maestros elevó a ese comité —formato de expediente, paciente maestro global o por sede, árbol de centros de costo, política de médicos como proveedores y catálogo de puestos— no se pueden dar por resueltas.
- **La matriz de validación del modelo de datos está sin firmar** por las seis gerencias. Las columnas de justificación, validador y fecha están vacías, y la decisión de área viene precargada. El modelo es hoy una propuesta sin dueño validante.
- **No consta qué sistema manda sobre el maestro de existencias.** Los procedimientos asistenciales hablan del «módulo de inventarios del HIS»; el modelo de datos ancla todo el inventario en Odoo. Hay dos sistemas candidatos para el mismo maestro y ningún documento resuelve cuál manda.
- **No consta el medicamento piloto**, comprometido como entregable del Comité y ausente en las actas posteriores.
- **La base de Odoo v18 no se pudo consultar** en esta sesión: el servidor de solo lectura no conectó. Las cifras de llenado citadas son las que declara el propio modelo de datos maestros al 23 de agosto de 2026, no una medición independiente.

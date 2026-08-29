# Plantilla única de proceso trazable — Avante

**Uso obligatorio.** Todo proceso del catálogo de trazabilidad se documenta con esta plantilla, sin excepción. Todo entregable de proveedor, consultor o área interna se entrega en este formato. Un documento en otro formato se devuelve sin revisar.

**Por qué esta plantilla y no la actual.** La plantilla vigente captura objetivo, narrativa, documentos de entrada, datos de control e indicadores. Es sólida para describir un procedimiento, pero **no tiene dónde escribir un evento de trazabilidad**, que es el requisito central del estándar internacional. Esta plantilla conserva íntegra la estructura actual, la completa con los campos que el estándar documental de Avante ya exige —alcance, actores, disparador, salidas y riesgos— y añade el bloque de eventos.

---

## Encabezado del documento

| Campo | Contenido |
|---|---|
| Código | `AVN-<Grupo><NN>-<Nombre del proceso>-<Versión>` |
| Proceso | `<Código corto> — <Nombre>` |
| Grupo | `<Nombre del grupo> (<Acrónimo>)` |
| Versión | Número entero |
| Estado | Uno solo del catálogo: pendiente de documentar · documentado · narrativa · controles · indicadores · flujograma · revisado · autorizado |
| Fecha del documento | DD/MM/AAAA — día completo, no solo mes |
| Dueño de proceso | **Nombre y apellido**, no cargo |
| Validador | Nombre y apellido del responsable de la validación técnica |
| Autoriza | Nombre y apellido y fecha de autorización |
| Origen del contenido | Avante · Proveedor · Consultor — si no es Avante, nombrar al tercero |

> El campo «Origen del contenido» es obligatorio. Todo lo que no proviene de una decisión de Avante queda marcado y sujeto a revalidación por el dueño de proceso.

**Registro de cambios.** Versión · fecha · responsable · resumen del cambio.

---

## 1. Objetivo

Una sola frase que diga qué logra el proceso y para quién. No se admite copiar el objetivo de otro proceso: es el defecto más frecuente del catálogo actual y produce no conformidad documental directa.

## 2. Alcance

Qué queda dentro y qué queda fuera. El estándar internacional exige delimitar seis variables antes de poder medir un sistema de trazabilidad, y este bloque las declara:

| Variable | Declaración |
|---|---|
| Objetos trazables en alcance | Qué ítems toca este proceso |
| Nivel de precisión requerido | Clase, lote o instancia, por tipo de ítem |
| Ubicaciones propias en alcance | Sedes, almacenes, botiquines, salas, camas |
| Proveedores y sus ubicaciones | Incluye los de aguas arriba cuando aplique |
| Clientes o destinatarios | Incluye paciente cuando aplique |
| Terceros | Transportistas, laboratorios externos, gestores de residuos |
| **Fuera de alcance** | Enunciado explícito de lo que este proceso no cubre |

## 3. Actores

| Rol | Área | Responsabilidad en este proceso | R / A / C / I |
|---|---|---|---|
| | | | |

Se nombra el rol y el área. La persona concreta va en el encabezado, como dueño de proceso.

## 4. Disparador

Qué hecho concreto inicia el proceso, y qué lo cierra. Un disparador es un evento observable, no una periodicidad vaga.

## 5. Entradas

| Nombre | Tipo | Origen | Obligatorio |
|---|---|---|---|

El tipo se toma del catálogo institucional de tipos de documento. **Un documento citado como entrada debe existir en el catálogo maestro**; si no existe, se da de alta antes de publicar el proceso. Se prohíbe citar un documento con dos grafías distintas.

## 6. Proceso

### 6.1 Narrativa

| Paso | Responsable | Descripción | Sistema | ¿Genera evento? |
|---|---|---|---|---|
| 1 | | | | Sí / No |

Reglas de redacción, tomadas del estándar documental de Avante:

- No se admite un paso con responsable asignado y descripción vacía.
- No se inventan pasos no confirmados. Si falta información, se deja el supuesto visible o la sección marcada como pendiente. **No se rellena.**
- La descripción debe ser ejecutable sin interpretación: quién hace qué, con qué, y cómo sabe que terminó bien.
- La columna «Sistema» nombra el sistema concreto (Odoo, HIS, WMS), nunca «el sistema».

### 6.2 Eventos de trazabilidad

**Bloque nuevo y obligatorio.** Se llena una fila por cada paso marcado como generador de evento en la narrativa.

Un paso genera evento cuando **cambia el estado, la ubicación o la custodia** de un objeto trazable, o cuando el objeto **se crea, se transforma, se agrupa o se separa**.

| Campo | Qué se declara |
|---|---|
| **Paso** | Número del paso de la narrativa |
| **Tipo de evento** | Observación · Agregación o desagregación · Transacción · Transformación |
| **Qué** | Objeto trazable y su clave: GTIN, GTIN + lote, GTIN + serie, SSCC, GLN, GSRN, GIAI, GRAI, GDTI |
| **Nivel** | Clase · Lote · Instancia — el mínimo admisible para un evento es lote |
| **Cuándo** | Momento exacto de la captura, con zona horaria |
| **Dónde** | Punto de lectura y ubicación de negocio, identificados con GLN o GLN con extensión |
| **Por qué — paso de negocio** | Qué proceso de negocio causó el evento |
| **Por qué — disposición** | En qué estado queda el objeto después del evento |
| **Quién** | Parte responsable, cuando difiere de quien gestiona la ubicación |
| **Transacción asociada** | Orden de compra, aviso de despacho, requisición, prescripción, cuenta de paciente |
| **Origen y destino** | Cuando el evento forma parte de una transferencia de propiedad, responsabilidad o custodia |
| **Cómo se captura** | Escaneo de DataMatrix · escaneo de código lineal · lectura de etiqueta · registro manual justificado |

Reglas de este bloque:

1. **El mínimo de todo evento son cinco datos**: cuándo con zona horaria, qué a nivel lote o instancia, dónde, paso de negocio con disposición, y quién. Un evento incompleto no se publica.
2. **Cuando el proceso transforma un objeto** —fraccionamiento, re-etiquetado a dosis unitaria, preparación de mezclas, esterilización— debe registrarse la relación entre las entradas y las salidas.
3. **Cuando el proceso agrupa o separa objetos** —armado de caja de traslado, apertura de caja, montaje de set quirúrgico— debe registrarse la relación entre el contenedor y su contenido, en cada nivel de contención.
4. **Cuando el proceso crea un objeto trazable** —asignación de identificador a un producto sin código de origen, generación de una dosis unitaria, creación de un set— el evento de creación es obligatorio.
5. **La captura manual es una excepción que se justifica**, no un modo de operación. Si un paso no puede capturarse por escaneo, se declara por qué y qué control compensatorio lo cubre.
6. **Los datos que solo son válidos al crearse el objeto** —fecha de vencimiento, fecha y lugar de fabricación— se declaran en el evento de creación. **No se usan para datos que cambian a lo largo de la vida del objeto**, como la temperatura: eso es una lectura, no un atributo de origen.

### 6.3 Flujograma

Diagrama del flujo con los puntos de captura marcados. **No se admite publicar un proceso con el flujograma pendiente de inserción**: un proceso sin flujo no es ejecutable por personal nuevo, que es uno de los criterios de buena documentación del estándar interno.

## 7. Salidas

| Nombre | Tipo | Destinatario | Evidencia que queda |
|---|---|---|---|

## 8. Riesgos

| Riesgo | Probabilidad | Impacto | Control que lo mitiga |
|---|---|---|---|

Se incluyen los riesgos operativos, clínicos y de dato. Un riesgo sin control declarado queda abierto y escalado al Comité.

## 9. Controles

### 9.1 Datos de control

| Número | Control | Descripción | Tipo | Estructura | Posición |
|---|---|---|---|---|---|
| `<Código>-C01` | | | Trazabilidad · Salud · Administración · Financiero | | 1 |

Reglas:

- **El identificador es único en todo el catálogo.** No se admite que dos definiciones distintas compartan código.
- **El tipo se toma literalmente del catálogo**, con la grafía exacta. No se admiten variantes con o sin tilde ni con espacios.
- **La estructura debe corresponder al dato.** Un campo de fecha lleva formato de fecha; un GTIN lleva la estructura del GTIN, no «lista interna».
- **Todo dato de control tiene un momento y un responsable de captura** declarados en la narrativa. Un dato que nadie captura no se declara.
- **Todo dato que identifique a una persona** se tipifica como Salud y se declara su tratamiento.

### 9.2 Indicadores de proceso

| Número | Indicador | Descripción | Tipo | Controles | Fórmula | Meta | Frecuencia | Responsable |
|---|---|---|---|---|---|---|---|---|
| `<Código>-I01` | | | Productividad · Cumplimiento · Riesgo · Financiero | `C01, C04` | | | | |

Reglas:

- **Todo indicador se calcula a partir de datos de control que este proceso captura.** Un indicador sin controles vinculados no se publica. Es el defecto más extendido del catálogo actual.
- **Fórmula, meta, frecuencia y responsable son obligatorios.** El modelo de datos vigente no los contempla y hay que ampliarlo: un indicador sin meta ni frecuencia no es medición, es enunciado.

## 10. Implicación JCI y regulatoria

Obligatorio en todo proceso que toque medicamento, dispositivo, muestra, residuo o paciente.

> **Implicación JCI.** Estándar citado y riesgo de no conformidad si el control falla.

> **Implicación regulatoria.** Norma aplicable —DNM, normativa sanitaria local, obligación tributaria— y riesgo de incumplimiento.

Los códigos MMU y PCI se citan según el catálogo ya adoptado por la institución. Cualquier código IPSG con subnúmero se marca como **propuesta a validar** mientras no exista adopción institucional formal.

## 11. Vacíos de información pendientes

Lista explícita de lo que no se pudo confirmar al redactar, con responsable de cerrarlo. Esta sección no se elimina cuando queda vacía: se declara «ninguno».

---

## Lista de verificación antes de publicar

Un proceso pasa a estado «revisado» solo si las doce respuestas son afirmativas.

1. ¿El objetivo es propio de este proceso y no está copiado de otro?
2. ¿El alcance declara las seis variables, incluido lo que queda fuera?
3. ¿Cada actor tiene responsabilidad y nivel de participación declarados?
4. ¿El disparador es un hecho observable?
5. ¿Todos los documentos de entrada existen en el catálogo maestro, con una sola grafía?
6. ¿Ningún paso tiene responsable con descripción vacía?
7. ¿Cada paso que cambia estado, ubicación o custodia tiene su evento declarado con los cinco datos mínimos?
8. ¿Los eventos de creación, transformación y agregación que aplican están declarados?
9. ¿Cada identificador de dato de control es único en el catálogo y su estructura corresponde al dato?
10. ¿Cada indicador tiene controles vinculados, fórmula, meta, frecuencia y responsable?
11. ¿Está declarada la implicación JCI o regulatoria, con estándar citado y riesgo?
12. ¿Está el flujograma insertado, con los puntos de captura marcados?

---

## Nota sobre el orden de los bloques

El orden de esta plantilla no es negociable porque replica el orden canónico que el estándar documental de Avante fija para toda documentación técnica: **objetivo, alcance, actores, disparador, entradas, proceso, salidas, riesgos, controles.** Los bloques de eventos, implicación regulatoria y vacíos se insertan sin alterar esa secuencia.

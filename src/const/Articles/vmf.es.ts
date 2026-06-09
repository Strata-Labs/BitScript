import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { VMF as English } from "./vmf";

// Spanish translation of VMF.
//
// Pattern: spread the English article, then override the translated fields.
// Do NOT override `module` or `section` (inherit English via spread) so the
// page renders correctly across locales. Only translate title, description,
// and content.

export const VMFEs: ArticleViewProps = {
  ...English,
  title:
    "Versión, Marcador, Campo - Configurar e identificar una transacción SegWit",
  description:
    "Examine la configuración de una transacción SegWit, centrándose en los tres primeros campos.",
  content: [
    {
      type: "main title",
      content: "Configurar e identificar una transacción SegWit",
    },
    {
      type: "paragraph",
      content:
        "Pocas actualizaciones han marcado tanto el ecosistema Bitcoin como el muy célebre soft fork SegWit activado por los usuarios en 2017, ¡y con razón! No solo resolvió (o al menos apaciguó, según a quien se le pregunte) una larga guerra de desgaste entre dos bandos: los partidarios de los bloques pequeños y los de los bloques grandes. Más importante aún, culminó en una segunda manera, completamente nueva, de dar formato a una transacción.  ",
    },
    {
      type: "paragraph",
      content:
        "La mayoría de los desarrolladores, principiantes o avanzados, suelen ser conscientes de ello, o al menos han oído hablar de «SegWit». De hecho, (italics)podrían(italics) incluso saber ya que este último (SegWit) inserta una sección completamente nueva en la transacción, conocida como Witness: ",
    },
    {
      type: "paragraph",
      content:
        "(bold)Pero, ante el hexadecimal en bruto de una transacción cualquiera, ¿puede identificar de inmediato si se trata de una transacción Legacy o SegWit?(bold)",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Si le lleva más de ~dos segundos, entonces quizá valga la pena repasar sus conocimientos sobre las transacciones SegWit (siga leyendo, lo sabrá todo al final). Descomponer una transacción, y más concretamente una transacción SegWit, es (italics)particularmente(italics) arduo porque muy pocos recursos cubren el tema de principio a fin. Existen recursos extraordinarios sobre la disección de una transacción Legacy, pero casi nada sobre SegWit, y aún menos recursos sobre las transacciones TapRoot más recientes.",
    },
    {
      type: "paragraph",
      content:
        "Creemos que la mejor manera de mejorar los conocimientos prácticos es hacerlos accionables. Así que, hoy y durante las próximas lecciones, va a inspeccionar una transacción SegWit en su forma hexadecimal en bruto. Al descomponerla byte por byte, cubrirá todos los detalles implicados en leer o escribir una transacción SegWit.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "La tabla anterior parece intimidante, y las primeras veces puede resultar difícil, pero lo más complicado a la hora de comprender las transacciones Bitcoin es identificar y recordar los detalles menores y las excepciones.",
    },
    {
      type: "paragraph",
      content:
        "Siguiendo la tabla anterior, recorreremos una transacción de mainnet y la haremos corresponder con cada campo. A continuación encontrará tanto el identificador de la transacción (TXID) como su transacción hexadecimal en bruto correspondiente:",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Dependiendo de si está registrado o si dispone de acceso freemium, puede seguir el contenido en nuestra herramienta de desserialización abriendo otra ventana y haciendo clic aquí.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-4.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Como sugiere el título, hoy cubrimos las partes (italics)no-Witness(italics) de una transacción SegWit. Más concretamente, nos centramos exclusivamente en los tres (3) primeros campos básicos presentes en una transacción SegWit: ",
    },
    {
      type: "paragraph",
      content:
        "Aunque no tienen un nombre oficial como grupo, solemos considerar estos campos situados al principio como campos de «parámetros» o de «configuración». A continuación encontrará un resumen de estos tres campos; examinaremos cada campo en detalle.",
    },
    {
      type: "paragraph",
      content: "(bold)Version(bold) (4 bytes | 8 caracteres)",
    },
    {
      type: "paragraph",
      content:
        "El campo version es siempre el primerísimo campo presente en una transacción. Tiene una longitud de 4 bytes (u 8 caracteres) y está escrito en formato (italics)(linkformatter)Little Endian(link)(italics); esto simplemente significa que los bytes están invertidos respecto a su valor original (para más información sobre el orden de los bytes, juegue con el formateador de datos enlazado). El resultado final de este formato, como notará, es que el primer byte contiene cierto valor mientras que los tres (3) bytes restantes son 0x00.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-5.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Teóricamente, estos cuatro primeros bytes tienen ~65 000 variaciones posibles; sin embargo, eso no significa que esas versiones sean estándar o aceptadas por los nodos y la red Bitcoin en general. De hecho:",
    },
    {
      type: "paragraph",
      content:
        "(bold)El campo version solo tiene dos valores reconocidos que se retransmiten en la red(bold)",
    },
    {
      type: "paragraph",
      content:
        "A continuación se presentan ambos campos version aceptados, así como los beneficios de la nueva implementación:",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-6.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Cabe destacar, y este es un error bastante común, que (italics)nada en este campo (bold)version(bold) indica si se trata de una transacción Legacy o SegWit(italics); contrariamente a la creencia popular, encontrará tanto transacciones SegWit v1 (italics)(bold)&(bold)(italics) como transacciones Legacy v2: el campo version no tiene (italics)(bold)nada(bold)(italics) que ver con SegWit (eso viene con el siguiente campo). Antes de continuar, examinemos exactamente qué beneficios aporta la Versión 2 (0x02000000) mencionada anteriormente:",
    },
    {
      type: "paragraph",
      content:
        "(bold)Timelock nSequence(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki)BIP 68(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "El primero de los tres beneficios fundamentales de la Versión 2 (0x02000000) proviene del BIP 68 titulado: «Relative Lock-Time Using Consensus-Enforced Sequence Numbers». Es una fórmula bastante rimbombante para decir que nSequence proporciona un timelock a una (bold)(italics)entrada(italics)(bold). Anteriormente, las transacciones disponían de un único campo Locktime situado como el último elemento y (italics)cubría todo el contenido de la transacción(italics).",
    },
    {
      type: "paragraph",
      content:
        "Con el timelock nSequence, cada entrada (compatible con SegWit) dispone de un espacio de timelock situado como último campo de una entrada (después del campo ScriptSig); esto permite a los usuarios especificar el bloque o el momento más temprano en el que una transacción puede ser incluida en la blockchain, ofreciendo un control más personalizado sobre las condiciones de gasto.",
    },
    {
      type: "paragraph",
      content:
        "De particular importancia, este BIP específico fue crucial para hacer posible Lightning, ya que, cuando se abre un canal Lightning, la transacción de financiación incluye valores nSequence para establecer timelocks relativos para el gasto de los fondos del canal. ",
    },
    {
      type: "paragraph",
      content:
        "(bold)OP_CheckSequenceVerify(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki)BIP 112(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "El segundo gran desbloqueo de la Versión 2 se presenta en forma de un opcode (linkOPS/OP_CHECKSEQUENCEVERIFY)OP_CHECKSEQUENCEVERIFY (CSV)(link). CSV permite a los usuarios especificar un retraso temporal relativo para el gasto de una (bold)salida(bold) de transacción, medido en altura de bloque o en tiempo transcurrido desde la confirmación de la salida.",
    },
    {
      type: "paragraph",
      content:
        "Para que quede claro, las dos actualizaciones mencionadas son responsables de introducir mecanismos de bloqueo temporal más granulares. La primera, el timelock nSequence (BIP 68), se centra en añadir esta funcionalidad a las (bold)(italics)entradas(italics)(bold), mientras que la segunda se centra en añadir esta funcionalidad a las (bold)(italics)salidas(italics)(bold). Juntas, ambas mejoras BIP modificaron drásticamente la capacidad de timelock no solo de las transacciones completas sino específicamente de las entradas y las salidas.",
    },
    {
      type: "paragraph",
      content:
        "(bold)Median Time Past(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki)BIP 113(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "La última de las tres actualizaciones incluidas en la Versión 2 también aborda los mecanismos de timelock; sin embargo, esta vez el énfasis no está tanto en añadir una funcionalidad como en asegurar un parámetro existente. Antes de esta actualización, la marca de tiempo principal utilizada para la única funcionalidad de timelock era la marca de tiempo incluida en el bloque minado; sin embargo, esta marca de tiempo podía ser manipulada por los mineros hasta cierto punto, por lo que se consideraba mediocre y potencialmente peligrosa.",
    },
    {
      type: "paragraph",
      content:
        "Como solución para mejorar la fiabilidad de una marca de tiempo de bloqueo/desbloqueo, el BIP 113 introdujo la marca de tiempo «Median Time Past». En lugar de la marca de tiempo del bloque, las verificaciones basadas en el tiempo ahora utilizan (italics)la (bold)mediana(bold) de los (bold)once (11) bloques anteriores(bold)(italics).",
    },
    {
      type: "paragraph",
      content: "(bold)Marker(bold) (1 byte | 2 caracteres)",
    },
    {
      type: "paragraph",
      content:
        "Para responder a la pregunta inicial, o en caso de que esté trabajando en un análisis personalizado, al leer una transacción en bruto, la forma más rápida de saber si se trata de una transacción SegWit es comprobar el byte situado inmediatamente después del campo Version (es decir, el 9º byte). Si el 9º byte es un byte nulo (es decir, igual a 0x00), entonces la transacción es (bold)(italics)efectivamente(italics)(bold) una transacción SegWit con una sección witness segregada.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-7.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Este 9º byte, el segundo campo que estamos examinando, se conoce más concretamente como (bold)Marker(bold); el cual, como su nombre confirma, (bold)marca(bold) si la transacción es Legacy o SegWit. Aparte del byte nulo (0x00), no hay nada más que este campo pueda significar, ya que cualquier otro valor se interpretaría como un VarInt para el campo contador de entradas.",
    },
    {
      type: "paragraph",
      content: "(bold)Flag(bold) (1 byte | 2 caracteres)",
    },
    {
      type: "paragraph",
      content:
        "Por último, pero no menos importante, el tercer y último campo que estamos examinando, que es adyacente al Marker, se conoce como (bold)Flag(bold). También se trata de un valor de un único byte que actúa como indicador para las transacciones SegWit. Teóricamente, debería definir el soporte futuro para variantes adicionales de SegWit; sin embargo, por ahora, solo el valor de byte 0x01 es reconocido como estándar y retransmitido en la red:",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-8.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Como se anticipó en la introducción, el grueso de la lógica y del trabajo implicados se desarrolla en las secciones Entradas, Salidas y Witnesses. Como se ha visto anteriormente, los tres primeros campos (Version, Marker, Flag) son, en efecto, simples campos de ajuste y configuración para una transacción SegWit.",
    },
    {
      type: "title",
      content: "Para concluir",
    },
    {
      type: "paragraph",
      content:
        "Con los tres primeros campos ya tratados, en la próxima lección pasaremos a la sección más complicada de cualquier transacción: el campo Entradas. Como veremos en breve, mantener la retrocompatibilidad entre Legacy y SegWit puede resultar delicado; con la introducción de SegWit, lamentablemente, las entradas se vuelven aún más complejas.",
    },
  ],
};

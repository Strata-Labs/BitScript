import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ATaleOfTwoPaths as English } from "./ataleoftwopaths";

// Spanish translation of ATaleOfTwoPaths.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `module`, `section`, `href`, `shortHandTitle`, `lesson`, `itemType`,
// `isLocked`, `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen`
// identical to the English version (inherited via the spread) so URLs and
// page routing stay stable across locales.

export const ATaleOfTwoPathsEs: ArticleViewProps = {
  ...English,
  title: "La historia de dos caminos",
  description:
    "Una visión introductoria de las transacciones Taproot, destacando el KeyPath, el ScriptPath y su importancia en las transacciones de Bitcoin.",
  content: [
    {
      type: "main title",
      content: "Los fundamentos del KeyPath y el ScriptPath de Taproot ",
    },
    {
      type: "paragraph",
      content:
        "Como anticipamos en la introducción de esta sección, «Por qué Taproot», Taproot es la actualización mayor más apasionante y activamente desarrollada de Bitcoin desde SegWit. De hecho, la mayoría de los proyectos verdaderamente de vanguardia de los últimos uno a tres años están construidos sobre Taproot:",
    },
    {
      type: "list",
      content: [
        {
          type: "hashed-item",
          content:
            "(linkpagehttps://ordinals.com/)Inscripciones Ordinal(linkpage)",
        },
        {
          type: "hashed-item",
          content:
            "(linkpagehttps://docs.lightning.engineering/the-lightning-network/taproot-assets)Taproot Assets(linkpage)",
        },
        {
          type: "hashed-item",
          content: "(linkpagehttps://bitvm.org/bitvm.pdf)BitVM(linkpage)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Y seguramente me falten muchos otros. La cuestión es que no es teórico, está en uso (bold)(italics)ahora mismo(italics)(bold) y, sin duda, cumple su promesa de mayor privacidad, mayor eficiencia y comisiones más bajas. Desde su actualización en 2021, Taproot ha experimentado un crecimiento constante en la penetración de su formato de dirección, seguido de una aceleración drástica con el lanzamiento de Ordinals.",
    },
    {
      type: "paragraph",
      content:
        "Lo que nos lleva al día de hoy. Hoy vamos a presentar exactamente *qué* es Taproot y cómo funciona internamente. Por supuesto, no abordaremos estos puntos en detalle, sino que pretendemos exponer y conectar las piezas para el resto de esta serie.",
    },
    {
      type: "paragraph",
      content:
        "Taproot es un nuevo tipo de transacción SegWit que, por defecto, viene equipado con dos caminos gastables (un (bold)KeyPath(bold) y un (bold)ScriptPath(bold)).",
    },
    {
      type: "paragraph",
      content:
        "Como de costumbre, comenzaremos con un ejemplo visible en el (linktransactions)Deserializer(link) para poder ver la conexión entre el diseño y una transacción confirmada. Centrémonos primero en el formato de la salida.",
    },
    {
      type: "title",
      content: "Salida",
    },
    {
      type: "paragraph",
      content:
        "Como se mencionó en la lección «Por qué Taproot», el mayor impulsor de la privacidad de las transacciones on-chain proviene (italics)del formato universal de la salida(italics). Cada salida Taproot tiene el mismo aspecto en cuanto a elementos y longitud:",
    },
    {
      type: "image",
      src: "/articles/a tale of two paths/image1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "En la transacción destacada arriba, que puede encontrar (linkpagehttps://www.bitscript.app/transactions?transaction=d53b9e0b9e4a0b2e77ad61862a3d385d9748c9b6e6ea402be7efdcafb931d2a7)aquí(linkpage), notará que el scriptPubKey de la salida Taproot se compone de tres elementos diferentes. Independientemente de si el KeyPath es una firma única o multifirma, (italics)o(italics) de si el árbol de Merkle del ScriptPath está vacío o contiene 2ª128 caminos de script, el formato de (bold)(italics)cualquier(italics)(bold) salida Taproot (italics)es exactamente el mismo(italics) (de aquí proviene la seguridad incrementada). ",
    },
    {
      type: "paragraph",
      content:
        "Para examinar este patrón en una transacción minada, consulte uno o más de los ejemplos de Taproot prestando atención a los scriptPubKey de salida; con el tiempo, queda claro que el formato del scriptPubKey de salida Taproot cumple con lo siguiente: ",
    },
    {
      type: "image",
      src: "/articles/a tale of two paths/image2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Lo anterior resume el estándar para un scriptPubKey Taproot. Cada uno de estos scripts contiene únicamente tres elementos y toda salida debería tenerlos; repasémoslos a continuación:",
    },
    {
      type: "paragraph",
      content: "(bold)Indicador de versión SegWit(bold) (0x51)*",
    },
    {
      type: "paragraph",
      content:
        "Cada scriptPubKey compatible con SegWit con un destinatario compatible con SegWit comienza con un campo que señala la (italics)versión(italics)) de SegWit utilizada. Antes de Taproot, solo existía un único valor de versión SegWit considerado estándar en el scriptPubKey: (bold)0x00(bold). Taproot, para su indicador de versión SegWit, utiliza en cambio el valor visto arriba: (bold)0x51(bold).",
    },
    {
      type: "paragraph",
      content:
        "(italics)*Para ser sinceros, no sabemos del todo por qué el BIP341 establece 0x51 (OP_PUSHDATA1) en lugar de (0x01), el supuesto siguiente valor de versión SegWit después de 0x00; si lo sabe, le rogamos se ponga en contacto, ya que nos gustaría incluir el «porqué» en este artículo.(italics)",
    },
    {
      type: "title",
      content: "OP_PUSH20 | OP_PUSH21",
    },
    {
      type: "paragraph",
      content:
        "Este siguiente elemento se conoce como una operación push data. Estos op_codes se utilizan en el script de Bitcoin para comunicar a la pila el tamaño (en bytes) de los datos que estamos a punto de empujar. En Taproot, se incluye directamente una clave pública como último elemento, como veremos a continuación. ",
    },
    {
      type: "paragraph",
      content:
        "Esta clave pública, dependiendo de si es par o impar, ocupa 32 bytes o 33 bytes; por lo tanto, este segundo elemento de un scriptPubKey Taproot es siempre OP_PUSH20 (0x20) u OP_PUSH21 (0x21).",
    },
    {
      type: "title",
      content: "Clave pública Taproot",
    },
    {
      type: "paragraph",
      content:
        "Y eso es todo en cuanto al formato de una salida Taproot: todo Bitcoin enviado a una dirección Taproot contendrá un scriptPubKey con los mismos elementos. Ahora, antes de continuar, mostremos la configuración que tenemos aquí (conviene señalar que el diagrama a continuación omite el paso del «tweak» que deriva la clave pública Taproot; lo abordaremos más adelante):",
    },
    {
      type: "image",
      src: "/articles/a tale of two paths/image3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "title",
      content: "KeyPath",
    },
    {
      type: "paragraph",
      content:
        "El último elemento de una salida Taproot es la clave pública tweaked. Revisaremos más adelante qué significa este término «tweaked», ya que es importante en la construcción de la salida. Pero, por ahora, lo único que nos interesa es establecer los fundamentos del KeyPath. Como su nombre sugiere, el KeyPath está disponible para que el propietario de la clave pública destinataria firme y gaste el Bitcoin como firmante único, como multifirma o en algún punto intermedio (como una multifirma con un umbral definido).",
    },
    {
      type: "paragraph",
      content:
        "Como también revisaremos en el artículo mucho más extenso dedicado al KeyPath, la base de estas funcionalidades se introduce en (linkpagehttps://www.bitscript.app/transactions?transaction=d53b9e0b9e4a0b2e77ad61862a3d385d9748c9b6e6ea402be7efdcafb931d2a7)BIP 340: Firmas Schnorr(linkpage). Como alternativa al esquema criptográfico ECDSA, la introducción de las firmas Schnorr en Taproot incrementó drásticamente la utilidad y la flexibilidad de las claves públicas y las firmas.",
    },
    {
      type: "paragraph",
      content:
        "Por supuesto, hay mucho más que detallar sobre el KeyPath; sin embargo, por ahora, queremos mantener este artículo en los fundamentos antes de adentrarnos más en la serie.",
    },
    {
      type: "title",
      content: "ScriptPath",
    },
    {
      type: "paragraph",
      content:
        "Además del KeyPath, que, como ya hemos visto, ofrece más que una simple condición de gasto de firma única, cada salida Taproot dispone de un segundo camino de gasto alternativo que ofrece insondablemente más condiciones de gasto: el ScriptPath. Sin embargo, como mencionamos antes, aunque el (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)BIP(linkpage) de Taproot lo define como el «ScriptPath», conviene recordar que no se trata de un único script, sino más bien de un árbol de Merkle de scripts (conocidos como tapleaves u hojas). En resumen, (italics)cada(italics) tapleaf puede contener un script con condiciones de gasto únicas; por curiosidad, el límite superior del número de tapleaves que una sola salida Taproot puede contener es de (bold)(italics)nada menos que 2ª128 scripts(italics)(bold).",
    },
    {
      type: "paragraph",
      content:
        "El destinatario, cuando quiera gastar su Bitcoin posteriormente, tiene la opción (bold)(italics)bien(italics)(bold) de gastar a través del KeyPath (bold)(italics)bien(italics)(bold) de elegir una de las tapleaves del ScriptPath. Gastar a través del KeyPath es sencillo, ya que todo lo que se necesita es una firma Schnorr correspondiente; sin embargo, gastar una tapleaf del ScriptPath es notablemente más complejo y tiene que ver con los árboles de Merkle. En concreto, tendremos que revisar y comprender cómo se pueden utilizar los árboles de Merkle para demostrar la inclusión de algo.",
    },
    {
      type: "paragraph",
      content:
        "¡Y eso es todo por este artículo! En resumen, todas las salidas Taproot son salidas compatibles con SegWit que comienzan con (bold)0x51(bold9) (un indicador de versión SegWit) y van seguidas poco después por una clave pública tweaked; además, todas las salidas Taproot vienen equipadas con dos caminos de gasto por defecto, un KeyPath más simple y un ScriptPath más complejo. Por supuesto, todo lo que sabemos ahora sigue siendo conocimiento superficial destinado a una introducción; en los próximos artículos profundizaremos en cada parte de Taproot, preparándonos para responder a algunas preguntas básicas como:",
    },
    {
      type: "list",
      content: [
        {
          type: "hashed-item",
          content: "¿Cómo se genera la clave pública Taproot final?",
        },
        {
          type: "hashed-item",
          content: "¿Cuáles son las diferencias entre ECDSA y Schnorr?",
        },
        {
          type: "hashed-item",
          content: "¿Cómo gastamos realmente una de las tapleafs?",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Continúe leyendo y nos aseguraremos de responder a estas preguntas y, con suerte, a cualquier otra que pueda tener.",
    },
  ],
};

import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { GeneratingTaprootPubKey as English } from "./generatingATaprootOutput";

// Spanish translation of GeneratingTaprootPubKey.
//
// Pattern: spread the English article, then override the translated fields.
// Do NOT override `module` or `section` (inherit via the spread) — translating
// them renders the page blank. Keep `href`, `shortHandTitle`, `lesson`,
// `itemType`, `isLocked`, `published`, and the googleLink fields identical to
// the English version so URLs stay stable across locales.

export const GeneratingTaprootPubKeyEs: ArticleViewProps = {
  ...English,
  title: "Generar una PubKey Taproot (Pt. I)",
  description: "Visión general y configuración del ejemplo",
  content: [
    {
      type: "main title",
      content: "Generar una PubKey Taproot (Pt. I)",
    },
    {
      type: "subtitle",
      content: "Visión general y configuración del ejemplo",
    },
    {
      type: "paragraph",
      content: "(bold)Introducción(bold)",
      customClass: "text-2xl font-bold mt-6",
    },
    {
      type: "paragraph",
      content:
        "Hemos tenido que aprender bastantes conceptos para llegar hasta este punto, pero, hoy, finalmente vamos a recorrer cada paso involucrado en la generación de una salida Taproot (bastante simple). Como esperamos que pueda apreciar, si bien la idea de embutir múltiples tapscripts en un árbol de Merkle y luego ocultarlo todo dentro de una clave pública suena complicada, el proceso de generación es en realidad bastante simple (note, no necesariamente fácil, pero ciertamente no tan complicado como se lo pinta).",
      customClass: "-mt-4",
    },
    {
      type: "paragraph",
      content:
        "Para comenzar, cada salida P2TR, ya sea que incluya un único script no gastable o 2^128 caminos de gasto, todas parecen una simple clave pública de 32 bytes; estas claves públicas, como ha aprendido (linkpagehttps://www.bitscript.app/lessons/A%20Tale%20of%20Two%20Paths)aquí(linkpage), contienen al menos dos caminos de gasto diferentes para un UTXO:",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey/TaprootOutputGraph.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "Una salida Taproot, vista arriba, es en última instancia una simple cadena de 32 bytes | 64 caracteres hexadecimales; o más específicamente, (bold)(italics)una clave pública taproot(italics)(bold) (o salida P2TR). A día de hoy, las salidas pay-2-taproot son las únicas salidas con una sola clave pública como la totalidad del pubkeyscript; lo que significa que puede identificar una salida Taproot en una transacción cruda, como (linkpagehttps://www.bitscript.app/transactions?transaction=d53b9e0b9e4a0b2e77ad61862a3d385d9748c9b6e6ea402be7efdcafb931d2a7&env=MAINNET)esta,(linkpage) porque (bold)(italics)siempre(italics)(bold) seguirá el mismo patrón que arriba: bandera SegWit (bold)(0x51)(bold) + longitud de la salida Taproot (bold)(0x20 = 32 bytes)(bold) + la propia clave pública KeyPath.",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey/TaprootPubKeyScriptFormat.png",
      alt: "Taproot pubkey script Format image",
    },
    {
      type: "paragraph",
      content:
        "Hoy, ya no estamos repasando el concepto sino que nos sumergimos directamente en la pregunta fundamental en la que nos enfocaremos hoy:",
    },
    {
      type: "paragraph",
      content:
        "(bold)(italics)¿Cómo se generan realmente estas salidas Taproot?(italics)(bold)",
    },
    {
      type: "paragraph",
      content:
        "En caso de que el título no lo haya revelado, recorrerlo todo es simple pero de ninguna manera directo, por lo que estará repartido en (bold)dos(bold) artículos. En esta primera parte, vamos a enfocarnos en una visión general de todos los pasos involucrados, presentar una narrativa de caso de uso real y previsualizar un cálculo prerrequisito introducido en (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)BIP340(linkpage); en la segunda parte de esta serie, lo concluiremos creando nuestro ScriptPath en árbol de Merkle y finalmente tweakeando nuestra clave pública interna para generar una clave Taproot.",
    },
    // TODO: create a new style that makes this text light gray
    {
      type: "paragraph",
      content: "Visión general",
      customClass: "text-gray-800",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "Antes de recorrer un ejemplo paso a paso, tiene sentido mirar antes de saltar. En nuestro caso, esto significa que necesitamos revisar primero los pasos de alto nivel; como verá a lo largo del recorrido, asumiendo que está algo familiarizado con script, la mayor parte involucra material que ya hemos cubierto; es específicamente el scriptpath, o el árbol de Merkle de opciones de script (conocidas como «tapleafs»), donde pasaremos la mayor parte de nuestro tiempo.",
      customClass: "-mt-4",
    },
    {
      type: "paragraph",
      content:
        "Cuando nos disponemos a generar una clave pública taproot | una salida pay to taproot, hay generalmente cuatro pasos que necesitaremos recorrer:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Seleccionar una clave interna (bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Crear nuestros TapLeafs(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Generar el ScriptPath*(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)4. Tweakear la clave interna(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Como se mencionó, pasaremos la gran mayoría de nuestro tiempo en el paso 3. Generar el ScriptPath (cubierto en el próximo artículo). A partir de esta lista, los requisitos exactos para crear una salida P2TR se vuelven claros:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. Una clave pública Taproot de Bitcoin (32 bytes) que ya posea, a la cual llamaremos la (bold)clave pública interna(bold)",
        },
        {
          type: "numbered-item",
          content:
            " 2. Todos los diferentes caminos de gasto que queramos incluir en el scriptpath expresados como tapscripts (que a su vez serán usados para crear nuestros (bold)TapLeafs(bold))",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Con estos dos elementos conocidos, ¡podemos seguir adelante y ponernos manos a la obra! A continuación, repasaremos rápidamente cada uno de estos conceptos antes de avanzar por el resto de los cuatro pasos mencionados arriba.",
    },
    {
      type: "title",
      content: "1. Seleccionar una clave interna",
      customClass: "text-black ",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "Una salida Taproot comienza con una clave pública que (idealmente) tiene acceso a un puñado de UTXOs para financiar transacciones y termina con una clave pública diferente colocada directamente en el campo Output PubkeyScript.",
    },
    {
      type: "paragraph",
      content:
        "Esta es una diferencia importante entre las salidas pay-2-taproot y los tipos de transacciones más tradicionales como p2pkh o p2sh. La mayoría de las otras salidas tienen múltiples elementos en el scriptpubkey/lockscript tales como una clave pública hasheada y op_checksig; las salidas pay-2-taproot no tienen tales propiedades ni op_codes. En su lugar, las salidas P2TR tienen una única clave pública de 32 bytes como campo scriptpubkey. Como veremos a continuación, esta única clave pública de 32 bytes se conoce como la «clave taproot» o la «clave tweakeada».",
    },
    {
      type: "paragraph",
      content:
        "(italics)Por supuesto, una pregunta legítima aquí es: ¿qué es exactamente un tweak y por qué exactamente estamos tweakeando nuestra clave pública original?(italics)",
    },
    {
      type: "paragraph",
      content:
        "En criptografía, al menos hasta donde sé, un (bold)tweak(bold) es un término genérico que significa realizar algún cambio a una clave pública; este cambio es comúnmente una o más de las siguientes operaciones: concatenación, adición, multiplicación y hashing. Entraremos mucho, mucho más a fondo en el próximo artículo, pero, en resumen, (bold)necesitamos una clave interna porque es lo que tweakearemos para producir la clave taproot real:(bold)",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey/taproot-output-3.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "Una vez que sepamos la clave interna que usaremos, sabemos que al menos podemos gastar directamente usando una firma Schnorr; sin embargo, si queremos la flexibilidad y privacidad ofrecidas por taproot, necesitaremos crear nuestro scriptpath, lo que significa que primero necesitaremos elegir nuestros tapleaves.",
    },
    {
      type: "title",
      content: "2. Crear nuestros TapLeaves",
      customClass: "text-black ",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "¿Cuáles son todas las diferentes maneras en que este UTXO puede ser gastado? Posiblemente la mejor parte de la actualización Taproot es la flexibilidad ofrecida a través del script path porque permite codificar una cantidad casi infinita (2^128) de opciones de pago.",
    },
    // TODO: make this to have a lighter font color
    {
      type: "paragraph",
      content: "Escenario de la bóveda familiar",
      customClass: "text-gray-700 font-semi-bold",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "Crear el ScriptPath, o el árbol de Merkle de estas opciones de pago, comienza por definir cuántos caminos de gasto, o tapleaves, vamos a codificar. Digamos por ejemplo que queremos almacenar algo de Bitcoin en una bóveda familiar con las siguientes propiedades:",
      customClass: "-mt-4",
    },

    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "1. El cónyuge puede gastarlo en cualquier momento",
        },
        {
          type: "numbered-item",
          content: "2. Los padres pueden gastarlo juntos",
        },
        {
          type: "numbered-item",
          content: "3. La descendencia puede gastarlo en 18 años",
        },
        {
          type: "numbered-item",
          content: "4. Su mejor amigo puede gastarlo con una contraseña",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Estas cuatro opciones de pago conforman los cuatro nodos diferentes o (bold)(italics)tapleafs(italics)(bold) que dan inicio al proceso de generación de nuestro árbol de Merkle.",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey/MerkelTree.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "(italics)¿Pero no podría hacer esto ya con p2sh o p2wsh?(italics)",
    },
    {
      type: "paragraph",
      content:
        "El observador astuto podría notar que, por complejo que sea, es totalmente posible embutir estas cuatro opciones de pago en un único script p2sh | p2wsh, y tendría razón. Eso puede hacerse y se hace. Sin embargo, más allá de la escalabilidad casi infinita de los caminos de árbol frente al límite de escritura de un script, aquí es donde la parte de privacidad de Taproot realmente brilla:",
    },
    {
      type: "paragraph",
      content: "(bold)Solo se revela el tapleaf gastado(bold)",
    },
    {
      type: "paragraph",
      content:
        "Teóricamente, podría usar un p2sh grande con sentencias if anidadas, pero entonces revelaría la clave pública de cada miembro de la familia ya que revelaría todos los caminos de gasto, lo cual obviamente no es ideal; alternativamente, usando el scriptpath que construiremos, (bold)solo(bold) se revela la clave pública del miembro que está gastando.",
    },
    {
      type: "paragraph",
      content:
        "Para facilitar la implementación de los tapleafs, escribamos exactamente cómo se expresa cada uno de nuestros cuatro escenarios deseados a través de los siguientes pubkeyscripts:",
    },
    {
      type: "table",
      headers: ["Escenario", "Descripción", "Equivalente PubKey"],
      rows: [
        [
          "El cónyuge puede gastar en cualquier momento",
          "Consumo directo del UTXO con una simple clave pública",
          "P2PKH",
        ],
        [
          "Los padres pueden gastar juntos",
          "Se requiere un multisig 2-de-2",
          "P2SH (multi-sig 2/2)",
        ],
        [
          "La descendencia puede gastar en 18 años",
          "Consumo directo del UTXO después de que hayan pasado 18 años (en altura de bloque)",
          "P2SH (timelock)",
        ],
        [
          "El amigo puede gastar con una contraseña",
          "Consumo directo del UTXO con una contraseña coincidente",
          "P2SH (hashlock)",
        ],
      ],
    },
    {
      type: "paragraph",
      content:
        "Considerando nuestros numerosos artículos sobre la creación de scripts, no repasaremos cómo se genera realmente cada uno de los tapscripts anteriores; sin embargo, como ejercicio para usted, le recomendamos encarecidamente que inicie la próxima Taproot Tool y siga el ejemplo.",
    },
    {
      type: "title",
      content: "TaggedHashes",
      customClass: "text-gray-500 font-bold mb-1"
    },
    {
      type: "paragraph",
      content:
        "Antes de introducir los múltiples pasos derivados en la generación del scriptpath y finalmente de una salida P2TR, es necesario revisar primero un peculiar pequeño «tag» criptográfico introducido en (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)BIP340.(linkpage) Si busca «tag» o «tag hash», encontraría lo siguiente:",
    },
    {
      type: "paragraph",
      content:
        '(bold)TagHash("x") = SHA256(SHA256(x) || SHA256(x) || resto de los elementos…)(bold)',
    },
    {
      type: "paragraph",
      content:
        "En resumen, TapScript/Taproot usa este sistema de etiquetado (italics)(bold)(underline)tres(underline)(bold)(italics) veces diferentes al generar el scriptpath y la eventual salida P2TR como una forma simple de evitar colisiones no relacionadas con Taproot. Todo lo que esto hace es decodificar y hashear alguna cadena (ya sea 'TapLeaf,' 'TapBranch' o 'TapTweak') dos veces y prefijarla a los datos realmente pertinentes.",
    },
    {
      type: "paragraph",
      content:
        "Esta es una fuente común de confusión que la gente tiende a sobre-pensar; siempre que vea TaggedHashed('TapWhatever,' [algún script]), todo lo que significa es que necesitará hashear 'TapWhatever' dos veces y prefijarlo a [algún script]. De nuevo, solo hay (hasta ahora) tres opciones para lo que va en un tagged hashed, así que podemos resumir esto para mayor familiaridad a continuación:",
    },
    {
      type: "table",
      headers: ["TagHash", "Cuándo se usa", "Fórmula (H = sha256())"],
      rows: [
        [
          "TapLeaf",
          "Una vez, construcción inicial del TapLeaf",
          "H('TapLeaf') || H('TapLeaf') || TapLeaf Version || Tamaño del script || PubKeyScript",
        ],
        [
          "TapBranch",
          "En cada paso al subir por el árbol",
          "H('TapBranch') || H('TapBranch') || A || B",
        ],
        [
          "TapTweak",
          "Una vez, durante el tweaking de la clave raíz",
          "H('TapTweak') || H('TapTweak') || P || AB",
        ],
      ],
    },
    {
      type: "paragraph",
      content:
        "Como debería esperar, usaremos cada uno de estos tres TagHashes mientras atravesamos hacia arriba nuestro árbol de Merkle, yendo desde nuestros cuatro TapLeafs hasta",
    },
    {
      type: "title",
      content: "Del PubKeyScript al TapLeaf",
      customClass: "text-gray-500 font-bold mb-2"
    },
    {
      type: "paragraph",
      content:
        "Asumamos que tenemos el scriptpubkey para nuestro (bold)escenario n.º 1,(bold) en el que nuestra cónyuge puede gastar el tapleaf usando su clave pública en una transacción p2pkh bastante simple; para pasar de un PubKeyScript a un TapLeaf primero debemos concatenar la TapLeafVersion con el tamaño del script y el script mismo. A partir de BIP342, solo hay una única versión de TapLeaf reconocida, por lo que es seguro asumir que esta será la constante mágica (0xc0) por ahora:",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey/TapLeafFormat.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "Con estos tres elementos concatenados, todo lo que necesitamos hacer ahora es calcular el valor hasheado de 'TapLeaf,' concatenarlo a sí mismo una vez, y luego concatenar el array de bytes de tres elementos que acabamos de hacer con la versión, tamaño y script. (bold)¡Y eso es todo!(bold)",
    },
    {
      type: "paragraph",
      content:
        "Hemos generado con éxito (bold)uno(bold) de nuestros cuatro TapLeafs. Para avanzar, debemos repetir ese proceso con los tres escenarios restantes; una vez completado, habremos seleccionado nuestra clave interna y generado nuestros cuatro TapLeafs — ¡lo que significa que estamos a mitad de camino de los cuatro pasos principales involucrados! (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20II)) Continúe leyendo (linkpage) para ver cómo merkilizaremos los TapLeafs para terminar con nuestro scriptpath.",
    },
  ],
};

import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { MerkleTreeReview as English } from "./merkletreereview";

// Spanish translation of MerkleTreeReview.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `module`, `section`, `href`, `shortHandTitle`, `lesson`, `itemType`,
// `isLocked`, `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen`
// identical to the English version (inherited via the spread) so URLs and
// navigation stay stable across locales.

export const MerkleTreeReviewEs: ArticleViewProps = {
  ...English,
  title: "Repaso del árbol de Merkle",
  description:
    "Profundice en el papel de los árboles de Merkle en el ScriptPath de las transacciones Taproot.",
  content: [
    {
      type: "main title",
      content: "La estructura de datos responsable del ScriptPath",
    },
    {
      type: "paragraph",
      content:
        "Conviene recordar que muy pocas ideas son verdaderamente originales. Esto es particularmente cierto no solo para Taproot, sino para los (italics)fundamentos(italics) que dotan a Taproot de sus múltiples ventajas. Como vimos anteriormente, uno de estos fundamentos es la firma de Schnorr, que aporta al KeyPath toda su utilidad; es matemáticamente responsable de hacer posible firmar con una firma única, múltiple o ponderada. ",
    },
    {
      type: "paragraph",
      content:
        "Hoy nos vamos a centrar en el otro camino predeterminado disponible para quien gasta: el ScriptPath. Y al igual que el KeyPath tenía las firmas de Schnorr como bloque constructivo, el ScriptPath (italics)también(italics) cuenta con un fundamento matemático esencial para nuestra comprensión: (bold)los árboles de Merkle(bold).",
    },
    {
      type: "paragraph",
      content:
        "Los ScriptPaths (italics)no(italics) son, como el nombre da a entender, scripts simples y singulares, sino más bien un árbol de Merkle de opciones. Sin embargo, los árboles de Merkle en sí mismos no son necesariamente nuevos ni originales. De hecho, los árboles de Merkle ya existen en otras partes de Bitcoin y múltiples BIPs han propuesto aprovecharlos de formas únicas. Las matemáticas, como veremos, son relativamente sencillas; en realidad son los matices que Taproot incluye al recorrer el árbol hacia arriba los que hacen que el ScriptPath sea un poco difícil de asimilar. ",
    },
    {
      type: "title",
      content: "Visión general del árbol de Merkle",
    },
    {
      type: "paragraph",
      content:
        "Tenemos varias lecciones anteriores en esta serie que profundizan en detalle en el porqué, la historia, etc... de los árboles de Merkle. Hoy nos interesa específicamente entender cómo se utiliza un árbol de Merkle para construir la parte del ScriptPath de una salida Taproot, por lo que nuestro repaso de los «conceptos básicos» será intencionadamente compacto.",
    },
    {
      type: "paragraph",
      content: "(italics)¿Por qué usar un árbol de Merkle?(italics)",
    },
    {
      type: "paragraph",
      content:
        "(bold)Porque un árbol de Merkle, o árbol de hash binario, no se utiliza para almacenar, sino más bien para verificar eficientemente que ciertos datos existen dentro de un conjunto de datos sin revelar dichos datos.(bold)",
    },
    {
      type: "paragraph",
      content:
        "El error más común que comete la gente cuando aprende por primera vez sobre un árbol de Merkle es suponer que es útil para obtener y establecer datos: no es el caso. Los árboles de Merkle son útiles porque la propia salida es muy ligera en datos (un solo hash) y porque proporcionan validación de datos sin (italics)revelar el conjunto completo de datos(italics). Originalmente concebido por un tal Ralph (bold)Merkle(bold) en su eminente artículo de 1987 (linkpagehttps://people.eecs.berkeley.edu/~raluca/cs261-f15/readings/merkle.pdf)«A Certified Digital Signature»,(linkpage) su objetivo era abordar el problema de verificar eficientemente la autenticidad de grandes conjuntos de datos sin la necesidad de almacenar o transmitir el conjunto de datos completo.",
    },
    {
      type: "paragraph",
      content: "(italics)¿Qué es exactamente?(italics)",
    },
    {
      type: "paragraph",
      content:
        "Es una estructura de datos, programable en cualquier lenguaje, que se organiza en un árbol binario donde cada nodo hoja representa un fragmento de datos y cada nodo no hoja (interno) es un hash criptográfico de sus nodos hijos. El nodo superior, conocido como la (bold)raíz(bold), es un hash de (italics)todos(italics) los datos (lo mantendremos breve aquí porque a continuación vamos a proporcionar contexto visual adicional). ",
    },
    {
      type: "paragraph",
      content: "(italics)¿Dónde más se utilizan en Bitcoin?(italics)",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Verificación de transacciones(bold)",
        },
        {
          type: "paragraph",
          content:
            "El uso más conocido de los árboles de Merkle en Bitcoin es verificar las transacciones en un bloque. En lugar de descargar y verificar cada transacción del bloque completo, se utiliza una estructura de árbol de Merkle simplificada para crear una representación compacta de todas las transacciones. Una cabecera de bloque incluye la raíz de Merkle de estas transacciones. Al comparar esta raíz de Merkle con el camino de Merkle proporcionado en la cabecera de un bloque, los nodos pueden confirmar rápidamente que una transacción específica está incluida en el bloque sin descargar y comprobar cada transacción.",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Datos de witness(bold)",
        },
        {
          type: "paragraph",
          content:
            "Con la introducción de Segregated Witness (SegWit), Bitcoin también utiliza árboles de Merkle para organizar y validar los datos de witness (firmas y scripts). Los datos de witness se estructuran en un árbol de Merkle, y la raíz de Merkle se incluye en el OP_RETURN de la transacción Coinbase del bloque. Esto permite la poda eficiente de los datos de witness cuando no se necesitan para la validación, reduciendo así el tamaño de los bloques. Cuando una transacción gasta salidas SegWit, el emisor proporciona un camino de Merkle para demostrar la inclusión de los datos de witness.",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Por último, como se ha mencionado, este está lejos de ser el primer BIP en aprovechar esta estructura de datos; tanto (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0114.mediawiki)BIP114(linkpage) como (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0117.mediawiki)BIP117(linkpage) se citan como inspiraciones en la parte de «Design» del BIP de Taproot (341).",
    },
    {
      type: "paragraph",
      content:
        "Ahora que hemos terminado un breve repaso sobre por qué son necesarios los árboles de Merkle y cómo se utilizan actualmente en Bitcoin, es momento de pasar al «cómo» de la implementación: ¿cuál es la disposición y cómo funcionan los árboles de Merkle?",
    },
    {
      type: "title",
      content: "Disposición del árbol de Merkle",
    },
    {
      type: "paragraph",
      content:
        "Esperamos que, a estas alturas, haya quedado claro que el objetivo de un árbol de Merkle no es el almacenamiento, sino más bien la verificación eficiente dentro del almacenamiento: ¿podemos validar rápidamente que ciertos datos con hash forman parte de este conjunto de datos? Al más alto nivel, esto implica dos funciones principales como requisitos para un árbol de Merkle:",
    },
    {
      type: "list",
      content: [],
    },
    {
      type: "paragraph",
      content:
        "Antes de pasar a un sencillo ejemplo de construcción, repasemos(quickly)  la estructura y la terminología comunes que se encuentran en un árbol de Merkle.",
    },
    {
      type: "image",
      src: "/articles/merkle tree review/Image1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "El diagrama anterior presenta los tres términos con los que nos encontraremos al trabajar (ya sea construyendo o verificando) con árboles de Merkle. En la siguiente sección, recorreremos un ejemplo sencillo de construcción de un árbol de Merkle, pero no exactamente como se hace en Taproot: eso es un poco más sutil, así que lo reservaremos para la próxima lección.",
    },
    {
      type: "title",
      content: "Construcción del árbol de Merkle",
    },
    {
      type: "paragraph",
      content:
        "Digamos que, por alguna razón, queremos crear un árbol de Merkle que contenga los datos: (bold)[0,1,2,3](bold). Eso es todo, solo cuatro representaciones en forma de cadena de enteros. Con nuestros datos, para llegar a una raíz de Merkle, que es como completamos nuestro árbol, tendremos que seguir tres pasos:",
    },

    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Hashear los datos para crear las hojas de Merkle(bold)",
        },
        {
          type: "paragraph",
          content:
            "El primer paso es crear hashes para todos los elementos de los datos originales. Estamos usando (bold)[0,1,2,3](bold). Dirígete a la (linkhashCalculator)Calculadora de hash(link), establece la configuración en «String», el algoritmo de hash en HASH256 y haz el hash de cada número uno por uno; cada vez obtendrás a cambio un hash de 32 bytes. En conjunto, estos ya no se conocen como nuestros datos originales sino como las (bold)hojas de Merkle(bold):",
        },
        {
          type: "image",
          src: "/articles/merkle tree review/Image5.png",
          alt: "Image Alt Text",
        },
        {
          type: "paragraph",
          content:
            "Aunque ahora estamos comenzando nuestro árbol de Merkle, nuestro árbol está completo cuando nos queda un solo hash, conocido como la raíz de Merkle. Así que, a continuación, debemos realizar algo de trabajo para convertir nuestras hojas de Merkle en ramas de Merkle.",
        },
        {
          type: "numbered-item",
          content:
            "(bold)2. Concatenar y calcular el hash de las hojas de Merkle para crear las ramas de Merkle(bold)",
        },
        {
          type: "paragraph",
          content:
            "Como leyó en la sección anterior sobre el árbol de Merkle o notó en el visual anterior, la única raíz de Merkle es (bold)(italics)siempre(italics)(bold) la parte superior del árbol y las N hojas de Merkle son (bold)(italics)siempre(italics)(bold) la parte inferior del árbol. Es en la parte central, las ramas, o la profundidad del árbol, donde se realiza la mayor parte del trabajo.",
        },
        {
          type: "paragraph",
          content:
            "En cada nivel de profundidad, comenzando de derecha a izquierda, se ejecuta el siguiente algoritmo:",
        },
        {
          type: "secondary-numbered-item",
          content:
            "1. Concatenar la hoja | rama de Merkle (N) con la hoja | rama de Merkle (N + 1)",
        },
        {
          type: "secondary-numbered-item",
          content:
            "2. Calcular el hash del resultado con el mismo algoritmo de hash que usamos para nuestras hojas (en nuestro caso particular es HASH256)",
        },
        {
          type: "secondary-numbered-item",
          content:
            "3. Repetir los pasos 1. y 2. para todos los pares de elementos restantes en este nivel del árbol",
        },
        {
          type: "image",
          src: "/articles/merkle tree review/Image3.png",
          alt: "Image Alt Text",
        },
        {
          type: "paragraph",
          content:
            "En nuestro ejemplo específico, dado que comenzamos con cuatro (4) hojas, solo tenemos un único paso entre nuestra rama y nuestra raíz (que veremos a continuación); pero esperamos que no sea demasiado difícil imaginar lo que sucede si hubiéramos comenzado con ocho (8), o dieciséis (16) hojas en su lugar (simplemente tendríamos dos y tres rondas de hash de ramas respectivamente). ",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Repetir hasta obtener la raíz de Merkle(bold)",
        },
        {
          type: "paragraph",
          content:
            "Al ejecutar correctamente el Paso 2, finalmente llegamos a un único valor en la parte superior, como se esperaba: (bold)es este único valor el que consideramos la (italics)raíz(italics) de Merkle(bold). Nuestro ejemplo a continuación se muestra ahora de arriba hacia abajo: ¡deberías poder seguirlo manualmente y obtener el mismo resultado!",
        },
        {
          type: "image",
          src: "/articles/merkle tree review/Image4.png",
          alt: "Image Alt Text",
        },
        {
          type: "paragraph",
          content:
            "Ahora, imagine que, en lugar de comenzar con nuestros datos originales como enteros, comenzáramos con PubKeyScripts: nada sería diferente en el proceso. (bold)(italics)Eso es exactamente lo que hacemos al crear el ScriptPath(italics)(bold).",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "¡Y eso es todo por la lección de hoy! Como prometimos, fue un breve repaso sobre los árboles de Merkle mientras nos preparamos para rellenar las hojas de Merkle con script en lugar de enteros; como notarás, el proceso permanecerá exactamente igual, la *única* diferencia serán algunas concatenaciones adicionales muy específicas de Taproot en cada paso del camino. Después, una vez que terminemos de construir nuestro árbol y entender cómo se convierte en una salida Taproot, finalmente dirigiremos nuestra atención a gastar un Tapleaf en el ScriptPath.",
    },
  ],
};

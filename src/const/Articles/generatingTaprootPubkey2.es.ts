import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { GeneratingTaprootPubKey2 as English } from "./generatingTaprootPubkey2";

// Spanish translation of GeneratingTaprootPubKey2.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `module`, `section`, `href`, `shortHandTitle`, `lesson`, `itemType`,
// `isLocked`, `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen`
// identical to the English version (inherited via the spread) so URLs and
// navigation stay stable across locales.

export const GeneratingTaprootPubKey2Es: ArticleViewProps = {
  ...English,
  title: "Generar una PubKey Taproot (Pt. II)",
  description: "Clave interna, ScriptPath y ensamblaje final",
  content: [
    {
      type: "main title",
      content: "Generar una PubKey Taproot (Pt. II)",
    },
    {
      type: "subtitle",
      content: "Clave interna, ScriptPath y ensamblaje final",
    },
    {
      type: "title",
      content: "Repaso de los pasos",
      customClass: "font-bold"
    },
    {
      type: "paragraph",
      content:
        "En nuestro artículo inicial, (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I)) Generar una PubKey Taproot (Pt. I)(linkpage), definimos y nos propusimos construir nuestra salida Taproot del «cofre familiar». A lo largo de ese artículo, conocimos el proceso TagHash y generamos los cuatro TapLeafs que ahora utilizaremos para cada uno de nuestros cuatro posibles caminos de gasto. Con estos TapLeafs completados, se marcó el final de los dos primeros de los cuatro pasos necesarios para generar una salida P2TR | clave Taproot. En este artículo, a modo de recordatorio rápido, cubriremos los dos pasos siguientes de nuestro proceso:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "3. Generar la raíz del ScriptPath",
        },
        {
          type: "numbered-item",
          content: "4. Aplicar el tweak a la clave interna",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "La primera sección que repasaremos aquí, el tercer paso acumulado, trata del proceso de merkilización de nuestros cuatro tapleafs que dará como resultado la raíz del scriptpath; la segunda sección, el cuarto paso acumulado, trata de los dos últimos pasos en los que utilizaremos la clave interna para derivar la clave Taproot (o salida p2tr).",
    },
    {
      type: "paragraph",
      content: "(bold)Generar la raíz del ScriptPath(bold)",
    },
    {
      type: "paragraph",
      content:
        "Como hemos venido afirmando, estos dos artículos son la culminación de muchos prerrequisitos. Para el scriptpath, el tipo de dato fundamental que debes dominar es el árbol de Merkle; si esto te suena aunque sea vagamente desconocido, te sugiero que regreses y leas el artículo enlazado (linkpagehttps://www.bitscript.app/lessons/Merkle%20Tree%20Review)aquí(linkpage) primero. Como recordatorio en dos frases, los árboles de Merkle son una estructura de datos común utilizada específicamente para la eficiencia en la verificación de datos; un árbol de Merkle, que es la mayoría de las veces pero no siempre un árbol binario simétrico, almacena hashes de datos, no los datos en sí (de ahí su ligereza computacional). Una vez creado, la verificación de los datos se realiza a través de un proceso llamado merkle proof — como adelanto, lo utilizaremos al gastar desde el scriptpath.",
      customClass: "-mt-4"
    },
    {
      type: "paragraph",
      content:
        "En cualquier caso, el concepto clave que nos interesa hoy es cómo se (bold)crean(bold) los árboles de Merkle. De nuevo, no lo revisaremos en profundidad aquí, pero, en resumen, este proceso consiste en concatenar y calcular el hash de las hojas, de izquierda a derecha, recorriendo el árbol hacia arriba hasta que queda un único hash (conocido como la (bold)raíz(bold)). Esta es, por supuesto, la forma estándar de crear un árbol de Merkle; sin embargo, como ha podido ver a lo largo de los artículos, el scriptpath siempre introduce alguna particularidad en forma de TagHashing.",
    },
    {
      type: "paragraph",
      content:
        "Nuestra situación, aunque extremadamente simplificada con solo cuatro tapleafs, debería igualmente poner de relieve el proceso central involucrado.",
    },
    {
      type: "paragraph",
      content: "paso repetido (hasta alcanzar la raíz)",
      customClass: "ml-9"
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "1. Ordenar cada par de hashes",
        },
        {
          type: "numbered-item",
          content: "2. Concatenar cada par de hashes",
        },
        {
          type: "numbered-item",
          content: "3. TagHash('TapBranch') cada hash resultante",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Tradicionalmente, un árbol de Merkle se completa una vez que se alcanza la raíz, ya que significa que no quedan más elementos que concatenar ni de los que calcular el hash.",
    },
    {
      type: "paragraph",
      content: "(italics)Orden canónico(italics)",
    },
    {
      type: "paragraph",
      content:
        "Suponiendo que efectivamente estés al día con los árboles de Merkle, ya sabrás que el orden de todo (es decir, las hojas y las ramas) es (bold)crítico(bold): aplicar el hash a las mismas hojas en un orden diferente producirá una raíz totalmente distinta. Así que una buena primera pregunta que vale la pena hacerse, ahora que tenemos nuestros cuatro tapleafs, es: ¿cómo se ordenan canónicamente nuestros cuatro tapleafs y las dos futuras tapbranches?",
      customClass: "-mt-4"
    },
    {
      type: "paragraph",
      content: "(bold)¡Lexicográficamente!(bold)",
    },
    {
      type: "paragraph",
      content:
        "Esto significa que cada tapleaf y tapbranch, dado que son cada uno arreglos de bytes, se comparan byte por byte y se ordenan de forma ascendente. A continuación, podemos ver nuestros cuatro tapleafs ya organizados en orden:",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey 2/Taproot Ordered.png",
      alt: "Taproot Ordered",
    },

    {
      type: "paragraph",
      content:
        "Un punto clave a tener en cuenta es que este proceso de ordenamiento se aplica no solo a los TapLeafs iniciales, sino también en cada nivel de ramas (es decir, a medida que se recorre el árbol hacia arriba); — sin este estándar, es muy probable que los clientes no lograran crear merkle proofs precisas.",
    },
    {
      type: "paragraph",
      content: "TagHash revisitado",
      customClass: "text-xl"
    },
    {
      type: "paragraph",
      content:
        "Al igual que la creación del propio TapLeaf requería un formato particular con la función TagHash, recorrer el árbol de Merkle hacia arriba también requiere un TagHashing particular.",
      customClass: "-mt-4"
    },
    {
      type: "paragraph",
      content:
        "Una vez que los cuatro tapleafs están ordenados, podemos comenzar con el proceso de merkilización propiamente dicho. Nuestro primer paso es, por supuesto, estandarizar los cuatro TapLeafs aplicándoles a todos un SHA256(x). Una vez hecho esto, nos quedan oficialmente nuestras hojas de Merkle y podemos comenzar a remontar el árbol.",
    },
    {
      type: "paragraph",
      content:
        "Como en cualquier proceso de Merkle, trabajamos de izquierda a derecha y, por tanto, comenzamos concatenando H(Spouse) con H(Parents); típicamente, esta concatenación es todo lo que se requiere para construir un árbol; por supuesto, esto es Taproot, así que hay algunas particularidades involucradas. Como ya adelantamos, este paso también implica una forma de TagHashing introducida en el artículo anterior. Como probablemente pueda adivinar, esta vez vamos a implementar el formato TapBranch: TapHash((bold)'TapBranch'(bold)).",
    },
    {
      type: "paragraph",
      content:
        "Teniendo en cuenta los pasos descritos arriba, recorreremos cada paso requerido:",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey 2/TaprootSteps.png",
      alt: "TaprootSteps",
    },
    {
      type: "paragraph",
      content:
        "Siguiendo los pasos anteriores, puedes ver cómo terminamos con un único arreglo de 32 bytes que es el resultado de aplicar TagHashing('TapBranch') a la raíz. Tradicionalmente, esta raíz se considera el último paso en un árbol de Merkle estándar; sin embargo, todavía queda un único paso, o tweak, antes de poder darlo por completado.",
    },
    {
      type: "paragraph",
      content: "(bold)Aplicar el tweak a la clave interna(bold)",
    },
    {
      type: "paragraph",
      content:
        "El cuarto y último paso involucrado en la generación de una clave Taproot consiste en aplicar el tweak a la clave interna con la raíz de Merkle del scriptpath junto con datos adicionales. Desglosémoslo un poco.",
      customClass: "-mt-4"
    },
    {
      type: "paragraph",
      content:
        "En el último (3.º) paso, el enfoque estuvo enteramente en merkilizar el scriptpath hasta que nos quedó una única raíz. Si bien los árboles de Merkle típicamente se completan una vez terminada la raíz, esto no puede decirse del scriptpath. En realidad hay dos pasos aquí, no uno, que vale la pena destacar.",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            '1. TagHash("taptweak") sobre la clave pública interna concatenada con la raíz TapBranch',
        },
        {
          type: "numbered-item",
          content:
            "2. Multiplicar el resultado por G y sumarlo a la clave interna (P)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Profundizaremos en estos dos pasos a continuación; una vez que ambos se realicen con éxito, nos quedará nuestra única clave Taproot de 32 bytes que podremos pegar en una salida P2TR.",
    },
    {
      type: "paragraph",
      content: '(bold)TagHash("TapTweak", Internal Key || CDAB)(bold)',
    },
    {
      type: "paragraph",
      content:
        "El primer paso es ejecutar un último paso TagHash. Esta es la primera y única vez que invocaremos TagHash(\"TapTweak\"). Además, conviene destacar que también concatenamos la clave interna con la raíz del árbol de Merkle / scriptpath — el resultado del último TapBranch. El resultado aquí se conoce comúnmente como el valor del tweak (t).",
      customClass: "-mt-4"
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey 2/TapTweak.png",
      alt: "TapTweak",
    },
    {
      type: "paragraph",
      content: "(bold)Aplicar el tweak a la clave interna (Internal Key + TweakKey*G)(bold)",
    },
    {
      type: "paragraph",
      content:
        'El último paso que debemos dar es ahora aplicar el tweak a nuestra clave interna con el valor de tweak final derivado (t). Una vez más, como mencionamos en el artículo anterior, «aplicar un tweak» puede significar una o una combinación de varias operaciones realizadas sobre nuestra clave pública de 32 bytes. En este caso particular, en nuestro tweak Taproot, realizamos lo siguiente:',
      customClass: "-mt-4"
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey 2/Taproot-4.png",
      alt: "Taproot 4 ",
    },
    {
      type: "paragraph",
      content:
        "Una simple multiplicación del valor del tweak (t) por el punto generador (G), seguida de una suma a la clave interna, es todo lo que se necesita.",
    },
    {
      type: "paragraph",
      content: "(bold)Para concluir(bold)",
    },
    {
      type: "paragraph",
      content:
        'Comenzamos con una clave pública Bitcoin interna de 32 bytes y ahora nos queda una nueva clave pública Taproot de 32 bytes. Como hemos mencionado varias veces, esta clave pública Taproot es, en realidad, literalmente el único elemento requerido en una salida scriptPubKey. Para utilizar nuestra clave pública Taproot, o para «crear una salida P2TR», todo lo que hacemos ahora es construir una salida estándar donde el scriptPubKey incluye un flag SegWit (0x51, que señala Taproot), el tamaño del «script» (0x20, que señala la longitud de la clave, 32 bytes en hexadecimal) y la propia clave.',
      customClass: "-mt-4"
    },
    {
      type: "paragraph",
      content: "(italics)¡Y eso es todo!(italics)",
    },
    {
      type: "paragraph",
      content:
        "Hemos generado por completo una salida P2TR gastable con dos caminos: un key path por clave interna (keypath) y un árbol de Merkle de cuatro caminos de gasto (scriptpath). Esto marca un hito importante en tu comprensión de Taproot; sin embargo, hay una pregunta con la que me gustaría concluir para resaltar lo que queda: ¿cómo se gasta el keypath? Mucho más complicado aún, ¿cómo se gasta uno de los scriptpaths?",
    },
  ],
};

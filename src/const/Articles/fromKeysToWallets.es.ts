import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { FromKeysToWallets as English } from "./fromKeysToWallets";

// Spanish translation of FromKeysToWallets.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `module`, `section`, `href`, `shortHandTitle`, `lesson`, `itemType`,
// `isLocked`, `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen`
// identical to the English version (inherited via the spread) so URLs and
// page structure stay stable across locales.

export const FromKeysToWalletsEs: ArticleViewProps = {
  ...English,
  title: "De las claves a las carteras",
  description: "Fundamentos e historia de los pares de claves de Bitcoin",
  content: [
    {
      type: "main title",
      content: "De las claves a las carteras",
    },
    {
      type: "subtitle",
      content: "Fundamentos e historia de los pares de claves de Bitcoin",
    },
    {
      type: "title",
      content: "(bold)Introducción(bold)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        "En el (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))artículo anterior(linkpage), aprendió sobre los (bold)pares de claves(bold): cómo una clave privada funciona como una contraseña bancaria y una clave pública como un número de cuenta bancaria. Hoy ampliaremos ese concepto abordando el punto de entrada más común para enviar y recibir bitcoins: las (bold) carteras (bold). Como seguramente habrá notado en la vida real, (casi) nunca se envía una clave pública de 33 bytes cuando se desea recibir bitcoins; normalmente se envía una dirección y, más concretamente, una dirección de cartera.",
    },

    {
      type: "image",
      src: "/articles/from keys to wallets/key-schema.png",
      alt: "Key Schema",
    },
    {
      type: "paragraph",
      content:
        "La clave privada (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))genera(linkpage) la clave pública, que a su vez genera (bold)un tipo(bold) de cartera. ¿Qué tipo de cartera? Pues bien, eso es precisamente en lo que nos centraremos hoy. Por desgracia, no es un tema sencillo, como deja entrever la avalancha de jerga: legacy, segwit, taproot, p2pk, p2pkh, p2wpkh, p2sh, etc. Primero proporcionaremos algo de contexto sobre estos términos frecuentemente oídos y a menudo confundidos, y después profundizaremos con más detalle en los formatos de cartera más habituales.",
    },
    {
      type: "paragraph",
      content:
        "Comprender los tipos de cartera puede resultar bastante intimidante a primera vista, pero en realidad, con una excepción, pueden categorizarse mediante dos preguntas de alto nivel:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1.  ¿Dónde se almacenan los datos de la firma?(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)2.  ¿Qué se requiere para gastar el UTXO?(bold)",
        },
      ],
    },
    {
      type: "title",
      content: "(italics) Legacy vs. Witness(italics)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        'Tema que merecería un artículo propio, la ubicación de los datos de la firma categoriza las transacciones, y por tanto las direcciones de cartera, en dos categorías: legacy y witness. En las carteras legacy, los datos que desbloquean un UTXO se denominan comúnmente (bold)ScriptSig(bold) (abreviatura de signature script) y residen en la parte de (linkpagehttps://bitscript.app/lessons/What%20is%20a%20ScriptSig%3F)entrada (linkpage) de una transacción. En las carteras SegWit, los datos que desbloquean un UTXO se denominan comúnmente (linkpagehttps://bitscript.app/lessons/What%20is%20a%20Witness%3F) Witness (linkpage) (un término habitual en criptografía) y residen en una parte (bold)segregada (bold)de la transacción (de ahí la abreviatura "SegWit" de Segregated Witness).',
    },
    {
      type: "paragraph",
      content:
        "Tanto los ScriptSigs como los Witnesses tienen como objetivo desbloquear un UTXO para enviar bitcoins, pero la codificación y, más importante aún, la ubicación de almacenamiento de los datos son diferentes, lo que conduce a tipos de cartera distintos.",
    },
    {
      type: "title",
      content: "(italics)Key vs. Script(italics)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        "Existe un segundo eje de categorización de tipos de cartera basado en la (bold)lógica(bold) requerida en los witnesses o los scriptSigs. A alto nivel, para (linkpagehttps://bitscript.app/lessons/What%20is%20a%20ScriptSig%3F)gastar un UTXO(linkpage), uno puede o no tener que proporcionar contexto o datos adicionales para desbloquearlo. Como se menciona con frecuencia, Bitcoin sí posee cierta forma de contratos inteligentes en forma de Script, un lenguaje de pila de tipo ensamblador utilizado para implementar la lógica de gasto.",
    },
    {
      type: "paragraph",
      content:
        "[Mapa de dos ejes de los tipos de transacción aquí para resumir esta sección]",
    },
    {
      type: "title",
      content: "(bold)Las claves crean carteras(bold)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        "Como vio en una (linkpagehttps://www.bitscript.app/lessons/generating-a-taproot-pubkey-pt-i)lección anterior(linkpage), las carteras de Bitcoin se basan en la (bold)criptografía de curva elíptica(bold), concretamente en la curva (linkpagehttps://www.bitscript.app/lessons/ECDSA%20DER%20Format)secp256k1(linkpage), que genera un par de claves criptográficas: la clave privada y la clave pública. Ya sabe que la clave privada es un entero de 32 bytes, generado aleatoriamente, que le permite firmar transacciones y enviar bitcoins. La clave pública comprimida de 33 bytes se deriva entonces multiplicando la clave privada por un punto generador ((bold)G(bold)); es esta clave, la clave pública, la que utilizaremos luego para generar diferentes tipos de carteras que se adapten a distintos tipos de transacciones.",
    },
    {
      type: "paragraph",
      content:
        "Ahora repasaremos en detalle los tipos de cartera más utilizados, comenzando por el cronológicamente más antiguo y técnicamente más sencillo, y avanzando hasta los tipos de cartera modernos.",
    },
    {
      type: "title",
      content: "(bold)Legacy(bold)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        'Como se ha avanzado más arriba y como sugiere el nombre, las direcciones "Legacy" incluyen los primeros formatos de dirección que se entregaron con Bitcoin Core o se añadieron con bastante rapidez; esto abarca los tipos de transacción (bold)P2PK(bold), (bold)P2PKH(bold) y (bold)P2SH(bold).',
    },
    {
      type: "title",
      content: "(bold)P2PK (Pay-to-Public-Key)(bold)",
      customClass: "mb-3",
    },
    // was here
    {
      type: "paragraph",
      content:
        "El (linkpagehttps://www.bitscript.app/scripts/P2PK)tipo más sencillo y antiguo(linkpage) de transacción y, por tanto, de cartera, un P2PK expone directamente la clave pública en las transacciones, lo que lo hace menos privado y menos eficiente debido a su mayor tamaño. En este esquema, la clave pública se almacena directamente en el script de salida de la transacción, normalmente utilizando un opcode como (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)OP_CHECKSIG(linkpage). Es menos privado porque la clave pública completa queda expuesta a la blockchain antes de ser gastada. También es menos eficiente en espacio, ya que la clave pública suele ocupar 65 bytes (en forma no comprimida) o 33 bytes (en forma comprimida). Un ejemplo de 2010 es (linkpagehttps://mempool.space/address/04cd31654088e472c60ab1c6ee7743deb186dce0b1ad5fc45691d37dad2620128e4b33c7c9c19ed01a5817e6e54c12fe1b83eafcb830440f23a2ce903cdb1df52f)04cd31654088e472c60ab1c6ee7743deb186dce0b1ad5fc45691d37dad2620128e4b33\
        c7c9c19ed01a5817e6e54c12fe1b83eafcb830440f23a2ce903cdb1df52f(linkpage).",
    },
    {
      type: "title",
      content: "(bold)P2PKH (Pay-to-Public-Key-Hash)(bold)",
      customClass: "mb-3",
    },
    {
      type: "paragraph",
      content:
        "P2PKH mejora las limitaciones de P2PK almacenando un hash de la clave pública —no la clave en sí— en el script de salida de la transacción. Solo cuando se gasta la transacción se revela la clave pública real. Esto no solo reduce el tamaño de la transacción y mejora la privacidad, sino que también proporciona una capa adicional de seguridad, ya que romper una función hash es más difícil que simplemente leer una clave pública. Los (linkpagehttps://www.bitscript.app/scripts/P2PKH)scripts P2PKH(linkpage) suelen usar un patrón de opcodes como (linkpagehttps://www.bitscript.app/OPS/OP_DUP)OP_DUP(linkpage) (linkpagehttps://www.bitscript.app/OPS/OP_HASH160)OP_HASH160(linkpage) (keys)&lt;PubKeyHash&gt(keys) (linkpagehttps://www.bitscript.app/OPS/OP_EQUALVERIFY)OP_EQUALVERIFY(linkpage) (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)OP_CHECKSIG(linkpage). Las direcciones comienzan por (bold)'1'(bold), por ejemplo, (linkpagehttps://mempool.space/address/18BZyzJtETfcPzKFoHRT1dawziE4yUh96X)18BZyzJtETfcPzKFoHRT1dawziE4yUh96X.(linkpage)",
    },
    {
      type: "paragraph",
      content: "Para generar una dirección P2PKH, siga estos pasos:",
    },
    {
      type: "list",
      //TODO: Make the text to be green for the public, currently all the text here is in bold for the public keys
      // TODO: add spacing for list items
      content: [
        {
          type: "numbered-item",
          content:
            "1.(bold) Generar la clave pública: (bold) Cree su clave pública no comprimida de 65 bytes (keys)04b0bd634234abbb1ba1e986e884185c1b9e5d3a34e0dfee38c4474a49ca3bf22\
            162c6e55773ce8d9f0b60e5a8b9c56d5b5efc96e2384f7c9d33c1e7e4109db9e7(keys).",
        },
        {
          type: "numbered-item",
          content:
            "2 (bold) Calcular el hash (linkpagehttps://www.bitscript.app/hashCalculator)SHA256(linkpage) (bold): Calcule el hash de esta clave pública con SHA256 (keys)SHA256(04b0bd634234abbb1ba1e986e884185c1b9e5d3a34e0dfee38c447\
            4a49ca3bf22162c6e55773ce8d9f0b60e5a8b9c56d5b5efc96e2384f7c9d33c1e7e4109db9e7)(keys) = (keys)44f8c0d9503a31cf59bc70c070dea3bfc2bd717bc8481f8980c9dc516a662a59(keys)",
        },
        {
          type: "numbered-item",
          content:
            "3. (bold) Calcular el hash (linkpagehttps://www.bitscript.app/hashCalculator) RIPEMD160 (linkpage) (bold): Calcule el hash del resultado con RIPEMD160 para obtener un hash de 20 bytes (keys)RIPEMD160(44f8c0d9503a31cf59bc\
            70c070dea3bfc2bd717bc8481f8980c9dc516a662a59)(keys) = (keys)010966776006953D5567439E5E39F86A0D273BEE(keys)",
        },
        {
          type: "numbered-item",
          content:
            " 4. (bold) Añadir el byte de versión (bold): Anteponga el byte de versión 0x00 para una dirección de Bitcoin mainnet: (keys)00 + 010966776006953D5567439E5E39F86A0D273BEE = 00010966776006953D5567439E5E39F86A0D273BEE (keys)",
        },
        {
          type: "numbered-item",
          content:
            "5. (bold) Calcular la suma de verificación (bold): Calcule la suma de verificación tomando los primeros 4 bytes del doble hash SHA-256 del hash versionado (keys)SHA256(SHA256(00010966776006953D5567439E5E39F86A0D273BEE))(keys) = (keys)FFD1F1D25C63F3C7815D05CBFABE62E8CC5875C9DDFE95B9C60F243BEEB72F5D(keys)",
        },
        {
          type: "paragraph",
          content:
            "La suma de verificación corresponde a los primeros 4 bytes: (keys)FF D1 F1 D2(keys) (cada par hexadecimal representa 1 byte).",
        },
        {
          type: "numbered-item",
          content:
            "6. (bold) Codificar en Base58Check (bold): Por último, codifique el PubKeyHash versionado concatenado con la suma de verificación en Base58Check: (keys)00010966776006953D5567439E5E39F86A0D273BEEFFD1F1D2(keys).",
        },
        {
          type: "paragraph",
          content:
            "Una vez codificado en Base58Check, esto se convierte en la dirección P2PKH: (keys)16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM(keys)",
        },
      ],
    },
    {
      type: "paragraph",
      content: "(bold)P2SH (Pay-to-Script-Hash)(bold)",
    },
    {
      type: "paragraph",
      content:
        "P2SH, definido en (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)BIP16(linkpage), habilita (linkpagehttps://www.bitscript.app/scripts/P2SH)scripts de transacción más flexibles(linkpage) al permitir el envío de fondos al hash de un script, llamado redeem script, en lugar de directamente a un hash de clave pública como hemos visto con P2PKH. Esta característica hace que Bitcoin sea más versátil, ya que admite condiciones de gasto más complejas, tales como multisig, bloqueos temporales o cualquier condición arbitraria que pueda definirse en el script. Las direcciones P2SH comienzan por (bold)'3'(bold), como (linkpagehttps://mempool.space/address/3CswTd6V8V2uv24P9yWHpPnFiLfN4CABgW)3CswTd6V8V2uv24P9yWHpPnFiLfN4CABgW(linkpage).",
    },
    {
      type: "title",
      content: "SegWit",
      customClass: "font-bold mb-4",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "SegWit, abreviatura de (bold)Segregated Witness(bold), introducido en (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)BIP141(linkpage), fue una actualización importante orientada a reducir el tamaño de las transacciones y aumentar la escalabilidad. SegWit funciona desplazando los datos de witness —firmas y otros datos específicos de la transacción— fuera del bloque principal, lo que permite que más transacciones quepan en un bloque.",
    },
    {
      type: "title",
      content: "P2WPKH (Pay-to-Witness-Public-Key-Hash)",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "P2WPKH es un formato SegWit nativo (denominado (italics)(bold)SegWit v0(bold)(italics)) con direcciones (bold)bech32(bold). Estas direcciones utilizan una parte legible por el ser humano, que para Bitcoin es (keys)bc(keys), seguida del separador (keys)1(keys) y luego la parte de datos que incluye la versión del witness ((italics)v0 para P2WPKH(italics)) y el hash de la clave pública de 20 bytes.",
    },
    {
      type: "paragraph",
      content:
        "Las direcciones P2WPKH se derivan de forma similar a las direcciones P2PKH. El hash resultante se codifica entonces en el formato (bold)bech32(bold), que difiere del (bold)Base58Check(bold) que hemos visto en P2PKH. El script utilizado para bloquear los fondos integrado en el script de salida, llamado witness program en SegWit (equivalente al (italics)scriptPubKey(italics) en P2PKH), también es diferente del de P2PKH:",
    },
    {
      type: "list",
      content: [
        {
          type: "bullet-item",
          content:
            "En P2PKH, el script de bloqueo sigue el formato: (linkpagehttps://www.bitscript.app/OPS/OP_DUP)OP_DUP(linkpage) (linkpagehttps://www.bitscript.app/OPS/OP_HASH160)OP_HASH160(linkpage) (keys)&ltPubKeyHash&gt(keys) (linkpagehttps://www.bitscript.app/OPS/OP_EQUALVERIFY)OP_EQUALVERIFY(linkpage) (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)OP_CHECKSIG(linkpage).",
        },
        {
          type: "bullet-item",
          content:
            "En P2WPKH, el script del witness program es simplemente (keys)0(keys) (keys)&ltPubKeyHash&gt (keys), donde (keys)0(keys) representa la versión SegWit, seguida del hash de la clave pública de 20 bytes. Para Taproot, la versión SegWit sería (keys)1(keys), como veremos justo a continuación.",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "En una transacción P2WPKH, la firma y la clave pública se almacenan en el campo de datos del witness en lugar de en el cuerpo principal de la transacción. Esta (linkpagehttps://www.bitscript.app/lessons/Formatting%20Witness%20Script)separación(linkpage) reduce los datos no-witness, que cuentan en su totalidad para el tamaño del bloque, y desplaza los datos de witness más voluminosos a la sección witness, que solo se contabiliza con un peso reducido (1 byte = 1 (bold)unidad de peso(bold) en lugar de 4 unidades de peso para los datos no-witness). Dado que el script de desbloqueo o witness no se incluye en el cuerpo principal de la transacción en SegWit, el tamaño de la transacción se reduce significativamente.",
    },
    {
      type: "paragraph",
      content:
        "Las transacciones P2WPKH son más pequeñas que las transacciones legacy P2PKH e incluso que las P2SH-P2WPKH debido a la ausencia del redeem script en la sección witness, lo que se traduce en comisiones más bajas:",
    },
    {
      type: "list",
      content: [
        {
          type: "bullet-item",
          content:
            "(bold)Transacción P2PKH: (bold) Una entrada típica requiere 148 bytes.",
        },
        {
          type: "bullet-item",
          content:
            "(bold)Transacción P2WPKH: (bold) La entrada equivalente solo requiere alrededor de 68 bytes en un bloque, es decir, una reducción enorme de aproximadamente el 58 %.",
        },
      ],
    },
    {
      type: "title",
      content:
        "P2SH-P2WPKH (Pay-to-Script-Hash with Pay-to-Witness-Public-Key-Hash)",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "El (bold)SegWit anidado (P2SH-P2WPKH)(bold), también conocido como (italics)Wrapped SegWit(italics), es retrocompatible y le permite aprovechar SegWit incluso si utiliza una cartera legacy.",
    },
    {
      type: "paragraph",
      content:
        'Las carteras legacy solo comprenden transacciones P2SH, por lo que el P2WPKH se "envuelve" dentro de un script P2SH. La dirección comienza por un (bold)3(bold), lo que indica una dirección P2SH. Las carteras legacy pueden reconocer este formato e interactuar con él.',
    },
    {
      type: "paragraph",
      content:
        "Para las transacciones P2SH, el scriptSig contiene el (bold)redeem script(bold). En este caso, el redeem script es el (bold)script SegWit(bold), que contiene un hash de la clave pública. El redeem script en P2SH-P2WPKH tiene el formato: (keys)0 &ltPubKeyHash&gt (keys). Esto es lo que se coloca en el scriptSig, lo que permite a las carteras legacy gestionar la transacción como si fuera una transacción P2SH normal, sin saber que involucra SegWit.",
    },
    {
      type: "paragraph",
      content:
        "Los datos de (linkpagehttps://www.bitscript.app/lessons/Formatting%20Witness%20Script)witness(linkpage) reales (firma y clave pública) se almacenan en el campo witness, que es una parte separada de la transacción. Las carteras legacy ignoran estos datos de witness porque no los comprenden. Sin embargo, los nodos compatibles con SegWit los utilizarán para validar la transacción de una forma más eficiente.",
    },
    {
      type: "title",
      content: "P2WSH (Pay-to-Witness-Script-Hash)",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "El (bold)P2WSH(bold) es la versión SegWit de P2SH. Al igual que P2SH, P2WSH permite scripts complejos, como configuraciones multisig y transacciones con bloqueo temporal, pero con mayor eficiencia y al mismo tiempo aborda la maleabilidad de las transacciones en los scripts legacy. Las direcciones P2WSH comienzan por (bold)bc1q(bold) y también se conocen como (bold)direcciones Bech32(bold), que son más fáciles de usar gracias a una mejor legibilidad y detección de errores.",
    },
    {
      type: "paragraph",
      content:
        "En P2WSH, se calcula el hash del script de bloqueo utilizando únicamente (linkpagehttps://www.bitscript.app/hashCalculator)SHA256(linkpage), lo que produce un hash de 32 bytes, haciéndolo más resistente a las colisiones de hash en comparación con P2SH, que utiliza un proceso de doble hashing ((linkpagehttps://www.bitscript.app/hashCalculator)RIPEMD-160(linkpage) de SHA256) y da como resultado un hash más pequeño, de 20 bytes.",
    },
    {
      type: "paragraph",
      content:
        "En lugar de colocar los datos de desbloqueo en el (linkpagehttps://www.bitscript.app/lessons/Formatting%20Witness%20Script)scriptSig(linkpage) (como ocurre con las transacciones legacy), las transacciones P2WSH utilizan el campo witness, al igual que P2PKH. Al gastar desde una dirección P2WSH, el campo witness contiene el script (que coincide con el hash SHA256 almacenado en el scriptPubKey) y los datos necesarios para satisfacer el script (firmas y claves públicas).",
    },
    {
      type: "title",
      content: "P2TR (Pay-to-Taproot)",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "Comprender (linkpagehttps://www.bitscript.app/lessons/Why%20Taproot)Taproot(linkpage) —también denominado SegWit v1— puede ser bastante complejo, dada la terminología específica como \"(linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))clave taproot(linkpage)\" y los nuevos detalles técnicos implicados. En esencia, Taproot, introducido mediante (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)BIP341(linkpage), es una actualización significativa del sistema de transacciones de Bitcoin, que se apoya en el marco P2WSH. Mejora las capacidades de scripting y firma de Bitcoin mediante la integración de las firmas Schnorr y los árboles de sintaxis abstracta merkelizados (MAST). En cuanto a las direcciones, Taproot utiliza un nuevo formato que comienza por (keys)bc1p(keys), aprovechando la codificación Bech32m.",
    },
    {
      type: "paragraph",
      content:
        "Para desglosarlo: las (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))direcciones P2TR(linkpage) y las carteras se basan en las (bold)firmas Schnorr(bold), un esquema criptográfico más reciente que permite combinar o agregar varias firmas en una sola. Esto significa que las transacciones que requieren múltiples participantes ahora parecen provenir de un único firmante, lo que reduce su tamaño y mejora la eficiencia. Las firmas Schnorr también refuerzan la seguridad al ofrecer garantías más sólidas que las antiguas firmas ECDSA.",
    },
    {
      type: "paragraph",
      content:
        "Además, Taproot incorpora (bold)MAST(bold), que (linkpagehttps://www.bitscript.app/lessons/Why%20Taproot)estructura los scripts complejos(linkpage) mediante una forma especial de estructura de datos, el (linkpagehttps://www.bitscript.app/lessons/Merkle%20Tree%20Review) árbol de Merkle (linkpage). Esta organización permite revelar únicamente las partes relevantes de un script Taproot durante el gasto —un scriptPath— en lugar de exponer el script completo. Esta característica mejora significativamente la privacidad y la eficiencia al mantener ocultos los detalles de las condiciones de gasto complejas de un (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))TapLeaf(linkpage) a menos que sean necesarios.",
    },
    {
      type: "title",
      content: "Para terminar",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "¡Y con esto cerramos! Las carteras de Bitcoin han evolucionado desde sencillos formatos legacy hasta tipos de script más complejos como (italics)SegWit(italics) y (italics)Taproot(italics). Las carteras legacy utilizaban directamente las claves públicas, mientras que (italics)SegWit(italics) mejoró la eficiencia al separar los datos de witness. El SegWit anidado mantuvo la compatibilidad con las carteras más antiguas integrando SegWit dentro de scripts P2SH, y ahora (italics)P2WSH(italics) ha mejorado la eficiencia para scripts complejos, mientras que Taproot combinó las firmas Schnorr y MAST para una privacidad y eficiencia aún mayores. Conviene señalar que, a pesar de la variedad de formatos de clave y codificaciones entre estos tipos de cartera, todos derivan en última instancia de la misma (bold)seed(bold). Exploraremos cómo se realiza la (italics)(bold)copia de seguridad(bold)(italics) de esa seed en nuestro próximo artículo.",
    },

    // ... Continue with the rest of the content, following the same structure
  ],
};

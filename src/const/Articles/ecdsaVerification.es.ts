import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ECDSAVerification as English } from "./ecdsaVerification";

// Spanish translation of ECDSAVerification.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `href`, `shortHandTitle`, `lesson`, `itemType`, `isLocked`,
// `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen` identical
// to the English version (inherited via the spread) so URLs stay stable
// across locales.

export const ECDSAVerificationEs: ArticleViewProps = {
  ...English,
  title: "Verificación ECDSA",
  description:
    "Aprenda los fundamentos de la verificación ECDSA para firmas digitales.",
  content: [
    {
      type: "main title",
      content: "Verificación ECDSA",
    },
    {
      type: "title",
      content: "Qué significa proporcionar una firma digital válida",
    },
    {
      type: "paragraph",
      content: "(bold)Introducción(bold)",
    },
    {
      type: "paragraph",
      content:
        "Anteriormente hemos destacado la importancia de las firmas digitales dentro de Bitcoin: son posiblemente la primitiva criptográfica más fundamental con la que te encontrarás. Son el mecanismo único responsable de demostrar que un usuario recibió previamente una salida de transacción no gastada (UTXO) desbloqueable mediante su clave pública.",
    },
    {
      type: "paragraph",
      content:
        "Recuerda el artículo anterior que trataba sobre la (linkpagehttps://www.bitscript.app/lessons/ECDSA%20Generation)Generación ECDSA(linkpage); allí explicamos que una firma ECDSA se genera a partir de una clave aleatoria, una clave de firma y un mensaje, que en nuestro caso es una transacción Bitcoin con un formato específico. Esta firma digital se inserta posteriormente en el campo sigscript / unlockscript / witness para una entrada específica que apunta a una salida de transacción no gastada (UTXO) recibida previamente; la idea, por supuesto, es que la firma digital confirme criptográficamente el mensaje (el monto de Bitcoin) así como la identidad del firmante (el destinatario). ",
    },
    {
      type: "paragraph",
      content:
        "En resumen, nos centramos en cómo se (italics)genera(italics) la firma; pero, una vez insertada en el script y procesada por un nodo, ¿cómo funciona la (italics)(bold)verificación(bold)(italics)? En otras palabras, ¿cómo verifica el propio Bitcoin que una firma digital es válida? La magia, según resulta, ocurre mediante un op_code muy específico y común; de hecho, si observas (italics)la mayoría(italics) de los sigscripts/unlockscripts de entrada legacy, casi siempre verás que el último opcode en un pubkeyscript / lockscript es una variante de (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)op_checksig(linkpage); que, comprensiblemente, significa «check signature» (verificar firma), un ejemplo de esto se encuentra en una (linkpagehttps://www.bitscript.app/transactions?transaction=c9d4d95c4706fbd49bdc681d0c246cb6097830d9a4abfa4680117af706a2a5a0&env=MAINNET)transacción P2PKH(linkpage) que se muestra a continuación:",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Hoy, ese es el enfoque: comprender conceptualmente cómo se (italics)verifica(italics) una firma o, en otras palabras, cómo funciona OP_CHECKSIG por debajo. En lugar de comenzar con una clave aleatoria, una clave de firma y un mensaje para (italics)generar(italics) una firma, esta vez, siempre que pretendamos (italics)verificar(italics) criptográficamente un mensaje firmado también necesitamos tres cosas: (bold)la firma, la clave pública de firma y el mensaje con hash.(bold)",
    },
    {
      type: "paragraph",
      content:
        "Profundicemos un poco aquí antes de introducir la fórmula principal de verificación, desglosando los requisitos mencionados en lenguaje sencillo:",
    },

    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. La clave *pública* de firma, P, autentica que (bold)(italics)solo(italics)(bold) el firmante con acceso a la clave (bold)(italics)privada(italics)(bold) de firma podría haber generado / firmado esta firma",
        },
        {
          type: "numbered-item",
          content:
            "2. El *mensaje con hash*, h(m), por supuesto verifica que el mensaje real produce (bold)(italics)exactamente el mismo arreglo de 32 bytes(italics)(bold) proporcionado durante la generación (es decir, ni un solo byte se altera en el monto de Bitcoin transferido)",
        },
        {
          type: "numbered-item",
          content:
            "3. La *firma* (r,s) verifica que el firmante tiene conocimiento de la clave privada aleatoria (k), que, aunque nunca se revele completamente, sugiere estadísticamente que el firmante estuvo al menos presente durante la generación",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Todas estas variables se utilizan en la fórmula de verificación de firma digital que se muestra a continuación:",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Tenemos una idea de lo que significa cada variable anterior, ahora veamos qué logra exactamente la fórmula en su conjunto. En el artículo anterior sobre la (linkpagehttps://www.bitscript.app/lessons/ECDSA%20Generation)Generación(linkpage), la fórmula que presentamos resolvía una variable «(bold)s(bold)», que nos proporcionaba el (italics)segundo(italics) y último valor de nuestra firma (r,s); recuerde que «(bold)r(bold)» es simplemente la coordenada x de un par de claves público aleatorio (kG). ",
    },
    {
      type: "paragraph",
      content:
        "Esta vez, cuando verificamos, (bold)(italics)intentamos recrear la clave pública aleatoria (kG) para luego comparar la coordenada x con «r»(italics)(bold); si las coordenadas x son iguales, esto significa que efectivamente recreamos la clave pública aleatoria correcta, lo cual (italics)solo fue posible(italics) proporcionando el par de claves de firma correcto, la clave aleatoria correcta y el mensaje con hash exacto. Para verificar esta firma, primero deberemos calcular el inverso multiplicativo de «S».",
    },
    {
      type: "paragraph",
      content: "(italics)Cálculo del inverso modular de «S»(italics)",
    },
    {
      type: "paragraph",
      content:
        "Lo primero que notarás es que la fórmula de verificación menciona de forma prominente el inverso de «(bold)s(bold)» dos veces. En caso de que no esté claro, la «r» y la «s» vistas arriba son los dos valores que juntos conforman la «firma» (aunque a menudo se presentan en formato DER, no como un par de escalares). Como se explicó en el artículo sobre la Generación, la aritmética modular sobre una curva elíptica es directa pero en absoluto «sencilla». ",
    },
    {
      type: "paragraph",
      content:
        "Existen dos fórmulas distintas comúnmente utilizadas para calcular el inverso multiplicativo sobre un cuerpo finito primo (es decir, la (italics)división(italics) modular); una es más generalizada y existe desde hace prácticamente siempre (el algoritmo de Euclides extendido), mientras que el otro método funciona estrictamente bajo el supuesto de que el operador de módulo es (italics)primo(italics). A continuación se muestra un resumen de ambos, seguido de una tabla que los compara:",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "El algoritmo de Euclides extendido (EEA) es un método de propósito general que funciona para (italics)cualquier(italics) par de enteros y cualquier módulo ((italics)incluidos los no primos(italics)). Como su nombre sugiere, es un antiguo proceso paso a paso que encuentra el máximo común divisor (MCD) de dos números y calcula simultáneamente los coeficientes que expresan el MCD como una combinación lineal de los números originales. En el contexto de encontrar el inverso de «S» para firmas digitales, el EEA puede utilizarse independientemente del módulo (primo o no), pero puede volverse extremadamente costoso computacionalmente para números grandes (lo que lo hace poco práctico para la mayoría de las operaciones sobre curvas elípticas).",
    },
    {
      type: "paragraph",
      content:
        "Por otro lado, el pequeño teorema de Fermat ofrece una solución más rápida y sencilla en comparación con el EEA, pero conlleva limitaciones. (italics)(bold)Solo(bold)(italics) funciona bajo condiciones específicas, como que el módulo (m) debe ser un número primo, y el número base (s) y el módulo (m) deben ser primos entre sí (no compartir ningún factor común aparte de 1). Si se cumplen estas condiciones, el pequeño teorema de Fermat establece que elevar «(bold)s(bold)» a la potencia m-1 y tomar el módulo de m dará como resultado 1, lo que nos permite calcular eficientemente el inverso de «s» módulo m. Sin embargo, si no se cumplen las condiciones, este método no puede utilizarse. Dado que toda la aritmética realizada en una firma ECDSA de Bitcoin se efectúa sobre la curva secp256k1, sabemos que podemos utilizar el pequeño teorema de Fermat con seguridad.",
    },
    {
      type: "paragraph",
      content:
        "Para mayor claridad sobre cómo se utiliza exactamente cada uno de estos algoritmos para encontrar el inverso multiplicativo mediante aritmética modular, publicaremos próximamente artículos sobre cada uno de estos algoritmos (algoritmo de Euclides extendido | pequeño teorema de Fermat).",
    },
    {
      type: "paragraph",
      content: "(italics)Verificación de la firma(italics)",
    },
    {
      type: "paragraph",
      content:
        "Aparte del inverso de «s», las variables restantes son directas y deberían estar fácilmente disponibles. Vemos que debemos proporcionar una vez más el mensaje con hash h(m); lo cual tiene sentido, ya que este es precisamente el mensaje cuya firma estamos verificando. También tenemos que proporcionar «r», que simplemente proviene de la firma. ",
    },
    {
      type: "paragraph",
      content:
        "Identificar e insertar estos valores es sencillo; desafortunadamente, ejecutar realmente estas operaciones es todo menos sencillo; sin embargo, suponiendo que insertemos y calculemos todo correctamente, completaríamos nuestra fórmula de verificación, que, nuevamente, nos proporciona (italics)alguna clave pública(italics). Se supone que esta clave pública es la (bold)(italics)clave pública aleatoria(italics)(bold) (kG) que utilizamos durante la fase de Generación. (italics)«Verificar» simplemente significa comprobar si la coordenada x de esta clave pública derivada coincide con la «r» encontrada en la firma proporcionada(italics). (bold)Si coincide, entonces la firma digital se considera verificada(bold).",
    },
    {
      type: "paragraph",
      content:
        "(italics)Pero ¿qué tiene que ver esto con Bitcoin de nuevo?(italics)",
    },
    {
      type: "paragraph",
      content:
        "Excelente pregunta. Para conectarlo todo, puede ser útil enunciar el vocabulario común de Bitcoin y reformularlo con afirmaciones aparentemente obtusas pero técnicamente más precisas:",
    },
    {
      type: "paragraph",
      content: "(italics)de(italics)",
    },
    {
      type: "paragraph",
      content: "«Recibir Bitcoin es transferir de una billetera a otra»",
    },
    {
      type: "paragraph",
      content: "(italics)a(italics)",
    },
    {
      type: "paragraph",
      content:
        "«Recibir Bitcoin significa que se genera un UTXO con cierta cantidad fija de sats y un candado criptográfico que (normalmente) incluye una clave pública con hash»",
    },
    {
      type: "paragraph",
      content: "(italics)de(italics)",
    },
    {
      type: "paragraph",
      content:
        "«Gastar Bitcoin recibido significa transferir de una billetera a otra»",
    },
    {
      type: "paragraph",
      content: "(italics)a(italics)",
    },
    {
      type: "paragraph",
      content:
        "«Gastar Bitcoin recibido significa proporcionar una firma digital verificable con el par de claves cuya clave pública coincide con la clave pública con hash encontrada en el pubkeyscript/lockscript»",
    },
    {
      type: "paragraph",
      content:
        "Por razones obvias, el matiz anterior suele pasarse por alto cuando se discute la mecánica de Bitcoin; pero, con suerte, con los ejemplos anteriores, los detalles empiezan a encajar. Para que las transacciones correctamente formateadas y confirmadas puedan gastarse, se requiere una firma digital por parte del gastador previsto: por eso a veces se hace referencia al gasto de Bitcoin como (italics)firmar(italics) el UTXO. Porque, en resumen, para gastar una salida de transacción no gastada, debes demostrar criptográficamente que eres el destinatario previsto.",
    },
    {
      type: "paragraph",
      content:
        "¿Cómo se demuestra eso? Proporcionando una firma digital que efectivamente confirme el mensaje (el monto de Bitcoin gastable en el UTXO) así como el firmante (la clave pública coincide con la clave pública con hash encontrada en el sigscript/lockscript del UTXO).",
    },
    {
      type: "paragraph",
      content:
        "Para los inclinados a las matemáticas que anhelan el (italics)porqué(italics), a continuación podemos ver que mediante el simple uso del álgebra, podemos partir de la fórmula de Generación encontrada en el artículo sobre la Generación ECDSA y de la fórmula de Verificación ECDSA presentada aquí para llegar a la fórmula de una clave pública sobre una curva elíptica (P = eG):",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-4.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Y con esto concluimos nuestro recorrido aprendiendo los fundamentos mismos del proceso de firma ECDSA legacy. Mientras que antes exploramos cómo se genera una firma, esta vez conectamos cómo la firma se verifica finalmente on-chain; específicamente, echamos un vistazo bajo el capó del op_code legacy más común, op_checksig, para comprender cómo una firma digital es el componente clave para gastar una salida de transacción no gastada (UTXO) de Bitcoin. ",
    },
  ],
};

import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ECDSAGeneration as English } from "./ECDSAGeneration";

// Spanish translation of ECDSAGeneration.
//
// Pattern: spread the English article, then override the translated fields.
// Inherited (kept identical via spread): href, shortHandTitle, lesson,
// itemType, isLocked, published, googleLinkBigScreen, googleLinkSmallScreen.

export const ECDSAGenerationEs: ArticleViewProps = {
  ...English,
  title: "Generación ECDSA",
  description:
    "Aprenda los conceptos básicos de la generación ECDSA para firmas digitales, centrándose en el proceso de creación de una firma digital criptográfica para transacciones de Bitcoin.",
  content: [
    {
      type: "main title",
      content: "Generación ECDSA",
    },
    {
      type: "title",
      content: "Probar la propiedad de un mensaje firmado",
    },
    {
      type: "paragraph",
      content: "(bold)Introducción(bold)",
    },
    {
      type: "paragraph",
      content:
        "Se ha dicho a menudo que la blockchain no es más que una lista enlazada de firmas digitales. En cierto modo, esto es cierto, ya que las firmas digitales son sin duda el núcleo de la criptografía que sustenta Bitcoin; estas firmas digitales sirven como herramientas de verificación, permitiendo a los nodos autenticar la recepción de Bitcoin en transacciones anteriores. Esta autenticación se asegura mediante un cerrojo digital único, accesible únicamente por una clave pública específica y una transacción con un formato específico. ",
    },
    {
      type: "paragraph",
      content:
        "Las firmas digitales son particularmente poderosas y omnipresentes en criptografía por muchas razones, entre las cuales destacan las tres siguientes:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. La asimetría que proporcionan los pares de claves privadas y públicas",
        },
        {
          type: "numbered-item",
          content: "2. La comunicación que proporciona el mensaje hasheado",
        },
        {
          type: "numbered-item",
          content:
            "3. La resistencia a colisiones que proporciona la aleatorización",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Esperamos que estos términos le resulten al menos vagamente familiares, ya que es difícil apreciar el entusiasmo en torno a las firmas digitales sin ellos. En resumen, a nosotros (los Bitcoiners) nos importan las firmas digitales porque es la forma en que Bitcoin se transfiere realmente de un usuario a otro. De manera más precisa técnicamente, las firmas digitales son la forma en que las claves públicas verifican y desbloquean criptográficamente Bitcoin en UTXO recibidos previamente. ",
    },
    {
      type: "paragraph",
      content:
        "En las aplicaciones más comunes de las firmas digitales, el mensaje hasheado es típicamente algún mensaje oculto destinado a servir como credencial, como una dirección IP durante un handshake SSL; sin embargo, en Bitcoin, el mensaje hasheado es una versión formateada de la transacción que se está firmando.",
    },
    {
      type: "paragraph",
      content:
        "A pesar de su importancia, las firmas digitales (italics)rara vez(italics) se enseñan o discuten debido a la enorme complejidad (léase: matemáticas) que implican. Hoy vamos a hacer precisamente eso: continuar construyendo las bases para una comprensión fundamental tanto de las claves como de las firmas. Específicamente, vamos a centrarnos en el uso práctico de generar una firma digital ECDSA; artículos previos (o artículos que se publicarán próximamente*) cubren los conceptos matemáticos que subyacen a las firmas, como los cuerpos finitos, la aritmética modular, el problema del logaritmo discreto y las curvas elípticas.",
    },
    {
      type: "title",
      content: "Algoritmo de generación ECDSA",
    },
    {
      type: "paragraph",
      content:
        "En esencia, una firma digital cumple dos funciones fundamentales: la generación y la verificación. Mientras que esta última confirma la autenticidad de una firma, aquí nos centramos en la primera: el intrincado proceso de generar una firma digital.",
    },
    {
      type: "paragraph",
      content:
        "El propósito de una firma digital (italics)es crear una huella digital verificable pero no replicable (la firma) que certifique que el propietario de un par de claves privada y pública firmó algún mensaje (en nuestro caso, una transacción de Bitcoin formateada de manera específica)(italics). ",
    },
    {
      type: "paragraph",
      content:
        "A partir de esta sencilla definición podemos comenzar a extraer todas las entradas necesarias para generar una firma: un par de claves de firma (privada/pública) y un mensaje. Sin embargo, si examinamos la definición más de cerca, mencionamos (italics)“no replicable”(italics) como propiedad deseada, lo que implica alguna fuente de entropía, o (italics)aleatoriedad(italics). Esto significa que en realidad necesitamos un total de tres elementos: (bold)mensaje, par de claves de firma y par de claves (italics)aleatorio(italics)(bold). A continuación, presentaremos la fórmula de generación ECDSA, que utiliza estos tres elementos para crear una firma digital en formato de par de coordenadas (r,s) o en formato DER:",
    },
    {
      type: "image",
      src: "/articles/ECDSA/ecdsaGeneration.svg",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Claramente, lo anterior requiere más de tres variables; sin embargo, como veremos, es posible derivar cada una de las variables necesarias partiendo de solo tres elementos; estos pasos, en los que derivamos todo lo que necesitaremos, junto con la fórmula anterior y el estándar de formato que definiremos más adelante, se conocen colectivamente como el algoritmo de generación ECDSA:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Generar un par de claves aleatorio(bold) (comenzar con k, derivar kG, r y k-1)",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)Proporcionar un par de claves de firma(bold) (comenzar con e, derivar eG)",
        },
        {
          type: "numbered-item",
          content:
            "3. (bold)Proporcionar un mensaje pre-hasheado(bold) (m, derivar H(m))",
        },
        {
          type: "numbered-item",
          content: "4. (bold)Insertar en la función anterior(bold)",
        },
        {
          type: "numbered-item",
          content: "5. (bold)Formatear según los estándares DER(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Con estos cinco pasos uno debería poder generar una firma digital criptográficamente verificable; ahora vamos a profundizar en cada paso en detalle a continuación:",
    },
    {
      type: "paragraph",
      content:
        "(bold)1. Generar una clave aleatoria/efímera(bold) (comenzar con k, derivar kG, r y k-1)",
    },
    {
      type: "paragraph",
      content:
        "Como puede ver arriba, cuatro valores distintos de la fórmula de generación se derivan en realidad de este único valor inicial: una clave privada aleatoria (k). La primera parte de la creación de una firma digital consiste en introducir entropía (aleatorización) utilizando un aleatorizador probado para crear una clave privada de 32 bytes | 64 caracteres (comúnmente denominada “(bold)k(bold)”). Al igual que la clave privada de firma, es *crítico* que la clave privada aleatoria (k) se mantenga en secreto, porque sin esta aleatorización resulta más fácil —no fácil*, pero sí más fácil— hacer ingeniería inversa de una clave privada a partir de una firma.",
    },
    {
      type: "paragraph",
      content:
        "Como veremos más adelante, la firma final se compone en realidad de dos partes, o valores, distintos, conocidos como (bold)(r,s)(bold). (bold)S(bold) es lo que realmente resolvemos con la gran fórmula resaltada arriba (es decir, el algoritmo de generación); el segundo valor, r, proviene de la clave privada aleatoria (k). De hecho, (italics)(bold)r(bold) es la (bold)coordenada x(bold) de la (bold)clave pública aleatoria(bold)(italics) derivada de la clave privada aleatoria (k):",
    },
    {
      type: "image",
      src: "/articles/ECDSA/secondDiagram.svg",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Siguiendo lo anterior, pasamos de nuestra clave privada aleatoria a nuestra clave pública aleatoria (multiplicando (k) por la (linkpagehttps://river.com/learn/terms/g/generator-point/)constante del punto generador G(linkpage)); luego, a partir de nuestra clave pública aleatoria, extraemos y conservamos únicamente la coordenada x (que llamaremos (r)). Esto significa que ahora tenemos la r representada en el algoritmo de firma. ",
    },
    {
      type: "paragraph",
      content:
        "Sin embargo, no hemos terminado, ya que (k) nos proporciona una vía para derivar otra variable requerida: el inverso multiplicativo (k-1). A partir de (k), también podemos derivar su inverso multiplicativo, mencionado en la fórmula anterior; vale la pena señalar que encontrar el inverso multiplicativo de un número modular es bastante complicado y queda fuera del alcance de este artículo. ",
    },
    {
      type: "paragraph",
      content:
        "Partiendo únicamente de (k), una clave privada aleatoria, pudimos derivar las dos variables resaltadas en la ecuación mencionada anteriormente:",
    },
    {
      type: "image",
      src: "/articles/ECDSA/ecdsaGeneration1.svg",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content: "(bold)2. Proporcionar la clave de firma(bold) (e, eG)",
    },
    {
      type: "paragraph",
      content:
        "Ahora que hemos añadido entropía con nuestro par de claves aleatorizado, pasaremos a la parte operativamente más peligrosa del proceso: firmar/insertar nuestra clave (bold)(italics)privada(italics)(bold). Sobra decir que se debe ser (italics)extremadamente(italics) diligente y cuidadoso al introducir su clave privada en cualquier lugar; es el equivalente de la contraseña de su banco. ",
    },
    {
      type: "paragraph",
      content:
        "La clave de firma es ella misma también, esperamos que no sea sorpresa, una clave privada de 32 bytes, es decir, un punto sobre la curva elíptica. Para generar una firma, todo lo que necesitamos es la clave privada (e); sin embargo, como verá, es la clave pública (eG) la que se utiliza posteriormente para verificar la firma, aprovechando la seguridad asimétrica que ofrecen los pares de claves. ",
    },
    {
      type: "image",
      src: "/articles/ECDSA/thirdDiagram.svg",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Por ahora, todo lo que necesitamos es nuestra clave privada (e), la cual, si observa el diagrama anterior, se multiplica por (italics)r(italics), la coordenada x de la clave pública derivada de la clave privada aleatoria (k). ",
    },
    {
      type: "paragraph",
      content:
        "Siguiendo las variables presentadas, nos queda una única variable por completar: el mensaje que realmente estamos firmando (m) y, lo que es más importante, su equivalente hasheado H(m). ",
    },
    {
      type: "paragraph",
      content: "(bold)3. Proporcionar el mensaje(bold) (m, H(m))",
    },
    {
      type: "paragraph",
      content:
        "La última variable restante no es, por supuesto, otra que el mensaje que estamos firmando. El mensaje puede ser cualquier cosa en formato hexadecimal y, de hecho, las firmas digitales se utilizan para firmar infinitos tipos de datos. En Bitcoin, sin embargo, el mensaje es la (italics)propia transacción en bruto(italics), modificada según el flag SigHash adjunto. ",
    },
    {
      type: "paragraph",
      content:
        "Analizar y reconstruir transacciones de Bitcoin antes de firmarlas es, sin duda, uno de los procesos más complejos y delicados de todo el desarrollo de Bitcoin. Dejaremos eso para otro artículo. Hoy únicamente vamos a cubrir la generación de firmas digitales utilizando un mensaje en texto plano (en formato hexadecimal). Por ejemplo, supongamos que deseamos firmar el mensaje “hello” (o la frase que prefiera).",
    },
    {
      type: "paragraph",
      content:
        "Primero necesitamos pasar de una cadena de caracteres (específicamente ASCII) a hexadecimal; eso nos da el mensaje (m). Sin embargo, como puede ver arriba, generar una firma no requiere un mensaje, sino más bien un hash de ese mensaje (visto como h(m) o z).",
    },
    {
      type: "paragraph",
      content:
        "Cuando se habla de usar una firma digital con un hash determinado, (italics)(bold)esta(bold)(italics) elección de hash es a lo que se refieren. En Bitcoin específicamente, el mensaje se hashea con un algoritmo de hashing llamado (linkpagehttps://www.bitscript.app/hashingAlgorithms)HASH256(linkpage). Así pues, utilizando nuestra (linkpagehttps://www.bitscript.app/hashCalculator)calculadora de hash(linkpage), asegúrese de que la entrada esté ajustada en “string” y que el algoritmo de hashing esté ajustado en HASH256; una vez hecho esto, escriba en el área de texto el mensaje pre-hasheado (o “preimage”) que desee firmar; abajo, en el área de salida, verá un hash de 32 bytes. A continuación se presenta un resumen de este proceso:",
    },
    {
      type: "image",
      src: "/articles/ECDSA/fifthDiagram.svg",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Con eso, finalmente disponemos de cada una de las variables que necesitamos para generar una firma digital: una fuente de aleatoriedad (clave aleatoria/efímera), una fuente de autenticidad (clave de firma) y un mensaje hasheado. ",
    },
    {
      type: "paragraph",
      content: "(bold)4. Insertar en la función anterior(bold)",
    },
    {
      type: "paragraph",
      content:
        "Con todas las variables ya calculadas, debería ser sencillo introducir cada valor en la fórmula anterior; sin embargo, esperamos que haya intuido que las operaciones matemáticas habituales a las que está acostumbrado (principalmente la suma y la multiplicación) no son tan sencillas, puesto que técnicamente son operaciones sobre un cuerpo finito definido por la curva elíptica secp256k1. Si eso parece complicado, bueno, es porque lo es. ",
    },
    {
      type: "paragraph",
      content:
        "En otro artículo cubrimos las curvas elípticas en profundidad, lo cual incluyó un análisis detallado de cómo funcionan las operaciones matemáticas normales sobre un cuerpo finito. Se recomienda encarecidamente leer ese artículo junto con este para comprender mejor los pasos a continuación; de nuevo, todo lo que estamos haciendo ahora es simplemente introducir las variables que hemos generado y derivado abajo:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. Multiplicar la clave de firma (e) y la coordenada x de la clave pública aleatorizada (r)",
        },
        {
          type: "numbered-item",
          content:
            "2. Sumar el mensaje hasheado (z) al resultado del paso anterior (e*d)",
        },
        {
          type: "numbered-item",
          content:
            "3. Multiplicar el inverso de la clave pública aleatorizada (k) y el paso anterior",
        },
        {
          type: "numbered-item",
          content:
            "4. Realizar la operación módulo sobre la constante secp256k1 (p)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Suponiendo que todo se haga con cuidado y de forma correcta, este meticuloso proceso produce el valor de (bold)(s)(bold), completando nuestra firma digital, que ahora consta del par (bold)(r, s)(bold). Recuerde que (r) fue una de las primeras variables que derivamos, y ahora, acompañada por “s”, completa las dos variables que conforman una firma digital criptográfica.",
    },
    {
      type: "paragraph",
      content: "(bold)El formato DER y más allá(bold)",
    },
    {
      type: "paragraph",
      content:
        "Con (r,s), por fin hemos generado una firma digital completa, pero el camino aún no termina. De hecho, si buscara una firma digital en la herramienta de deserialización, (bold)(italics)no(italics)(bold) encontraría una firma digital que coincida con este formato de par de coordenadas. Lo dejaremos para el próximo artículo, pero el paso final y crucial para generar una firma digital correctamente consiste en reformatear la firma para que cumpla con las Reglas de Codificación Distinguidas (DER).",
    },
  ],
};

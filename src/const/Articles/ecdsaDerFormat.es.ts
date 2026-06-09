import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ECDSADerFormat as English } from "./ecdsaDerFormat";

// Spanish translation of ECDSADerFormat.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `href`, `shortHandTitle`, `lesson`, etc. identical to the English
// version so URLs stay stable across locales.

export const ECDSADerFormatEs: ArticleViewProps = {
  ...English,
  title: "Formato DER de ECDSA",
  description:
    "Aprenda los fundamentos del formato DER de ECDSA para firmas digitales.",
  content: [
    {
      type: "main title",
      content: "Formato DER de ECDSA",
    },
    {
      type: "title",
      content: "La sintaxis estándar para las firmas ECDSA",
    },
    {
      type: "paragraph",
      content:
        "Hemos cubierto una buena parte de la firma ECDSA clásica. En particular, nuestros artículos ECDSA Generation y ECDSA Verification, que presentaron respectivamente cómo generar y verificar firmas. Si lo recuerda (o vuelve a consultarlos), notará que mencionamos dos formatos diferentes al describir las firmas:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Par de puntos(bold): como un par de puntos (r,s) sobre la curva elíptica sexp256k1",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)DER(bold): como un arreglo de bytes incluido en las transacciones en bruto",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Todas las operaciones que involucran una firma ECDSA se llevan a cabo sobre un tipo específico de gráfico, concretamente un gráfico de curva elíptica correctamente llamado (italics)secp256k1(italics) que se define mediante un conjunto de constantes. Este gráfico guarda un ligero parecido con una elipse en ciertos puntos, pero (bold)(italics)de manera crucial(italics)(bold), es un (italics)gráfico cerrado(italics). Este cierre garantiza que cualquier operación realizada sobre él produzca un resultado que permanezca dentro de los confines del gráfico:",
    },
    {
      type: "image",
      src: "/articles/ECDSA DER/DER-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Aunque no profundizaremos en los detalles aquí, las operaciones realizadas sobre un gráfico de curva elíptica son similares, no exactas, a operaciones matemáticas como la suma y la multiplicación; las operaciones básicas sobre una curva ECC, con sus características únicas, garantizan que el resultado permanezca dentro de un rango finito y cerrado. El punto clave a comprender es que una firma ECDSA implica fundamentalmente realizar operaciones sobre este gráfico, asegurando que los dos escalares obtenidos al generar una firma puedan ubicarse en el gráfico. Estos escalares son:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)R(bold) - la coordenada x de la clave aleatoria",
        },
        {
          type: "numbered-item",
          content: "(bold)S(bold) - el resultado de la fórmula de generación ECDSA",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Es evidente que (bold)R(bold) está en el gráfico, ya que es la coordenada x de una clave pública (una multiplicación del punto generador (g) y la clave privada aleatoria (k)); para (bold)S(bold), sin embargo, no resulta ni mucho menos tan claro. Esto solo se vuelve evidente una vez que ha recorrido correctamente la fórmula de generación y constatado que cada operación es una suma o una multiplicación sobre un punto que ya existe en el gráfico — garantizando así que el escalar final «s» también se encuentra en algún punto de la curva. Conviene resumir esta distinción de la siguiente manera:",
    },
    {
      type: "paragraph",
      content:
        "(italics)Los puntos (r,s) (bold)no(bold) son un par de coordenadas de puntos, sino más bien dos escalares independientes que son el resultado de operaciones criptográficas sobre la curva elíptica secp256k1.(italics)",
    },
    {
      type: "paragraph",
      content:
        "Por lo general, se (italics)presentan(italics) como un par de puntos de coordenadas, pero esa no es la interpretación correcta — simplemente se almacenan así. Es fundamental recordarlo, ya que una fuente común de confusión consiste en creer que (r,s) es un punto específico sobre la curva elíptica, en contraposición a dos escalares independientes.",
    },

    {
      type: "paragraph",
      content:
        "Si intentamos deserializar una transacción de Bitcoin hasta sus bytes en bruto, como por ejemplo (linkpagehttps://www.bitscript.app/transactions?transaction=c9d4d95c4706fbd49bdc681d0c246cb6097830d9a4abfa4680117af706a2a5a0&env=MAINNET)aquí(linkpage), eventualmente nos toparíamos con una firma ECDSA; vista a través de nuestra herramienta de deserialización, esto se parece un poco a lo siguiente: ",
    },
    {
      type: "image",
      src: "/articles/ECDSA DER/DER-2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Si introdujera los bytes resaltados en un contador de caracteres, vería que la longitud de la sección resaltada anterior es igual a 142 caracteres, o 72 bytes. Sin embargo, sabemos que tanto r como s, en su calidad de escalares de una curva elíptica, deberían medir aproximadamente 32 bytes cada uno — o 64 bytes en total. ",
    },
    {
      type: "paragraph",
      content:
        "(italics)Entonces, ¿por qué la firma en la transacción real muestra (bold)72 bytes(bold)?(italics)",
    },
    {
      type: "paragraph",
      content: "(italics)Cálculo del inverso modular de «S»(italics)",
    },
    {
      type: "paragraph",
      content:
        "La respuesta a esta pregunta, ya anticipada en varias ocasiones, incluso en el título del artículo, gira por completo en torno al formato de la firma digital ECDSA insertada en una transacción en bruto. Una transacción de Bitcoin no acepta una simple concatenación de (r,s) como formato de firma válido.",
    },
    {
      type: "paragraph",
      content:
        "Como se ha sugerido, Bitcoin exige que la firma sea reformateada a algo conocido como el formato (bold)DER(bold), que, acertadamente, significa (italics)Distinguished Encoding Rules(italics). Antes de introducir las reglas de codificación propiamente dichas, hagamos primero un pequeño desvío histórico sobre cómo Bitcoin llegó a adoptar el estándar DER en primer lugar.",
    },
    {
      type: "paragraph",
      content: "(italics)Unión Internacional de Telecomunicaciones (UIT)(italics)",
    },
    {
      type: "paragraph",
      content:
        "Internet y, por asociación, todos los datos que fluyen por internet, es uno de esos temas en los que cuanto más se sabe, más se da uno cuenta de lo que no sabe. Vivimos sobre los hombros de gigantes, dejando atrás los detalles minuciosos de lo que constituye nuestra infraestructura. Por ejemplo, sabemos que los datos deben estar estandarizados para funcionar a través de todos los medios técnicos, pero nunca nos hemos detenido a pensar quién exactamente establece estos estándares. ",
    },
    {
      type: "paragraph",
      content:
        "Resulta que los estándares digitales y de telecomunicaciones ya eran necesarios desde la época en que la telegrafía comenzaba a crecer como industria. Con sus orígenes que se remontan a 1865, en realidad es una agencia de las Naciones Unidas la que actualmente se encarga de crear y mantener estos estándares; conocida como la (bold)Unión Internacional de Telecomunicaciones (UIT)(bold), cuenta con numerosas ramas clave encargadas de garantizar que los datos se estructuren de manera universalmente estandarizada. La rama (bold)UIT-T(bold), que significa (bold)Sector de Normalización de las Telecomunicaciones de la Unión Internacional de Telecomunicaciones(bold), está específicamente encargada de desarrollar normas internacionales, conocidas como (bold)(italics)Recomendaciones(italics) UIT-T(bold), que garantizan telecomunicaciones globales fluidas y facilitan la interconexión e interoperabilidad de las redes.",
    },
    {
      type: "paragraph",
      content: "(italics)Verificación de firma(italics)",
    },
    {
      type: "paragraph",
      content:
        "Una de las contribuciones significativas de la UIT-T es el desarrollo de Abstract Syntax Notation One (ASN.1), que fue normalizada por primera vez en 1984. ASN.1 es un (italics)(bold)lenguaje(bold) utilizado para describir estructuras de datos para telecomunicaciones y redes informáticas(italics). Proporciona un marco para especificar estructuras de datos complejas de una manera que es tanto legible por humanos (bold)*y*(bold) legible por máquinas, lo que la convierte en una herramienta absolutamente necesaria para cualquier protocolo de comunicación/redes que aspire a lograr soporte universal.",
    },
    {
      type: "paragraph",
      content:
        "Las Distinguished Encoding Rules (DER) son un subconjunto de las reglas de codificación definidas por ASN.1 que fueron desarrolladas para garantizar una representación canónica e inequívoca de los datos. DER es clave (sin juego de palabras) para las aplicaciones criptográficas, donde incluso variaciones menores en la codificación pueden dar lugar a importantes vulnerabilidades de seguridad. El desarrollo de DER dentro del marco de ASN.1 por parte de la UIT-T es el mismo marco que se requiere para el soporte de firmas digitales — (bold)(underline)¡incluso en Bitcoin!(underline)(bold)",
    },
    {
      type: "paragraph",
      content: "(italics)El formato DER(italics)",
    },
    {
      type: "paragraph",
      content:
        "Ahora que conocemos el porqué y el quién, es momento de presentar el qué — es decir, el formato DER para las firmas digitales ECDSA; a continuación verá una tabla que describe el formato al que deben adherirse las firmas ECDSA para ser consideradas una transacción válida por los nodos de la red; después, examinaremos cada elemento línea por línea:",
    },
    {
      type: "image",
      src: "/articles/ECDSA DER/DER-3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Observando la tabla y siguiendo después la imagen presentada al principio, podemos comenzar a diseccionar y comprender cada parte de este formato. Disponiendo lo anterior horizontalmente, obtenemos un resumen de lo siguiente:",
    },
    {
      type: "paragraph",
      content:
        "(bold)Marcador | Longitud total de la firma | Elementos R | Elementos S | Indicador SigHash(bold)",
    },
    {
      type: "paragraph",
      content: "Repasemos cada uno de estos agrupamientos con más detalle:",
    },
    {
      type: "paragraph",
      content: "(italics)Longitud(italics) (total, r, s)",
    },
    {
      type: "paragraph",
      content:
        "Esperamos que no sea la primera vez que analiza transacciones en bruto, ya que hay al menos un elemento en lo anterior que es una fuente común de confusión: las tres (bold)(italics)longitudes(italics)(bold) distintas (total, r, s). Recuerde que, al hacer (italics)cualquier cosa(italics) en una transacción de Bitcoin en bruto que tenga una longitud dinámica, necesitamos comunicar a la pila la longitud de los datos que estamos a punto de apilar, en bytes. Por ejemplo, si vamos a apilar una clave pública, que tiene (bold)32(bold) bytes de longitud, primero debemos apilar OP_20 (0x20 = 2*16 + 0 = 32) en la pila. ",
    },
    {
      type: "paragraph",
      content: "(italics)Marcador(italics) (general, relleno, byte cero)",
    },
    {
      type: "paragraph",
      content:
        "Adicionalmente, una transacción de Bitcoin en bruto también tiene ocasionalmente «marcadores» o «indicadores» especiales que comunican una propiedad específica, como el campo Marker y Flag (0x0001) para una transacción SegWit o la versión de SegWit para una transacción Taproot (0x52). Una firma ECDSA con el formato DER apropiado (italics)también(italics) cuenta con (italics)(bold)tres(bold)(italics) marcadores diferentes:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Marcador general/de firma (0x30)(bold) - Señala el comienzo de una firma ECDSA",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)R,S - Marcador de inicio (0x02)(bold) - Señala el comienzo de los tres elementos que siguen tanto para «r» como para «s» (longitud, valor de relleno)",
        },
        {
          type: "numbered-item",
          content:
            "3. (bold)R,S - Relleno (0x00)(bold) - Señala el (italics)final(italics) de la (italics)(bold)longitud(bold)(italics) para «r» o «s» y señala el (italics)inicio(italics) del (italics)(bold)valor(bold)(italics) real de «r» y «s»",
        },
      ],
    },
    {
      type: "paragraph",
      content: "(italics)Indicador SigHash (italics)",
    },
    {
      type: "paragraph",
      content:
        "Por último, y posiblemente la parte más importante de la firma, se encuentra un valor literal de un byte que tiene seis opciones posibles diferentes: (0x01 - 0x03 y 0x81 - 0x83). El valor es sumamente importante, ya que comunica exactamente cómo se gastará una transacción; cuando una transacción se firma, el indicador SigHash determina (italics)(bold)qué partes (entradas y salidas) de la transacción se incluyen en el mensaje hasheado(bold)(italics). ",
    },
    {
      type: "paragraph",
      content:
        "Por razones obvias, el matiz anterior suele omitirse cuando las personas discuten los mecanismos de Bitcoin; pero, esperamos que, con los ejemplos anteriores, los detalles comiencen a encajar. Para que las transacciones correctamente formateadas y confirmadas se gasten, se requiere una firma digital del gastador previsto — esta es a veces la razón por la que la gente se refiere a gastar Bitcoin como (italics)firmar(italics) el UTXO. Porque, en pocas palabras, para gastar una salida de transacción no gastada, debe demostrar criptográficamente que es el destinatario previsto.",
    },
    {
      type: "paragraph",
      content:
        "Los indicadores SigHash son las instrucciones literales para crear mensajes hasheados aceptables a partir de una transacción de Bitcoin en bruto. Esto permite distintos niveles de flexibilidad en cuanto a la manera en que las transacciones pueden firmarse y modificarse; en pocas palabras, (italics)estos indicadores dictan a qué datos se compromete la firma, lo que impacta en cuán flexible puede ser una transacción y en los beneficios de seguridad que ofrece(italics). Estos indicadores SigHash son directamente responsables de la capacidad de Bitcoin para crear tipos de transacciones más creativos, tales como los depósitos en garantía (escrows), los intercambios atómicos (atomic swaps), los financiamientos colectivos (crowdfunds) y las siempre populares PSBT.",
    },
    {
      type: "paragraph",
      content:
        "De hecho, los indicadores SigHash, a pesar de su diminuto tamaño de un solo byte, son (bold)(italics)tan(italics)(bold) importantes y difíciles de comprender que estamos dedicando varios artículos a detallar el papel exacto que desempeña cada indicador. ",
    },
    {
      type: "paragraph",
      content: "(italics)Para concluir(italics)",
    },

    {
      type: "paragraph",
      content:
        "Con los indicadores SigHash anticipados, hemos cubierto ahora cada elemento requerido para que una firma ECDSA se ajuste al formato DER; adicionalmente, hemos cubierto exactamente qué es el formato DER, así como su historia en las normas de telecomunicaciones y redes. Aumentando continuamente nuestro conocimiento sobre las firmas ECDSA, ya hemos cubierto la generación de una firma, la verificación de una firma y el formateo de una firma. El siguiente elemento en el camino es adentrarnos en los indicadores SigHash para explorar las múltiples maneras de preparar una transacción en bruto para una firma.",
    },
  ],
};

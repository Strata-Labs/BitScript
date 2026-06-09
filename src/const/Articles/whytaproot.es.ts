import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { WhyTaproot as English } from "./whytaproot";

// Spanish translation of WhyTaproot.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `module`, `section`, `href`, `shortHandTitle`, `lesson`, `itemType`,
// `isLocked`, `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen`
// identical to the English version (inherited via the spread) so URLs and
// navigation stay stable across locales.

export const WhyTaprootEs: ArticleViewProps = {
  ...English,
  title: "Por qué Taproot",
  description:
    "Descubra la actualización revolucionaria de Bitcoin, que mejora la privacidad, habilita los contratos inteligentes y reduce las comisiones en Bitcoin.",
  content: [
    {
      type: "main title",
      content: "Abordar la eficiencia, la privacidad y los contratos inteligentes",
    },
    {
      type: "paragraph",
      content:
        "El mundo, y mucho más el mundo de las criptomonedas, luce bastante diferente a como era en 2017, cuando SegWit fue activado oficialmente mediante un soft fork activado por los usuarios. En aquel entonces, la prioridad era apoyar soluciones de pago económicas y escalables a través de experimentos apasionantes como la Lightning Network; en aquel entonces, Ethereum (italics)aún(italics) no había superado los mil millones de dólares de capitalización de mercado, era una teoría en fase de prueba propuesta por Vitalik.  ",
    },
    {
      type: "paragraph",
      content:
        "Taproot, activado oficialmente en la altura de bloque 709632 (14 de nov. de 2021), fue una respuesta de la comunidad a las lecciones aprendidas internamente y de otros ecosistemas desde la actualización SegWit. Es innegable que Taproot es la (bold)(italics)actualización más importante y apasionante de Bitcoin desde SegWit(italics)(bold). Y sin embargo, existen pocos recursos que expliquen lo que ocurre bajo el capó. Por lo tanto, comenzando con esta lección, vamos a centrarnos exclusiva y extensamente en todo y cualquier cosa relacionada con Taproot. ",
    },
    {
      type: "paragraph",
      content:
        "Para empezar, conviene explicar por qué se activó Taproot. ¿Por qué molestarse en usar Taproot en lugar de transacciones Legacy o SegWit en primer lugar? ¿Qué beneficios aporta?",
    },
    {
      type: "image",
      src: "/articles/why taproot/Image-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Esto es lo que el BIP principal de Taproot afirma que son las razones por las que Taproot debería haberse implementado - veamos si se sostienen.",
    },
    {
      type: "paragraph",
      content:
        "A modo de aviso, si esta es la primera vez que interactúa con Taproot, es totalmente esperable que las razones estén actualmente fuera de su alcance de lectura. El objetivo de presentar primero los beneficios es introducir todos los nuevos términos, matemáticas y lógica desde la perspectiva de (italics)cómo(italics) se conectan con todo lo demás. Se recomienda leer la sección a continuación una vez, recordar algunas de las palabras y luego volver a revisarla a medida que avanza en la serie.",
    },
    {
      type: "paragraph",
      content: "(bold)Aumenta la privacidad on-chain(bold)",
    },
    {
      type: "paragraph",
      content:
        "Todo Bitcoiner, desde los individuos soberanos hasta las entidades conformes con la regulación, debería preocuparse por la privacidad on-chain. Así que no es de extrañar que esta sea una de las afirmaciones hechas para apoyar y usar Taproot. Como veremos en la serie, esta afirmación está ciertamente respaldada, ya que la privacidad on-chain se incrementa de muchas maneras:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Transacciones uniformes(bold)",
        },
        {
          type: "paragraph",
          content:
            "La característica de privacidad estrella, sin lugar a dudas, es que a pesar del vasto, vasto espacio de datos con el que un desarrollador tiene que trabajar, una salida de transacción no gastada (utxo) Taproot tiene exactamente el mismo aspecto. Una salida Taproot puede estar destinada a gastarse como una simple transferencia directa de una clave pública a otra, o puede contener miles de scripts individuales en un océano de complejidad y elección - en ambos escenarios tienen exactamente el mismo aspecto: una cadena hexadecimal / arreglo de bytes de 64 bytes | 128 caracteres.",
        },
        {
          type: "paragraph",
          content:
            "Si hace clic en el ejemplo Taproot - Commit en nuestro deserializador y encuentra el Output ScriptSig, vería lo siguiente: ",
        },
        {
          type: "image",
          src: "/articles/why taproot/Image-2.png",
          alt: "Transaction Inputs",
        },
        {
          type: "paragraph",
          content:
            "Solo a partir de lo anterior, es imposible saber cuáles son las intenciones con esta salida. Como verá, cada salida Taproot tiene, por defecto, al menos dos formas diferentes (o caminos) de ser gastada: un key path (gastado por una clave única o agregada - similar a una transferencia directa) o un script path (gastado por una clave o un script).",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Agregación Schnorr(bold)",
        },
        {
          type: "paragraph",
          content:
            "Hablando de una clave agregada, una de las primitivas criptográficas fundamentales que impulsan Taproot es algo llamado firma Schnorr. Como veremos cuando revisemos el BIP de la firma Schnorr y las distintas variantes de Schnorr, esto nos permite crear claves públicas que son de firmante único o de múltiples firmantes que tienen el mismo aspecto; es decir, con solo mirar una clave pública es (italics)imposible saber si pertenece a un único usuario o a un grupo de firmantes(italics). ",
        },
        {
          type: "paragraph",
          content:
            "Mientras que el beneficio anterior ofrece oscuridad tanto para los key paths como para los script paths, las firmas Schnorr son responsables de aumentar aún más la privacidad on-chain al ocultar si el key path que luego se consume es propiedad de una o varias entidades.",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Scripts ocultos por MAST(bold)",
        },
        {
          type: "paragraph",
          content:
            "Así como las firmas Schnorr ofrecen mayor privacidad en uno de los dos caminos principales (key path), la parte del script path de una salida Taproot también cuenta con otra capa de privacidad. Aunque BIP 341 define el script path como un «camino», un nombre técnicamente más exacto sería un «árbol de Merkle de claves o scripts». ",
        },
        {
          type: "paragraph",
          content:
            "Esto se debe a que el script path, que es predeterminado en cualquier salida Taproot, no es necesariamente un único script sino más bien un árbol entero de scripts. Como veremos más adelante, consumir solo una de las ramas del árbol puede gastarse (italics)sin revelar las demás ramas(italics). Esto significa que un script path puede contener 2^128 formas diferentes de bloquear una salida de Bitcoin, pero solo la rama consumida se revela on-chain - nunca se revelan otros datos sobre las demás ramas. ",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Comprensiblemente, es probable que sea muy difícil captar todo lo mencionado anteriormente en la primera lectura, de nuevo, eso es lo esperado. La idea aquí es comenzar nuestro viaje entendiendo lo que la actualización Taproot pretendía lograr.",
    },
    {
      type: "paragraph",
      content: "(bold)Amplía los contratos inteligentes(bold)",
    },
    {
      type: "paragraph",
      content:
        "El segundo beneficio clave detrás de Taproot es la implementación (o el mayor soporte, dependiendo a quién pregunte) de contratos inteligentes on-chain. Como adelantamos en la sección anterior, (italics)cada(italics) salida Taproot tiene un key path y un script path integrados; y al igual que la última sección sobre privacidad, ambos caminos ofrecen beneficios en términos de funcionalidad de contratos inteligentes.",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Árbol MAST de claves y scripts(bold)",
        },
        {
          type: "paragraph",
          content:
            "No hace falta decir que dar el salto de entradas con un (italics)único(italics) script a entradas con un (italics)árbol de Merkle(italics) de scripts es una perspectiva apasionante. Pudiendo contener hasta 2^128 «posibilidades» diferentes (o ramas Tapleaf, como se las llama), es innegable que la estructura de árbol amplía masivamente el espacio de datos, o espacio de contrato, que acompaña a una única salida.",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Multi-sig agregado Schnorr(bold)",
        },
        {
          type: "paragraph",
          content:
            "Por otro lado, el nombre key path es engañosamente simple, ya que las firmas Schnorr están involucradas. Adelantado también arriba, las firmas Schnorr son capaces de agregar linealmente multi-sigs en una única firma - lo que significa que cada key path tiene un multi-sig robusto integrado (italics)independiente del script path(italics).",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Como esperamos poder ver con más claridad, (bold)(italics)ambos(italics)(bold) caminos cuentan con algún tipo de característica que puede considerarse una extensión de la funcionalidad de contratos inteligentes. Dos beneficios ya explorados, solo queda uno antes de hacer una pausa y pasar a los conceptos básicos de Taproot.",
    },
    {
      type: "paragraph",
      content: "(bold)Eficiencia y menores comisiones(bold)",
    },
    {
      type: "paragraph",
      content:
        "Por último, y quizá no tan apasionante como el primero pero igualmente apreciado, viene el beneficio en eficiencia que finalmente se refleja en menores comisiones. Como una de las críticas más comunes dirigidas a Bitcoin, es imperativo que, a pesar de cualquier característica adicional añadida, las comisiones de transacción se mantengan tan bajas como sea posible. Una vez más, como veremos a continuación, el diseño de Taproot tiene profundamente en cuenta las comisiones tanto en ambos caminos como en el diseño general.",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Multifirma más económica(bold)",
        },
        {
          type: "paragraph",
          content:
            "Ya hemos mencionado dos veces la firma agregada y la validación por lotes que surge de los multi-sigs derivados de Schnorr. Además de la privacidad que se produce aquí, vale la pena señalar que, ya sea que haya uno o cientos de firmantes, el tamaño de la firma es el mismo. En lugar de pagar las comisiones para validar una transacción con cientos de firmas individuales (lo que constituiría una transacción enorme), se ahorran comisiones con una clave pública de tamaño fijo.",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Oculta el script no ejecutado al desbloquear(bold)",
        },
        {
          type: "paragraph",
          content:
            "El script path también se beneficia de una manera similar. Mencionado en BIP 341, es preferible que los desarrolladores usen múltiples ramas en lugar de múltiples condicionales if/then en una única transacción. Esto, de nuevo, ahorra espacio de transacción y comisiones de manera similar: en lugar de que una transacción requiera la huella de la rama no ejecutada entera de un script condicional, con una estructura MAST podemos ahorrar espacio de transacción revelando únicamente la lógica ejecutada.",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Reduce la huella on-chain al bloquear(bold)",
        },
        {
          type: "paragraph",
          content:
            "Por otro lado, al crear el script path, queda inmediatamente claro cómo estamos ahorrando espacio de transacción: en lugar de proporcionar todos los scripts posibles a la vez, simplemente proporcionamos un único hash que es representativo del árbol de Merkle.",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "¡Y ahí lo tenemos! Junto con las características que contribuyen a la privacidad, se ahorran comisiones de transacción al mantener el espacio de transacción on-chain intencionadamente lo más pequeño posible.",
    },
    {
      type: "paragraph",
      content: "(bold)Hacia los conceptos básicos de Taproot(bold)",
    },
    {
      type: "paragraph",
      content:
        "Esperamos estar ya convencidos de que Taproot es, como mínimo, una actualización muy potente que merece la pena explorar. En el próximo artículo introduciremos los conceptos básicos de Taproot, después de lo cual y a lo largo de la serie, veremos cómo cada uno de estos beneficios cobra vida a partir del diseño implementado.",
    },
  ],
};

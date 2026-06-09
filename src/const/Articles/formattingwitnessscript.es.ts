import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { FormattingWitnessScript as English } from "./formattingwitnessscript";

// Spanish translation of FormattingWitnessScript.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `href`, `shortHandTitle`, `lesson`, `itemType`, `isLocked`,
// `published`, `module`, `section`, `googleLinkBigScreen`, and
// `googleLinkSmallScreen` identical to the English version (inherited via the
// spread) so URLs and routing stay stable across locales.

export const FormattingWitnessScriptEs: ArticleViewProps = {
  ...English,
  title: "Formato del Witness Script",
  description:
    "Explore la transformación del ScriptSig al Witness Script en las transacciones de Bitcoin gracias a Segregated Witness (SegWit)",
  content: [
    {
      type: "main title",
      content: "Introducción",
    },
    {
      type: "paragraph",
      content:
        "SegWit, abreviatura de Segregated Witness, es con diferencia una de las actualizaciones más importantes e influyentes de Bitcoin, y específicamente del formato de los scripts dentro de las transacciones de Bitcoin. Introducido en 2017 a través de los BIPs (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)141(linkpage), (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki)143(linkpage) y (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki)144(linkpage), SegWit fue el intento de Luke Dash Jr. de apaciguar la guerra cultural Small Block contra Large Block que se había estado gestando en segundo plano durante varios años. ",
    },
    {
      type: "paragraph",
      content:
        "Tratado con mayor profundidad en la lección de apertura de este módulo, SegWit encontró una solución aceptable (ciertamente temporal) a los problemas de espacio de bloque, maleabilidad de las transacciones y comisiones de transacción que preocupaban a ambas partes. Por favor, consulte la lección de apertura para obtener información más detallada, como las concesiones reconocidas por ambos lados.",
    },
    {
      type: "paragraph",
      content:
        "En cualquier caso, lo que nos interesa hoy son los detalles técnicos de SegWit. A un alto nivel, los mecanismos por los cuales el formato pasa de Legacy a SegWit pueden resumirse en dos pasos: ",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. El ScriptSig (o Unlock Script), que normalmente se encuentra (italics)después(italics) del campo ScriptSigSize y (italics)antes(italics) del campo Sequence, se traslada a una sección llamada «Witnesses» ahora ubicada después de los Outputs",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)El ScriptSig, normalmente formateado como un arreglo de bytes, ahora se convierte en un arreglo de (italics)tuples(italics) en su lugar(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Un traslado y un reformateo. Ambos pasos son necesarios para comprender SegWit; hoy, sin embargo, nos centraremos estrictamente en el 2º paso, en negrita — es decir, ¿cómo se formatea exactamente un Witness?",
    },
    {
      type: "title",
      content: "Traslado",
    },
    {
      type: "paragraph",
      content:
        "Antes de inspeccionar el cambio de formato, repasemos rápidamente la lección anterior. Como se mostró en el artículo anterior, a diferencia de un input Legacy, un input SegWit separa, o (bold)segrega(bold), el ScriptSig del input hacia la sección Witness. Esto simplemente significa que el ScriptSig se desplaza y ya no es adyacente al resto del input, sino que ahora se encuentra después de la sección Output:",
    },
    {
      type: "image",
      src: "/articles/formatting witness scripts/Image.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Uno podría suponer que el formato del propio ScriptSig se mantendría igual; lamentablemente, como vemos arriba y detallaremos en breve, uno estaría equivocado.",
    },
    {
      type: "title",
      content: "Formato",
    },
    {
      type: "paragraph",
      content:
        "La principal lección que abordaremos hoy son los detalles de implementación y las diferencias de (italics)formato(italics) entre un ScriptSig de Input y un Witness SegWit. Comencemos primero por agotar los posibles nombres que escucharemos y resumir las diferencias de formato en forma de párrafo:",
    },
    {
      type: "paragraph",
      content:
        "(italics)En las transacciones Legacy, los Inputs solo tienen ScriptSigs/UnlockScripts que se analizan como arreglos de (bold)bytes(bold).(italics)",
    },
    {
      type: "paragraph",
      content:
        "(italics)En las transacciones SegWit, algunos Inputs tienen ScriptSigs/UnlockScripts y algunos Inputs tienen Witnesses/WitnessesScripts que contienen un indicador de tamaño y se analizan como arreglos de. (bold)tuples(bold).(italics)",
    },
    {
      type: "paragraph",
      content:
        "En este último caso, un Witness SegWit, cada tuple contiene (bold)dos(bold) elementos. El primero, un indicador de tamaño VarInt, que señala el tamaño del próximo fragmento de datos que se empujará a la pila. El segundo es el siguiente fragmento de datos en sí — ya sea un op_code o datos empujados como una firma digital ECDSA o una clave pública hasheada. ",
    },
    {
      type: "paragraph",
      content:
        "A continuación se muestra una tabla útil que desglosa esta diferencia en la estructura, que abordaremos en detalle más abajo:",
    },
    {
      type: "image",
      src: "/articles/formatting witness scripts/Image2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "title",
      content: "Witness | WitnessScript | SegWitWitness",
    },
    {
      type: "paragraph",
      content:
        "El Witness, como se previsualizó arriba, no es solo un arreglo de tuples como arreglo; al igual que el ScriptSig va precedido por ScriptSigSize, el arreglo de tuples también va precedido por un contador que señala la longitud del arreglo / cuántos tuples inspeccionar. Cada Witness o WitnessScript puede entenderse mejor descomponiéndolo en dos partes distintas — la imagen a continuación muestra un ejemplo de un witness dividido en el conteo de tuples seguido del arreglo de tuples:",
    },
    {
      type: "image",
      src: "/articles/formatting witness scripts/Image3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content: "OP_PUSH20 | OP_PUSH21",
    },
    {
      type: "paragraph",
      content:
        "En conjunto, ambas partes constituyen acumulativamente el «Witness Script». A continuación revisaremos cada parte individualmente. ",
    },
    {
      type: "title",
      content: "Conteo de tuples (VarInt)",
    },
    {
      type: "paragraph",
      content:
        "El primer elemento de cualquier Witness Script es un contador VarInt que dicta cuántos elementos hay en este witness / witness script; específicamente, dicta cuántos (bold)(italics)tuples(italics)(bold) hay en el próximo arreglo de tuples. Vale la pena destacar las similitudes y diferencias con el indicador ScriptSigSize, equivalente en funcionalidad, presente en los Inputs:",
    },
    {
      type: "list",
      content: [
        {
          type: "hashed-item",
          content:
            "- En un ScriptSig Legacy, proporcionamos el ScriptSigSize, un VarInt, (italics)que proporciona la (bold)longitud del script entero(bold) en bytes(italics)",
        },
        {
          type: "hashed-item",
          content:
            "- En un WitnessScript SegWit, proporcionamos el contador de tuples, un VarInt (italics)que proporciona un (bold)conteo(bold) de la cantidad (bold)de tuples(bold)(italics)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Al inspeccionar, notamos que el primer elemento en (bold)(italics)ambos(italics)(bold) scripts es un VarInt con instrucciones sobre lo que sigue; sin embargo, significan cosas completamente diferentes. El primero, el ScriptSigSize, es la longitud del script entero, como una sola unidad, en bytes. El segundo, el contador de tuples, es un conteo de todas las diferentes piezas del script que, en agregación, componen el script entero.",
    },
    {
      type: "paragraph",
      content:
        "Ambos comienzan con VarInts y comunican, ya sea por la longitud del script o por el conteo de los elementos del script, el tamaño del script. Entendido esto, sumerjámonos en los tuples de dos elementos que componen el Witness Script.",
    },
    {
      type: "title",
      content: "Arreglo de tuples",
    },
    {
      type: "paragraph",
      content:
        "La mayor diferencia y probablemente la mayor fuente de confusión entre un ScriptSig de Input y un Witness SegWit es que el primero expresa directamente los elementos del script (datos empujados y op_codes) como cadena hexadecimal, mientras que el segundo expresa los elementos del script en un arreglo de tuples.",
    },
    {
      type: "paragraph",
      content:
        "El script, antes del softfork activado por los usuarios de SegWit, tenía un único formato como arreglo de bytes hexadecimales. Tanto para los ScriptSigs de Input como para los PubKeyScripts de Output, este formato era coherente. SegWit cambió esto introduciendo una segunda forma de expresar un script: como un arreglo de tuples de dos elementos. ",
    },
    {
      type: "paragraph",
      content:
        "¿Qué hay en estos tuples? Bueno, como vio en la vista previa anterior, el Witness/WitnessScript se separa por elementos en tuples y dentro de cada tuple encontramos dos elementos:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Tamaño del elemento:(bold) El tamaño (en VarInt) del siguiente elemento del script",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)Elemento:(bold) El siguiente elemento del script expresado en hexadecimal",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Esto parece más complicado de lo que. La mejor manera de desmitificar (italics)cualquier cosa(italics) es trabajar a través de ejemplos — así que haremos exactamente eso:",
    },
    {
      type: "title",
      content: "Ejemplo: OP_1 + OP_2 + OP_ADD",
    },
    {
      type: "paragraph",
      content: "(bold)Legacy				0x515193(bold)",
    },
    {
      type: "paragraph",
      content: "(bold)0x51(bold) = OP_1 (empuja el número 1 a la pila)",
    },
    {
      type: "paragraph",
      content: "(bold)0x51(bold) = OP_1 (empuja el número 1 a la pila)",
    },
    {
      type: "paragraph",
      content: "(bold)0x93(bold) = OP_ADD",
    },
    {
      type: "paragraph",
      content: "(bold)SegWit				0x015101510193(bold)",
    },
    {
      type: "paragraph",
      content:
        "(bold){0x01, 0x51}(bold) = el tamaño del elemento es de 1 byte, ese elemento es 0x51",
    },
    {
      type: "paragraph",
      content:
        "(bold){0x01, 0x51}(bold) = el tamaño del elemento es de 1 byte, ese elemento es 0x51",
    },
    {
      type: "paragraph",
      content:
        "(bold){0x01, 0x93}(bold) = el tamaño del elemento es de 1 byte, ese elemento es 0x51",
    },
    {
      type: "paragraph",
      content:
        "Como se vio arriba, un cliente necesitaría analizar cada tipo de formato de script de manera diferente. En el ejemplo anterior, dado que cada elemento es un op_code, la longitud de cada elemento era de un solo byte (0x01) — por lo que el equivalente SegWit del ejemplo inicial contenía tuples donde el tamaño era coherente.",
    },
    {
      type: "paragraph",
      content:
        "Continuando con el ejemplo, ¿qué precede a cada script? Como se discutió en la sección Conteo de tuples más arriba, tanto Legacy como SegWit expresan indicadores de tamaño diferentes.",
    },
    {
      type: "paragraph",
      content: "(bold)Legacy(bold)	longitud del script en bytes	0x03",
    },
    {
      type: "paragraph",
      content: "(bold)SegWit(bold)	longitud del arreglo de tuples		0x03",
    },
    {
      type: "paragraph",
      content:
        "Nuevamente, si midiéramos la longitud del script para SegWit, obtendríamos un número diferente. Ahora que sabemos qué precede al arreglo de tuples, escribamos el script Legacy completo (con el ScriptSigSize precedente) y el script SegWit completo:",
    },
    {
      type: "paragraph",
      content: "(bold)Legacy(bold) 0x03515193",
    },
    {
      type: "paragraph",
      content: "(bold)SegWit(bold) 0x03015101510193",
    },
    {
      type: "paragraph",
      content:
        "De un arreglo de bytes a un arreglo de tuples, esa es básicamente la parte «difícil» de captar de SegWit, que esperamos que estos dos ejemplos anteriores hayan dejado clara.",
    },
    {
      type: "title",
      content: "Cierre",
    },
    {
      type: "paragraph",
      content:
        "¡Y eso es todo en términos de entender exactamente qué es el Witness en SegWit y cómo se compara con el tradicional ScriptSig de Input! En el artículo anterior repasamos cómo la separación, o segregación, traslada el ScriptSig de la sección Inputs a la sección Witnesses; y ahora, con este artículo, hemos cubierto los cambios de formato que ocurren junto con este traslado de ubicación.",
    },
    {
      type: "paragraph",
      content:
        "Con ambos mecanismos centrales involucrados en el paso del ScriptSig a un Witness cubiertos, esperamos que tenga una mejor comprensión de las diferencias entre una transacción Legacy y una SegWit. ",
    },
  ],
};

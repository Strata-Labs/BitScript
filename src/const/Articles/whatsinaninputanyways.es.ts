import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { WhatsInAnInputAnyways as English } from "./whatsinaninputanyways";

// Spanish translation of WhatsInAnInputAnyways.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `href`, `shortHandTitle`, `lesson`, `itemType`, `isLocked`,
// `published`, `module`, `section`, `googleLinkBigScreen`, and
// `googleLinkSmallScreen` identical to the English version (inherited via the
// spread) so URLs and routing stay stable across locales.

export const WhatsInAnInputAnywaysEs: ArticleViewProps = {
  ...English,
  title: "¿Qué hay en una entrada, de todos modos?",
  description:
    "Una visión general de las entradas de transacción legacy en el contexto de las transacciones de Bitcoin.",
  content: [
    {
      type: "main title",
      content: "Una visión general de las entradas de transacción legacy",
    },
    {
      type: "paragraph",
      content:
        "Nunca se insistirá lo suficiente en que tu comprensión de las transacciones queda incompleta hasta que asimiles plenamente los dos campos de datos que están en el centro de todo: las entradas y las salidas. Las salidas, con campos menos numerosos y más simples (como el «monto»), son intrínsecamente más fáciles de entender. Las entradas, en cambio, son notoriamente complicadas y se vuelven aún más confusas cuando se incluye SegWit en la discusión. Por lo tanto, hoy el objetivo es revisar y desmitificar las entradas.",
    },
    {
      type: "paragraph",
      content:
        "Más concretamente, nos centraremos en una entrada legacy, ya que abordaremos las complicaciones de SegWit más adelante; a continuación se muestra un práctico recurso visual de lo que vamos a cubrir:",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/Image1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content: "¿Qué hay en una entrada, de todos modos?",
    },
    {
      type: "paragraph",
      content:
        "Una entrada, como su nombre indica, es parte o la totalidad del saldo de Bitcoin que entra (bold)(italics)en(italics)(bold) una transacción determinada; puede resultar útil pensar en ella como el saldo que gasta la transacción. Para «crear una entrada» o «gastar bitcoins», básicamente debes lograr dos cosas distintas:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Apuntar a los bitcoins que afirma haber recibido(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Demostrar criptográficamente que los recibió(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Al examinar cada uno de estos pasos con mayor detalle podemos derivar cada uno de los cinco campos anteriores. Comenzando por el primer objetivo, ¿cómo «apuntamos exactamente a los bitcoins recibidos»? Resulta que esto también puede descomponerse en dos pasos distintos (que nos llevarán a nuestros dos primeros campos):",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1.1. Apuntar a la (italics)transacción(italics) específica que contiene la salida no gastada (los bitcoins recibidos)",
        },
        {
          type: "numbered-item",
          content:
            "1.2. Apuntar a la (italics)salida no gastada(italics) específica que está gastando",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Recuerde que una salida no gastada, o UTXO, es un «fragmento» de bitcoins no gastados. Al apuntar a la transacción y después a la salida específica, ya proporcionamos datos suficientes para designar una única salida previamente no gastada: esta es la primera gran parte de una entrada. Por supuesto, cualquiera puede apuntar a una transacción minada y a una salida no gastada; por lo tanto, está claro que necesitamos más datos para gastarla realmente, lo que nos lleva a la segunda parte.",
    },
    {
      type: "paragraph",
      content:
        "Para gastar una entrada debemos demostrar criptográficamente que somos efectivamente los propietarios legítimos de esa salida de transacción no gastada (de nuevo, más comúnmente conocida como UTXO).",
    },
    {
      type: "title",
      content:
        "(italics)Entonces, ¿cómo se demuestra criptográficamente que se es el propietario del UTXO seleccionado?(italics)",
    },
    {
      type: "paragraph",
      content:
        "Esta pregunta se encuentra esencialmente en el corazón de una de las características clave de Bitcoin y, por lo tanto, se aborda a lo largo de una serie de lecciones anteriores (por si está saltando de un tema a otro); sin embargo, a continuación repasaremos una respuesta corta y una respuesta más larga y técnicamente más precisa. ",
    },
    {
      type: "title",
      content: "(italics)Respuesta corta(italics)",
    },
    {
      type: "paragraph",
      content:
        "La respuesta corta es que las (bold)firmas digitales(bold) basadas en la criptografía de curvas elípticas, la primitiva criptográfica, son la base del mecanismo central utilizado para demostrar la propiedad de las salidas de transacción no gastadas. Una firma digital se usa para demostrar matemáticamente que firmaste un mensaje (en Bitcoin, el «mensaje» es la transacción no firmada) con una clave privada revelando únicamente la clave pública. Esta firma digital se utiliza para demostrar que posee la clave privada que coincide con la clave pública a la que se asigna un UTXO, firmando una transacción. ",
    },
    {
      type: "paragraph",
      content:
        "Las firmas digitales son posiblemente a la vez la parte más importante y la más difícil de asimilar de los fundamentos detrás de las transacciones; recomendamos encarecidamente, encarecidamente, dirigirse a la sección de Criptografía (en cuanto se actualice).",
    },
    {
      type: "title",
      content: "(italics)Respuesta larga(italics)",
    },
    {
      type: "paragraph",
      content:
        "La respuesta larga es que Bitcoin viene equipado con un lenguaje de scripting (más comúnmente conocido como «script» o «bitcoin script»). Este lenguaje de scripting, que también merece su propia serie de artículos y que por tanto solo se esboza aquí, está compuesto por opcodes (piensa en funciones/comandos/operaciones) y datos empujados (normalmente claves públicas, claves públicas con hash, scripts de bloqueo, etc.). Cada entrada y cada salida posee un script. En el primer caso, una entrada, se conoce como scriptSig (o script de desbloqueo), y en el segundo, una salida, se conoce como pubKeyScript (o script de bloqueo). ",
    },
    {
      type: "paragraph",
      content:
        "Cuando un nodo comprueba si una transacción es válida, lo hace concatenando el scriptSig de una entrada con el scriptPubKey de una salida no gastada y procesando el script recién combinado; si queda un único valor residual de 0x01 (equivalente a «true») tras procesar la pila, entonces la transacción se considera válida.",
    },
    {
      type: "paragraph",
      content:
        "En resumen, cuando decimos que debemos demostrar criptográficamente la propiedad de un UTXO, queremos decir (bold)«proporcionar un scriptSig que, al combinarse con el pubKeyScript de la salida no gastada proporcionada, devuelva una transacción válida»;(bold) esto casi siempre implica una clave pública y una firma junto con opcodes como op_checksig u op_checkmultsig, aunque no es, sin embargo, (bold)(italics)estrictamente(italics)(bold) así. ",
    },
    {
      type: "paragraph",
      content:
        "Ahora que hemos obtenido una transacción y aislado una salida no gastada, ¿qué viene a continuación? ",
    },
    {
      type: "paragraph",
      content:
        "Proporcionar un scriptSig. Solo que Bitcoin es realmente estricto cuando trabaja con datos dinámicos: cada vez que trabajas con algo cuyo tamaño puede variar, siempre tendrás que escribir primero el (bold)tamaño(bold) de los datos que vienen a continuación. Esto significa que la pregunta inicial también se responde con un mínimo de dos campos de datos:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "2.1 - El (italics)tamaño(italics) de la firma / del script de desbloqueo (ScriptSigSize)",
        },
        {
          type: "numbered-item",
          content: "2.2 - La firma / el script de desbloqueo en sí (ScriptSig)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Ahora conocemos cuatro de los cinco posibles campos de datos (la transacción, la salida, el tamaño del scriptSig y el scriptSig) al describir una entrada.",
    },
    {
      type: "paragraph",
      content:
        "El último y definitivo campo de datos de una entrada es un puntero de timelock relativo que indica el momento más temprano posible en que la entrada puede gastarse / confirmarse on-chain. Igual que cada transacción tiene un locktime, cada entrada específica también puede tener un locktime; esto se conoce como nSequence y es, una vez más, el quinto y último campo utilizado en una entrada. ",
    },
    {
      type: "paragraph",
      content:
        "De nuevo, si es la primera vez que se adentra en los mecanismos de Bitcoin, no se desanime ante la complejidad aquí: estamos cubriendo literalmente todo lo que interviene en una transacción moderna.",
    },
    {
      type: "paragraph",
      content:
        "Una vez respondido el «porqué» detrás de los cinco campos, repasaremos ahora cada paso de una entrada y comprobaremos que cuadra con toda la lógica que hemos discutido anteriormente; la mejor manera de hacerlo, por supuesto, es inspeccionar una transacción real de mainnet:",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/image2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Utilizaremos el primer ejemplo (etiquetado como Direct Transfer (p2pkh)) que se encuentra en la herramienta (linktransactions)Deserializer(link) pegada arriba; siéntase libre de seguir el ejemplo abriendo la herramienta en paralelo.",
    },
    {
      type: "paragraph",
      content: "Una entrada byte a byte",
    },
    {
      type: "paragraph",
      content: "(bold)Número de entradas(bold) (VarInt)",
    },
    {
      type: "paragraph",
      content:
        "Antes de proporcionar los datos para cualquier entrada específica, primero debemos señalar (italics)cuántas(italics) entradas puede esperar analizar cualquier cliente; por lo tanto, el primer campo de entrada es en realidad un (bold)contador(bold) de cuántas entradas hay en la transacción. Esta es la primera vez que no hay una cantidad fija de bytes, sino algo llamado VarInt. Un VarInt, como su nombre indica, significa Variable Integer (entero variable), que es el formato estándar que utiliza Bitcoin para señalar tamaño (esto también tiene su propio artículo, ya que el VarInt aparece a lo largo de Bitcoin, pero hemos resumido la información más importante a continuación):",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/image3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "En la tabla anterior verás las reglas para utilizar VarInt. Como notarás, el tamaño del propio VarInt varía (de ahí su nombre); si el valor entero necesario es superior a 252, entonces utilizamos un byte adicional como bandera para señalar cuántos bytes (italics)adicionales(italics) se necesitan para esta instancia de VarInt.",
    },
    {
      type: "paragraph",
      content:
        "En cuanto a nuestra transacción de ejemplo, en la captura de pantalla siguiente notarás que la transacción muestra 0x01, es decir, 1 byte, lo cual indica que esta transacción tiene una sola entrada:",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/image4.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Ahora que sabemos cuántas entradas necesitamos analizar (en este caso, una), podemos revisar los campos de datos necesarios (bold)(italics)para cada(italics)(bold) entrada individual. En la próxima lección de esta serie haremos precisamente eso: analizar los cinco campos de entrada en la transacción de ejemplo con la que hemos estado trabajando.",
    },
  ],
};

export const VERSION_DATA = {
  Title: "Version 1",
  Content:
    "El campo de versión nos indica de qué tipo de transacción se trata (legacy o SegWit/Taproot). Se almacena como una cadena hexadecimal de 4 bytes | 8 caracteres en formato Little-Endian.",
  Content2:
    "La versión original, (1), ha sido el estándar para las transacciones de Bitcoin desde el bloque de origen; esta versión no dispone de las funcionalidades presentes en la versión (2).",
  Content3: "BE",
  Content4: "00000001",
};

export const VERSION_DATA_2 = {
  Title: "Version 2",
  Content:
    "El campo de versión nos indica de qué tipo de transacción se trata (legacy o SegWit/Taproot). Se almacena como una cadena hexadecimal de 4 bytes | 8 caracteres en formato Little-Endian.",
  Content2:
    "Introducida con BIP68, BIP112 y BIP113. Esta versión (2) admite la funcionalidad de locktime relativo mediante el campo nSequence.",
  Content3: "BE",
  Content4: "00000002",
};

export const INPUT_COUNT_DATA = {
  Title: "Input Count",
  Content:
    "El campo de recuento de entradas nos indica el número total de entradas que se utilizaron para obtener y desbloquear los Bitcoin gastados en esta transacción. Se almacena como un VarInt.",
  Content2:
    "Con nuestro recuento de entradas, sabemos cuántas entradas esperar en el hex que viene a continuación; recuerde que cada entrada requiere los siguientes campos: TXID, VOUT, ScriptSigSize, ScriptSig y Sequence.",
  Content3: "",
};

export const INPUT_TX_ID = {
  Title: "TXID",
  Content:
    "El TXID de una entrada especifica en qué transacción previa se recibió este Bitcoin. El TXID se almacena como 32 bytes | 64 caracteres en formato Little-Endian. ",

  Content2:
    "Esto significa que no puede copiarlo/pegarlo tal cual: primero debe convertirlo de Little-Endian a Big-Endian. Haga clic en el indicador de enlace de arriba para abrir esta transacción en otra pestaña.",

  Content3: "",
};

export const INPUT_VOUT = {
  Title: "VOUT",
  Content:
    "El VOUT de una entrada especifica el índice del UTXO desbloqueado; recuerde que el campo anterior es un TXID que apunta a una transacción minada que puede contener múltiples entradas.",

  Content2:
    "El TXID se almacena como 4 bytes | 16 caracteres en formato Little-Endian. ",

  Content3: "BE 00000001",
};

export const INPUT_SCRIPTSIGSIZE = {
  Title: "ScriptSigSize",
  Content:
    "El campo ScriptSigSize determina la longitud del ScriptSig / UnlockScript que viene a continuación. Como la mayoría de los elementos de tamaño variable, el ScriptSigSize se formatea según las reglas VarInt de Bitcoin.",

  Content2: "",

  Content3:
    "Esta longitud se registra en hex y debe convertirse a decimal para contar correctamente los caracteres que vienen a continuación.",
};

export const INPUT_SCRIPTSIG = {
  Title: "ScriptSig",
  Content:
    "El ScriptSig, también conocido como UnlockScript, es lo que se utiliza para verificar criptográficamente que somos propietarios del UTXO obtenido; al demostrar la propiedad, se nos permite gastar los BTC almacenados en la entrada. Comúnmente, pero no siempre, el ScriptSig/UnlockScript es uno de los pocos scripts estándar.",

  Content2:
    "Parece que este ScriptSig en particular forma parte de una transacción legacy P2PKH.",

  Content3:
    "P2PKH (pay-to-public-key-hash) En su momento fue el script más universal para transferencias simples y directas. Sigue siendo el predeterminado para transacciones anteriores a SegWit.",
};

export const INPUT_SEQUENCE = {
  Title: "Sequence",
  Content:
    "Un timelock para una entrada específica. Se utiliza muy raramente con op_checksequenceverify; lo más común es dejarlo sin alterar / configurado para ser minado inmediatamente.",

  Content2:
    "El nSequence se almacena como 4 bytes | 16 caracteres en formato Little-Endian, y el valor en sí nos indica si el timelock se basa en la altura del bloque, en el tiempo, o está configurado para ser minado inmediatamente (ffffffff):",

  Content3: "",
  Title1: "By Block Height",
  Cont1:
    "Establezca un valor < 500000000 para confirmar que la transacción no se minará hasta el bloque:",
  Title2: "By Unix Timestamp",
  Cont2:
    "Establezca un valor >= 500000000 para confirmar que la transacción no se minará hasta un tiempo Unix específico:",
  Bottom1: "configurado para ser minado inmediatamente",
  Bottom2: "configurado para ser minado inmediatamente",
};

export const OUTPUT_COUNT = {
  Title: "Output Count",
  Content:
    "El campo de recuento de entradas nos indica el número total de entradas que se utilizaron para obtener y desbloquear los Bitcoin gastados en esta transacción. Como la mayoría de los elementos de tamaño variable, se almacena según las reglas VarInt:",
  Content2:
    "Con nuestro recuento de salidas, sabemos cuántas salidas esperar en el hex que viene a continuación; recuerde que cada salida requiere los siguientes campos: Amount, PubKeySize y PubKey.",
  Content3: "",
};

export const OUTPUT_AMOUNT = {
  Title: "Amount",
  Content:
    "La cantidad de Bitcoin, descrita en sats enteros (1/100.000.000 de un Bitcoin), que se envía en esta salida.",
  Content2:
    " Este valor de cantidad se almacena como 8 bytes | 16 caracteres en formato Little-Endian.",
  Content3: "",
};

export const OUTPUT_SCRIPT_PUB_SIZE = {
  Title: "ScriptPubKeySize",
  Content:
    "El campo ScriptPubKeySize determina la longitud del ScriptPubKey / LockScript que viene a continuación. Como la mayoría de los elementos de tamaño variable, el ScriptPubKeySize se formatea según las reglas VarInt de Bitcoin:",
  Content2:
    "Esta longitud se registra en hex y debe convertirse a decimal para contar correctamente los caracteres que vienen a continuación.",
};

export const OUTPUT_SCRIPT_PUB_KEY = {
  Title: "ScriptPubKey",
  Content:
    "El ScriptPubKey, también conocido como LockScript, es lo que se utiliza para asignar criptográficamente la propiedad de una cantidad definida de Bitcoin. Comúnmente, pero no siempre, el ScriptSig/UnlockScript es uno de los pocos scripts estándar.",
  Content2:
    " Parece que este ScriptSig en particular forma parte de una transacción SegWit P2WPKH.",
};

export const WITNESS_SIZE = {
  Title: "Witness Element Count",
  Content:
    "Cada witness consta de un recuento de elementos y un arreglo de tuplas que incluyen el tamaño (VarInt) del elemento que viene a continuación y el valor / elemento real (datos u opcode) en sí. ",
  Content2:
    "Este recuento de elementos witness nos indica cuántos elementos hay en el witness script que viene a continuación.",
};

export const WITNESS_ELEMENT_SIZE = {
  Title: "Element Size",
  Content:
    "Antes de cada elemento del witness script, primero debemos registrar el tamaño del elemento que viene a continuación. Como siempre, esto significa utilizar las reglas VarInt estándar:",
  Content2:
    "Este recuento de elementos witness nos indica cuántos elementos hay en el witness script que viene a continuación.",
};

export const WITNESS_ELEMENT_VALUE = {
  Title: "Element Value",
  Content:
    "Este es un elemento, o item, del witness script. Este witness script, al igual que el ScriptSig/UnlockScript, se utiliza para verificar la propiedad del UTXO de entrada asociado. Comúnmente, pero no siempre, el ScriptSig/UnlockScript es uno de los pocos scripts estándar.",
  Content2:
    " Parece que este WitnessScript en particular forma parte de una transacción SegWit P2WPKH.",
};

export const LOCK_TIME = {
  Title: "Locktime",
  Content:
    "El locktime establece el momento más temprano en que una transacción completa puede ser minada en un bloque; es el último campo en cualquier tipo de transacción.",
  Content2:
    "El nSequence se almacena como 4 bytes | 16 caracteres en formato Little-Endian, y el valor en sí nos indica si el timelock se basa en la altura del bloque, en el tiempo, o está configurado para ser minado inmediatamente (00000000):",
  Title1: "By Block Height",
  Cont1:
    "Establezca un valor < 500000000 para confirmar que la transacción no se minará hasta el bloque:",
  Title2: "By Unix Timestamp",
  Cont2:
    "Establezca un valor >= 500000000 para confirmar que la transacción no se minará hasta un tiempo Unix específico:",
  Bottom1: "bloqueado hasta una altura específica",
  Bottom2: "bloqueado hasta un timestamp",
};

export const FLAG = {
  Title: "Flag",
  Content:
    "El Flag, almacenado como un valor de 1 byte | 2 hex, es un indicador adicional destinado a la funcionalidad SegWit. Actualmente, solo el valor 0x01 es estándar y se retransmite; sin embargo, este campo podría utilizarse para señalar diferentes alternativas SegWit.",
  Content2: "",
};

export const MARKER = {
  Title: "Marker",
  Content:
    "Se trata de un byte cero que indica que esta transacción es una transacción de witness segregado (SegWit) que contiene una sección de witness.",
  Content2: "",
};

export const SCRIPT_FALLBACKS = {
  unknownScript:
    "No se ha podido encontrar este script conocido en nuestra lista de scripts.",
  knownNoInfo:
    "Este es un script conocido, pero aún no tenemos información sobre él.",
};

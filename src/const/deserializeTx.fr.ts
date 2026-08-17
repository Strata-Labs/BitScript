export const VERSION_DATA = {
  Title: "Version 1",
  Content:
    "Le champ de version nous indique de quel type de transaction il s’agit (legacy ou SegWit/Taproot). Il est stocké sous forme de chaîne hexadécimale de 4 octets | 8 caractères au format Little-Endian.",
  Content2:
    "La version originale, (1), est la norme pour les transactions Bitcoin depuis le bloc d’origine ; cette version ne dispose pas des fonctionnalités présentes dans la version (2).",
  Content3: "BE",
  Content4: "00000001",
};

export const VERSION_DATA_2 = {
  Title: "Version 2",
  Content:
    "Le champ de version nous indique de quel type de transaction il s’agit (legacy ou SegWit/Taproot). Il est stocké sous forme de chaîne hexadécimale de 4 octets | 8 caractères au format Little-Endian.",
  Content2:
    "Introduite avec les BIP68, BIP112 et BIP113. Cette version (2) prend en charge la fonctionnalité de locktime relatif à l’aide du champ nSequence.",
  Content3: "BE",
  Content4: "00000002",
};

export const INPUT_COUNT_DATA = {
  Title: "Input Count",
  Content:
    "Le champ du nombre d’entrées nous indique le nombre total d’entrées qui ont été utilisées pour récupérer et déverrouiller les Bitcoin dépensés dans cette transaction. Il est stocké sous forme de VarInt.",
  Content2:
    "Avec notre nombre d’entrées, nous savons combien d’entrées attendre dans le hex à venir ; rappelez-vous que chaque entrée requiert les champs suivants : TXID, VOUT, ScriptSigSize, ScriptSig et Sequence.",
  Content3: "",
};

export const INPUT_TX_ID = {
  Title: "TXID",
  Content:
    "Le TXID d’une entrée précise dans quelle transaction précédente ce Bitcoin a été reçu. Le TXID est stocké sous forme de 32 octets | 64 caractères au format Little-Endian. ",

  Content2:
    "Cela signifie que vous ne pouvez pas le copier/coller tel quel — vous devez d’abord le convertir du Little-Endian au Big-Endian. Cliquez sur l’indicateur de lien ci-dessus pour ouvrir cette transaction dans un autre onglet.",

  Content3: "",
};

export const INPUT_VOUT = {
  Title: "VOUT",
  Content:
    "Le VOUT d’une entrée précise l’index de l’UTXO déverrouillé ; rappelez-vous que le champ précédent est un TXID qui pointe vers une transaction minée pouvant contenir plusieurs entrées.",

  Content2:
    "Le TXID est stocké sous forme de 4 octets | 16 caractères au format Little-Endian. ",

  Content3: "BE 00000001",
};

export const INPUT_SCRIPTSIGSIZE = {
  Title: "ScriptSigSize",
  Content:
    "Le champ ScriptSigSize détermine la longueur du ScriptSig / UnlockScript à venir. Comme la plupart des éléments de taille variable, le ScriptSigSize est formaté selon les règles VarInt de Bitcoin.",

  Content2: "",

  Content3:
    "Cette longueur est enregistrée en hex et doit être convertie en décimal pour compter correctement les caractères à venir.",
};

export const INPUT_SCRIPTSIG = {
  Title: "ScriptSig",
  Content:
    "Le ScriptSig, également appelé UnlockScript, est ce qui sert à vérifier cryptographiquement que nous possédons l’UTXO récupéré ; en prouvant la propriété, nous sommes désormais autorisés à dépenser les BTC stockés dans l’entrée. Le plus souvent, mais pas toujours, le ScriptSig/UnlockScript est l’un des quelques scripts standard.",

  Content2:
    "Il semble que ce ScriptSig particulier fasse partie d’une transaction legacy P2PKH.",

  Content3:
    "P2PKH (pay-to-public-key-hash) Fut à un moment le script le plus universel pour les transferts simples et directs. Reste celui par défaut avant SegWit.",
};

export const INPUT_SEQUENCE = {
  Title: "Sequence",
  Content:
    "Un timelock pour une entrée spécifique. Très rarement utilisé avec op_checksequenceverify, le plus souvent laissé inchangé / réglé pour être miné immédiatement.",

  Content2:
    "Le nSequence est stocké sous forme de 4 octets | 16 caractères au format Little-Endian, et la valeur elle-même nous indique si le timelock est basé sur la hauteur de bloc, sur le temps, ou réglé pour être miné immédiatement (ffffffff) :",

  Content3: "",
  Title1: "By Block Height",
  Cont1:
    "Définissez une valeur < 500000000 pour confirmer que la transaction ne sera pas minée avant le bloc :",
  Title2: "By Unix Timestamp",
  Cont2:
    "Définissez une valeur >= 500000000 pour confirmer que la transaction ne sera pas minée avant un temps Unix spécifique :",
  Bottom1: "réglé pour être miné immédiatement",
  Bottom2: "réglé pour être miné immédiatement",
};

export const OUTPUT_COUNT = {
  Title: "Output Count",
  Content:
    "Le champ du nombre d’entrées nous indique le nombre total d’entrées qui ont été utilisées pour récupérer et déverrouiller les Bitcoin dépensés dans cette transaction. Comme la plupart des éléments de taille variable, il est stocké selon les règles VarInt :",
  Content2:
    "Avec notre nombre de sorties, nous savons combien de sorties attendre dans le hex à venir ; rappelez-vous que chaque sortie requiert les champs suivants : Amount, PubKeySize et PubKey.",
  Content3: "",
};

export const OUTPUT_AMOUNT = {
  Title: "Amount",
  Content:
    "Le montant de Bitcoin, décrit en sats entiers (1/100 000 000 d’un Bitcoin), qui est envoyé dans cette sortie.",
  Content2:
    " Cette valeur de montant est stockée sous forme de 8 octets | 16 caractères au format Little-Endian.",
  Content3: "",
};

export const OUTPUT_SCRIPT_PUB_SIZE = {
  Title: "ScriptPubKeySize",
  Content:
    "Le champ ScriptPubKeySize détermine la longueur du ScriptPubKey / LockScript à venir. Comme la plupart des éléments de taille variable, le ScriptPubKeySize est formaté selon les règles VarInt de Bitcoin :",
  Content2:
    "Cette longueur est enregistrée en hex et doit être convertie en décimal pour compter correctement les caractères à venir.",
};

export const OUTPUT_SCRIPT_PUB_KEY = {
  Title: "ScriptPubKey",
  Content:
    "Le ScriptPubKey, également appelé LockScript, est ce qui sert à attribuer cryptographiquement la propriété d’un montant défini de Bitcoin. Le plus souvent, mais pas toujours, le ScriptSig/UnlockScript est l’un des quelques scripts standard.",
  Content2:
    " Il semble que ce ScriptSig particulier fasse partie d’une transaction SegWit P2WPKH.",
};

export const WITNESS_SIZE = {
  Title: "Witness Element Count",
  Content:
    "Chaque witness se compose d’un nombre d’éléments et d’un tableau de tuples comprenant la taille (VarInt) de l’élément à venir ainsi que la valeur / l’élément réel (données ou opcode) lui-même. ",
  Content2:
    "Ce nombre d’éléments witness nous indique combien d’éléments se trouvent dans le witness script à venir.",
};

export const WITNESS_ELEMENT_SIZE = {
  Title: "Element Size",
  Content:
    "Avant chaque élément du witness script, nous devons d’abord enregistrer la taille de l’élément à venir. Comme d’habitude, cela signifie utiliser les règles VarInt standard :",
  Content2:
    "Ce nombre d’éléments witness nous indique combien d’éléments se trouvent dans le witness script à venir.",
};

export const WITNESS_ELEMENT_VALUE = {
  Title: "Element Value",
  Content:
    "Il s’agit d’un élément, ou item, du witness script. Ce witness script, tout comme le ScriptSig/UnlockScript, sert à vérifier la propriété de l’UTXO d’entrée associé. Le plus souvent, mais pas toujours, le ScriptSig/UnlockScript est l’un des quelques scripts standard.",
  Content2:
    " Il semble que ce WitnessScript particulier fasse partie d’une transaction SegWit P2WPKH.",
};

export const LOCK_TIME = {
  Title: "Locktime",
  Content:
    "Le locktime définit le moment le plus précoce où une transaction entière peut être minée dans un bloc ; c’est le dernier champ de tout type de transaction.",
  Content2:
    "Le nSequence est stocké sous forme de 4 octets | 16 caractères au format Little-Endian, et la valeur elle-même nous indique si le timelock est basé sur la hauteur de bloc, sur le temps, ou réglé pour être miné immédiatement (00000000) :",
  Title1: "By Block Height",
  Cont1:
    "Définissez une valeur < 500000000 pour confirmer que la transaction ne sera pas minée avant le bloc :",
  Title2: "By Unix Timestamp",
  Cont2:
    "Définissez une valeur >= 500000000 pour confirmer que la transaction ne sera pas minée avant un temps Unix spécifique :",
  Bottom1: "verrouillé jusqu’à une hauteur spécifique",
  Bottom2: "verrouillé jusqu’à un timestamp",
};

export const FLAG = {
  Title: "Flag",
  Content:
    "Le Flag, stocké sous forme de valeur de 1 octet | 2 hex, est un indicateur supplémentaire destiné à la fonctionnalité SegWit. Actuellement, seule la valeur 0x01 est standard et relayée ; toutefois, ce champ pourrait être utilisé pour signaler différentes alternatives SegWit.",
  Content2: "",
};

export const MARKER = {
  Title: "Marker",
  Content:
    "Il s’agit d’un octet nul indiquant que cette transaction est une transaction à témoin séparé (SegWit) qui contient une section witness.",
  Content2: "",
};

export const SCRIPT_FALLBACKS = {
  unknownScript:
    "Impossible de trouver ce script connu dans notre liste de scripts.",
  knownNoInfo:
    "Ceci est un script connu, mais nous n'avons pas encore d'informations à son sujet.",
};

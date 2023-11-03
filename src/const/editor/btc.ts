const pushNumberOpcodes = [
  "OP_0",
  "OP_FALSE",
  "OP_1",
  "OP_TRUE",
  "OP_2",
  "OP_3",
  "OP_4",
  "OP_5",
  "OP_6",
  "OP_7",
  "OP_8",
  "OP_9",
  "OP_10",
  "OP_11",
  "OP_12",
  "OP_13",
  "OP_14",
  "OP_15",
  "OP_16",
];

const nopOpcodes = ["OP_NOP"];

const flowControlOpcodes = ["OP_IF", "OP_NOTIF", "OP_ENDIF", "OP_ELSE"];

const stackOpcodes = [
  "OP_TOALTSTACK",
  "OP_FROMALTSTACK",
  "OP_2DROP",
  "OP_2DUP",
  "OP_3DUP",
  "OP_2OVER",
  "OP_2ROT",
  "OP_2SWAP",
  "OP_IFDUP",
  "OP_DEPTH",
  "OP_DROP",
  "OP_DUP",
  "OP_NIP",
  "OP_OVER",
  "OP_PICK",
  "OP_ROLL",
  "OP_ROT",
  "OP_SWAP",
  "OP_TUCK",
];

const spliceOpcodes = ["OP_SIZE", "OP_CAT", "OP_SUBSTR", "OP_LEFT", "OP_RIGHT"];

const bitwiseLogicOpcodes = [
  "OP_EQUALVERIFY",
  "OP_INVERT",
  "OP_AND",
  "OP_OR",
  "OP_XOR",
];

const disabledOpcodes = [
  "OP_RESERVED",
  "OP_VER",
  "OP_VERIF",
  "OP_VERNOTIF",
  "OP_RESERVED1",
  "OP_RESERVED2",
  "OP_NOP1",
  "OP_NOP4",
  "OP_NOP5",
  "OP_NOP6",
  "OP_NOP7",
  "OP_NOP8",
  "OP_NOP9",
  "OP_NOP10",
  "OP_PUBKEYHASH",
  "OP_PUBKEY",
  "OP_INVALIDOPCODE",
];

const arithmeticOpcodes = [
  "OP_1ADD",
  "OP_1SUB",
  "OP_2MUL",
  "OP_2DIV",
  "OP_NEGATE",
  "OP_ABS",
  "OP_NOT",
  "OP_0NOTEQUAL",
  "OP_ADD",
  "OP_SUB",
  "OP_MUL",
  "OP_DIV",
  "OP_MOD",
  "OP_BOOLAND",
  "OP_BOOLOR",
  "OP_NUMEQUAL",
  "OP_NUMEQUALVERIFY",
  "OP_NUMNOTEQUAL",
  "OP_LESSTHAN",
  "OP_GREATERTHAN",
  "OP_LESSTHANOREQUAL",
  "OP_GREATERTHANOREQUAL",
  "OP_MIN",
  "OP_MAX",
  "OP_WITHIN",
  "OP_LSHIFT",
  "OP_RSHIFT",
];

const cryptoOpcodes = [
  "OP_RIPEMD160",
  "OP_SHA1",
  "OP_SHA256",
  "OP_HASH160",
  "OP_HASH256",
  "OP_CHECKSIG",
  "OP_CHECKSIGVERIFY",
];

const lockTimeOpcodes = ["OP_CHECKLOCKTIMEVERIFY", "OP_CHECKSEQUENCEVERIFY"];

const blockingOpcodes = [
  "OP_RETURN",
  "OP_VERIFY",
  "OP_EQUALVERIFY",
  "OP_NUMEQUALVERIFY",
  "OP_CHECKSIGVERIFY",
  "OP_CHECKMULTISIGVERIFY",
  "OP_CHECKLOCKTIMEVERIFY",
  "OP_CHECKSEQUENCEVERIFY",
  "OP_CHECKDATASIGVERIFY",
];

const equalOpcode = "OP_EQUAL";

const LiquidWordsOpcodes = [
  "OP_CHECKSIGFROMSTACK",
  "OP_CHECKSIGFROMSTACKVERIFY",
  "OP_SUBSTR_LAZY",
];

const otherOpcodes = [
  equalOpcode,
  ...LiquidWordsOpcodes,
  ...lockTimeOpcodes,
  ...spliceOpcodes,
  ...bitwiseLogicOpcodes,
  ...stackOpcodes,
];

export const languageBTC = {
  disabledOpcodes,
  pushNumberOpcodes,
  nopOpcodes,
  flowControlOpcodes,
  blockingOpcodes,
  otherOpcodes,
  arithmeticOpcodes,
  cryptoOpcodes,
};

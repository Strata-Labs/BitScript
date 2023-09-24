// Version
export const versionDescription =
  "The version field tells us what type of transaction this is (legacy vs segwit/taproot). It’s stored as a 4-byte | 8 hex string in Little-Endian format. The original version found, (1),  has been the standard for Bitcoin transactions since the origin block; this version does not have features found in version (2).";

export enum VersionTitle {
  V1 = "Version 1",
  V2 = "Version 2",
}

export enum VersionValueType {
  V1 = "00000001",

  V2 = "00000002",
}

export enum VersionBigEndian {
  V1 = "01000000",

  V2 = "02000000",
}

// Counts
export enum CountTitle {
  INPUT = "Input Count",
  OUTPUT = "Output Count",
}
export enum CountDescription {
  INPUT = "The input count field tells us the total number of inputs that were used to fetch & unlock the Bitcoin spent in this transaction. It’s stored as a VarInt. /n With our input count, we know how many inputs we expect in the upcoming hex, recall that each input requires the following fields: TXID, VOUT, ScriptSigSize, ScriptSig, & Sequence.",
  OUTPUT = "The output count field tells us the total number of outputs that were used to assign & lock the inputs spent.  Like most items of varying size, it’s stored according to VarInt rules: /n With our output count, we know how many outputs we expect in the upcoming hex, recall that each output requires the following fields: Amount, PubKeySize, & PubKey.",

  WITNESSELEMENT = "Every Witness consists of an element count & an array of tuples that include the size(varint) of the upcoming element & the actual value / element (data or op_code) itself. /n This witness element count tells us how many items are in the upcoming witness script.",
}

// VOUT
export const VOUTDescription =
  "The VOUT of an input specifies the index of the UTXO unlocked; recall that the field before this is a TXID that points to a mined transaction which may contain multiple inputs. /n The TXID is stored as an 4-byte | 16-char in Little Endian format.";

// ScriptSizes
export enum ScriptSizeDescription {
  SCRIPTSIG = "The ScriptSigSize field dictates the length of the upcoming ScriptSig / UnlockScript. Like most items of varying size, The scriptSigSize is formatted according to Bitcoin VarInt rules: /n This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
}

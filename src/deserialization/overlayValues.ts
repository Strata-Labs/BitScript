// PushedItems
export enum PushedDataTitle {
  HASHEDPUBLICKEY = "Hashed Public Key",
  PUBLICKEY = "Public Key",
  SIGNATUREECDSA = "Signature (ecdsa)",
  SIGNATURESCHNORR = "Signature (schnorr)",
  WITNESSREDEEMSCRIPT = "Redeem Script", 
  TAPROOTOUTPUT = "TapRoot Output",
  HASHEDSCRIPT = "Hashed Script",
  ECDSARVALUE = "R Value",
  ECDSASVALUE = "S Value",
  ORDINALTAG = "Ordinal Tag ('ord')"
}

export enum PushedDataDescription {
  HASHEDPUBLICKEY = "This is the 20-byte | 40-character hashed public key (hashed with OP_HASH160) provided along with a P2WPKH output - this is all that’s needed to signal the rest of the usual P2PKH op_codes.",
  PUBLICKEY = "This is the 33-byte | 66-character public key, provided along with a signature, that OP_CHECKSIG uses to verify that the message was signed by a private key that belongs to this public key.",
  SIGNATUREECDSA = "This is the ECDSA signature, provided in the DER format. It verifies that a message (the previous transaction), was signed by a private key that corresponds to an upcoming public key.",
  SIGNATURESCHNORR = "This is the Schnorr signature. It verifies that a message was signed by a private key that corresponds to an upcoming public key, offering better efficiency and security compared to ECDSA.",
  REDEEMSCRIPT = "This is the redeem script that contains the conditions which must be satisfied to spend the output. For multi-signature transactions, it specifies the number of signatures required and provides the public keys involved.",
  TAPROOTOUTPUT = "This is the 64-byte | 128 character output public key used when sending Bitcoin to a TapRoot address - this means there is both a key path & script path in this output.",
  HASHEDSCRIPT = "This is the 20-byte | 40-character hashed redeem script (hashed with OP_HASH160). Used in pubKeyScript outputs to lock a UTXO with a script.",
  ECDSARVALUE = "This is the R value of the ECDSA signature. The R value is the x-coordinate of the point R = k * G, where k is a randomnly-generated private key & G is the generator point.",
  ECDSASVALUE = "This is the S value of the ECDSA signature. The S value is the signature generated with the signing private key (e), R, the hashed message (m)of the message, & the randomnly-generated private key k.",
  ORDINALTAG = "This is the ordinal tag found in the ordinal script protocol that flags to a client that this script contains an ordinal (in hexadecimal format) below."
}

// Version 
export const versionDescription = "The version field tells us what type of transaction this is (legacy vs segwit/taproot). It’s stored as a 4-byte | 8 hex string in Little-Endian format. The original version found, (1),  has been the standard for Bitcoin transactions since the origin block; this version does not have features found in version (2).";

export enum VersionTitle {
  V1 = "Version 1",
  V2 = "Version 2"
}

export enum VersionValueType {
  V1 = "00000001",
  V2 = "00000002"
}

export enum VersionBigEndian {
  V1 = "01000000",
  V2 = "02000000"
}

// Marker
export const markerTitle = "Marker";
export const markerValue = "00";
export const markerDescription = "This is a zero byte figure that indicates that this transaction is a segregated witness (SegWit) transaction that contains a witness section.";

// Flag
export const flagTitle = "Flag";
export const flagValue = "01";
export const flagDescription = "The Flag, stored as 1-byte | 2-hex value, is an additional indicator meant for SegWit functionality. Currently only the value 0x01 is standard & relayed; however, this field could be used to flag for different SegWit alternatives.";

// TXID
export const TXIDDescription = "This is the transaction ID of the transaction that contains the output that is being redeemed by this input. This is a 32-byte | 64-hex value. \n This means you cannot copy/paste it as is - you first need to convert it from Little Endian to Big Endian. Click the link indicator above to open this transaction in a different tab.";
export const previousTransactionURL = "https://bitscript-git-stage-setteam.vercel.app/transactions?transaction=";

// VOUT
export const VOUTDescription = "The VOUT of an input specifies the index of the UTXO unlocked; recall that the field before this is a TXID that points to a mined transaction which may contain multiple inputs. /n The TXID is stored as an 4-byte | 16-char in Little Endian format."

// Counts
export enum CountTitle {
  INPUT = "Input Count",
  OUTPUT = "Output Count",
}
export enum CountDescription {
  INPUT = "The input count field tells us the total number of inputs that were used to fetch & unlock the Bitcoin spent in this transaction. It’s stored as a VarInt. /n With our input count, we know how many inputs we expect in the upcoming hex, recall that each input requires the following fields: TXID, VOUT, ScriptSigSize, ScriptSig, & Sequence.",
  OUTPUT = "The output count field tells us the total number of outputs that were used to assign & lock the inputs spent.  Like most items of varying size, it’s stored according to VarInt rules: /n With our output count, we know how many outputs we expect in the upcoming hex, recall that each output requires the following fields: Amount, PubKeySize, & PubKey.",
  WITNESSELEMENT = "Every Witness consists of an element count & an array of tuples that include the size(varint) of the upcoming element & the actual value / element (data or op_code) itself. /n This witness element count tells us how many items are in the upcoming witness script."
}

// Coinbase
export const coinbaseTitle = "Coinbase Data Size";
export const coinbaseDescription = "In every Coinbase transaction a miner has the option to inscribe some data into the Coinbase transaction. Whenever we push data, we'll need a VarInt that precedes it.";
export const coinbaseDataTitle = "Coinbase Data";
export const coinbaseDataDescription = "The Coinbase data inscribed by the miner that produced this block. Try converting the raw hex to string/ascii in our data formatter to see if it's a legible message.";

// ScriptSizes
export enum ScriptSizeDescription {
  SCRIPTSIG = "The ScriptSigSize field dictates the length of the upcoming ScriptSig / UnlockScript in bytes. Like most items of varying size, the scriptSigSize is formatted according to Bitcoin VarInt rules: /n This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
  SCRIPTPUBKEY = "The ScriptPubKeySize field dictates the length of the upcoming ScriptPubKey / LockScript in bytes. Like most items of varying size, the scriptPubKeySize is formatted according to Bitcoin VarInt rules: /n This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.",
}

// Scripts
export enum ScriptDescriptions {
  SCRIPTSIG = "The ScriptSig, also known as the UnlockScript, is what’s used to cryptographically verify that we own the UTXO fetched; by proving ownership, we’re now allowed to spend the BTC  stored in the input. Commonly, but not always, the SigScript/UnlockScript is one of the handful of standard scripts.\n It appears that this particular SigScript is part of a ",
  SCRIPTPUBKEY = "The ScriptPubKey, also known as the LockScript, is what’s used to lock the UTXO that we’re assigning to a new owner. Commonly, but not always, the PubScript/LockScript is one of the handful of standard scripts.\n It appears that this particular PubScript is part of a ",
}

// Sequence
export const sequenceDescription = "A timelock for a specific input. Used very rarely with  op_checksequenceverify, most commonly left unaltered / set to mine immediately. \n The sequence is stored as an 4-byte | 16-char in Little Endian format & the value itself tells us whether the timelock is block-height, time based or set to mine immediately (ffffffff):";

// Push OP
export const pushOPDescription = "Before pushing data to the stack it’s required that explicitly defined its length; this is done using a one or more data push ops. Much like VarInt, there are specific rules tha must be adhered to: \n This length is recorded in hex & must be converted to decimal to correctly count upcoming chars.";

// Amount
export const amountDescription = "The amount of Bitcoin, described in integer Satoshis (1/100,000,000 of a Bitcoin) that is being sent in this output. /n This amount value is stored as an 8-byte | 16-char in Little Endian format.";

// SegWit Version Flag
export enum SegWitVersionFlag {
  SEGWIT = "00",
  TAPROOT = "51"
}

// SegWit Version Title
export enum SegWitVersionTitle {
  SEGWIT = "SegWit Version (segwit)",
  TAPROOT = "SegWit Version (taproot)"
}

// SegWit Version Description
export enum SegWitVersionDescription {
  SEGWIT = "When setting the output, the very first value of a SegWit pubKeyScript signals what type of SegWit transaction we’re looking - at this moment, this means either SegWit (signaled with OP_0) or TapRoot (signaled with OP_1).",
  TAPROOT = "When setting the output, the very first value of a SegWit pubKeyScript signals what type of SegWit transaction we’re looking - at this moment, this means either SegWit (signaled with OP_0) or TapRoot (signaled with OP_1)."
}

// Known Scripts List
export enum KnownScript {
  NONE = "NONE",
  P2PKH = "P2PKH",
  P2SH = "P2SH",
  P2WPKH = "P2WPKH",
  P2WSH = "P2WSH",
  P2SHP2WPKH = "P2SH-P2WPKH",
  P2SHP2WSH = "P2SH-P2WSH",
  P2TR = "P2TR",
  P2PK = "P2PK",
}
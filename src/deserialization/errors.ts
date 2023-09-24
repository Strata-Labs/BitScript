// Error List

// Pre-Verify Errors
export const errInvalidInput = new Error(
"Invalid string length - TXID must be exactly 64 chars OR HEX transaction should be at least > 128 chars"
);

// Verify Errors
export const errStringLengthInLE8 = new Error(
"Little Endian - input string must be 8 characters"
);
export const errStringLengthInLE16 = new Error(
"Little Endian - input string must be 16 characters"
);
export const errStringLengthInLE64 = new Error(
"Little Endian - Input string must be 64 characters"
);
export const errIncompleteVarIntFC = new Error(
"Incomplete VarInt - byte decimal value > fc"
);
export const errIncompleteVarIntFD = new Error(
"Incomplete VarInt - For prefix 'fd', 2 bytes are expected"
);
export const errIncompleteVarIntFE = new Error(
"Incomplete VarInt - for prefix 'fe', 4 bytes are expected"
);
export const errIncompleteVarIntFF = new Error(
"Incomplete VarInt - for prefix 'ff', 8 bytes are expected"
);
export const errInvalidVersionEndian = new Error(
"Invalid version - endian format is incorrect, try in little endian"
);
export const errNonstandardVersion = new Error(
"Nonstandard version - only 00000001 & 00000002 are mined *&* relayed"
);
export const Hashing_List = [
  {
    Name: "HASH256",
    Desc: "Bitcoin-specific algorithm that hashes SHA256 x2",
    Returns: "32-bytes | 64-chars",
    Op: "OP_HASH256",
    Script: "P2WSH",
    BigDesc:
      "is one of two of Bitcoin-specific hashing algorithms (the other is HASH160). This hash takes in one input & hashes it with SHA256 not once but twice. HASH256 is seen throughout many, many parts of Bitcoin development including but not limited to: block hashes, transaction hashes",
  },
  {
    Name: "HASH160",
    Desc: "Bitcoin-specific algorithm that hashes SHA256 x2",
    Returns: "20-bytes | 40-chars",
    Op: "OP_HASH160",
    Script: "P2PKH",
    BigDesc:
      "is one of two of Bitcoin-specific hashing algorithms (the other is HASH256). This hash takes in one input & hashes it with SHA256 then with RIPEMD160. HASH160 is seen throughout many, many parts of Bitcoin development including but not limited to:  p2sh addresses & op_hash160.",
  },
];

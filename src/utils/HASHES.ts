export const Hashing_List = [
  {
    Name: "HASH256",
    Desc: "Bitcoin-specific algorithm that hashes SHA256 x2",
    Returns: "32-bytes | 64-chars",
    Op: "OP_HASH256",
    Script: "P2WSH",
    BigDesc:
      "is one of two of Bitcoin-specific hashing algorithms (the other is HASH160). This hash takes in one input & hashes it with SHA256 not once but twice. HASH256 is seen throughout many, many parts of Bitcoin development including but not limited to: block hashes, transaction hashes",
    Link: "/OPS/OP_HASH256",
    LinkScript: "/scripts/P2WSH",
  },
  {
    Name: "HASH160",
    Desc: "Bitcoin-specific algorithm that hashes SHA256 x2",
    Returns: "20-bytes | 40-chars",
    Op: "OP_HASH160",
    Script: "P2PKH",
    BigDesc:
      "is one of two of Bitcoin-specific hashing algorithms (the other is HASH256). This hash takes in one input & hashes it with SHA256 then with RIPEMD160. HASH160 is seen throughout many, many parts of Bitcoin development including but not limited to:  p2sh addresses & op_hash160.",
    Link: "/OPS/OP_HASH160",
    LinkScript: "/scripts/P2PKH",
  },
  {
    Name: "RIPEMD160",
    Desc: "Standard RIPE Message Digest primarily used in HASH160",
    Returns: "20-bytes | 40-chars",
    Op: "OP_HASH160",
    Script: "n/a",
    BigDesc:
      "published in 1996 & short for RIPE Message Digest, is one of the five variants of the RIPEMD hashing algorithims that outputs a 20-byte / 40-hex hash. It's included as a stand-alone op_code, but OP_RIPEMD160 is rarely, if ever, included in any common script. However, RIPEMD160 itself *is* used substantially through the more popular OP_HASH160 & OP_HASH256 operations.",
    Link: "/OPS/OP_RIPEMD160",
    LinkScript: "",
  },
  {
    Name: "SHA1",
    Desc: "The first variant in the Secure Hash Algorithm series",
    Returns: "20-bytes | 40-chars",
    Op: "OP_SHA1",
    Script: "n/a",
    BigDesc:
      ", or Secure Hash Algorithm 1, is a cryptographic hash function which produces a 160-bit (20-byte) hash. Despite its ubiquity in various systems, it's seen declining use in Bitcoin due to vulnerability concerns. The Bitcoin Script opcode OP_SHA1 provides a direct way to compute the SHA-1 hash of data, but in modern Bitcoin protocols, its use is discouraged in favor of more secure algorithms.",
    Link: "/OPS/OP_SHA1",
    LinkScript: "",
  },
  {
    Name: "SHA256",
    Desc: "Most popular variant in the Secure Hash Algorithm series",
    Returns: "32-bytes | 64-chars",
    Op: "OP_SHA256",
    Script: "n/a",
    BigDesc:
      ", part of the SHA-2 (Secure Hash Algorithm 2) family, is one of the most popular cryptographic hash functions; it produces a 256-bit (32-byte) hash. In Bitcoin, it's ubiquitously used, especially in its double iteration for block hashing. The opcode OP_SHA256 provides a straightforward way to compute the SHA-256 hash of data directly within Bitcoin Script.",
    Link: "/OPS/OP_SHA256",
    LinkScript: "",
  },
];

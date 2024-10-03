import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

//TODO: make sure all the links are correct

export const FromKeysToWallets: ArticleViewProps = {
  module: "Bitcoin Fundamentals",
  section: "Wallet Types",
  published: "August 15th 2024",
  title: "From Keys To Wallets",
  shortHandTitle: "/lessons/from-keys-to-wallets",
  description: "Foundation and History of Bitcoin Key Pairs",
  href: "/lessons/From Keys To Wallets",
  isLocked: false,
  itemType: "article",
  lesson: 13,
  googleLinkBigScreen: "",
  googleLinkSmallScreen: "",
  content: [
    {
      type: "main title",
      content: "From Keys To Wallets",
    },
    {
      type: "subtitle",
      content: "Foundation and History of Bitcoin Key Pairs",
    },
    {
      type: "title",
      content: "(bold)Introduction(bold)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        "In the (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))previous article(linkpage), you learned about (bold)key pairs(bold)—how a private key works like a bank password & a public key works like a bank account number. Today, we'll expand on that concept by discussing the most common entrypoint for sending & receiving bitcoin: (bold) wallets (bold). As you've hopefully noticed IRL, you (almost) never send a 33-byte public key when you intend on receiving bitcoin, you usually send an address, more specifically, a wallet address.",
    },

    // TODO: There should be an image here
    {
      type: "paragraph",
      content:
        "The private key (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))generates(linkpage) the public key which in turn generates (bold)one type(bold) of wallet. What type of wallet? Well, that's what we're going to focus on today. Unfortunately, it's not a simple topic as the deluge of lingo implies: legacy, segwit, taproot, p2pk, p2pkh, p2wpkh, p2sh & so on. We'll first provide some context to these frequently heard & often confused terms first, then, we'll dive into common wallet formats in greater detail.",
    },
    {
      type: "paragraph",
      content:
        "Understanding wallet types can be fairly intimidating at first glance, but in reality, with one exception, they can be categorized with two high-level questions:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1.  Where is the signature data stored?(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)2.  What is required to spend the UTXO?(bold)",
        },
      ],
    },
    {
      type: "title",
      content: "(italics) Legacy vs. Witness(italics)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        'A topic that deserves an article of its own, the placement of the signature data categorizes transactions & therefore wallet addresses, into two categories: legacy & witness. In Legacy wallets, the data that unlocks a UTXO is commonly referred to as a (bold)ScriptSig(bold) (short for signature script) & lives in the (linkpagehttps://bitscript.app/lessons/What%20is%20a%20ScriptSig%3F)input (linkpage) part of a transaction. In SegWit wallets, the data that unlocks a UTXO is commonly referred to as a (linkpagehttps://bitscript.app/lessons/What%20is%20a%20Witness%3F) Witness (linkpage) (a common term used in cryptography) & lives in a (bold)segregated (bold)part of a transaction  (thus the abbreviation "SegWit" for Segregated Witness).',
    },
    {
      type: "paragraph",
      content:
        "Both ScriptSigs & Witnesses aim to unlock a UTXO to send bitcoin, but the encoding & more importantly, the data storage location, are different & therefore lead to different wallet types.",
    },
    {
      type: "title",
      content: "(italics)Key vs. Script(italics)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        "A second axis of wallet type categorization exists across the (bold)logic(bold) required in either witnesses or scriptSigs. At a high-level, to (linkpagehttps://bitscript.app/lessons/What%20is%20a%20ScriptSig%3F)spend a UTXO(linkpage), one may or may not have to provide additional context, or data, to unlock a UTXO. As it's commonly mentioned, Bitcoin indeed does have some form of smart contracts in the shape of Script, an assembly-like stack language used to implement spending logic.",
    },
    {
      type: "paragraph",
      content:
        "[Two axis map of transaction types here to summarize this section]",
    },
    {
      type: "title",
      content: "(bold)Keys Create Wallets(bold)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        "As you have seen in a (linkpagehttps://www.bitscript.app/lessons/generating-a-taproot-pubkey-pt-i)previous lesson(linkpage), Bitcoin wallets are built on (bold)elliptic curve cryptography(bold), specifically the (linkpagehttps://www.bitscript.app/lessons/ECDSA%20DER%20Format)secp256k1(linkpage) curve, which generates a pair of cryptographic keys: the private key & the public key. You already know that the private key is a 32-byte integer, randomly generated, that allows you to sign transactions & send bitcoin. The 33-byte compressed public key is then derived by multiplying the private key with a generator point ((bold)G(bold)); it's this key, the public key, that we'll use to then further generate different types of wallets to accommodate different types of transactions.",
    },
    {
      type: "paragraph",
      content:
        "We'll now review the most commonly-used wallet types in detail, starting with the chronological oldest & technically simplest, & move our way up to modern wallet types.",
    },
    {
      type: "title",
      content: "(bold)Legacy(bold)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        'As previewed above & is hinted at by the name, "Legacy" addresses include the earliest address formats that either shipped with Bitcoin Core or were appended rather quickly; this includes transaction types (bold)P2PK(bold), (bold)P2PKH(bold), & (bold)P2SH(bold).',
    },
    {
      type: "title",
      content: "(bold)P2PK (Pay-to-Public-Key)(bold)",
      customClass: "mb-3",
    },
    // was here
    {
      type: "paragraph",
      content:
        "The (linkpagehttps://www.bitscript.app/scripts/P2PK)simplest & oldest type(linkpage) of transaction & therefore wallet type, a P2PK directly exposes the public key in transactions, which makes it less private & less efficient due to its larger size. In this scheme, the public key is directly stored in the transaction output script, typically using an opcode like (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)OP_CHECKSIG(linkpage). This is less private because the full public key is exposed to the block chain before it's spent. It's also less space-efficient as the public key is typically 65 bytes (in uncompressed form) or 33 bytes (in compressed form). An example from 2010 is (linkpagehttps://mempool.space/address/04cd31654088e472c60ab1c6ee7743deb186dce0b1ad5fc45691d37dad2620128e4b33c7c9c19ed01a5817e6e54c12fe1b83eafcb830440f23a2ce903cdb1df52f)04cd31654088e472c60ab1c6ee7743deb186dce0b1ad5fc45691d37dad2620128e4b33\
        c7c9c19ed01a5817e6e54c12fe1b83eafcb830440f23a2ce903cdb1df52f(linkpage).",
    },
    {
      type: "title",
      content: "(bold)P2PKH (Pay-to-Public-Key-Hash)(bold)",
      customClass: "mb-3",
    },
    {
      type: "paragraph",
      content:
        "P2PKH improves on P2PK limits by storing a hash of the public key—not the key itself—in the transaction output script. Only when the transaction is spent is the actual public key revealed. This not only reduces transaction size & improves privacy but also provides an additional layer of security, as breaking a hash function is harder than simply reading a public key. (linkpagehttps://www.bitscript.app/scripts/P2PKH)P2PKH scripts(linkpage) typically use an opcode pattern like (linkpagehttps://www.bitscript.app/OPS/OP_DUP)OP_DUP(linkpage) (linkpagehttps://www.bitscript.app/OPS/OP_HASH160)OP_HASH160(linkpage) &lt;PubKeyHash&gt (linkpagehttps://www.bitscript.app/OPS/OP_EQUALVERIFY)OP_EQUALVERIFY(linkpage) (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)OP_CHECKSIG(linkpage). Addresses start with (bold)'1'(bold), for example, (linkpagehttps://mempool.space/address/18BZyzJtETfcPzKFoHRT1dawziE4yUh96X)18BZyzJtETfcPzKFoHRT1dawziE4yUh96X.(linkpage)",
    },
    {
      type: "paragraph",
      content: "To generate a P2PKH address, follow these steps:",
    },
    {
      type: "list",
      //TODO: Make the text to be green for the public, currently all the text here is in bold for the public keys
      // TODO: add spacing for list items
      content: [
        {
          type: "numbered-item",
          content:
            "1.(bold) Generate Public Key: (bold) Create your uncompressed 65-byte public key 04b0bd634234abbb1ba1e986e884185c1b9e5d3a34e0dfee38c4474a49ca3bf22\
            162c6e55773ce8d9f0b60e5a8b9c56d5b5efc96e2384f7c9d33c1e7e4109db9e7.",
        },
        {
          type: "numbered-item",
          content:
            "2 (bold) Compute (linkpagehttps://www.bitscript.app/hashCalculator)SHA256(linkpage) Hash (bold): Hash this public key with SHA256 (bold)SHA256(04b0bd634234abbb1ba1e986e884185c1b9e5d3a34e0dfee38c447\
            4a49ca3bf22162c6e55773ce8d9f0b60e5a8b9c56d5b5efc96e2384f7c9d33c1e7e4109db9e7)(bold) = (bold)44f8c0d9503a31cf59bc70c070dea3bfc2bd717bc8481f8980c9dc516a662a59(bold)",
        },
        {
          type: "numbered-item",
          content:
            "3. (bold) Compute RIPEMD160 Hash (bold): Hash the result with RIPEMD160 to get a 20-byte hash (bold)RIPEMD160(44f8c0d9503a31cf59bc\
            70c070dea3bfc2bd717bc8481f8980c9dc516a662a59)(bold) = (bold)010966776006953D5567439E5E39F86A0D273BEE(bold)",
        },
        {
          type: "numbered-item",
          content:
            " 4. (bold) Add Version Byte (bold): Prepend the version byte 0x00 for a mainnet Bitcoin address: (bold)00 + 010966776006953D5567439E5E39F86A0D273BEE = 00010966776006953D5567439E5E39F86A0D273BEE (bold)",
        },
        {
          type: "numbered-item",
          content:
            "5. (bold) Compute Checksum (bold): Compute the checksum by taking the first 4 bytes of the double SHA-256 hash of the versioned hash (bold)SHA256(SHA256(00010966776006953D5567439E5E39F86A0D273BEE))(bold) = (bold)FFD1F1D25C63F3C7815D05CBFABE62E8CC5875C9DDFE95B9C60F243BEEB72F5D(bold)",
        },
        {
          type: "paragraph",
          content:
            "The checksum is the first 4 bytes: (bold)FF D1 F1 D2(bold) (each hexadecimal pair is 1 byte).",
        },
        {
          type: "numbered-item",
          content:
            "6. (bold) Encode in Base58Check (bold): Finally, encode the versioned PubKeyHash concatenated with the checksum in Base58Check: (bold)00010966776006953D5567439E5E39F86A0D273BEEFFD1F1D2(bold).",
        },
        {
          type: "paragraph",
          content:
            "When encoded in Base58Check, this becomes the P2PKH address: (bold)16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content: "(bold)P2SH (Pay-to-Script-Hash)(bold)",
    },
    {
      type: "paragraph",
      content:
        "P2SH, defined in (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)BIP16(linkpage), enables more (linkpagehttps://www.bitscript.app/scripts/P2SH)flexible transaction scripts(linkpage) by allowing funds to be sent to the hash of a script, called a redeem script, rather than directly to a public key hash like we've seen with P2PKH. This feature makes Bitcoin more versatile because it supports more complex spending conditions such as multisig, time locks, or any arbitrary conditions that can be defined in the script. P2SH addresses start with (bold)'3'(bold) like (linkpagehttps://mempool.space/address/3CswTd6V8V2uv24P9yWHpPnFiLfN4CABgW)3CswTd6V8V2uv24P9yWHpPnFiLfN4CABgW(linkpage).",
    },
    {
      type: "title",
      content: "SegWit",
      customClass: "font-bold mb-4",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "SegWit, short for (bold)Segregated Witness(bold), introduced in (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)BIP141(linkpage), was a major upgrade aimed at reducing transaction size & increasing scalability. SegWit works by moving the witness data—signatures & other transaction-specific data—outside the main block, allowing more transactions to fit within a block.",
    },
    {
      type: "title",
      content: "P2WPKH (Pay-to-Witness-Public-Key-Hash)",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "P2WPKH is a native SegWit format (referred to as (italics)(bold)SegWit v0(bold)(italics)) with (bold)bech32(bold) addresses. These addresses use a human-readable part, which for Bitcoin is (keys)bc(keys), followed by the separator (keys)1(keys) & then the data part that includes the witness version ((italics)v0 for P2WPKH(italics) ) & the 20-byte public key hash.",
    },
    {
      type: "paragraph",
      content:
        "P2WPKH addresses are derived similarly to P2PKH addresses. The resulting hash is then encoded in the (bold)bech32(bold) format, which differs from (bold)Base58Check(bold) we've seen in P2PKH. The script used to lock the funds embedded in the output script, called a witness program in SegWit (equivalent to (italics)scriptPubKey(italics) in P2PKH), is also different from P2PKH:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "In P2PKH, the locking script follows the format: OP_DUP OP_HASH160 <PubKeyHash> OP_EQUALVERIFY OP_CHECKSIG.",
        },
        {
          type: "numbered-item",
          content:
            "In P2WPKH, the witness program script is simply 0 <PubKeyHash>, where 0 represents the SegWit version, followed by the 20-byte public key hash. For Taproot, the SegWit version would be 1 as we'll see right after.",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "In a P2WPKH transaction, the signature & public key are stored in the witness data field rather than the main body of the transaction. This separation reduces the non-witness data, which counts fully toward the block size & moves the larger witness data to the witness section, which is only counted at a reduced weight (1 byte = 1 weight unit instead of 4 weight units for non-witness data). Since the unlocking script or witness is not included in the main transaction body for SegWit, the transaction size is significantly reduced.",
    },
    {
      type: "paragraph",
      content:
        "P2WPKH transactions are smaller compared to legacy P2PKH & even P2SH-P2WPKH transactions due to the absence of the redeem script in the witness section, resulting in lower fees:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "P2PKH transaction: A typical input requires 148 bytes.",
        },
        {
          type: "numbered-item",
          content:
            "P2WPKH transaction: The equivalent input requires only around 68 bytes in a block, so a whooping ~58% reduction.",
        },
      ],
    },
    {
      type: "subtitle",
      content:
        "P2SH-P2WPKH (Pay-to-Script-Hash with Pay-to-Witness-Public-Key-Hash)",
    },
    {
      type: "paragraph",
      content:
        "Nested SegWit (P2SH-P2WPKH), also known as Wrapped SegWit, is backward compatible & allows you to take advantage of SegWit even if you're using a legacy wallet.",
    },
    {
      type: "paragraph",
      content:
        'Legacy wallets only understand P2SH transactions, which is why the P2WPKH is "wrapped" inside a P2SH script. The address starts with a 3, which indicates a P2SH address. Legacy wallets can recognize & interact with this format.',
    },
    {
      type: "paragraph",
      content:
        "For P2SH transactions, the scriptSig contains the redeem script. In this case, the redeem script is the SegWit script, which contains a hash of the public key. The redeem script in P2SH-P2WPKH has the format: 0 <PubKeyHash>. This is what gets placed in the scriptSig, allowing legacy wallets to handle the transaction as if it were a normal P2SH transaction, without knowing it involves SegWit.",
    },
    {
      type: "paragraph",
      content:
        "The actual witness data (signature & public key) is stored in the witness field, which is a separate part of the transaction. Legacy wallets ignore this witness data because they don't understand it. However, SegWit-compatible nodes will use it to validate the transaction in a more efficient way.",
    },
    {
      type: "subtitle",
      content: "P2WSH (Pay-to-Witness-Script-Hash)",
    },
    {
      type: "paragraph",
      content:
        "P2WSH is the SegWit version of P2SH. Like P2SH, P2WSH allows complex scripts, such as multisig setups & time-locked transactions, but with more efficiency while addressing transaction malleability in legacy scripts. P2WSH addresses start with bc1q & are also known as Bech32 addresses, which are more user-friendly with better legibility & error detection.",
    },
    {
      type: "paragraph",
      content:
        "In P2WSH, the locking script is hashed using only SHA256, which produces a 32-byte hash, making it more resistant to hash collisions compared to P2SH, which uses a double-hashing process (RIPEMD-160 of SHA256) & results in a smaller 20-byte hash.",
    },
    {
      type: "paragraph",
      content:
        "Instead of putting the unlocking data in the scriptSig (as with legacy transactions), P2WSH transactions use the witness field as well as P2PKH. When spending from a P2WSH address, the witness field contains the script (which matches the SHA256 hash stored in the scriptPubKey) & the data required to satisfy the script (signatures & public keys).",
    },
    {
      type: "subtitle",
      content: "P2TR (Pay-to-Taproot)",
    },
    {
      type: "paragraph",
      content:
        "Understanding Taproot—also referred to as SegWit v1—can be quite complex, given the specific terminology such as \"taproot key\" & new technical details involved. At its core, Taproot, introduced via BIP341, is a significant upgrade to Bitcoin's transaction system, building on the P2WSH framework. It enhances Bitcoin's scripting & signature capabilities through the integration of Schnorr signatures & Merkelized Abstract Syntax Trees (MAST). When it comes to addresses, Taproot uses a new format starting with bc1p, leveraging Bech32m encoding.",
    },
    {
      type: "paragraph",
      content:
        "To break it down: P2TR addresses & wallets rely on Schnorr signatures, a newer cryptographic scheme that allows multiple signatures to be combined or aggregated into one. This means that transactions requiring multiple participants now look like they come from a single signer, reducing their size & improving efficiency. Schnorr signatures also enhance security by providing stronger guarantees than the older ECDSA signatures.",
    },
    {
      type: "paragraph",
      content:
        "In addition, Taproot incorporates MAST, which structures complex scripts using a special form of data structure, the Merkle Tree. This organization allows only the relevant parts of a Taproot script to be revealed when spending—a scriptPath—rather than exposing the entire script. This feature significantly boosts privacy & efficiency by keeping the details of complex spending conditions from a TapLeaf hidden unless needed.",
    },
    {
      type: "title",
      content: "In Closing",
    },
    {
      type: "paragraph",
      content:
        "And that's a wrap! Bitcoin wallets have evolved from simple legacy formats to more complex script types like SegWit & Taproot. Legacy wallets used public keys directly, while SegWit improved efficiency by separating witness data. Nested SegWit kept compatibility with older wallets by embedding SegWit within P2SH scripts, and now P2WSH enhanced efficiency for complex scripts while Taproot combined Schnorr signatures & MAST for further improved privacy & efficiency. It's worth noting that despite the variety of key formats & encodings across these wallet types, they all ultimately derive from the same seed. We'll explore how this seed is backed up in our next article.",
    },

    // ... Continue with the rest of the content, following the same structure
  ],
};

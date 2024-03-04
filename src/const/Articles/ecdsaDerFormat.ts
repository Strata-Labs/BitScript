import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const ECDSADerFormat: ArticleViewProps = {
  module: "Cryptography Fundamentals",
  section: "ECDSA Digital Signature",
  published: "March 4th 2024",
  title: "ECDSA DER Format",
  description: "Learn the basics of ECDSA DER Format for digital signatures.",
  href: "/lessons/ECDSA DER Format",
  isLocked: false,
  itemType: "article",
  lesson: 9,
  googleLinkBigScreen:
    "https://docs.google.com/document/d/e/2PACX-1vScjj6ELLvFdxPJrPAo3xt94RxFi30JpglS7p41EHEhkQKqe9nXZD_4fQbpwWB-6vRzs0WOCNFzEv62/pub?embedded=true",
  googleLinkSmallScreen:
    "https://docs.google.com/document/d/e/2PACX-1vS9NZOrYrWttjYyQe21HNykVpCbV_cqxMaAit4REdRBr94BZE-1YD1KO1YkHvOXoOjzyx5o2ITBdRgK/pub?embedded=true",
  content: [
    {
      type: "main title",
      content: "ECDSA DER Format",
    },
    {
      type: "title",
      content: "The Standard Syntax For ECDSA Signatures",
    },
    {
      type: "paragraph",
      content:
        "We’ve covered a good bit of the classic ECDSA signature. Particularly, both our ECDSA Generation & ECDSA Verification articles which introduced how to generate & verify signatures respectively. If you recall (or re-visit), you’ll notice that we mention two different formats when describing the signatures:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Pair of Points(bold): As a pair of points (r,s) on the elliptic curve sexp256k1",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)DER(bold): As an array of bytes that's included in raw transactions",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "All operations involving an ECDSA signature take place on a specific type of graph, namely an elliptic curve graph properly called (italics)secp256k1(italics) that’s defined by a set of constants. This graph bears a slight resemblance to an ellipse at certain points, but (bold)(italics)crucially(italics)(bold), it is a (italics)closed graph(italics). This closure ensures that any operation performed on it yields a result that remains within the confines of the graph:",
    },
    {
      type: "image",
      src: "/articles/ECDSA DER/DER-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "While we won't delve into the details here, the operations conducted on an elliptic curve graph are similar, not exact, to mathematical operations like addition & multiplication; basic operations on an ECC curve, with its unique characteristics, ensure the outcome stays within a finite, closed range. The key point to grasp is that an ECDSA signature fundamentally involves performing operations on this graph, ensuring that the two scalars obtained from generating a signature can be located on the graph. These scalars are:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)R(bold) - the x-coordinate of the random key",
        },
        {
          type: "numbered-item",
          content: "(bold)S(bold) - the result of the ECDSA generation formula",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "It’s obvious that (bold)R(bold) is on the graph since it’s the x-coordinate of a public key (a multiplication of the generator point (g) & the random private key (k)); for (bold)S(bold), however, it’s not nearly as clear. This only becomes obvious once you’ve gone through the generation formula correctly & witness that every operation is either an addition or multiplication on a point that already exists on the graph - thus guaranteeing that the final scalar ‘s’ is also somewhere on the curve. It’s worth summarizing this distinction as such:",
    },
    {
      type: "paragraph",
      content:
        "(italics)The points (r,s) are (bold)not(bold) a coordinate pair of points but rather two independent scalars that are the result of cryptographic operations over the elliptical curve secp256k1.(italics)",
    },
    {
      type: "paragraph",
      content:
        "They’re usually (italics)presented(italics) as a pair of coordinate points but that’s not the right interpretation - they’re simply stored as such. This is key to remember as a common source of confusion is that (r,s) is a specific point on the elliptic curve as opposed to two independent scalars.",
    },

    {
      type: "paragraph",
      content:
        "If we attempt to deserialize a Bitcoin transaction to it’s raw bytes, like for example (linkpagehttps://www.bitscript.app/transactions?transaction=c9d4d95c4706fbd49bdc681d0c246cb6097830d9a4abfa4680117af706a2a5a0&env=MAINNET)here(linkpage), we’d eventually stumble upon an ECDSA signature; seen through our deserialization tool, this looks a bit like this: ",
    },
    {
      type: "image",
      src: "/articles/ECDSA DER/DER-2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "If you dropped the highlighted bytes into a character counter, you’d see that the length of the highlighted section above is equal to 142 characters, or 72-bytes. Yet, we know that both the r & s, as scalars from an elliptic curve, should be ~32-bytes each - or 64-bytes total. ",
    },
    {
      type: "paragraph",
      content:
        "(italics)So why does the signature in the actual transaction show (bold)72-bytes(bold)?(italics)",
    },
    {
      type: "paragraph",
      content: "(italics)Calculating The Modulo Inverse of ‘S’(italics)",
    },
    {
      type: "paragraph",
      content:
        "The answer to this question, already previewed multiple times including in the article title, revolves entirely around the format of the ECDSA digital signature inserted into a raw transaction. A Bitcoin transaction does not accept a simple concatenation of (r,s) as a valid signature format.",
    },
    {
      type: "paragraph",
      content:
        "As suggested, Bitcoin requires the signature to be reformatted into something known as the (bold)DER(bold) format, which, aptly, stands for (italics)Distinguished Encoding Rules(italics). Before we introduce the actual encoding rules, let’s first detour for a small bit of history on how Bitcoin arrived on the DER standard in the first place.",
    },
    {
      type: "paragraph",
      content: "(italics)International Telecommunication Union (ITU)(italics)",
    },
    {
      type: "paragraph",
      content:
        "The internet & by association all the data that flows into the internet, is one of those topics that the more you know, the more you realize you don’t know. We live on the shoulders of giants, leaving the gritty details behind of what constructs our infrastructure. For example, we know that data must be standardized to work across all technical mediums, but we’ve never pondered on who exactly sets these standards. ",
    },
    {
      type: "paragraph",
      content:
        "As it turns out, digital & telecommunication standards were required all the way back when telegraphy as an industry began to grow. With its origins tracing back to 1865, it’s actually an agency of the United Nations that is currently in charge of creating & maintaining these standards; known as the (bold)International Telecommunication Union (ITU)(bold), there are numerous key branches within the agency charged with ensuring data is structured in a universally-standard manner. The (bold)ITU-T(bold) branch, which stands for  (bold)International Telecommunication Union Telecommunication Standardization Sector(bold), is specifically charged with developing international standards, known as (bold)ITU-T (italics)Recommendations(italics)(bold), which ensure seamless global telecommunications & facilitate interconnectivity/interoperability of networks.",
    },
    {
      type: "paragraph",
      content: "(italics)Signature Verification(italics)",
    },
    {
      type: "paragraph",
      content:
        "One of the significant contributions of ITU-T is the development of Abstract Syntax Notation One (ASN.1), which was first standardized in 1984. ASN.1 is a (italics)(bold)language(bold) used to describe data structures for telecommunications & computer networking(italics). It provides a framework for specifying complex data structures in a way that is both human-readable (bold)*&*(bold) machine-readable, making it an absolutely necessary tool for any communication/networking protocols that aim to achieve universal support.",
    },
    {
      type: "paragraph",
      content:
        "The Distinguished Encoding Rules (DER) are a subset of the encoding rules defined by ASN.1 that were developed to ensure a canonical, unambiguous representation of data. DER is key (no pun intended) for cryptographic applications, where even minor variations in encoding can lead to significant security vulnerabilities. The development of DER within the framework of ASN.1 by ITU-T is the very same framework that is required for digital signature support - (bold)(underline)even in Bitcoin!(underline)(bold)",
    },
    {
      type: "paragraph",
      content: "(italics)The DER Format(italics)",
    },
    {
      type: "paragraph",
      content:
        "Now that we know the why & the who, it’s time to introduce the what - aka the DER format for ECDSA digital signatures; below you’ll see a table that outlines the format that ECDSA signatures must adhere to in order to be considered a valid transaction by nodes in the network; afterwards, we’ll inspect each item line-by-line:",
    },
    {
      type: "image",
      src: "/articles/ECDSA DER/DER-3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Looking at the table then following along with the image introduced in the beginning we can begin to dissect & understand each part of this format. Laying the above out horizontally, we get a summary of the following:",
    },
    {
      type: "paragraph",
      content:
        "(bold)Marker | Total Signature Length | R-Items | S-Items | SigHash Flag(bold)",
    },
    {
      type: "paragraph",
      content: "Let’s review each of these groupings in further detail:",
    },
    {
      type: "paragraph",
      content: "(italics)Length(italics) (total, r,s)",
    },
    {
      type: "paragraph",
      content:
        "Hopefully it’s not your first time parsing raw transactions since there’s at least one item in the above that’s a common source of confusion: the three different (bold)(italics)lengths(italics)(bold) (total, r,s). Remember, when doing (italics)anything(italics) in a Bitcoin raw transaction that has a dynamic length, we need to communicate to the stack the length of the data we’re about to push, in bytes. For example, if we’re going to push a public key, which is (bold)32(bold)-bytes long, we first need to push OP_20 (0x20 = 2*16 + 0 = 32) to the stack. ",
    },
    {
      type: "paragraph",
      content: "(italics)Marker(italics) (general, padding, zero-byte)",
    },
    {
      type: "paragraph",
      content:
        "Additionally, a raw Bitcoin transaction also occasionally has special “markers” or “flags” that communicate a specific property, such as the Marker & Flag field (0x0001) for a SegWit transaction or the SegWit version for a Taproot transaction (0x52). An ECDSA signature with the appropriate DER format (italics)also(italics) has (italics)(bold)three(bold)(italics) different markers:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)General/Signature Marker (0x30)(bold) - Flags the beginning of an ECDSA signature",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)R,S - Start Marker (0x02)(bold) - Flags the beginning of the three items that follow for both ‘r’ & ‘s’ (length, padding value)",
        },
        {
          type: "numbered-item",
          content:
            "3. (bold)R,S - Padding (0x00)(bold) - Flags the (italics)end(italics) of the (italics)(bold)length(bold)(italics) for either ‘r’ or ‘s’ & flags the (italics)start(italics) of the actual ‘r’ & ‘s’ (italics)(bold)value(bold)(italics)",
        },
      ],
    },
    {
      type: "paragraph",
      content: "(italics)SigHash Flag (italics)",
    },
    {
      type: "paragraph",
      content:
        "Last, & arguably the most important part of signature, is a literal one-byte value that has six different possible options: (0x01 - 0x03 & 0x81 - 0x83). The value is eminently important since it communicates exactly how a transaction will be spent; when a transaction is signed, the SigHash flag determines (italics)(bold)which parts (inputs & outputs) of the transaction are included in the hashed message(bold)(italics). ",
    },
    {
      type: "paragraph",
      content:
        "For obvious reasons, the nuisance above is typically skipped when people discuss the mechanics of Bitcoin; but, hopefully, with the examples above, the details begin to click. For properly formatted & confirmed transactions to be spent, a digital signature is required from the intended spender - this is sometimes why people refer to spending Bitcoin as (italics)signing(italics) the UTXO. Because, in short, in order to spend an unspent transaction output, you have to cryptographically prove that you are the intended recipient.",
    },
    {
      type: "paragraph",
      content:
        "SigHash flags are the literal instructions for creating acceptable hashed messages given a raw Bitcoin transaction. This allows for different levels of flexibility in how transactions can be signed & modified; in short, (italics)these flags dictate what data the signature commits to, impacting how flexible a transaction can be & what security benefits it offers(italics). These SigHash flags are directly responsible for Bitcon’s ability to create more creative transaction types such as escrows, atomic swaps, crowdfunds & the ever-popular PSBTs.",
    },
    {
      type: "paragraph",
      content:
        "In fact, SigHash Flags, despite their diminutive size of a single-byte, are (bold)(italics)so(italics)(bold) important & challenging to understand that we’re dedicating multiple articles to detail the exact role each flag plays. ",
    },
    {
      type: "paragraph",
      content: "(italics)In Closing(italics)",
    },

    {
      type: "paragraph",
      content:
        "With the SigHash flags previewed, we’ve now covered every item required for an ECDSA signature to adhere to the DER format; additionally, we covered exactly what the DER format is as well as its history in telecommunications & networking standards. Continuously increasing our knowledge on ECDSA signatures, we’ve now covered generating a signature, verifying a signature & formatting a signature. The next item on the road here is to dive into the SigHash flags to explore the multiple ways to prepare a raw transaction for a signature.",
    },
  ],
};

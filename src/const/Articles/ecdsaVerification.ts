import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const ECDSAVerification: ArticleViewProps = {
  module: "Cryptography Fundamentals",
  section: "ECDSA Digital Signature",
  published: "March 4th 2024",
  title: "ECDSA Verification",
  description: "Learn the basics of ECDSA verification for digital signatures.",
  href: "/lessons/ECDSA Verification",
  isLocked: false,
  itemType: "article",
  lesson: 8,
  googleLinkBigScreen:
    "https://docs.google.com/document/d/e/2PACX-1vScjj6ELLvFdxPJrPAo3xt94RxFi30JpglS7p41EHEhkQKqe9nXZD_4fQbpwWB-6vRzs0WOCNFzEv62/pub?embedded=true",
  googleLinkSmallScreen:
    "https://docs.google.com/document/d/e/2PACX-1vS9NZOrYrWttjYyQe21HNykVpCbV_cqxMaAit4REdRBr94BZE-1YD1KO1YkHvOXoOjzyx5o2ITBdRgK/pub?embedded=true",
  content: [
    {
      type: "main title",
      content: "ECDSA Verification",
    },
    {
      type: "title",
      content: "What It Means To Provide A Valid Digital Signature",
    },
    {
      type: "paragraph",
      content: "(bold)Introduction(bold)",
    },
    {
      type: "paragraph",
      content:
        "We’ve previously stressed the importance of digital signatures within Bitcoin: they are arguably the most fundamental cryptographic primitive you’ll come across. They’re the mechanism solely responsible for proving that a user previously-received an unspent transaction output (UTXO) unlockable by their public key.",
    },
    {
      type: "paragraph",
      content:
        "Recall the previous article that discussed (linkpagehttps://www.bitscript.app/lessons/ECDSA%20Generation)ECDSA Generation(linkpage), there, we discussed that an ECDSA signature is generated with a random key, a signing key, & a message, which in our case is a specially-formatted Bitcoin transaction. This digital signature is then inserted into the sigscript / unlockscript / witness field for a specific input which points to a previously-received unspent transaction output (UTXO); the idea, of course, is that the digital signature cryptographically confirms the message (amount of  Bitcoin) as well as the identity of the signer (recipient). ",
    },
    {
      type: "paragraph",
      content:
        "In short, we focused on how the signature is (italics)generated(italics); but, once it’s inserted into script & processed by a node, how does the (italics)(bold)verification(bold)(italics) work? In other words, how does Bitcon itself verify that a digital signature is valid? The magic, as it turns out, happens through a very specific & common op_code; in fact, if you look at (italics)most(italics) legacy input sigscripts/unlockscripts you’ll almost always see that the last opcode in a pubkeyscript / lockscript is a variation of (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)op_checksig(linkpage); which, understandably, stands for “check signature,” an example of this found in a (linkpagehttps://www.bitscript.app/transactions?transaction=c9d4d95c4706fbd49bdc681d0c246cb6097830d9a4abfa4680117af706a2a5a0&env=MAINNET)P2PKH transaction(linkpage) is shown below:",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Today, that’s the focus: conceptually understanding how a signature is (italics)verified(italics), or, in other words, how OP_CHECKSIG works underneath the hood. Instead of starting with a random key, a signing key, & a message to (italics)generate(italics) a signature, this time, whenever we intend to cryptographically (italics)verify(italics) a signed message we also need three things: (bold)the signature, the public signing key & the hashed message.(bold)",
    },
    {
      type: "paragraph",
      content:
        "Let’s dig a bit further here before introducing the main formula for verification by breaking down the aforementioned requirements in plain English:",
    },

    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. The *public* signing key, P, authenticates that (bold)(italics)only(italics)(bold) the signer with access to the signing (bold)(italics)private(italics)(bold) key could have generated / signed this signature",
        },
        {
          type: "numbered-item",
          content:
            "2. The *hashed message*, h(m), of course verifies that the actual message results in (bold)(italics)the exact same 32-byte array(italics)(bold) provided during the generation (aka not a single byte is altered in the amount of Bitcon transferred)",
        },
        {
          type: "numbered-item",
          content:
            "3. The *signature* (r,s) verifies that the signer has knowledge of the random private key (k), which, while never fully revealed, statistically suggests that the signer was at least present during the generation",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "All of these variables are used in the digital signature verification formula seen below:",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "We have an idea of what each variable above means, now let’s discuss what exactly the formula as a whole accomplishes. In the previous (linkpagehttps://www.bitscript.app/lessons/ECDSA%20Generation)Generation article(linkpage), the formula we introduced solved for a variable “(bold)s(bold)”, which provided us with the (italics)second(italics) & final value for our signature (r,s); remember “(bold)r(bold)” is simply the x-coordinate of a random public keypair (kG). ",
    },
    {
      type: "paragraph",
      content:
        "This time around, when we verify, (bold)(italics)we’re attempting to recreate the random public key (kG) to then compare the x-coordinate to ‘r’(italics)(bold); if the x-coordinates are equal, this means we indeed re-created the correct random public key which was (italics)only possible(italics) by providing the correct signing keypair, the correct random key & the exact hashed message. In order to verify this signature, we’ll first need to calculate the multiplicative Inverse of ‘S.’",
    },
    {
      type: "paragraph",
      content: "(italics)Calculating The Modulo Inverse of ‘S’(italics)",
    },
    {
      type: "paragraph",
      content:
        "The first thing you’ll note is that the Verification formula prominently mentions the inverse of ‘(bold)s(bold)’ twice. In case it’s not clear, the ‘r’ & ‘s’ seen above are the two values that together make up the “signature” (though often seen in DER format, not as a pair of scalars). As discussed in the Generation article, modulo math over an elliptic curve is straight-forward but by no means ‘simple'. ",
    },
    {
      type: "paragraph",
      content:
        "There are two commonly-used different formulas calculating the multiplicative inverse over a prime finite field (aka modulo (italics)division(italics)); one is more generalized & has been around nearly forever (the extended Euclidean Algorithm), while the other method works strictly under the case that the modulo operator is (italics)prime(italics). A summary on both of these is seen below followed by a table that compares them:",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "The Extended Euclidean Algorithm (EEA) is a general-purpose method that works for (italics)any(italics) two integers & any modulus ((italics)including non-prime ones(italics)). As the name suggests, it’s an ancient step-by-step process that finds the greatest common divisor (GCD) of two numbers & simultaneously calculates the coefficients that express the GCD as a linear combination of the original numbers. In the context of finding the inverse of 'S' for digital signatures, the EEA can be used regardless of the modulus (prime or not), but it can become extremely computationally expensive for large numbers (which makes it impractical for most elliptic curve operations).",
    },
    {
      type: "paragraph",
      content:
        "On the other hand, Fermat's Little Theorem offers a faster & simpler solution compared to the EEA, but it comes with limitations. It (italics)(bold)only(bold)(italics) works under specific conditions, such as the modulus (m) must be a prime number, & the base number (s) & the modulus (m) must be relatively prime (share no common factors other than 1). If these conditions hold true, Fermat's Little Theorem states that raising '(bold)s(bold)' to the power of m-1 & taking the modulo of m will result in 1, allowing us to efficiently calculate the inverse of 's' modulo m. However, if the conditions are not met, this method cannot be used. Since all the math performed in a Bitcoin ECDSA signature is done over the secp256k1 graph, we know we’re safe to use FLT.",
    },
    {
      type: "paragraph",
      content:
        "For more clarity on how exactly each of these algorithms are used to find the multiplicative inverse using modulo math, we’ll shortly publish articles on each of these algorithms (Extended Euclidean Algorithm | Fermat’s Little Theorem).",
    },
    {
      type: "paragraph",
      content: "(italics)Signature Verification(italics)",
    },
    {
      type: "paragraph",
      content:
        "Outside of the inverse ‘s’, the remaining variables are straight-forward & should be readily available. We see that we must provide the hashed message h(m) once again; which makes sense, as this is the very message we’re verifying as signed. We also have to provide ‘r’ which simply comes from the signature. ",
    },
    {
      type: "paragraph",
      content:
        "Identifying & plugging in these values is simple, unfortunately, actually running these operations is anything but; however, assuming we plug-in & calculate everything correctly, we’d complete our verification formula, which again, provides us with (italics)some public key(italics). This public key is supposed to be the (bold)(italics)random(italics) public key(bold) (kG) that we used during the Generation phase. (italics)To “verify” simply means to check whether the x-coordinate of this derived public key matches the ‘r’ found in the provided signature(italics). (bold)If it does, then the digital signature is considered verified(bold).",
    },
    {
      type: "paragraph",
      content:
        "(italics)But what does this have to do with Bitcoin again?(italics)",
    },
    {
      type: "paragraph",
      content:
        "Great question. To loop it all together it might help to state common Bitcoin vocabulary & reframe it with seemingly-obtuse but more technically-accurate statements:",
    },
    {
      type: "paragraph",
      content: "(italics)from(italics)",
    },
    {
      type: "paragraph",
      content: "“Receiving Bitcoin is transferring from one wallet to another”",
    },
    {
      type: "paragraph",
      content: "(italics)to(italics)",
    },
    {
      type: "paragraph",
      content:
        "“Receiving Bitcoin means a UTXO is generated with some fixed amount of sats & a cryptographic lock that (usually) includes a hashed public key”",
    },
    {
      type: "paragraph",
      content: "(italics)from(italics)",
    },
    {
      type: "paragraph",
      content:
        "“Spending received Bitcoin means transferring from one wallet to another”",
    },
    {
      type: "paragraph",
      content: "(italics)to(italics)",
    },
    {
      type: "paragraph",
      content:
        "“Spending received Bitcoin means providing a verifiable digital signature with the keypair whose public key matches the hashed public key found in the pubkeyscript/lockscript”",
    },
    {
      type: "paragraph",
      content:
        "For obvious reasons, the nuisance above is typically skipped when people discuss the mechanics of Bitcoin; but, hopefully, with the examples above, the details begin to click. For properly formatted & confirmed transactions to be spent, a digital signature is required from the intended spender - this is sometimes why people refer to spending Bitcoin as (italics)signing(italics) the UTXO. Because, in short, in order to spend an unspent transaction output, you have to cryptographically prove that you are the intended recipient.",
    },
    {
      type: "paragraph",
      content:
        "How do you prove that? By providing a digital signature that indeed confirms the message (the amount of Bitcoin spendable in the UTXO) as well as the signer (the public key matches the hashed public key found in the UTXO sigscript/lockscript).",
    },
    {
      type: "paragraph",
      content:
        "For the math-inclined that yearn for the (italics)why(italics), below we can see that just by performing simple algebra, we can start with the Generation formula found in the ECDSA Generation article & the ECDSA Verification formula presented here & arrive at the formula for a public key over an elliptic curve (P = eG):",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-4.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "And that concludes our journey in learning the very basics of the legacy ECDSA signature process. While before we explored how a signature is generated, this time around we connected how the signature is ultimately verified on-chain; specifically, we peeked under the hood of the most common legacy op_code, op_checksig, to understand how a digital signature is the key component in spending a Bitcoin unspent transaction output (UTXO). ",
    },
  ],
};

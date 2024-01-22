import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const ECDSAGeneration: ArticleViewProps = {
  module: "Cryptography Fundamentals",
  section: "ECDSA Signature",
  published: "Jan. 22nd 2024",
  title: "ECDSA Generation",
  description:
    "An introductory overview of Taproot transactions, highlighting KeyPath, ScriptPath, and their importance in Bitcoin transactions.",
  href: "/lessons/ECDSA Generation",
  isLocked: false,
  itemType: "article",
  lesson: 7,
  googleLinkBigScreen:
    "https://docs.google.com/document/d/e/2PACX-1vScjj6ELLvFdxPJrPAo3xt94RxFi30JpglS7p41EHEhkQKqe9nXZD_4fQbpwWB-6vRzs0WOCNFzEv62/pub?embedded=true",
  googleLinkSmallScreen:
    "https://docs.google.com/document/d/e/2PACX-1vS9NZOrYrWttjYyQe21HNykVpCbV_cqxMaAit4REdRBr94BZE-1YD1KO1YkHvOXoOjzyx5o2ITBdRgK/pub?embedded=true",
  content: [
    {
      type: "main title",
      content: "ECDSA Generation",
    },
    {
      type: "title",
      content: "Proving Ownership of A Signed Message",
    },
    {
      type: "paragraph",
      content: "(bold)Introduction(bold)",
    },
    {
      type: "paragraph",
      content:
        "It’s often been said that blockchain is nothing but a linked-list of digital signatures. In a way, this is true as digital signatures are certainly the crux of the cryptography that underlies Bitcoin; These digital signatures serve as verification tools, allowing nodes to authenticate the reception of Bitcoin in previous transactions. This authentication is secured through a unique digital lock, accessible only by a specific public key & a specifically formatted transaction. ",
    },
    {
      type: "paragraph",
      content:
        "Digital signatures are particularly powerful & pervasive in cryptography for many reasons, among which the following three stand out:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "1. The asymmetry provided by private & public keypairs",
        },
        {
          type: "numbered-item",
          content: "2. The communication provided by the hashed message",
        },
        {
          type: "numbered-item",
          content: "3. The collision resistance provided by the randomization",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Hopefully these terms seem at least vaguely familiar as it’s hard to appreciate the excitement around digital signatures without them. In short, we (Bitcoiners) care about digital signatures because it’s how Bitcoin is actually transferred from one user to another. More technically accurate, digital signatures are how public keys cryptographically verify & unlock Bitcoin in previously-received UTXOs. ",
    },
    {
      type: "paragraph",
      content:
        "In the most common applications of digital signatures, the hashed message is typically some hidden message meant as a credential such as an IP address during a SSL handshake; however, in Bitcoin, the hashed message is a formatted version of the transaction being signed.",
    },
    {
      type: "paragraph",
      content:
        "Despite their importance, digital signatures are (italics)rarely(italics) taught or discussed due to the sheer complexity (read: math) involved. Today, we’re going to do just that: continue building the basis for a fundamental understanding of both keys & signatures. Specifically, we’re going to focus on the practical use of generating an ecdsa digital signature; previous articles (or soon to launch articles*) cover the math concepts underlying signatures such as finite fields, modulo math, the discrete logarithm problem &  elliptic curves.",
    },
    {
      type: "title",
      content: "ECDSA Generation Algorithm",
    },
    {
      type: "paragraph",
      content:
        "At its core, a digital signature fulfills two fundamental roles: generation & verification. While the latter confirms the authenticity of a signature, our focus here is on the former – the intricate process of generating a digital signature.",
    },
    {
      type: "paragraph",
      content:
        "The purpose of a digital signature (italics)is to create a verifiable yet non-replicable digital fingerprint (signature) that the owner of a private & public key pair signed some message (in our case, a specially-formatted Bitcoin transaction)(italics). ",
    },
    {
      type: "paragraph",
      content:
        "From this simple definition we can start to extract all the inputs required to generate a signature: a signing keypair (private/public) & a message. If we look more closely at the definition, however, we mentioned (italics)“non-replicable”(italics) as a desired property - this implies some source of entropy, or (italics)randomness(italics). This means that we actually need a total of three things: (bold)message, signing keypair & (italics)random(italics) keypair(bold). Below, we’ll preview the ECDSA generation formula, which uses these three items to create a digital signature in a coordinate-pair (r,s) or DER format:",
    },
    {
      type: "image",
      src: "/articles/ECDSA/ECDSA.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Clearly, the above requires more than three variables, yet, as we’ll see, it’s possible to derive every single variable needed starting with only three items; these steps, where we derive everything we’ll need in, in conjunction with the formula above & formatting standard we’ll later define, are collectively known as the ECDSA Generation Algorithm:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Generate A Random Keypair(bold) (start with k, derive kG, r & k-1)",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)Provide A Signing Keypair(bold) (start with e, derive eG)",
        },
        {
          type: "numbered-item",
          content:
            "3. (bold)Provide A Pre-Hashed Message(bold) (m, derive H(m))",
        },
        {
          type: "numbered-item",
          content: "4. (bold)Insert Into Function Above(bold)",
        },
        {
          type: "numbered-item",
          content: "5. (bold)Format According To DER Standards(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "With these five steps one should be able to generate a cryptographically verifiable digital signature; we’ll go ahead & dive into each step in detail below:",
    },
    {
      type: "paragraph",
      content:
        "(bold)1. Generate Random/Ephemeral Key(bold) (start with k, derive kG, r & k-1)",
    },
    {
      type: "paragraph",
      content:
        "As you see above, four different values in the generation formula are all actually derived from this single starting value: a random private key (k). The very first part of creating a digital signature is to introduce entropy (randomization) by using a tested randomizer to create a 32-byte | 64-character private key (commonly labeled ‘(bold)k(bold)’). Just like the private signing key, it’s *critical* that the private random key (k) is kept secret because without this randomization it becomes easier, not easy*, but easier to reverse-engineer a private key from a signature.",
    },
    {
      type: "paragraph",
      content:
        "As we’ll see later, the final signature is actually made up of two different parts, or values, known as (bold)(r,s)(bold). (bold)S(bold) is what we actually solve for with the large formula highlighted above (aka the generation algorithm); the second value, r, comes from the random private key (k). In fact, (italics)(bold)r(bold) is the (bold)x-coordinate(bold) of the (bold)random public key(bold)(italics) derived from the random private key (k):",
    },
    {
      type: "image",
      src: "/articles/ECDSA/ECDSA2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Following the above, we go from our private random key, to our public random key (by multiplying (k) with the (linkpagehttps://river.com/learn/terms/g/generator-point/)generator-point constant G(linkpage)); then, from our random public key, we extract & save only the x-coordinate (which we’ll call (r)).  This means we now have the r represented in the signature algorithm. ",
    },
    {
      type: "paragraph",
      content:
        "However, we’re not done as (k) provides us a pathway to derive another variable required: the multiplicative inverse (k-1) Given (k), we can also derive its multiplicative inverse which is mentioned in the formula above; it’s worth noting that finding the multiplicative inverse of a modulo number is fairly complicated & outside of the scope of this article. ",
    },
    {
      type: "paragraph",
      content:
        "Starting with just (k), a private random key, we were able to derive the two highlighted variables in the aforementioned equation:",
    },
    {
      type: "image",
      src: "/articles/ECDSA/ECDSA3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content: "(bold)2. Provide Signing Key(bold) (e, eG)",
    },
    {
      type: "paragraph",
      content:
        "Now that we’ve sprinkled in entropy with our randomized keypair, we’ll move onto the most operationally dangerous part of the process: signing/inserting our (bold)(italics)private(italics)(bold) key. It goes without saying, be (italics)extremely(italics) diligent & careful when entering your private key anywhere - it’s the equivalent of your bank password. ",
    },
    {
      type: "paragraph",
      content:
        "The signing key is itself also, hopefully not surprisingly, a 32-byte private key, aka, a point on the elliptic curve. For generating a signature all we need is the private key (e); however, as you’ll see, it’s the public key (eG) that’s used to later verify the signature - taking advantage of the asymmetrical security offered by keypairs. ",
    },
    {
      type: "image",
      src: "/articles/ECDSA/ECDSA4.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "For now, all we need is our private key (e), which if you see the diagram above, is multiplied by (italics)r(italics), the x-coordinate of the public key derived from the random private key (k). ",
    },
    {
      type: "paragraph",
      content:
        "Following the variables previewed, this leaves us with a single variable left to fill: the actual message we’re signing (m) &, more importantly, its hashed equivalent H(m). ",
    },
    {
      type: "paragraph",
      content: "(bold)3. Provide Message(bold) (m, H(m))",
    },
    {
      type: "paragraph",
      content:
        "The final, remaining variable is of course none other than the message we’re signing. The message can be anything in hexadecimal format, &, indeed, digital signatures are used for signing infinite types of data. In Bitcoin, however, the message is the (italics)raw transaction itself(italics) altered according to the attached SigHash flag . ",
    },
    {
      type: "paragraph",
      content:
        "Parsing & reconstructing Bitcoin transactions prior to signing them is arguably one of the most involved & complicated processes in all of Bitcoin development. We’ll leave that to another article. Today, we’re only going to cover generating digital signatures using a plaintext message (in hexadecimal format). For example, let’s say we wanted to sign the message “hello” (or whatever phrase you’d like).",
    },
    {
      type: "paragraph",
      content:
        "We first need to go from string (specifically ascii) to hexadecimal - that gives us the message (m). However, as you see above, generating a signature doesn’t require a message but rather a hash of that message (seen as h(m) or z).",
    },
    {
      type: "paragraph",
      content:
        "When people discuss using a digital signature with a certain hash, (italics)(bold)this(bold)(italics) hash selection is what they mean. In Bitcoin specifically the message is hashed with a hashing algorithm called (linkpagehttps://www.bitscript.app/hashingAlgorithms)HASH256(linkpage). So, using our (linkpagehttps://www.bitscript.app/hashCalculator)hash calculator(linkpage), make sure that the input is set to “string” & the hashing algorithm is set to HASH256; once done, type in whatever pre-hashed message (or “preimage”) you’d like to sign in the text area - below, in the output area, you’ll see a 32-byte hash. Below is a summary of this process:",
    },
    {
      type: "image",
      src: "/articles/ECDSA/ECDSA5.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "With that, we finally have every single variable we need to generate a digital signature: a source of randomness (random/ephemeral key), a source of authenticity (signing key) & a hashed message. ",
    },
    {
      type: "paragraph",
      content: "(bold)4. Insert Into Function Above(bold)",
    },
    {
      type: "paragraph",
      content:
        "With every variable now calculated, it should be straight-forward to plug each value into the formula above; however, hopefully you inuitied that the typical math operations you’re used to (mainly addition & multiplication) are not so straight-forward since they’re technically operations over a finite field defined by the secp256k1 elliptic curve. If that seems complicated, well, that’s because it is. ",
    },
    {
      type: "paragraph",
      content:
        "In another article we covered elliptic curves in-depth which included an in-depth look into how normal math operations work over a finite field. It’s highly recommended you read that article alongside this one to better understand the steps below; again, all we’re doing now is simply plugging-in the variables we’ve generated & derived below:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. Multiply the signing key (e) & the x-coordinate of the randomized public key (r)",
        },
        {
          type: "numbered-item",
          content:
            "2. Add the hashed message (z) to the result of the previous step (e*d)",
        },
        {
          type: "numbered-item",
          content:
            "3. Multiple the inverse of the randomized public key (k) & the previous step",
        },
        {
          type: "numbered-item",
          content:
            "4. Perform the modulo operation over the secp256k1 constant (p)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Assuming everything is done carefully & correctly, this meticulous process yields the value of (bold)(s)(bold), completing our digital signature, which now consists of the pair (bold)(r, s)(bold). Remember, (r) was one of the very first variables we derived, & now, joined by “s,” it completes the two variables to make up a cryptographic digital signature.",
    },
    {
      type: "paragraph",
      content: "(bold)DER Format & Beyond(bold)",
    },
    {
      type: "paragraph",
      content:
        "With (r,s), we finally have generated a full digital signature - but the journey doesn’t end just yet. In fact, if you were to check for a digital signature in the deserialization tool, you would (bold)(italics)not(italics)(bold) find a digital signature that matches this coordinate-pair format. We’ll leave it for the very next article, but the final, crucial step to generating a digital signature correctly involves reformatting the signature to adhere to the Distinguished Encoding Rules (DER).",
    },
  ],
};

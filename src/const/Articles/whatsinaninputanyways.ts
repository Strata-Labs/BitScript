import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const WhatsInAnInputAnyways: ArticleViewProps = {
  module: "Legacy Transaction",
  section: "Inputs",
  published: "Nov. 4th 2023",
  title: "What's In An Input Anyways",

  description:
    "An overview of Legacy Transaction Inputs in the context of Bitcoin transactions.",

  href: "/lessons/What's In An Input Anyways",
  isLocked: true,
  itemType: "article",
  lesson: 2,
  googleLinkBigScreen:
    "https://docs.google.com/document/d/e/2PACX-1vRhrRH6W7QpY9J8b0XADm7ccMSoVnqJ6U8IFWL7h-fJfLxug1OHssHxMSOdnm6RivUGUm186T_MqyQ0/pub?embedded=true",
  googleLinkSmallScreen:
    "https://docs.google.com/document/d/e/2PACX-1vTsTD2oELedJNfPvwWQnogW4V35_Lq7aL1qPUVA9uxg-5NIjyaqsp0WfTDH03gOZm5H-Xw4z1Yccypj/pub?embedded=true",
  content: [
    {
      type: "main title",
      content: "An Overview On Legacy Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "It can’t be stated enough that your understanding of transactions is incomplete until you fully grasp the two data fields at the center of it all: Inputs & Outputs. Outputs, with fewer & simpler fields (such as ‘amount’) are inherently easier to understand. Inputs, however, are notoriously complicated & are made even more confusing when SegWit is included in the discussion. Today, therefore, the goal is to review & demystify Inputs.",
    },
    {
      type: "paragraph",
      content:
        "Specifically, we’ll focus on a Legacy Input as we’ll cover SegWit complications later on - below is a handy visual for what we’ll be covering:",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/Image1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content: "What’s In An Input Anyways?",
    },
    {
      type: "paragraph",
      content:
        "An input, as the name implies, is some or all of the Bitcoin balance that is going (bold)(italics)into(italics)(bold) a particular transaction; it might be useful to think of it as the transaction spending balance. To “create an input” or “spend Bitcoin” you essentially need to accomplish two different things:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Point to the Bitcoin you claim you received(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Cryptographically prove you received it(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "By inspecting each of these steps further we can derive each of the five fields above. Starting with the first objective, how exactly do we “point to Bitcoin received?” As it turns out, that can also be broken down into two different steps (which will lead us to our first two fields):",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1.1. Point to the specific (italics)transaction(italics) that contains the unspent output (Bitcoin received)",
        },
        {
          type: "numbered-item",
          content:
            "1.2. Point to the specific (italics)unspent output(italics) you’re spending",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Remember that an unspent output, or UTXO, is a “chunk” of unspent Bitcoin. By pointing to the transaction & then the specific output, we’re now providing enough data to specify a single previously-unspent output: this is the first main part of an input. Of course anyone can point to a mined transaction & unspent output; so we clearly need more data to actually spend it, which brings us to the second part.",
    },
    {
      type: "paragraph",
      content:
        "To spend an input we must cryptographically prove that we are indeed the rightful owners of that unspent transaction output (again, more commonly seen UTXO).",
    },
    {
      type: "title",
      content:
        "(italics)So How Do You Cryptographically Prove You’re The Owner Of The Selected UTXO?(italics)",
    },
    {
      type: "paragraph",
      content:
        "This question is essentially at the heart of one of the key features of Bitcoin & is therefore discussed over a series of Lessons earlier on (in case you’re skipping around); however, below we’ll review a short-answer & a more technically-accurate long answer. ",
    },
    {
      type: "title",
      content: "(italics)Short Answer(italics)",
    },
    {
      type: "paragraph",
      content:
        "The short-answer is that elliptic curve cryptography based (bold)digital signatures(bold), the cryptography primitive, is behind the core mechanic used to prove ownership of unspent transaction outputs. A digital signature is used to mathematically prove that you signed for a message (in Bitcoin, the ‘message’ is the unsigned transaction) with a private key by only revealing the public key. This digital signature is used to prove that you own the private key that matches with the public key a UTXO is assigned by signing a transaction. ",
    },
    {
      type: "paragraph",
      content:
        "Digital signatures are arguably both the most important & most challenging part of grasping the fundamentals behind transactions - we highly, highly recommend heading over to the Cryptography section (whenever it’s updated).",
    },
    {
      type: "title",
      content: "(italics)Long Answer(italics)",
    },
    {
      type: "paragraph",
      content:
        "The long answer is that Bitcoin comes packed with a scripting language (more commonly known as ‘script’ or ‘bitcoin script’). This scripting language, which also deserves its own series of articles & is therefore merely previewed here,  is made up of op_codes (think functions/commands/operations) & pushed data (usually public keys, hashed public keys, lock scripts etc..). Every input & output has a script. In the former, an Input, it’s known as the sigScript (or unlock script) & in the latter, an Output, it’s known as the pubKeyScript (or lock script). ",
    },
    {
      type: "paragraph",
      content:
        "When a node checks if a transaction is valid, it does so by concatenating the scriptSig from an input with the scriptPubKey from an unspent output & processing the newly combined script; if there’s a single leftover value of 0x01 (equivalent to ‘true’) after the stack is processed, then the transaction is considered valid.",
    },
    {
      type: "paragraph",
      content:
        "In summary, when we say we need to cryptographically prove ownership of a UTXO, we mean (bold)“provide a scriptSig that, when combined with the provided unspent output pubKeyScript, returns a valid transaction;”(bold) this almost always involves a public key & signature along with op_codes such as op_checksig or op_checkmultsig, this isn’t, however, (bold)(italics)strictly(italics)(bold) the case. ",
    },
    {
      type: "paragraph",
      content:
        "Now that we’ve fetched a transaction & singled-out an unspent output, what comes next? ",
    },
    {
      type: "paragraph",
      content:
        "Providing a scriptSig. Except, Bitcoin is really strict when working with dynamic data - anytime you’re working with something that could vary in size, you’ll always have to first write in the (bold)size(bold) of the upcoming data. This means that the opening question is also answered with a minimum of two data fields:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "2.1 - The (italics)size(italics) of the signature / unlock script (sigScriptSize)",
        },
        {
          type: "numbered-item",
          content: "2.2 - The actual signature / unlock script (sigScript)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "We now know four of the five possible data fields (the transaction, the output, the size of the scriptSig & the scriptSig) when describing an input.",
    },
    {
      type: "paragraph",
      content:
        "The last & final data field in an Input is a relative timelock pointer to the earliest possible time the input can be spent / confirmed on-chain. Just as every transaction has a locktime, every specific input can also have a locktime; this is known as the nSequence & is, once again, the fifth & final field used in an Input. ",
    },
    {
      type: "paragraph",
      content:
        "Again, if this is your first time digging into the mechanics of Bitcoin don’t get discouraged by the complexity here - we’re quite literally covering everything involved in a modern transaction.",
    },
    {
      type: "paragraph",
      content:
        "With the “why” answered behind the five fields, we’ll now review every step of an input & check that it squares with all the logic we discussed above; the best way to do this, of course, is to inspect an actual mainnet transaction:",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/image2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "We’ll be using the first Example (labeled Direct Transfer (p2pkh)) found in the (linktransactions)Deserializer(link) tool pasted above - feel free to follow along by opening the tool side-by-side.",
    },
    {
      type: "paragraph",
      content: "An Input Byte-By-Byte",
    },
    {
      type: "paragraph",
      content: "(bold)Input Count(bold) (VarInt)",
    },
    {
      type: "paragraph",
      content:
        "Before providing the data for any one specific Input, we first need to signal (italics)how many(italics) Inputs any client can expect to parse; therefore, the very first Input field is actually a (bold)counter(bold) of how many inputs are in the transaction. This is the first time that there’s not a fixed amount of bytes but instead something called a VarInt. A VarInt, as the name implies, stands for Variable Integer, which is the standard format that Bitcoin uses for signaling size  (this also has its own article as VarInt is seen throughout Bitcoin but we’ve summarized the most important info below):",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/image3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "In the table above you’ll see the rules for using VarInt. As you’ll note, the size of VarInt itself varies (thus the name); If the integer value needed is greater than 252 then we’ use an extra byte as a flag to signal how many (italics)additional(italics) bytes are needed for this VarInt instance.",
    },
    {
      type: "paragraph",
      content:
        "In regards to our example transaction, the screenshot below you’ll notice that the transaction shows 0x01, which is 1-byte, this signals that this transaction has a single input:",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/image4.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Now that we know how many Inputs we need to parse through (in this case one), we can review the data fields needed (bold)(italics)per individual(italics)(bold) Input. In the next Lesson in this series we’ll do just that -  parse through the five input fields in the example transaction we've been working through.",
    },
  ],
};

import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const WhyTaproot: ArticleViewProps = {
  module: "Taproot Transaction",
  section: "Prerequisites & Review",
  published: "Nov. 5th 2023",
  title: "Why Taproot",
  shortHandTitle: "/lessons/why-taproot",
  description:
    "Discover Bitcoin's game-changing upgrade, enhancing privacy, enabling smart contracts, and reducing fees in Bitcoin.",
  href: "/lessons/Why Taproot",
  isLocked: false,
  itemType: "article",
  lesson: 4,
  googleLinkBigScreen:
    "https://docs.google.com/document/d/e/2PACX-1vSyjDlsM_4jkEuHHN1d-mvwmSj4fwQFer9phQYKs45w8Mw6DBD6yWVWBNKg3ImgQvXONDPhDH5fcKL8/pub?embedded=true",
  googleLinkSmallScreen:
    "https://docs.google.com/document/d/e/2PACX-1vSYG9ooussMRKlJHIsq-nZj0bdY1y3yUaQTdo_80GlbVGkQk_x5UPBDlwgMWt2jovekzd2QkuHG_WNM/pub?embedded=true",
  content: [
    {
      type: "main title",
      content: "Addressing Efficiency, Privacy & Smart Contracts",
    },
    {
      type: "paragraph",
      content:
        "The world, let alone the world of cryptocurrency, looks quite differently than it did in 2017, when SegWit was officially activated through a user-activated softfork. Back then, the priority was supporting cheap, scalable payment solutions through exciting experiments like the Lightning Network; back then, Ethereum had (italics)yet(italics) to cross $1B in market cap, a theory in testing put forth by Vitalik.  ",
    },
    {
      type: "paragraph",
      content:
        "Taproot, officially activated at block height 709632 (Nov. 14th, 2021), was a community answer to lessons learned internally & from other ecosystems since the SegWit update. It’s undeniable that Taproot is the (bold)(italics)single most important & exciting update to Bitcoin since SegWit(italics)(bold). And yet, few resources exist that explain what’s happening underneath the hood. Therefore, starting with this Lesson we’re going to exclusively & extensively focus on anything & everything related to Taproot. ",
    },
    {
      type: "paragraph",
      content:
        "To begin, it’s worth explaining why Taproot was activated. Why bother using Taproot over Legacy or SegWit transactions in the first place? What benefits does it bring to the table?",
    },
    {
      type: "image",
      src: "/articles/why taproot/Image-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "This is what the main Taproot BIP claims to be the reasons why Taproot should’ve been implemented - let’s see if they hold up.",
    },
    {
      type: "paragraph",
      content:
        "As a disclaimer, if this is your very first time interacting with Taproot It’s fully expected that the reasons are currently out of your reading grasp. The point of front-loading the benefits first is to introduce all the new terms, math & logic through the perspective of (italics)how(italics) they connect to everything else. It’s encouraged that you read the section below once, remember some of the words, & then come back to revisit it as you make your way through the series.",
    },
    {
      type: "paragraph",
      content: "(bold)Increases On-Chain Privacy(bold)",
    },
    {
      type: "paragraph",
      content:
        "Every Bitcoiner, from sovereign individuals to compliant entities should care about on-chain privacy. So it’s little surprise that this is one of the claims made for supporting & using Taproot. As we’ll see in the series, this claim is certainly supported as on-chain privacy is increased in many ways:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Uniform Transactions(bold)",
        },
        {
          type: "paragraph",
          content:
            "The killer privacy feature, without a doubt, is that despite the vast, vast data space a developer has to work with, a Taproot unspent transaction output (utxo) looks exactly the same. A Taproot output can be meant to spent as a simple direct transfer from one public key to another, or it could contain thousands of individual scripts in an ocean of complexity & choice - in both scenarios they look exactly the same: a 64-byte | 128-character hexadecimal string / byte array.",
        },
        {
          type: "paragraph",
          content:
            "If you click to the Taproot - Commit example in our deserializer & find the Output ScriptSig, you would see the following: ",
        },
        {
          type: "image",
          src: "/articles/why taproot/Image-2.png",
          alt: "Transaction Inputs",
        },
        {
          type: "paragraph",
          content:
            "Just from the above, it’s impossible to tell what the intentions are with this output. As you’ll see, every Taproot output has, by default, at least two different ways (or paths) of being spent: a key path (spent by a single or aggregated key - similar to a direct transfer) or a script path (spent by either a key or script) .",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Schnorr Aggregation(bold)",
        },
        {
          type: "paragraph",
          content:
            "Speaking of an aggregated key, one of the fundamental cryptography primitives that powers Taproot is something called a Schnorr signature. As we’ll see when we review the Schnorr Signature BIP & the different flavors of Schnorr, this allows us to create public keys that are single-signers or multiple-signers that look the same; meaning that just by looking at a public key it’s (italics)impossible to tell if it belongs to a single user or to a party of signers(italics). ",
        },
        {
          type: "paragraph",
          content:
            "While the previous benefit offers obscurity for both key paths & script paths, Schnorr signatures are responsible for further increasing on-chain privacy by hiding whether key path that’s later consumed is owned by one or many entities.",
        },
        {
          type: "numbered-item",
          content: "(bold)3. MAST-Hidden Scripts(bold)",
        },
        {
          type: "paragraph",
          content:
            "Just as Schnorr signatures offer further privacy down one of the two main paths (key path), the script path part of a Taproot output also has another layer of privacy. While BIP 341 defines the script path as a “path,” a more technically accurate name would be a “Merkle tree of keys or scripts.” ",
        },
        {
          type: "paragraph",
          content:
            "This is because the script path, that’s default with any Taproot output, is not necessarily a single script but rather an entire tree of scripts. As we’ll see later on, consuming only one of the branches in the tree can be spent (italics)without revealing the other branches(italics). This means that a script path can hold 2^128 different ways to lock a Bitcoin output but only the branch consumed is revealed on-chain - no other data about the other branches is ever revealed. ",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Understandably, it’s likely very hard to grasp everything mentioned above the first read through, again, that’s expected. The idea here is to start our journey by understanding what the Taproot update aimed to achieve.",
    },
    {
      type: "paragraph",
      content: "(bold)Extends Smart Contracts(bold)",
    },
    {
      type: "paragraph",
      content:
        "The second key benefit behind Taproot is the implementation (or further support, depending who you ask) of on-chain smart contracts. As we previewed in the previous section, (italics)every(italics) Taproot output has a built-in key path & script path; & just like the last section on privacy, both paths offer benefits in the terms of smart contract functionality.",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. MAST Tree of Keys & Scripts(bold)",
        },
        {
          type: "paragraph",
          content:
            "It goes without saying that leaping from inputs with a (italics)single(italics) script to inputs with a (italics)Merkle tree(italics) of scripts is an exciting prospect. Holding up to 2^128 different “possibilities” (or Tapleave branches as they’re called), it’s undeniably that the tree structure massively grows the data space, or contract space, that comes with a single output.",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Schnorr Aggregated Multi-Sig(bold)",
        },
        {
          type: "paragraph",
          content:
            "On the other hand, the key path name is deceptively simple since Schnorr signatures are involved. Previewed above as well, Schnorr signatures are able to linearly aggregate multi-sigs into a single signature - which means that every key path has a robust multi-sig built-in (italics)independent of the script path(italics).",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "As we can hopefully see more clearly, (bold)(italics)both(italics)(bold) paths have some sort of feature that can be considered smart contract functionality being extended. Two benefits explored now, only one to go before we pause & move on to the Taproot basics.",
    },
    {
      type: "paragraph",
      content: "(bold)Efficiency & Lower Fees(bold)",
    },
    {
      type: "paragraph",
      content:
        "Last, & maybe not as exciting as the first but still appreciated, is the benefit that comes in efficiency that is ultimately reflected in lower fees. As one of the most common criticisms leveled at Bitcoin, it’s imperative that, despite any additional features added, transaction fees stay as low as possible. Once again, as we’ll see below, the design of Taproot is deeply considerate of fees in both paths as well as the general design.",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Cheaper Multi-Signature(bold)",
        },
        {
          type: "paragraph",
          content:
            "We’ve mentioned twice now the aggregate signature & batched validation that comes out of the Schnorr-derived multi-sigs. In addition to the privacy that happens here, it’s worth pointing out that whether there’s a single or hundreds of signers, the size of the signature is the same. Instead of paying the fees to commit a transaction with hundreds of individual signatures (which would be an enormous transaction), fees are saved with a public key of fixed size.",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Hides Unexecuted Script When Unlocking(bold)",
        },
        {
          type: "paragraph",
          content:
            "The script path also benefits in a similar way. Mentioned in BIP 341, it’s preferred that developers use multiple branches as opposed to multiple if/then conditionals in a single transaction. This again saves transaction space & fees in a similar way: instead of a transaction requiring the footprint of a conditional script’s entire unexecuted branch, with a MAST structure we can save transaction space by only revealing the executed logic.",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Reduces On-Chain Print When Locking(bold)",
        },
        {
          type: "paragraph",
          content:
            "On the other hand, when creating the script path, it’s immediately clear how we’re saving transaction space: instead of providing all possible scripts at once, we’re merely providing a single hash that’s representative of the Merkle tree.",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "And there we go! Along with the features that contribute to privacy, transaction fees are saved as the on-chain transaction space is purposefully kept as small as possible.",
    },
    {
      type: "paragraph",
      content: "(bold)Onwards To The Basics of Taproot(bold)",
    },
    {
      type: "paragraph",
      content:
        "Hopefully we’re now convinced that Taproot is at least a very powerful upgrade worth exploring. The next article we’ll introduce the basics of Taproot, afterwards & throughout the series, we’ll see how each of these benefits springs to life from the design implemented.",
    },
  ],
};

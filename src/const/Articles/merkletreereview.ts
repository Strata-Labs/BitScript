import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const MerkleTreeReview: ArticleViewProps = {
  module: "Taproot Transaction",
  section: "ScriptPath",
  published: "Nov. 10th 2023",
  title: "Merkle Tree Review",
  shortHandTitle: "/lessons/merkle-tree-review",
  description:
    "Delve into the role of Merkle Trees in the ScriptPath of Taproot transactions.",
  href: "/lessons/Merkle Tree Review",
  isLocked: false,
  itemType: "article",
  lesson: 6,
  googleLinkBigScreen:
    "https://docs.google.com/document/d/e/2PACX-1vRlfYPJ0U6shZ8ACDEeG23S6_MvPv7JyM2aCYu8OQBVMD7EMgst_5NrzuspBSPchi0rw73fpcXaexJr/pub?embedded=true",
  googleLinkSmallScreen:
    "https://docs.google.com/document/d/e/2PACX-1vRJ3IkHJhQ-R7nnN7YR7BE06bIMSE7-PyTTLITqC7GbwnW6mFDgrUVxRXM1advv7EsE8A2Y2kmY0aHl/pub?embedded=true",
  content: [
    {
      type: "main title",
      content: "The Data Structure Responsible For The ScriptPath",
    },
    {
      type: "paragraph",
      content:
        "It’s worth remembering that very few ideas are truly original. This is particularly true not just for Taproot, but for the (italics)fundamentals(italics) that provide Taproot with its many benefits. As we saw earlier, one of these fundamentals is the Schnorr Signature, which provides the KeyPath with all of its utility; it’s mathematically responsible for enabling the possibility to sign with a single, multi, or weighted signature. ",
    },
    {
      type: "paragraph",
      content:
        "Today, we’re going to focus on the other default path available to a spender: the ScriptPath. And much like the KeyPath had Schnorr Signatures as the building block, the ScriptPath (italics)also(italics) has a mathematical foundation critical to our understanding: (bold)Merkle Trees(bold).",
    },
    {
      type: "paragraph",
      content:
        "ScriptPaths are (italics)not(italics), as the name implies, simple, singular scripts - but rather a Merkle tree of options. Merkle trees themselves, however, aren't necessarily new or original. In fact, Merkel Trees already exist in other parts of Bitcoin & multiple BIPs proposed leveraging them in unique ways. The math, as we’ll see, is relatively straight-foward, it’s really the nuisances that Taproot includes in traversing up the tree that makes the ScriptPath a bit tough to digest. ",
    },
    {
      type: "title",
      content: "Merkle Tree Overview",
    },
    {
      type: "paragraph",
      content:
        "We have multiple Lessons earlier on in this series that dive-deep in-detail into the why, the history, etc… on Merkle Trees. Today, we specifically care to understand how a Merkle Tree  is used to construct the ScriptPath part of a Taproot output, so our “basics” review will be purposefully compact.",
    },
    {
      type: "paragraph",
      content: "(italics)Why Use A Merkle Tree?(italics)",
    },
    {
      type: "paragraph",
      content:
        "(bold)Because a Merkle tree, or binary hash tree, is not used to store, but rather to efficiently verify that data exists within a data set without revealing said data.(bold)",
    },
    {
      type: "paragraph",
      content:
        "The most common mistake people make when first learning about a Merkle tree is assuming that it’s useful for getting & setting data - this is not the case. Merkle trees are useful because the output itself is very data-lite (a single hash) & because it provides data validation without (italics)revealing the entire data set(italics). Originally pioneered by one Ralph (bold)Merkle(bold) in his eminent 1987 paper (linkpagehttps://people.eecs.berkeley.edu/~raluca/cs261-f15/readings/merkle.pdf)“A Certified Digital Signature,”(linkpage) his goal was to address the problem of efficiently verifying the authenticity of large sets of data without the need to store or transmit the entire dataset.",
    },
    {
      type: "paragraph",
      content: "(italics)What Exactly Is It?(italics)",
    },
    {
      type: "paragraph",
      content:
        "It’s a data structure, programmable in any language, that is organized into a binary tree where each leaf node represents a piece of data & each non-leaf (internal) node is a cryptographic hash of its children nodes. The topmost node, known as the (bold)root(bold), is a hash of (italics)all(italics) the data (we’ll keep this short because below we’re going to provide additional visual context). ",
    },
    {
      type: "paragraph",
      content: "(italics)Where Else Are They Used In Bitcoin?(italics)",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Transaction Verification(bold)",
        },
        {
          type: "paragraph",
          content:
            "The most well-known use of Merkle trees in Bitcoin is to verify transactions in a block. Instead of downloading & verifying every transaction in the entire block, a simplified Merkle tree structure is used to create a compact representation of all the transactions. A block header includes the Merkle root of these transactions. By comparing this Merkle root with the Merkle path provided in a block's header, nodes can quickly confirm that a specific transaction is included in the block without downloading & checking every transaction.",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Witness Data(bold)",
        },
        {
          type: "paragraph",
          content:
            "With the introduction of Segregated Witness (SegWit), Bitcoin also uses Merkle trees to organize & validate witness data (signatures and scripts). The witness data is structured into a Merkle tree, & the Merkle root is included in the OP_RETURN of the blocks Coinbase transaction. This allows for the efficient pruning of witness data when it's not needed for validation, reducing the size of blocks. When a transaction spends SegWit outputs, the sender provides a Merkle path to prove the inclusion of the witness data.",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Last but not least, as mentioned, this is far from the first BIP to leverage this data structure; both (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0114.mediawiki)BIP114(linkpage) & (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0117.mediawiki)BIP117(linkpage) are named as inspirations in the “Design” part of the Taproot BIP (341).",
    },
    {
      type: "paragraph",
      content:
        "Now done with a brief review on why Merkle Trees are needed & how they’re currently used in Bitcoin, it’s time to turn into the implementation “how” - what’s the layout & how do Merkle Trees work?",
    },
    {
      type: "title",
      content: "Merkle Tree Layout",
    },
    {
      type: "paragraph",
      content:
        "Hopefully, by now, it’s been made clear that the goal of a Merkle Tree is not storage, but rather, efficient verification in storage - can we quickly validate that some hashed data is a part of this data set? At the highest-level, this implies two main functions as requirements for a Merkle tree:",
    },
    {
      type: "list",
      content: [],
    },
    {
      type: "paragraph",
      content:
        "Before we move onto a simple Construction example, let’s(quickly)  review the common structure & terminology found in a Merkle Tree.",
    },
    {
      type: "image",
      src: "/articles/merkle tree review/Image1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "The diagram above layouts the three terms we’ll come across when working (either construction or verifying) with Merkle Trees. In this next section, we’ll go through an easy example of constructing a Merkle Tree but not strictly how it’s done in Taproot - that’s a bit more nuisance so we’ll save it for the next lesson.",
    },
    {
      type: "title",
      content: "Merkle Tree Construction",
    },
    {
      type: "paragraph",
      content:
        "Let’s say that, for some reason, we want to create a Merkle Tree that contains the data: (bold)[0,1,2,3](bold). That’s it, only four string representations of integers. With our data, to arrive at a Merkle Root, which is how we complete our tree, we’ll need to follow three steps:",
    },

    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Hash Data To Create Merkle Leaves(bold)",
        },
        {
          type: "paragraph",
          content:
            "The first step is to create hashes for all items in the original data. We’re using (bold)[0,1,2,3](bold). Head over to the (linkhashCalculator)Hash Calculator(link), set the setting on “String,” the hashing algorithm to HASH256 & hash each number one-by-one; each time you’ll get a 32-byte hash in return. In aggregate, these are now no longer known as our original data but as the (bold)Merkle Leaves(bold):",
        },
        {
          type: "image",
          src: "/articles/merkle tree review/Image5.png",
          alt: "Image Alt Text",
        },
        {
          type: "paragraph",
          content:
            "Though we’re now starting our Merkle Tree, our tree is complete when we’re left with a single hash, known as the Merkle Root. So, up next, we need to do some work with turning our Merkle Leaves into Merkle Branches.",
        },
        {
          type: "numbered-item",
          content:
            "(bold)2. Concat & Hash Merkle Leaves To Create Merkle Branches(bold)",
        },
        {
          type: "paragraph",
          content:
            "As you read in the earlier Merkle Tree section or noticed in the visual above, the single Merkle Root is (bold)(italics)always(italics)(bold) the top of the tree & the N Merkle Leaves are (bold)(italics)always(italics)(bold) the bottom of the tree. It’s the middle chunk, the branches, or depth of the tree where the majority of the work is performed.",
        },
        {
          type: "paragraph",
          content:
            "At each level of depth, start from right-to-left the following algorithm is ran:",
        },
        {
          type: "secondary-numbered-item",
          content:
            "1. Concat Merkle Leave | Branch (N) with Merkle Leave | Branch (N + 1)",
        },
        {
          type: "secondary-numbered-item",
          content:
            "2. Hash the result with the same hashing algorithm we used for our leaves (in our particular case that’s HASH256)",
        },
        {
          type: "secondary-numbered-item",
          content:
            "3. Repeat steps 1. & 2. for all pairs of remaining items in this level of the tree",
        },
        {
          type: "image",
          src: "/articles/merkle tree review/Image3.png",
          alt: "Image Alt Text",
        },
        {
          type: "paragraph",
          content:
            "In our specific example, since we start with four (4) leaves, we only have single step between our branch & our root (which we’ll see next); but hopefully it’s not too hard to imagine what happens if we started with eight (8), or sixteen (16) leaves instead (we’d simply have two & three rounds of branch hashing respectively). ",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Repeat Until Merkle Root Is Derived(bold)",
        },
        {
          type: "paragraph",
          content:
            "By performing Step.2 correctly on we eventually arrive at a single value at the top, as expected: (bold)it is this single value that we consider the Merkle (italics)Root(italics)(bold). Our example below is now shown top-to-bottom - you should be able to follow this manually & get the same result!",
        },
        {
          type: "image",
          src: "/articles/merkle tree review/Image4.png",
          alt: "Image Alt Text",
        },
        {
          type: "paragraph",
          content:
            "Now, imagine if instead of starting with our original data as integers, we started with PubKeyScripts - nothing would be different in the process. (bold)(italics)That is exactly what we do when creating the ScriptPath(italics)(bold).",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "And that’s it for todays’ lesson! As promised, it was a brief review on Merkle Trees as we prepare to stuff Merkle Leaves with script instead of integers; as you’ll notice, the process will stay exactly the same, the *only* difference will be some very Taproot specific extra concatenations at every step along the way. Afterwards, once we’re done constructing our tree & understanding how it converts into a Taproot output, we’ll finally turn our attention to spending a Tapleaf in the ScriptPath.",
    },
  ],
};

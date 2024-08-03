import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

//TODO: I think there is a bug in the linkpage dataformatter. it doesn't account for an extra ()

export const GeneratingTaprootPubKey2: ArticleViewProps = {
  module: "Taproot Transaction",
  section: "Generating P2TR Output",
  published: "August 1st 2024",
  title: "Generating A Taproot PubKey (Pt.2)",
  description: "Internal Key, ScriptPath, & Putting It All Together",
  href: "/lessons/Generating A Taproot PubKey (Pt.2)",
  isLocked: false,
  itemType: "article",
  lesson: 8,
  googleLinkBigScreen: "",
  googleLinkSmallScreen: "",
  content: [
    {
      type: "main title",
      content: "Generating A Taproot PubKey (Pt. 2)",
    },
    {
      type: "subtitle",
      content: "Internal Key, ScriptPath, & Putting It All Together",
    },
    {
      type: "title",
      content: "Steps Review",
    },
    {
      type: "paragraph",
      content:
        "In our opening article, (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.1)Generating A Taproot Pubkey (Pt. I)(linkpage), we defined & set out to build our \"family vault\" taproot output. Throughout that, we learned about the TagHash process & generated the four TapLeafs we'll now use for each of our four possible spend paths. With these TapLeafs completed, it marked the end of the first two of four steps required for generating a P2TR output | taproot key. In this article, as a quick reminder, we'll be covering the following next two steps in our process:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "3. Generating The ScriptPath Root",
        },
        {
          type: "numbered-item",
          content: "4. Tweaking The Internal Key",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "The first section we'll review here, the third step cumulatively, involves the merkilization process of our four tapleafs that will result in the root of the scriptpath; the second section, the fourth step cumulatively, involves the final two steps in which we'll use the internal key to derive the taproot key (or p2tr output).",
    },
    {
      type: "title",
      content: "Generating The ScriptPath Root",
    },
    {
      type: "paragraph",
      content:
        "As we've stated throughout, these two articles are the culmination of many prerequisites. For the scriptpath, the fundamental data type you must have a grasp on is the merkle tree; if that sounds even vaguely unfamiliar, then I suggest you go back & read the piece linked (linkpagehttps://www.bitscript.app/lessons/Merkle%20Tree%20Review)here(linkpage) first. As a two-sentence reminder, merkle trees are a common data structure used specifically for efficiency in data verification; a merkle tree, which is most often but not always a symmetrical binary tree, stores hashes of data, not the actual data itself (thus why it's computationally lite). Once created, verification of data is conducted through a process called a merkle proof - as a preview, we'll be using this when spending from the scriptpath.",
    },
    {
      type: "paragraph",
      content:
        "Regardless, the key concept we care about today is how merkle trees are (bold)created.(bold) Again, we won't review it in-depth here, but, in short, this process involves concatenating & hashing leaves, from left-to-right, traversing up the tree until a single hash remains (known as the (bold)root(bold)). This is, of course, the standard way of creating a merkle tree; however, as you've seen throughout, the scriptpath always introduces some nuisance in the form of TagHashing.",
    },
    {
      type: "paragraph",
      content:
        "Our situation, while extremely simplified with only four tapleafs, should still highlight the core process involved.",
    },
    {
      type: "paragraph",
      content: "repeated step (until we reach the root)",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "1. Order each pair of hashes",
        },
        {
          type: "numbered-item",
          content: "2. Concatenate each pair of hashes",
        },
        {
          type: "numbered-item",
          content: "3. TagHash('TapBranch') each resultant hash",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Traditionally, a merkle tree is completed once the root is reached as it means that there are no more items to concatenate & hash.",
    },
    {
      type: "paragraph",
      content: "Canonical Ordering",
    },
    {
      type: "paragraph",
      content:
        "Assuming you're indeed caught up with merkle trees, then you already know that the order of everything (ie the leaves & branches) is (bold)critical(bold): hashing the same leaves in a different order will yield an entirely different root. So a good first question worth asking, now that we have our four tapleafs, is, how are our four tapleafs & soon-to-be two tapbranches canonically ordered?",
    },
    {
      type: "title",
      content: "Lexicographically!",
    },
    {
      type: "paragraph",
      content:
        "This means that each tapleaf & tapbranch, since they're each arrays of bytes, are compared byte by byte & sorted in ascending order. Below, we can see our four tapleafs now organized in order:",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot PubKey 2/Taproot Ordered.png",
      alt: "Taproot Ordered",
    },

    {
      type: "paragraph",
      content:
        "A key thing to note is that this ordering process is enforced not just with the beginning TapLeafs, but at every level of branches as well (aka as you're traversing up the tree); - without this standard, it's very likely that clients would fail to create accurate merkle proofs.",
    },
    {
      type: "title",
      content: "TagHash Re-visited",
    },
    {
      type: "paragraph",
      content:
        "Just like creating the TapLeaf itself required some odd formatting with the TagHash function, traversing up the Merkle Tree also requires some odd TagHashing.",
    },
    {
      type: "paragraph",
      content:
        "Once four tapleafs are in order we can begin with the actual Merkilization process. Our first step is of course to standardize the four TapLeafs by hashing them all using SHA256(x). Once that's done, we're officially left with our Merkle leaves & can start working up the tree.",
    },
    {
      type: "paragraph",
      content:
        "Like in any Merkle process, we work from left-to-right & therefore start by concatenating H(Spouse) with H(Parents); typically, this concatenation is all that's required to construct a tree, of course, this is Taproot, so some nuisance is involved. As we've previewed before, this step also involves a form of TagHashing introduced in the previous article. As you can likely guess, this time we're going to implement the TapBranch format: TapHash('TapBranch').",
    },
    {
      type: "paragraph",
      content:
        "Keeping in mind the steps outlined above, we'll go through every step required:",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot PubKey 2/TaprootSteps.png",
      alt: "TaprootSteps",
    },
    {
      type: "paragraph",
      content:
        "Following the steps above, you can see how we end up with a single 32-byte array that's a result of TagHashing('TapBranch') the root. Traditionally, this root is considered the last step in a standard merkle tree; however, there's still one single step, or tweak, left before we can call it complete.",
    },
    {
      type: "title",
      content: "Tweaking Internal Key",
    },
    {
      type: "paragraph",
      content:
        "The fourth & last step involved in generating a taproot key comes from tweaking the internal key with the scriptpath merkle root along with additional data. Let's break that down a bit.",
    },
    {
      type: "paragraph",
      content:
        "In the last (3rd) step, the focus was entirely on merkilizing the scriptpath until we were left with a single root. While merkle trees are typically completed once the root is finished, this cannot be said of the scriptpath. There are really two steps here, not one, worth pointing out.",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            '1. TagHash("taptweak") the internal public key concatenated with the TapBranch root',
        },
        {
          type: "numbered-item",
          content:
            "2. Multiply the result times G & add it to the internal key (P)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "We'll dive into both of these steps below, once they're both successfully performed, we'll be left with our single 32-byte Taproot Key that we can paste in a P2TR output.",
    },
    {
      type: "title",
      content: 'TagHash("TapTweak", Internal Key || CDAB)',
    },
    {
      type: "paragraph",
      content:
        "The first step is to run one final TagHash step. This is the first & only time where we'll invoke TagHash(\"TapTweak\"). Additionally, it's worth noting that we also concatenate the internal key with the merkle tree / scriptpath root - the result of the very last TapBranch. The result here is commonly referred to as the tweak value (t).",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot PubKey 2/TapTweak.png",
      alt: "TapTweak",
    },
    {
      type: "title",
      content: "Tweak The Internal Key(Internal Key + TweakKey*G)",
    },
    {
      type: "paragraph",
      content:
        'The very last step we have to take is to now tweak our internal key with the final derived tweak value (t). Again, as we mentioned in the previous article, to "tweak" could mean one or a combination of many operations performed to our 32-byte public key. In this particular case, in our taproot tweak, we perform the following:',
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot PubKey 2/taproot-4.png",
      alt: "Taproot 4 ",
    },
    {
      type: "paragraph",
      content:
        "A simple tweak (t) value & generator (G) point multiplication, followed by an addition to the internal key, is all that's needed.",
    },
    {
      type: "title",
      content: "In Closing",
    },
    {
      type: "paragraph",
      content:
        'We started with an internal 32-byte Bitcoin public key & now we\'re left with a new 32-byte Taproot public key. As we\'ve mentioned a few times now, this taproot public key is actually, literally the only item required in a scriptPubKey output. To use our Taproot public key, or to "create a P2TR output," all we do now is construct a standard output where the scriptPubKey includes a SegWit flag (0x51, signaling Taproot), the size of the "script" (0x20, signaling the length of the key, 32-bytes in hexadecimal), & the actual key itself.',
    },
    {
      type: "paragraph",
      content: "And that's it!",
    },
    {
      type: "paragraph",
      content:
        "We've fully generated a spendable P2TR output with two paths: an internal key path (keypath) & a merkle tree of four spend paths (scriptpath). This marks a major milestone in your understanding of Taproot, however, there's a question I'd like to leave off on to highlight what remains: how does one spend the keypath? Much more complicated, how does one spend one of the scriptpaths?",
    },
  ],
};

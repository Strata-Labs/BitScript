import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const GeneratingTaprootPubKey: ArticleViewProps = {
  module: "Taproot Transaction",
  section: "Generating P2TR Output",
  published: "August 1st 2024",
  title: "Generating A Taproot PubKey (Pt.1)",
  description: "Overview & Example Setup",
  href: "/lessons/Generating A Taproot PubKey (Pt.1)",
  isLocked: true,
  itemType: "article",
  lesson: 11,
  googleLinkBigScreen: "",
  googleLinkSmallScreen: "",
  content: [
    {
      type: "main title",
      content: "Generating A Taproot PubKey (Pt. I)",
    },
    {
      type: "subtitle",
      content: "Overview & Example Setup",
    },
    {
      type: "paragraph",
      content: "(bold)Introduction(bold)",
    },
    {
      type: "paragraph",
      content:
        "We've had to learn quite a few concepts to arrive up to this point, but, today, we're finally going to walk through every step involved in generating a (rather simple) Taproot output. As you'll hopefully see, while the idea of stuffing multiple witness scripts in a Merkle tree & then hiding it all within a public key sounds complicated, the generation process is actually rather simple (note, not necessarily easy, but certainly not as complicated as it's made out to be).",
    },
    {
      type: "paragraph",
      content:
        "To start with, every P2TR output, whether it includes a single unspendable script or 2^128 spending paths, all look like a plain ole' 32-byte public key; these public keys, as you learned (linkpagehttps://www.bitscript.app/lessons/A%20Tale%20of%20Two%20Paths)here(linkpage), contain at least two different spending paths for a UTXO:",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot PubKey/TaprootOutputGraph.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "A Taproot output, seen above, is ultimately a simple a 32-byte | 64-character string of hex;or more specifically, (bold)a taproot public key(bold) (or  P2TR output). As of now, pay-2-taproot outputs are the only outputs with a single public key as the entire pubkeyscript; which means that you can identify a Taproot output in a raw transaction, such as this (linkpagehttps://www.bitscript.app/transactions?transaction=d53b9e0b9e4a0b2e77ad61862a3d385d9748c9b6e6ea402be7efdcafb931d2a7&env=MAINNET)one,(linkpage) because it'll (bold)(italics)always(italics)(bold) follow the same pattern as above: SegWit Flag (bold)(0x51)(bold) + Length of Taproot Output (bold)(0x20 = 32 bytes)(bold) + the KeyPath public key itself.",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot PubKey/TaprootPubKeyScriptFormat.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "Today, we're no longer reviewing the concept but rather digging right into the ultimate question we'll focus on today is:",
    },
    {
      type: "paragraph",
      content: "(bold)How are these Taproot Outputs actually generated?(bold)",
    },
    {
      type: "paragraph",
      content:
        "In case the title didn't give it away, stepping through it all is simple but by no means straight-forward, so it'll be spread out over (bold)two(bold) articles. In this first part, we're going to focus on an overview of all steps involved, lay out an actual use-case narrative, & preview a prerequisite calculation introduced in (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)BIP340(linkpage); in the second part this series, we'll wrap it up by creating our Merkle tree ScriptPath & finally by tweaking our internal public key to generate a Taproot Key.",
    },
    // TODO: create a new style that makes this text light gray
    {
      type: "title",
      content: "Overview",
    },
    {
      type: "paragraph",
      content:
        "Before going through an example step-by-step, it makes sense to take a look before we leap. In our case this means we need to review the high-levels steps first; as you'll see throughout, assuming you're somewhat familiar with script, most of it involves material we've already covered; it's specifically the scriptpath, or the Merkle tree of script options (known as \"tapleafs\"), where we'll spend most of our time.",
    },
    {
      type: "paragraph",
      content:
        "When we set out to generate a taproot public key | a pay to taproot output there are generally four steps we'll need to step through:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Selecting An Internal Key (bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)2. CreatIng Our TapLeafs(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Generating The ScriptPath*(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)4. Tweaking The Internal Key(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "As mentioned, we'll spend the vast majority of our time in step 3. Generating ScriptPath (covered in the next article). From this list the exact requisites for creating a P2TR output become clear:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. A Bitcoin Taproot public key (32-bytes) that you already own, which we'll be known as the (bold)internal public key(bold)",
        },
        {
          type: "numbered-item",
          content:
            "2. All the different spend paths we want to include in the scriptpath expressed as witness scripts (which will in turn be used to create our (bold)TapLeafs(bold))",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "With these two known knowns, we can go ahead & get to work! Below we'll quickly review each one of these concepts before moving through the rest of the four steps mentioned above.",
    },
    //TODO: make this to have a lighter font
    {
      type: "title",
      content: "1. Selecting An Internal Key",
    },
    {
      type: "paragraph",
      content:
        "A Taproot output starts with a public key that (ideally) has access to a handful of UTXOs to fund transactions & ends with a different public key placed directly in the Output PubkeyScript field.",
    },
    {
      type: "paragraph",
      content:
        'This is a major difference between pay-2-taproot outputs & the more traditional transaction types like p2pkh or p2sh. Most other outputs have multiple items in the scriptpubkey/lockscript such as a hashed public key &  op_checksig pay-2-taproot outputs have no such properties or op_codes. Instead, P2TR outputs have a single 32-byte public key as the scriptpubkey field. As we\'ll see below, this single 32-byte public key is known as the "taproot key" or the "tweaked key".',
    },
    {
      type: "paragraph",
      content:
        "Of course, a worthy question here is what exactly is a tweak & what exactly are we tweaking our original public key by?",
    },
    {
      type: "paragraph",
      content:
        "In cryptography, at least to my knowledge, a (bold)tweak(bold) is a generic term that means to make some change to a public key; this change is commonly one or more of the following operations: concatenation, addition, multiplication & hashing. We'll get into this much, much more in-depth in the next article, but for brevity,(bold) we require an internal key because it's what we'll tweak to output the actual taproot key:(bold)",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot PubKey/taproot-output-3.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "Once we know the internal key we'll use, we know we can at least spend directly using a Schnorr signature; however, if we want the flexibility & privacy offered by taproot, we'll need to create our scriptpath, which means that we'll first need to choose our tapleaves.",
    },
    // TODO: make this a lighter font later
    {
      type: "title",
      content: "2. Creating Our TapLeaves",
    },
    {
      type: "paragraph",
      content:
        "What are all of the different ways this UTXO can be spent? Arguably the best part of the Taproot update is the flexibility offered through the script path because it allows one to encode a near-infinite amount (2^128) of payment options.",
    },
    // TODO: make this to have a lighter font color
    {
      type: "paragraph",
      content: "(bold)Family Vault Scenario(bold)",
    },
    {
      type: "paragraph",
      content:
        "Creating the ScriptPath, or the merkle tree of these payment options, starts with defining how many spend paths, or tapleaves, we're going to encode. Let's say for example we want to store some Bitcoin in a family vault with the following properties:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "1. Spouse can spend it at anytime",
        },
        {
          type: "numbered-item",
          content: "2. Parents can spend it together",
        },
        {
          type: "numbered-item",
          content: "3. Offspring can spend it in 18 years",
        },
        {
          type: "numbered-item",
          content: "4. Your best friend can spend it with a password",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "These four payment options make up the four different nodes or (bold)tapleafs(bold) that kickoff the generation process for our merkle tree.",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot PubKey/MerkelTree.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content: "But couldn't I already do this with p2sh or p2wsh?",
    },
    {
      type: "paragraph",
      content:
        "The astute observer might notice that, as complex as it maybe, it's entirely possible to stuff these four payment options into a single p2sh | p2wsh script, & they'd be right. That can & is done. However, outside of the near-infinite scalability in tree paths versus the write limit of a script, this is where the privacy part of Taproot really shines:",
    },
    {
      type: "paragraph",
      content: "(bold)Only the tapleaf spent is revealed(bold)",
    },
    {
      type: "paragraph",
      content:
        "Theoretically, you could use a large p2sh with nested if-statements, but then you'd reveal every single family member's public key since you'd reveal all the spend paths, which is obviously not ideal; in the alternative, using the scriptpath we'll build, (bold)only(bold) the spending member's public key is revealed.",
    },
    {
      type: "paragraph",
      content:
        "To make easier to implement the tapleafs, let's write out exactly how each of our four desired scenarios are expressed through the following pubkeyscripts:",
    },
    {
      type: "table",
      headers: ["Scenario", "Description", "PubKeyScript"],
      rows: [
        [
          "Spouse can spend anytime",
          "Direct UTXO consumption with a simple public key",
          "P2PKH",
        ],
        [
          "Parents can spend together",
          "A 2-of-2 multisig is required",
          "P2SH (2/2 multi-sig)",
        ],
        [
          "Offspring can spend in 18 years",
          "Direct UTXO consumption after 18 years (in block height) have passed",
          "P2SH (timelock)",
        ],
        [
          "Friend can spend with a password",
          "Direct UTXO consumption with a matching password",
          "P2WSH (hashlock)",
        ],
      ],
    },
    {
      type: "paragraph",
      content:
        "Considering our many articles on creating scripts, we will not go over how each of the pubkeyscripts above is actually generated; however, as an exercise for you, we highly recommend you fire up the newly launched Taproot Tool & follow along.",
    },
    {
      type: "title",
      content: "TaggedHashes",
    },
    {
      type: "paragraph",
      content:
        'Before we introduce the multiple steps derived in generating the scriptpath & finally a P2TR output, it\'s necessary to first review a quirky little cryptography "tag" introduced in (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)BIP340.(linkpage) If you search for "tag" or "tag hash," you\'d find the following:',
    },
    {
      type: "paragraph",
      content:
        '(bold)TagHash("x") = SHA256(SHA256(x) || SHA256(x) || rest of items…)(bold)',
    },
    {
      type: "paragraph",
      content:
        "In short, TapScript/Taproot uses this tagging system three different times when generating the scriptpath & eventual P2TR output as a simple way to avoid collisions not related to Taproot. All this does is decode & hash some string (either 'TapLeaf,' 'TapBranch', or 'TapTweak') twice & prepends that to the actual data relevant.",
    },
    {
      type: "paragraph",
      content:
        "This is a common source of confusion that people tend to way overthink; whenever you see TaggedHashed('TapWhatever,' [some script]), all that means is that you'll need to hash 'TapWhatever' twice & prepend it to [some script]. Again, there are only (so far) three options for what goes in a tagged hashed, so we can summarize this for further familiarity below:",
    },
    {
      type: "table",
      headers: ["TagHash", "When Used", "Formula (H = sha256())"],
      rows: [
        [
          "TapLeaf",
          "Once, initial TapLeaf construction",
          "H('TapLeaf') || H('TapLeaf') || TapLeaf Version || Script Size || PubKeyScript",
        ],
        [
          "TapBranch",
          "At every step up along the tree",
          "H('TapBranch') || H('TapBranch') || A || B",
        ],
        [
          "TapTweak",
          "Once, during root key tweaking",
          "H('TapTweak') || H('TapTweak') || P || AB",
        ],
      ],
    },
    {
      type: "paragraph",
      content:
        "As you should expect, we'll use each of these three TagHashes while we transverse up our Merkle tree, going from our four TapLeafs to th",
    },
    {
      type: "title",
      content: "From PubKeyScript To TapLeaf",
    },
    {
      type: "paragraph",
      content:
        "Let's assume that we have the scriptpubkey for our (bold)scenario #1,(bold) in which our spouse can spend the tapleaf using her public key in a rather simple p2pkh transaction; to go from from a PubKeyScript to a TapLeaf we must first concatenate the TapLeafVersion with the Script Size & the script itself. As of BIP342, there is only a single recognized TapLeaf version, so it's safe to assume that this will be the magic constant (0xc0) for now:",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot PubKey/TapLeafFormat.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "With these three items concatenated, all we need to do now is calculate the hashed value of 'TapLeaf,' concatenate it to itself once, & then concatenate the three-item byte array we just made with the version, size & script. (bold)And that's it!(bold)",
    },
    {
      type: "paragraph",
      content:
        "We've successfully generated (bold)one(bold) of our four TapLeafs. To move forward, we must repeat that process with the remaining three scenarios; once completed, we'll have selected our internal key & generated our four TapLeafs - which means that we're halfway through the four main steps involved! Continue reading to see how we'll merkilize the TapLeafs to end with our scriptpath.",
    },
  ],
};

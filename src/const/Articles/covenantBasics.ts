import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const CovenantBasics: ArticleViewProps = {
  module: "Research",
  section: "Covenants",
  published: "Jul. 15th 2026",
  title: "Covenant Basics",
  shortHandTitle: "/lessons/covenant-basics",
  description:
    "An introduction to Bitcoin covenants: what they are, the goals behind them, the most popular proposals (OP_CTV, OP_TXHASH, OP_CCV), & the common criticisms lobbed at them.",
  href: "/lessons/Covenant Basics",
  isLocked: false,
  itemType: "article",
  lesson: 14,
  googleLinkBigScreen: "",
  googleLinkSmallScreen: "",
  content: [
    {
      type: "main title",
      content: "Preface, Proposals, & Pitfalls",
    },
    {
      type: "title",
      content: "Intro",
      customClass: "font-bold mb-4",
      variant: "large",
    },
    {
      type: "paragraph",
      content: "(italics)bitcoin doesn’t have a programming language(italics)",
    },
    {
      type: "paragraph",
      content:
        "If I earned a sat everytime I heard this claim…It’s annoying, but not because it’s repetitive. It’s annoying because it’s somehow, frustratingly, both true & false. As we’ve seen since P2TR activation, script, or tapscript at this point, is actually fairly expressive! Bitcoin, with script, is programmable money. The problem is mainly that the perspective on what ‘programmable money’ means has drastically drifted since the introduction of “smart contracts.”",
    },
    {
      type: "paragraph",
      content:
        "(italics)so how big is the delta between scripts & contracts?(italics)",
    },
    {
      type: "paragraph",
      content:
        "As it turns out, fairly big. And this is by design. The goal of Bitcoin is not a “decentralized computer” but rather hard money empowered by limited programmability; this simply translates to different requirements & therefore different properties. Below are just a few of these requirements that’ll help us draw comparisons & define covenants before we dive-in:",
    },
    {
      type: "paragraph",
      content: "(bold)No Smart Contracts(bold)",
    },
    {
      type: "paragraph",
      content:
        "The first noticeable difference developers bring-up after exploring other blockchains & smart contracts is that there’s no separate ‘smart contract’ primitive; there are only addresses & the UTXO set. The concept of a smart contract that enforces logic after a UTXO no longer belongs to you doesn’t exist. And bitcoin has zero interest in ever activating stand-alone smart contracts!",
    },
    {
      type: "paragraph",
      content:
        "As you’ll see, however, by committing to how UTXOs can be spent, we arrive surprisingly close to emulating smart contracts. The idea of these very limited, minimal, contract-lite, as we’ll discuss shortly, is the so-called covenant.",
    },
    {
      type: "paragraph",
      content: "(bold)Transaction Introspection(bold)",
    },
    {
      type: "paragraph",
      content:
        "The second noticeable difference is that there are zero ways to reach into any of the associated data (such as height, address, amount, etc…). Again, it’s just a matter of framing, but this is an expected feature when people first hear about bitcoin programmability such as simple arithmetic checks with UTXO ‘amounts.’ Now, however, there are very good reasons for why this limit exists & we’ll brush across them during this article.",
    },
    {
      type: "paragraph",
      content: "(bold)Turing Completeness(bold)",
    },
    {
      type: "paragraph",
      content:
        "A good mental map is that script is a programming language focused on equality verification, not expressive computation. Simply, the vast majority of bitcoiners do not want to open bitcoin up to a computable state with vastly more complicated (& therefore potentially dangerous) states. There are very good reasons both technically & economically to stay conservative. Technically, bitcoin prioritizes stability in a resource-constrained environment; which means that complicated computations born from script are antithetical to this principle. Economically, the more use-cases exist at the base layer the more appealing it is for miners to shift profit incentives from transaction fees to MEV (we’ll cover why this is bad below).",
    },
    {
      type: "title",
      content: "Goals",
      customClass: "font-bold mb-4",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "The definition of a covenant is still evolving but generally fits along the lines of “contracts that express not just how a UTXO is unlocked, but how it’s spent | consumed”. The goal of covenants, simply, is to add more expressability & programmability to Bitcoin. As we saw above, “programmability” means different things to different people which leads to different proposals with different tradeoffs. The starkest tradeoffs that we’ll see various times stem from the three features mentioned above; most people want covenants, some people want covenants with introspection, fewer people want full introspection with full-blown script expressibility. Let’s introduce the most popular proposals & set the stage for further in-depth coverage.",
    },
    {
      type: "image",
      src: "/articles/covenant basics/image1.png",
      alt: "How expressive is it? OP_CTV, OP_TXHASH & OP_CCV on a spectrum",
    },
    {
      type: "title",
      content: "Proposals",
      customClass: "font-bold mb-4",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "There’s a rich history behind attempts at adopting covenants, contracts, introspection on Bitcoin as far back as 2013 when they were (linkpagehttps://bitcointalk.org/index.php?topic=278122.0)first mentioned(linkpage). Today, we’re only going to list & provide a cursory introduction to notable proposals (setting the stage for further individual in-depth articles). Now, fair warning, most of these op_codes usually come with a (bold)bundle(bold) of other op_codes, some of which overlap, we are (bold)(italics)not(italics)(bold) covering these below. We’re mainly outlining the core op_code & mental model behind each method.",
    },
    {
      type: "paragraph",
      content:
        "(bold)OP_CTV(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0119.mediawiki)BIP-119(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "Proposed by Jeremy Rubin in 2020 with BIP-119, this is the original ‘covenant’ proposal that matured into a BIP. It’s a very limited, albeit safe implementation that performs a verification check of a hash that precommits (bold)(italics)the number of inputs & all output data(italics)(bold) (‘template’). (bold)Every(bold) output & its corresponding fields (pubkey, amount, etc…) must match exactly the precommit.",
    },
    {
      type: "video",
      src: "/articles/covenant basics/image2.mp4",
      alt: "OP_CTV: hash of the transaction is checked against the 32-byte template",
    },
    {
      type: "paragraph",
      content:
        "This leaves zero flexibility in what a transaction can contain & therefore leads to the common critique that it’s too restrictive to be useful. This is, however, short-sighted because using tapleaves we could theoretically hardcode up to 2^128 different CTV templates (which means that we can individually tweak various parts of a transaction, it’d just create many, many tapleaves).",
    },
    {
      type: "paragraph",
      content:
        "(bold)OP_TXHASH(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0346.mediawiki)BIP-346(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "The second most-popular covenant proposal after OP_CTV is OP_TXHASH proposed in BIP-346. Again, the common criticism lobbed at OP_CTV is that it’s too restrictive, so, accordingly, BIP346 put forward a second design that adds a (slightly) more granular layer of introspection & expressability. It still satisfies the design goal of staying relatively simple, decidable, & with a small footprint (since our contract programs are again hashes).",
    },
    {
      type: "paragraph",
      content:
        "Instead of the ‘covenant’ or the ‘template’ consisting of a hash of exactly all UTXOs & their property fields as-is, BIP346 allows developers to (bold)(italics)select specific parts of a transaction(italics)(bold) to hash & check against. The CTV hash precommits every field of an output all at once; with TXHASH we can check (italics)specific(italics) inputs, specific outputs, etc.",
    },
    {
      type: "video",
      src: "/articles/covenant basics/image3.mp4",
      alt: "OP_TXHASH: hash of selected transaction parts is checked against the 32-byte template",
    },
    {
      type: "paragraph",
      content:
        "Naturally, with a larger surface area there’s a large vector for criticism. Is TXHASH (bold)too expressive(bold)? Is it necessary if we can encode up to 2^128 tapleaf CTV templates? On the other hand, as the middle-ground in covenant proposals, this ultimately still doesn’t enable introspection in terms of lifting raw value; this is still just checking against (bold)hashes(bold) versus, for example, extracting out a UTXO value amount & performing 64-bit math with it. It’s worth noting that so far neither proposal discussed involves (bold)any(bold) computation outside of hash verification.",
    },
    {
      type: "paragraph",
      content:
        "(bold)OP_CCV(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0443.mediawiki)BIP-443(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "TXHASH, with pseudo-introspection, allows for more creative, flexible covenants; but, it (bold)(italics)still(italics)(bold) merely locks/precommits to a part of a transaction which means the following spend transaction must follow that exact lock. But what if we wanted more optionality & (bold)some(bold) expressibility?",
    },
    {
      type: "paragraph",
      content:
        "CCV enables what its author calls “state-carrying UTXOs.” It cleverly uses an additional tweak to the Taproot internal key, allowing a P2TR output to contain an extra commitment to data (bold)&(bold) validate that data when spent. This lets a transaction carry updated contract state into successor UTXOs.",
    },
    {
      type: "paragraph",
      content:
        "Additionally, as a bonus, OP_CCV includes a slightly-deeper level of introspection; we’ve only checked against hashes of exact values, but what if we could (vaguely) access the actual amount of satoshis in a UTXO & perform checks with it? As we’ll see later, full introspection is a (bold)very(bold) controversial topic for very good reasons. And while OP_CCV doesn’t offer full introspection, it is the first op_code here that performs ‘lite-introspection’ & allows us to perform pseudo-math & logical checks with the amount field found in UTXOs (aka sats).",
    },
    {
      type: "video",
      src: "/articles/covenant basics/image4.mp4",
      alt: "OP_CCV: old contract, new state — output commits to updated contract data",
    },
    {
      type: "title",
      content: "Pitfalls",
      customClass: "font-bold mb-4",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "We’ve already brushed upon potential problems with covenants & introspection so below we’ll summarize how these tradeoffs morph into common criticisms lobbed:",
    },
    {
      type: "paragraph",
      content: "(bold)Creeping Towards MEV(bold)",
    },
    {
      type: "paragraph",
      content:
        "Mentioned as a ‘con’ not just for covenants but for virtually (italics)any(italics) type of ‘building with bitcoin’ feature (ie - metaprotocols), new features get us closer to MEV. MEV, which stands for ‘maximal/miner extractable value,’ is the very real second-order effect of adding more programmability.",
    },
    {
      type: "paragraph",
      content:
        "In short, bitcoin miners currently profit-maximize by simply including transactions (italics)with the highest fees(italics); however, with more use-cases, like we’ve seen in other blockchains, miners might prefer other, more profitable strategies by rearranging, including, or removing transactions. As the saying goes “bitcoin is money,” which maps more cleanly when miners (italics)strictly(italics) prioritize transaction fees. In general, this critique is directionally correct & I suspect, since it’s not easily quantifiable, it’ll perpetually surface while debating features.",
    },
    {
      type: "paragraph",
      content: "(bold)Creates Censored Coins(bold)",
    },
    {
      type: "paragraph",
      content:
        "A universal critique of any type of covenant is that restricting coins to specific spendpaths could create “state-sponsored bitcoin” or censored coins that could only be spent in whitelisted ways. The usual pro-covenant pushback here is that you can already do this with a simple 2-of-2 multisig & the majority of bitcoiners have already resigned to custodial services (Coinbase, Robinhood, etc…) that could or likely do have these restrictions as-is. Considering Bitcoin should ruthlessly prioritize building for users that want to self-custody, I don’t believe this argument matters much either way.",
    },
    {
      type: "paragraph",
      content: "(bold)They Don’t Do Enough(bold)",
    },
    {
      type: "paragraph",
      content:
        "The first criticism frequently mentioned when discussing the more restrictive attempts (such as OP_CTV) is that they’re so restrictive that they don’t enable any critical / needed use-cases. But again, given the key space provided by the scriptpath, allows for up to 2^128 different ways to craft a potential transaction, I don’t believe this critique holds; however, what is true, is that no team, product, or use-case has built out an example proving this feature has high demand (let alone rises to the level of ‘needed’).",
    },
    {
      type: "paragraph",
      content:
        "There are of course more pitfalls & criticisms presented but I wanted to focus on just the most common ones.",
    },
    {
      type: "title",
      content: "Up Next",
      customClass: "font-bold mb-4",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "The point of this first article was not to argue for or against any specific flavor of covenants, but rather to cover the fundamentals & create a framework that’ll allow us to now step in-depth into these specific proposals. By a happy coincidence, since we’ve started researching this topic a new flavor of covenants has taken the limelight: OP_TEMPLATEHASH. We’ll cover that (bold)next(bold) since it’ll likely become a trending topic worth learning about now (we’ll then double-back to cover the original proposal, OP_CTV).",
    },
  ],
};

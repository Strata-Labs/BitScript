import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const ATaleOfTwoPaths: ArticleViewProps = {
  module: "Taproot Transaction",
  section: "ScriptPath",
  published: "Nov. 10th 2023",
  title: "A Tale of Two Paths",
  description: "",
  href: "/lessons/A Tale of Two Paths",
  isLocked: false,
  itemType: "article",
  lesson: 5,
  googleLinkBigScreen:
    "https://docs.google.com/document/d/e/2PACX-1vScjj6ELLvFdxPJrPAo3xt94RxFi30JpglS7p41EHEhkQKqe9nXZD_4fQbpwWB-6vRzs0WOCNFzEv62/pub?embedded=true",
  googleLinkSmallScreen:
    "https://docs.google.com/document/d/e/2PACX-1vS9NZOrYrWttjYyQe21HNykVpCbV_cqxMaAit4REdRBr94BZE-1YD1KO1YkHvOXoOjzyx5o2ITBdRgK/pub?embedded=true",
  content: [
    {
      type: "main title",
      content: "The Basics of Taproot Keypath & ScriptPath ",
    },
    {
      type: "paragraph",
      content:
        "As we previewed in this Sections opener ‘Why Taproot,’ Taproot is the most exciting & actively-developed major upgrade to Bitcoin since SegWit. In fact, most of the real cutting-edge projects in the last one to three years are all built on top of Taproot:",
    },
    {
      type: "list",
      content: [
        "- (linkpagehttps://ordinals.com/)Ordinal Inscriptions(linkpage)",
        "- (linkpagehttps://docs.lightning.engineering/the-lightning-network/taproot-assets)Taproot Assets(linkpage)",
        "- (linkpagehttps://bitvm.org/bitvm.pdf)BitVM(linkpage)",
      ],
    },
    {
      type: "paragraph",
      content:
        "And I’m surely missing many others. The point is, it’s not theoretical, it’s in usage (bold)(italics)now(italics)(bold) & without a doubt delivers on its promise of increased privacy, increased efficiency & lower fees. Since its update in 2021, Taproot has seen address-format penetration steady growth followed by a drastic acceleration with the launch of Ordinals.",
    },
    {
      type: "paragraph",
      content:
        "Which brings us today. Today we’re going to introduce exactly *what*Taproot is & how it works underneath the hood. We of course won’t get through these items in detail, but aim to lay out & connect the pieces for the rest of this series.",
    },
    {
      type: "paragraph",
      content:
        "Taproot is a new type of SegWit transaction that, by default, comes packed with two spendable paths (a (bold)KeyPath(bold) & a (bold)ScriptPath(bold)).",
    },
    {
      type: "paragraph",
      content:
        "As usual, we’ll start with an example seen in the (linktransactions)Deserializer(link) so that we can see the connection from design to a confirmed transaction. Let’s focus first on the Output format.",
    },
    {
      type: "title",
      content: "Output",
    },
    {
      type: "paragraph",
      content:
        "As mentioned in ‘Why Taproot’ lesson, the single-biggest booster to on-chain transaction privacy comes from (italics)the universal format of the output(italics). Every Taproot output looks the same in terms of item & length:",
    },
    {
      type: "image",
      src: "/articles/a tale of two paths/Image1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "In the transaction highlighted above, found (linkpagehttps://www.bitscript.app/transactions?transaction=d53b9e0b9e4a0b2e77ad61862a3d385d9748c9b6e6ea402be7efdcafb931d2a7)here(linkpage), you’ll notice that the PubKeyScript for the Taproot output consists of three different items. Regardless of whether the KeyPath is a single-sig or multi-sig, (italics)or(italics) whether the ScriptPath Merkle tree is empty or contains 2ª128 script paths, the format for (bold)(italics)any(italics)(bold) Taproot output (italics)looks exactly the same(italics) (this is where the increased security comes from). ",
    },
    {
      type: "paragraph",
      content:
        "To inspect this pattern on mined transaction, check out one or more of the Taproot examples with a focus on the Output PubKeyScripts; eventually, it’s made clear that the Taproot output PubKeyScript format adheres to the following: ",
    },
    {
      type: "image",
      src: "/articles/a tale of two paths/Image2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "The above summarizes the standard for a Taproot PubKeyScript. Each of these scripts contains only three items & every output should have them - let’s review below:",
    },
    {
      type: "paragraph",
      content: "(bold)SegWit Version Flag(bold) (0x51)*",
    },
    {
      type: "paragraph",
      content:
        "Every SegWit-enabled PubKeyScript with a SegWit-enabled recipient starts with a field called that flags the (italics)version(italics)) of SegWit being used. Prior to Taproot, there was only a single SegWit version value that was considered standard in PubKeyScript: (bold)0x00(bold). Taproot, for its SegWit version flag, instead uses the value seen above: (bold)0x51(bold).",
    },
    {
      type: "paragraph",
      content:
        "(italics)*To be honest, we’re not entirely sure why BIP341 calls for 0x51 (OP_PUSHDATA1) instead of (0x01), the assumed next SegWit version value after 0x00 - if you know, please reach as we’d like to include the ‘why’ in this article.(italics)",
    },
    {
      type: "title",
      content: "OP_PUSH20 | OP_PUSH21",
    },
    {
      type: "paragraph",
      content:
        "This next item is known as a push data op. These op_codes are used in Bitcoin script to communicate to the stack the size (in bytes) of the data we’re about to push. In Taproot, you directly include a public key as the last item as we’ll see below. ",
    },
    {
      type: "paragraph",
      content:
        "This public key, depending on whether it’s odd or even, is either 32-bytes or 33-bytes; therefore, this second item in a Taproot PubKeyScript is always either OP_PUSH20 (0x20) or OP_PUSH21 (0x21).",
    },
    {
      type: "title",
      content: "Taproot Public Key",
    },
    {
      type: "paragraph",
      content:
        "And that’s it in terms of a Taproot Output format - all Bitcoin sent to a Taproot address will contain a PubKeyScript with the same items. Now, before we on, let’s display the setup that we have here (it’s worth stating the diagram below is missing the “tweak” step that derives the Taproot public key - we’ll cover this later):",
    },
    {
      type: "image",
      src: "/articles/a tale of two paths/Image3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "title",
      content: "KeyPath",
    },
    {
      type: "paragraph",
      content:
        "The last item in a Taproot output is the tweaked public key. We’ll review what this “tweaked” term means later as it’s important in constructing the output. But, for now, all we care about is establishing the basics of the KeyPath. As the name suggests, the KeyPath is available for the recipient public-key owner to sign & spend the Bitcoin as a single-signer, a multi-signature or somewhere in-between (like a multi-signature with a defined threshold).",
    },
    {
      type: "paragraph",
      content:
        "As we’ll also review in the much-longer KeyPath-focused article, the basis for these features is introduced in (linkpagehttps://www.bitscript.app/transactions?transaction=d53b9e0b9e4a0b2e77ad61862a3d385d9748c9b6e6ea402be7efdcafb931d2a7)BIP 340: Schnorr Signatures(linkpage). An alternative to the ECDSA cryptography scheme, the introduction of Schnorr Signatures in Taproot drastically increased the utility & flexibility of public keys & signatures.",
    },
    {
      type: "paragraph",
      content:
        "There is, of course, much more to detail about the KeyPath, however, for now, we want to keep this article to the Basics before diving further into the series.",
    },
    {
      type: "title",
      content: "ScriptPath",
    },
    {
      type: "paragraph",
      content:
        "In addition to the KeyPath, which we’ve now seen offers more than a simple single signature  spending condition, every Taproot output has a second, alternative spending path that offers unfathomably more spending conditions: the ScriptPath. Though, as we mentioned before, while the Taproot (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)BIP(linkpage) defines this as the “ScriptPath,” it’s worth remembering that this is not a single script but rather a Merkle tree of scripts (known as tapleaves or leaves). In short, (italics)every(italics) tapleaf can hold a  script with unique spending conditions; for sake of curiosity, the upper-limit on how many tapleaves a single Taproot output can hold is a (bold)(italics)whopping 2ª128 scripts(italics)(bold).",
    },
    {
      type: "paragraph",
      content:
        "The recipient, when they want to spend their Bitcoin next, has the option of (bold)(italics)either(italics)(bold) spending through the KeyPath (bold)(italics)or(italics)(bold) picking one of the ScriptPath tapleaves. Spending the KeyPath is straight-forward as all that is needed is a corresponding Schnorr signature; however, spending a ScriptPath tapleaf is significantly more involved & has to do with Merkle trees. Specifically, we’ll have to review & understand how Merkle trees can be used to prove the inclusion of something.",
    },
    {
      type: "paragraph",
      content:
        "And that’s it for this article! To summarize, all Taproot outputs are a SegWit-enabled output that starts with (bold)0x51(bold9) (a SegWit version flag) & is followed shortly after by a tweaked public key; additionally, all Taproot outputs come packed with two default spending paths, a simpler KeyPath & a more involved ScriptPath. Of course, everything we know now is still cursory knowledge meant for an introduction, in the next following articles we’ll dive deeper into every part of Taproot, preparing to answer some basic questions such as:",
    },
    {
      type: "list",
      content: [
        "- How is the final Taproot public key generated?",
        "- What’re the differences between ECDSA & Schnorr?",
        "- How do we actually spend one of the tapleafs?",
      ],
    },
    {
      type: "paragraph",
      content:
        "Keep reading & we’ll make sure to answer these questions & hopefully anymore you may have.",
    },
  ],
};

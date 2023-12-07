import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const VMF: ArticleViewProps = {
  module: "Witness Transaction",
  section: "Transaction Anatomy",
  published: "Nov. 4th 2023",
  title:
    "Version, Marker, Field - Configuring & Identifying A SegWit Transaction",
  description: "",
  href: "/lessons/Version, Marker, Field - Configuring & Identifying A SegWit Transaction",
  isLocked: false,
  itemType: "article",
  lesson: 3,
  googleLinkBigScreen:
    "https://docs.google.com/document/d/e/2PACX-1vTriMi7b9JDabQV694Srv1fckgt4jmccThI4XyHPgmcrJlrsgGB_y4qnblKr392AdjKsc19wvC6-bdr/pub?embedded=true",
  googleLinkSmallScreen:
    "https://docs.google.com/document/d/e/2PACX-1vQIqEn_YNKIvZa95SQ1BrkDFzPCP9gZPgzsRFn51PeG4DuIdFPho7Cqwi4tKO1uIcOCwnTE4m7l2LdP/pub?embedded=true",
  content: [
    {
      type: "main title",
      content: "Configuring & Identifying A SegWit Transaction",
    },
    {
      type: "paragraph",
      content:
        "Few updates reverberated through the Bitcoin ecosystem like the all too famous 2017 user-activated SegWit soft fork - and for good reason! Not only did it solve (or at least placate, depending who you ask) a long war of attrition between two parties: small blockers & large blockers. More importantly, it culminated in a second, entirely new way to format a transaction.  ",
    },
    {
      type: "paragraph",
      content:
        "Most developers, beginners or advanced, are usually aware of this, or at least have heard of “SegWit”. In fact, they (italics)might(italics) even already know that the latter (SegWit) inserts an entirely new section to the transaction known as a Witness: ",
    },
    {
      type: "paragraph",
      content:
        "(bold)But, given the raw hexadecimal of a random transaction, can you immediately spot whether it’s Legacy or SegWit?(bold)",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "If it takes you longer than ~two seconds then maybe it’s worth brushing up on your SegWit transaction knowledge (read-on, you’ll know by the end)! Breaking down a transaction, specifically a SegWit transaction, is (italics)particularly(italics) tough because so few resources cover the topic from beginning to end. There are phenomenal resources on dissecting a Legacy transaction, but almost nothing on SegWit & even fewer resources on the more recent TapRoot transactions.",
    },
    {
      type: "paragraph",
      content:
        "We believe the single best way to improve working knowledge is to make it actionable. So, today & for the next few lessons, you’re going to inspect a SegWit transaction in its raw hexadecimal form. By breaking it down byte-by-byte, you’ll cover all the details involved in reading or writing a SegWit transaction.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "The table above looks intimidating, & the first few times it might feel challenging, but the tough part about understanding Bitcoin transactions is identifying & remembering minor details & exceptions.",
    },
    {
      type: "paragraph",
      content:
        "Following the table above, we’ll walk-through a mainnet transaction & map it to every field. Below is both the transaction ID & it’s corresponding raw hexadecimal transaction:",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Depending on whether you’re registered or whether you have freemium access, you can follow along in our deserialization tool by opening another window & clicking here.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-4.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "As the title suggests, today we’re covering the (italics)non-Witness(italics) parts of a SegWit transaction. Specifically, we’re focusing exclusively on the first basic three (3) fields found in a SegWit transaction: ",
    },
    {
      type: "paragraph",
      content:
        "While they have no official name as a group, we tend to think of these front-loaded fields as “settings” or “configuration” fields. Below is a summary of these three fields, we’ll review each field in detail.",
    },
    {
      type: "paragraph",
      content: "(bold)Version(bold) (4-bytes | 8-characters)",
    },
    {
      type: "paragraph",
      content:
        "The version field is always the very first field found in a transaction. It’s 4-bytes long (or 8-characters) & written in (italics)(linkformatter)Little Endian(link)(italics) format; all this means is that the bytes are reversed from their original value (for more info on Endian-ness play around with the data formatter linked). The end result of this format, as you’ll notice, is that the first byte holds some value while the remaining three (3) bytes are 0x00s.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-5.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Theoretically, these first four bytes have ~65k possible variations, however, that doesn’t mean that those versions are standard or accepted by nodes & the general Bitcoin network. In fact:",
    },
    {
      type: "paragraph",
      content:
        "(bold)The Version field has only two recognized values that are relayed in the network(bold)",
    },
    {
      type: "paragraph",
      content:
        "Both of these accepted version fields & the benefits behind the new implementation are provided below:",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-6.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Noticeably, & this a fairly common trip-up, (italics)nothing in this (bold)version(bold) field indicates whether it’s a Legacy or SegWit transaction(italics); contrary to popular belief, you’ll find both v1 SegWit transactions (italics)(bold)&(bold)(italics) v2 Legacy transactions: the version field has (italics)(bold)nothing(bold)(italics) to do with SegWit (this comes in the next field). Before we move on, let’s review exactly what benefits are provided in Version 2 (0x02000000) mentioned above:",
    },
    {
      type: "paragraph",
      content:
        "(bold)nSequence(bold) Timelock ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki)BIP 68(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "The first of the three core benefits of Version 2 (0x02000000) comes from BIP 68 titled: 'Relative Lock-Time Using Consensus-Enforced Sequence Numbers.' That’s a really big mouthful to state that nSequence provides a timelock to an (bold)(italics)input(italics)(bold). Previously, transactions had a single Locktime field positioned as the very last item & (italics)it covered everything in the transaction(italics).",
    },
    {
      type: "paragraph",
      content:
        "With nSequence Timelock, every (SegWit enabled) Input has a timelock slot positioned as the last field in an Input (after the SigScript) field; this allows users to specify the earliest block or time at which a transaction can be included in the blockchain, providing more customized control over the spending conditions.",
    },
    {
      type: "paragraph",
      content:
        "Of particular importance, this specific BIP was critical for enabling Lightning, since, when a Lightning channel is opened, the funding transaction includes nSequence values to set relative timelocks for spending the channel's funds. ",
    },
    {
      type: "paragraph",
      content:
        "(bold)OP_CheckSequenceVerify(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki)BIP 112(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "The second main unlock from Version 2 comes in the form of an op_code (linkOPS/OP_CHECKSEQUENCEVERIFY)OP_CHECKSEQUENCEVERIFY (CSV)(link). CSV allows users to specify a relative time delay for spending a transaction (bold)output(bold), measured in block height or time since the output was confirmed.",
    },
    {
      type: "paragraph",
      content:
        "To make sure this is clear, both of the updates mentioned are responsible for introducing more granular time-based locking mechanisms. The former, nSequence Timelock (BIP 68) focuses on adding this feature to (bold)(italics)inputs(italics)(bold), while the latter focuses on adding this features to (bold)(italics)outputs(italics)(bold). Together, both BIP upgrades drastically changed the timelock capacity of not just whole transactions but specifically inputs & outputs.",
    },
    {
      type: "paragraph",
      content:
        "(bold)Median Time Past(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki)BIP 113(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "The last of the three updates included in Version 2 also deals with timelock mechanics, however, this time the focus isn’t on adding a feature as much as it’s safe-guarding an existing parameter. Prior to this update, the primary timestamp used for the singular timelock feature was the timestamp included in the mined block; however, this timestamp could be manipulated by miners to some extent so it was considered a subpar & possibly dangerous.",
    },
    {
      type: "paragraph",
      content:
        "As a solution to improve the reliability of a locking/unlocking timestamp, BIP 113 introduced the “Median Time Past” timestamp. Instead of the block timestamp, time-based checks instead (italics)use the (bold)median(bold) of the (bold)previous eleven (11) blocks(bold)(italics).",
    },
    {
      type: "paragraph",
      content: "(bold)Marker(bold) (1-byte | 2-characters)",
    },
    {
      type: "paragraph",
      content:
        "To answer the opening question, or in case you’re working on a customer parse, when reading through a raw transaction the quickest way to tell if it’s a SegWit transaction is to check the byte immediately after the Version field (aka the 9th-byte). If the 9th-byte is a zero-byte (aka equal to 0x00) then the transaction is (bold)(italics)indeed(italics)(bold) a SegWit transaction with a segregated witness section.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-7.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "This 9th-byte, the second field we’re reviewing, is more accurately known as the (bold)Marker(bold); which, as the name confirms, (bold)marks(bold) whether the transaction is a Legacy or SegWit transaction. Besides the zero byte (0x00), there is nothing else this field could signify since any other value would be parsed as a VarInt for the Input Counter field.",
    },
    {
      type: "paragraph",
      content: "(bold)Flag(bold) (1-byte | 2-characters)",
    },
    {
      type: "paragraph",
      content:
        "Last but not least, the third & final field we’re reviewing, which is adjacent to the Marker, is known as the (bold)Flag(bold). This is also a single-byte value that acts as an indicator for SegWit transactions. It’s theoretically supposed to define future support for additional flavors of SegWit; however, for now, only the byte value of 0x01 is recognized as standard & relayed across the network:",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-8.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "As previewed in the introduction, the crux of the logic & work involved happens in the Inputs, Outputs, & Witnesses section. Seen above, the first three fields (Version, Marker, Flag) are indeed simply setting & configuration fields for a SegWit transaction.",
    },
    {
      type: "title",
      content: "In Closing",
    },
    {
      type: "paragraph",
      content:
        "With the first three fields out of the way, in the next lesson, we’ll now move on to the most complicated section of any transaction:the Inputs field. As we’ll see shortly, maintaining backwards compatibility between Legacy & SegWit can be tricky; with the introduction of SegWit, unfortunately, Inputs become even more involved.",
    },
  ],
};

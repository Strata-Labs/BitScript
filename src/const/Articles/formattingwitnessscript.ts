import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";

export const FormattingWitnessScript: ArticleViewProps = {
  module: "Witness Transaction",
  section: "From SigScript To Witness",
  published: "Nov. 3rd 2023",
  title: "Formatting Witness Script",
  description:
    "Explore the transformation of SigScript to Witness Script in Bitcoin transactions due to Segregated Witness (SegWit)",
  href: "/lessons/Formatting Witness Script",
  isLocked: false,
  itemType: "article",
  lesson: 1,
  googleLinkBigScreen:
    "https://docs.google.com/document/d/e/2PACX-1vToRVUnb21TSyzKekX5NPS9YUM7J4-vvIhBwCXXn48p6nsBunaiD8jwkP1EKOndf5JftINy3u2zcdOn/pub?embedded=true",
  googleLinkSmallScreen:
    "https://docs.google.com/document/d/e/2PACX-1vRwaFEFx31lpFhMWWO8vMcuEPrXHVdn3X4YJRuL4gvCamY4tfSGt9dbspA0VRoK4ZJftoRONtl-w7ad/pub?embedded=true",
  content: [
    {
      type: "main title",
      content: "Intro",
    },
    {
      type: "paragraph",
      content:
        "SegWit, short for Segregated Witness, is by far one of the most important & impactful updates to Bitcoin & specifically to the formatting of scripts within Bitcoin transactions. Introduced in 2017 through BIPs (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)141(linkpage), (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki)143(linkpage) & (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki)144(linkpage), SegWit was Luke Dash Jr. 's attempt to ameliorate the on-going Small Block vs. Large Block culture war that had been burning in the background for multiple years. ",
    },
    {
      type: "paragraph",
      content:
        "Covered more deeply in the opening Lesson of this Module, SegWit found an acceptable (admittedly temporary) solution to the block space, transaction malleability  & transaction fee issues that both parties were concerned with. Please review the opening Lesson for more info in-depth such as the acknowledged trade-offs from both sides.",
    },
    {
      type: "paragraph",
      content:
        "Regardless, the engineering details of SegWit are what we’re interested in today. At a high-level, the mechanics for how the format changes from Legacy to SegWit can be summarized in two steps: ",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. The SigScript (or Unlock Script), typically found (italics)after(italics) the SigScriptSize field & (italics)before(italics) the Sequence field, is shifted to a section called “Witnesses” now found after Outputs",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)The SigScript, typically formatted as an array of bytes, is now casted to an array of (italics)tuples(italics) instead(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "A shift & a re-format. Both of these steps are necessary to understanding SegWit; today, however, we’ll strictly focus on the 2nd, bolded step - aka how exactly is a Witness formatted?",
    },
    {
      type: "title",
      content: "Shift",
    },
    {
      type: "paragraph",
      content:
        "Before we inspect the formatting shift, let’s quickly review the previous lesson. Shown in the article before, in contrast to a Legacy input, a SegWit input separates, or (bold)segregates(bold), the SigScript from the input to the Witness section. All this means is that SigScript is moved around & is no longer adjacent to the rest of the input but is now located after the Output section:",
    },
    {
      type: "image",
      src: "/articles/formatting witness scripts/Image.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "One would assume that the format of the SigScript itself would stay the same, alas, as we see above & we’ll expand on in detail shortly, one would be mistaken.",
    },
    {
      type: "title",
      content: "Format",
    },
    {
      type: "paragraph",
      content:
        "The main lesson we’ll cover today is the implementation details & (italics)formatting(italics) differences between an Input ScriptSig & a SegWit Witness. Let’s first start by exhausting the possible names we’ll hear & summarizing the format differences in paragraph form:",
    },
    {
      type: "paragraph",
      content:
        "(italics)In Legacy transactions, Inputs have only SigScripts/UnlockScripts that are parsed as arrays of (bold)bytes(bold).(italics)",
    },
    {
      type: "paragraph",
      content:
        "(italics)In SegWit transactions, some Inputs have SigScripts/UnlockScripts & some Inputs have Witnesses/WitnessesScripts that contain a size flag & are parsed as arrays of. (bold)tuples(bold).(italics)",
    },
    {
      type: "paragraph",
      content:
        "In the latter, a SegWit Witness, each tuple contains (bold)two(bold) items. The first, a VarInt size indicator, which flags the size of the next chunk of data that’ll be pushed to the stack. The second is the actual next chunk of data - whether this is an op_code or pushed data like an ECDSA signature or hashed public key. ",
    },
    {
      type: "paragraph",
      content:
        "Below is a nice table that breaks down this difference in structure which we’ll cover in detail further below:",
    },
    {
      type: "image",
      src: "/articles/formatting witness scripts/Image2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "title",
      content: "Witness | WitnessScript | SegWitWitness",
    },
    {
      type: "paragraph",
      content:
        "The Witness, as previewed above, is not just an array of tuples as the array; much like SigScript is preceded by SigScriptSize, the array of tuples is also preceded by a counter that flags to the length of the array / how many tuples to inspect. Each Witness or WitnessScript can be better understood by breaking it down into two distinct parts - the image below shows an example of a witness split up into the tuple count followed by the array of tuples:",
    },
    {
      type: "image",
      src: "/articles/formatting witness scripts/Image3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content: "OP_PUSH20 | OP_PUSH21",
    },
    {
      type: "paragraph",
      content:
        "Together, both of these parts cumulatively make up the “Witness Script.” We’ll review each individual part next. ",
    },
    {
      type: "title",
      content: "Tuple Count (VarInt)",
    },
    {
      type: "paragraph",
      content:
        "The first item in any Witness Script is a VarInt counter that dictates how many items are in this witness / witness script; specifically, it dictates how many (bold)(italics)tuples(italics)(bold) are in the upcoming tuple array. It’s worth highlighting the similarities & differences to the functionality-equivalent SigScriptSize flag found in Inputs:",
    },
    {
      type: "list",
      content: [
        {
          type: "hashed-item",
          content:
            "- In a Legacy SigScript, we provide the SigScriptSize, a VarInt, (italics)that provides the (bold)length of the entire script(bold) in bytes(italics)",
        },
        {
          type: "hashed-item",
          content:
            "- In a SegWit WitnessScript, we provide the tuple counter, a VarInt (italics)that provides a (bold)count(bold) of the amount (bold)of tuples(bold)(italics)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Inspecting, we notice that the first item in (bold)(italics)both(italics)(bold) scripts is a VarInt with instructions on what’s next, however, they mean entirely different things. The former, the SigScriptSize, is the length of the entire script, as one, in bytes. The latter, the tuple counter, is a count of all of the different pieces of the script that in aggregation make up the entire script.",
    },
    {
      type: "paragraph",
      content:
        "They both start with VarInts & communicate, by either length of the script or count of the items in the script, the size of the script. With that understood, let’s dive into the two-item tuples that make up the Witness Script.",
    },
    {
      type: "title",
      content: "Tuple Array",
    },
    {
      type: "paragraph",
      content:
        "The single-largest difference & likely largest source of confusion between an Input SigScript & a SegWit Witness is that the former directly expresses script elements (pushed data & op_codes) as hexadecimal string while the latter expresses script elements in an array of tuples.",
    },
    {
      type: "paragraph",
      content:
        "Script, prior to the SegWit user-activated softfork, had a single format as an array of hexadecimal bytes. For both Input SigScripts & Output PubKeyScripts, this format was consistent. SegWit changed this by introducing a second way to express a script: as an array of two-item tuples. ",
    },
    {
      type: "paragraph",
      content:
        "What’s in these tuples? Well, as you saw in the preview above, the Witness/WitnessScript is separated by items into tuples & inside of each tuples we find two items:",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Item Size:(bold) The size (in VarInt) of the next script item",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)Item:(bold) The next script item expressed in hexadecimal",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "This seems more complicated than it. The best way to demystify (italics)anything(italics) is to work through examples - so we’ll do exactly that:",
    },
    {
      type: "title",
      content: "Example: OP_1 + OP_2 + OP_ADD",
    },
    {
      type: "paragraph",
      content: "(bold)Legacy				0x515193(bold)",
    },
    {
      type: "paragraph",
      content: "(bold)0x51(bold) = OP_1 (pushes the number 1 to the stack)",
    },
    {
      type: "paragraph",
      content: "(bold)0x51(bold) = OP_1 (pushes the number 1 to the stack)",
    },
    {
      type: "paragraph",
      content: "(bold)0x93(bold) = OP_ADD",
    },
    {
      type: "paragraph",
      content: "(bold)SegWit				0x015101510193(bold)",
    },
    {
      type: "paragraph",
      content:
        "(bold){0x01, 0x51}(bold) = size of item is 1 byte, that item is 0x51",
    },
    {
      type: "paragraph",
      content:
        "(bold){0x01, 0x51}(bold) = size of item is 1 byte, that item is 0x51",
    },
    {
      type: "paragraph",
      content:
        "(bold){0x01, 0x93}(bold) = size of item is 1 byte, that item is 0x51",
    },
    {
      type: "paragraph",
      content:
        "As seen above, a client would need to parse each type of script format differently. In the example above, since each item is an op_code, the length of each item was a single (0x01) byte - so the SegWit equivalent of the starting example held tuples where the size was consistent.",
    },
    {
      type: "paragraph",
      content:
        "Continuing the example, what precedes each script? As discussed in theTuple Count section above, both Legacy & SegWit express different indicators of size.",
    },
    {
      type: "paragraph",
      content: "(bold)Legacy(bold)	length of script in bytes	0x03",
    },
    {
      type: "paragraph",
      content: "(bold)SegWit(bold)	length of tuples array		0x03",
    },
    {
      type: "paragraph",
      content:
        "Again, if we measured the length of the script for SegWit, we’d end up with a different number. Now that we know what precedes the tuple array, let’s write the complete Legacy (with the preceding SigScriptSize) & the complete SegWit script:",
    },
    {
      type: "paragraph",
      content: "(bold)Legacy(bold) 0x03515193",
    },
    {
      type: "paragraph",
      content: "(bold)SegWit(bold) 0x03015101510193",
    },
    {
      type: "paragraph",
      content:
        "From an array of bytes to an array of tuples, that’s basically the “challenging” part to grok from SegWit which we hope these two examples above made it clear.",
    },
    {
      type: "title",
      content: "Closing",
    },
    {
      type: "paragraph",
      content:
        "And that’s it in terms of understanding exactly what the Witness in SegWit is & how it compares to the traditional Input SigScript! In the previous article we reviewed how the separation, or segregation, shifts the SigScript from the Inputs section to the Witnesses section; & now, with this article, we covered the formatting changes that happen along with this shift in placement.",
    },
    {
      type: "paragraph",
      content:
        "With both of the core mechanics involved in going from SigScript to a Witness covered, you hopefully have a better grasp on the differences between a Legacy & SegWit transaction. ",
    },
  ],
};

import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ATaleOfTwoPaths } from "@/const/Articles/ataleoftwopaths";
import { WhatsInAnInputAnyways } from "@/const/Articles/whatsinaninputanyways";

export const BitcoinBasics: ArticleViewProps[] = [
  WhatsInAnInputAnyways,
  {
    module: "Witness Transaction",
    section: "From SigScript To Witness",
    published: "Nov. 3rd 2023",
    title: "Formatting Witness Script",
    description: "",
    href: "/lessons/Formatting Witness Script",
    isLocked: false,
    itemType: "article",
    lesson: 1,
    googleLinkBigScreen:
      "https://docs.google.com/document/d/e/2PACX-1vToRVUnb21TSyzKekX5NPS9YUM7J4-vvIhBwCXXn48p6nsBunaiD8jwkP1EKOndf5JftINy3u2zcdOn/pub?embedded=true",
    googleLinkSmallScreen:
      "https://docs.google.com/document/d/e/2PACX-1vRwaFEFx31lpFhMWWO8vMcuEPrXHVdn3X4YJRuL4gvCamY4tfSGt9dbspA0VRoK4ZJftoRONtl-w7ad/pub?embedded=true",
    content: [
      { type: "paragraph", content: "This is a sample paragraph" },
      {
        type: "image",
        src: "image_url_here",
        alt: "Image description",
      },
    ],
  },

  {
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
      { type: "paragraph", content: "This is a sample paragraph" },
      {
        type: "image",
        src: "image_url_here",
        alt: "Image description",
      },
    ],
  },
  {
    module: "Taproot Transaction",
    section: "Prerequisites & Review",
    published: "Nov. 5th 2023",
    title: "Why Taproot",
    description: "",
    href: "/lessons/Why Taproot",
    isLocked: true,
    itemType: "article",
    lesson: 4,
    googleLinkBigScreen:
      "https://docs.google.com/document/d/e/2PACX-1vSyjDlsM_4jkEuHHN1d-mvwmSj4fwQFer9phQYKs45w8Mw6DBD6yWVWBNKg3ImgQvXONDPhDH5fcKL8/pub?embedded=true",
    googleLinkSmallScreen:
      "https://docs.google.com/document/d/e/2PACX-1vSYG9ooussMRKlJHIsq-nZj0bdY1y3yUaQTdo_80GlbVGkQk_x5UPBDlwgMWt2jovekzd2QkuHG_WNM/pub?embedded=true",
    content: [
      { type: "paragraph", content: "This is a sample paragraph" },
      {
        type: "image",
        src: "image_url_here",
        alt: "Image description",
      },
    ],
  },
  ATaleOfTwoPaths,
  {
    module: "Taproot Transaction",
    section: "ScriptPath",
    published: "Nov. 10th 2023",
    title: "Merkle Tree Review",
    description: "",
    href: "/lessons/Merkle Tree Review",
    isLocked: true,
    itemType: "article",
    lesson: 6,
    googleLinkBigScreen:
      "https://docs.google.com/document/d/e/2PACX-1vRlfYPJ0U6shZ8ACDEeG23S6_MvPv7JyM2aCYu8OQBVMD7EMgst_5NrzuspBSPchi0rw73fpcXaexJr/pub?embedded=true",
    googleLinkSmallScreen:
      "https://docs.google.com/document/d/e/2PACX-1vRJ3IkHJhQ-R7nnN7YR7BE06bIMSE7-PyTTLITqC7GbwnW6mFDgrUVxRXM1advv7EsE8A2Y2kmY0aHl/pub?embedded=true",
    content: [
      { type: "paragraph", content: "This is a sample paragraph" },
      {
        type: "image",
        src: "image_url_here",
        alt: "Image description",
      },
    ],
  },
];

import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ATaleOfTwoPaths as English } from "./ataleoftwopaths";

// French translation of ATaleOfTwoPaths.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `module`, `section`, `href`, `shortHandTitle`, `lesson`, `itemType`,
// `isLocked`, `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen`
// identical to the English version (inherited via the spread) so URLs and
// page routing stay stable across locales.

export const ATaleOfTwoPathsFr: ArticleViewProps = {
  ...English,
  title: "L'histoire de deux chemins",
  description:
    "Un aperçu introductif des transactions Taproot, mettant en lumière le KeyPath, le ScriptPath et leur importance dans les transactions Bitcoin.",
  content: [
    {
      type: "main title",
      content: "Les bases du KeyPath & du ScriptPath de Taproot ",
    },
    {
      type: "paragraph",
      content:
        "Comme nous l'avons évoqué dans l'introduction de cette section « Pourquoi Taproot », Taproot est la mise à niveau majeure la plus passionnante et la plus activement développée de Bitcoin depuis SegWit. En réalité, la plupart des projets véritablement à la pointe de ces une à trois dernières années sont tous construits sur Taproot :",
    },
    {
      type: "list",
      content: [
        {
          type: "hashed-item",
          content:
            "(linkpagehttps://ordinals.com/)Inscriptions Ordinal(linkpage)",
        },
        {
          type: "hashed-item",
          content:
            "(linkpagehttps://docs.lightning.engineering/the-lightning-network/taproot-assets)Taproot Assets(linkpage)",
        },
        {
          type: "hashed-item",
          content: "(linkpagehttps://bitvm.org/bitvm.pdf)BitVM(linkpage)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Et il m'en manque sûrement bien d'autres. Le fait est que ce n'est pas théorique, c'est utilisé (bold)(italics)dès maintenant(italics)(bold) et tient sans aucun doute sa promesse d'une confidentialité accrue, d'une efficacité accrue et de frais réduits. Depuis sa mise à jour en 2021, Taproot a connu une croissance régulière de la pénétration de son format d'adresse, suivie d'une accélération drastique avec le lancement d'Ordinals.",
    },
    {
      type: "paragraph",
      content:
        "Ce qui nous amène à aujourd'hui. Aujourd'hui, nous allons présenter exactement *ce qu'est* Taproot et comment il fonctionne sous le capot. Nous ne traiterons bien sûr pas ces points en détail, mais nous visons à exposer et à relier les pièces pour le reste de cette série.",
    },
    {
      type: "paragraph",
      content:
        "Taproot est un nouveau type de transaction SegWit qui, par défaut, est livré avec deux chemins dépensables (un (bold)KeyPath(bold) et un (bold)ScriptPath(bold)).",
    },
    {
      type: "paragraph",
      content:
        "Comme d'habitude, nous commencerons par un exemple visible dans le (linktransactions)Deserializer(link) afin de pouvoir voir le lien entre la conception et une transaction confirmée. Concentrons-nous d'abord sur le format de la sortie.",
    },
    {
      type: "title",
      content: "Sortie",
    },
    {
      type: "paragraph",
      content:
        "Comme mentionné dans la leçon « Pourquoi Taproot », le plus grand facteur d'amélioration de la confidentialité des transactions on-chain provient (italics)du format universel de la sortie(italics). Chaque sortie Taproot a la même apparence en termes d'éléments et de longueur :",
    },
    {
      type: "image",
      src: "/articles/a tale of two paths/image1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Dans la transaction mise en évidence ci-dessus, que vous trouverez (linkpagehttps://www.bitscript.app/transactions?transaction=d53b9e0b9e4a0b2e77ad61862a3d385d9748c9b6e6ea402be7efdcafb931d2a7)ici(linkpage), vous remarquerez que le scriptPubKey de la sortie Taproot se compose de trois éléments différents. Que le KeyPath soit une signature unique ou multi-signature, (italics)ou(italics) que l'arbre de Merkle du ScriptPath soit vide ou contienne 2ª128 chemins de script, le format de (bold)(italics)n'importe quelle(italics)(bold) sortie Taproot (italics)est exactement le même(italics) (c'est de là que vient la sécurité accrue). ",
    },
    {
      type: "paragraph",
      content:
        "Pour examiner ce motif sur une transaction minée, consultez un ou plusieurs des exemples Taproot en vous concentrant sur les scriptPubKey de sortie ; à terme, il devient clair que le format du scriptPubKey de sortie Taproot respecte ce qui suit : ",
    },
    {
      type: "image",
      src: "/articles/a tale of two paths/image2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Ce qui précède résume la norme pour un scriptPubKey Taproot. Chacun de ces scripts ne contient que trois éléments et chaque sortie devrait les comporter - passons-les en revue ci-dessous :",
    },
    {
      type: "paragraph",
      content: "(bold)Indicateur de version SegWit(bold) (0x51)*",
    },
    {
      type: "paragraph",
      content:
        "Chaque scriptPubKey compatible SegWit avec un destinataire compatible SegWit commence par un champ qui signale la (italics)version(italics)) de SegWit utilisée. Avant Taproot, il n'existait qu'une seule valeur de version SegWit considérée comme standard dans un scriptPubKey : (bold)0x00(bold). Taproot, pour son indicateur de version SegWit, utilise quant à lui la valeur vue ci-dessus : (bold)0x51(bold).",
    },
    {
      type: "paragraph",
      content:
        "(italics)*Pour être honnête, nous ne savons pas tout à fait pourquoi le BIP341 prévoit 0x51 (OP_PUSHDATA1) au lieu de (0x01), la valeur de version SegWit supposée suivante après 0x00 - si vous le savez, n'hésitez pas à nous contacter car nous aimerions inclure le « pourquoi » dans cet article.(italics)",
    },
    {
      type: "title",
      content: "OP_PUSH20 | OP_PUSH21",
    },
    {
      type: "paragraph",
      content:
        "Cet élément suivant est connu sous le nom d'opération push data. Ces op_codes sont utilisés dans le script Bitcoin pour communiquer à la pile la taille (en octets) des données que nous sommes sur le point de pousser. Dans Taproot, vous incluez directement une clé publique comme dernier élément, comme nous le verrons ci-dessous. ",
    },
    {
      type: "paragraph",
      content:
        "Cette clé publique, selon qu'elle est paire ou impaire, fait soit 32 octets, soit 33 octets ; par conséquent, ce deuxième élément d'un scriptPubKey Taproot est toujours soit OP_PUSH20 (0x20), soit OP_PUSH21 (0x21).",
    },
    {
      type: "title",
      content: "Clé publique Taproot",
    },
    {
      type: "paragraph",
      content:
        "Et c'est tout en ce qui concerne le format d'une sortie Taproot - tout Bitcoin envoyé à une adresse Taproot contiendra un scriptPubKey avec les mêmes éléments. Maintenant, avant de poursuivre, affichons la configuration que nous avons ici (il convient de préciser que le diagramme ci-dessous omet l'étape de « tweak » qui dérive la clé publique Taproot - nous y reviendrons plus tard) :",
    },
    {
      type: "image",
      src: "/articles/a tale of two paths/image3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "title",
      content: "KeyPath",
    },
    {
      type: "paragraph",
      content:
        "Le dernier élément d'une sortie Taproot est la clé publique tweakée. Nous reviendrons plus tard sur la signification de ce terme « tweakée » car il est important dans la construction de la sortie. Mais, pour l'instant, tout ce qui nous intéresse est d'établir les bases du KeyPath. Comme son nom l'indique, le KeyPath est disponible pour le propriétaire de la clé publique destinataire afin de signer et de dépenser le Bitcoin en tant que signataire unique, multi-signature ou quelque part entre les deux (comme une multi-signature avec un seuil défini).",
    },
    {
      type: "paragraph",
      content:
        "Comme nous le verrons également dans l'article bien plus long consacré au KeyPath, la base de ces fonctionnalités est introduite dans le (linkpagehttps://www.bitscript.app/transactions?transaction=d53b9e0b9e4a0b2e77ad61862a3d385d9748c9b6e6ea402be7efdcafb931d2a7)BIP 340 : Signatures Schnorr(linkpage). Alternative au schéma cryptographique ECDSA, l'introduction des signatures Schnorr dans Taproot a considérablement accru l'utilité et la flexibilité des clés publiques et des signatures.",
    },
    {
      type: "paragraph",
      content:
        "Il y a, bien sûr, bien plus à détailler sur le KeyPath, cependant, pour l'instant, nous souhaitons limiter cet article aux bases avant de plonger plus loin dans la série.",
    },
    {
      type: "title",
      content: "ScriptPath",
    },
    {
      type: "paragraph",
      content:
        "En plus du KeyPath, qui, nous l'avons maintenant vu, offre plus qu'une simple condition de dépense à signature unique, chaque sortie Taproot dispose d'un second chemin de dépense alternatif qui offre un nombre incommensurablement plus grand de conditions de dépense : le ScriptPath. Cependant, comme nous l'avons mentionné précédemment, bien que le (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)BIP(linkpage) Taproot le définisse comme le « ScriptPath », il convient de se rappeler qu'il ne s'agit pas d'un script unique mais plutôt d'un arbre de Merkle de scripts (connus sous le nom de tapleaves ou feuilles). En bref, (italics)chaque(italics) tapleaf peut contenir un script avec des conditions de dépense uniques ; par curiosité, la limite supérieure du nombre de tapleaves qu'une seule sortie Taproot peut contenir est de (bold)(italics)2ª128 scripts, rien de moins(italics)(bold).",
    },
    {
      type: "paragraph",
      content:
        "Le destinataire, lorsqu'il souhaite dépenser son Bitcoin par la suite, a la possibilité (bold)(italics)soit(italics)(bold) de dépenser via le KeyPath (bold)(italics)soit(italics)(bold) de choisir l'une des tapleaves du ScriptPath. Dépenser via le KeyPath est simple car tout ce qui est nécessaire est une signature Schnorr correspondante ; cependant, dépenser une tapleaf du ScriptPath est nettement plus complexe et a trait aux arbres de Merkle. Plus précisément, nous devrons examiner et comprendre comment les arbres de Merkle peuvent être utilisés pour prouver l'inclusion de quelque chose.",
    },
    {
      type: "paragraph",
      content:
        "Et c'est tout pour cet article ! En résumé, toutes les sorties Taproot sont des sorties compatibles SegWit qui commencent par (bold)0x51(bold9) (un indicateur de version SegWit) et sont suivies peu après par une clé publique tweakée ; de plus, toutes les sorties Taproot sont livrées avec deux chemins de dépense par défaut, un KeyPath plus simple et un ScriptPath plus complexe. Bien sûr, tout ce que nous savons maintenant n'est encore que des connaissances superficielles destinées à une introduction, dans les prochains articles nous plongerons plus profondément dans chaque partie de Taproot, en nous préparant à répondre à quelques questions fondamentales telles que :",
    },
    {
      type: "list",
      content: [
        {
          type: "hashed-item",
          content: "Comment la clé publique Taproot finale est-elle générée ?",
        },
        {
          type: "hashed-item",
          content: "Quelles sont les différences entre ECDSA et Schnorr ?",
        },
        {
          type: "hashed-item",
          content: "Comment dépensons-nous réellement l'une des tapleafs ?",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Continuez votre lecture et nous veillerons à répondre à ces questions et, espérons-le, à toutes celles que vous pourriez encore avoir.",
    },
  ],
};

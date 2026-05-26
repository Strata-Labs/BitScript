import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { FormattingWitnessScript as English } from "./formattingwitnessscript";

// French translation of FormattingWitnessScript.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `href`, `shortHandTitle`, `lesson`, `itemType`, `isLocked`,
// `published`, `module`, `section`, `googleLinkBigScreen`, and
// `googleLinkSmallScreen` identical to the English version (inherited via the
// spread) so URLs and routing stay stable across locales.

export const FormattingWitnessScriptFr: ArticleViewProps = {
  ...English,
  title: "Formatage du Witness Script",
  description:
    "Explorez la transformation du ScriptSig en Witness Script dans les transactions Bitcoin grâce à Segregated Witness (SegWit)",
  content: [
    {
      type: "main title",
      content: "Introduction",
    },
    {
      type: "paragraph",
      content:
        "SegWit, abréviation de Segregated Witness, est de loin l'une des mises à jour les plus importantes et les plus marquantes de Bitcoin, et plus particulièrement du formatage des scripts au sein des transactions Bitcoin. Introduit en 2017 à travers les BIPs (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)141(linkpage), (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki)143(linkpage) et (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki)144(linkpage), SegWit fut la tentative de Luke Dash Jr. d'apaiser la guerre culturelle Small Block contre Large Block qui couvait en arrière-plan depuis plusieurs années. ",
    },
    {
      type: "paragraph",
      content:
        "Traité plus en profondeur dans la leçon d'ouverture de ce module, SegWit a trouvé une solution acceptable (certes temporaire) aux problèmes d'espace de bloc, de malléabilité des transactions et de frais de transaction qui préoccupaient les deux parties. Veuillez consulter la leçon d'ouverture pour plus d'informations approfondies, telles que les compromis reconnus de part et d'autre.",
    },
    {
      type: "paragraph",
      content:
        "Quoi qu'il en soit, ce sont les détails techniques de SegWit qui nous intéressent aujourd'hui. À un haut niveau, les mécanismes par lesquels le format passe du Legacy au SegWit peuvent se résumer en deux étapes : ",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. Le ScriptSig (ou Unlock Script), que l'on trouve généralement (italics)après(italics) le champ ScriptSigSize et (italics)avant(italics) le champ Sequence, est déplacé vers une section appelée « Witnesses » désormais située après les Outputs",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)Le ScriptSig, généralement formaté comme un tableau d'octets, est désormais converti en un tableau de (italics)tuples(italics) à la place(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Un déplacement et un reformatage. Ces deux étapes sont nécessaires à la compréhension de SegWit ; aujourd'hui, cependant, nous nous concentrerons strictement sur la 2ème étape, en gras — à savoir comment exactement un Witness est-il formaté ?",
    },
    {
      type: "title",
      content: "Déplacement",
    },
    {
      type: "paragraph",
      content:
        "Avant d'inspecter le changement de formatage, passons rapidement en revue la leçon précédente. Comme montré dans l'article précédent, contrairement à une entrée Legacy, une entrée SegWit sépare, ou (bold)ségrège(bold), le ScriptSig de l'entrée vers la section Witness. Cela signifie simplement que le ScriptSig est déplacé et n'est plus adjacent au reste de l'entrée, mais se trouve désormais après la section Output :",
    },
    {
      type: "image",
      src: "/articles/formatting witness scripts/Image.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "On pourrait supposer que le format du ScriptSig lui-même resterait identique ; hélas, comme nous le voyons ci-dessus et le détaillerons sous peu, on aurait tort.",
    },
    {
      type: "title",
      content: "Format",
    },
    {
      type: "paragraph",
      content:
        "La principale leçon que nous aborderons aujourd'hui concerne les détails d'implémentation et les différences de (italics)formatage(italics) entre un ScriptSig d'entrée et un Witness SegWit. Commençons d'abord par épuiser les noms possibles que nous entendrons et par résumer les différences de format sous forme de paragraphe :",
    },
    {
      type: "paragraph",
      content:
        "(italics)Dans les transactions Legacy, les entrées n'ont que des ScriptSigs/UnlockScripts qui sont analysés comme des tableaux d'(bold)octets(bold).(italics)",
    },
    {
      type: "paragraph",
      content:
        "(italics)Dans les transactions SegWit, certaines entrées ont des ScriptSigs/UnlockScripts et certaines entrées ont des Witnesses/WitnessesScripts qui contiennent un indicateur de taille et sont analysés comme des tableaux de (bold)tuples(bold).(italics)",
    },
    {
      type: "paragraph",
      content:
        "Dans ce dernier cas, un Witness SegWit, chaque tuple contient (bold)deux(bold) éléments. Le premier, un indicateur de taille VarInt, qui signale la taille du prochain morceau de données qui sera poussé sur la pile. Le second est le morceau de données suivant lui-même — qu'il s'agisse d'un op_code ou de données poussées comme une signature ECDSA ou une clé publique hachée. ",
    },
    {
      type: "paragraph",
      content:
        "Ci-dessous se trouve un tableau pratique qui décompose cette différence de structure, que nous aborderons en détail plus bas :",
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
        "Le Witness, comme prévisualisé ci-dessus, n'est pas simplement un tableau de tuples en tant que tableau ; tout comme le ScriptSig est précédé du ScriptSigSize, le tableau de tuples est également précédé d'un compteur qui signale la longueur du tableau / combien de tuples inspecter. Chaque Witness ou WitnessScript peut être mieux compris en le décomposant en deux parties distinctes — l'image ci-dessous montre un exemple de witness découpé en compteur de tuples suivi du tableau de tuples :",
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
        "Ensemble, ces deux parties constituent cumulativement le « Witness Script ». Nous passerons en revue chaque partie individuellement ensuite. ",
    },
    {
      type: "title",
      content: "Compteur de tuples (VarInt)",
    },
    {
      type: "paragraph",
      content:
        "Le premier élément de tout Witness Script est un compteur VarInt qui dicte combien d'éléments se trouvent dans ce witness / witness script ; plus précisément, il dicte combien de (bold)(italics)tuples(italics)(bold) se trouvent dans le tableau de tuples à venir. Il vaut la peine de souligner les similitudes et les différences avec l'indicateur ScriptSigSize, équivalent en fonctionnalité, présent dans les entrées :",
    },
    {
      type: "list",
      content: [
        {
          type: "hashed-item",
          content:
            "- Dans un ScriptSig Legacy, nous fournissons le ScriptSigSize, un VarInt, (italics)qui fournit la (bold)longueur du script entier(bold) en octets(italics)",
        },
        {
          type: "hashed-item",
          content:
            "- Dans un WitnessScript SegWit, nous fournissons le compteur de tuples, un VarInt (italics)qui fournit un (bold)décompte(bold) du nombre (bold)de tuples(bold)(italics)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "En inspectant, nous remarquons que le premier élément dans (bold)(italics)les deux(italics)(bold) scripts est un VarInt avec des instructions sur ce qui suit ; cependant, ils signifient des choses entièrement différentes. Le premier, le ScriptSigSize, est la longueur du script entier, en un seul bloc, en octets. Le second, le compteur de tuples, est un décompte de toutes les différentes pièces du script qui, en agrégation, constituent le script entier.",
    },
    {
      type: "paragraph",
      content:
        "Ils commencent tous deux par des VarInts et communiquent, soit par la longueur du script, soit par le décompte des éléments du script, la taille du script. Cela étant compris, plongeons dans les tuples à deux éléments qui constituent le Witness Script.",
    },
    {
      type: "title",
      content: "Tableau de tuples",
    },
    {
      type: "paragraph",
      content:
        "La plus grande différence et probablement la plus grande source de confusion entre un ScriptSig d'entrée et un Witness SegWit est que le premier exprime directement les éléments de script (données poussées et op_codes) sous forme de chaîne hexadécimale, tandis que le second exprime les éléments de script dans un tableau de tuples.",
    },
    {
      type: "paragraph",
      content:
        "Le script, avant le softfork activé par les utilisateurs SegWit, avait un format unique sous forme de tableau d'octets hexadécimaux. Pour les ScriptSigs d'entrée et les PubKeyScripts de sortie, ce format était cohérent. SegWit a changé cela en introduisant une seconde façon d'exprimer un script : sous forme de tableau de tuples à deux éléments. ",
    },
    {
      type: "paragraph",
      content:
        "Qu'y a-t-il dans ces tuples ? Eh bien, comme vous l'avez vu dans l'aperçu ci-dessus, le Witness/WitnessScript est séparé en éléments dans des tuples et à l'intérieur de chaque tuple nous trouvons deux éléments :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Taille de l'élément :(bold) La taille (en VarInt) du prochain élément de script",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)Élément :(bold) Le prochain élément de script exprimé en hexadécimal",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Cela semble plus compliqué que ça ne l'est. La meilleure façon de démystifier (italics)quoi que ce soit(italics) est de travailler à travers des exemples — c'est donc exactement ce que nous ferons :",
    },
    {
      type: "title",
      content: "Exemple : OP_1 + OP_2 + OP_ADD",
    },
    {
      type: "paragraph",
      content: "(bold)Legacy				0x515193(bold)",
    },
    {
      type: "paragraph",
      content: "(bold)0x51(bold) = OP_1 (pousse le nombre 1 sur la pile)",
    },
    {
      type: "paragraph",
      content: "(bold)0x51(bold) = OP_1 (pousse le nombre 1 sur la pile)",
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
        "(bold){0x01, 0x51}(bold) = la taille de l'élément est de 1 octet, cet élément est 0x51",
    },
    {
      type: "paragraph",
      content:
        "(bold){0x01, 0x51}(bold) = la taille de l'élément est de 1 octet, cet élément est 0x51",
    },
    {
      type: "paragraph",
      content:
        "(bold){0x01, 0x93}(bold) = la taille de l'élément est de 1 octet, cet élément est 0x51",
    },
    {
      type: "paragraph",
      content:
        "Comme vu ci-dessus, un client devrait analyser chaque type de format de script différemment. Dans l'exemple ci-dessus, puisque chaque élément est un op_code, la longueur de chaque élément était d'un seul octet (0x01) — donc l'équivalent SegWit de l'exemple de départ contenait des tuples où la taille était cohérente.",
    },
    {
      type: "paragraph",
      content:
        "En poursuivant l'exemple, qu'est-ce qui précède chaque script ? Comme discuté dans la section Compteur de tuples ci-dessus, le Legacy et le SegWit expriment tous deux des indicateurs de taille différents.",
    },
    {
      type: "paragraph",
      content: "(bold)Legacy(bold)	longueur du script en octets	0x03",
    },
    {
      type: "paragraph",
      content: "(bold)SegWit(bold)	longueur du tableau de tuples		0x03",
    },
    {
      type: "paragraph",
      content:
        "Encore une fois, si nous mesurions la longueur du script pour SegWit, nous obtiendrions un nombre différent. Maintenant que nous savons ce qui précède le tableau de tuples, écrivons le script Legacy complet (avec le ScriptSigSize précédent) et le script SegWit complet :",
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
        "D'un tableau d'octets à un tableau de tuples, c'est essentiellement la partie « difficile » à saisir de SegWit, que ces deux exemples ci-dessus ont, nous l'espérons, rendue claire.",
    },
    {
      type: "title",
      content: "Conclusion",
    },
    {
      type: "paragraph",
      content:
        "Et voilà tout ce qu'il faut pour comprendre exactement ce qu'est le Witness dans SegWit et comment il se compare au ScriptSig d'entrée traditionnel ! Dans l'article précédent, nous avons examiné comment la séparation, ou ségrégation, déplace le ScriptSig de la section Inputs vers la section Witnesses ; et maintenant, avec cet article, nous avons couvert les changements de formatage qui accompagnent ce déplacement.",
    },
    {
      type: "paragraph",
      content:
        "Avec les deux mécanismes fondamentaux impliqués dans le passage du ScriptSig à un Witness couverts, vous avez, espérons-le, une meilleure compréhension des différences entre une transaction Legacy et une transaction SegWit. ",
    },
  ],
};

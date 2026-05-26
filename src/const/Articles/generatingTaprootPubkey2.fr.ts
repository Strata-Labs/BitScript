import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { GeneratingTaprootPubKey2 as English } from "./generatingTaprootPubkey2";

// French translation of GeneratingTaprootPubKey2.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `module`, `section`, `href`, `shortHandTitle`, `lesson`, `itemType`,
// `isLocked`, `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen`
// identical to the English version (inherited via the spread) so URLs and
// navigation stay stable across locales.

export const GeneratingTaprootPubKey2Fr: ArticleViewProps = {
  ...English,
  title: "Générer une PubKey Taproot (Pt. II)",
  description: "Clé interne, ScriptPath et assemblage final",
  content: [
    {
      type: "main title",
      content: "Générer une PubKey Taproot (Pt. II)",
    },
    {
      type: "subtitle",
      content: "Clé interne, ScriptPath et assemblage final",
    },
    {
      type: "title",
      content: "Récapitulatif des étapes",
      customClass: "font-bold"
    },
    {
      type: "paragraph",
      content:
        "Dans notre premier article, (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I)) Générer une PubKey Taproot (Pt. I)(linkpage), nous avons défini et entrepris de construire notre sortie taproot « coffre familial ». Au cours de cet article, nous avons découvert le processus TagHash et généré les quatre TapLeafs que nous allons maintenant utiliser pour chacun de nos quatre chemins de dépense possibles. Une fois ces TapLeafs achevés, cela a marqué la fin des deux premières des quatre étapes nécessaires à la génération d'une sortie P2TR | clé taproot. Dans cet article, pour rappel rapide, nous allons couvrir les deux étapes suivantes de notre processus :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "3. Générer la racine du ScriptPath",
        },
        {
          type: "numbered-item",
          content: "4. Tweaker la clé interne",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "La première section que nous passerons en revue ici, la troisième étape cumulée, concerne le processus de merkilisation de nos quatre tapleafs qui aboutira à la racine du scriptpath ; la seconde section, la quatrième étape cumulée, concerne les deux dernières étapes au cours desquelles nous utiliserons la clé interne pour dériver la clé taproot (ou sortie p2tr).",
    },
    {
      type: "paragraph",
      content: "(bold)Générer la racine du ScriptPath(bold)",
    },
    {
      type: "paragraph",
      content:
        "Comme nous l'avons répété tout au long, ces deux articles sont l'aboutissement de nombreux prérequis. Pour le scriptpath, le type de données fondamental que vous devez maîtriser est l'arbre de Merkle ; si cela vous semble ne serait-ce que vaguement peu familier, alors je vous suggère de retourner lire l'article lié (linkpagehttps://www.bitscript.app/lessons/Merkle%20Tree%20Review)ici(linkpage) d'abord. En guise de rappel en deux phrases, les arbres de Merkle sont une structure de données courante utilisée spécifiquement pour l'efficacité dans la vérification des données ; un arbre de Merkle, qui est le plus souvent mais pas toujours un arbre binaire symétrique, stocke des hash de données, et non les données elles-mêmes (d'où sa légèreté en calcul). Une fois créé, la vérification des données s'effectue via un processus appelé preuve de Merkle (merkle proof) — en aperçu, nous l'utiliserons lors de la dépense depuis le scriptpath.",
      customClass: "-mt-4"
    },
    {
      type: "paragraph",
      content:
        "Quoi qu'il en soit, le concept clé qui nous intéresse aujourd'hui est la manière dont les arbres de Merkle sont (bold)créés.(bold) Encore une fois, nous ne le passerons pas en revue en profondeur ici, mais, en bref, ce processus consiste à concaténer et hacher les feuilles, de gauche à droite, en remontant l'arbre jusqu'à ce qu'il ne reste qu'un seul hash (connu sous le nom de (bold)racine(bold)). C'est, bien sûr, la manière standard de créer un arbre de Merkle ; cependant, comme vous l'avez vu tout au long, le scriptpath introduit toujours quelques subtilités sous la forme du TagHashing.",
    },
    {
      type: "paragraph",
      content:
        "Notre situation, bien qu'extrêmement simplifiée avec seulement quatre tapleafs, devrait tout de même mettre en évidence le processus fondamental impliqué.",
    },
    {
      type: "paragraph",
      content: "étape répétée (jusqu'à atteindre la racine)",
      customClass: "ml-9"
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "1. Ordonner chaque paire de hash",
        },
        {
          type: "numbered-item",
          content: "2. Concaténer chaque paire de hash",
        },
        {
          type: "numbered-item",
          content: "3. TagHash('TapBranch') chaque hash résultant",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Traditionnellement, un arbre de Merkle est achevé une fois la racine atteinte, car cela signifie qu'il n'y a plus d'éléments à concaténer et hacher.",
    },
    {
      type: "paragraph",
      content: "(italics)Ordonnancement canonique(italics)",
    },
    {
      type: "paragraph",
      content:
        "En supposant que vous soyez effectivement à jour sur les arbres de Merkle, vous savez déjà que l'ordre de tout (c'est-à-dire les feuilles et les branches) est (bold)critique(bold) : hacher les mêmes feuilles dans un ordre différent produira une racine entièrement différente. Donc une bonne première question à se poser, maintenant que nous avons nos quatre tapleafs, est : comment nos quatre tapleafs et nos deux futures tapbranches sont-ils ordonnés de manière canonique ?",
      customClass: "-mt-4"
    },
    {
      type: "paragraph",
      content: "(bold)Lexicographiquement !(bold)",
    },
    {
      type: "paragraph",
      content:
        "Cela signifie que chaque tapleaf et tapbranch, puisqu'ils sont chacun des tableaux d'octets, sont comparés octet par octet et triés par ordre croissant. Ci-dessous, nous pouvons voir nos quatre tapleafs désormais organisés dans l'ordre :",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey 2/Taproot Ordered.png",
      alt: "Taproot Ordered",
    },

    {
      type: "paragraph",
      content:
        "Un point clé à noter est que ce processus d'ordonnancement est appliqué non seulement avec les TapLeafs de départ, mais aussi à chaque niveau de branches (c'est-à-dire au fur et à mesure que vous remontez l'arbre) ; — sans cette norme, il est très probable que les clients échoueraient à créer des preuves de Merkle exactes.",
    },
    {
      type: "paragraph",
      content: "Le TagHash revisité",
      customClass: "text-xl"
    },
    {
      type: "paragraph",
      content:
        "Tout comme la création du TapLeaf lui-même nécessitait un formatage particulier avec la fonction TagHash, remonter l'arbre de Merkle nécessite également un TagHashing particulier.",
      customClass: "-mt-4"
    },
    {
      type: "paragraph",
      content:
        "Une fois les quatre tapleafs ordonnés, nous pouvons commencer le processus de merkilisation proprement dit. Notre première étape consiste bien sûr à standardiser les quatre TapLeafs en les hachant tous à l'aide de SHA256(x). Une fois cela fait, il nous reste officiellement nos feuilles de Merkle et nous pouvons commencer à remonter l'arbre.",
    },
    {
      type: "paragraph",
      content:
        "Comme dans tout processus de Merkle, nous travaillons de gauche à droite et commençons donc par concaténer H(Spouse) avec H(Parents) ; typiquement, cette concaténation est tout ce qui est requis pour construire un arbre, bien sûr, c'est Taproot, donc quelques subtilités sont impliquées. Comme nous l'avons annoncé en aperçu, cette étape implique également une forme de TagHashing introduite dans l'article précédent. Comme vous pouvez probablement le deviner, cette fois-ci nous allons implémenter le format TapBranch : TapHash((bold)'TapBranch'(bold)).",
    },
    {
      type: "paragraph",
      content:
        "En gardant à l'esprit les étapes décrites ci-dessus, nous allons parcourir chaque étape requise :",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey 2/TaprootSteps.png",
      alt: "TaprootSteps",
    },
    {
      type: "paragraph",
      content:
        "En suivant les étapes ci-dessus, vous pouvez voir comment nous aboutissons à un unique tableau de 32 octets résultant du TagHashing('TapBranch') de la racine. Traditionnellement, cette racine est considérée comme la dernière étape d'un arbre de Merkle standard ; cependant, il reste encore une seule étape, ou tweak, avant que nous puissions la considérer comme achevée.",
    },
    {
      type: "paragraph",
      content: "(bold)Tweaker la clé interne(bold)",
    },
    {
      type: "paragraph",
      content:
        "La quatrième et dernière étape de la génération d'une clé taproot consiste à tweaker la clé interne avec la racine de Merkle du scriptpath ainsi que des données supplémentaires. Décomposons cela un peu.",
      customClass: "-mt-4"
    },
    {
      type: "paragraph",
      content:
        "Dans la dernière (3e) étape, l'objectif était entièrement de merkiliser le scriptpath jusqu'à ce qu'il ne nous reste qu'une seule racine. Bien que les arbres de Merkle soient typiquement achevés une fois la racine terminée, cela ne peut pas être dit du scriptpath. Il y a en réalité deux étapes ici, pas une, qu'il convient de souligner.",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            '1. TagHash("taptweak") sur la clé publique interne concaténée avec la racine TapBranch',
        },
        {
          type: "numbered-item",
          content:
            "2. Multiplier le résultat par G et l'ajouter à la clé interne (P)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Nous allons plonger dans ces deux étapes ci-dessous, une fois qu'elles sont toutes deux effectuées avec succès, il nous restera notre unique clé Taproot de 32 octets que nous pourrons coller dans une sortie P2TR.",
    },
    {
      type: "paragraph",
      content: '(bold)TagHash("TapTweak", Internal Key || CDAB)(bold)',
    },
    {
      type: "paragraph",
      content:
        "La première étape consiste à exécuter une dernière étape TagHash. C'est la première et unique fois où nous invoquerons TagHash(\"TapTweak\"). De plus, il convient de noter que nous concaténons également la clé interne avec la racine de l'arbre de Merkle / scriptpath — le résultat du tout dernier TapBranch. Le résultat ici est communément appelé la valeur de tweak (t).",
      customClass: "-mt-4"
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey 2/TapTweak.png",
      alt: "TapTweak",
    },
    {
      type: "paragraph",
      content: "(bold)Tweaker la clé interne (Internal Key + TweakKey*G)(bold)",
    },
    {
      type: "paragraph",
      content:
        'La toute dernière étape que nous devons accomplir est maintenant de tweaker notre clé interne avec la valeur de tweak finale dérivée (t). Encore une fois, comme nous l\'avons mentionné dans l\'article précédent, « tweaker » peut signifier une ou une combinaison de plusieurs opérations effectuées sur notre clé publique de 32 octets. Dans ce cas particulier, dans notre tweak taproot, nous effectuons ce qui suit :',
      customClass: "-mt-4"
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey 2/Taproot-4.png",
      alt: "Taproot 4 ",
    },
    {
      type: "paragraph",
      content:
        "Une simple multiplication de la valeur de tweak (t) par le point générateur (G), suivie d'une addition à la clé interne, est tout ce qui est nécessaire.",
    },
    {
      type: "paragraph",
      content: "(bold)Pour conclure(bold)",
    },
    {
      type: "paragraph",
      content:
        'Nous avons commencé avec une clé publique Bitcoin interne de 32 octets et il nous reste désormais une nouvelle clé publique Taproot de 32 octets. Comme nous l\'avons mentionné à plusieurs reprises maintenant, cette clé publique taproot est en réalité, littéralement, le seul élément requis dans une sortie scriptPubKey. Pour utiliser notre clé publique Taproot, ou pour « créer une sortie P2TR », tout ce que nous faisons maintenant est de construire une sortie standard où le scriptPubKey inclut un flag SegWit (0x51, signalant Taproot), la taille du « script » (0x20, signalant la longueur de la clé, 32 octets en hexadécimal), et la clé elle-même.',
      customClass: "-mt-4"
    },
    {
      type: "paragraph",
      content: "(italics)Et c'est tout !(italics)",
    },
    {
      type: "paragraph",
      content:
        "Nous avons entièrement généré une sortie P2TR dépensable avec deux chemins : un key path par clé interne (keypath) et un arbre de Merkle de quatre chemins de dépense (scriptpath). Cela marque une étape majeure dans votre compréhension de Taproot, cependant, il y a une question sur laquelle j'aimerais conclure pour mettre en évidence ce qu'il reste : comment dépense-t-on le keypath ? Bien plus compliqué encore, comment dépense-t-on l'un des scriptpaths ?",
    },
  ],
};

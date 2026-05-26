import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { MerkleTreeReview as English } from "./merkletreereview";

// French translation of MerkleTreeReview.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `module`, `section`, `href`, `shortHandTitle`, `lesson`, `itemType`,
// `isLocked`, `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen`
// identical to the English version (inherited via the spread) so URLs and
// navigation stay stable across locales.

export const MerkleTreeReviewFr: ArticleViewProps = {
  ...English,
  title: "Révision de l'arbre de Merkle",
  description:
    "Plongez dans le rôle des arbres de Merkle dans le ScriptPath des transactions Taproot.",
  content: [
    {
      type: "main title",
      content: "La structure de données responsable du ScriptPath",
    },
    {
      type: "paragraph",
      content:
        "Il convient de rappeler que très peu d'idées sont véritablement originales. Cela est particulièrement vrai non seulement pour Taproot, mais aussi pour les (italics)fondamentaux(italics) qui confèrent à Taproot ses nombreux avantages. Comme nous l'avons vu précédemment, l'un de ces fondamentaux est la signature de Schnorr, qui apporte au KeyPath toute son utilité ; elle est mathématiquement responsable de la possibilité de signer avec une signature unique, multiple ou pondérée. ",
    },
    {
      type: "paragraph",
      content:
        "Aujourd'hui, nous allons nous concentrer sur l'autre chemin par défaut disponible pour un dépenseur : le ScriptPath. Et tout comme le KeyPath avait les signatures de Schnorr comme élément constitutif, le ScriptPath (italics)dispose lui aussi(italics) d'un fondement mathématique essentiel à notre compréhension : (bold)les arbres de Merkle(bold).",
    },
    {
      type: "paragraph",
      content:
        "Les ScriptPaths ne sont (italics)pas(italics), comme le nom l'implique, de simples scripts singuliers - mais plutôt un arbre de Merkle d'options. Les arbres de Merkle eux-mêmes, cependant, ne sont pas nécessairement nouveaux ou originaux. En fait, les arbres de Merkle existent déjà dans d'autres parties de Bitcoin et plusieurs BIPs ont proposé de les exploiter de manières uniques. Les mathématiques, comme nous le verrons, sont relativement simples ; ce sont en réalité les subtilités que Taproot inclut dans le parcours ascendant de l'arbre qui rendent le ScriptPath un peu difficile à assimiler. ",
    },
    {
      type: "title",
      content: "Aperçu de l'arbre de Merkle",
    },
    {
      type: "paragraph",
      content:
        "Nous avons plusieurs leçons plus tôt dans cette série qui approfondissent en détail le pourquoi, l'histoire, etc... des arbres de Merkle. Aujourd'hui, nous tenons spécifiquement à comprendre comment un arbre de Merkle est utilisé pour construire la partie ScriptPath d'une sortie Taproot, donc notre révision des « bases » sera volontairement compacte.",
    },
    {
      type: "paragraph",
      content: "(italics)Pourquoi utiliser un arbre de Merkle ?(italics)",
    },
    {
      type: "paragraph",
      content:
        "(bold)Parce qu'un arbre de Merkle, ou arbre de hash binaire, n'est pas utilisé pour stocker, mais plutôt pour vérifier efficacement que des données existent au sein d'un ensemble de données sans révéler lesdites données.(bold)",
    },
    {
      type: "paragraph",
      content:
        "L'erreur la plus courante que commettent les gens lorsqu'ils découvrent l'arbre de Merkle est de supposer qu'il est utile pour obtenir et définir des données - ce n'est pas le cas. Les arbres de Merkle sont utiles parce que la sortie elle-même est très légère en données (un seul hash) et parce qu'ils fournissent une validation des données sans (italics)révéler l'ensemble complet des données(italics). Initialement mis au point par un certain Ralph (bold)Merkle(bold) dans son éminent article de 1987 (linkpagehttps://people.eecs.berkeley.edu/~raluca/cs261-f15/readings/merkle.pdf)« A Certified Digital Signature »,(linkpage) son objectif était de résoudre le problème de la vérification efficace de l'authenticité de grands ensembles de données sans avoir besoin de stocker ou de transmettre l'ensemble complet des données.",
    },
    {
      type: "paragraph",
      content: "(italics)Qu'est-ce que c'est exactement ?(italics)",
    },
    {
      type: "paragraph",
      content:
        "C'est une structure de données, programmable dans n'importe quel langage, qui est organisée en un arbre binaire où chaque nœud feuille représente un élément de données et chaque nœud non-feuille (interne) est un hash cryptographique de ses nœuds enfants. Le nœud le plus haut, connu sous le nom de (bold)racine(bold), est un hash de (italics)toutes(italics) les données (nous resterons brefs ici car nous allons fournir ci-dessous un contexte visuel supplémentaire). ",
    },
    {
      type: "paragraph",
      content: "(italics)Où sont-ils utilisés ailleurs dans Bitcoin ?(italics)",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Vérification des transactions(bold)",
        },
        {
          type: "paragraph",
          content:
            "L'utilisation la plus connue des arbres de Merkle dans Bitcoin est de vérifier les transactions dans un bloc. Au lieu de télécharger et de vérifier chaque transaction dans l'intégralité du bloc, une structure d'arbre de Merkle simplifiée est utilisée pour créer une représentation compacte de toutes les transactions. Un en-tête de bloc inclut la racine de Merkle de ces transactions. En comparant cette racine de Merkle avec le chemin de Merkle fourni dans l'en-tête d'un bloc, les nœuds peuvent rapidement confirmer qu'une transaction spécifique est incluse dans le bloc sans télécharger et vérifier chaque transaction.",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Données de témoin(bold)",
        },
        {
          type: "paragraph",
          content:
            "Avec l'introduction de Segregated Witness (SegWit), Bitcoin utilise également les arbres de Merkle pour organiser et valider les données de témoin (signatures et scripts). Les données de témoin sont structurées en un arbre de Merkle, et la racine de Merkle est incluse dans l'OP_RETURN de la transaction Coinbase du bloc. Cela permet l'élagage efficace des données de témoin lorsqu'elles ne sont pas nécessaires à la validation, réduisant ainsi la taille des blocs. Lorsqu'une transaction dépense des sorties SegWit, l'expéditeur fournit un chemin de Merkle pour prouver l'inclusion des données de témoin.",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Enfin, comme mentionné, ce n'est de loin pas le premier BIP à exploiter cette structure de données ; à la fois (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0114.mediawiki)BIP114(linkpage) et (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0117.mediawiki)BIP117(linkpage) sont cités comme inspirations dans la partie « Design » du BIP Taproot (341).",
    },
    {
      type: "paragraph",
      content:
        "Maintenant que nous en avons terminé avec une brève révision sur les raisons pour lesquelles les arbres de Merkle sont nécessaires et sur la manière dont ils sont actuellement utilisés dans Bitcoin, il est temps de nous tourner vers le « comment » de l'implémentation - quelle est la disposition et comment fonctionnent les arbres de Merkle ?",
    },
    {
      type: "title",
      content: "Disposition de l'arbre de Merkle",
    },
    {
      type: "paragraph",
      content:
        "Espérons qu'il soit désormais clair que l'objectif d'un arbre de Merkle n'est pas le stockage, mais plutôt la vérification efficace dans le stockage - pouvons-nous valider rapidement que certaines données hachées font partie de cet ensemble de données ? Au plus haut niveau, cela implique deux fonctions principales comme exigences pour un arbre de Merkle :",
    },
    {
      type: "list",
      content: [],
    },
    {
      type: "paragraph",
      content:
        "Avant de passer à un simple exemple de construction, passons (quickly) en revue la structure et la terminologie courantes que l'on trouve dans un arbre de Merkle.",
    },
    {
      type: "image",
      src: "/articles/merkle tree review/Image1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Le diagramme ci-dessus présente les trois termes que nous rencontrerons lorsque nous travaillerons (que ce soit en construisant ou en vérifiant) avec les arbres de Merkle. Dans la prochaine section, nous parcourrons un exemple facile de construction d'un arbre de Merkle, mais pas strictement la manière dont cela se fait dans Taproot - c'est un peu plus subtil, nous le réservons donc pour la prochaine leçon.",
    },
    {
      type: "title",
      content: "Construction de l'arbre de Merkle",
    },
    {
      type: "paragraph",
      content:
        "Disons que, pour une raison quelconque, nous voulons créer un arbre de Merkle qui contient les données : (bold)[0,1,2,3](bold). C'est tout, seulement quatre représentations sous forme de chaîne d'entiers. Avec nos données, pour aboutir à une racine de Merkle, qui est la façon dont nous complétons notre arbre, nous devrons suivre trois étapes :",
    },

    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Hacher les données pour créer les feuilles de Merkle(bold)",
        },
        {
          type: "paragraph",
          content:
            "La première étape consiste à créer des hash pour tous les éléments des données d'origine. Nous utilisons (bold)[0,1,2,3](bold). Rendez-vous sur le (linkhashCalculator)Calculateur de Hash(link), réglez le paramètre sur « String », l'algorithme de hachage sur HASH256 et hachez chaque nombre un par un ; à chaque fois, vous obtiendrez en retour un hash de 32 octets. Dans l'ensemble, ceux-ci ne sont désormais plus connus comme nos données d'origine mais comme les (bold)feuilles de Merkle(bold) :",
        },
        {
          type: "image",
          src: "/articles/merkle tree review/Image5.png",
          alt: "Image Alt Text",
        },
        {
          type: "paragraph",
          content:
            "Bien que nous commencions maintenant notre arbre de Merkle, notre arbre est complet lorsqu'il ne nous reste qu'un seul hash, connu sous le nom de racine de Merkle. Donc, par la suite, nous devons effectuer un certain travail pour transformer nos feuilles de Merkle en branches de Merkle.",
        },
        {
          type: "numbered-item",
          content:
            "(bold)2. Concaténer et hacher les feuilles de Merkle pour créer les branches de Merkle(bold)",
        },
        {
          type: "paragraph",
          content:
            "Comme vous l'avez lu dans la section précédente sur l'arbre de Merkle ou remarqué dans le visuel ci-dessus, l'unique racine de Merkle est (bold)(italics)toujours(italics)(bold) le sommet de l'arbre et les N feuilles de Merkle sont (bold)(italics)toujours(italics)(bold) le bas de l'arbre. C'est dans la partie centrale, les branches, ou la profondeur de l'arbre, que la majorité du travail est effectuée.",
        },
        {
          type: "paragraph",
          content:
            "À chaque niveau de profondeur, en commençant de droite à gauche, l'algorithme suivant est exécuté :",
        },
        {
          type: "secondary-numbered-item",
          content:
            "1. Concaténer la feuille | branche de Merkle (N) avec la feuille | branche de Merkle (N + 1)",
        },
        {
          type: "secondary-numbered-item",
          content:
            "2. Hacher le résultat avec le même algorithme de hachage que celui utilisé pour nos feuilles (dans notre cas particulier, il s'agit de HASH256)",
        },
        {
          type: "secondary-numbered-item",
          content:
            "3. Répéter les étapes 1. et 2. pour toutes les paires d'éléments restants à ce niveau de l'arbre",
        },
        {
          type: "image",
          src: "/articles/merkle tree review/Image3.png",
          alt: "Image Alt Text",
        },
        {
          type: "paragraph",
          content:
            "Dans notre exemple spécifique, puisque nous commençons avec quatre (4) feuilles, nous n'avons qu'une seule étape entre notre branche et notre racine (que nous verrons ensuite) ; mais espérons qu'il n'est pas trop difficile d'imaginer ce qui se passe si nous avions commencé avec huit (8) ou seize (16) feuilles à la place (nous aurions simplement deux et trois tours de hachage de branches respectivement). ",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Répéter jusqu'à ce que la racine de Merkle soit dérivée(bold)",
        },
        {
          type: "paragraph",
          content:
            "En exécutant correctement l'étape 2, nous aboutissons finalement à une seule valeur au sommet, comme prévu : (bold)c'est cette valeur unique que nous considérons comme la (italics)racine(italics) de Merkle(bold). Notre exemple ci-dessous est maintenant présenté de haut en bas - vous devriez pouvoir le suivre manuellement et obtenir le même résultat !",
        },
        {
          type: "image",
          src: "/articles/merkle tree review/Image4.png",
          alt: "Image Alt Text",
        },
        {
          type: "paragraph",
          content:
            "Maintenant, imaginez que, au lieu de commencer avec nos données d'origine sous forme d'entiers, nous commencions avec des PubKeyScripts - rien ne serait différent dans le processus. (bold)(italics)C'est exactement ce que nous faisons lorsque nous créons le ScriptPath(italics)(bold).",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Et voilà pour la leçon d'aujourd'hui ! Comme promis, il s'agissait d'une brève révision sur les arbres de Merkle alors que nous nous préparons à remplir les feuilles de Merkle avec du script au lieu d'entiers ; comme vous le remarquerez, le processus restera exactement le même, la *seule* différence étant quelques concaténations supplémentaires très spécifiques à Taproot à chaque étape du chemin. Ensuite, une fois que nous aurons terminé de construire notre arbre et compris comment il se convertit en une sortie Taproot, nous tournerons enfin notre attention vers la dépense d'un Tapleaf dans le ScriptPath.",
    },
  ],
};

import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { GeneratingTaprootPubKey as English } from "./generatingATaprootOutput";

// French translation of GeneratingTaprootPubKey.
//
// Pattern: spread the English article, then override the translated fields.
// Do NOT override `module` or `section` (inherit via the spread) — translating
// them renders the page blank. Keep `href`, `shortHandTitle`, `lesson`,
// `itemType`, `isLocked`, `published`, and the googleLink fields identical to
// the English version so URLs stay stable across locales.

export const GeneratingTaprootPubKeyFr: ArticleViewProps = {
  ...English,
  title: "Générer une PubKey Taproot (Pt. I)",
  description: "Vue d'ensemble & configuration de l'exemple",
  content: [
    {
      type: "main title",
      content: "Générer une PubKey Taproot (Pt. I)",
    },
    {
      type: "subtitle",
      content: "Vue d'ensemble & configuration de l'exemple",
    },
    {
      type: "paragraph",
      content: "(bold)Introduction(bold)",
      customClass: "text-2xl font-bold mt-6",
    },
    {
      type: "paragraph",
      content:
        "Nous avons dû apprendre bon nombre de concepts pour parvenir jusqu'ici, mais, aujourd'hui, nous allons enfin parcourir chaque étape impliquée dans la génération d'une sortie Taproot (assez simple). Comme vous le constaterez, espérons-le, bien que l'idée d'entasser plusieurs tapscripts dans un arbre de Merkle puis de tout dissimuler à l'intérieur d'une clé publique semble compliquée, le processus de génération est en réalité plutôt simple (notez, pas nécessairement facile, mais certainement pas aussi compliqué qu'on le prétend).",
      customClass: "-mt-4",
    },
    {
      type: "paragraph",
      content:
        "Pour commencer, chaque sortie P2TR, qu'elle inclue un unique script indépensable ou 2^128 chemins de dépense, ressemble toutes à une simple clé publique de 32 octets ; ces clés publiques, comme vous l'avez appris (linkpagehttps://www.bitscript.app/lessons/A%20Tale%20of%20Two%20Paths)ici(linkpage), contiennent au moins deux chemins de dépense différents pour un UTXO :",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey/TaprootOutputGraph.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "Une sortie Taproot, vue ci-dessus, est en définitive une simple chaîne de 32 octets | 64 caractères hexadécimaux ; ou plus précisément, (bold)(italics)une clé publique taproot(italics)(bold) (ou sortie P2TR). À l'heure actuelle, les sorties pay-2-taproot sont les seules sorties ayant une unique clé publique comme intégralité du pubkeyscript ; ce qui signifie que vous pouvez identifier une sortie Taproot dans une transaction brute, comme celle-(linkpagehttps://www.bitscript.app/transactions?transaction=d53b9e0b9e4a0b2e77ad61862a3d385d9748c9b6e6ea402be7efdcafb931d2a7&env=MAINNET)ci,(linkpage) car elle suivra (bold)(italics)toujours(italics)(bold) le même modèle que ci-dessus : drapeau SegWit (bold)(0x51)(bold) + longueur de la sortie Taproot (bold)(0x20 = 32 octets)(bold) + la clé publique KeyPath elle-même.",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey/TaprootPubKeyScriptFormat.png",
      alt: "Taproot pubkey script Format image",
    },
    {
      type: "paragraph",
      content:
        "Aujourd'hui, nous ne revoyons plus le concept mais plongeons directement dans la question ultime sur laquelle nous allons nous concentrer aujourd'hui :",
    },
    {
      type: "paragraph",
      content:
        "(bold)(italics)Comment ces sorties Taproot sont-elles réellement générées ?(italics)(bold)",
    },
    {
      type: "paragraph",
      content:
        "Au cas où le titre ne l'aurait pas révélé, parcourir tout cela est simple mais en aucun cas évident, c'est pourquoi ce sera réparti sur (bold)deux(bold) articles. Dans cette première partie, nous allons nous concentrer sur une vue d'ensemble de toutes les étapes impliquées, présenter un récit de cas d'usage réel & donner un aperçu d'un calcul prérequis introduit dans (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)BIP340(linkpage) ; dans la seconde partie de cette série, nous conclurons en créant notre ScriptPath en arbre de Merkle & enfin en tweakant notre clé publique interne pour générer une clé Taproot.",
    },
    // TODO: create a new style that makes this text light gray
    {
      type: "paragraph",
      content: "Vue d'ensemble",
      customClass: "text-gray-800",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "Avant de parcourir un exemple étape par étape, il est judicieux de regarder avant de sauter. Dans notre cas, cela signifie que nous devons d'abord revoir les étapes de haut niveau ; comme vous le verrez tout du long, en supposant que vous soyez quelque peu familier avec script, l'essentiel concerne du matériel que nous avons déjà couvert ; c'est spécifiquement le scriptpath, ou l'arbre de Merkle des options de script (connues sous le nom de « tapleafs »), où nous passerons le plus de temps.",
      customClass: "-mt-4",
    },
    {
      type: "paragraph",
      content:
        "Lorsque nous entreprenons de générer une clé publique taproot | une sortie pay to taproot, il y a généralement quatre étapes que nous devrons parcourir :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Sélectionner une clé interne (bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Créer nos TapLeafs(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Générer le ScriptPath*(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)4. Tweaker la clé interne(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Comme mentionné, nous passerons la grande majorité de notre temps à l'étape 3. Générer le ScriptPath (couverte dans le prochain article). À partir de cette liste, les prérequis exacts pour créer une sortie P2TR deviennent clairs :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. Une clé publique Taproot Bitcoin (32 octets) que vous possédez déjà, que nous appellerons la (bold)clé publique interne(bold)",
        },
        {
          type: "numbered-item",
          content:
            " 2. Tous les différents chemins de dépense que nous voulons inclure dans le scriptpath exprimés sous forme de tapscripts (qui seront à leur tour utilisés pour créer nos (bold)TapLeafs(bold))",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Avec ces deux éléments connus, nous pouvons aller de l'avant & nous mettre au travail ! Ci-dessous, nous passerons rapidement en revue chacun de ces concepts avant de parcourir le reste des quatre étapes mentionnées ci-dessus.",
    },
    {
      type: "title",
      content: "1. Sélectionner une clé interne",
      customClass: "text-black ",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "Une sortie Taproot commence par une clé publique qui (idéalement) a accès à une poignée d'UTXO pour financer des transactions & se termine par une clé publique différente placée directement dans le champ Output PubkeyScript.",
    },
    {
      type: "paragraph",
      content:
        "C'est une différence majeure entre les sorties pay-2-taproot & les types de transactions plus traditionnels comme p2pkh ou p2sh. La plupart des autres sorties ont plusieurs éléments dans le scriptpubkey/lockscript tels qu'une clé publique hachée & op_checksig ; les sorties pay-2-taproot n'ont pas de telles propriétés ou op_codes. Au lieu de cela, les sorties P2TR ont une unique clé publique de 32 octets comme champ scriptpubkey. Comme nous le verrons ci-dessous, cette unique clé publique de 32 octets est connue sous le nom de « clé taproot » ou « clé tweakée ».",
    },
    {
      type: "paragraph",
      content:
        "(italics)Bien sûr, une question légitime ici est : qu'est-ce exactement qu'un tweak & par quoi exactement tweakons-nous notre clé publique d'origine ?(italics)",
    },
    {
      type: "paragraph",
      content:
        "En cryptographie, du moins à ma connaissance, un (bold)tweak(bold) est un terme générique qui signifie apporter une modification à une clé publique ; cette modification est couramment une ou plusieurs des opérations suivantes : concaténation, addition, multiplication & hachage. Nous entrerons bien, bien plus en profondeur dans le prochain article, mais pour faire court, (bold)nous avons besoin d'une clé interne car c'est ce que nous allons tweaker pour produire la clé taproot réelle :(bold)",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey/taproot-output-3.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "Une fois que nous connaissons la clé interne que nous utiliserons, nous savons que nous pouvons au moins dépenser directement à l'aide d'une signature Schnorr ; cependant, si nous voulons la flexibilité & la confidentialité offertes par taproot, nous devrons créer notre scriptpath, ce qui signifie que nous devrons d'abord choisir nos tapleaves.",
    },
    {
      type: "title",
      content: "2. Créer nos TapLeaves",
      customClass: "text-black ",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "Quelles sont toutes les différentes façons dont cet UTXO peut être dépensé ? La meilleure partie de la mise à jour Taproot est sans doute la flexibilité offerte par le chemin de script, car elle permet d'encoder une quantité quasi infinie (2^128) d'options de paiement.",
    },
    // TODO: make this to have a lighter font color
    {
      type: "paragraph",
      content: "Scénario du coffre familial",
      customClass: "text-gray-700 font-semi-bold",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "Créer le ScriptPath, ou l'arbre de Merkle de ces options de paiement, commence par définir combien de chemins de dépense, ou tapleaves, nous allons encoder. Disons par exemple que nous voulons stocker des Bitcoin dans un coffre familial avec les propriétés suivantes :",
      customClass: "-mt-4",
    },

    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "1. Le conjoint peut le dépenser à tout moment",
        },
        {
          type: "numbered-item",
          content: "2. Les parents peuvent le dépenser ensemble",
        },
        {
          type: "numbered-item",
          content: "3. La progéniture peut le dépenser dans 18 ans",
        },
        {
          type: "numbered-item",
          content: "4. Votre meilleur ami peut le dépenser avec un mot de passe",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Ces quatre options de paiement constituent les quatre nœuds différents ou (bold)(italics)tapleafs(italics)(bold) qui amorcent le processus de génération de notre arbre de Merkle.",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey/MerkelTree.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "(italics)Mais ne pourrais-je pas déjà faire cela avec p2sh ou p2wsh ?(italics)",
    },
    {
      type: "paragraph",
      content:
        "L'observateur attentif pourrait remarquer que, aussi complexe que cela puisse être, il est tout à fait possible d'entasser ces quatre options de paiement dans un unique script p2sh | p2wsh, & il aurait raison. Cela peut être fait & est fait. Cependant, au-delà de la scalabilité quasi infinie des chemins d'arbre par rapport à la limite d'écriture d'un script, c'est ici que la partie confidentialité de Taproot brille vraiment :",
    },
    {
      type: "paragraph",
      content: "(bold)Seul le tapleaf dépensé est révélé(bold)",
    },
    {
      type: "paragraph",
      content:
        "Théoriquement, vous pourriez utiliser un grand p2sh avec des instructions if imbriquées, mais vous révéleriez alors la clé publique de chaque membre de la famille puisque vous révéleriez tous les chemins de dépense, ce qui n'est évidemment pas idéal ; en alternative, en utilisant le scriptpath que nous allons construire, (bold)seule(bold) la clé publique du membre qui dépense est révélée.",
    },
    {
      type: "paragraph",
      content:
        "Pour faciliter l'implémentation des tapleafs, écrivons exactement comment chacun de nos quatre scénarios souhaités est exprimé à travers les pubkeyscripts suivants :",
    },
    {
      type: "table",
      headers: ["Scénario", "Description", "Équivalent PubKey"],
      rows: [
        [
          "Le conjoint peut dépenser à tout moment",
          "Consommation directe de l'UTXO avec une simple clé publique",
          "P2PKH",
        ],
        [
          "Les parents peuvent dépenser ensemble",
          "Un multisig 2-sur-2 est requis",
          "P2SH (multi-sig 2/2)",
        ],
        [
          "La progéniture peut dépenser dans 18 ans",
          "Consommation directe de l'UTXO après que 18 ans (en hauteur de bloc) se soient écoulés",
          "P2SH (timelock)",
        ],
        [
          "L'ami peut dépenser avec un mot de passe",
          "Consommation directe de l'UTXO avec un mot de passe correspondant",
          "P2SH (hashlock)",
        ],
      ],
    },
    {
      type: "paragraph",
      content:
        "Compte tenu de nos nombreux articles sur la création de scripts, nous ne verrons pas comment chacun des tapscripts ci-dessus est réellement généré ; cependant, comme exercice pour vous, nous vous recommandons vivement de lancer le Taproot Tool dont le lancement est imminent & de suivre.",
    },
    {
      type: "title",
      content: "TaggedHashes",
      customClass: "text-gray-500 font-bold mb-1"
    },
    {
      type: "paragraph",
      content:
        "Avant d'introduire les multiples étapes dérivées dans la génération du scriptpath & enfin d'une sortie P2TR, il est nécessaire de revoir d'abord un petit « tag » cryptographique singulier introduit dans (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)BIP340.(linkpage) Si vous cherchez « tag » ou « tag hash », vous trouveriez ce qui suit :",
    },
    {
      type: "paragraph",
      content:
        '(bold)TagHash("x") = SHA256(SHA256(x) || SHA256(x) || reste des éléments…)(bold)',
    },
    {
      type: "paragraph",
      content:
        "En bref, TapScript/Taproot utilise ce système de tagging (italics)(bold)(underline)trois(underline)(bold)(italics) fois différentes lors de la génération du scriptpath & de l'éventuelle sortie P2TR comme moyen simple d'éviter les collisions non liées à Taproot. Tout ce que cela fait, c'est décoder & hacher une certaine chaîne (soit 'TapLeaf', 'TapBranch', ou 'TapTweak') deux fois & préfixer cela aux données réellement pertinentes.",
    },
    {
      type: "paragraph",
      content:
        "C'est une source courante de confusion que les gens ont tendance à trop intellectualiser ; chaque fois que vous voyez TaggedHashed('TapWhatever', [un certain script]), tout ce que cela signifie, c'est que vous devrez hacher 'TapWhatever' deux fois & le préfixer à [un certain script]. Encore une fois, il n'y a (jusqu'à présent) que trois options pour ce qui entre dans un tagged hashed, nous pouvons donc résumer cela pour plus de familiarité ci-dessous :",
    },
    {
      type: "table",
      headers: ["TagHash", "Quand utilisé", "Formule (H = sha256())"],
      rows: [
        [
          "TapLeaf",
          "Une fois, construction initiale du TapLeaf",
          "H('TapLeaf') || H('TapLeaf') || Version TapLeaf || Taille du script || PubKeyScript",
        ],
        [
          "TapBranch",
          "À chaque étape en remontant l'arbre",
          "H('TapBranch') || H('TapBranch') || A || B",
        ],
        [
          "TapTweak",
          "Une fois, lors du tweaking de la clé racine",
          "H('TapTweak') || H('TapTweak') || P || AB",
        ],
      ],
    },
    {
      type: "paragraph",
      content:
        "Comme vous devriez vous y attendre, nous utiliserons chacun de ces trois TagHashes pendant que nous remontons notre arbre de Merkle, en allant de nos quatre TapLeafs vers le",
    },
    {
      type: "title",
      content: "Du PubKeyScript au TapLeaf",
      customClass: "text-gray-500 font-bold mb-2"
    },
    {
      type: "paragraph",
      content:
        "Supposons que nous ayons le scriptpubkey pour notre (bold)scénario n°1,(bold) dans lequel notre conjointe peut dépenser le tapleaf à l'aide de sa clé publique dans une transaction p2pkh assez simple ; pour passer d'un PubKeyScript à un TapLeaf, nous devons d'abord concaténer la TapLeafVersion avec la taille du script & le script lui-même. Depuis BIP342, il n'existe qu'une seule version de TapLeaf reconnue, il est donc sûr de supposer que ce sera la constante magique (0xc0) pour l'instant :",
    },
    {
      type: "image",
      src: "/articles/Generating A Taproot Pubkey/TapLeafFormat.png",
      alt: "Taproot Output",
    },
    {
      type: "paragraph",
      content:
        "Avec ces trois éléments concaténés, tout ce que nous devons faire maintenant est de calculer la valeur hachée de 'TapLeaf', la concaténer une fois à elle-même, & ensuite concaténer le tableau d'octets à trois éléments que nous venons de créer avec la version, la taille & le script. (bold)Et c'est tout !(bold)",
    },
    {
      type: "paragraph",
      content:
        "Nous avons généré avec succès (bold)un(bold) de nos quatre TapLeafs. Pour aller de l'avant, nous devons répéter ce processus avec les trois scénarios restants ; une fois terminé, nous aurons sélectionné notre clé interne & généré nos quatre TapLeafs — ce qui signifie que nous sommes à mi-chemin des quatre étapes principales impliquées ! (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20II)) Continuez la lecture (linkpage) pour voir comment nous merkiliserons les TapLeafs pour aboutir à notre scriptpath.",
    },
  ],
};

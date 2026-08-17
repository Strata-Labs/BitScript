import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ECDSAGeneration as English } from "./ECDSAGeneration";

// French translation of ECDSAGeneration.
//
// Pattern: spread the English article, then override the translated fields.
// Inherited (kept identical via spread): href, shortHandTitle, lesson,
// itemType, isLocked, published, googleLinkBigScreen, googleLinkSmallScreen.

export const ECDSAGenerationFr: ArticleViewProps = {
  ...English,
  title: "Génération ECDSA",
  description:
    "Apprenez les bases de la génération ECDSA pour les signatures numériques, en vous concentrant sur le processus de création d'une signature numérique cryptographique pour les transactions Bitcoin.",
  content: [
    {
      type: "main title",
      content: "Génération ECDSA",
    },
    {
      type: "title",
      content: "Prouver la propriété d'un message signé",
    },
    {
      type: "paragraph",
      content: "(bold)Introduction(bold)",
    },
    {
      type: "paragraph",
      content:
        "On dit souvent que la blockchain n'est rien d'autre qu'une liste chaînée de signatures numériques. D'une certaine manière, c'est vrai, car les signatures numériques sont assurément au cœur de la cryptographie qui sous-tend Bitcoin ; ces signatures numériques servent d'outils de vérification, permettant aux nœuds d'authentifier la réception de bitcoins lors de transactions précédentes. Cette authentification est sécurisée par un verrou numérique unique, accessible uniquement par une clé publique spécifique et une transaction au format spécifique. ",
    },
    {
      type: "paragraph",
      content:
        "Les signatures numériques sont particulièrement puissantes et omniprésentes en cryptographie pour de nombreuses raisons, parmi lesquelles les trois suivantes se distinguent :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. L'asymétrie offerte par les paires de clés privées et publiques",
        },
        {
          type: "numbered-item",
          content: "2. La communication offerte par le message haché",
        },
        {
          type: "numbered-item",
          content: "3. La résistance aux collisions offerte par la randomisation",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Espérons que ces termes vous semblent au moins vaguement familiers, car il est difficile d'apprécier l'engouement autour des signatures numériques sans eux. En bref, nous (les Bitcoiners) nous soucions des signatures numériques parce que c'est ainsi que Bitcoin est réellement transféré d'un utilisateur à un autre. Plus précisément sur le plan technique, les signatures numériques sont la manière dont les clés publiques vérifient et déverrouillent cryptographiquement les bitcoins dans les UTXO précédemment reçus. ",
    },
    {
      type: "paragraph",
      content:
        "Dans les applications les plus courantes des signatures numériques, le message haché est généralement un message caché destiné à servir d'identifiant, comme une adresse IP lors d'une poignée de main SSL ; cependant, dans Bitcoin, le message haché est une version formatée de la transaction en cours de signature.",
    },
    {
      type: "paragraph",
      content:
        "Malgré leur importance, les signatures numériques sont (italics)rarement(italics) enseignées ou abordées en raison de la complexité considérable (comprenez : les mathématiques) qu'elles impliquent. Aujourd'hui, c'est précisément ce que nous allons faire : continuer à bâtir les bases d'une compréhension fondamentale des clés et des signatures. Plus précisément, nous allons nous concentrer sur l'utilisation pratique de la génération d'une signature numérique ECDSA ; des articles précédents (ou à paraître prochainement*) couvrent les concepts mathématiques qui sous-tendent les signatures, tels que les corps finis, l'arithmétique modulaire, le problème du logarithme discret et les courbes elliptiques.",
    },
    {
      type: "title",
      content: "Algorithme de génération ECDSA",
    },
    {
      type: "paragraph",
      content:
        "Fondamentalement, une signature numérique remplit deux rôles essentiels : la génération et la vérification. Tandis que cette dernière confirme l'authenticité d'une signature, notre attention se porte ici sur la première, à savoir le processus complexe de génération d'une signature numérique.",
    },
    {
      type: "paragraph",
      content:
        "Le but d'une signature numérique (italics)est de créer une empreinte numérique vérifiable mais non reproductible (la signature) attestant que le propriétaire d'une paire de clés privée et publique a signé un message (dans notre cas, une transaction Bitcoin spécialement formatée)(italics). ",
    },
    {
      type: "paragraph",
      content:
        "À partir de cette simple définition, nous pouvons commencer à extraire toutes les entrées requises pour générer une signature : une paire de clés de signature (privée/publique) et un message. Toutefois, si nous examinons la définition de plus près, nous avons mentionné le caractère (italics)« non reproductible »(italics) comme propriété recherchée, ce qui implique une source d'entropie, ou de (italics)hasard(italics). Cela signifie qu'il nous faut en réalité trois éléments au total : (bold)un message, une paire de clés de signature et une paire de clés (italics)aléatoire(italics)(bold). Ci-dessous, nous allons présenter la formule de génération ECDSA, qui utilise ces trois éléments pour créer une signature numérique au format de paire de coordonnées (r,s) ou au format DER :",
    },
    {
      type: "image",
      src: "/articles/ECDSA/ecdsaGeneration.svg",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "À l'évidence, ce qui précède requiert plus de trois variables ; pourtant, comme nous le verrons, il est possible de dériver chacune des variables nécessaires en partant de seulement trois éléments. Ces étapes, au cours desquelles nous dérivons tout ce dont nous aurons besoin, conjuguées à la formule ci-dessus et à la norme de formatage que nous définirons plus tard, sont collectivement connues sous le nom d'algorithme de génération ECDSA :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Générer une paire de clés aléatoire(bold) (commencer par k, dériver kG, r et k-1)",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)Fournir une paire de clés de signature(bold) (commencer par e, dériver eG)",
        },
        {
          type: "numbered-item",
          content:
            "3. (bold)Fournir un message pré-haché(bold) (m, dériver H(m))",
        },
        {
          type: "numbered-item",
          content: "4. (bold)Insérer dans la fonction ci-dessus(bold)",
        },
        {
          type: "numbered-item",
          content: "5. (bold)Formater selon les normes DER(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Avec ces cinq étapes, on devrait être en mesure de générer une signature numérique cryptographiquement vérifiable ; nous allons maintenant détailler chacune de ces étapes ci-dessous :",
    },
    {
      type: "paragraph",
      content:
        "(bold)1. Générer une clé aléatoire/éphémère(bold) (commencer par k, dériver kG, r et k-1)",
    },
    {
      type: "paragraph",
      content:
        "Comme vous le voyez ci-dessus, quatre valeurs différentes de la formule de génération sont en réalité toutes dérivées de cette unique valeur de départ : une clé privée aléatoire (k). La toute première partie de la création d'une signature numérique consiste à introduire de l'entropie (randomisation) en utilisant un générateur aléatoire éprouvé pour créer une clé privée de 32 octets | 64 caractères (couramment notée « (bold)k(bold) »). Tout comme la clé privée de signature, il est *crucial* que la clé privée aléatoire (k) reste secrète, car sans cette randomisation, il devient plus facile — non pas facile*, mais plus facile — de rétro-concevoir une clé privée à partir d'une signature.",
    },
    {
      type: "paragraph",
      content:
        "Comme nous le verrons plus tard, la signature finale est en réalité composée de deux parties, ou valeurs, distinctes, appelées (bold)(r,s)(bold). (bold)S(bold) est ce que nous résolvons réellement avec la grande formule mise en évidence ci-dessus (c'est-à-dire l'algorithme de génération) ; la seconde valeur, r, provient de la clé privée aléatoire (k). En fait, (italics)(bold)r(bold) est la (bold)coordonnée x(bold) de la (bold)clé publique aléatoire(bold)(italics) dérivée de la clé privée aléatoire (k) :",
    },
    {
      type: "image",
      src: "/articles/ECDSA/secondDiagram.svg",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Conformément à ce qui précède, nous passons de notre clé privée aléatoire à notre clé publique aléatoire (en multipliant (k) par la (linkpagehttps://river.com/learn/terms/g/generator-point/)constante du point générateur G(linkpage)) ; puis, à partir de notre clé publique aléatoire, nous extrayons et conservons uniquement la coordonnée x (que nous appellerons (r)). Cela signifie que nous disposons désormais du r représenté dans l'algorithme de signature. ",
    },
    {
      type: "paragraph",
      content:
        "Cependant, nous n'avons pas terminé, car (k) nous offre un moyen de dériver une autre variable requise : l'inverse multiplicatif (k-1). À partir de (k), nous pouvons également dériver son inverse multiplicatif, mentionné dans la formule ci-dessus ; il convient de noter que trouver l'inverse multiplicatif d'un nombre modulaire est assez compliqué et dépasse le cadre de cet article. ",
    },
    {
      type: "paragraph",
      content:
        "En partant uniquement de (k), une clé privée aléatoire, nous avons pu dériver les deux variables mises en évidence dans l'équation susmentionnée :",
    },
    {
      type: "image",
      src: "/articles/ECDSA/ecdsaGeneration1.svg",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content: "(bold)2. Fournir la clé de signature(bold) (e, eG)",
    },
    {
      type: "paragraph",
      content:
        "Maintenant que nous avons saupoudré de l'entropie avec notre paire de clés randomisée, nous allons passer à la partie la plus dangereuse du processus sur le plan opérationnel : la signature/l'insertion de notre clé (bold)(italics)privée(italics)(bold). Il va sans dire qu'il faut être (italics)extrêmement(italics) vigilant et prudent lorsque vous saisissez votre clé privée où que ce soit — c'est l'équivalent du mot de passe de votre banque. ",
    },
    {
      type: "paragraph",
      content:
        "La clé de signature est elle-même aussi, et l'on espère sans surprise, une clé privée de 32 octets, c'est-à-dire un point sur la courbe elliptique. Pour générer une signature, tout ce dont nous avons besoin est la clé privée (e) ; cependant, comme vous le verrez, c'est la clé publique (eG) qui est utilisée plus tard pour vérifier la signature, en tirant parti de la sécurité asymétrique offerte par les paires de clés. ",
    },
    {
      type: "image",
      src: "/articles/ECDSA/thirdDiagram.svg",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Pour l'instant, tout ce dont nous avons besoin est notre clé privée (e) qui, si vous regardez le diagramme ci-dessus, est multipliée par (italics)r(italics), la coordonnée x de la clé publique dérivée de la clé privée aléatoire (k). ",
    },
    {
      type: "paragraph",
      content:
        "À la suite des variables présentées, il ne nous reste qu'une seule variable à renseigner : le message que nous signons réellement (m) et, plus important encore, son équivalent haché H(m). ",
    },
    {
      type: "paragraph",
      content: "(bold)3. Fournir le message(bold) (m, H(m))",
    },
    {
      type: "paragraph",
      content:
        "La dernière variable restante n'est bien sûr autre que le message que nous signons. Le message peut être n'importe quoi au format hexadécimal et, en effet, les signatures numériques sont utilisées pour signer une infinité de types de données. Dans Bitcoin, cependant, le message est la (italics)transaction brute elle-même(italics), modifiée selon le drapeau SigHash associé. ",
    },
    {
      type: "paragraph",
      content:
        "L'analyse et la reconstruction des transactions Bitcoin avant de les signer constituent sans doute l'un des processus les plus complexes et délicats de tout le développement Bitcoin. Nous réserverons cela à un autre article. Aujourd'hui, nous allons uniquement couvrir la génération de signatures numériques à l'aide d'un message en texte clair (au format hexadécimal). Par exemple, supposons que nous voulions signer le message « hello » (ou la phrase de votre choix).",
    },
    {
      type: "paragraph",
      content:
        "Nous devons d'abord passer d'une chaîne de caractères (plus précisément ASCII) à l'hexadécimal — cela nous donne le message (m). Cependant, comme vous le voyez ci-dessus, la génération d'une signature ne nécessite pas un message, mais plutôt un hash de ce message (noté h(m) ou z).",
    },
    {
      type: "paragraph",
      content:
        "Lorsque l'on parle d'utiliser une signature numérique avec un hash donné, c'est de (italics)(bold)ce(bold)(italics) choix de hash dont il s'agit. Dans Bitcoin en particulier, le message est haché avec un algorithme de hachage appelé (linkpagehttps://www.bitscript.app/hashingAlgorithms)HASH256(linkpage). Ainsi, à l'aide de notre (linkpagehttps://www.bitscript.app/hashCalculator)calculateur de hash(linkpage), assurez-vous que l'entrée est réglée sur « string » et que l'algorithme de hachage est réglé sur HASH256 ; une fois cela fait, saisissez dans la zone de texte le message pré-haché (ou « préimage ») que vous souhaitez signer — ci-dessous, dans la zone de sortie, vous verrez un hash de 32 octets. Voici un résumé de ce processus :",
    },
    {
      type: "image",
      src: "/articles/ECDSA/fifthDiagram.svg",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Avec cela, nous disposons enfin de chacune des variables nécessaires pour générer une signature numérique : une source de hasard (la clé aléatoire/éphémère), une source d'authenticité (la clé de signature) et un message haché. ",
    },
    {
      type: "paragraph",
      content: "(bold)4. Insérer dans la fonction ci-dessus(bold)",
    },
    {
      type: "paragraph",
      content:
        "Toutes les variables étant désormais calculées, il devrait être simple d'insérer chaque valeur dans la formule ci-dessus ; cependant, vous avez sans doute deviné que les opérations mathématiques habituelles auxquelles vous êtes habitué (principalement l'addition et la multiplication) ne sont pas si simples, puisqu'il s'agit techniquement d'opérations sur un corps fini défini par la courbe elliptique secp256k1. Si cela paraît compliqué, eh bien, c'est parce que ça l'est. ",
    },
    {
      type: "paragraph",
      content:
        "Dans un autre article, nous avons couvert les courbes elliptiques en profondeur, ce qui incluait un examen détaillé du fonctionnement des opérations mathématiques normales sur un corps fini. Il est fortement recommandé de lire cet article en parallèle de celui-ci pour mieux comprendre les étapes ci-dessous ; là encore, tout ce que nous faisons maintenant consiste simplement à insérer les variables que nous avons générées et dérivées ci-dessous :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. Multiplier la clé de signature (e) et la coordonnée x de la clé publique randomisée (r)",
        },
        {
          type: "numbered-item",
          content:
            "2. Ajouter le message haché (z) au résultat de l'étape précédente (e*d)",
        },
        {
          type: "numbered-item",
          content:
            "3. Multiplier l'inverse de la clé publique randomisée (k) et l'étape précédente",
        },
        {
          type: "numbered-item",
          content:
            "4. Effectuer l'opération modulo sur la constante secp256k1 (p)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "À condition que tout soit fait avec soin et correctement, ce processus méticuleux donne la valeur de (bold)(s)(bold), complétant notre signature numérique, qui se compose désormais de la paire (bold)(r, s)(bold). Souvenez-vous, (r) était l'une des toutes premières variables que nous avons dérivées et, à présent, rejoint par « s », elle complète les deux variables qui constituent une signature numérique cryptographique.",
    },
    {
      type: "paragraph",
      content: "(bold)Le format DER et au-delà(bold)",
    },
    {
      type: "paragraph",
      content:
        "Avec (r,s), nous avons enfin généré une signature numérique complète — mais le voyage n'est pas encore terminé. En fait, si vous cherchiez une signature numérique dans l'outil de désérialisation, vous (bold)(italics)ne(italics)(bold) trouveriez (bold)(italics)pas(italics)(bold) de signature numérique correspondant à ce format de paire de coordonnées. Nous le réserverons pour le tout prochain article, mais l'étape finale et cruciale pour générer correctement une signature numérique consiste à reformater la signature afin qu'elle respecte les règles d'encodage distinctives (DER).",
    },
  ],
};

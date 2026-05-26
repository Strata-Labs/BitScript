import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ECDSADerFormat as English } from "./ecdsaDerFormat";

// French translation of ECDSADerFormat.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `href`, `shortHandTitle`, `lesson`, etc. identical to the English
// version so URLs stay stable across locales.

export const ECDSADerFormatFr: ArticleViewProps = {
  ...English,
  title: "Format DER d'ECDSA",
  description:
    "Apprenez les bases du format DER d'ECDSA pour les signatures numériques.",
  content: [
    {
      type: "main title",
      content: "Format DER d'ECDSA",
    },
    {
      type: "title",
      content: "La syntaxe standard des signatures ECDSA",
    },
    {
      type: "paragraph",
      content:
        "Nous avons couvert une bonne partie de la signature ECDSA classique. En particulier, nos articles ECDSA Generation et ECDSA Verification, qui ont présenté respectivement comment générer et vérifier des signatures. Si vous vous en souvenez (ou si vous y revenez), vous remarquerez que nous mentionnons deux formats différents lors de la description des signatures :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Paire de points(bold) : sous forme d'une paire de points (r,s) sur la courbe elliptique sexp256k1",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)DER(bold) : sous forme d'un tableau d'octets inclus dans les transactions brutes",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Toutes les opérations impliquant une signature ECDSA se déroulent sur un type de graphe spécifique, à savoir un graphe de courbe elliptique correctement appelé (italics)secp256k1(italics) qui est défini par un ensemble de constantes. Ce graphe présente une légère ressemblance avec une ellipse en certains points, mais (bold)(italics)de manière cruciale(italics)(bold), il s'agit d'un (italics)graphe fermé(italics). Cette fermeture garantit que toute opération effectuée sur lui produit un résultat qui reste dans les limites du graphe :",
    },
    {
      type: "image",
      src: "/articles/ECDSA DER/DER-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Bien que nous n'entrions pas dans les détails ici, les opérations effectuées sur un graphe de courbe elliptique sont similaires, sans être exactes, à des opérations mathématiques comme l'addition et la multiplication ; les opérations de base sur une courbe ECC, avec ses caractéristiques uniques, garantissent que le résultat reste dans une plage finie et fermée. Le point clé à saisir est qu'une signature ECDSA implique fondamentalement d'effectuer des opérations sur ce graphe, garantissant que les deux scalaires obtenus lors de la génération d'une signature peuvent être localisés sur le graphe. Ces scalaires sont :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)R(bold) - l'abscisse (coordonnée x) de la clé aléatoire",
        },
        {
          type: "numbered-item",
          content: "(bold)S(bold) - le résultat de la formule de génération ECDSA",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Il est évident que (bold)R(bold) se trouve sur le graphe puisqu'il s'agit de l'abscisse (coordonnée x) d'une clé publique (une multiplication du point générateur (g) et de la clé privée aléatoire (k)) ; pour (bold)S(bold), en revanche, ce n'est pas du tout aussi clair. Cela ne devient évident qu'une fois que vous avez correctement parcouru la formule de génération et constaté que chaque opération est soit une addition, soit une multiplication sur un point qui existe déjà sur le graphe — garantissant ainsi que le scalaire final « s » se trouve lui aussi quelque part sur la courbe. Il vaut la peine de résumer cette distinction ainsi :",
    },
    {
      type: "paragraph",
      content:
        "(italics)Les points (r,s) ne sont (bold)pas(bold) une paire de coordonnées de points mais plutôt deux scalaires indépendants qui sont le résultat d'opérations cryptographiques sur la courbe elliptique secp256k1.(italics)",
    },
    {
      type: "paragraph",
      content:
        "Ils sont généralement (italics)présentés(italics) comme une paire de points de coordonnées, mais ce n'est pas la bonne interprétation — ils sont simplement stockés ainsi. Il est essentiel de s'en souvenir, car une source courante de confusion consiste à croire que (r,s) est un point spécifique sur la courbe elliptique, par opposition à deux scalaires indépendants.",
    },

    {
      type: "paragraph",
      content:
        "Si nous tentons de désérialiser une transaction Bitcoin en ses octets bruts, comme par exemple (linkpagehttps://www.bitscript.app/transactions?transaction=c9d4d95c4706fbd49bdc681d0c246cb6097830d9a4abfa4680117af706a2a5a0&env=MAINNET)ici(linkpage), nous finirions par tomber sur une signature ECDSA ; vue à travers notre outil de désérialisation, cela ressemble un peu à ceci : ",
    },
    {
      type: "image",
      src: "/articles/ECDSA DER/DER-2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Si vous insériez les octets surlignés dans un compteur de caractères, vous verriez que la longueur de la section surlignée ci-dessus est égale à 142 caractères, soit 72 octets. Pourtant, nous savons que r et s, en tant que scalaires d'une courbe elliptique, devraient faire environ 32 octets chacun — soit 64 octets au total. ",
    },
    {
      type: "paragraph",
      content:
        "(italics)Alors pourquoi la signature dans la transaction réelle affiche-t-elle (bold)72 octets(bold) ?(italics)",
    },
    {
      type: "paragraph",
      content: "(italics)Calcul de l'inverse modulaire de « S »(italics)",
    },
    {
      type: "paragraph",
      content:
        "La réponse à cette question, déjà entrevue à plusieurs reprises, y compris dans le titre de l'article, tourne entièrement autour du format de la signature numérique ECDSA insérée dans une transaction brute. Une transaction Bitcoin n'accepte pas une simple concaténation de (r,s) comme format de signature valide.",
    },
    {
      type: "paragraph",
      content:
        "Comme suggéré, Bitcoin exige que la signature soit reformatée en quelque chose connu sous le nom de format (bold)DER(bold), qui, à juste titre, signifie (italics)Distinguished Encoding Rules(italics). Avant de présenter les règles d'encodage réelles, faisons d'abord un petit détour historique sur la manière dont Bitcoin en est venu au standard DER.",
    },
    {
      type: "paragraph",
      content: "(italics)Union internationale des télécommunications (UIT)(italics)",
    },
    {
      type: "paragraph",
      content:
        "Internet, et par association toutes les données qui y circulent, est l'un de ces sujets où plus on en sait, plus on réalise qu'on ne sait pas. Nous vivons sur les épaules de géants, laissant derrière nous les détails complexes de ce qui constitue notre infrastructure. Par exemple, nous savons que les données doivent être standardisées pour fonctionner à travers tous les supports techniques, mais nous ne nous sommes jamais demandé qui exactement définit ces normes. ",
    },
    {
      type: "paragraph",
      content:
        "Il s'avère que les normes numériques et de télécommunication étaient déjà nécessaires à l'époque où la télégraphie commençait à se développer en tant qu'industrie. Avec ses origines remontant à 1865, c'est en réalité une agence des Nations Unies qui est actuellement chargée de créer et de maintenir ces normes ; connue sous le nom d'(bold)Union internationale des télécommunications (UIT)(bold), elle comprend de nombreuses branches clés chargées de garantir que les données soient structurées de manière universellement standardisée. La branche (bold)UIT-T(bold), qui signifie (bold)Secteur de la normalisation des télécommunications de l'Union internationale des télécommunications(bold), est spécifiquement chargée d'élaborer des normes internationales, connues sous le nom de (bold)(italics)Recommandations(italics) UIT-T(bold), qui assurent des télécommunications mondiales sans faille et facilitent l'interconnexion et l'interopérabilité des réseaux.",
    },
    {
      type: "paragraph",
      content: "(italics)Vérification de signature(italics)",
    },
    {
      type: "paragraph",
      content:
        "L'une des contributions majeures de l'UIT-T est le développement de l'Abstract Syntax Notation One (ASN.1), qui a été normalisée pour la première fois en 1984. ASN.1 est un (italics)(bold)langage(bold) utilisé pour décrire les structures de données pour les télécommunications et les réseaux informatiques(italics). Elle fournit un cadre permettant de spécifier des structures de données complexes d'une manière à la fois lisible par l'humain (bold)*et*(bold) lisible par la machine, ce qui en fait un outil absolument indispensable pour tout protocole de communication/réseau visant à atteindre une prise en charge universelle.",
    },
    {
      type: "paragraph",
      content:
        "Les Distinguished Encoding Rules (DER) sont un sous-ensemble des règles d'encodage définies par ASN.1 qui ont été développées pour garantir une représentation canonique et non ambiguë des données. DER est essentiel (sans jeu de mots) pour les applications cryptographiques, où même des variations mineures dans l'encodage peuvent entraîner d'importantes vulnérabilités de sécurité. Le développement de DER dans le cadre d'ASN.1 par l'UIT-T est le cadre même requis pour la prise en charge des signatures numériques — (bold)(underline)même dans Bitcoin !(underline)(bold)",
    },
    {
      type: "paragraph",
      content: "(italics)Le format DER(italics)",
    },
    {
      type: "paragraph",
      content:
        "Maintenant que nous connaissons le pourquoi et le qui, il est temps de présenter le quoi — c'est-à-dire le format DER pour les signatures numériques ECDSA ; ci-dessous, vous verrez un tableau qui décrit le format auquel les signatures ECDSA doivent se conformer pour être considérées comme une transaction valide par les nœuds du réseau ; ensuite, nous examinerons chaque élément ligne par ligne :",
    },
    {
      type: "image",
      src: "/articles/ECDSA DER/DER-3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "En examinant le tableau puis en suivant l'image présentée au début, nous pouvons commencer à disséquer et à comprendre chaque partie de ce format. En disposant ce qui précède horizontalement, nous obtenons un résumé du suivant :",
    },
    {
      type: "paragraph",
      content:
        "(bold)Marqueur | Longueur totale de la signature | Éléments R | Éléments S | Drapeau SigHash(bold)",
    },
    {
      type: "paragraph",
      content: "Passons en revue chacun de ces groupements plus en détail :",
    },
    {
      type: "paragraph",
      content: "(italics)Longueur(italics) (totale, r, s)",
    },
    {
      type: "paragraph",
      content:
        "Espérons que ce n'est pas la première fois que vous analysez des transactions brutes, car il y a au moins un élément dans ce qui précède qui est une source courante de confusion : les trois (bold)(italics)longueurs(italics)(bold) différentes (totale, r, s). Rappelez-vous, lorsque l'on fait (italics)quoi que ce soit(italics) dans une transaction Bitcoin brute qui a une longueur dynamique, nous devons communiquer à la pile la longueur des données que nous nous apprêtons à empiler, en octets. Par exemple, si nous allons empiler une clé publique, qui fait (bold)32(bold) octets de long, nous devons d'abord empiler OP_20 (0x20 = 2*16 + 0 = 32) sur la pile. ",
    },
    {
      type: "paragraph",
      content: "(italics)Marqueur(italics) (général, remplissage, octet zéro)",
    },
    {
      type: "paragraph",
      content:
        "De plus, une transaction Bitcoin brute possède également occasionnellement des « marqueurs » ou « drapeaux » spéciaux qui communiquent une propriété spécifique, comme le champ Marqueur et Drapeau (0x0001) pour une transaction SegWit ou la version SegWit pour une transaction Taproot (0x52). Une signature ECDSA avec le format DER approprié possède (italics)également(italics) (italics)(bold)trois(bold)(italics) marqueurs différents :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. (bold)Marqueur général/de signature (0x30)(bold) - Signale le début d'une signature ECDSA",
        },
        {
          type: "numbered-item",
          content:
            "2. (bold)R,S - Marqueur de début (0x02)(bold) - Signale le début des trois éléments qui suivent pour « r » et « s » (longueur, valeur de remplissage)",
        },
        {
          type: "numbered-item",
          content:
            "3. (bold)R,S - Remplissage (0x00)(bold) - Signale la (italics)fin(italics) de la (italics)(bold)longueur(bold)(italics) pour « r » ou « s » et signale le (italics)début(italics) de la (italics)(bold)valeur(bold)(italics) réelle de « r » et « s »",
        },
      ],
    },
    {
      type: "paragraph",
      content: "(italics)Drapeau SigHash (italics)",
    },
    {
      type: "paragraph",
      content:
        "Enfin, et sans doute la partie la plus importante de la signature, se trouve une valeur littérale d'un octet qui a six options possibles différentes : (0x01 - 0x03 et 0x81 - 0x83). La valeur est éminemment importante puisqu'elle communique exactement comment une transaction sera dépensée ; lorsqu'une transaction est signée, le drapeau SigHash détermine (italics)(bold)quelles parties (entrées et sorties) de la transaction sont incluses dans le message haché(bold)(italics). ",
    },
    {
      type: "paragraph",
      content:
        "Pour des raisons évidentes, la subtilité ci-dessus est généralement ignorée lorsque les gens discutent des mécanismes de Bitcoin ; mais, espérons-le, avec les exemples ci-dessus, les détails commencent à s'éclaircir. Pour que des transactions correctement formatées et confirmées soient dépensées, une signature numérique est requise de la part du dépensier prévu — c'est parfois pourquoi les gens parlent de dépenser des bitcoins comme de (italics)signer(italics) l'UTXO. Car, en bref, pour dépenser une sortie de transaction non dépensée, vous devez prouver cryptographiquement que vous êtes le destinataire prévu.",
    },
    {
      type: "paragraph",
      content:
        "Les drapeaux SigHash sont les instructions littérales pour créer des messages hachés acceptables à partir d'une transaction Bitcoin brute. Cela permet différents niveaux de flexibilité dans la manière dont les transactions peuvent être signées et modifiées ; en bref, (italics)ces drapeaux dictent à quelles données la signature s'engage, ce qui impacte la flexibilité d'une transaction et les avantages de sécurité qu'elle offre(italics). Ces drapeaux SigHash sont directement responsables de la capacité de Bitcoin à créer des types de transactions plus créatifs tels que les séquestres (escrows), les échanges atomiques (atomic swaps), les financements participatifs (crowdfunds) et les très populaires PSBT.",
    },
    {
      type: "paragraph",
      content:
        "En fait, les drapeaux SigHash, malgré leur taille minuscule d'un seul octet, sont (bold)(italics)tellement(italics)(bold) importants et difficiles à comprendre que nous consacrons plusieurs articles à détailler le rôle exact que joue chaque drapeau. ",
    },
    {
      type: "paragraph",
      content: "(italics)Pour conclure(italics)",
    },

    {
      type: "paragraph",
      content:
        "Avec les drapeaux SigHash entrevus, nous avons maintenant couvert chaque élément requis pour qu'une signature ECDSA se conforme au format DER ; de plus, nous avons couvert exactement ce qu'est le format DER ainsi que son histoire dans les normes de télécommunication et de réseau. En augmentant continuellement nos connaissances sur les signatures ECDSA, nous avons maintenant couvert la génération d'une signature, la vérification d'une signature et le formatage d'une signature. Le prochain élément en route ici est de plonger dans les drapeaux SigHash afin d'explorer les multiples façons de préparer une transaction brute pour une signature.",
    },
  ],
};

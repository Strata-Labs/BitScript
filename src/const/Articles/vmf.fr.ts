import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { VMF as English } from "./vmf";

// French translation of VMF.
//
// Pattern: spread the English article, then override the translated fields.
// Do NOT override `module` or `section` (inherit English via spread) so the
// page renders correctly across locales. Only translate title, description,
// and content.

export const VMFFr: ArticleViewProps = {
  ...English,
  title:
    "Version, Marqueur, Champ - Configurer et identifier une transaction SegWit",
  description:
    "Examinez la configuration d'une transaction SegWit, en vous concentrant sur les trois premiers champs.",
  content: [
    {
      type: "main title",
      content: "Configurer et identifier une transaction SegWit",
    },
    {
      type: "paragraph",
      content:
        "Peu de mises à jour ont autant marqué l'écosystème Bitcoin que le très célèbre soft fork SegWit activé par les utilisateurs en 2017 - et pour de bonnes raisons ! Non seulement il a résolu (ou du moins apaisé, selon à qui vous demandez) une longue guerre d'usure entre deux camps : les partisans des petits blocs et ceux des grands blocs. Plus important encore, il a abouti à une seconde manière, entièrement nouvelle, de formater une transaction.  ",
    },
    {
      type: "paragraph",
      content:
        "La plupart des développeurs, débutants ou avancés, en sont généralement conscients, ou ont au moins entendu parler de « SegWit ». En fait, ils (italics)pourraient(italics) même déjà savoir que ce dernier (SegWit) insère une section entièrement nouvelle dans la transaction, connue sous le nom de Witness : ",
    },
    {
      type: "paragraph",
      content:
        "(bold)Mais, face à l'hexadécimal brut d'une transaction aléatoire, pouvez-vous repérer immédiatement s'il s'agit d'une transaction Legacy ou SegWit ?(bold)",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Si cela vous prend plus de ~deux secondes, alors il vaut peut-être la peine de rafraîchir vos connaissances sur les transactions SegWit (continuez votre lecture, vous saurez tout à la fin) ! Décomposer une transaction, et plus précisément une transaction SegWit, est (italics)particulièrement(italics) ardu car très peu de ressources couvrent le sujet du début à la fin. Il existe des ressources phénoménales sur la dissection d'une transaction Legacy, mais presque rien sur SegWit, et encore moins de ressources sur les transactions TapRoot plus récentes.",
    },
    {
      type: "paragraph",
      content:
        "Nous pensons que la meilleure façon d'améliorer ses connaissances pratiques est de les rendre concrètes. Alors, aujourd'hui et pour les prochaines leçons, vous allez inspecter une transaction SegWit sous sa forme hexadécimale brute. En la décomposant octet par octet, vous couvrirez tous les détails impliqués dans la lecture ou l'écriture d'une transaction SegWit.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Le tableau ci-dessus semble intimidant, et les premières fois cela peut paraître difficile, mais le plus dur dans la compréhension des transactions Bitcoin est d'identifier et de retenir les détails mineurs et les exceptions.",
    },
    {
      type: "paragraph",
      content:
        "En suivant le tableau ci-dessus, nous parcourrons une transaction mainnet et la ferons correspondre à chaque champ. Vous trouverez ci-dessous à la fois l'identifiant de la transaction (TXID) et sa transaction hexadécimale brute correspondante :",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Selon que vous êtes inscrit ou que vous disposez d'un accès freemium, vous pouvez suivre dans notre outil de désérialisation en ouvrant une autre fenêtre et en cliquant ici.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-4.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Comme le titre le suggère, nous couvrons aujourd'hui les parties (italics)non-Witness(italics) d'une transaction SegWit. Plus précisément, nous nous concentrons exclusivement sur les trois (3) premiers champs de base présents dans une transaction SegWit : ",
    },
    {
      type: "paragraph",
      content:
        "Bien qu'ils n'aient pas de nom officiel en tant que groupe, nous avons tendance à considérer ces champs placés en tête comme des champs de « paramètres » ou de « configuration ». Vous trouverez ci-dessous un résumé de ces trois champs ; nous examinerons chaque champ en détail.",
    },
    {
      type: "paragraph",
      content: "(bold)Version(bold) (4 octets | 8 caractères)",
    },
    {
      type: "paragraph",
      content:
        "Le champ version est toujours le tout premier champ présent dans une transaction. Il est long de 4 octets (ou 8 caractères) et écrit au format (italics)(linkformatter)Little Endian(link)(italics) ; cela signifie simplement que les octets sont inversés par rapport à leur valeur d'origine (pour plus d'informations sur le boutisme, jouez avec le formateur de données lié). Le résultat final de ce format, comme vous le remarquerez, est que le premier octet contient une certaine valeur tandis que les trois (3) octets restants sont des 0x00.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-5.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Théoriquement, ces quatre premiers octets ont ~65 000 variations possibles ; cependant, cela ne signifie pas que ces versions sont standard ou acceptées par les nœuds et le réseau Bitcoin en général. En fait :",
    },
    {
      type: "paragraph",
      content:
        "(bold)Le champ version n'a que deux valeurs reconnues qui sont relayées sur le réseau(bold)",
    },
    {
      type: "paragraph",
      content:
        "Ces deux champs version acceptés ainsi que les avantages de la nouvelle implémentation sont présentés ci-dessous :",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-6.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Notamment, et c'est une erreur assez courante, (italics)rien dans ce champ (bold)version(bold) n'indique s'il s'agit d'une transaction Legacy ou SegWit(italics) ; contrairement à une croyance répandue, vous trouverez à la fois des transactions SegWit v1 (italics)(bold)&(bold)(italics) des transactions Legacy v2 : le champ version n'a (italics)(bold)rien(bold)(italics) à voir avec SegWit (cela vient avec le champ suivant). Avant de poursuivre, examinons exactement quels avantages sont apportés par la Version 2 (0x02000000) mentionnée ci-dessus :",
    },
    {
      type: "paragraph",
      content:
        "(bold)Verrou temporel nSequence(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki)BIP 68(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "Le premier des trois avantages fondamentaux de la Version 2 (0x02000000) provient du BIP 68 intitulé : « Relative Lock-Time Using Consensus-Enforced Sequence Numbers ». C'est une formule bien pompeuse pour dire que nSequence fournit un verrou temporel à une (bold)(italics)entrée(italics)(bold). Auparavant, les transactions disposaient d'un unique champ Locktime positionné comme tout dernier élément et (italics)il couvrait l'ensemble de la transaction(italics).",
    },
    {
      type: "paragraph",
      content:
        "Avec le verrou temporel nSequence, chaque entrée (compatible SegWit) dispose d'un emplacement de verrou temporel positionné comme dernier champ d'une entrée (après le champ ScriptSig) ; cela permet aux utilisateurs de spécifier le bloc ou le moment le plus précoce auquel une transaction peut être incluse dans la blockchain, offrant un contrôle plus personnalisé sur les conditions de dépense.",
    },
    {
      type: "paragraph",
      content:
        "Particulièrement important, ce BIP spécifique a été crucial pour permettre Lightning, car, lorsqu'un canal Lightning est ouvert, la transaction de financement inclut des valeurs nSequence pour définir des verrous temporels relatifs pour la dépense des fonds du canal. ",
    },
    {
      type: "paragraph",
      content:
        "(bold)OP_CheckSequenceVerify(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki)BIP 112(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "Le deuxième principal déblocage de la Version 2 se présente sous la forme d'un opcode (linkOPS/OP_CHECKSEQUENCEVERIFY)OP_CHECKSEQUENCEVERIFY (CSV)(link). CSV permet aux utilisateurs de spécifier un délai temporel relatif pour la dépense d'une (bold)sortie(bold) de transaction, mesuré en hauteur de bloc ou en temps écoulé depuis la confirmation de la sortie.",
    },
    {
      type: "paragraph",
      content:
        "Pour que ce soit bien clair, les deux mises à jour mentionnées sont responsables de l'introduction de mécanismes de verrouillage temporel plus granulaires. La première, le verrou temporel nSequence (BIP 68), se concentre sur l'ajout de cette fonctionnalité aux (bold)(italics)entrées(italics)(bold), tandis que la seconde se concentre sur l'ajout de cette fonctionnalité aux (bold)(italics)sorties(italics)(bold). Ensemble, ces deux améliorations BIP ont radicalement modifié la capacité de verrouillage temporel non seulement des transactions entières mais aussi spécifiquement des entrées et des sorties.",
    },
    {
      type: "paragraph",
      content:
        "(bold)Median Time Past(bold) ((linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki)BIP 113(linkpage))",
    },
    {
      type: "paragraph",
      content:
        "La dernière des trois mises à jour incluses dans la Version 2 traite également des mécanismes de verrou temporel ; cependant, cette fois-ci, l'accent n'est pas tant mis sur l'ajout d'une fonctionnalité que sur la sécurisation d'un paramètre existant. Avant cette mise à jour, l'horodatage principal utilisé pour l'unique fonctionnalité de verrou temporel était l'horodatage inclus dans le bloc miné ; cependant, cet horodatage pouvait être manipulé par les mineurs dans une certaine mesure, il était donc considéré comme médiocre et potentiellement dangereux.",
    },
    {
      type: "paragraph",
      content:
        "Comme solution pour améliorer la fiabilité d'un horodatage de verrouillage/déverrouillage, le BIP 113 a introduit l'horodatage « Median Time Past ». Au lieu de l'horodatage du bloc, les vérifications basées sur le temps utilisent désormais (italics)la (bold)médiane(bold) des (bold)onze (11) blocs précédents(bold)(italics).",
    },
    {
      type: "paragraph",
      content: "(bold)Marker(bold) (1 octet | 2 caractères)",
    },
    {
      type: "paragraph",
      content:
        "Pour répondre à la question d'ouverture, ou au cas où vous travailleriez sur une analyse personnalisée, lors de la lecture d'une transaction brute, la manière la plus rapide de savoir s'il s'agit d'une transaction SegWit est de vérifier l'octet situé immédiatement après le champ Version (c'est-à-dire le 9e octet). Si le 9e octet est un octet nul (c'est-à-dire égal à 0x00), alors la transaction est (bold)(italics)bel et bien(italics)(bold) une transaction SegWit dotée d'une section witness ségréguée.",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-7.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Ce 9e octet, le deuxième champ que nous examinons, est plus précisément connu sous le nom de (bold)Marker(bold) ; lequel, comme son nom le confirme, (bold)marque(bold) si la transaction est une transaction Legacy ou SegWit. Hormis l'octet nul (0x00), il n'y a rien d'autre que ce champ puisse signifier, car toute autre valeur serait interprétée comme un VarInt pour le champ compteur d'entrées.",
    },
    {
      type: "paragraph",
      content: "(bold)Flag(bold) (1 octet | 2 caractères)",
    },
    {
      type: "paragraph",
      content:
        "Enfin et surtout, le troisième et dernier champ que nous examinons, qui est adjacent au Marker, est connu sous le nom de (bold)Flag(bold). Il s'agit également d'une valeur d'un seul octet qui agit comme un indicateur pour les transactions SegWit. Il est théoriquement censé définir la prise en charge future de variantes supplémentaires de SegWit ; cependant, pour l'instant, seule la valeur d'octet 0x01 est reconnue comme standard et relayée sur le réseau :",
    },
    {
      type: "image",
      src: "/articles/VMF/Image-8.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Comme annoncé dans l'introduction, l'essentiel de la logique et du travail impliqués se déroule dans les sections Entrées, Sorties et Witnesses. Comme vu ci-dessus, les trois premiers champs (Version, Marker, Flag) ne sont en effet que de simples champs de paramétrage et de configuration pour une transaction SegWit.",
    },
    {
      type: "title",
      content: "Pour conclure",
    },
    {
      type: "paragraph",
      content:
        "Les trois premiers champs étant désormais derrière nous, dans la prochaine leçon, nous passerons à la section la plus compliquée de toute transaction : le champ Entrées. Comme nous le verrons bientôt, maintenir la rétrocompatibilité entre Legacy et SegWit peut être délicat ; avec l'introduction de SegWit, malheureusement, les entrées deviennent encore plus complexes.",
    },
  ],
};

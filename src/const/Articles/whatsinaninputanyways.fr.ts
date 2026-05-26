import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { WhatsInAnInputAnyways as English } from "./whatsinaninputanyways";

// French translation of WhatsInAnInputAnyways.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `href`, `shortHandTitle`, `lesson`, `itemType`, `isLocked`,
// `published`, `module`, `section`, `googleLinkBigScreen`, and
// `googleLinkSmallScreen` identical to the English version (inherited via the
// spread) so URLs and routing stay stable across locales.

export const WhatsInAnInputAnywaysFr: ArticleViewProps = {
  ...English,
  title: "Qu'y a-t-il dans une entrée au juste ?",
  description:
    "Un aperçu des entrées de transaction legacy dans le contexte des transactions Bitcoin.",
  content: [
    {
      type: "main title",
      content: "Un aperçu des entrées de transaction legacy",
    },
    {
      type: "paragraph",
      content:
        "On ne le répétera jamais assez : votre compréhension des transactions reste incomplète tant que vous n'avez pas pleinement saisi les deux champs de données au cœur de tout cela : les entrées et les sorties. Les sorties, avec des champs moins nombreux et plus simples (tels que le « montant »), sont intrinsèquement plus faciles à comprendre. Les entrées, en revanche, sont notoirement compliquées et deviennent encore plus déroutantes lorsque SegWit est inclus dans la discussion. Aujourd'hui, par conséquent, l'objectif est de passer en revue et de démystifier les entrées.",
    },
    {
      type: "paragraph",
      content:
        "Plus précisément, nous nous concentrerons sur une entrée legacy, car nous aborderons les complications de SegWit plus tard - voici un visuel pratique de ce que nous allons couvrir :",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/Image1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content: "Qu'y a-t-il dans une entrée au juste ?",
    },
    {
      type: "paragraph",
      content:
        "Une entrée, comme son nom l'indique, est une partie ou la totalité du solde Bitcoin qui entre (bold)(italics)dans(italics)(bold) une transaction donnée ; il peut être utile de la considérer comme le solde dépensé par la transaction. Pour « créer une entrée » ou « dépenser des bitcoins », vous devez essentiellement accomplir deux choses différentes :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Pointer vers les bitcoins que vous prétendez avoir reçus(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Prouver cryptographiquement que vous les avez reçus(bold)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "En examinant chacune de ces étapes plus en détail, nous pouvons dériver chacun des cinq champs ci-dessus. En commençant par le premier objectif, comment « pointer vers les bitcoins reçus » exactement ? Il s'avère que cela peut également être décomposé en deux étapes différentes (qui nous mèneront à nos deux premiers champs) :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1.1. Pointer vers la (italics)transaction(italics) spécifique qui contient la sortie non dépensée (les bitcoins reçus)",
        },
        {
          type: "numbered-item",
          content:
            "1.2. Pointer vers la (italics)sortie non dépensée(italics) spécifique que vous dépensez",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Rappelez-vous qu'une sortie non dépensée, ou UTXO, est un « morceau » de bitcoins non dépensés. En pointant vers la transaction puis vers la sortie spécifique, nous fournissons désormais suffisamment de données pour désigner une seule sortie précédemment non dépensée : c'est la première grande partie d'une entrée. Bien sûr, n'importe qui peut pointer vers une transaction minée et une sortie non dépensée ; il nous faut donc clairement davantage de données pour réellement la dépenser, ce qui nous amène à la seconde partie.",
    },
    {
      type: "paragraph",
      content:
        "Pour dépenser une entrée, nous devons prouver cryptographiquement que nous sommes bien les propriétaires légitimes de cette sortie de transaction non dépensée (encore une fois, plus communément appelée UTXO).",
    },
    {
      type: "title",
      content:
        "(italics)Alors, comment prouvez-vous cryptographiquement que vous êtes le propriétaire de l'UTXO sélectionné ?(italics)",
    },
    {
      type: "paragraph",
      content:
        "Cette question est essentiellement au cœur de l'une des fonctionnalités clés de Bitcoin et est donc abordée à travers une série de leçons précédentes (au cas où vous sauteriez d'un sujet à l'autre) ; cependant, ci-dessous, nous passerons en revue une réponse courte et une réponse plus longue et techniquement plus précise. ",
    },
    {
      type: "title",
      content: "(italics)Réponse courte(italics)",
    },
    {
      type: "paragraph",
      content:
        "La réponse courte est que les (bold)signatures numériques(bold) basées sur la cryptographie à courbes elliptiques, la primitive cryptographique, sont à l'origine du mécanisme central utilisé pour prouver la propriété des sorties de transaction non dépensées. Une signature numérique est utilisée pour prouver mathématiquement que vous avez signé un message (dans Bitcoin, le « message » est la transaction non signée) avec une clé privée en ne révélant que la clé publique. Cette signature numérique sert à prouver que vous possédez la clé privée correspondant à la clé publique à laquelle un UTXO est assigné, en signant une transaction. ",
    },
    {
      type: "paragraph",
      content:
        "Les signatures numériques sont sans doute à la fois la partie la plus importante et la plus difficile à saisir des fondamentaux derrière les transactions - nous recommandons très, très fortement de vous rendre dans la section Cryptographie (dès qu'elle sera mise à jour).",
    },
    {
      type: "title",
      content: "(italics)Réponse longue(italics)",
    },
    {
      type: "paragraph",
      content:
        "La réponse longue est que Bitcoin est livré avec un langage de script (plus communément appelé « script » ou « bitcoin script »). Ce langage de script, qui mérite également sa propre série d'articles et n'est donc qu'esquissé ici, est constitué d'opcodes (pensez à des fonctions/commandes/opérations) et de données poussées (généralement des clés publiques, des clés publiques hachées, des scripts de verrouillage, etc.). Chaque entrée et chaque sortie possède un script. Dans le premier cas, une entrée, il est connu sous le nom de scriptSig (ou script de déverrouillage), et dans le second cas, une sortie, il est connu sous le nom de pubKeyScript (ou script de verrouillage). ",
    },
    {
      type: "paragraph",
      content:
        "Lorsqu'un nœud vérifie si une transaction est valide, il le fait en concaténant le scriptSig d'une entrée avec le scriptPubKey d'une sortie non dépensée et en traitant le script nouvellement combiné ; s'il reste une unique valeur résiduelle de 0x01 (équivalent à « true ») après le traitement de la pile, alors la transaction est considérée comme valide.",
    },
    {
      type: "paragraph",
      content:
        "En résumé, lorsque nous disons que nous devons prouver cryptographiquement la propriété d'un UTXO, nous voulons dire (bold)« fournir un scriptSig qui, combiné au pubKeyScript de la sortie non dépensée fournie, renvoie une transaction valide » ;(bold) cela implique presque toujours une clé publique et une signature ainsi que des opcodes tels que op_checksig ou op_checkmultsig, ce n'est cependant pas (bold)(italics)strictement(italics)(bold) le cas. ",
    },
    {
      type: "paragraph",
      content:
        "Maintenant que nous avons récupéré une transaction et isolé une sortie non dépensée, que vient-il ensuite ? ",
    },
    {
      type: "paragraph",
      content:
        "Fournir un scriptSig. Sauf que Bitcoin est vraiment strict lorsqu'il travaille avec des données dynamiques - chaque fois que vous travaillez avec quelque chose dont la taille peut varier, vous devrez toujours d'abord inscrire la (bold)taille(bold) des données à venir. Cela signifie que la question d'ouverture est également répondue avec un minimum de deux champs de données :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "2.1 - La (italics)taille(italics) de la signature / du script de déverrouillage (ScriptSigSize)",
        },
        {
          type: "numbered-item",
          content: "2.2 - La signature / le script de déverrouillage réel (ScriptSig)",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Nous connaissons désormais quatre des cinq champs de données possibles (la transaction, la sortie, la taille du scriptSig et le scriptSig) lorsqu'il s'agit de décrire une entrée.",
    },
    {
      type: "paragraph",
      content:
        "Le dernier et ultime champ de données d'une entrée est un pointeur de verrouillage temporel relatif vers le moment le plus précoce où l'entrée peut être dépensée / confirmée on-chain. Tout comme chaque transaction possède un locktime, chaque entrée spécifique peut également avoir un locktime ; c'est ce que l'on appelle le nSequence et c'est, une fois de plus, le cinquième et dernier champ utilisé dans une entrée. ",
    },
    {
      type: "paragraph",
      content:
        "Encore une fois, si c'est la première fois que vous plongez dans les mécanismes de Bitcoin, ne vous découragez pas face à la complexité ici - nous couvrons littéralement tout ce qui intervient dans une transaction moderne.",
    },
    {
      type: "paragraph",
      content:
        "Le « pourquoi » derrière les cinq champs étant répondu, nous allons maintenant passer en revue chaque étape d'une entrée et vérifier qu'elle concorde avec toute la logique dont nous avons discuté ci-dessus ; la meilleure façon de procéder, bien sûr, est d'inspecter une véritable transaction mainnet :",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/image2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Nous utiliserons le premier exemple (intitulé Direct Transfer (p2pkh)) que l'on trouve dans l'outil (linktransactions)Deserializer(link) collé ci-dessus - n'hésitez pas à suivre en ouvrant l'outil côte à côte.",
    },
    {
      type: "paragraph",
      content: "Une entrée octet par octet",
    },
    {
      type: "paragraph",
      content: "(bold)Nombre d'entrées(bold) (VarInt)",
    },
    {
      type: "paragraph",
      content:
        "Avant de fournir les données pour une entrée spécifique, nous devons d'abord signaler (italics)combien(italics) d'entrées un client peut s'attendre à analyser ; par conséquent, le tout premier champ d'entrée est en réalité un (bold)compteur(bold) du nombre d'entrées dans la transaction. C'est la première fois qu'il n'y a pas un nombre fixe d'octets mais plutôt quelque chose appelé un VarInt. Un VarInt, comme son nom l'indique, signifie Variable Integer (entier variable), qui est le format standard utilisé par Bitcoin pour signaler une taille (cela a également son propre article car le VarInt se retrouve partout dans Bitcoin, mais nous avons résumé les informations les plus importantes ci-dessous) :",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/image3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Dans le tableau ci-dessus, vous verrez les règles d'utilisation du VarInt. Comme vous le remarquerez, la taille du VarInt lui-même varie (d'où le nom) ; si la valeur entière nécessaire est supérieure à 252, alors nous utilisons un octet supplémentaire comme drapeau pour signaler combien d'octets (italics)additionnels(italics) sont nécessaires pour cette instance de VarInt.",
    },
    {
      type: "paragraph",
      content:
        "Concernant notre transaction d'exemple, dans la capture d'écran ci-dessous, vous remarquerez que la transaction affiche 0x01, soit 1 octet, ce qui signale que cette transaction possède une seule entrée :",
    },
    {
      type: "image",
      src: "/articles/whats in an input anyways/image4.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Maintenant que nous savons combien d'entrées nous devons analyser (dans ce cas, une seule), nous pouvons examiner les champs de données nécessaires (bold)(italics)pour chaque(italics)(bold) entrée individuelle. Dans la prochaine leçon de cette série, nous ferons précisément cela - analyser les cinq champs d'entrée dans la transaction d'exemple sur laquelle nous avons travaillé.",
    },
  ],
};

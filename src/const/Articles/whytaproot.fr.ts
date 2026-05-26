import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { WhyTaproot as English } from "./whytaproot";

// French translation of WhyTaproot.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `module`, `section`, `href`, `shortHandTitle`, `lesson`, `itemType`,
// `isLocked`, `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen`
// identical to the English version (inherited via the spread) so URLs and
// navigation stay stable across locales.

export const WhyTaprootFr: ArticleViewProps = {
  ...English,
  title: "Pourquoi Taproot",
  description:
    "Découvrez la mise à niveau révolutionnaire de Bitcoin, qui renforce la confidentialité, active les contrats intelligents et réduit les frais dans Bitcoin.",
  content: [
    {
      type: "main title",
      content: "Répondre à l'efficacité, à la confidentialité et aux contrats intelligents",
    },
    {
      type: "paragraph",
      content:
        "Le monde, et a fortiori le monde de la cryptomonnaie, est bien différent de ce qu'il était en 2017, lorsque SegWit a été officiellement activé par un soft fork activé par les utilisateurs. À l'époque, la priorité était de soutenir des solutions de paiement bon marché et évolutives à travers des expériences passionnantes comme le Lightning Network ; à l'époque, Ethereum n'avait (italics)pas encore(italics) franchi le milliard de dollars de capitalisation boursière, une théorie en cours de test avancée par Vitalik.  ",
    },
    {
      type: "paragraph",
      content:
        "Taproot, officiellement activé à la hauteur de bloc 709632 (14 nov. 2021), était une réponse de la communauté aux leçons apprises en interne et auprès d'autres écosystèmes depuis la mise à jour SegWit. Il est indéniable que Taproot est la (bold)(italics)mise à jour la plus importante et la plus passionnante de Bitcoin depuis SegWit(italics)(bold). Et pourtant, peu de ressources existent pour expliquer ce qui se passe sous le capot. C'est pourquoi, à partir de cette leçon, nous allons nous concentrer exclusivement et intensivement sur tout ce qui touche de près ou de loin à Taproot. ",
    },
    {
      type: "paragraph",
      content:
        "Pour commencer, il convient d'expliquer pourquoi Taproot a été activé. Pourquoi se donner la peine d'utiliser Taproot plutôt que des transactions Legacy ou SegWit en premier lieu ? Quels avantages apporte-t-il ?",
    },
    {
      type: "image",
      src: "/articles/why taproot/Image-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Voici ce que le principal BIP de Taproot prétend être les raisons pour lesquelles Taproot aurait dû être implémenté - voyons si elles tiennent la route.",
    },
    {
      type: "paragraph",
      content:
        "À titre d'avertissement, si c'est la toute première fois que vous interagissez avec Taproot, il est tout à fait normal que ces raisons soient actuellement hors de votre portée de compréhension. Le but de présenter d'abord les avantages est d'introduire tous les nouveaux termes, mathématiques et logiques à travers la perspective de (italics)comment(italics) ils se connectent à tout le reste. Il est conseillé de lire la section ci-dessous une fois, de retenir quelques-uns des mots, puis d'y revenir à mesure que vous progressez dans la série.",
    },
    {
      type: "paragraph",
      content: "(bold)Augmente la confidentialité on-chain(bold)",
    },
    {
      type: "paragraph",
      content:
        "Chaque Bitcoiner, des individus souverains aux entités conformes, devrait se soucier de la confidentialité on-chain. Il n'est donc guère surprenant que ce soit l'un des arguments avancés pour soutenir et utiliser Taproot. Comme nous le verrons dans la série, cet argument est certainement fondé, car la confidentialité on-chain est augmentée de bien des manières :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Transactions uniformes(bold)",
        },
        {
          type: "paragraph",
          content:
            "La fonctionnalité de confidentialité phare, sans aucun doute, est que malgré le vaste, vaste espace de données dont dispose un développeur, une sortie de transaction non dépensée (utxo) Taproot a exactement la même apparence. Une sortie Taproot peut être destinée à être dépensée comme un simple transfert direct d'une clé publique à une autre, ou elle peut contenir des milliers de scripts individuels dans un océan de complexité et de choix - dans les deux scénarios, elles ont exactement la même apparence : une chaîne hexadécimale / un tableau d'octets de 64 octets | 128 caractères.",
        },
        {
          type: "paragraph",
          content:
            "Si vous cliquez sur l'exemple Taproot - Commit dans notre désérialiseur et que vous trouvez l'Output ScriptSig, vous verriez ce qui suit : ",
        },
        {
          type: "image",
          src: "/articles/why taproot/Image-2.png",
          alt: "Transaction Inputs",
        },
        {
          type: "paragraph",
          content:
            "Rien qu'à partir de ce qui précède, il est impossible de deviner quelles sont les intentions liées à cette sortie. Comme vous le verrez, chaque sortie Taproot dispose, par défaut, d'au moins deux façons différentes (ou chemins) d'être dépensée : un key path (dépensé par une clé unique ou agrégée - similaire à un transfert direct) ou un script path (dépensé soit par une clé, soit par un script).",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Agrégation Schnorr(bold)",
        },
        {
          type: "paragraph",
          content:
            "En parlant d'une clé agrégée, l'une des primitives cryptographiques fondamentales qui alimentent Taproot est ce que l'on appelle une signature Schnorr. Comme nous le verrons lorsque nous examinerons le BIP de la signature Schnorr et les différentes variantes de Schnorr, cela nous permet de créer des clés publiques à signataire unique ou à signataires multiples qui ont la même apparence ; cela signifie qu'en regardant simplement une clé publique, il est (italics)impossible de savoir si elle appartient à un seul utilisateur ou à un groupe de signataires(italics). ",
        },
        {
          type: "paragraph",
          content:
            "Alors que l'avantage précédent offre l'obscurité à la fois pour les key paths et les script paths, les signatures Schnorr sont responsables d'augmenter davantage la confidentialité on-chain en masquant si le key path qui est ensuite consommé est détenu par une ou plusieurs entités.",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Scripts masqués par MAST(bold)",
        },
        {
          type: "paragraph",
          content:
            "Tout comme les signatures Schnorr offrent davantage de confidentialité sur l'un des deux chemins principaux (key path), la partie script path d'une sortie Taproot dispose également d'une autre couche de confidentialité. Bien que le BIP 341 définisse le script path comme un « chemin », un nom techniquement plus exact serait un « arbre de Merkle de clés ou de scripts ». ",
        },
        {
          type: "paragraph",
          content:
            "C'est parce que le script path, qui est présent par défaut avec toute sortie Taproot, n'est pas nécessairement un script unique mais plutôt un arbre entier de scripts. Comme nous le verrons plus tard, consommer une seule des branches de l'arbre peut être dépensé (italics)sans révéler les autres branches(italics). Cela signifie qu'un script path peut contenir 2^128 façons différentes de verrouiller une sortie Bitcoin, mais seule la branche consommée est révélée on-chain - aucune autre donnée concernant les autres branches n'est jamais révélée. ",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Bien évidemment, il est probablement très difficile de saisir tout ce qui est mentionné ci-dessus à la première lecture, encore une fois, c'est à prévoir. L'idée ici est de commencer notre parcours en comprenant ce que la mise à jour Taproot visait à accomplir.",
    },
    {
      type: "paragraph",
      content: "(bold)Étend les contrats intelligents(bold)",
    },
    {
      type: "paragraph",
      content:
        "Le deuxième avantage clé de Taproot est l'implémentation (ou le soutien accru, selon à qui vous demandez) des contrats intelligents on-chain. Comme nous l'avons aperçu dans la section précédente, (italics)chaque(italics) sortie Taproot dispose d'un key path et d'un script path intégrés ; et tout comme la dernière section sur la confidentialité, les deux chemins offrent des avantages en termes de fonctionnalité de contrat intelligent.",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Arbre MAST de clés et de scripts(bold)",
        },
        {
          type: "paragraph",
          content:
            "Il va sans dire que passer d'entrées avec un (italics)seul(italics) script à des entrées avec un (italics)arbre de Merkle(italics) de scripts est une perspective passionnante. Pouvant contenir jusqu'à 2^128 « possibilités » différentes (ou branches Tapleaf comme on les appelle), il est indéniable que la structure arborescente augmente massivement l'espace de données, ou l'espace de contrat, qui accompagne une seule sortie.",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Multi-sig agrégé Schnorr(bold)",
        },
        {
          type: "paragraph",
          content:
            "D'autre part, le nom de key path est trompeusement simple puisque les signatures Schnorr sont impliquées. Également aperçu ci-dessus, les signatures Schnorr sont capables d'agréger linéairement des multisig en une seule signature - ce qui signifie que chaque key path dispose d'un multisig robuste intégré (italics)indépendant du script path(italics).",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Comme nous pouvons, espérons-le, le voir plus clairement, (bold)(italics)les deux(italics)(bold) chemins disposent d'une sorte de fonctionnalité qui peut être considérée comme une extension de la fonctionnalité de contrat intelligent. Deux avantages explorés à présent, plus qu'un seul avant de faire une pause et de passer aux bases de Taproot.",
    },
    {
      type: "paragraph",
      content: "(bold)Efficacité et frais réduits(bold)",
    },
    {
      type: "paragraph",
      content:
        "Enfin, et peut-être pas aussi passionnant que le premier mais tout de même apprécié, vient l'avantage en matière d'efficacité qui se traduit finalement par des frais réduits. Comme l'une des critiques les plus courantes adressées à Bitcoin, il est impératif que, malgré l'ajout de fonctionnalités supplémentaires, les frais de transaction restent aussi bas que possible. Une fois de plus, comme nous le verrons ci-dessous, la conception de Taproot tient profondément compte des frais à la fois dans les deux chemins ainsi que dans la conception générale.",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1. Multi-signature moins coûteuse(bold)",
        },
        {
          type: "paragraph",
          content:
            "Nous avons mentionné à deux reprises maintenant la signature agrégée et la validation par lots qui découlent des multisig dérivés de Schnorr. En plus de la confidentialité qui se produit ici, il convient de souligner que, qu'il y ait un seul ou des centaines de signataires, la taille de la signature est la même. Au lieu de payer les frais pour valider une transaction comportant des centaines de signatures individuelles (ce qui constituerait une transaction énorme), des frais sont économisés grâce à une clé publique de taille fixe.",
        },
        {
          type: "numbered-item",
          content: "(bold)2. Masque le script non exécuté lors du déverrouillage(bold)",
        },
        {
          type: "paragraph",
          content:
            "Le script path en bénéficie également d'une manière similaire. Mentionné dans le BIP 341, il est préférable que les développeurs utilisent plusieurs branches plutôt que plusieurs conditionnelles if/then dans une seule transaction. Cela permet une fois de plus d'économiser de l'espace de transaction et des frais d'une manière similaire : au lieu qu'une transaction nécessite l'empreinte de la branche non exécutée entière d'un script conditionnel, avec une structure MAST nous pouvons économiser de l'espace de transaction en ne révélant que la logique exécutée.",
        },
        {
          type: "numbered-item",
          content: "(bold)3. Réduit l'empreinte on-chain lors du verrouillage(bold)",
        },
        {
          type: "paragraph",
          content:
            "D'autre part, lors de la création du script path, il est immédiatement clair comment nous économisons de l'espace de transaction : au lieu de fournir tous les scripts possibles à la fois, nous fournissons simplement un seul hash qui est représentatif de l'arbre de Merkle.",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Et voilà ! Outre les fonctionnalités qui contribuent à la confidentialité, des frais de transaction sont économisés car l'espace de transaction on-chain est volontairement maintenu aussi petit que possible.",
    },
    {
      type: "paragraph",
      content: "(bold)En route vers les bases de Taproot(bold)",
    },
    {
      type: "paragraph",
      content:
        "Espérons que nous sommes désormais convaincus que Taproot est au moins une mise à niveau très puissante qui mérite d'être explorée. Dans le prochain article, nous présenterons les bases de Taproot, après quoi et tout au long de la série, nous verrons comment chacun de ces avantages prend vie à partir de la conception implémentée.",
    },
  ],
};

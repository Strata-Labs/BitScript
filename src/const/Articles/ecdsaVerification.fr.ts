import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ECDSAVerification as English } from "./ecdsaVerification";

// French translation of ECDSAVerification.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `href`, `shortHandTitle`, `lesson`, `itemType`, `isLocked`,
// `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen` identical
// to the English version (inherited via the spread) so URLs stay stable
// across locales.

export const ECDSAVerificationFr: ArticleViewProps = {
  ...English,
  title: "Vérification ECDSA",
  description:
    "Apprenez les bases de la vérification ECDSA pour les signatures numériques.",
  content: [
    {
      type: "main title",
      content: "Vérification ECDSA",
    },
    {
      type: "title",
      content: "Ce que signifie fournir une signature numérique valide",
    },
    {
      type: "paragraph",
      content: "(bold)Introduction(bold)",
    },
    {
      type: "paragraph",
      content:
        "Nous avons précédemment souligné l'importance des signatures numériques au sein de Bitcoin : elles constituent sans doute la primitive cryptographique la plus fondamentale que vous rencontrerez. Elles sont le mécanisme uniquement responsable de prouver qu'un utilisateur a précédemment reçu une sortie de transaction non dépensée (UTXO) déverrouillable par sa clé publique.",
    },
    {
      type: "paragraph",
      content:
        "Rappelez-vous l'article précédent qui traitait de la (linkpagehttps://www.bitscript.app/lessons/ECDSA%20Generation)Génération ECDSA(linkpage) ; nous y avons expliqué qu'une signature ECDSA est générée à partir d'une clé aléatoire, d'une clé de signature et d'un message, qui dans notre cas est une transaction Bitcoin au format spécifique. Cette signature numérique est ensuite insérée dans le champ sigscript / unlockscript / witness pour une entrée spécifique qui pointe vers une sortie de transaction non dépensée (UTXO) précédemment reçue ; l'idée, bien sûr, est que la signature numérique confirme cryptographiquement le message (le montant de Bitcoin) ainsi que l'identité du signataire (le destinataire). ",
    },
    {
      type: "paragraph",
      content:
        "En bref, nous nous sommes concentrés sur la manière dont la signature est (italics)générée(italics) ; mais, une fois qu'elle est insérée dans le script et traitée par un nœud, comment fonctionne la (italics)(bold)vérification(bold)(italics) ? En d'autres termes, comment Bitcoin lui-même vérifie-t-il qu'une signature numérique est valide ? La magie, comme il s'avère, opère grâce à un opcode très spécifique et courant ; en effet, si vous regardez (italics)la plupart(italics) des sigscripts/unlockscripts d'entrée legacy, vous verrez presque toujours que le dernier opcode d'un pubkeyscript / lockscript est une variante de (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)op_checksig(linkpage) ; qui, fort logiquement, signifie « check signature » (vérifier la signature), un exemple de cela se trouve dans une (linkpagehttps://www.bitscript.app/transactions?transaction=c9d4d95c4706fbd49bdc681d0c246cb6097830d9a4abfa4680117af706a2a5a0&env=MAINNET)transaction P2PKH(linkpage) présentée ci-dessous :",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-1.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Aujourd'hui, c'est là notre objectif : comprendre conceptuellement comment une signature est (italics)vérifiée(italics), ou, en d'autres termes, comment OP_CHECKSIG fonctionne sous le capot. Au lieu de commencer avec une clé aléatoire, une clé de signature et un message pour (italics)générer(italics) une signature, cette fois-ci, chaque fois que nous voulons (italics)vérifier(italics) cryptographiquement un message signé, nous avons également besoin de trois choses : (bold)la signature, la clé publique de signature et le message haché.(bold)",
    },
    {
      type: "paragraph",
      content:
        "Approfondissons un peu ici avant d'introduire la formule principale de vérification, en décomposant les exigences susmentionnées en langage clair :",
    },

    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content:
            "1. La clé *publique* de signature, P, authentifie que (bold)(italics)seul(italics)(bold) le signataire ayant accès à la clé (bold)(italics)privée(italics)(bold) de signature aurait pu générer / signer cette signature",
        },
        {
          type: "numbered-item",
          content:
            "2. Le *message haché*, h(m), vérifie bien sûr que le message réel produit (bold)(italics)exactement le même tableau de 32 octets(italics)(bold) fourni lors de la génération (c'est-à-dire qu'aucun octet n'est altéré dans le montant de Bitcoin transféré)",
        },
        {
          type: "numbered-item",
          content:
            "3. La *signature* (r,s) vérifie que le signataire a connaissance de la clé privée aléatoire (k), qui, bien que jamais entièrement révélée, suggère statistiquement que le signataire était au moins présent lors de la génération",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Toutes ces variables sont utilisées dans la formule de vérification de la signature numérique présentée ci-dessous :",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-2.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Nous avons une idée de ce que signifie chaque variable ci-dessus, voyons maintenant ce que la formule dans son ensemble accomplit exactement. Dans l'article précédent sur la (linkpagehttps://www.bitscript.app/lessons/ECDSA%20Generation)Génération(linkpage), la formule que nous avons présentée résolvait une variable « (bold)s(bold) », qui nous fournissait la (italics)deuxième(italics) et dernière valeur de notre signature (r,s) ; rappelez-vous que « (bold)r(bold) » est simplement la coordonnée x d'une paire de clés publique aléatoire (kG). ",
    },
    {
      type: "paragraph",
      content:
        "Cette fois-ci, lorsque nous vérifions, (bold)(italics)nous tentons de recréer la clé publique aléatoire (kG) pour ensuite comparer la coordonnée x à « r »(italics)(bold) ; si les coordonnées x sont égales, cela signifie que nous avons effectivement recréé la bonne clé publique aléatoire, ce qui n'était (italics)possible(italics) qu'en fournissant la bonne paire de clés de signature, la bonne clé aléatoire et le message haché exact. Afin de vérifier cette signature, nous devrons d'abord calculer l'inverse multiplicatif de « S ».",
    },
    {
      type: "paragraph",
      content: "(italics)Calcul de l'inverse modulaire de « S »(italics)",
    },
    {
      type: "paragraph",
      content:
        "La première chose que vous remarquerez est que la formule de vérification mentionne de manière proéminente l'inverse de « (bold)s(bold) » à deux reprises. Au cas où ce ne serait pas clair, les « r » et « s » vus ci-dessus sont les deux valeurs qui constituent ensemble la « signature » (bien que souvent présentées au format DER, et non comme une paire de scalaires). Comme nous l'avons vu dans l'article sur la Génération, les mathématiques modulaires sur une courbe elliptique sont directes mais en aucun cas « simples ». ",
    },
    {
      type: "paragraph",
      content:
        "Il existe deux formules couramment utilisées et différentes pour calculer l'inverse multiplicatif sur un corps fini premier (c'est-à-dire la (italics)division(italics) modulaire) ; l'une est plus généralisée et existe depuis presque toujours (l'algorithme d'Euclide étendu), tandis que l'autre méthode fonctionne strictement dans le cas où l'opérateur de modulo est (italics)premier(italics). Un résumé de ces deux méthodes est présenté ci-dessous, suivi d'un tableau qui les compare :",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-3.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "L'algorithme d'Euclide étendu (EEA) est une méthode polyvalente qui fonctionne pour (italics)n'importe quels(italics) deux entiers et n'importe quel module ((italics)y compris non premiers(italics)). Comme son nom l'indique, c'est un ancien processus étape par étape qui trouve le plus grand commun diviseur (PGCD) de deux nombres et calcule simultanément les coefficients qui expriment le PGCD comme une combinaison linéaire des nombres d'origine. Dans le contexte de la recherche de l'inverse de « S » pour les signatures numériques, l'EEA peut être utilisé quel que soit le module (premier ou non), mais il peut devenir extrêmement coûteux en calcul pour les grands nombres (ce qui le rend peu pratique pour la plupart des opérations sur les courbes elliptiques).",
    },
    {
      type: "paragraph",
      content:
        "D'autre part, le petit théorème de Fermat offre une solution plus rapide et plus simple que l'EEA, mais il comporte des limites. Il fonctionne (italics)(bold)uniquement(bold)(italics) sous des conditions spécifiques, telles que le module (m) doit être un nombre premier, et le nombre de base (s) et le module (m) doivent être premiers entre eux (ne partager aucun facteur commun autre que 1). Si ces conditions sont remplies, le petit théorème de Fermat énonce qu'élever « (bold)s(bold) » à la puissance m-1 et prendre le modulo de m donnera 1, ce qui nous permet de calculer efficacement l'inverse de « s » modulo m. Cependant, si les conditions ne sont pas remplies, cette méthode ne peut pas être utilisée. Puisque toutes les mathématiques effectuées dans une signature ECDSA Bitcoin sont réalisées sur la courbe secp256k1, nous savons que nous pouvons utiliser le petit théorème de Fermat en toute sécurité.",
    },
    {
      type: "paragraph",
      content:
        "Pour plus de clarté sur la manière dont chacun de ces algorithmes est utilisé pour trouver l'inverse multiplicatif à l'aide des mathématiques modulaires, nous publierons prochainement des articles sur chacun de ces algorithmes (algorithme d'Euclide étendu | petit théorème de Fermat).",
    },
    {
      type: "paragraph",
      content: "(italics)Vérification de la signature(italics)",
    },
    {
      type: "paragraph",
      content:
        "En dehors de l'inverse de « s », les variables restantes sont simples et devraient être facilement disponibles. Nous voyons que nous devons fournir une fois de plus le message haché h(m) ; ce qui est logique, car c'est précisément le message dont nous vérifions qu'il a été signé. Nous devons également fournir « r » qui provient simplement de la signature. ",
    },
    {
      type: "paragraph",
      content:
        "Identifier et insérer ces valeurs est simple, malheureusement, exécuter réellement ces opérations est tout sauf simple ; cependant, en supposant que nous insérions et calculions tout correctement, nous compléterions notre formule de vérification, qui, encore une fois, nous fournit (italics)une certaine clé publique(italics). Cette clé publique est censée être la (bold)(italics)clé publique aléatoire(italics)(bold) (kG) que nous avons utilisée pendant la phase de génération. (italics)« Vérifier » signifie simplement contrôler si la coordonnée x de cette clé publique dérivée correspond au « r » trouvé dans la signature fournie(italics). (bold)Si c'est le cas, alors la signature numérique est considérée comme vérifiée(bold).",
    },
    {
      type: "paragraph",
      content:
        "(italics)Mais qu'est-ce que cela a à voir avec Bitcoin, déjà ?(italics)",
    },
    {
      type: "paragraph",
      content:
        "Excellente question. Pour relier le tout, il peut être utile d'énoncer le vocabulaire Bitcoin courant et de le reformuler avec des affirmations apparemment obtuses mais techniquement plus exactes :",
    },
    {
      type: "paragraph",
      content: "(italics)de(italics)",
    },
    {
      type: "paragraph",
      content: "« Recevoir des bitcoins, c'est transférer d'un portefeuille à un autre »",
    },
    {
      type: "paragraph",
      content: "(italics)à(italics)",
    },
    {
      type: "paragraph",
      content:
        "« Recevoir des bitcoins signifie qu'un UTXO est généré avec un montant fixe de sats et un verrou cryptographique qui (généralement) inclut une clé publique hachée »",
    },
    {
      type: "paragraph",
      content: "(italics)de(italics)",
    },
    {
      type: "paragraph",
      content:
        "« Dépenser des bitcoins reçus signifie transférer d'un portefeuille à un autre »",
    },
    {
      type: "paragraph",
      content: "(italics)à(italics)",
    },
    {
      type: "paragraph",
      content:
        "« Dépenser des bitcoins reçus signifie fournir une signature numérique vérifiable avec la paire de clés dont la clé publique correspond à la clé publique hachée trouvée dans le pubkeyscript/lockscript »",
    },
    {
      type: "paragraph",
      content:
        "Pour des raisons évidentes, la nuance ci-dessus est généralement passée sous silence lorsque les gens discutent des mécanismes de Bitcoin ; mais, espérons-le, avec les exemples ci-dessus, les détails commencent à s'éclaircir. Pour que des transactions correctement formatées et confirmées puissent être dépensées, une signature numérique est requise de la part du dépenseur prévu — c'est parfois pourquoi les gens font référence à la dépense de bitcoins comme à la (italics)signature(italics) de l'UTXO. Car, en bref, afin de dépenser une sortie de transaction non dépensée, vous devez prouver cryptographiquement que vous êtes le destinataire prévu.",
    },
    {
      type: "paragraph",
      content:
        "Comment prouvez-vous cela ? En fournissant une signature numérique qui confirme effectivement le message (le montant de Bitcoin dépensable dans l'UTXO) ainsi que le signataire (la clé publique correspond à la clé publique hachée trouvée dans le sigscript/lockscript de l'UTXO).",
    },
    {
      type: "paragraph",
      content:
        "Pour ceux qui ont l'esprit mathématique et qui aspirent à comprendre le (italics)pourquoi(italics), nous pouvons voir ci-dessous qu'en effectuant simplement de l'algèbre élémentaire, nous pouvons partir de la formule de génération trouvée dans l'article sur la Génération ECDSA et de la formule de vérification ECDSA présentée ici pour aboutir à la formule d'une clé publique sur une courbe elliptique (P = eG) :",
    },
    {
      type: "image",
      src: "/articles/ECDSA Verification/Verification-4.png",
      alt: "Transaction Inputs",
    },
    {
      type: "paragraph",
      content:
        "Et cela conclut notre parcours d'apprentissage des bases mêmes du processus de signature ECDSA legacy. Alors qu'auparavant nous avions exploré comment une signature est générée, cette fois-ci nous avons relié la manière dont la signature est finalement vérifiée on-chain ; plus précisément, nous avons jeté un coup d'œil sous le capot de l'opcode legacy le plus courant, op_checksig, pour comprendre comment une signature numérique est l'élément clé de la dépense d'une sortie de transaction non dépensée (UTXO) Bitcoin. ",
    },
  ],
};

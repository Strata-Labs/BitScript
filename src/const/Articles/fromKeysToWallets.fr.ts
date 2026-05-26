import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { FromKeysToWallets as English } from "./fromKeysToWallets";

// French translation of FromKeysToWallets.
//
// Pattern: spread the English article, then override the translated fields.
// Keep `module`, `section`, `href`, `shortHandTitle`, `lesson`, `itemType`,
// `isLocked`, `published`, `googleLinkBigScreen`, and `googleLinkSmallScreen`
// identical to the English version (inherited via the spread) so URLs and
// page structure stay stable across locales.

export const FromKeysToWalletsFr: ArticleViewProps = {
  ...English,
  title: "Des clés aux portefeuilles",
  description: "Fondements et histoire des paires de clés Bitcoin",
  content: [
    {
      type: "main title",
      content: "Des clés aux portefeuilles",
    },
    {
      type: "subtitle",
      content: "Fondements et histoire des paires de clés Bitcoin",
    },
    {
      type: "title",
      content: "(bold)Introduction(bold)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        "Dans l'(linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))article précédent(linkpage), vous avez découvert les (bold)paires de clés(bold) — comment une clé privée fonctionne comme un mot de passe bancaire et une clé publique comme un numéro de compte bancaire. Aujourd'hui, nous allons approfondir ce concept en abordant le point d'entrée le plus courant pour envoyer et recevoir des bitcoins : les (bold) portefeuilles (bold). Comme vous l'avez sans doute remarqué dans la vie réelle, vous n'envoyez (presque) jamais une clé publique de 33 octets lorsque vous souhaitez recevoir des bitcoins ; vous envoyez généralement une adresse, et plus précisément une adresse de portefeuille.",
    },

    {
      type: "image",
      src: "/articles/from keys to wallets/key-schema.png",
      alt: "Key Schema",
    },
    {
      type: "paragraph",
      content:
        "La clé privée (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))génère(linkpage) la clé publique, qui à son tour génère (bold)un type(bold) de portefeuille. Quel type de portefeuille ? Eh bien, c'est précisément ce sur quoi nous allons nous concentrer aujourd'hui. Malheureusement, ce n'est pas un sujet simple, comme le laisse entendre le déluge de jargon : legacy, segwit, taproot, p2pk, p2pkh, p2wpkh, p2sh, et ainsi de suite. Nous allons d'abord apporter un peu de contexte à ces termes fréquemment entendus et souvent confondus, puis nous plongerons plus en détail dans les formats de portefeuille courants.",
    },
    {
      type: "paragraph",
      content:
        "Comprendre les types de portefeuilles peut sembler assez intimidant au premier abord, mais en réalité, à une exception près, ils peuvent être catégorisés à l'aide de deux questions de haut niveau :",
    },
    {
      type: "list",
      content: [
        {
          type: "numbered-item",
          content: "(bold)1.  Où sont stockées les données de signature ?(bold)",
        },
        {
          type: "numbered-item",
          content: "(bold)2.  Qu'est-ce qui est requis pour dépenser l'UTXO ?(bold)",
        },
      ],
    },
    {
      type: "title",
      content: "(italics) Legacy vs. Witness(italics)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        'Sujet qui mériterait un article à part entière, l\'emplacement des données de signature catégorise les transactions, et donc les adresses de portefeuille, en deux catégories : legacy et witness. Dans les portefeuilles legacy, les données qui déverrouillent un UTXO sont communément appelées (bold)ScriptSig(bold) (abréviation de signature script) et résident dans la partie (linkpagehttps://bitscript.app/lessons/What%20is%20a%20ScriptSig%3F)entrée (linkpage) d\'une transaction. Dans les portefeuilles SegWit, les données qui déverrouillent un UTXO sont communément appelées (linkpagehttps://bitscript.app/lessons/What%20is%20a%20Witness%3F) Witness (linkpage) (un terme courant en cryptographie) et résident dans une partie (bold)ségrégée (bold)de la transaction (d\'où l\'abréviation "SegWit" pour Segregated Witness).',
    },
    {
      type: "paragraph",
      content:
        "Les ScriptSigs et les Witnesses visent tous deux à déverrouiller un UTXO pour envoyer des bitcoins, mais l'encodage et, plus important encore, l'emplacement de stockage des données diffèrent, ce qui conduit à des types de portefeuilles différents.",
    },
    {
      type: "title",
      content: "(italics)Key vs. Script(italics)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        "Un second axe de catégorisation des types de portefeuille existe selon la (bold)logique(bold) requise dans les witnesses ou les scriptSigs. À un haut niveau, pour (linkpagehttps://bitscript.app/lessons/What%20is%20a%20ScriptSig%3F)dépenser un UTXO(linkpage), on peut avoir ou non à fournir un contexte ou des données supplémentaires pour le déverrouiller. Comme on le mentionne souvent, Bitcoin possède effectivement une certaine forme de contrats intelligents sous la forme de Script, un langage de pile de type assembleur utilisé pour implémenter la logique de dépense.",
    },
    {
      type: "paragraph",
      content:
        "[Carte à deux axes des types de transaction ici pour résumer cette section]",
    },
    {
      type: "title",
      content: "(bold)Les clés créent les portefeuilles(bold)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        "Comme vous l'avez vu dans une (linkpagehttps://www.bitscript.app/lessons/generating-a-taproot-pubkey-pt-i)leçon précédente(linkpage), les portefeuilles Bitcoin reposent sur la (bold)cryptographie à courbe elliptique(bold), plus précisément la courbe (linkpagehttps://www.bitscript.app/lessons/ECDSA%20DER%20Format)secp256k1(linkpage), qui génère une paire de clés cryptographiques : la clé privée et la clé publique. Vous savez déjà que la clé privée est un entier de 32 octets, généré aléatoirement, qui vous permet de signer des transactions et d'envoyer des bitcoins. La clé publique compressée de 33 octets est ensuite dérivée en multipliant la clé privée par un point générateur ((bold)G(bold)) ; c'est cette clé, la clé publique, que nous utiliserons ensuite pour générer différents types de portefeuilles afin de répondre à différents types de transactions.",
    },
    {
      type: "paragraph",
      content:
        "Nous allons maintenant passer en revue en détail les types de portefeuille les plus couramment utilisés, en commençant par le plus ancien chronologiquement et le plus simple techniquement, puis en remontant jusqu'aux types de portefeuille modernes.",
    },
    {
      type: "title",
      content: "(bold)Legacy(bold)",
      customClass: "mb-4",
    },
    {
      type: "paragraph",
      content:
        'Comme annoncé ci-dessus et comme le suggère le nom, les adresses "Legacy" comprennent les premiers formats d\'adresse qui étaient soit livrés avec Bitcoin Core, soit ajoutés assez rapidement ; cela inclut les types de transaction (bold)P2PK(bold), (bold)P2PKH(bold) et (bold)P2SH(bold).',
    },
    {
      type: "title",
      content: "(bold)P2PK (Pay-to-Public-Key)(bold)",
      customClass: "mb-3",
    },
    // was here
    {
      type: "paragraph",
      content:
        "Le (linkpagehttps://www.bitscript.app/scripts/P2PK)type le plus simple et le plus ancien(linkpage) de transaction et donc de portefeuille, un P2PK expose directement la clé publique dans les transactions, ce qui le rend moins confidentiel et moins efficace en raison de sa taille plus importante. Dans ce schéma, la clé publique est directement stockée dans le script de sortie de la transaction, généralement à l'aide d'un opcode comme (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)OP_CHECKSIG(linkpage). C'est moins confidentiel car la clé publique complète est exposée à la blockchain avant d'être dépensée. C'est également moins efficace en termes d'espace car la clé publique fait généralement 65 octets (sous forme non compressée) ou 33 octets (sous forme compressée). Un exemple de 2010 est (linkpagehttps://mempool.space/address/04cd31654088e472c60ab1c6ee7743deb186dce0b1ad5fc45691d37dad2620128e4b33c7c9c19ed01a5817e6e54c12fe1b83eafcb830440f23a2ce903cdb1df52f)04cd31654088e472c60ab1c6ee7743deb186dce0b1ad5fc45691d37dad2620128e4b33\
        c7c9c19ed01a5817e6e54c12fe1b83eafcb830440f23a2ce903cdb1df52f(linkpage).",
    },
    {
      type: "title",
      content: "(bold)P2PKH (Pay-to-Public-Key-Hash)(bold)",
      customClass: "mb-3",
    },
    {
      type: "paragraph",
      content:
        "P2PKH améliore les limites de P2PK en stockant un hash de la clé publique — et non la clé elle-même — dans le script de sortie de la transaction. Ce n'est que lorsque la transaction est dépensée que la clé publique réelle est révélée. Cela réduit non seulement la taille de la transaction et améliore la confidentialité, mais offre également une couche de sécurité supplémentaire, car casser une fonction de hachage est plus difficile que simplement lire une clé publique. Les (linkpagehttps://www.bitscript.app/scripts/P2PKH)scripts P2PKH(linkpage) utilisent généralement un motif d'opcodes comme (linkpagehttps://www.bitscript.app/OPS/OP_DUP)OP_DUP(linkpage) (linkpagehttps://www.bitscript.app/OPS/OP_HASH160)OP_HASH160(linkpage) (keys)&lt;PubKeyHash&gt(keys) (linkpagehttps://www.bitscript.app/OPS/OP_EQUALVERIFY)OP_EQUALVERIFY(linkpage) (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)OP_CHECKSIG(linkpage). Les adresses commencent par (bold)'1'(bold), par exemple (linkpagehttps://mempool.space/address/18BZyzJtETfcPzKFoHRT1dawziE4yUh96X)18BZyzJtETfcPzKFoHRT1dawziE4yUh96X.(linkpage)",
    },
    {
      type: "paragraph",
      content: "Pour générer une adresse P2PKH, suivez ces étapes :",
    },
    {
      type: "list",
      //TODO: Make the text to be green for the public, currently all the text here is in bold for the public keys
      // TODO: add spacing for list items
      content: [
        {
          type: "numbered-item",
          content:
            "1.(bold) Générer la clé publique : (bold) Créez votre clé publique non compressée de 65 octets (keys)04b0bd634234abbb1ba1e986e884185c1b9e5d3a34e0dfee38c4474a49ca3bf22\
            162c6e55773ce8d9f0b60e5a8b9c56d5b5efc96e2384f7c9d33c1e7e4109db9e7(keys).",
        },
        {
          type: "numbered-item",
          content:
            "2 (bold) Calculer le hash (linkpagehttps://www.bitscript.app/hashCalculator)SHA256(linkpage) (bold) : Hachez cette clé publique avec SHA256 (keys)SHA256(04b0bd634234abbb1ba1e986e884185c1b9e5d3a34e0dfee38c447\
            4a49ca3bf22162c6e55773ce8d9f0b60e5a8b9c56d5b5efc96e2384f7c9d33c1e7e4109db9e7)(keys) = (keys)44f8c0d9503a31cf59bc70c070dea3bfc2bd717bc8481f8980c9dc516a662a59(keys)",
        },
        {
          type: "numbered-item",
          content:
            "3. (bold) Calculer le hash (linkpagehttps://www.bitscript.app/hashCalculator) RIPEMD160 (linkpage) (bold) : Hachez le résultat avec RIPEMD160 pour obtenir un hash de 20 octets (keys)RIPEMD160(44f8c0d9503a31cf59bc\
            70c070dea3bfc2bd717bc8481f8980c9dc516a662a59)(keys) = (keys)010966776006953D5567439E5E39F86A0D273BEE(keys)",
        },
        {
          type: "numbered-item",
          content:
            " 4. (bold) Ajouter l'octet de version (bold) : Préfixez l'octet de version 0x00 pour une adresse Bitcoin mainnet : (keys)00 + 010966776006953D5567439E5E39F86A0D273BEE = 00010966776006953D5567439E5E39F86A0D273BEE (keys)",
        },
        {
          type: "numbered-item",
          content:
            "5. (bold) Calculer la somme de contrôle (bold) : Calculez la somme de contrôle en prenant les 4 premiers octets du double hash SHA-256 du hash versionné (keys)SHA256(SHA256(00010966776006953D5567439E5E39F86A0D273BEE))(keys) = (keys)FFD1F1D25C63F3C7815D05CBFABE62E8CC5875C9DDFE95B9C60F243BEEB72F5D(keys)",
        },
        {
          type: "paragraph",
          content:
            "La somme de contrôle correspond aux 4 premiers octets : (keys)FF D1 F1 D2(keys) (chaque paire hexadécimale représente 1 octet).",
        },
        {
          type: "numbered-item",
          content:
            "6. (bold) Encoder en Base58Check (bold) : Enfin, encodez le PubKeyHash versionné concaténé avec la somme de contrôle en Base58Check : (keys)00010966776006953D5567439E5E39F86A0D273BEEFFD1F1D2(keys).",
        },
        {
          type: "paragraph",
          content:
            "Une fois encodé en Base58Check, cela devient l'adresse P2PKH : (keys)16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM(keys)",
        },
      ],
    },
    {
      type: "paragraph",
      content: "(bold)P2SH (Pay-to-Script-Hash)(bold)",
    },
    {
      type: "paragraph",
      content:
        "P2SH, défini dans (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)BIP16(linkpage), permet des (linkpagehttps://www.bitscript.app/scripts/P2SH)scripts de transaction plus flexibles(linkpage) en autorisant l'envoi de fonds vers le hash d'un script, appelé redeem script, plutôt que directement vers un hash de clé publique comme nous l'avons vu avec P2PKH. Cette fonctionnalité rend Bitcoin plus polyvalent car elle prend en charge des conditions de dépense plus complexes telles que le multisig, les verrous temporels, ou toute condition arbitraire pouvant être définie dans le script. Les adresses P2SH commencent par (bold)'3'(bold), comme (linkpagehttps://mempool.space/address/3CswTd6V8V2uv24P9yWHpPnFiLfN4CABgW)3CswTd6V8V2uv24P9yWHpPnFiLfN4CABgW(linkpage).",
    },
    {
      type: "title",
      content: "SegWit",
      customClass: "font-bold mb-4",
      variant: "large",
    },
    {
      type: "paragraph",
      content:
        "SegWit, abréviation de (bold)Segregated Witness(bold), introduit dans (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)BIP141(linkpage), était une mise à niveau majeure visant à réduire la taille des transactions et à augmenter la scalabilité. SegWit fonctionne en déplaçant les données de witness — signatures et autres données spécifiques à la transaction — en dehors du bloc principal, permettant à davantage de transactions de tenir dans un bloc.",
    },
    {
      type: "title",
      content: "P2WPKH (Pay-to-Witness-Public-Key-Hash)",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "P2WPKH est un format SegWit natif (désigné comme (italics)(bold)SegWit v0(bold)(italics)) avec des adresses (bold)bech32(bold). Ces adresses utilisent une partie lisible par l'humain, qui pour Bitcoin est (keys)bc(keys), suivie du séparateur (keys)1(keys) puis de la partie données qui comprend la version du witness ((italics)v0 pour P2WPKH(italics)) et le hash de clé publique de 20 octets.",
    },
    {
      type: "paragraph",
      content:
        "Les adresses P2WPKH sont dérivées de manière similaire aux adresses P2PKH. Le hash résultant est ensuite encodé au format (bold)bech32(bold), qui diffère du (bold)Base58Check(bold) que nous avons vu dans P2PKH. Le script utilisé pour verrouiller les fonds intégré dans le script de sortie, appelé witness program dans SegWit (équivalent du (italics)scriptPubKey(italics) dans P2PKH), est également différent de P2PKH :",
    },
    {
      type: "list",
      content: [
        {
          type: "bullet-item",
          content:
            "Dans P2PKH, le script de verrouillage suit le format : (linkpagehttps://www.bitscript.app/OPS/OP_DUP)OP_DUP(linkpage) (linkpagehttps://www.bitscript.app/OPS/OP_HASH160)OP_HASH160(linkpage) (keys)&ltPubKeyHash&gt(keys) (linkpagehttps://www.bitscript.app/OPS/OP_EQUALVERIFY)OP_EQUALVERIFY(linkpage) (linkpagehttps://www.bitscript.app/OPS/OP_CHECKSIG)OP_CHECKSIG(linkpage).",
        },
        {
          type: "bullet-item",
          content:
            "Dans P2WPKH, le script du witness program est simplement (keys)0(keys) (keys)&ltPubKeyHash&gt (keys), où (keys)0(keys) représente la version SegWit, suivie du hash de clé publique de 20 octets. Pour Taproot, la version SegWit serait (keys)1(keys) comme nous le verrons juste après.",
        },
      ],
    },
    {
      type: "paragraph",
      content:
        "Dans une transaction P2WPKH, la signature et la clé publique sont stockées dans le champ des données de witness plutôt que dans le corps principal de la transaction. Cette (linkpagehttps://www.bitscript.app/lessons/Formatting%20Witness%20Script)séparation(linkpage) réduit les données non-witness, qui comptent pleinement dans la taille du bloc, et déplace les données de witness plus volumineuses vers la section witness, qui n'est comptée qu'à un poids réduit (1 octet = 1 (bold)unité de poids(bold) au lieu de 4 unités de poids pour les données non-witness). Puisque le script de déverrouillage ou witness n'est pas inclus dans le corps principal de la transaction pour SegWit, la taille de la transaction est considérablement réduite.",
    },
    {
      type: "paragraph",
      content:
        "Les transactions P2WPKH sont plus petites que les transactions legacy P2PKH et même que les transactions P2SH-P2WPKH en raison de l'absence du redeem script dans la section witness, ce qui se traduit par des frais moins élevés :",
    },
    {
      type: "list",
      content: [
        {
          type: "bullet-item",
          content:
            "(bold)Transaction P2PKH : (bold) Une entrée typique nécessite 148 octets.",
        },
        {
          type: "bullet-item",
          content:
            "(bold)Transaction P2WPKH : (bold) L'entrée équivalente ne nécessite qu'environ 68 octets dans un bloc, soit une réduction massive d'environ 58 %.",
        },
      ],
    },
    {
      type: "title",
      content:
        "P2SH-P2WPKH (Pay-to-Script-Hash with Pay-to-Witness-Public-Key-Hash)",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "Le (bold)SegWit imbriqué (P2SH-P2WPKH)(bold), également connu sous le nom de (italics)Wrapped SegWit(italics), est rétrocompatible et vous permet de profiter de SegWit même si vous utilisez un portefeuille legacy.",
    },
    {
      type: "paragraph",
      content:
        'Les portefeuilles legacy ne comprennent que les transactions P2SH, c\'est pourquoi le P2WPKH est "enveloppé" à l\'intérieur d\'un script P2SH. L\'adresse commence par un (bold)3(bold), ce qui indique une adresse P2SH. Les portefeuilles legacy peuvent reconnaître ce format et interagir avec lui.',
    },
    {
      type: "paragraph",
      content:
        "Pour les transactions P2SH, le scriptSig contient le (bold)redeem script(bold). Dans ce cas, le redeem script est le (bold)script SegWit(bold), qui contient un hash de la clé publique. Le redeem script dans P2SH-P2WPKH a le format : (keys)0 &ltPubKeyHash&gt (keys). C'est ce qui est placé dans le scriptSig, permettant aux portefeuilles legacy de traiter la transaction comme s'il s'agissait d'une transaction P2SH normale, sans savoir qu'elle implique SegWit.",
    },
    {
      type: "paragraph",
      content:
        "Les données de (linkpagehttps://www.bitscript.app/lessons/Formatting%20Witness%20Script)witness(linkpage) réelles (signature et clé publique) sont stockées dans le champ witness, qui est une partie distincte de la transaction. Les portefeuilles legacy ignorent ces données de witness car ils ne les comprennent pas. Cependant, les nœuds compatibles SegWit les utiliseront pour valider la transaction de manière plus efficace.",
    },
    {
      type: "title",
      content: "P2WSH (Pay-to-Witness-Script-Hash)",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "Le (bold)P2WSH(bold) est la version SegWit de P2SH. Comme P2SH, P2WSH permet des scripts complexes, tels que les configurations multisig et les transactions à verrou temporel, mais avec plus d'efficacité tout en remédiant à la malléabilité des transactions dans les scripts legacy. Les adresses P2WSH commencent par (bold)bc1q(bold) et sont également connues sous le nom d'(bold)adresses Bech32(bold), qui sont plus conviviales avec une meilleure lisibilité et une meilleure détection d'erreurs.",
    },
    {
      type: "paragraph",
      content:
        "Dans P2WSH, le script de verrouillage est haché en utilisant uniquement (linkpagehttps://www.bitscript.app/hashCalculator)SHA256(linkpage), ce qui produit un hash de 32 octets, le rendant plus résistant aux collisions de hash par rapport à P2SH, qui utilise un processus de double hachage ((linkpagehttps://www.bitscript.app/hashCalculator)RIPEMD-160(linkpage) de SHA256) et aboutit à un hash plus petit de 20 octets.",
    },
    {
      type: "paragraph",
      content:
        "Au lieu de placer les données de déverrouillage dans le (linkpagehttps://www.bitscript.app/lessons/Formatting%20Witness%20Script)scriptSig(linkpage) (comme avec les transactions legacy), les transactions P2WSH utilisent le champ witness tout comme P2PKH. Lors de la dépense depuis une adresse P2WSH, le champ witness contient le script (qui correspond au hash SHA256 stocké dans le scriptPubKey) et les données requises pour satisfaire le script (signatures et clés publiques).",
    },
    {
      type: "title",
      content: "P2TR (Pay-to-Taproot)",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "Comprendre (linkpagehttps://www.bitscript.app/lessons/Why%20Taproot)Taproot(linkpage) — également désigné comme SegWit v1 — peut être assez complexe, étant donné la terminologie spécifique telle que \"(linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))clé taproot(linkpage)\" et les nouveaux détails techniques impliqués. À sa base, Taproot, introduit via (linkpagehttps://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)BIP341(linkpage), est une mise à niveau significative du système de transactions de Bitcoin, s'appuyant sur le cadre P2WSH. Il améliore les capacités de script et de signature de Bitcoin grâce à l'intégration des signatures Schnorr et des arbres de syntaxe abstraite merkelisés (MAST). En ce qui concerne les adresses, Taproot utilise un nouveau format commençant par (keys)bc1p(keys), tirant parti de l'encodage Bech32m.",
    },
    {
      type: "paragraph",
      content:
        "Pour décomposer cela : les (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))adresses P2TR(linkpage) et les portefeuilles reposent sur les (bold)signatures Schnorr(bold), un schéma cryptographique plus récent qui permet de combiner ou d'agréger plusieurs signatures en une seule. Cela signifie que les transactions nécessitant plusieurs participants apparaissent désormais comme provenant d'un seul signataire, réduisant leur taille et améliorant l'efficacité. Les signatures Schnorr renforcent également la sécurité en offrant des garanties plus solides que les anciennes signatures ECDSA.",
    },
    {
      type: "paragraph",
      content:
        "De plus, Taproot intègre (bold)MAST(bold), qui (linkpagehttps://www.bitscript.app/lessons/Why%20Taproot)structure les scripts complexes(linkpage) à l'aide d'une forme spéciale de structure de données, l'(linkpagehttps://www.bitscript.app/lessons/Merkle%20Tree%20Review) arbre de Merkle (linkpage). Cette organisation permet de ne révéler que les parties pertinentes d'un script Taproot lors de la dépense — un scriptPath — plutôt que d'exposer le script entier. Cette fonctionnalité renforce considérablement la confidentialité et l'efficacité en gardant les détails des conditions de dépense complexes d'un (linkpagehttps://www.bitscript.app/lessons/Generating%20A%20Taproot%20PubKey%20(Pt.%20I))TapLeaf(linkpage) cachés sauf si nécessaire.",
    },
    {
      type: "title",
      content: "En conclusion",
      customClass: "mb-4 font-bold",
    },
    {
      type: "paragraph",
      content:
        "Et voilà qui conclut ! Les portefeuilles Bitcoin ont évolué de simples formats legacy vers des types de script plus complexes comme (italics)SegWit(italics) et (italics)Taproot(italics). Les portefeuilles legacy utilisaient directement les clés publiques, tandis que (italics)SegWit(italics) a amélioré l'efficacité en séparant les données de witness. Le SegWit imbriqué a maintenu la compatibilité avec les portefeuilles plus anciens en intégrant SegWit dans des scripts P2SH, et désormais (italics)P2WSH(italics) a amélioré l'efficacité des scripts complexes tandis que Taproot a combiné les signatures Schnorr et MAST pour une confidentialité et une efficacité encore meilleures. Il convient de noter que malgré la variété des formats de clés et des encodages parmi ces types de portefeuille, ils dérivent tous en définitive de la même (bold)seed(bold). Nous explorerons comment cette seed est (italics)(bold)sauvegardée(bold)(italics) dans notre prochain article.",
    },

    // ... Continue with the rest of the content, following the same structure
  ],
};

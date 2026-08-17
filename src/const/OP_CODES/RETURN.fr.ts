import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_RETURN as English } from "./RETURN";

export const OP_RETURNFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Contrôle de flux",
  type: "Contrôle de script",
  shortDescription:
    "Marque la transaction comme invalide et renvoie les octets restants comme message d'erreur.",
  longDescription:
    "OP_RETURN est un opcode utilisé pour marquer une sortie de transaction comme non dépensable. Il permet d'inclure une petite quantité de données dans une transaction, qui est définitivement enregistrée sur la blockchain. Cet opcode interrompt immédiatement l'exécution du script et marque la sortie comme invalide, garantissant qu'elle ne pourra plus être utilisée pour d'autres transactions. Il est largement utilisé pour intégrer des données arbitraires dans la blockchain (horodatages, messages simples) sans gonfler l'ensemble des UTXO.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Marque la transaction comme invalide et renvoie les octets restants du script comme message d'erreur.",
    steps: [
      "Échec du script",
      "Les octets restants sont renvoyés comme message d'erreur",
    ],
  },
};

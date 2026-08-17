import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import English from "./CHECK_LOCK_TIME";

export const OP_CHECKLOCKTIMEVERIFYFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Verrouillage temporel",
  type: "Empile",
  shortDescription:
    "Empêche la dépense d'un UTXO avant une hauteur de bloc absolue ou un horodatage donné.",
  longDescription:
    "Empêche la dépense d'un UTXO jusqu'à ce qu'une hauteur de bloc donnée soit atteinte ou qu'un instant précis soit passé. Aussi appelé CLTV, cet opcode définit un mécanisme de timelock absolu ; contrairement à checksequenceverify (CSV), il impose que l'UTXO reste verrouillé jusqu'à une hauteur de bloc *absolue* ou un timestamp Unix précis. Lorsque la valeur en entrée est inférieure à 500 000 000, elle représente une hauteur de bloc ; sinon, elle représente un timestamp Unix. Cela permet de construire des contrats comme les canaux de paiement Lightning ou les échanges atomiques, où des conditions doivent être remplies après un certain délai. Pour que l'opération réussisse, la valeur du haut de la pile doit être inférieure ou égale au champ `nLockTime` de la transaction, et supérieure ou égale à la hauteur de bloc ou au timestamp courant.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Empêche la dépense d'un UTXO avant une hauteur de bloc absolue ou un horodatage donné.",
    steps: [
      "Dépile l'élément du haut (valeur du locktime)",
      "Détermine s'il s'agit d'une hauteur de bloc ou d'un timestamp Unix selon la valeur",
      "Compare au nLockTime de la transaction",
      "Vérifie la transaction selon le résultat booléen (échec ou poursuite)",
    ],
  },
};

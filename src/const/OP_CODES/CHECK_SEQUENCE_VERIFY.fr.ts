import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import English from "./CHECK_SEQUENCE_VERIFY";

export const OP_CHECK_SEQUENCE_VERIFYFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Verrouillage temporel",
  type: "Vérifie",
  shortDescription:
    "Empêche la dépense d'un UTXO pendant un nombre relatif de blocs ou une durée depuis sa confirmation.",
  longDescription:
    "Empêche la dépense d'un UTXO pendant un nombre précis de blocs après sa confirmation, ou pendant une durée donnée après son inclusion dans un bloc. Aussi appelé CSV, cet opcode définit un mécanisme de timelock *relatif* ; contrairement à checklocktimeverify (CLTV), il verrouille l'UTXO en fonction de l'âge ou de la durée écoulée depuis sa confirmation, plutôt qu'un point fixe de la timeline Bitcoin. Lorsque la valeur en entrée est inférieure à 500 000 000, elle représente une hauteur de bloc relative ; sinon, elle représente une durée relative en secondes. C'est particulièrement précieux pour des protocoles comme Lightning, qui s'appuient sur des timelocks relatifs pour imposer des conditions de pénalité. Pour que l'opération réussisse, la valeur du champ sequence de l'entrée de la transaction doit être désactivée ou, si elle est activée, être inférieure ou égale à la valeur sequence du script et supérieure ou égale au minimum fondé sur la version.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description:
      "Empêche la dépense d'un UTXO pendant un nombre relatif de blocs ou une durée depuis sa confirmation.",
    steps: [
      "Dépile l'élément du haut (valeur de timelock relatif)",
      "Détermine s'il s'agit d'une hauteur de bloc ou d'un timestamp Unix selon la valeur",
      "Compare la valeur au champ sequence de l'entrée dépensée",
      "Vérifie la transaction selon le résultat booléen (échec ou poursuite)",
    ],
  },
};

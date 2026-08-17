import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_PUSHDATA as English } from "./PUSH_DATA";

export const OP_PUSHDATAFr: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Données",
  type: "Empile",
  shortDescription: "Empile des données arbitraires sur la pile.",
  longDescription:
    "OP_PUSHDATA est un opcode générique servant à empiler des données arbitraires sur la pile. Il permet d'ajouter à la pile d'exécution des données de longueur variable. La longueur des données est déterminée par les octets de longueur qui suivent l'opcode. Cet opcode est polyvalent et sert à travailler avec différents types de données, notamment des clés publiques, des signatures et des données personnalisées.",
  visualProps: {
    ...English.visualProps,
    title: "Démonstration de l'OP_Code",
    description: "Empile des données arbitraires sur la pile.",
    steps: [
      "Analyse la longueur des données",
      "Extrait les données",
      "Empile les données sur la pile",
    ],
  },
};

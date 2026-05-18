import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "combinepsbt")!;

export const combinepsbtFr: RPCFunctionParams = {
  ...English,
  category: "Transactions brutes",
  summary:
    "Combine plusieurs PSBT pour la même transaction en un seul.",
  description:
    "Fusionne plusieurs versions d'un PSBT signées par différents participants.",
  howIsThisUsed:
    "Un groupe d'amis travaille à construire une maquette d'avion. Chacun a des pièces et des outils différents nécessaires au projet. La commande « combinepsbt » revient à rassembler toutes ces pièces venant de chacun et à les assembler en une maquette complète. Dans Bitcoin, une transaction peut nécessiter des entrées (signatures ou approbations) de plusieurs parties avant d'être complète. « combinepsbt » prend ces pièces séparées — des transactions partiellement signées par différentes personnes — et les fusionne en une seule transaction prête à être finalisée et envoyée.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Tableau de PSBT (en base64) à combiner.",
    },
  ],
};

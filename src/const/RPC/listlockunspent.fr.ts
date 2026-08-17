import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listlockunspent")!;

export const listlockunspentFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Liste les sorties non dépensées temporairement verrouillées par le portefeuille.",
  description:
    "Affiche les UTXO marqués comme verrouillés pour éviter leur sélection automatique.",
  howIsThisUsed:
    "Sert à voir la liste des sorties temporairement verrouillées pour éviter qu'elles soient dépensées. Particulièrement utile quand on gère des transactions et qu'on veut garantir que certaines sorties restent non dépensées dans un but précis. Permet de surveiller et contrôler le verrouillage et le déverrouillage des transactions au besoin.",
};

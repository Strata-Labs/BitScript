import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "abortrescan")!;

export const abortrescanFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Arrête le rescan en cours du portefeuille à la recherche de transactions.",
  description:
    "Cette commande RPC sert à interrompre une opération de rescan en cours dans le portefeuille.",
  howIsThisUsed:
    "Votre ordinateur tourne à plein régime, en train d'analyser chaque transaction de votre portefeuille Bitcoin, et vous changez d'avis ? Tout comme on peut décider à mi-chemin qu'organiser ses photos numériques est trop fastidieux, la commande « abortrescan » offre une porte de sortie. Lorsqu'un rescan du portefeuille — qui vérifie l'historique des transactions — devient inutile, trop long ou démarre par accident, « abortrescan » prend le relais. Cette commande arrête instantanément le rescan, libère votre portefeuille (et votre patience) de l'attente et permet d'utiliser le portefeuille immédiatement tout en économisant temps et ressources.",
};

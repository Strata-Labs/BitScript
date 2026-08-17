import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "clearbanned")!;

export const clearbannedFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Efface la liste des pairs bannis.",
  description:
    "Réinitialise la liste des bannissements maintenue par le nœud.",
  howIsThisUsed:
    "Imaginez recevoir chez vous et avoir décidé d'écarter certains invités à cause de malentendus. Une fois ces différends résolus, vous voulez les accueillir à nouveau. La commande « clearbanned » dans Bitcoin fait à peu près la même chose pour vos connexions réseau. C'est comme ouvrir grand vos portes après avoir réalisé qu'on avait écarté à tort certains invités. Cette commande retire tous les blocages que vous aviez posés sur certaines adresses IP ou sous-réseaux, leur permettant de se reconnecter à votre nœud.",
};

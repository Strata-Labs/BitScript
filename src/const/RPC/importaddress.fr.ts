import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importaddress")!;

export const importaddressFr: RPCFunctionParams = {
  ...English,
  category: "Portefeuille",
  summary:
    "Ajoute une adresse ou un script (en hex) qui peut être suivi sans clé privée.",
  description:
    "Importe une adresse en watch-only dans le portefeuille pour suivre ses transactions.",
  howIsThisUsed:
    "Utile pour surveiller des adresses ou scripts externes dans le portefeuille, en donnant de la visibilité sur leurs transactions et soldes sans en contrôler les fonds. Couramment utilisé pour suivre des adresses de stockage à froid, des exchanges ou d'autres services externes.",
  inputs: [
    {
      ...English.inputs[0],
      description: "L'adresse ou le script en hex à importer.",
    },
    {
      ...English.inputs[1],
      description: "Un label optionnel à associer à l'adresse.",
    },
    {
      ...English.inputs[2],
      description: "Si vrai, rescanne la blockchain pour les transactions de cette adresse.",
    },
    {
      ...English.inputs[3],
      description: "Si vrai, considère l'argument comme un P2SH wrappant le script.",
    },
  ],
};

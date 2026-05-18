import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getdescriptorinfo")!;

export const getdescriptorinfoFr: RPCFunctionParams = {
  ...English,
  category: "Utilitaires",
  summary:
    "Renvoie des informations sur un descripteur (checksum, etc.).",
  description:
    "Analyse un descripteur et renvoie son checksum, sa solvabilité et sa forme normalisée.",
  howIsThisUsed:
    "Imaginez un linguiste qui décode un script ancien. Vous disposez d'un outil qui non seulement traduit le script dans votre langue, mais fournit aussi du contexte sur son usage, ses origines et ses variantes. Dans Bitcoin, la commande « getdescriptorinfo » joue ce rôle pour les « descripteurs », des formats compacts et expressifs qui décrivent en détail comment les adresses Bitcoin sont générées à partir de scripts. Cette commande analyse un descripteur donné et renvoie des informations complètes, dont son checksum (pour vérification), son type (P2PKH, P2SH, etc.) et l'adresse ou le script obtenus. Précieux pour les développeurs et utilisateurs qui gèrent des fonctionnalités avancées de portefeuille, garantissant exactitude et efficacité dans les transactions et la génération d'adresses.",
};

import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getdescriptorinfo")!;

export const getdescriptorinfoEs: RPCFunctionParams = {
  ...English,
  category: "Utilidades",
  summary:
    "Devuelve información sobre un descriptor (checksum, etc.).",
  description:
    "Analiza un descriptor y devuelve su checksum, su solvencia y su forma normalizada.",
  howIsThisUsed:
    "Imagina a un lingüista que descifra una escritura antigua. Tiene una herramienta que no solo traduce la escritura a su idioma, sino que también aporta contexto sobre su uso, sus orígenes y sus variantes. En Bitcoin, el comando «getdescriptorinfo» desempeña ese papel para los «descriptores», formatos compactos y expresivos que describen en detalle cómo se generan las direcciones de Bitcoin a partir de scripts. Este comando analiza un descriptor dado y devuelve información completa, incluido su checksum (para verificación), su tipo (P2PKH, P2SH, etc.) y la dirección o el script resultantes. Resulta valioso para desarrolladores y usuarios que gestionan funcionalidades avanzadas de wallet, garantizando exactitud y eficiencia en las transacciones y en la generación de direcciones.",
};

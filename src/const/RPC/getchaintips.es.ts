import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getchaintips")!;

export const getchaintipsEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Lista las puntas de las ramas conocidas de la cadena.",
  description:
    "Devuelve todas las puntas (tips) de la blockchain, incluidas las ramas menores.",
  howIsThisUsed:
    "Imagina explorar un bosque con múltiples senderos que se ramifican en distintas direcciones. Algunos confluyen con el sendero principal, otros son callejones sin salida o senderos poco transitados que se cubren de maleza. En la blockchain de Bitcoin, el comando «getchaintips» ayuda a comprender la topografía de ese bosque mostrando todas las «puntas» conocidas del árbol de bloques: el camino principal (la blockchain activa) así como todos los caminos secundarios (ramas huérfanas y forks) surgidos a lo largo del tiempo. Cada punta se describe por su altura (longitud del camino), su hash (identificador único), la longitud de la rama que la conecta con la cadena principal y su estado (camino activo, fork válido no elegido, o camino inválido).",
};

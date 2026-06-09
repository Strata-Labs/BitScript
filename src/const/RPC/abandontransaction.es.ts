import { PARAMETER_TYPE, RPC_METHODS, RPCFunctionParams } from "../RPC";

// Spanish translation of `abandontransaction`.
//
// Pattern: look up the English record from RPC_METHODS, spread it, then
// override only the fields you've translated. Anything you don't override
// stays English — so you can ship an RPC translation in stages.
//
// Keep `method`, `linkPath`, `callable`, each input's `method` (param name),
// `type`, `defaultValue`, and `enumValues` identical to the English version
// so URLs, RPC param wiring, and call payloads stay stable across locales.

const English = RPC_METHODS.find((m) => m.method === "abandontransaction")!;

export const abandontransactionEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Permite a un usuario abandonar una transacción no confirmada de la cartera.",
  description:
    "Este comando se utiliza para marcar una transacción no confirmada como abandonada, retirándola de la lista de transacciones de la cartera.",
  howIsThisUsed:
    "Pocas cosas resultan tan frustrantes como una transacción de Bitcoin atascada sin confirmación. Ha enviado fondos —por un servicio o para devolver dinero a un amigo— y la espera se prolonga de unos minutos a varios días. El problema suele deberse a comisiones demasiado bajas, lo que lleva a los mineros a ignorar su transacción. El comando «abandontransaction» es la solución para recuperar esos fondos. La inmutabilidad de la blockchain impide borrar la transacción, pero este comando permite que su cartera se comporte como si nunca hubiera ocurrido.",
  inputs: [
    {
      method: "TxId",
      description: "El identificador de la transacción",
      required: true,
      type: PARAMETER_TYPE.string,
    },
  ],
};

import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "psbtbumpfee")!;

export const psbtbumpfeeEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Aumenta la comisión de una transacción mediante un PSBT.",
  description:
    "Variante de `bumpfee` que devuelve un PSBT en lugar de difundir directamente.",
  howIsThisUsed:
    "El RPC psbtbumpfee sirve principalmente para aumentar la comisión de una transacción RBF (opt-in) cuando la comisión inicial es insuficiente para una confirmación rápida. Es necesario para acelerar la confirmación durante períodos de congestión o cuando las comisiones se subestimaron. Al aumentar la comisión, se prioriza tu transacción para su inclusión en la blockchain. Es especialmente útil para billeteras que soportan RBF y necesitan ajustar las comisiones dinámicamente tras la difusión. Permite reemplazar la transacción original por una nueva con comisiones más elevadas, garantizando una confirmación más rápida sin esperar a que la transacción original sea confirmada o expulsada del mempool.",
};

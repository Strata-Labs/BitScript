import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "migratewallet")!;

export const migratewalletEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Migra una billetera legacy a una billetera basada en descriptores.",
  description:
    "Convierte una billetera existente en una billetera basada en descriptores.",
  howIsThisUsed:
    "El RPC migratewallet sirve para evolucionar una billetera Legacy hacia una billetera basada en descriptores, aprovechando funcionalidades mejoradas y una mejor compatibilidad. Las billeteras basadas en descriptores ofrecen más funcionalidades y están mejor adaptadas a las futuras evoluciones de Bitcoin Core. Esta migración beneficia a los usuarios que desean mantener su billetera compatible con los cambios futuros. Atención: esta funcionalidad es experimental y puede no comportarse como se espera en todos los casos. Haz respaldos con cuidado antes de migrar.",
};

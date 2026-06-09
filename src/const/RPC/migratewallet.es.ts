import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "migratewallet")!;

export const migratewalletEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Migra una cartera legacy a una cartera basada en descriptores.",
  description:
    "Convierte una cartera existente en una cartera basada en descriptores.",
  howIsThisUsed:
    "El RPC migratewallet sirve para evolucionar una cartera Legacy hacia una cartera basada en descriptores, aprovechando funcionalidades mejoradas y una mejor compatibilidad. Las carteras basadas en descriptores ofrecen más funcionalidades y están mejor adaptadas a las futuras evoluciones de Bitcoin Core. Esta migración beneficia a los usuarios que desean mantener su cartera compatible con los cambios futuros. Atención: esta funcionalidad es experimental y puede no comportarse como se espera en todos los casos. Realice copias de seguridad con cuidado antes de migrar.",
};

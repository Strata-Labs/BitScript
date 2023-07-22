import { useRouter } from "next/router";
import OpDup from "@/comp/opCodes/OP_Dup";
import OpCodesPage from "@/comp/opCodes/OpCodesPage";
import { OP_DUP, OP_HASH_160 } from "@/utils/OPS";

export default function opCodePagesHandler() {
  console.log("opCodePagesHandler");
  const router = useRouter();
  const { op } = router.query;

  console.log("opCodePagesHandler op", op);

  if (op) {
    if (op === "OP_DUP") {
      return <OpDup {...OP_DUP} />;
    } else if (op === "OP_HASH160") {
      return <OpDup {...OP_HASH_160} />;
    }
  } else {
    return <OpCodesPage />;
  }
}

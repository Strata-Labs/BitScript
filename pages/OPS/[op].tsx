import { useRouter } from "next/router";
import OpDup from "@/comp/opCodes/OP_Dup";
import OpCodesPage from "@/comp/opCodes/OpCodesPage";
import { OP_DUP } from "@/utils/OPS";

export default function opCodePagesHandler() {
  console.log("opCodePagesHandler");
  const router = useRouter();
  const { op } = router.query;

  if (op) {
    return <OpDup {...OP_DUP} />;
  } else {
    return <OpCodesPage />;
  }
}

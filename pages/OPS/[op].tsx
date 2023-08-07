import { useRouter } from "next/router";
import OpDup from "@/comp/opCodes/OP_Dup";
import OpCodesPage from "@/comp/opCodes/OpCodesPage";
import { OP_CODES } from "@/utils/OPS";

export default function opCodePagesHandler() {
  const router = useRouter();
  const { op } = router.query;

  if (op) {
    // find the op code based on the query
    const OP = OP_CODES.find((opCode) => opCode.name === op);
    if (OP) {
      return <OpDup {...OP} />;
    } else {
      return <OpCodesPage />;
    }
  } else {
    return <OpCodesPage />;
  }
}

import { RPCFunctionParams } from "@/const/RPC";
import { useTranslation } from "next-i18next";

type RpcBottomRightProps = {
  rpcRes: null | any;
  method: RPCFunctionParams;
};
const RpcBottomRight = ({ method, rpcRes }: RpcBottomRightProps) => {
  const { t } = useTranslation("rpc");
  return (
    <div className="h-full w-full">
      {/* General container */}
      <div className="flex h-full w-full flex-col">
        {/* Title*/}
        <div className="mx-5 mt-10 flex items-center justify-between">
          <p className="text-[20px] font-bold text-[#0C071D]">
            {t("label_result")}
          </p>
        </div>
        {/* Text Area */}
        <textarea
          className="mx-5 my-5 h-full cursor-pointer rounded-[32px] bg-[#F3F3F3] py-6 pl-6 pr-16 text-black outline-none"
          placeholder={t("result_placeholder")}
          readOnly
          value={rpcRes ? JSON.stringify(rpcRes, null, 2) : ""}
        ></textarea>
      </div>
    </div>
  );
};

export default RpcBottomRight;

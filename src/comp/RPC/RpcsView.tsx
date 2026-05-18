import { useState } from "react";
import ViewButtons from "../ViewButtons";
import RprcGridView from "./RpcGridView";
import RpcListView from "./RpcListView";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { RPC_METHODS } from "@/const/RPC";
import { getLocalizedRPC } from "@/const/RPC/translations";

enum ViewType {
  LIST = "LIST",
  GRID = "GRID",
}

const RpcsView = () => {
  const { t } = useTranslation("rpc");
  const { locale } = useRouter();
  const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);
  const localizedMethods = RPC_METHODS.map((m) => getLocalizedRPC(m, locale));

  const handleButtonOneClick = () => {
    setViewType(ViewType.GRID);
  };

  const handleButtonTwoClick = () => {
    setViewType(ViewType.LIST);
  };

  return (
    <div className="h-screen w-screen overflow-auto">
      <div className="flex h-screen w-screen flex-col">
        <div className="mx-[80px] flex flex-col md:ml-[270px] md:mr-0">
          <p className="mt-10 text-[14px] font-extralight text-[#6C5E70] md:mt-10">
            {t("page_label")}
          </p>
          <div className="mt-6 flex justify-between">
            {/* <p className="mr text-[20px] font-semibold text-[#0C071D] md:ml-0 md:text-[18px] lg:text-[28px]">
              OP Codes Are The Building Blocks Of Script
            </p> */}
            <div className="mt-7 flex md:hidden">
              <ViewButtons
                buttonOneClick={handleButtonOneClick}
                buttonTwoClick={handleButtonTwoClick}
              />
            </div>
          </div>
          <p className="mt-6 text-[14px] font-light text-[#6C5E70] md:mr-[170px] md:flex md:text-[16px]">
            {t("page_description")}{" "}
            <span className="text-[#F79327] md:hidden">
              {t("explore_below")}
            </span>
          </p>
          <span className="hidden font-light text-[#F79327] md:flex md:text-[16px]">
            {t("explore_below")}
          </span>
          <div className="align-center hidden justify-between md:flex">
            <p className="pt-4 text-xl font-semibold text-black">
              {t("section_title")}
            </p>
            <ViewButtons
              buttonOneClick={handleButtonOneClick}
              buttonTwoClick={handleButtonTwoClick}
            />
          </div>
        </div>

        {
          // viewComponent
          viewType === ViewType.GRID ? (
            <RprcGridView methods={localizedMethods} />
          ) : (
            <RpcListView methods={localizedMethods} />
          )
        }
      </div>
    </div>
  );
};

export default RpcsView;

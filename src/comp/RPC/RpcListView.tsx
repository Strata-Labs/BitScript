import { useState } from "react";
import ViewButtons from "../ViewButtons";
import RprcGridView from "./RpcGridView";

enum ViewType {
  LIST = "LIST",
  GRID = "GRID",
}

const RpcListView = () => {
  const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);

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
            Core RPC
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
            The Bitcoin Core RPC interface serves as the nerve center for
            querying data, managing transactions, & interfacing with the Bitcoin
            network. The RPC commands provide a wide array of functionalities,
            from retrieving blockchain information to crafting raw transactions.{" "}
            <span className="text-[#F79327] md:hidden">
              Experiment, Test & Save RPC Commands below!
            </span>
          </p>
          <span className="hidden font-light text-[#F79327] md:flex md:text-[16px]">
            Experiment, Test & Save RPC Commands below!
          </span>
          <div className="align-center hidden justify-between md:flex">
            <p className="pt-4 text-lg font-semibold text-black">
              RPC Commands
            </p>
            <ViewButtons
              buttonOneClick={handleButtonOneClick}
              buttonTwoClick={handleButtonTwoClick}
            />
          </div>
        </div>

        <RprcGridView />
      </div>
    </div>
  );
};

export default RpcListView;

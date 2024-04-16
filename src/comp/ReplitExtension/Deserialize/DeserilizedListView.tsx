import {
  TransactionFeResponse,
  TransactionItem,
} from "@/deserialization/model";
import { classNames } from "@/utils";
import { isClickedModularPopUpOpen } from "../atoms";
import { useAtom } from "jotai";

type DeserializedListViewProps = {
  txData: TransactionFeResponse;
  popUpData: TransactionItem | null;
  setScreenYPosition: (position: number) => void;
  setPopUpData: (data: TransactionItem | null) => void;
  setIsModularPopUpOpen: (status: boolean) => void;
  setOpen: (status: boolean) => void;
};
const DeserializedListView = ({
  setOpen,
  setIsModularPopUpOpen,
  setPopUpData,
  setScreenYPosition,
  txData,
  popUpData,
}: DeserializedListViewProps) => {
  const [isClickedModularPopUp, setIsClickedModularPopUp] = useAtom(
    isClickedModularPopUpOpen
  );

  const handleListChildHover = (data: TransactionItem, e: React.MouseEvent) => {
    setScreenYPosition(e.screenY + 100);
    setPopUpData(data);
    setIsModularPopUpOpen(true);
  };

  const handleListChildMouseLeave = () => {
    setIsModularPopUpOpen(false);
  };

  const handleClickTableItem = (data: TransactionItem) => {
    setPopUpData(data);
    setIsClickedModularPopUp(!isClickedModularPopUp);

    setOpen(true);
  };
  return (
    <table className="mb-4 min-w-full border-separate border-spacing-0 rounded-xl bg-[#EEEEEE]">
      <thead></thead>
      <tbody className="">
        {txData?.hexResponse.parsedRawHex.map((hex, i) => {
          //TxTextSectionType
          const isLongValue = hex.item.value.length > 8;

          const isSelected =
            `${hex.item.title}-${hex.item.value}` ===
            `${popUpData?.item.title}-${popUpData?.item.value}`;

          return (
            <div
              className={classNames(
                "relative flex flex-1 cursor-pointer flex-col justify-between px-4 transition-all md:px-8",
                isLongValue ? "min-y-[70px] py-2 " : "h-[70px]",
                isSelected ? "bg-white" : ""
              )}
              onMouseEnter={(e) => handleListChildHover(hex, e)}
              onMouseLeave={() => handleListChildMouseLeave()}
              onClick={() => handleClickTableItem(hex)}
            >
              <div
                className={classNames(
                  "absolute left-0 top-0 h-full w-2 rounded-l-md  transition",
                  isSelected ? "bg-dark-orange" : "bg-transparent"
                )}
              />
              <div className="flex flex-1 flex-row items-center">
                <div className="flex-1 py-2">
                  <p className="text-md font-bold text-black">
                    {hex.item.title}
                  </p>
                </div>
                {!isLongValue && (
                  <div className="flex-1">
                    <p
                      className={classNames(
                        "text-lg ",
                        isSelected ? "text-dark-orange" : "text-black"
                      )}
                    >
                      {hex.item.value}
                    </p>
                  </div>
                )}
              </div>
              {isLongValue && (
                <div className="py-2 pb-4">
                  <p
                    className={classNames(
                      "text-lg ",
                      isSelected ? "text-dark-orange" : "text-black"
                    )}
                  >
                    {hex.item.value}
                  </p>
                </div>
              )}
              {!isSelected && <div className="h-[2px] w-full bg-gray-200" />}
            </div>
          );
        })}
      </tbody>
    </table>
  );
};

export default DeserializedListView;

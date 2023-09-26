import React, { useEffect } from "react";
import { LOCK_TIME } from "../../../const/deserializeTx";
import LockTimePopUpContainer from "./LockTimePopUpContainer";
import { BaseTransactionItem } from "@/deserialization/model";

type LockTimePopUpProps = {
  value: string;
};

enum LockType {
  blockHeight = "blockHeight",
  timestamp = "timestamp",
  noLock = "noLock",
}
const LockTimePopUp = (props: BaseTransactionItem) => {
  console.log("props", props);
  const { value } = props;

  console.log("value", value);
  const [lockType, setLockType] = React.useState<LockType>(LockType.noLock);

  useEffect(() => {
    const val = value.split(" hex")[0];
    console.log("val", val);

    if (val === "ffffffff" || val === "00000000" || val === "fdffffff") {
      // do nothing
      setLockType(LockType.noLock);
    } else {
      const lockTimeInt = parseInt(val, 16);
      if (lockTimeInt < 500000000) {
        setLockType(LockType.blockHeight);
      } else {
        setLockType(LockType.timestamp);
      }
    }

    // need to check if the locktime is a block height or a timestamp
    // if the locktime is less than 500000000, then it is a block height
    // if the locktime is greater than 500000000, then it is a timestamp
  }, [value]);

  return (
    <div className=" overflow-x-hidden overflow-y-scroll ">
      <p className="mx-5 mt-3 text-[#0C071D]">{LOCK_TIME.Content}</p>
      <p className="mx-5 mt-3 text-[#0C071D]">{LOCK_TIME.Content2}</p>
      <div className="flex flex-col md:flex-row">
        <LockTimePopUpContainer
          Title={LOCK_TIME.Title1}
          Cont={LOCK_TIME.Cont1}
          Bottom={LOCK_TIME.Bottom1}
          ActiveTime={lockType === LockType.blockHeight}
          svgIconTime={"1"}
          activeCheckMark={lockType === LockType.blockHeight}
        />
        <LockTimePopUpContainer
          Title={LOCK_TIME.Title2}
          Cont={LOCK_TIME.Cont2}
          Bottom={LOCK_TIME.Bottom2}
          ActiveTime={lockType === LockType.timestamp}
          svgIconTime={"2"}
          activeCheckMark={lockType === LockType.timestamp}
        />
      </div>
    </div>
  );
};

export default LockTimePopUp;

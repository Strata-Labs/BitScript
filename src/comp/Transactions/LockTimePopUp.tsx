import { LOCK_TIME } from "@/const/deserializeTx";
import LockTimePopUpContainer from "./LockTimePopUpContainer";

const LockTimePopUp = () => {
  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">{LOCK_TIME.Content}</p>
      <p className="mx-5 mt-3 text-[#0C071D]">{LOCK_TIME.Content2}</p>
      <div className="flex flex-row">
        <LockTimePopUpContainer
          Title={LOCK_TIME.Title1}
          Cont={LOCK_TIME.Cont1}
          Bottom={LOCK_TIME.Bottom1}
          ActiveTime={false}
          svgIconTime={"1"}
          activeCheckMark={false}
        />
        <LockTimePopUpContainer
          Title={LOCK_TIME.Title2}
          Cont={LOCK_TIME.Cont2}
          Bottom={LOCK_TIME.Bottom2}
          ActiveTime={false}
          svgIconTime={"2"}
          activeCheckMark={false}
        />
      </div>
    </>
  );
};

export default LockTimePopUp;

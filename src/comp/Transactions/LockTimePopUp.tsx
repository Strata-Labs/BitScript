import LockTimePopUpContainer from "./LockTimePopUpContainer";

interface LockTimePopUpProps {
  Content1: string;
  Content2: string;
  Title1: string;
  Cont1: string;
  Title2: string;
  Cont2: string;
  Bottom1: string;
  Bottom2: string;
  Active: boolean;
  Active2: boolean;
  ActiveCheckMark: boolean;
}

const LockTimePopUp: React.FC<LockTimePopUpProps> = ({
  Content1,
  Content2,
  Title1,
  Cont1,
  Title2,
  Cont2,
  Bottom1,
  Bottom2,
  Active,
  Active2,
  ActiveCheckMark,
}) => {
  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">{Content1}</p>
      <p className="mx-5 mt-3 text-[#0C071D]">{Content2}</p>
      <div className="flex flex-row">
        <LockTimePopUpContainer
          Title={Title1}
          Cont={Cont1}
          Bottom={Bottom1}
          ActiveTime={Active}
          svgIconTime={"1"}
          activeCheckMark={ActiveCheckMark}
        />
        <LockTimePopUpContainer
          Title={Title2}
          Cont={Cont2}
          Bottom={Bottom2}
          ActiveTime={Active2}
          svgIconTime={"2"}
          activeCheckMark={ActiveCheckMark}
        />
      </div>
    </>
  );
};

export default LockTimePopUp;

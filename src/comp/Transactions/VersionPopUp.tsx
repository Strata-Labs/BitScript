interface VersionPopUpProps {
  Content1: string;
  Content2: string;
  Content3: string;
}

const VersionPopUp: React.FC<VersionPopUpProps> = ({
  Content1,
  Content2,
  Content3,
}) => {
  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">{Content1}</p>
      <p className="mx-5 mt-3 text-[#0C071D]">{Content2}</p>
      <p className="mx-5 mt-3 text-[12px] text-[#0C071D]">{Content3}</p>
    </>
  );
};

export default VersionPopUp;

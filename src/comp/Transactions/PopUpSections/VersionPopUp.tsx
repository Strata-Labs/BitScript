import { VERSION_DATA } from "@/const/deserializeTx";

interface VersionPopUpProps {
  Content1: string;
  Content2: string;
  Content3: string;
}

const VersionPopUp = () => {
  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">{VERSION_DATA.Content}</p>
      <p className="mx-5 mt-3 text-[#0C071D]">{VERSION_DATA.Content2}</p>
      <p className="mx-5 mt-3 text-[12px] text-[#0C071D]">
        {VERSION_DATA.Content3}
      </p>
    </>
  );
};

export default VersionPopUp;

import { isVersion } from "@/comp/atom";
import { VERSION_DATA_2, VERSION_DATA_1 } from "@/const/deserializeTx";
import { useAtomValue } from "jotai";

interface VersionPopUpProps {
  Content1: string;
  Content2: string;
  Content3: string;
}

const VersionPopUp = () => {
  const [whichVersion] = useAtomValue(isVersion);

  return (
    <>
      {whichVersion === "1" && (
        <>
          <p className="mx-5 mt-3 text-[#0C071D]">{VERSION_DATA_1.Content}</p>
          <p className="mx-5 mt-3 text-[#0C071D]">{VERSION_DATA_1.Content2}</p>
          <p className="mx-5 mt-3 text-[12px] text-[#0C071D]">
            {VERSION_DATA_1.Content3}
          </p>
        </>
      )}

      {whichVersion === "2" && (
        <>
          <p className="mx-5 mt-3 text-[#0C071D]">{VERSION_DATA_2.Content}</p>
          <p className="mx-5 mt-3 text-[#0C071D]">{VERSION_DATA_2.Content2}</p>
          <p className="mx-5 mt-3 text-[12px] text-[#0C071D]">
            {VERSION_DATA_2.Content3}
          </p>
        </>
      )}
    </>
  );
};

export default VersionPopUp;

import { UserSandboxScript } from "@/comp/atom";
import {
  faBookmark,
  faEdit,
  faTimes,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ScriptInfoProps {
  script: UserSandboxScript;
  setIsScriptInfoPopupVisible: (value: boolean) => void;
}

const ScriptInfo = (props: ScriptInfoProps) => {
  const { script, setIsScriptInfoPopupVisible } = props;

  const formattedDate = new Date(script.updatedAt).toLocaleDateString("en-US", {
    month: "short", // MMM for abbreviated month
    day: "numeric", // Do for day of month with leading zero
    year: "2-digit", // YY for two-digit year
  });

  return (
    <div className="absolute bottom-10 left-10 flex w-[90%] flex-col gap-1.5 rounded-md bg-[#201B31] p-5">
      <div className="flex justify-between">
        <div className="bold text-white">{script.name}</div>

        <FontAwesomeIcon
          onClick={() => setIsScriptInfoPopupVisible(false)}
          className="mx-2 cursor-pointer text-slate-500 "
          icon={faTimes}
        />
      </div>

      <div className="font-thin text-white">{script.description}</div>

      <div className="text-sm font-thin text-white">
        last updated <b>{formattedDate}</b>
      </div>
    </div>
  );
};

export default ScriptInfo;

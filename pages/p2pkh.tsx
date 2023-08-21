import SearchView from "@/comp/SearchView/SearchView";
import { activeSearchView } from "@/comp/atom";
import { useAtom } from "jotai";
import P2pkh from "@/comp/scripts/p2pkh";

export default function TEMP() {
  const [showSearchView] = useAtom(activeSearchView);

  return (
    <>
      {showSearchView ? (
        <SearchView />
      ) : (
        <P2pkh
          name={"script"}
          completeName={""}
          scriptDescription={""}
          summary={""}
          introduction={""}
          opCodeReview={""}
          inUse={""}
          numberOfOps={""}
          generalType={""}
          linkPath={""}
          signature={""}
          publicKey={""}
          hashKey={""}
          visualProps={{
            title: "",
            description: "",
            steps: [],
          }}
        />
      )}
    </>
  );
}

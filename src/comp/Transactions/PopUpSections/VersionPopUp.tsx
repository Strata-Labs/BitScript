import React from "react";

import { useAtomValue } from "jotai";
import { VERSION_DATA, VERSION_DATA_2 } from "../../../const/deserializeTx";
import { VersionItem } from "../../../deserialization/model";

const VersionPopUp = (props: VersionItem) => {
  const { title } = props;

  return (
    <>
      {title === "Version 1" && (
        <>
          <p className="mx-5 mt-3 text-[#0C071D]">{VERSION_DATA.Content}</p>
          <p className="mx-5 mt-3 text-[#0C071D]">{VERSION_DATA.Content2}</p>
          <p className="mx-5 mt-3 text-[#0C071D]">
            <span className="font-bold">{VERSION_DATA.Content3}</span>{" "}
            {VERSION_DATA.Content4}
          </p>
        </>
      )}

      {title === "Version 2" && (
        <>
          <p className="mx-5 mt-3 text-[#0C071D]">{VERSION_DATA_2.Content}</p>
          <p className="mx-5 mt-3 text-[#0C071D]">{VERSION_DATA_2.Content2}</p>
          <p className="mx-5 mt-3 text-[#0C071D]">
            <span className="font-bold">{VERSION_DATA_2.Content3}</span>{" "}
            {VERSION_DATA_2.Content4}
          </p>
        </>
      )}
    </>
  );
};

export default VersionPopUp;

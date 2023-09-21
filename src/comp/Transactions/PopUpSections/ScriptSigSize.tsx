import React from "react";
import { SizeTable } from "./InputCount";

const ScriptSigSize = () => {
  return (
    <>
      <p className="mx-5 mt-3 text-lg text-[#0C071D]">
        The ScriptSigSize field dictates the length of the upcoming ScriptSig /
        UnlockScript. Like most items of varying size, The scriptSigSize is
        formatted according to Bitcoin VarInt rules:
      </p>
      <SizeTable />
      <p className="mx-5 mt-5 text-lg text-[#0C071D]">
        This length is recorded in hex & must be converted to decimal to
        correctly count upcoming chars.
      </p>
    </>
  );
};

export default ScriptSigSize;

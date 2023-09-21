import React from "react";

import { InputVOUTItem } from "../../../deserialization/model";

const VOut = (props: InputVOUTItem) => {
  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">
        The VOUT of an input specifies the{" "}
        <span className="font-bold">index</span> of the UTXO unlocked; recall
        that the field before this is a TXID that points to a mined transaction
        which may contain multiple inputs.
      </p>
      <p className="mx-5 mt-3 text-[#0C071D]">
        The TXID is stored as an{" "}
        <span className="font-bold">
          4-byte | 16-char in Little Endian format.
        </span>
      </p>

      <p className="font-sm mx-5 mt-3 text-[#0C071D]">
        <span className="font-sm  font-bold text-[#0C071D]">BE</span>{" "}
        {props.bigEndian}
      </p>
    </>
  );
};

export default VOut;

import React from "react";

import { OutputAmountItem } from "../../../deserialization/model";

const Amount = (props: OutputAmountItem) => {
  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">
        The amount of Bitcoin, described in integer Satoshis (1/100,000,000 of a
        Bitcoin) that is being sent in this output.
      </p>

      <p className="font-sm mx-5 mt-3 text-[#0C071D]">
        This amount value is stored as an{" "}
        <span className="font-bold"> 8-byte | 16-char</span> in{" "}
        <span className="font-bold">Little Endian</span> format.
      </p>

      <p className="font-sm mx-5 mt-3 text-[#0C071D]">
        <span className="font-bold">BE </span> {props.bigEndian}
        <span> | </span>
        <span className="font-bold">DEC</span> {""}
        {props.decimal}
      </p>
    </>
  );
};

export default Amount;

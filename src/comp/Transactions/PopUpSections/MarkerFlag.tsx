import React from "react";
import { INPUT_TX_ID } from "../../../const/deserializeTx";
import { InputTXIDItem } from "../../../deserialization/model";
import Link from "next/link";

const Marker = () => {
  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">
        This is a zero byte figure that indicates that this transaction is a
        segregated witness (SegWit) transaction that contains a witness section.
      </p>
    </>
  );
};

export default Marker;

export const Flag = () => {
  return (
    <>
      <p className="mx-5 mt-3 text-[#0C071D]">
        The Flag, stored as 1-byte | 2-hex value, is an additional indicator
        meant for SegWit functionality. Currently only the value 0x01 is
        standard & relayed; however, this field could be used to flag for
        different SegWit alternatives.
      </p>
    </>
  );
};

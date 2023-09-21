import React from "react";
import { SIZE_DETAILS, SizeTable } from "./InputCount";

const WitnessElementSize = () => {
  return (
    <>
      <p className="mx-5 mt-3 text-lg text-[#0C071D]">
        Every Witness consists of an element count & an array of tuples that
        include the size(varint) of the upcoming element & the actual value /
        element (data or op_code) itself.
      </p>
      <SizeTable />
      <p className="mx-5 mt-5 text-lg text-[#0C071D]">
        This witness element count tells us how many items are in the upcoming
        witness script.
      </p>
    </>
  );
};

export default WitnessElementSize;

export const ElementSize = () => {
  return (
    <>
      <p className="mx-5 mt-3 text-lg text-[#0C071D]">
        Before every item in the Witness script, we first need to record the
        size of the upcoming item. As usual, this means using the standard
        VarInt rules:
      </p>
      <SizeTable />
      <p className="mx-5 mt-5 text-lg text-[#0C071D]">
        This witness element count tells us how many items are in the upcoming
        witness script.
      </p>
    </>
  );
};

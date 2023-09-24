import React from "react";
import { INPUT_TX_ID } from "../../../const/deserializeTx";
import { InputTXIDItem } from "../../../deserialization/model";
import Link from "next/link";

const TxId = (props: InputTXIDItem) => {
  return (
    <>
      <p className="mx-5 mt-3 break-words text-[#0C071D]">
        The TXID of an input specifies in which previous transaction this
        Bitcoin was received. The TXID is stored as a{" "}
        <span className="font-bold">32-byte | 64-char</span> in{" "}
        <span className="font-bold">Little Endian format.</span>
      </p>
      <p className="mx-5 mt-3 text-[#0C071D]">{INPUT_TX_ID.Content2}</p>
      <Link
        passHref
        href={`/transactions?transaction=${props.value}`}
        target="_blank"
      >
        <p className="mx-5 mt-3  text-[#F79327] underline">
          Click here to open this transaction in another tab
        </p>
        <p className="font-sm mx-5 mt-3 text-[#0C071D]">
          <span className="font-sm  font-bold text-[#0C071D]">BE</span>{" "}
          {props.bigEndian}
        </p>
      </Link>
    </>
  );
};

export default TxId;

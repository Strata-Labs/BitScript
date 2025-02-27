import { useState } from "react";
import MultisigGenerator from "./MultisigGenerator";

const MultisigGeneratorParent = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="mx-10 mb-10 mt-10 md:ml-[260px] md:mr-10">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="font-extralight text-[#687588]">Utility Tool</p>
          <p className="text-[29px] font-semibold text-black">
            Multisig Address Generator
          </p>
          <p className="font-extralight text-[#687588]">
            Generate Bitcoin multisig addresses by specifying M of N and
            providing public keys.{" "}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-[#F79327] hover:underline"
            >
              {showInfo ? "Hide info" : "Learn more"}
            </button>
          </p>

          {showInfo && (
            <div className="mt-4 rounded-lg border border-[#F3F3F3] bg-white p-4">
              <h3 className="mb-2 text-lg font-medium text-black">
                Bitcoin Multisig Address Types
              </h3>
              <div className="space-y-3 text-sm text-[#687588]">
                <div>
                  <p className="font-medium text-black">
                    P2SH (Legacy Multisig)
                  </p>
                  <p>
                    The original Bitcoin multisig format. Addresses start with
                    '3'. Compatible with all wallets.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-black">
                    P2WSH (Native SegWit)
                  </p>
                  <p>
                    SegWit multisig with lower fees. Addresses start with
                    'bc1q'. Compatible with most modern wallets.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-black">
                    P2SH-P2WSH (Nested SegWit)
                  </p>
                  <p>
                    SegWit wrapped in a P2SH address for backward compatibility.
                    Addresses start with '3'.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-black">
                    P2TR Key Path (Taproot MuSig)
                  </p>
                  <p>
                    Taproot address using MuSig key aggregation. Addresses start
                    with 'bc1p'. Offers better privacy.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-black">
                    P2TR Script Path (Taproot Script)
                  </p>
                  <p>
                    Taproot address with a script path for the multisig.
                    Addresses start with 'bc1p'.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <MultisigGenerator />
      </div>
    </div>
  );
};

export default MultisigGeneratorParent;

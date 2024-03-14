import { classNames } from "@/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  KeyIcon,
} from "@heroicons/react/20/solid";

const TaprootOutputGenerator = () => {
  return (
    <div
      style={{
        //minHeight: "calc(100vh - 110px)",
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className="min-height-[92vh] flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className="flex flex-1 flex-col gap-10 p-8">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <ChevronLeftIcon className="h-10 w-10 text-[#0C071D]  " />
            <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[32px]">
              Taproot Output Generator
            </p>
          </div>
        </div>
        <div className="flex w-full flex-1 flex-row gap-2 ">
          <div className="flex h-fit flex-1 flex-col  justify-start  gap-4 rounded-2xl bg-[#F0F0F0] p-6  px-10">
            <div className="flex  flex-row items-start justify-start gap-4">
              <KeyIcon className="h-10 w-10 text-[#0C071D]" />
              <p className="  font-semibold text-[#0C071D]  md:text-[26px]">
                KeyPath
              </p>
            </div>
            <p className="  font-normal text-[#0C071D]  md:text-[20px]">
              The simple path that allows a signing private key to consume the
              UTXO. This private key can map to a single public key or a more
              complicated multi-sig using an aggregatd public key.
            </p>
            <div className="flex flex-col gap-2 pt-10 ">
              <p className="font-normal text-[#6C5E70]  md:text-[16px]">
                Provide Internal Wallet / Public Key
              </p>
              <button className="flex w-full flex-row items-center justify-between rounded-full border border-dark-orange px-4 py-3 text-[20px] font-thin text-dark-orange">
                <p>Provide tweak key from ScriptPath first...</p>
                <ChevronLeftIcon className="h-10 w-10 text-dark-orange" />
              </button>
            </div>
          </div>
          <div className="flex h-fit flex-1 flex-col  justify-start  gap-4 rounded-2xl bg-[#F0F0F0] p-6  px-10">
            <div className="flex  flex-row items-start justify-start gap-4">
              <ClipboardDocumentCheckIcon className="h-10 w-10 text-[#0C071D]" />
              <p className="  font-semibold text-[#0C071D]  md:text-[26px]">
                Scriptpath
              </p>
            </div>
            <p className="  font-normal text-[#0C071D]  md:text-[20px]">
              The script, or smart-contract, path that represents a Merkle tree
              of either keys or scripts. A specific node, or tapleaf, is
              consumed by providing ___, __ & a valid ____.
            </p>
            <div className="flex flex-col gap-2 pt-10 ">
              <p className="font-normal text-[#6C5E70]  md:text-[16px]">
                Provide TweakKey/MerkleTreeRoot
              </p>
              <button
                className={classNames(
                  "flex h-[62px] w-full items-center justify-between rounded-full pl-6  ",
                  "cursor-pointer bg-[#0C071D] "
                )}
              >
                <p className=" mr-5 text-[20px] font-bold tracking-wider text-white  md:mr-10">
                  Click to create the scriptpath merkle tree
                </p>
                <ChevronRightIcon className="h-10 w-10 text-dark-orange" />
              </button>
            </div>
          </div>
        </div>
        <button
          className={classNames(
            "flex h-[72px] w-full items-center justify-between rounded-full px-6 shadow-md  ",
            "cursor-pointer bg-[#cacad9]  "
          )}
        >
          <p className="mr-5 text-[20px]  font-thin tracking-wider text-white  md:mr-10">
            complete both the KeyPath & ScriptPath above to continue...
          </p>
        </button>
      </div>
    </div>
  );
};

export default TaprootOutputGenerator;

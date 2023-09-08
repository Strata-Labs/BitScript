export enum TxTextSectionType {
  txType = "txType",
  version = "version",
  marker = "marker",
  flag = "flag",
  inputCount = "inputCount",
  input = "input",
  outputCount = "outputCount",
  output = "output",
  witness = "witness",
  locktime = "locktime",
  inputTxId = "inputTxId",
  inputVout = "inputVout",
  inputScriptSigSize = "inputScriptSigSize",
  inputScriptSig = "inputScriptSig",
  inputSequence = "inputSequence",
}
export type TxTextSectionProps = {
  text: string | undefined;
  type: TxTextSectionType;
  setIsModularPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const TxTextSection = ({
  text,
  type,
  setIsModularPopUpOpen,
}: TxTextSectionProps) => {
  return (
    <span
      onMouseEnter={() => setIsModularPopUpOpen(true)}
      onMouseLeave={() => setIsModularPopUpOpen(false)}
      className=" text-md break-words  rounded-md transition-all hover:bg-black  hover:text-[#F79327]"
    >
      {text}
    </span>
  );
};

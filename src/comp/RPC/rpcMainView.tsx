import RpcLeftColumn from "./rpcLeftColumn";
import RpcRightColumn from "./rpcRightColumn";
import RpcTopRight from "./rpcTopRight";

export enum PARAMETER_TYPE {
  string = "string",
  number = "number",
  boolean = "boolean",
}
export type MethodInputs = {
  method: string;
  description: string;
  required?: boolean;
  type: PARAMETER_TYPE;
  defaultValue?: string | number | boolean;
};

export type RPCFunctionParams = {
  method: string;
  description: string;
  inputs: MethodInputs[];
};

const METHODS: RPCFunctionParams[] = [
  {
    method: "getbestblockhash",
    description:
      "Returns the hash of the best (tip) block in the longest blockchain.",
    inputs: [],
  },
  {
    method: "getblockchaininfo",
    description:
      "Returns an object that contains the information regarding blockchain processing in different states",
    inputs: [],
  },
  {
    method: "getblockcount",
    description:
      "Returns the height of the fully-validated chain. The genesis block has a height of 0.",
    inputs: [],
  },
  {
    method: "getblockhash",
    description: "Returns the hash of the block provided its height.",
    inputs: [
      {
        method: "height",
        description: "The height of the block",
        required: true,
        type: PARAMETER_TYPE.number,
      },
    ],
  },
];
const RpcMainView = () => {
  return (
    <div className="h-screen md:ml-[240px]">
      <div className="flex h-full w-full flex-col md:flex-row">
        <RpcLeftColumn method={METHODS[3]} />
        <div className="mt-5 flex h-full w-full flex-col md:ml-5 md:mt-0">
          <RpcRightColumn method={METHODS[3]} />
        </div>
      </div>
    </div>
  );
};

export default RpcMainView;

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

export const RPC_METHODS: RPCFunctionParams[] = [
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
  {
    method: "gettxout",
    description: "Returns details about an unspent transaction output",
    inputs: [
      {
        method: "txid",
        description: "The transaction id",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "n",
        description: "The vout number",
        required: true,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "include_mempool",
        description: "Whether to include the mempool",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
    ],
  },
  {
    method: "getblockheader",
    description: "Returns the header of the block given it's hash. ",
    inputs: [
      {
        method: "blockhash",
        description: "The hash of the block",
        required: true,
        type: PARAMETER_TYPE.string,
      },

      {
        method: "verbose",
        description:
          "default=true. It's true for a JSON object and false for the hex-encoded data",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
    ],
  },
];

type RpcMainViewProps = {
  method: RPCFunctionParams;
};
const RpcMainView = ({ method }: RpcMainViewProps) => {
  return (
    <div className="h-screen md:ml-[240px]">
      <div className="flex h-full w-full flex-col md:flex-row">
        <RpcLeftColumn method={method} />
        <div className="mt-5 flex h-full w-full flex-col md:ml-5 md:mt-0">
          <RpcRightColumn method={method} />
        </div>
      </div>
    </div>
  );
};

export default RpcMainView;

export enum PARAMETER_TYPE {
  string = "string",
  number = "number",
  boolean = "boolean",
  json = "json",
  three = "three",
  enum = "enum",
}

export type MethodInputs = {
  method: string;
  description: string;
  required?: boolean;
  type: PARAMETER_TYPE;
  defaultValue?: string | number | boolean;
  enumValues?: (string | number | boolean)[];
};

export type RPCFunctionParams = {
  method: string;
  description: string;
  summary: string;
  inputs: MethodInputs[];
  linkPath: string;
  category?: string;
  callable: boolean;
  howIsThisUsed: string;
};

export const RPC_METHODS: RPCFunctionParams[] = [
  {
    method: "getblockhash",
    description: "Returns the hash of the block provided its height.",
    linkPath: "/rpc/getblockhash",
    callable: true,
    category: "Blockchain",
    summary:
      "The getblockhash RPC returns the header hash (32-bytes) of a block at the given height in the selected chain.",
    howIsThisUsed:
      "As you’d expect, this is by far one of the most popular commands as nearly every application-layer entity needs to fetch data from the latest or from a specific block. The easiest example to visualize here is likely a block explorer that needs to fetch the most recent block.",
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
    method: "decoderawtransaction",
    summary: "Decodes a raw transaction ",
    linkPath: "/rpc/decoderawtransaction",
    description:
      "The decoderawtransaction RPC turns a serialized transaction in hex format into a JSON description of the transaction's details.",
    category: "rawtransactions",
    callable: true,
    howIsThisUsed:
      "This RPC is commonly used by developers and blockchain interfaces to understand the details of a transaction before it is confirmed on the blockchain. It is especially useful for wallet interfaces that need to display transaction information, or for debugging purposes when constructing transactions.",
    inputs: [
      {
        method: "hexstring",
        description: "The transaction hex string",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "iswitness",
        description:
          "Whether the transaction hex string is a witness transaction",
        required: false,
        type: PARAMETER_TYPE.boolean,
      },
    ],
  },
  {
    method: "decodescript",
    summary: "Decodes a hex-encoded script",
    description:
      "The decodescript RPC decodes a hex-encoded script into readable information, detailing its type, any related addresses, and its assembly language form.",
    category: "rawtransactions",
    linkPath: "/rpc/decodescript",
    callable: true,
    howIsThisUsed:
      "This RPC simplifies understanding Bitcoin scripts by breaking them down into their basic elements, showing their purpose and how they work in transactions. It's useful for verifying scripts, developing Bitcoin software, and fixing errors, ensuring scripts function correctly.",
    inputs: [
      {
        method: "hexstring",
        description: "The hex encoded script",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "estimatesmartfee",
    summary: "Estimates the approximate fee per kilobyte ",
    description:
      "The estimatesmartfee RPC estimates the fee per kilobyte needed for a transaction to begin confirmation within a certain number of blocks. It also provides the number of blocks of which this fee estimate is valid.",
    category: "util",
    howIsThisUsed:
      "This RPC predicts the necessary fee for a transaction to be confirmed within a given timeframe, addressing the need for timely transaction confirmations while managing costs. By providing a fee estimate, it guides users in setting transaction fees that balance speed with expense, crucial for efficient blockchain operation and user satisfaction. This functionality is vital in dynamic network conditions where appropriate fee levels can fluctuate significantly.",
    linkPath: "/rpc/estimatesmartfee",
    callable: true,
    inputs: [
      {
        method: "conf_target",
        description: "Confirmation target in blocks",
        required: true,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "estimate_mode",
        description: "The estimate mode (default is CONSERVATIVE)",
        required: false,
        type: PARAMETER_TYPE.enum,
        defaultValue: "CONSERVATIVE",
        enumValues: ["UNSET", "ECONOMICAL", "CONSERVATIVE"],
      },
    ],
  },
  {
    method: "getbestblockhash",
    summary: "Returns the hash of the best (tip) block",
    description:
      "The getbestblockhash RPC returns the hash for the latest block that has been completely checked and holds the greatest amount of work in the blockchain.",
    inputs: [],
    linkPath: "/rpc/getbestblockhash",
    callable: true,
    category: "Blockchain",
    howIsThisUsed:
      "This RPC fetches the hash of the latest block, serving as a key tool for any application that requires up-to-date blockchain information. This enables developers and users to quickly access the most current data, ensuring their blockchain-related operations or analyses are based on the latest available block.",
  },
  {
    method: "getblockchaininfo",
    summary: "Retrieves blockchain information",
    description:
      "The getblockchaininfo RPC provides details about the current state of the blockchain, including data on the height, difficulty, and size on disk.",
    inputs: [],
    linkPath: "/rpc/getblockchaininfo",
    callable: true,
    category: "Blockchain",
    howIsThisUsed:
      "This RPC provides a comprehensive snapshot of the blockchain, including its current height, difficulty level, and overall size. It's a critical tool for both users and developers seeking insights into the blockchain's health, structure, and growth, enabling informed decisions and analyses related to blockchain activities.",
  },
  {
    method: "getblockcount",
    summary: "Retrieves the current block count",
    description:
      "The getblockcount RPC return the number of blocks in the longest blockchain, starting from the genesis block (height 0)",
    inputs: [],
    linkPath: "/rpc/getblockcount",
    callable: true,
    category: "blockchain",
    howIsThisUsed:
      "This RPC is key for determining the total number of blocks in the blockchain. It's essential for monitoring the blockchain's expansion, offering a clear metric of its growth over time. This data is especially useful for evaluating the blockchain's activity and rate of new block creation.",
  },
  {
    method: "getblockheader",
    summary: "Retrieves information about a block header",
    linkPath: "/rpc/getblockheader",
    callable: true,
    description:
      "The getblockheader RPC is used for quickly accessing block metadata like its position and status in the blockchain, useful for applications needing to verify block connections or sync data efficiently. It optimizes resource use by avoiding the download of full block contents.",
    category: "Blockchain",
    howIsThisUsed:
      "This RPC is used for quickly accessing block metadata like its position and status in the blockchain, useful for applications needing to verify block connections or sync data efficiently. It optimizes resource use by avoiding the download of full block contents.",
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
  {
    method: "getblockstats",
    summary: "Computes statistics for a specified block in the blockchain",
    linkPath: "/rpc/getblockstats",
    callable: true,
    description:
      "The getblockstats RPC command computes detailed statistics for a specific block identified by its height or hash. It provides insights into various metrics such as average fee, transaction sizes, block size, and more, offering valuable data for analysis and optimization of blockchain operations.",
    category: "Blockchain",
    howIsThisUsed:
      "This RPC is essential for analysts, developers, and researchers who need to study block-specific data for trends, performance metrics, or blockchain health. For instance, it can be used to analyze fee trends over time or the efficiency of transaction size optimizations.",
    inputs: [
      {
        method: "hash_or_height",
        description: "The block hash or height of the target block",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "stats",
        type: PARAMETER_TYPE.json,
        description: "JSON array of values to filter from ",
        required: false,
      },
    ],
  },
  {
    method: "getblock",
    summary: "Returns detailed information about a block in the blockchain.",
    description:
      "The getblock RPC command retrieves information about a specific block identified by its hash. It can return data in different formats based on the verbosity level: hex-encoded data for the block, a JSON object with block details, or a JSON object with block and transaction details, including optional prevout information for inputs.",
    category: "blockchain",
    linkPath: "/rpc/getblock",
    howIsThisUsed:
      "This RPC is crucial for blockchain explorers, wallets, and analysis tools that require detailed information about block contents, including transactions and their details. Depending on the verbosity level, it can provide a comprehensive view of the block's data for in-depth analysis or verification purposes.",
    callable: true,
    inputs: [
      {
        method: "blockhash",
        description: "The hash of the block",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "verbosity",
        description:
          "default = 1, 0 for hex-encoded data, 1 for a JSON object, and 2 for JSON object with transaction data",
        required: false,
        type: PARAMETER_TYPE.enum,

        enumValues: [0, 1, 2],
        defaultValue: 1,
      },
    ],
  },
  {
    method: "getchaintips",
    linkPath: "/rpc/getchaintips",
    callable: true,
    summary:
      "Provides information about all known tips in the block tree, including the main chain and orphaned branches",
    description:
      "The getchaintips RPC command returns details about the various block tree tips, including their hieght, hash, length of the branch connecting to the main chain, and their status, such as active, valid fork, or invalid. ",
    category: "Blockchain",
    howIsThisUsed:
      "This RPC is useful for node operators and developers to understand the blockchain's branching structure, including identifying orphaned branches and the current active chain. ",
    inputs: [],
  },
  {
    method: "getchaintxstats",
    linkPath: "/rpc/getchaintxstats",
    callable: true,
    summary: "Computes transaction statistics for the blockchain",
    description:
      "The getchaintxstats RPC command calculates various transaction-related statistics over a specified number of blocks or time frame, such as the total number of transactions, transaction rate, and more, providing insights into blockchain activity.",
    howIsThisUsed:
      "This RPC command offers insights into the blockchain's efficiency and activity by analyzing transaction data over a chosen period. It's particularly valuable for understanding how transaction rates have evolved, highlighting periods of increased or decreased activity. ",
    category: "Blockchain",
    inputs: [
      {
        method: "nblocks",
        description: "default=one month. The window's size in number of blocks",
        defaultValue: "2016",
        required: false,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "blockhash",
        description: "The hash of the block",
        required: false,
        defaultValue: "chain tip",
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "getconnectioncount",
    linkPath: "/rpc/getconnectioncount",
    callable: true,
    summary: "Returns the total number of connections to other nodes",
    description:
      "This command provides the current number of connections the node has with other nodes in the network, which can be useful for monitoring the node's connectivity and network health.",
    category: "network",
    inputs: [],
    howIsThisUsed:
      "It's critical for node operators to monitor their node's connectivity to the network to ensure it is well-connected and can relay transactions and blocks efficiently. This command helps in assessing the network connectivity of a node.",
  },
  {
    method: "getdifficulty",
    linkPath: "/rpc/getdifficulty",
    summary: "Returns the current mining difficulty",
    description:
      "The getdifficulty RPC command provides the current proof-of-work difficulty as a multiple of the minimum difficulty, indicating how difficult it is to find a new block compared to the easiest it can ever be.",
    category: "blockchain",
    inputs: [],
    callable: true,
    howIsThisUsed:
      "This command is essential for miners and analysts to understand the current difficulty level for mining new blocks, reflecting the network's competitive mining environment and adjusting for changes in total mining power.",
  },
  {
    method: "getindexinfo",
    linkPath: "/rpc/getindexinfo",
    summary: "Details the operational state and sync status of node indices",
    description:
      "This RPC command provides the status of specific or all indices available in the node, indicating whether they are synced and the highest block height they are synced to.",
    category: "Util",
    callable: true,
    inputs: [
      {
        method: "index_name",
        description: "It filters results for an index with a specific name",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
    howIsThisUsed:
      "Useful for developers and node operators to check the synchronization status and progress of different blockchain indices, such as transaction or address indices, which are crucial for enabling advanced querying capabilities.",
  },
  {
    method: "getmemoryinfo",
    summary: "Provides details on memory usage within the node.",
    description: `The command returns information about the node's memory usage, offering two modes: "stats" for general memory usage statistics and "mallocinfo" for a detailed XML description of heap state. This can help in diagnosing memory issues or optimizing memory management.`,
    callable: true,
    category: "Control",
    linkPath: "/rpc/getmemoryinfo",
    inputs: [
      {
        method: "mode",
        description: `It determines what kind of information is returned. "stats" returns general statistics about memory usage in the daemon and "mallocinfo" returns an XML string describing low-level heap state (only available if compiled with glibc 2.10+)`,
        required: false,
        type: PARAMETER_TYPE.enum,
        defaultValue: "stats",
        enumValues: ["stats", "mallocinfo"],
      },
    ],
    howIsThisUsed:
      "It's crucial for node operators and developers for monitoring and optimizing the memory usage of the Bitcoin node, ensuring efficient operation.",
  },
  {
    method: "getmempoolancestors",
    linkPath: "/rpc/getmempoolancestors",
    summary:
      "Lists all transactions in the mempool that a specific transaction depends on.",
    description:
      "This command returns all ancestors of a given transaction in the mempool, either as a list of transaction IDs or as detailed information about each ancestor if verbose mode is chosen.",
    callable: true,
    category: "Util",
    howIsThisUsed:
      "It's used to analyze the dependency chain of a transaction in the mempool, crucial for understanding transaction sequencing and potential block inclusion.",
    inputs: [
      {
        method: "txid",
        description: "The transaction id, and it must be in mempool",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "verbose",
        description:
          "default=false. It returns detailed information about each transaction",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
    ],
  },
  // {
  //   method: "gettxout",
  //   linkPath: "/rpc/gettxout",
  //   description: "Returns details about an unspent transaction output",
  //   callable: true,
  //   inputs: [
  //     {
  //       method: "txid",
  //       description: "The transaction id",
  //       required: true,
  //       type: PARAMETER_TYPE.string,
  //     },
  //     {
  //       method: "n",
  //       description: "The vout number",
  //       required: true,
  //       type: PARAMETER_TYPE.number,
  //     },
  //     {
  //       method: "include_mempool",
  //       description: "Whether to include the mempool",
  //       required: false,
  //       type: PARAMETER_TYPE.boolean,
  //       defaultValue: true,
  //     },
  //   ],
  // },
];

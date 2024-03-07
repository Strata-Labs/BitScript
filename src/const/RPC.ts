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
    method: "abandontransaction",
    description:
      "Allows a user to abandon an unconfirmed transaction from the wallet.",
    linkPath: "/rpc/abandontransaction",
    callable: false,
    category: "Wallet",
    summary:
      "This command is used to mark an unconfirmed transaction as abandoned, removing it from the wallet's transaction list.",
    howIsThisUsed:
      "Few things are as frustrating as a Bitcoin transaction stuck without confirmation. You've sent funds, maybe for a service or to pay a friend, and the wait for confirmation stretches from minutes to days. The issue often lies in setting a fee too low, causing miners to overlook your transaction. The 'abandontransaction' command is your solution to reclaim these funds. While the blockchain's immutability means the transaction can't be erased, this command lets your wallet act as if the transaction never happened.",
    inputs: [
      {
        method: "TxId",
        description: "The transaction id",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "abortrescan",
    description: "Stops the wallet's ongoing rescan for transactions.",
    linkPath: "/rpc/abortrescan",
    callable: false,
    category: "Wallet",
    summary:
      "This RPC command is used to halt a rescan operation that is currently in progress within the wallet.",
    howIsThisUsed:
      "Is your computer on full throttle, sifting through every transaction in your Bitcoin wallet, and now you're having second thoughts? Just like deciding halfway through organizing your digital photos that it's too much of a hassle, the 'abortrescan' command offers a way out. When a wallet rescan—checking past transactions for accuracy—becomes unnecessary, overly lengthy, or starts by accident, 'abortrescan' steps in. This command instantly stops the rescan, freeing your wallet (and your patience) from the waiting game, allowing immediate use of your wallet while saving precious time and computer resources.",
    inputs: [],
  },
  {
    method: "addmultisigaddress",
    description:
      "Creates a multi-signature address with N required signatures out of M provided public keys.",
    linkPath: "/rpc/addmultisigaddress",
    callable: false,
    category: "Wallet",
    summary: "Used to create a multi-signature address",
    howIsThisUsed:
      "Is your group planning a pooled fund for a gift or a joint investment, agreeing that spending requires majority approval? The 'addmultisigaddress' command introduces an extra layer of security to this collaborative effort, akin to creating a shared, secured wallet. It establishes a unique Bitcoin address that mandates multiple approvals (signatures) from selected members of your group to initiate any transaction. Imagine it as a collective safe that only unlocks when enough trusted holders turn their keys simultaneously. This setup ensures that funds can only be disbursed with consensus, safeguarding your group's assets with a built-in approval mechanism.",
    inputs: [
      {
        method: "nrequired",
        description:
          "The number of required signatures out of the n keys or addresses.",
        required: true,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "keys",
        description: "The bitcoin addresses or hex-encoded public keys",
        required: true,
        type: PARAMETER_TYPE.json,
      },
      {
        method: "label",
        description: "A label to assign the addresses to.",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "address_type",
        description:
          "The address type to use. Options are “legacy”, “p2sh-segwit”, and “bech32”.",
        required: false,
        type: PARAMETER_TYPE.enum,
        enumValues: ["legacy", "p2sh-segwit", "bech32"],
      },
    ],
  },
  {
    method: "addnode",
    description:
      "Manages connections to other nodes by adding, removing, or on-demand connecting.",
    linkPath: "/rpc/addnode",
    callable: false,
    category: "Network",
    summary:
      "This command allows for the manual management of peer connections. It can add a node to the list of peers to connect, remove it, or try a one-time connection.",
    howIsThisUsed:
      "Think of your Bitcoin wallet as part of a big network, like being in a huge, bustling city. Just like in a city where you might want to make new friends, avoid certain individuals, or occasionally meet someone for coffee, the 'addnode' command helps you manage who your wallet talks to in the Bitcoin network.",
    inputs: [
      {
        method: "node",
        description: "The address of the peer to connect to",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "command",
        description:
          "'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "v2transport",
        description:
          "Attempt to connect using BIP324 v2 transport protocol (ignored for 'remove' command)",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
    ],
  },
  {
    method: "analyzepsbt",
    description:
      "Evaluates a Partially Signed Bitcoin Transaction (PSBT) to detail its completion status and next steps.",
    linkPath: "/rpc/analyzepsbt",
    callable: false,
    category: "Rawtransactions",
    summary:
      "Inspects a PSBT to provide insights into its current state, indicating which inputs are signed, whether it's ready for finalization, and the actions required for completion.",
    howIsThisUsed:
      "You're putting together a complicated puzzle with several friends, and each piece represents a part of a transaction that needs to be signed off by different people. The 'analyzepsbt' command is like having a guide that tells you which pieces of the puzzle are already in place and which ones are still missing, making it easier to see what needs to be done to complete the picture.",
    inputs: [
      {
        method: "psbt",
        description: "A base64 string of a PSBT",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "backupwallet",
    description: "Creates a backup of the wallet.",
    linkPath: "/rpc/backupwallet",
    callable: false,
    category: "Wallet",
    summary:
      "The backupwallet RPC command safely copies the wallet.dat file to a specified location, ensuring the user has a backup of their wallet's data.",
    howIsThisUsed:
      "Consider your Bitcoin wallet as a digital vault, akin to a photo album where, instead of snapshots, you store your digital currency. Similar to how you'd back up invaluable family photos to prevent loss from a computer mishap, the 'backupwallet' command enables you to create a secure copy of your Bitcoin wallet. It's like duplicating your entire collection to a USB drive or cloud service, ensuring that if your computer encounters issues, your digital assets remain safe and retrievable.",
    inputs: [
      {
        method: "destination",
        description: "The destination directory or file",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "bumpfee",
    description:
      "Increases the fee of an unconfirmed transaction to expedite its confirmation.",
    linkPath: "/rpc/bumpfee",
    callable: false,
    category: "Wallet",
    summary:
      "Utilizes the Replace-By-Fee mechanism to replace an existing unconfirmed transaction with a new one with a higher fee.",
    howIsThisUsed:
      "Imagine sending a letter and realizing you've shorted on postage, causing it to linger at the post office. In the same vein, the 'bumpfee' command is your solution for a Bitcoin transaction that's dragging due to an insufficient fee. Much like the post office sorts mail by postage value, Bitcoin miners give precedence to transactions with higher fees. If your transaction is stuck during peak network times because of a low fee, employing 'bumpfee' is akin to paying that extra postage, ensuring your digital 'letter' is prioritized and processed quicker.",
    inputs: [
      {
        method: "TxId",
        description: "The txid to be bumped",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "options",
        description: "conf_target, fee_rate, replaceable, estimate_mode",
        required: false,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  {
    method: "clearbanned",
    description: "Removes all IP addresses and subnets from the ban list.",
    linkPath: "/rpc/clearbanned",
    callable: false,
    category: "Network",
    summary:
      "Clears the list of banned nodes in the Bitcoin Core, allowing previously banned peers to connect again.",
    howIsThisUsed:
      "Imagine hosting a party at your house and deciding to not let certain guests in because of some misunderstandings. After resolving these issues, you want to welcome everyone back with open arms. The 'clearbanned' command in Bitcoin does something similar for your Bitcoin network connections. It's like opening your doors wide after realizing some guests were wrongly kept out. This command removes all the blocks you had placed on certain IP addresses or subnets, allowing them to connect with your node again.",
    inputs: [],
  },
  {
    method: "combinepsbt",
    description:
      "Merges multiple Partially Signed Bitcoin Transactions into a single PSBT.",
    linkPath: "/rpc/combinepsbt",
    callable: false,
    category: "Rawtransactions",
    summary:
      "Combines the inputs, outputs, and signatures of several PSBTs into one, facilitating collaborative transaction creation and signing among multiple parties.",
    howIsThisUsed:
      "A group of friends are working together to build a model airplane. Each of them has different parts and tools needed to complete the project. The 'combinepsbt' command is like gathering all these different pieces from everyone and assembling them into one complete model. In the Bitcoin world, a transaction can require inputs (like signatures or approvals) from multiple parties before it's complete. 'combinepsbt' takes these separate pieces—partially signed transactions from different people—and merges them into a single transaction that's ready to be finalized and sent.",
    inputs: [
      {
        method: "txs",
        description: "The base64 strings of partially signed transactions",
        required: true,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  {
    method: "createrawtransaction",
    description: "Constructs a new raw, unsigned transaction.",
    linkPath: "/rpc/createrawtransaction",
    callable: false,
    category: "Rawtransactions",
    summary:
      "Enables the creation of a custom transaction specifying inputs and outputs without signing.",
    howIsThisUsed:
      "You're creating a custom greeting card. You have all the materials laid out on your table, but you haven't glued anything together yet. The 'createrawtransaction' command in Bitcoin works similarly. It allows you to lay out all the pieces of a Bitcoin transaction — like who's sending Bitcoin and who's receiving it — without finalizing anything. This step is like preparing your card but waiting to write a personal message before you send it.",
    inputs: [
      {
        method: "inputs",
        description: "txid, vout, sequence",
        required: true,
        type: PARAMETER_TYPE.json,
      },
      {
        method: "outputs",
        description: "The outputs specified as key-value pairs.",
        required: true,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  {
    method: "createwallet",
    description:
      "Generates a new wallet with a specified name within the Bitcoin Core application.",
    linkPath: "/rpc/createwallet",
    callable: false,
    category: "Wallet",
    summary:
      "This command creates a new wallet, offering options for encryption, disabling private keys, and enabling blank wallets.",
    howIsThisUsed:
      "Picture your physical wallet having the ability to conjure separate compartments for various needs—one for groceries, another for savings, and a third for leisure spending. The 'createwallet' command in Bitcoin Core brings a similar concept to life for your digital currency. It enables you to craft new, distinct wallets within the same Bitcoin Core software, each with its own name and settings tailored to specific purposes or financial goals, akin to creating customized pockets for your diverse storing requirements.",
    inputs: [
      {
        method: "wallet_name",
        description:
          "The name for the new wallet. If this is a path, the wallet will be created at the path location.",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "disable_private_keys",
        description:
          "Disable the possibility of private keys (only watchonlys are possible in this mode).",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: "false",
      },
      {
        method: "blank",
        description:
          "Create a blank wallet. A blank wallet has no keys or HD seed. One can be set using sethdseed.",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: "false",
      },
      {
        method: "passphrase",
        description:
          "Create a blank wallet. A blank wallet has no keys or HD seed. One can be set using sethdseed.",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "avoid_reuse",
        description:
          "Keep track of coin reuse, and treat dirty and clean coins differently with privacy considerations in mind.",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: "false",
      },
      {
        method: "descriptors",
        description:
          "Create a native descriptor wallet. The wallet will use descriptors internally to handle address creation. Setting to 'false' will create a legacy wallet",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: "true",
      },
      {
        method: "load_on_startup",
        description:
          "Save wallet name to persistent settings and load on startup. True to add wallet to startup list, false to remove, null to leave unchanged.",
        required: false,
        type: PARAMETER_TYPE.boolean,
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
      "You've been handed a secret message written in a code that looks like a random string of letters and numbers, this code contains important information, but it's indecipherable without the right tool to translate it. The 'decoderawtransaction' command acts as that translator for Bitcoin transactions. It takes a transaction encoded in a complex format (hexadecimal) and converts it into a format (JSON) that's easy to read and understand, laying out all the details of the transaction such as who is sending what, to whom, and with how much fee.",
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
      "You've discovered an ancient scroll with instructions written in a mysterious, coded language. This scroll holds the secrets to unlocking a treasure, but only if you can understand its instructions. In the Bitcoin world, scripts are like these instructions, guiding how transactions are processed and secured. However, they're often written in a compact, hex-encoded format that's not easy to read. The 'decodescript' command is like the key to translating these encrypted instructions into a language you can understand, revealing the script's purpose, structure, and operational details.",
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
    method: "dumpprivkey",
    description: "Reveals the private key for a specified Bitcoin address.",
    linkPath: "/rpc/dumpprivkey",
    callable: false,
    category: "Wallet",
    summary:
      "This command is used to obtain the private key associated with a particular Bitcoin address in the wallet.",
    howIsThisUsed:
      "Visualize your Bitcoin wallet as an advanced security vault safeguarding your digital currency. Every vault is secured with a unique key, granting you the power to access your funds. The 'dumpprivkey' command functions like obtaining a duplicate of this key for a particular section of your vault (a specific Bitcoin address). Utilizing this command reveals the precise key required to unlock and transfer your funds from that address. This proves invaluable for transferring your Bitcoin to another wallet application, ensuring you can always access your funds, or recovering them in the event of a wallet malfunction.",
    inputs: [
      {
        method: "address",
        description: "The bitcoin address for the private key",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "dumpwallet",
    description:
      "A command to export all wallet keys in a human-readable format to a server-side file.",
    linkPath: "/rpc/dumpwallet",
    callable: false,
    category: "Wallet",
    summary:
      "Generates a file containing all the keys from a wallet, including private keys, in a format that can be read by humans.",
    howIsThisUsed:
      "Imagine you have a treasure chest full of valuable items, and each item has a unique lock and key. The 'dumpwallet' command is like making a detailed map that lists every key for every lock in your treasure chest. This map is stored in a file that you can read, making it easier to understand which key opens which lock. By using this command, you create a comprehensive backup of all the keys (including the secret ones) for the Bitcoin stored in your digital wallet. This is crucial for ensuring you can always access your Bitcoin, especially if your wallet software stops working, your computer crashes, or you decide to switch to a different Bitcoin wallet.",
    inputs: [
      {
        method: "filename",
        description: "The filename with path (absolute path recommended)",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "encryptwallet",
    description: "Encrypts the wallet with a passphrase.",
    linkPath: "/rpc/encryptwallet",
    callable: false,
    category: "Wallet",
    summary:
      "This command enables encryption for the wallet, requiring the passphrase for future access or transactions. It's a critical step for enhancing security.",
    howIsThisUsed:
      "Think of your Bitcoin wallet as a digital safe where you keep your digital currency secured. Just like you'd use a combination to lock a physical safe, the 'encryptwallet' command lets you set a passphrase (a complex password) that locks your wallet. Once set, this passphrase is required to open the wallet or authorize any transactions, adding an extra layer of security. This is crucial in protecting your funds from unauthorized access, whether from hackers, malware, or even physical theft of your computer or device.",
    inputs: [
      {
        method: "passphrase",
        description:
          "The pass phrase to encrypt the wallet with. It must be at least 1 character, but should be long.",
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
];

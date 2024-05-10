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
    summary:
      "Allows a user to abandon an unconfirmed transaction from the wallet.",
    linkPath: "/rpc/abandontransaction",
    callable: false,
    category: "Wallet",
    description:
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
    summary: "Stops the wallet's ongoing rescan for transactions.",
    linkPath: "/rpc/abortrescan",
    callable: false,
    category: "Wallet",
    description:
      "This RPC command is used to halt a rescan operation that is currently in progress within the wallet.",
    howIsThisUsed:
      "Is your computer on full throttle, sifting through every transaction in your Bitcoin wallet, and now you're having second thoughts? Just like deciding halfway through organizing your digital photos that it's too much of a hassle, the 'abortrescan' command offers a way out. When a wallet rescan—checking past transactions for accuracy—becomes unnecessary, overly lengthy, or starts by accident, 'abortrescan' steps in. This command instantly stops the rescan, freeing your wallet (and your patience) from the waiting game, allowing immediate use of your wallet while saving precious time and computer resources.",
    inputs: [],
  },
  {
    method: "addmultisigaddress",
    summary:
      "Creates a multi-signature address with N required signatures out of M provided public keys.",
    linkPath: "/rpc/addmultisigaddress",
    callable: false,
    category: "Wallet",
    description: "Used to create a multi-signature address",
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
    summary:
      "Manages connections to other nodes by adding, removing, or on-demand connecting.",
    linkPath: "/rpc/addnode",
    callable: false,
    category: "Network",
    description:
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
    summary:
      "Evaluates a Partially Signed Bitcoin Transaction (PSBT) to detail its completion status and next steps.",
    linkPath: "/rpc/analyzepsbt",
    callable: false,
    category: "Rawtransactions",
    description:
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
    summary: "Creates a backup of the wallet.",
    linkPath: "/rpc/backupwallet",
    callable: false,
    category: "Wallet",
    description:
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
    summary:
      "Increases the fee of an unconfirmed transaction to expedite its confirmation.",
    linkPath: "/rpc/bumpfee",
    callable: false,
    category: "Wallet",
    description:
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
    summary: "Removes all IP addresses and subnets from the ban list.",
    linkPath: "/rpc/clearbanned",
    callable: false,
    category: "Network",
    description:
      "Clears the list of banned nodes in the Bitcoin Core, allowing previously banned peers to connect again.",
    howIsThisUsed:
      "Imagine hosting a party at your house and deciding to not let certain guests in because of some misunderstandings. After resolving these issues, you want to welcome everyone back with open arms. The 'clearbanned' command in Bitcoin does something similar for your Bitcoin network connections. It's like opening your doors wide after realizing some guests were wrongly kept out. This command removes all the blocks you had placed on certain IP addresses or subnets, allowing them to connect with your node again.",
    inputs: [],
  },
  {
    method: "combinepsbt",
    summary:
      "Merges multiple Partially Signed Bitcoin Transactions into a single PSBT.",
    linkPath: "/rpc/combinepsbt",
    callable: false,
    category: "Rawtransactions",
    description:
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
    summary: "Constructs a new raw, unsigned transaction.",
    linkPath: "/rpc/createrawtransaction",
    callable: false,
    category: "Rawtransactions",
    description:
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
    summary:
      "Generates a new wallet with a specified name within the Bitcoin Core application.",
    linkPath: "/rpc/createwallet",
    callable: false,
    category: "Wallet",
    description:
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
    method: "decodepsbt",
    summary: "Decodes a PSBT to provide human-readable details.",
    linkPath: "/rpc/decodepsbt",
    callable: false,
    category: "Rawtransactions",
    description:
      "Offers insights into a PSBT's contents, including inputs, outputs, and signatures, detailing the transaction's current state and what is needed to complete it.",
    howIsThisUsed:
      "Think of a PSBT like a mystery box that contains all the pieces needed to complete a transaction, but you're not exactly sure what's inside or if anything is missing. The 'decodepsbt' command is like having x-ray vision, allowing you to see inside the box without opening it. It shows you everything about the transaction in a way that's easy to understand: who needs to sign it, how much Bitcoin is being sent, where it's going, and if there are any parts still needed before the transaction can be fully completed and sent through the Bitcoin network.",
    inputs: [
      {
        method: "psbt",
        description: "The PSBT base64 string",
        required: true,
        type: PARAMETER_TYPE.string,
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
    method: "deriveaddresses",
    summary: "Generates one or more addresses from an output descriptor.",
    linkPath: "/rpc/deriveaddresses",
    callable: false,
    category: "Util",
    description:
      "Takes an output descriptor and returns the corresponding Bitcoin address(es). It supports generating a range of addresses for descriptors that define a sequence.",
    howIsThisUsed:
      "Imagine you have a magical book that can create keys from specific instructions you give it. Each set of instructions (or 'descriptor') can produce not just one, but a whole set of keys, each opening a different lock. In the Bitcoin world, the 'deriveaddresses' command acts like this magical book. By giving it an output descriptor — a special set of instructions — you can generate one or more Bitcoin addresses. These addresses are like the keys to digital vaults where you can receive Bitcoin. This command is particularly useful when you need to create a series of addresses from a single starting point, streamlining the process of managing multiple incoming transactions or organizing funds across different addresses for privacy or organizational purposes.",
    inputs: [
      {
        method: "descriptor",
        description: "The descriptor",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "range",
        description:
          "If a ranged descriptor is used, this specifies the end or the range (in [begin,end] notation) to derive.",
        required: false,
        type: PARAMETER_TYPE.number,
      },
    ],
  },
  {
    method: "disconnectnode",
    summary:
      "Manually disconnects a node from the Bitcoin network based on either its node ID or IP address/subnet.",
    linkPath: "/rpc/disconnectnode",
    callable: false,
    category: "Network",
    description:
      "Used to sever the connection with a specific peer in the Bitcoin network. It can target a node using its unique node ID or by specifying the IP address or subnet.",
    howIsThisUsed:
      "You're the organizer of a large online meeting, and one of the attendees starts causing trouble, disrupting the conversation. You have the power to remove this person from the meeting to restore order. Similarly, the 'disconnectnode' command in the Bitcoin network allows you to manually remove a specific participant (node) from your connection list. Whether it's because they're acting maliciously, causing technical issues, or for any other reason you deem necessary, you can use this command to disconnect from them based on their unique ID or their internet address.",
    inputs: [
      {
        method: "address",
        description: "The IP address/port of the node",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "nodeid",
        description: "The node ID.",
        required: false,
        type: PARAMETER_TYPE.number,
      },
    ],
  },
  {
    method: "dumpprivkey",
    summary: "Reveals the private key for a specified Bitcoin address.",
    linkPath: "/rpc/dumpprivkey",
    callable: false,
    category: "Wallet",
    description:
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
    summary:
      "A command to export all wallet keys in a human-readable format to a server-side file.",
    linkPath: "/rpc/dumpwallet",
    callable: false,
    category: "Wallet",
    description:
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
    summary: "Encrypts the wallet with a passphrase.",
    linkPath: "/rpc/encryptwallet",
    callable: false,
    category: "Wallet",
    description:
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
    method: "enumeratesigners",
    summary: "Lists external signers.",
    linkPath: "/rpc/enumeratesigners",
    callable: false,
    category: "Signer",
    description:
      "Retrieves a list of external signers configured with the -signer option.",
    howIsThisUsed:
      "You're the manager of a security team responsible for safeguarding a valuable artifact. Each team member has a special key required to access the artifact. Similarly, in the Bitcoin world, external signers (like hardware wallets or special security devices) act as these team members, each holding a key (signing capability) to authorize transactions. The 'enumeratesigners' command is like taking roll call to see which security team members (external signers) are present and ready to protect your Bitcoin. It lists all the external devices or services you've set up to work with your Bitcoin wallet, providing details like their unique identifiers and names. This helps in managing and verifying the devices that can authorize transactions, ensuring your Bitcoin's security.",
    inputs: [],
  },
  {
    method: "estimaterawfee",
    description:
      "Estimates the required fee per kilobyte for a transaction to be confirmed within a specified number of blocks.",
    linkPath: "/rpc/estimaterawfee",
    callable: false,
    category: "Util",
    summary:
      "Utilizes historical data to predict the fee rate needed for transaction confirmation within a given block target.",
    howIsThisUsed:
      "You're trying to mail a package and want to know how much postage will get it delivered within a specific time frame. Similarly, in the Bitcoin network, when you send a transaction, you need to pay a fee to have it processed and confirmed by miners. The 'estimaterawfee' command is like asking the post office for the best postage rate to ensure your package (or transaction) arrives on time. This command estimates the optimal fee rate (per kilobyte) needed for your transaction to be confirmed within a desired number of blocks, based on current network conditions and past transaction data.",
    inputs: [
      {
        method: "conf_target",
        description: "Confirmation target in blocks (1 - 1008)",
        required: true,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "threshold",
        description:
          "The proportion of transactions in a given feerate range that must have been confirmed within conf_target in order to consider those feerates as high enough and proceed to check lower buckets.",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 0.95,
      },
    ],
  },
  {
    method: "estimatesmartfee",
    summary: "Estimates the approximate fee per kilobyte ",
    description:
      "The estimatesmartfee RPC estimates the fee per kilobyte needed for a transaction to begin confirmation within a certain number of blocks. It also provides the number of blocks of which this fee estimate is valid.",
    category: "Util",
    howIsThisUsed:
      "You're trying to catch a bus, but you're not sure how much the fare is since it changes depending on the time of day. You want to ensure you pay enough to get on the next bus without overpaying. The 'estimatesmartfee' command in the Bitcoin network functions similarly by estimating how much you need to pay for your transaction to be processed within a certain timeframe, like catching the next few 'blocks' of transactions.",
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
    method: "finalizepsbt",
    summary:
      "Completes a Partially Signed Bitcoin Transaction for broadcasting.",
    description:
      "Finalizes a PSBT by ensuring all necessary signatures are present, returning a fully signed transaction if successful.",
    category: "Rawtransactions",
    howIsThisUsed:
      "You're making a group project and everyone has to sign off on the final version before it can be submitted. Similarly, in the Bitcoin world, certain transactions require approvals (signatures) from multiple parties before they can be completed. This could be because the funds are held in a multi-signature wallet, which adds an extra layer of security by needing more than one person to agree on a transaction. The 'finalizepsbt' command acts like collecting those final signatures and approvals, checking to make sure everything is in order and that the transaction has all the necessary permissions to go ahead. Once everything checks out, it seals the transaction, making it ready to be sent out (broadcast) to the Bitcoin network for confirmation.",
    linkPath: "/rpc/finalizepsbt",
    callable: false,
    inputs: [
      {
        method: "psbt",
        description: "A base64 string of a PSBT",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "extract",
        description:
          "Extract and return the complete transaction in normal network serialization instead of the PSBT.",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
    ],
  },
  {
    method: "fundrawtransaction",
    summary: "Adds inputs and change output to a raw transaction.",
    description:
      "Automatically selects and adds inputs to a raw transaction to meet its output values, adding a change output if necessary.",
    category: "Rawtransactions",
    howIsThisUsed:
      "You're putting together a puzzle, but after starting, you realize you don't have enough pieces to complete the picture. The 'fundrawtransaction' command in the Bitcoin world acts like finding and adding the missing puzzle pieces to your transaction. When you create a raw transaction (the puzzle you're trying to complete), you might not have all the inputs (pieces) needed to match the value you want to send. This command automatically selects from your available Bitcoin, adding them as inputs to your transaction to ensure the total value matches what you're trying to send, including adding a change output if you're sending less than the total value of the inputs.",
    linkPath: "/rpc/fundrawtransaction",
    callable: false,
    inputs: [
      {
        method: "hexstring",
        description: "The hex string of the raw transaction",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "options",
        description: "",
        required: false,
        type: PARAMETER_TYPE.json,
      },
      {
        method: "iswitness",
        description:
          "Whether the transaction hex is a serialized witness transaction.",
        required: false,
        type: PARAMETER_TYPE.boolean,
      },
    ],
  },
  {
    method: "generateblock",
    summary: "Creates a block with a specified address and transactions.",
    description:
      "Allows for the manual creation of a block on the blockchain, specifying which transactions to include.",
    category: "Generating",
    howIsThisUsed:
      "You're building a miniature city, and you have the power to decide exactly which buildings to construct and where they go. The 'generateblock' command in Bitcoin is somewhat similar, but instead of buildings, you're creating blocks on the blockchain. This command allows you to manually create a block, deciding which transactions to include and directing the block rewards to a specified address. It's a tool primarily used by developers in test environments, where they can simulate how blocks are created and how transactions are confirmed without affecting the real Bitcoin network.",
    linkPath: "/rpc/generateblock",
    callable: false,
    inputs: [
      {
        method: "output",
        description:
          "The address or descriptor to send the newly generated bitcoin to.",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "transactions",
        description:
          "An array of hex strings which are either txids or raw transactions.",
        required: false,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  {
    method: "generatetoaddress",
    summary: "Mines blocks immediately to a specified address.",
    description:
      "Used to instantly mine a specified number of blocks and send the block rewards to a designated address.",
    category: "Generating",
    howIsThisUsed:
      "You're playing a video game where you can instantly create resources or items to test different strategies or simply to progress faster. In the world of Bitcoin development, the 'generatetoaddress' command serves a similar purpose but in a testing environment. By using this command, developers can instantly mine a specific number of blocks, with all the rewards from these blocks sent to a designated Bitcoin address. This is particularly useful in development and testing scenarios where you need to quickly simulate block creation to test transactions, confirmations, and the allocation of mining rewards without waiting for real-world mining conditions.",
    linkPath: "/rpc/generatetoaddress",
    callable: false,
    inputs: [
      {
        method: "nblocks",
        description: "How many blocks are generated.",
        required: true,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "address",
        description: "The address to send the newly generated bitcoin to.",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "maxtries",
        description: "How many iterations to try.",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 1000000,
      },
    ],
  },
  {
    method: "generatetodescriptor",
    summary: "Instantly mines blocks to an output specified by a descriptor.",
    description:
      "Allows for the direct mining of blocks with rewards directed to outputs defined by a descriptor, enabling more precise control over block reward allocation.",
    category: "Generating",
    howIsThisUsed:
      "You're a chef experimenting with recipes, and you need specific ingredients delivered instantly to test different dishes. In the realm of Bitcoin development, the 'generatetodescriptor' command acts as a direct delivery service for block rewards, allowing developers to instantly mine blocks and direct the rewards to outputs defined by a specific descriptor. This descriptor outlines exactly how the rewards should be distributed, offering precision in how the mined bitcoins are allocated. This functionality is particularly useful in development and testing environments where developers need to simulate block creation under specific conditions to test blockchain applications, smart contracts, or wallet functionalities.",
    linkPath: "/rpc/generatetodescriptor",
    callable: false,
    inputs: [
      {
        method: "num_blocks",
        description: "How many blocks are generated.",
        required: true,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "descriptor",
        description: "The descriptor to send the newly generated bitcoin to.",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "maxtries",
        description: "How many iterations to try.",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 1000000,
      },
    ],
  },
  {
    method: "getaddednodeinfo",
    summary:
      "Returns information about manually added (or attempted to add) peers.",
    description:
      "Provides details on peers that have been manually added through the addnode command, showing whether they are currently connected and additional connection information.",
    category: "Network",
    howIsThisUsed:
      "You've invited a group of friends to a private gathering, and you want to check who has arrived and who hasn't yet. Similarly, in the Bitcoin network, the 'getaddednodeinfo' command helps you keep track of specific peers (or nodes) you've manually invited (added) to connect with your node. By using this command, you can see which of these peers are currently connected to your node and get detailed information about their connection status. This is particularly useful for network diagnostics and managing peer relationships, ensuring your node is communicating effectively with those you've selected.",
    linkPath: "/rpc/getaddednodeinfo",
    callable: false,
    inputs: [
      {
        method: "node",
        description:
          "If provided, return information about this specific node, otherwise all nodes are returned.",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "getaddressbylabel",
    summary: "Retrieves a list of addresses associated with a given label.",
    description:
      "Returns all addresses that have been assigned a specific label, aiding in the organization and identification of various addresses used within a wallet.",
    category: "Wallet",
    howIsThisUsed:
      "Your wallet contains multiple addresses you've used for different purposes—some for personal transactions, others for business dealings, and perhaps a few for donations. Assigning a label to each group of addresses helps keep them organized. If you need to review transactions or balances associated with a specific area of your life or business, a command like 'getaddressbylabel' would let you quickly list all addresses under a chosen label.",
    linkPath: "/rpc/getaddressbylabel",
    callable: false,
    inputs: [
      {
        method: "label",
        description: "The label",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "getaddressinfo",
    summary: "Provides detailed information about a specified Bitcoin address.",
    description:
      "Returns various details on a given address, such as its validation status, whether it belongs to the wallet, the key involved, and related addresses.",
    category: "Wallet",
    howIsThisUsed:
      "You're doing a detailed background check on a car you're considering buying. You'd want to know its history, current condition, and any other relevant details before making a decision. Similarly, in the Bitcoin network, when you come across a specific address, you might want to know more about it—like whether it's valid, if it's associated with your wallet, and other pertinent details that could influence how you interact with it. The 'getaddressinfo' command serves this purpose by providing a comprehensive overview of a Bitcoin address.",
    linkPath: "/rpc/getaddressinfo",
    callable: false,
    inputs: [
      {
        method: "address",
        description: "The bitcoin address for which to get information.",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "getbalance",
    summary: "Retrieves the total available balance.",
    description:
      "Calculates and returns the total balance across all accounts or specific labels within a wallet, with options to factor in confirmations and watch-only addresses.",
    category: "Wallet",
    howIsThisUsed:
      "You're opening your banking app to check how much money you have available across all your accounts—savings, checking, and any other special accounts. You want a quick, accurate snapshot of your total funds to make informed decisions about spending, saving, or transferring money. The 'getbalance' command in Bitcoin works similarly but for your Bitcoin wallet. It gives you an immediate overview of how much Bitcoin you have available in total, across all addresses or specific labels within your wallet. This includes considering transactions that have reached a certain number of confirmations, making it a reliable way to understand your financial position in the Bitcoin network at any given time.",
    linkPath: "/rpc/getbalance",
    callable: false,
    inputs: [
      {
        method: "dummy",
        description:
          "Remains for backward compatibility. Must be excluded or set to '*'.",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "minconf",
        description:
          "Only include transactions confirmed at least this many times.",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 0,
      },
      {
        method: "include_watchonly",
        description: "Also include balance in watch-only addresses.",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
      {
        method: "avoid_reuse",
        description:
          "Do not include balance in dirty outputs; addresses are considered dirty if they have previously been used in a transaction.",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
    ],
  },
  {
    method: "getbalances",
    summary: "Shows an overview of wallet balances.",
    description:
      "Returns a detailed summary of available, pending, and total balances across different wallet categories, providing a comprehensive view of financial standing.",
    category: "Wallet",
    howIsThisUsed:
      "Imagine you have a detailed financial dashboard for all your assets, showing not just the total amount but also categorizing them based on their current status—such as what's readily available, what's pending, and what's locked for a certain period. The 'getbalances' command in the Bitcoin world acts like this dashboard for your Bitcoin wallet. It breaks down your Bitcoin holdings into detailed categories, including: Trusted Balance: Bitcoin that has received enough confirmations to be considered secure and spendable. Untrusted Pending Balance: Incoming transactions that are not yet confirmed and may still be reversible. Immature Balance: Rewards from mining or staking that are not yet spendable until a certain number of confirmations are met. This command gives you a comprehensive view of your financial standing within your Bitcoin wallet, helping you understand not just how much total Bitcoin you have, but also how much of it is readily accessible versus pending or immature.",
    linkPath: "/rpc/getbalances",
    callable: false,
    inputs: [],
  },
  {
    method: "getbestblockhash",
    summary: "Returns the hash of the best (tip) block",
    description:
      "Returns the hash for the latest block that has been completely checked and holds the greatest amount of work in the blockchain.",
    inputs: [],
    linkPath: "/rpc/getbestblockhash",
    callable: true,
    category: "Blockchain",
    howIsThisUsed:
      "Imagine you're following a trail of breadcrumbs to find your way through a forest, with each breadcrumb representing a step forward on your path. In the Bitcoin blockchain, blocks are like these breadcrumbs, and the 'getbestblockhash' command helps you identify the very last breadcrumb on the trail—the most recent block added to the blockchain. This block is considered the 'best' or 'tip' because it's the latest one that has been fully verified and contains the most cumulative computational work.",
  },
  {
    method: "getblock",
    summary: "Returns detailed information about a block in the blockchain.",
    description:
      "Retrieves information about a specific block identified by its hash.",
    linkPath: "/rpc/getblock",
    callable: false,
    category: "Blockchain",
    howIsThisUsed:
      "Imagine you're a detective looking into a specific event that happened on a particular day, and you need to gather all the details about that day's occurrences, from the weather to the people involved. In the Bitcoin blockchain, the 'getblock' command works similarly by allowing you to investigate a specific block by its hash.",
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
    method: "getblockchaininfo",
    summary: "Retrieves blockchain information",
    description:
      "Provides details about the current state of the blockchain, including data on the height, difficulty, and size on disk.",
    inputs: [],
    linkPath: "/rpc/getblockchaininfo",
    callable: true,
    category: "Blockchain",
    howIsThisUsed:
      "You're a pilot looking over the dashboard of your airplane before takeoff. You need to know key metrics like altitude, speed, and fuel level to ensure a safe flight. Similarly, in the world of Bitcoin, the 'getblockchaininfo' command acts as the dashboard for the blockchain, providing crucial information about its current state. This command gives you a snapshot of the blockchain's health and status, including: Height: This tells you how many blocks are in the blockchain, indicating how far the blockchain has grown. Difficulty: This shows how hard it is to mine a new block. Size on Disk: This metric reveals the total size of the blockchain stored on your device.",
  },
  {
    method: "getblockcount",
    summary: "Retrieves the current block count",
    description:
      "Returns the number of blocks in the longest blockchain, starting from the genesis block (height 0)",
    inputs: [],
    linkPath: "/rpc/getblockcount",
    callable: true,
    category: "Blockchain",
    howIsThisUsed:
      "You're climbing a mountain and want to know exactly how high you've climbed from sea level to gauge your progress. In the Bitcoin blockchain, the 'getblockcount' command provides a similar measure, telling you how many blocks have been added to the blockchain since the very first block, known as the genesis block. This count gives you a clear idea of the length of the blockchain, which is a direct indicator of its growth and activity over time.",
  },
  {
    method: "getblockfilter",
    summary: "Retrieves the filter for a block.",
    description:
      "Returns the block filter for the specified block. Block filters allow lightweight clients to determine whether a block contains relevant transactions without downloading the entire block.",
    inputs: [],
    linkPath: "/rpc/getblockfilter",
    callable: false,
    category: "Blockchain",
    howIsThisUsed:
      "You're at a large book fair looking for books by your favorite author without wanting to check every single book on display. A guide at the entrance gives you a special map that highlights only the stands where your author's books can be found. Similarly, in the Bitcoin network, the 'getblockfilter' command provides a 'map' (or filter) for a specific block, allowing lightweight clients (wallets not storing the entire blockchain) to quickly determine if the block contains any transactions relevant to them, without needing to download and sift through the entire block's data.",
  },
  {
    method: "getblockfrompeer",
    summary: "Requests a specific block from a connected peer.",
    description:
      "Instructs a node to attempt to fetch a specific block from a peer by its block hash.",
    linkPath: "/rpc/getblockfrompeer",
    callable: false,
    category: "Blockchain",
    howIsThisUsed:
      "You're collecting pieces of a historical map, but you're missing a crucial section that one of your contacts has found. You reach out to them to request this specific piece to complete your collection. Similarly, in the Bitcoin blockchain, if you're running a node and find yourself missing a specific block or you suspect your version of a block might be incorrect, you can use the 'getblockfrompeer' command to directly request this block from a connected peer by specifying its hash.",
    inputs: [
      {
        method: "blockhash",
        description: "The block hash to try to fetch",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "peer_id",
        description: "The peer to fetch it from (see getpeerinfo for peer IDs)",
        required: true,
        type: PARAMETER_TYPE.number,
      },
    ],
  },
  {
    method: "getblockhash",
    summary: "Returns the hash of the block provided its height.",
    linkPath: "/rpc/getblockhash",
    callable: true,
    category: "Blockchain",
    description:
      "Returns the header hash (32-bytes) of a block at the given height in the selected chain.",
    howIsThisUsed:
      "You're in a library full of books arranged in a precise order. You're looking for a book at a specific position on the shelf but only have the book's placement number, not its title. The 'getblockhash' command in the Bitcoin blockchain works in a similar way. By providing the height (or position) of a block in the blockchain (the shelf), this command returns the block's hash (like the unique title of the book), allowing you to identify and then access the block's detailed information.",
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
      "Used for quickly accessing block metadata like its position and status in the blockchain, useful for applications needing to verify block connections or sync data efficiently. It optimizes resource use by avoiding the download of full block contents.",
    category: "Blockchain",
    howIsThisUsed:
      "You're researching the history of a long and ancient wall, wanting to understand the sequence of its construction and the current status of each segment without examining every brick in detail. The 'getblockheader' command in Bitcoin offers a similar approach to examining the blockchain. By providing the hash of a specific block, you can retrieve crucial metadata about that block—such as its position in the blockchain (height), the time it was mined, and its relationship to other blocks (previous and next blocks)—without needing to download and inspect the entire block's contents, which include all transactions.",
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
      "Computes detailed statistics for a specific block identified by its height or hash. It provides insights into various metrics such as average fee, transaction sizes, block size, and more, offering valuable data for analysis and optimization of blockchain operations.",
    category: "Blockchain",
    howIsThisUsed:
      "You're a sports analyst trying to understand the performance of a basketball team during a specific game. You'd look into various statistics like points scored, rebounds, assists, and more for that game. Similarly, the 'getblockstats' command allows blockchain analysts, developers, and researchers to dive into the specifics of a Bitcoin block, examining detailed statistics like the average transaction fee, the size of transactions, the total size of the block, and other key metrics. This information is invaluable for understanding how the blockchain is being used at a specific point in time, identifying trends, and making informed decisions about blockchain operations and optimizations.",
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
    method: "getblocktemplate",
    summary: "Provides a template for a new block.",
    linkPath: "/rpc/getblocktemplate",
    callable: false,
    description:
      "Returns data needed to construct a block to work on, such as transactions to include, suggested fees, and other information relevant to miners.",
    category: "Mining",
    howIsThisUsed:
      "You're an architect about to start work on a new building. Before you begin, you need a blueprint that outlines what needs to be built, the materials to use, and other specifications. Similarly, in the world of Bitcoin mining, the 'getblocktemplate' command serves as the blueprint for constructing a new block. It provides miners with the necessary information to begin mining a new block, including which transactions to include, the fees associated with those transactions, and various other parameters critical to the mining process.",
    inputs: [
      {
        method: "template_request",
        description: "Format of the template",
        required: false,
        type: PARAMETER_TYPE.json,
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
      "Returns details about the various block tree tips, including their hieght, hash, length of the branch connecting to the main chain, and their status, such as active, valid fork, or invalid. ",
    category: "Blockchain",
    howIsThisUsed:
      "Imagine you're exploring a forest that has multiple paths leading in different directions. Some paths connect back to the main trail, while others are dead ends or less traveled and become overgrown. In the Bitcoin blockchain, the 'getchaintips' command helps you understand the layout of this forest by showing you all the known 'paths' or tips in the block tree. This includes the main path (the active blockchain), as well as all the side trails (orphaned branches and forks) that have formed over time. Each tip is detailed by its height (how long the path is), hash (a unique identifier), the length of the branch connecting it to the main chain, and its status (whether it's the active path, a valid but not chosen fork, or an invalid path).",
    inputs: [],
  },
  {
    method: "getchaintxstats",
    linkPath: "/rpc/getchaintxstats",
    callable: true,
    summary: "Computes transaction statistics for the blockchain",
    description:
      "Calculates various transaction-related statistics over a specified number of blocks or time frame, such as the total number of transactions, transaction rate, and more, providing insights into blockchain activity.",
    howIsThisUsed:
      "You're a demographer studying the population growth of a city over time, analyzing birth rates, migration patterns, and other demographic statistics to understand trends and predict future changes. Similarly, the 'getchaintxstats' command allows blockchain analysts, developers, and enthusiasts to study the Bitcoin blockchain's 'demographics' by examining transaction statistics. By specifying a number of blocks or a time frame, users can obtain key metrics about blockchain transactions, such as the total number of transactions, the rate at which transactions are happening, and other valuable data. This insight helps users understand the blockchain's activity levels, efficiency, and growth trends.",
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
      "Provides the current number of connections the node has with other nodes in the network, which can be useful for monitoring the node's connectivity and network health.",
    category: "Network",
    inputs: [],
    howIsThisUsed:
      "You're managing a communication network for a large organization, and you need to ensure that your central hub is effectively connected to all departments to facilitate smooth information flow. Similarly, in the Bitcoin network, the 'getconnectioncount' command acts like a tool for node operators to check how well their node is connected to the rest of the network. This command tells you the total number of active connections your node has with other nodes, providing a snapshot of its connectivity and network health. Good connectivity is crucial for a node to receive and transmit transactions and blocks promptly, ensuring it stays up-to-date with the latest blockchain data.",
  },
  {
    method: "getdeploymentinfo",
    linkPath: "/rpc/getdeploymentinfo",
    callable: false,
    summary: "Provides information about consensus rule changes.",
    description:
      "Returns details on the status of network-wide consensus rule changes, including those currently active, locked in, or upcoming.",
    category: "Blockchain",
    inputs: [
      {
        method: "blockhash",
        description: "The block hash at which to query deployment state",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
    howIsThisUsed:
      "You're part of a community that decides on new rules or modifications to existing ones through a collective agreement process. To make informed decisions or understand the current state of these rules, you would need a reliable way to track which proposals have been accepted, which are pending, and which have been fully implemented. In the Bitcoin network, the 'getdeploymentinfo' command serves a similar purpose for tracking changes to consensus rules, which are implemented through mechanisms like soft forks.",
  },
  {
    method: "getdescriptorinfo",
    linkPath: "/rpc/getdescriptorinfo",
    callable: false,
    summary: "Analyzes a descriptor and returns detailed information.",
    description:
      "Provides checksum, type, address, and script information for a given descriptor, aiding in wallet and transaction management.",
    category: "Util",
    inputs: [
      {
        method: "blockhash",
        description: "The block hash at which to query deployment state",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
    howIsThisUsed:
      "You're a linguist trying to decode an ancient script. You have a tool that not only translates the script into your language but also provides context about its use, origins, and variations. In the digital realm of Bitcoin, the 'getdescriptorinfo' command acts as this tool for 'descriptors', which are compact, expressive formats that convey detailed information about how Bitcoin addresses are generated from scripts. This command analyzes a given descriptor and returns comprehensive information, including its checksum (for verification), type (P2PKH, P2SH, etc), and the resulting address or script. This is invaluable for developers and users managing advanced wallet functionalities, ensuring accuracy and efficiency in transactions and address generation.",
  },
  {
    method: "getdifficulty",
    linkPath: "/rpc/getdifficulty",
    summary: "Returns the current mining difficulty",
    description:
      "Provides the current proof-of-work difficulty as a multiple of the minimum difficulty, indicating how difficult it is to find a new block compared to the easiest it can ever be.",
    category: "blockchain",
    inputs: [],
    callable: true,
    howIsThisUsed:
      "You're a climber looking to scale a mountain, and you want to know how difficult the climb will be compared to other mountains you've climbed. The 'getdifficulty' command in the Bitcoin network offers similar information but for miners. It tells you how hard it is to find a new block at the current moment, compared to the easiest possible scenario. This difficulty adjusts automatically over time, based on the total computing power of all miners on the network, to ensure that blocks are found approximately every 10 minutes.",
  },
  {
    method: "getindexinfo",
    linkPath: "/rpc/getindexinfo",
    summary: "Details the operational state and sync status of node indices",
    description:
      "Provides the status of specific or all indices available in the node, indicating whether they are synced and the highest block height they are synced to.",
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
      "You're managing a library with several catalogs indexing different types of books, from fiction to science to history. You need to know which catalogs are up-to-date, so you can inform readers about the availability and latest additions to your collection. Similarly, in the Bitcoin blockchain, the 'getindexinfo' command helps node operators and developers check the status of various blockchain indices managed by their node. These indices could include transaction indices, address indices, or any other specialized indices that enhance the node's ability to query blockchain data efficiently.",
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
      "You're running a complex computer system for a large corporation, and you need to constantly monitor the system's memory usage to ensure it runs smoothly and efficiently. In the Bitcoin network, the 'getmemoryinfo' command serves a similar purpose for node operators and developers. It allows them to monitor how much memory their Bitcoin node is using, helping them diagnose any potential issues or inefficiencies that could affect the node's performance.",
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
      "You're assembling a complex puzzle that requires putting together several groups of pieces before you can connect them into the final picture. Similarly, in the Bitcoin network, a transaction may depend on other transactions that must be confirmed before it can be processed. The 'getmempoolancestors' command is like getting a list of all the smaller groups of puzzle pieces (ancestor transactions) you need to assemble first to understand the whole picture (the transaction chain).",
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
  {
    method: "getmempoolinfo",
    linkPath: "/rpc/getmempoolinfo",
    summary:
      "Provides information about the current state of the transaction memory pool",
    description:
      "The getmempoolinfo RPC method returns detailed information regarding the active state of the transaction memory pool. It offers insights into various aspects such as the total number of transactions in the mempool, the sum of all virtual transaction sizes, total memory usage, maximum memory usage allowed for the mempool, the minimum fee rates for transactions to be accepted, and the number of transactions that have not yet been broadcast successfully.",
    callable: true,
    category: "blockchain",
    howIsThisUsed:
      "getmempoolinfo is essential for monitoring and analyzing the mempool's current state, helping users and developers understand mempool congestion, estimate transaction fees more accurately, and gauge the overall activity and health of the network. By providing data on the size, bytes, usage, and fees related to the mempool, it aids in making informed decisions for transaction submissions and optimizations.",
    inputs: [],
  },
  {
    method: "getrawmempool",
    linkPath: "/rpc/getrawmempool",
    summary:
      "Provides a list of all transaction IDs present in the mempool as a JSON formatted array of strings.",
    description:
      "The getrawmempool RPC command is used to retrieve all transactions currently in the mempool",
    callable: true,
    category: "blockchain",
    howIsThisUsed:
      "This command is crucial for developers and analysts who need to understand the current state of the mempool, analyze transaction flows, or estimate transaction fees based on current mempool congestion. Detailed information provided in verbose mode can help in assessing transaction fees, sizes, and their potential impact on future block inclusion",
    inputs: [
      {
        method: "verbose",
        description: "It returns detailed information about each transaction",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
      {
        method: "mempool_sequence",
        description:
          "It returns a JSON object with transaction list and mempool sequence number attached",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
    ],
  },

  {
    method: "getrawtransaction",
    linkPath: "/rpc/getrawtransaction",
    summary:
      "Retrieves the raw transaction data for a specified transaction ID",
    description:
      "The getrawtransaction RPC command is used to obtain the raw transaction data for a given transaction ID. It can return either a serialized, hex-encoded string of the transaction data or a detailed JSON object containing comprehensive information about the transaction, depending on the verbosity level specified. By default, it operates on transactions in the mempool but can also retrieve data for transactions in specific blocks if a blockhash is provided. ",
    callable: true,
    category: "rawtransactions",
    howIsThisUsed:
      "This command is used extensively for blockchain analysis, debugging transaction issues, and verifying transaction details outside of the wallet context. It allows developers, analysts, and users to access detailed information about a transaction's composition, such as its inputs and outputs, size, and inclusion in a block. This is particularly useful for applications that need to verify transaction details programmatically or for anyone conducting an in-depth analysis of transaction flows and blockchain data",
    inputs: [
      {
        method: "txid",
        description: "The transaction ID",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "verbose",
        description:
          " A numeric parameter that can take one of the following values: '0' for hex-encoded data, '1' for JSON object and '2' for JSON object with fee and prevout",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 0,
      },
      {
        method: "blockhash",
        description: "The block in which to look for the transaction",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
  },

  {
    method: "gettxoutproof",
    linkPath: "/rpc/gettxoutproof",
    summary:
      "Generates a proof that one or more transactions were included in a block.",
    description:
      "The gettxoutproof RPC command returns a hex-encoded proof showing that specific transaction IDs were included in a block. This proof is essentially a Merkle path which is useful for verifying that transactions are part of a block without requiring the entire block's data. ",
    callable: true,
    category: "blockchain",
    howIsThisUsed:
      "This command is used primarily for lightweight or SPV (Simplified Payment Verification) clients that do not download the entire blockchain but still require proof of transaction inclusion in a block. By obtaining a Merkle proof, these clients can verify transactions without needing the full block data, enabling more efficient storage and bandwidth usage while maintaining security assurances about transaction inclusion​",
    inputs: [
      {
        method: "txids",
        description: "An array of transaction hashes",
        required: true,
        type: PARAMETER_TYPE.json,
      },
      {
        method: "blockhash",
        description: "If specified, looks for txid in the block with this hash",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
  },

  {
    method: "gettxoutsetinfo",
    linkPath: "/rpc/gettxoutsetinfo",
    summary:
      "Delivers detailed insights into the state of unspent transaction outputs across the network.",
    description:
      "The gettxoutsetinfo RPC command returns detailed statistics about the state of the UTXO set, which represents all unspent transaction outputs on the blockchain. This includes information such as the total number of UTXOs, the total amount of bitcoin in those UTXOs, and the disk size used by the UTXO set.",
    callable: true,
    category: "blockchain",
    howIsThisUsed:
      "This command is crucial for developers and analysts who need to understand the current state of the blockchain's UTXO set for performance analysis, blockchain optimization, or economic research. By providing a snapshot of unspent outputs, it helps in assessing the distribution and availability of funds across the network. The command's ability to generate UTXO set hashes also aids in verifying the integrity of the UTXO set across different nodes.",
    inputs: [
      {
        method: "hash_type",
        description:
          "It tells about which UTXO set hash should be calculated, with the possible values: hash_serialized_3, none , muhash If not provided, default is set to be hash_serialized_3",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "hash_or_height",
        description:
          "The block hash or height of the target height. If not provided, default is set to be the current best block",
        type: PARAMETER_TYPE.string || PARAMETER_TYPE.number,
      },
      {
        method: "use_index",
        description:
          "Use coinstatsindex if available. If not provided, default is set to be true",
        type: PARAMETER_TYPE.boolean,
      },
    ],
  },
  {
    method: "gettxout",
    linkPath: "/rpc/gettxout",
    summary:
      "Fetches details about a specific unspent transaction output (UTXO).",
    description:
      "The gettxout RPC command is used to obtain information about a specified unspent transaction output. The output must not be spent at the time of the query. The command can check for the UTXO in the mempool by default, unless specified otherwise. It provides details such as the block in which the transaction is included (bestblock), the number of confirmations, the value of the output in BTC, and details about the script public key including the type, required signatures, and associated addresses",
    callable: true,
    category: "blockchain",
    howIsThisUsed:
      "This command is essential for verifying the existence and details of specific unspent transaction outputs, especially useful for wallet applications, explorers, or any service requiring confirmation of transaction finality and output details. It helps in assessing whether a UTXO is spendable and gathering necessary details for crafting new transactions.",
    inputs: [
      {
        method: "txid",
        description: "The transaction ID",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "n",
        description: "Vout number",
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
    method: "sendrawtransaction",
    linkPath: "/rpc/sendrawtransaction",
    summary:
      "Submits a serialized, hex-encoded transaction to the local node and network for processing.",
    description:
      "The sendrawtransaction RPC command allows users to submit a pre-signed transaction to the network. The transaction is specified in a serialized, hex-encoded format.",
    callable: true,
    category: "rawtransactions",
    howIsThisUsed:
      "This command is used to broadcast a transaction to the network after it has been created and signed. It's a critical step in executing transactions, allowing them to be included in blocks by miners. The command is particularly useful for applications or services that construct transactions programmatically, such as wallets or payment processors.",
    inputs: [
      {
        method: "hexstring",
        description: "The transaction hex string",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "maxfeerate",
        description:
          " It rejects transactions with a fee rate higher than the specified value. It can be set to 0 to accept any fee rate",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 0.1,
      },
    ],
  },

  {
    method: "submitpackage",
    linkPath: "/rpc/submitpackage",
    summary:
      "Submits a package of raw transactions to the local node for validation and addition to the mempool",
    description:
      "The submitpackage RPC allows submitting a set of related raw transactions (a child with its unconflicted parents) in hex format. This package undergoes consensus and mempool policy checks. If successful, transactions are added to the mempool. ",
    callable: true,
    category: "rawtransactions",
    howIsThisUsed:
      "It's used for submitting transaction chains that depend on each other for more efficient mempool acceptance, especially useful for complex transaction constructions that include multiple dependencies",
    inputs: [
      {
        method: "package",
        description: "An array of raw transactions",
        required: true,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  {
    method: "testmempoolaccept",
    linkPath: "/rpc/testmempoolaccept",
    summary:
      "Checks if raw transactions would be accepted into the mempool without violating consensus or policy rules",
    description:
      "This RPC command assesses whether submitted raw transactions, provided in hex format, meet the criteria for mempool acceptance without actually adding them to the mempool. It evaluates against consensus and policy restrictions.",
    callable: true,
    category: "rawtransactions",
    howIsThisUsed:
      "To verify in advance if transactions will be accepted by the mempool, useful for testing transaction validity before submission​",
    inputs: [
      {
        method: "rawtxs",
        description: "An array of raw transactions in the form of a hex string",
        required: true,
        type: PARAMETER_TYPE.json,
      },

      {
        method: "maxfeerate",
        description:
          "It rejects transactions with a fee rate higher than the specified value, and it is set to 0 to accept any fee rate",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 0.1,
      },
    ],
  },
  {
    method: "validateaddress",
    linkPath: "/rpc/validateaddress",
    summary:
      "Analyzes a Bitcoin address to determine its validity and provides related information",
    description:
      "The validateaddress RPC command is utilized to verify if a Bitcoin address is valid and to gather detailed information about it. This includes whether the address is a correct Bitcoin address, its associated script (if applicable), and whether the address is part of the user's wallet.",
    callable: true,
    category: "util",
    howIsThisUsed:
      "It's primarily used for validating Bitcoin addresses before engaging in transactions, ensuring addresses are correct and to confirm ownership and address details.",
    inputs: [
      {
        method: "address",
        description: "The Bitcoin address to validate",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "verifymessage",
    linkPath: "/rpc/verifymessage",
    summary:
      "Confirms the authenticity of a signed message, verifying it was signed by the private key of a specified Bitcoin address.",
    description:
      "The verifymessage RPC command checks if a message has been signed with the private key corresponding to a given Bitcoin address, ensuring the integrity and origin of the message. It's essential for validating ownership or authorship of messages in a secure manner without exposing private keys.",
    callable: true,
    category: "util",
    howIsThisUsed:
      "Employed to prove ownership of a Bitcoin address or to verify that a message sender holds the private key, enhancing security and trust in communications related to Bitcoin transactions.",
    inputs: [
      {
        method: "address",
        description: "The bitcoin address to use for the signature",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "signature",
        description: "The signature provided by the signer in base 64 encoding",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "message",
        description: "The message that was signed",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  //stars from here

  {
    method: "getmempooldescendants",
    linkPath: "/rpc/getmempooldescendants",
    summary:
      "Returns all descendant transactions in the mempool for a given transaction ID",
    description:
      "The getmempooldescendants RPC command is used to return all transactions within the mempool that are descendants of a given transaction ID. The command can output either a simple list of transaction IDs or a detailed JSON object for each descendant transaction, based on the verbose parameter.",
    callable: true,
    category: "blockchain",
    howIsThisUsed:
      "This command is crucial for applications and services that need to analyze the mempool for transaction dependencies, estimate fees, or assess the impact of unconfirmed transactions on the network. By identifying all descendants of a specific transaction, users can understand how a particular transaction affects the mempool, including potential delays in confirmation or increases in fees due to the size and complexity of the transaction chain.",
    inputs: [
      {
        method: "txid",
        description: "The transaction ID",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "verbose",
        description: "A boolean value to determine the output format",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
    ],
  },

  {
    method: "getmempoolentry",
    linkPath: "/rpc/getmempoolentry",
    summary:
      "Retrieves detailed information about a transaction in the mempool",
    description:
      "This command returns data on a specific transaction in the mempool, such as its size, fees, and its state within the mempool.",
    callable: true,
    category: "blockchain",
    howIsThisUsed:
      "It's used to inspect the status and details of transactions waiting to be confirmed, aiding in transaction tracking and analysis.",
    inputs: [],
  },

  {
    method: "getmininginfo",
    linkPath: "/rpc/getmininginfo",
    summary: "Provides an overview of the mining aspects of the node.",
    description:
      "This command returns various statistics about the mining process, such as the current difficulty, the number of blocks, and the estimated network hashes per second.",
    callable: false,
    category: "mining",
    howIsThisUsed:
      "It's used to gather comprehensive information on the node's mining activities and the network's mining status, useful for miners and analysts monitoring the health and competitiveness of the mining environment.",
    inputs: [],
  },
  {
    method: "getnettotals",
    linkPath: "/rpc/getnettotals",
    summary: "Summarizes network traffic statistics.",
    description:
      "Provides total bytes received and sent by the node, giving insights into the volume of data it's processing over the network.",
    callable: false,
    category: "network",
    howIsThisUsed:
      "To monitor the node's data exchange with the Bitcoin network, helping in assessing network health and performance",
    inputs: [],
  },
  //////
  {
    method: "getnetworkhashps",
    linkPath: "/rpc/getnetworkhashps",
    summary: "Calculates the estimated current or historical network hashrate.",
    description:
      "This command estimates the total hashrate of the Bitcoin network by calculating the number of hashes performed to mine recent blocks.",
    callable: false,
    category: "mining",
    howIsThisUsed:
      "It's used to gauge the overall power and security of the Bitcoin network by understanding the cumulative hashing effort contributed by miners.",
    inputs: [
      {
        method: "nblocks",
        description:
          "The number of blocks, or -1 for blocks since last difficulty change.",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 120,
      },
      {
        method: "height",
        description: "To estimate at the time of the given height.",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: -1,
      },
    ],
  },
  {
    method: "getnetworkinfo",
    linkPath: "/rpc/getnetworkinfo",
    summary:
      "Provides detailed information about the node's view of the network.",
    description:
      "Offers a comprehensive overview of the network status, including version details, protocol information, network active status, and the number of connections.",
    callable: false,
    category: "network",
    howIsThisUsed:
      "Essential for understanding the node's connectivity and operational status within the Bitcoin network, facilitating network diagnostics and monitoring.",
    inputs: [],
  },
  {
    method: "getnewaddress",
    linkPath: "/rpc/getnewaddress",
    summary: "Generates a new Bitcoin address for receiving payments.",
    description:
      "Creates and returns a new address that is added to the wallet, with an optional label for organizational purposes.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "To safely receive funds by providing a fresh address, enhancing privacy and security for transactions.",
    inputs: [
      {
        method: "label",
        description:
          "The label name for the address to be linked to. It can also be set to the empty string “” to represent the default label. The label does not need to exist, it will be created if there is no label by the given name.",
        required: false,
        type: PARAMETER_TYPE.string,
        defaultValue: "",
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
  //this has only 1 input but the spreadsheet has 2
  {
    method: "getnodeaddresses",
    linkPath: "/rpc/getnodeaddresses",
    summary: "Retrieves a list of known Bitcoin network node addresses.",
    description:
      "This command fetches and returns information about the addresses of nodes in the Bitcoin network, potentially useful for network analysis and establishing connections.",
    callable: false,
    category: "network",
    howIsThisUsed:
      "To discover peers within the Bitcoin network, aiding in connectivity and network analysis tasks.",
    inputs: [
      {
        method: "count",
        description:
          "The maximum number of addresses to return. Specify 0 to return all known addresses.",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 1,
      },
    ],
  },
  {
    method: "getpeerinfo",
    linkPath: "/rpc/getpeerinfo",
    summary: "Provides detailed information on each connected peer.",
    description:
      "This command outputs data regarding the nodes connected to the user's node, including IP addresses, connection uptime, and version.",
    callable: false,
    category: "network",
    howIsThisUsed:
      "To monitor and troubleshoot network connections, offering insights into the peers' status, activity, and potential issues in the network communication.",
    inputs: [],
  },
  {
    method: "getrawchangeaddress",
    linkPath: "/rpc/getrawchangeaddress",
    summary: "Generates a new change address.",
    description:
      "This command creates a new address for change that is not visible in the main user interface, helping maintain transaction privacy.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "To provide a fresh address where the 'change' from a transaction can be sent, enhancing privacy by not reusing addresses.",
    inputs: [
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
  //doesn't tally with the spreadsheet there are only 2 inputs
  {
    method: "getreceivedbyaddress",
    linkPath: "/rpc/getreceivedbyaddress",
    summary:
      "Reports the total amount received by a specified Bitcoin address.",
    description:
      "Calculates the cumulative amount of Bitcoin sent to an address across all confirmed transactions, aiding in tracking funds.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "It's used to verify and assess the total value received at a particular address, important for accounting and financial oversight.",
    inputs: [
      {
        method: "address",
        description: "The bitcoin address for transactions",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "minconf",
        description:
          "Only include transactions confirmed at least this many times",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 1,
      },
    ],
  },
  {
    method: "getreceivedbylabel",
    linkPath: "/rpc/getreceivedbylabel",
    summary:
      "Shows the total amount received by addresses with a specific label.",
    description:
      "Aggregates and reports the total amount of Bitcoin received by all addresses under a given label, providing a way to track funds by category or purpose.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "Useful for organizing and monitoring incoming transactions by labels, aiding in financial management and oversight within a Bitcoin wallet.",
    inputs: [
      {
        method: "label",
        description: "The label name",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "minconf",
        description:
          "Only include transactions confirmed at least this many times",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 1,
      },
    ],
  },
  {
    method: "getrpcinfo",
    linkPath: "/rpc/getrpcinfo",
    summary: "Provides details on the RPC server's current state.",
    description:
      "This command returns information about the RPC server, including active commands and their duration, useful for monitoring and debugging RPC-related activities.",
    callable: false,
    category: "control",
    howIsThisUsed:
      "To assess the performance and status of RPC calls being processed by the node, aiding in the optimization and troubleshooting of the server's operation.",
    inputs: [],
  },
  {
    method: "gettransaction",
    linkPath: "/rpc/gettransaction",
    summary:
      "Retrieves detailed information about a specific transaction in the wallet.",
    description:
      "This command provides comprehensive details on a particular transaction, including the amount, fee, confirmations, and transaction ID.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "To track and audit transactions within the wallet, offering insights into their status, impact on balance, and more, essential for financial monitoring and reporting.",
    inputs: [
      {
        method: "txid",
        description: "The transaction ID",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "include_watchonly",
        description:
          "Whether to include watch-only addresses in balance calculation and details[]",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },

      {
        method: "verbose",
        description:
          "Whether to include a decoded field containing the decoded transaction (equivalent to RPC decoderawtransaction)",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
    ],
  },

  // This method is not in https://developer.bitcoin.org/reference/rpc/
  {
    method: "gettxspendingprevout",
    linkPath: "/rpc/gettxspendingprevout",
    summary:
      "Scans the mempool to find transactions spending specified outputs.",
    description:
      "The gettxspendingprevout command scans the memory pool (mempool) to identify transactions that spend any of the specified outputs. Users provide a list of transaction outputs to check, each comprising a transaction ID (txid) and the output number (vout). The command then returns details about the transactions spending these outputs, if any, including their transaction ID and output number.",
    callable: false,
    category: "blockchain",
    howIsThisUsed:
      "This command is valuable for monitoring the usage of specific outputs in the mempool. It helps users track transactions that are spending outputs associated with their addresses or transactions. This information is crucial for understanding the status of pending transactions and potential double-spending attempts, providing insights into the transactional activity within the Bitcoin network.",
    inputs: [
      // {
      //   method: "prevouts",
      //   description:
      //     "An array of objects containing transaction IDs and output numbers",
      //   required: true,
      //   type: PARAMETER_TYPE.json,
      // },
    ],
  },

  {
    method: "getwalletinfo",
    linkPath: "/rpc/getwalletinfo",
    summary: "Retrieves various state information about the wallet.",
    description:
      "The getwalletinfo command provides a comprehensive overview of the current state of the wallet. It returns details such as the wallet name, version, database format, balances (including unconfirmed and immature balances), total transaction count, key pool information, transaction fee configuration, HD seed ID (if enabled), private key status, avoidance of address reuse, scanning details if a scan is in progress, descriptor usage, and external signer configuration.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is crucial for users to understand the status and configuration of their wallet. It provides essential information for managing wallet resources, monitoring balances, configuring transaction fees, and ensuring security. Users can use this command to track wallet activity, manage keys, and adjust settings according to their needs, ensuring smooth operation and security of their Bitcoin wallet.",
    inputs: [],
  },

  //not in the rpc api reference too
  {
    method: "getzmqnotifications",
    linkPath: "/rpc/getzmqnotifications",
    summary:
      "Retrieves information about currently active ZeroMQ notifications.",
    description:
      "The getzmqnotifications command allows users to retrieve details about the currently active ZeroMQ notifications. It returns a list of JSON objects, each containing information about a specific notification, including its type, publisher address, and outbound message high water mark.",
    callable: false,
    category: "zmq",
    howIsThisUsed:
      "This command is essential for users who utilize ZeroMQ notifications in their Bitcoin application or infrastructure. It provides insight into the types of notifications being received, along with the associated publisher addresses and message handling settings. Understanding active ZeroMQ notifications is crucial for monitoring and integrating Bitcoin-related events and data streams into external systems and applications effectively.",
    inputs: [],
  },

  {
    method: "help",
    linkPath: "/rpc/help",
    summary:
      "Provides assistance for available RPC commands or a specified command.",
    description:
      "The help command enables users to access information about available RPC commands or get detailed help for a specific command if specified. It lists all accessible commands by default. If a specific command is provided as an argument, it returns detailed help text for that command.",
    callable: false,
    category: "control",
    howIsThisUsed:
      "This command is useful for users to explore available RPC commands and understand their functionalities. It helps users discover the capabilities of the RPC interface and provides assistance in utilizing specific commands effectively. By offering detailed help text, users can learn how to interact with the Bitcoin Core software via RPC and leverage its features for various purposes.",
    inputs: [
      {
        method: "command",
        description: "The command to get help on",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
  },

  {
    method: "importaddress",
    linkPath: "/rpc/importaddress",
    summary: "Adds a watch-only address or script to the wallet.",
    description:
      "The importaddress command enables the addition of a Bitcoin address or script (in hexadecimal format) to the wallet, allowing it to be monitored as if it were part of the wallet. However, the imported address cannot be used to spend funds. A new wallet backup is required after importing an address.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is useful for monitoring external addresses or scripts within the wallet, providing visibility into their transactions and balances without having control over the funds. It is commonly used for tracking cold storage addresses, exchanges, or other external services.",
    inputs: [
      {
        method: "address",
        description: "The Bitcoin address (or hex-encoded script)",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "label",
        description: "An optional label",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "rescan",
        description: "Rescan the wallet for transactions",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
      {
        method: "p2sh",
        description: "Add the P2SH version of the script as well",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
    ],
  },
  {
    method: "importdescriptors",
    linkPath: "/rpc/importdescriptors",
    summary: "Imports descriptors and triggers a blockchain rescan.",
    description:
      "The importdescriptors command facilitates the importation of descriptors, which define addresses or scripts to be monitored by the wallet. Upon import, it triggers a rescan of the blockchain starting from the specified timestamp or the current synced blockchain time.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is essential for synchronizing the wallet with external descriptors, enabling users to monitor addresses or scripts generated outside of the wallet environment. It facilitates tracking of funds associated with these descriptors and ensures that the wallet's transaction history is up-to-date. By specifying timestamps and other parameters, users can control the scope and behavior of the blockchain rescan, optimizing the process for their specific needs. This command is particularly useful for integrating Bitcoin wallets with external systems, applications, or hardware wallets.",
    inputs: [
      {
        method: "requests",
        description: "Data to be imported",
        required: true,
        type: PARAMETER_TYPE.json,
      },
    ],
  },

  //TODO: ask about this
  {
    method: "importmulti",
    linkPath: "/rpc/importmulti",
    summary:
      "Imports addresses or scripts and optionally performs a blockchain rescan.",
    description:
      "The importmulti command enables the importation of addresses or scripts, along with their associated private or public keys, redeem scripts (P2SH), or descriptors. It allows for the simultaneous import of multiple addresses or scripts and performs a blockchain rescan starting from the earliest creation time of the imported entities.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is crucial for managing a wallet's address and script portfolio, allowing users to monitor and interact with multiple external entities simultaneously. It streamlines the process of importing addresses or scripts with their associated keys or descriptors, ensuring that the wallet remains synchronized with external entities. By specifying options such as rescan, users can control whether a blockchain rescan is performed and optimize the import process according to their requirements. This command is particularly useful for integrating the wallet with external systems, applications, or hardware wallets.",
    inputs: [
      {
        method: "requests",
        description: "Data to be imported",
        required: true,
        type: PARAMETER_TYPE.json,
      },
      {
        method: "options",
        description: "An object containing options",
        required: false,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  {
    method: "importprivkey",
    linkPath: "/rpc/importprivkey",
    summary: "Adds a private key to the wallet.",
    description:
      "The importprivkey command adds a private key, obtained using the dumpprivkey command, to the wallet. It enables access to funds associated with the imported private key. A new wallet backup is required after importing a private key.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is essential for users who want to access funds associated with private keys outside of their wallet. It allows users to import private keys into the wallet, enabling them to spend or manage the associated funds directly within the wallet environment. Users can specify labels to organize imported private keys and choose whether to trigger a blockchain rescan to synchronize wallet transactions with the imported private key. This command is commonly used when users want to consolidate funds from multiple sources or manage cold storage addresses within their wallet.",
    inputs: [
      {
        method: "privkey",
        description: "The private key",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "label",
        description: "An optional label",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "rescan",
        description: "Rescan the wallet for transactions",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
    ],
  },

  {
    method: "importprunedfunds",
    linkPath: "/rpc/importprunedfunds",
    summary: "Imports funds into the wallet without performing a rescan.",
    description:
      "For pruned wallets, enabling users to import funds without triggering a rescan. The corresponding address or script must already exist in the wallet. Users are responsible for importing subsequent transactions spending the imported outputs or performing a rescan after the relevant point in the blockchain.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is particularly useful for users managing pruned wallets who need to import funds from specific transactions. By importing funds without triggering a rescan, users can efficiently manage their wallet's funds without needing to synchronize with the entire blockchain. It allows users to work with pruned wallet setups while still accessing and managing their funds effectively. However, users must ensure that any subsequent transactions spending the imported outputs are also imported into the wallet or perform a rescan to update the wallet's state accordingly.",
    inputs: [
      {
        method: "rawtransaction",
        description:
          "A raw transaction in hex funding an already-existing address in wallet",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "txoutproof",
        description:
          "The hex output from gettxoutproof that contains the transaction",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },

  {
    method: "importpubkey",
    linkPath: "/rpc/importpubkey",
    summary: "Adds a public key to the wallet for monitoring purposes.",
    description:
      "The importpubkey command adds a public key, provided in hex format, to the wallet for monitoring purposes only; it cannot be used for spending. After import, a new wallet backup is necessary.",
    callable: true,
    category: "wallet",
    howIsThisUsed:
      "This command is useful when users want to monitor a specific public key within their wallet without enabling its use for spending. It allows for tracking transactions associated with the public key. Users can assign labels to organize imported public keys and choose whether to perform a rescan to synchronize the wallet with the blockchain. This command is particularly helpful for managing multiple public keys within the wallet and keeping track of their associated transactions.",
    inputs: [
      {
        method: "pubkey",
        description: "The hex-encoded public key",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "label",
        description: "An optional label",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "rescan",
        description: "Rescan the wallet for transactions",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
    ],
  },
  {
    method: "importwallet",
    linkPath: "/rpc/importwallet",
    summary: "Imports keys from a wallet dump file.",
    description:
      "The importwallet command imports keys from a wallet dump file, which is generated using the dumpwallet command. This operation requires a new wallet backup to include the imported keys. Upon successful import, the blockchain and mempool will be rescanned automatically. Users can monitor the scanning progress using the getwalletinfo command.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is essential for restoring or transferring wallets by importing keys from a dump file. It allows users to retain access to their funds and transaction history. Users may utilize this command when migrating wallets between different instances or when recovering from backup files. The automatic rescan ensures that the wallet's transaction history is synchronized with the blockchain after the import.",
    inputs: [
      {
        method: "filename",
        description: "The wallet file",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "joinpsbts",
    linkPath: "/rpc/joinpsbts",
    summary: "Joins multiple distinct PSBTs into one.",
    description:
      "The joinpsbts command merges multiple distinct PSBTs, each containing different inputs and outputs, into a single PSBT. This consolidated PSBT includes inputs and outputs from all the PSBTs provided. It's important to note that no input in any of the PSBTs can be present in more than one of them.",
    callable: false,
    category: "rawtransactions",
    howIsThisUsed:
      "This command is particularly useful when multiple parties are collaborating on a transaction, each providing their own PSBT. By joining these PSBTs, the participants can create a single, unified transaction that includes inputs and outputs from all contributors. This simplifies the coordination and finalization process of multi-party transactions, ensuring that no input is duplicated across the PSBTs.",
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
    method: "keypoolrefill",
    linkPath: "/rpc/keypoolrefill",
    summary: "Fills the keypool.",
    description:
      "The keypoolrefill command refills the keypool, ensuring that a new set of keys is available for generating addresses and transactions. It is used to replenish the keypool with a specified number of keys, or it defaults to 1000 keys if no size is specified.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is typically used to maintain a pool of unused keys within the wallet. When a new address is generated or a transaction is signed, a key from the keypool is used. Refilling the keypool ensures that a wallet has an adequate supply of keys available for future use, improving efficiency and avoiding potential issues with key exhaustion.",
    inputs: [
      {
        method: "newsize",
        description: "The new keypool size",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 100,
      },
    ],
  },

  {
    method: "listaddressgroupings",
    linkPath: "/rpc/listaddressgroupings",
    summary:
      "Lists groups of addresses that may have had their common ownership made public.",
    description:
      "The listaddressgroupings command retrieves groups of addresses that are likely owned by the same entity because they have been used together as inputs in the same transaction or as change from previous transactions. This information can provide insights into address ownership and transaction patterns.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is used to obtain information about groups of addresses that have been linked together through common usage in transactions. It can be helpful for analyzing address ownership and transaction history.",
    inputs: [],
  },
  {
    method: "listbanned",
    linkPath: "/rpc/listbanned",
    summary: "Lists all manually banned IPs/Subnets.",
    description:
      "The listbanned command retrieves information about all manually banned IP addresses or subnets. These bans are typically imposed by network administrators to restrict access to the node from specific IPs or subnets. The command provides details such as the banned address, the ban's creation time, duration, expiration time, and the remaining time until the ban expires.",
    callable: false,
    category: "network",
    howIsThisUsed:
      "This command is used to review the list of IP addresses or subnets that have been manually banned from accessing the node. It provides essential information about each ban, allowing network administrators to manage access restrictions effectively.",
    inputs: [],
  },
  //TODO: this method is not in the rpc api reference
  {
    method: "listdescriptors",
    linkPath: "/rpc/listdescriptors",
    summary:
      "Retrieves information about descriptors imported into a wallet that supports descriptors.",
    description:
      "The listdescriptors command retrieves information about descriptors imported into a descriptor-enabled wallet. Descriptors represent various address types and their characteristics, including creation time, activity status, and usage for generating new addresses. Additionally, it provides details about ranged descriptors, such as their range start and end, and the next index for generating addresses. The command also allows users to view private descriptors if specified.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is used to obtain a list of descriptors imported into a descriptor-enabled wallet. It helps users understand the composition of their wallet and the characteristics of each descriptor. Additionally, it allows users to review private descriptors if necessary, providing insights into the wallet's configuration and usage.",
    inputs: [],
  },
  {
    method: "listlabels",
    linkPath: "/rpc/listlabels",
    summary:
      "Retrieves the list of labels assigned to addresses in the wallet.",
    description:
      "The listlabels command retrieves the list of all labels assigned to addresses in the wallet, or labels associated with addresses for a specific purpose, such as sending or receiving funds. It allows users to organize and categorize their addresses for better management.",
    callable: true,
    category: "wallet",
    howIsThisUsed:
      "This command is used to manage and organize addresses by assigning labels to them. By providing flexibility to list labels based on their purpose, users can effectively categorize their addresses for better tracking and management.",
    inputs: [
      {
        method: "purpose",
        description:
          "Address purpose to list labels for (‘send’,’receive’). An empty string is the same as not providing this argument",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "listlockunspent",
    linkPath: "/rpc/listlockunspent",
    summary: "Returns a list of temporarily unspendable (locked) outputs.",
    description:
      "The listlockunspent command retrieves a list of outputs that are temporarily locked and cannot be spent. These locked outputs are typically created using the lockunspent command to prevent them from being used in subsequent transactions. This command provides details such as the transaction ID and the corresponding output index (vout) of each locked output.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is used to view the list of outputs that have been temporarily locked to prevent spending. It is particularly useful when managing transactions and ensuring certain outputs remain unspent for specific purposes. By listing temporarily locked outputs, users can monitor and control the locking and unlocking of transactions as needed.",
    inputs: [],
  },

  {
    method: "listreceivedbyaddress",
    linkPath: "/rpc/listreceivedbyaddress",
    summary:
      "Retrieves information about balances associated with receiving addresses.",
    description:
      "The listreceivedbyaddress command retrieves information about balances associated with receiving addresses. It includes details such as the address, total amount received in BTC, number of confirmations for the most recent transaction, label of the receiving address, and transaction IDs.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is used to obtain a comprehensive view of balances associated with receiving addresses in the wallet. It provides crucial information for monitoring incoming payments, confirming transactions, and managing wallet balances effectively. Additionally, it offers flexibility with various options to filter and customize the results based on specific requirements.",
    inputs: [
      {
        method: "minconf",
        description:
          "The minimum number of confirmations before payments are included",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 1,
      },
      {
        method: "include_empty",
        description:
          "Whether to include addresses that haven't received any payments",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
      {
        method: "include_watchonly",
        description: "Whether to include watch-only addresses",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
      {
        method: "address_filter",
        description: "If present, only return information on this address",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "listreceivedbylabel",
    linkPath: "/rpc/listreceivedbylabel",
    summary:
      "Retrieves information about received transactions grouped by label",
    description:
      "The listreceivedbylabel command provides information about received transactions categorized by label. It allows users to specify the minimum number of confirmations required before payments are included, whether to include labels that haven't received any payments, whether to include watch-only addresses, and whether to include immature coinbase transactions.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The listreceivedbylabel command is used to track received transactions grouped by labels. It's particularly useful for managing and organizing transactions within the wallet, allowing users to monitor incoming payments associated with specific labels or categories. Additionally, it aids in financial analysis and reporting by providing insights into the distribution of received funds across different labels.",
    inputs: [
      {
        method: "minconf",
        description:
          "The minimum number of confirmations before payments are included",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 1,
      },
      {
        method: "include_empty",
        description:
          "Whether to include labels that haven't received any payments",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
      {
        method: "include_watchonly",
        description: "Whether to include watch-only addresses",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
    ],
  },
  {
    method: "listsinceblock",
    linkPath: "/rpc/listsinceblock",
    summary:
      "Retrieves all transactions in blocks since a specified block or from the genesis block if omitted.",
    description:
      "The listsinceblock RPC command retrieves all transactions in blocks since a specified block or from the genesis block if no block hash is provided. It returns information such as transaction details, including amount, confirmations, and category. Additionally, it can include transactions that were removed due to a reorganization in the blockchain.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The listsinceblock command is used to retrieve transaction history since a specified block, aiding in tracking wallet activity and confirming the status of transactions. It is particularly useful for monitoring incoming and outgoing transactions, especially in scenarios where reorganizations may affect the transaction history.",
    inputs: [
      {
        method: "blockhash",
        description:
          "If set, the block hash to list transactions since, otherwise list all transactions",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "target_confirmations",
        description:
          "Return the nth block hash from the main chain. e.g. 1 would mean the best block hash. Note: this is not used as a filter, but only affects [lastblock] in the return value",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 1,
      },
      {
        method: "include_watchonly",
        description: "include transactions to watch-only addresses",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
      {
        method: "include_removed",
        description:
          "Show transactions that were removed due to a reorg in the “removed” array (not guaranteed to work on pruned nodes)",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
    ],
  },
  {
    method: "listtransactions",
    linkPath: "/rpc/listtransactions",
    summary:
      "Retrieves a specified number of recent transactions, skipping a defined number of initial transactions.",
    description:
      "The listtransactions RPC command returns a specified number of the most recent transactions, skipping the first few transactions based on the provided skip parameter. It includes details such as transaction category, amount, confirmations, and transaction ID. Optionally, it can filter transactions by a specified label and include transactions to watch-only addresses.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The listtransactions command is used to retrieve a specified number of recent transactions from the wallet's transaction history. It is helpful for users and applications to track transaction activity, monitor incoming and outgoing payments, and manage wallet finances. Additionally, it provides flexibility to filter transactions based on labels, enabling users to organize and analyze transactions more effectively.",
    inputs: [
      {
        method: "label",
        description:
          "If set, should be a valid label name to return only incoming transactions with the specified label, or “*” to disable filtering and return all transactions",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "count",
        description: "The number of transactions to return",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 10,
      },
      {
        method: "skip",
        description: "The number of transactions to skip",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 0,
      },
      {
        method: "include_watchonly",
        description: "Include transactions to watch-only addresses",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
    ],
  },
  //TODO: Ask Bernie what he thinks about the input address the default value is meant to be an empty array
  {
    method: "listunspent",
    linkPath: "/rpc/listunspent",
    summary:
      "Retrieves unspent transaction outputs within a specified range of confirmations.",
    description:
      "The listunspent RPC command returns an array of unspent transaction outputs (UTXOs) with confirmations between the specified minimum and maximum values. It optionally filters the outputs to include only those paid to specified addresses. This command is useful for obtaining a list of available UTXOs that can be used as inputs for creating new transactions.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The listunspent command is used to retrieve a list of unspent transaction outputs within a specified range of confirmations. This is essential for constructing new transactions, as it provides information about available funds that can be spent. The ability to filter by addresses allows users to obtain UTXOs specific to certain addresses, facilitating more targeted transaction creation. Additionally, the include_unsafe parameter allows users to control whether to include outputs that are not safe to spend, giving flexibility in managing wallet funds.",
    inputs: [
      {
        method: "minconf",
        description: "The minimum confirmations to filter",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 1,
      },
      {
        method: "maxconf",
        description: "The maximum confirmations to filter",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 9999999,
      },
      {
        method: "addresses",
        description: "Bitcoin addresses to filter",
        required: false,
        type: PARAMETER_TYPE.json,
        defaultValue: "[]",
      },
      {
        method: "include_unsafe",
        description: "Include outputs that are not safe to spend ",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
      {
        method: "query_options",
        description: "JSON with query options",
        required: false,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  {
    method: "listwalletdir",
    linkPath: "/rpc/listwalletdir",
    summary: "Retrieves a list of wallets in the wallet directory.",
    description:
      "The listwalletdir RPC command returns a list of wallets present in the wallet directory. It provides the names of all wallets available on the node.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The listwalletdir command is used to retrieve a comprehensive list of wallets stored in the wallet directory. This functionality is essential for various administrative and management tasks related to wallets.",
    inputs: [],
  },
  {
    method: "listwallets",
    linkPath: "/rpc/listwallets",
    summary: "Retrieves a list of currently loaded wallets.",
    description:
      "The listwallets RPC command returns a list of wallets that are currently loaded and active within the Bitcoin node. Each entry in the list represents the name of a loaded wallet.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The listwallets command provides a list of currently loaded wallets in the Bitcoin node, offering users a means to verify loaded wallets, monitor wallet activity, integrate with wallet management tools, and aid in debugging and troubleshooting wallet-related issues by identifying potential conflicts or inconsistencies in wallet loading.",
    inputs: [],
  },
  {
    method: "loadwallet",
    linkPath: "/rpc/loadwallet",
    summary: "Loads a wallet from a wallet file or directory in Bitcoin Core.",
    description:
      "The loadwallet RPC facilitates the loading of a wallet from either a wallet file or directory within the Bitcoin Core environment. This command is essential for managing multiple wallets within the node, enabling users to dynamically switch between wallets or add new ones.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The loadwallet RPC is used to dynamically load wallets into the Bitcoin Core node, enabling users to manage multiple wallets efficiently. It allows for seamless switching between wallets and facilitates the addition of new wallets as needed. This command is particularly useful for users who regularly work with multiple wallets or require specific wallets to be loaded automatically on node startup. Additionally, the ability to specify whether the loaded wallet should be saved to persistent settings enhances convenience and ensures that desired wallets are readily available for use.",
    inputs: [
      {
        method: "filename",
        description: "The wallet directory or .dat file",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "load_on_startup",
        description: "Whether to load the wallet on startup (true or false)",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
    ],
  },
  {
    method: "lockunspent",
    linkPath: "/rpc/lockunspent",
    summary:
      "Updates the list of temporarily unspendable outputs, either locking or unlocking specified transaction outputs.",
    description:
      "The lockunspent RPC allows users to temporarily lock or unlock specific transaction outputs. When unlocking, all currently locked transaction outputs are unlocked unless specific outputs are specified. Locked outputs are excluded from automatic coin selection when spending bitcoins, although manually selected coins are automatically unlocked.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The lockunspent RPC is used to control the spending behavior of specific transaction outputs in the Bitcoin Core wallet. It allows users to temporarily prevent locked outputs from being used in automatic coin selection, providing finer control over coin selection and transaction creation. This is particularly useful when building complex transactions or managing multiple outputs within a wallet. By specifying whether locks should be persistent or not, users can ensure that their locking preferences persist across node restarts or failures, providing consistent behavior over time.",
    inputs: [
      {
        method: "unlock",
        description:
          "Whether to unlock (true) or lock (false) the specified transactions",
        required: true,
        type: PARAMETER_TYPE.boolean,
      },
      {
        method: "transactions",
        description:
          "The transaction outputs and within each, the txid (string) vout (numeric)",
        required: false,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  {
    method: "logging",
    linkPath: "/rpc/logging",
    summary: "Gets and sets the logging configuration for specific categories.",
    description:
      "The logging RPC allows users to retrieve the current logging configuration and adjust it by specifying categories to include or exclude from debug logging. When called without arguments, it returns a list of categories with their current debug logging status. If called with arguments, it adds or removes categories from debug logging based on the specified include and exclude lists. Categories can be included or excluded individually, or using special keywords like 'all' and 'none'.",
    callable: false,
    category: "control",
    howIsThisUsed:
      "The logging RPC is used to manage the logging configuration in Bitcoin Core. It allows users to control which categories of events are logged for debugging purposes. By specifying categories to include or exclude, users can tailor the logging output to focus on specific areas of interest or to reduce verbosity. This is particularly useful for diagnosing issues, monitoring specific components, or optimizing performance. The ability to dynamically adjust the logging configuration provides flexibility in debugging and troubleshooting Bitcoin Core nodes.",
    inputs: [
      {
        method: "include",
        description: "The categories to add to debug logging",
        required: false,
        type: PARAMETER_TYPE.json,
      },
      {
        method: "exclude",
        description: "The categories to remove from debug logging",
        required: false,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  //TODO: migratewallet is not in the rpc api reference
  {
    method: "migratewallet",
    linkPath: "/rpc/migratewallet",
    summary: "Migrates Legacy wallets to Descriptor wallets.",
    description:
      "The migratewallet RPC is an experimental feature introduced to migrate Legacy (non-descriptor) wallets to Descriptor wallets. This process involves converting the existing wallet to use descriptors, which offer more flexibility and compatibility with future updates. Before migration, a backup of the original wallet is created.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The migratewallet RPC is used to upgrade Legacy wallets to Descriptor wallets, taking advantage of improved features and compatibility. Descriptor wallets offer enhanced functionality and are better suited for future developments in Bitcoin Core. This migration process is beneficial for users who want to ensure their wallets remain compatible with upcoming changes and improvements in the Bitcoin ecosystem. However, it's essential to note that this feature is experimental and may not work as expected in all scenarios. Users are advised to proceed with caution and perform thorough backups before initiating the migration process.",
    inputs: [],
  },

  // new ones
  {
    method: "newkeypool",
    linkPath: "/rpc/newkeypool",
    summary: "Clears and refills the keypool.",
    description:
      "The newkeypool RPC is used to entirely clear and refill the keypool of a Bitcoin wallet. This process is typically used to generate a new set of keys for receiving transactions.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The newkeypool RPC is utilized to refresh the keypool of a Bitcoin wallet, ensuring that new addresses can be generated for receiving transactions. This process is crucial for maintaining the security and functionality of the wallet, especially in non-HD wallets where key management is not automatic. By clearing and refilling the keypool, users can generate a new set of keys to receive funds securely. It's important to remember that executing this command will require an immediate backup, particularly for non-HD wallets, to include the new keys. Additionally, in cases where backups of HD wallets are restored, running newkeypool followed by a wallet rescan is necessary to ensure that funds received to new addresses are recognized by the wallet.",
    inputs: [],
  },
  {
    method: "ping",
    linkPath: "/rpc/ping",
    summary:
      "Requests a ping to be sent to all other nodes to measure ping time.",
    description:
      "The ping RPC is used to request that a ping be sent to all other nodes in the network to measure the ping time. The results of this ping are provided in the getpeerinfo, pingtime, and pingwait fields, which are measured in decimal seconds. It's important to note that the ping command is handled in the queue with all other commands, meaning it measures the processing backlog in addition to network ping time.",
    callable: false,
    category: "network",
    howIsThisUsed:
      "The ping RPC is utilized to measure the ping time to other nodes in the Bitcoin network. By sending a ping request to all other nodes, a node can measure the round-trip time it takes for the ping to be sent and received. This information is valuable for assessing the network's latency and overall health. The ping results, including pingtime and pingwait, provide insights into the network's responsiveness and any processing backlog. This command is useful for network diagnostics and monitoring the performance of the Bitcoin node.",
    inputs: [],
  },
  {
    method: "preciousblock",
    linkPath: "/rpc/preciousblock",
    summary:
      "Marks a block as if it were received before others with the same work.",
    description:
      "The preciousblock RPC is used to treat a block as if it were received before other blocks with the same work.",
    callable: false,
    category: "blockchain",
    howIsThisUsed:
      "The preciousblock RPC is typically used for testing purposes or in scenarios where a node operator needs to manipulate the order of block reception. By marking a block as precious, a node can prioritize it over others with the same work, effectively altering the blockchain's perceived history within the node's context. This command is handy for simulating various network conditions or verifying the behavior of Bitcoin nodes in different scenarios. However, its effects are temporary and do not persist across node restarts, making it suitable primarily for testing and debugging purposes.",
    inputs: [
      {
        method: "blockhash",
        description: "The hash of the block to mark as precious",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "prioritisetransaction",
    linkPath: "/rpc/prioritisetransaction",
    summary:
      "Adjusts the priority of a transaction in the mining queue by modifying its fee.",
    description:
      "The prioritisetransaction RPC allows the user to influence the priority of a transaction within the mining queue by adjusting its fee. This adjustment can prioritize the transaction for inclusion in mined blocks by increasing its fee (or lowering its fee for lower priority).",
    callable: false,
    category: "mining",
    howIsThisUsed:
      "The prioritisetransaction RPC is commonly used to influence the priority of a transaction within the mining queue, especially during periods of network congestion or when faster confirmation times are desired. By adjusting the transaction's fee, users can incentivize miners to include their transaction in mined blocks promptly. This is particularly useful for urgent transactions or scenarios where timely confirmation is essential. Additionally, it provides a mechanism to adjust the priority of transactions dynamically without the need to recreate them.",
    inputs: [
      {
        method: "txid",
        description: "The transaction ID",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "fee_delta",
        description:
          "The fee value (in BTC) to add (or subtract if negative) to the transaction fee",
        required: true,
        type: PARAMETER_TYPE.number,
      },
    ],
  },
  {
    method: "pruneblockchain",
    linkPath: "/rpc/pruneblockchain",
    summary:
      "Prunes the blockchain up to a specified height or timestamp, reducing storage space.",
    description:
      "The pruneblockchain RPC allows the user to prune the blockchain, reducing the disk space required to store the full blockchain data.",
    callable: false,
    category: "blockchain",
    howIsThisUsed:
      "The pruneblockchain RPC is primarily used to reduce the disk space requirements of running a full node by removing old blockchain data that is no longer needed for validation or consensus. This is particularly useful for nodes with limited storage capacity or those running on devices with constrained resources. By periodically pruning the blockchain, users can ensure that their node remains functional while minimizing storage overhead. Additionally, pruning can help improve synchronization times for new nodes joining the network by reducing the amount of data that needs to be downloaded and validated.",
    inputs: [
      {
        method: "height",
        description:
          "The block height to prune up to. May be set to a discrete height, or to a UNIX epoch time",
        required: false,
        type: PARAMETER_TYPE.number,
      },
    ],
  },
  {
    method: "psbtbumpfee",
    linkPath: "/rpc/psbtbumpfee",
    summary:
      "Bumps the fee of an opt-in-RBF transaction, replacing it with a new transaction.",
    description:
      "The psbtbumpfee RPC is used to increase the fee of an opt-in RBF (Replace-By-Fee) transaction by creating a new transaction with a higher fee.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The psbtbumpfee RPC is primarily used to increase the fee of an opt-in RBF transaction in situations where the original fee is insufficient to confirm the transaction promptly. This can be necessary to accelerate transaction confirmation during periods of network congestion or when the initial fee was set too low. By bumping the fee, users can prioritize their transactions for inclusion in the blockchain. This RPC command is particularly useful for wallets that support RBF transactions and need to adjust transaction fees dynamically after the transaction has been broadcasted. It allows users to replace the original transaction with a new one that includes a higher fee, ensuring faster confirmation without waiting for the original transaction to be confirmed or dropped from the mempool.",
    inputs: [],
  },
  {
    method: "removeprunedfunds",
    linkPath: "/rpc/removeprunedfunds",
    summary:
      "Deletes the specified transaction from the wallet, designed for use with pruned wallets.",
    description:
      "The removeprunedfunds RPC is used to delete a specified transaction from the wallet.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The removeprunedfunds RPC is primarily used in pruned wallets to delete specific transactions that are no longer needed. Pruned wallets store only a subset of the blockchain, discarding old transaction data to save disk space. However, even in pruned mode, users may want to manage their funds or clean up unnecessary transactions from their wallet history. This RPC command allows users to remove individual transactions from their wallet, which can be useful for various reasons, such as improving wallet performance or maintaining privacy by removing sensitive transaction details.",
    inputs: [
      {
        method: "txid",
        description: "The hex-encoded id of the transaction you are deleting",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "rescanblockchain",
    linkPath: "/rpc/rescanblockchain",
    summary:
      "Performs a rescan of the local blockchain to identify wallet-related transactions.",
    description:
      "The rescanblockchain RPC initiates a rescan of the local blockchain to identify transactions relevant to the wallet.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The rescanblockchain RPC is commonly used by wallets to synchronize their transaction history with the blockchain. When a wallet is offline or not in sync with the network for some time, it may miss new transactions or updates to existing transactions. By performing a rescan of the blockchain, the wallet can identify any relevant transactions that occurred during the offline period and update its transaction history accordingly. This ensures that the wallet's balance and transaction history are accurate and up to date. Additionally, rescanblockchain can be useful in scenarios where the wallet.dat file is moved to a new device or restored from a backup, allowing the wallet to reindex its transactions from a specific block height.",
    inputs: [
      {
        method: "start_height",
        description: "block height where the rescan should start",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 0,
      },
      {
        method: "stop_height",
        description: "block height where the rescan should stop",
        required: false,
        type: PARAMETER_TYPE.number,
      },
    ],
  },
  {
    method: "restorewallet",
    linkPath: "/rpc/restorewallet",
    summary: "Restores and loads a wallet from a backup file.",
    description:
      "The restorewallet RPC command is used to restore and load a wallet from a previously created backup file.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The restorewallet command is essential for recovering wallets from backup files in cases where the original wallet file is lost, corrupted, or inaccessible. It allows users to recreate their wallet data, including private keys and transaction history, from a previously saved backup. This is particularly useful in situations where users need to transfer their wallet to a new device, recover from accidental deletion, or restore after experiencing wallet-related issues.",
    inputs: [],
  },
  {
    method: "savemempool",
    linkPath: "/rpc/savemempool",
    summary: "Dumps the memory pool (mempool) to disk.",
    description:
      "The savemempool RPC command is used to save the current state of the memory pool, which contains unconfirmed transactions, to disk.",
    callable: false,
    category: "blockchain",
    howIsThisUsed:
      "The savemempool command is typically used by node operators and developers to ensure that unconfirmed transactions present in the mempool are not lost during system downtime. By saving the mempool to disk, users can preserve pending transactions and prevent them from being evicted when the node shuts down. This is particularly important for miners who rely on the mempool to include transactions in the blocks they mine. Additionally, developers may use this command when implementing custom mempool management strategies or conducting analysis on pending transactions.",
    inputs: [],
  },
  {
    method: "scantxoutset",
    linkPath: "/rpc/scantxoutset",
    summary:
      "Examines the set of unspent transaction outputs to identify entries that align with particular output descriptors.",
    description:
      "The scantxoutset RPC command is used to scan the unspent transaction output set (UTXO set) for entries that match specified output descriptors.",
    callable: false,
    category: "blockchain",
    howIsThisUsed:
      "The scantxoutset command is primarily used by wallet software, explorers, and other blockchain analysis tools to identify specific transaction outputs matching predefined criteria. It allows users to query the blockchain for outputs associated with certain addresses, scripts, or public keys without the need to maintain a full index of all transactions. This functionality is particularly useful for wallets that support hierarchical deterministic (HD) key derivation, as it enables them to efficiently discover and monitor funds associated with extended public keys (xpubs). Additionally, developers may use this command to build custom applications that require querying and analyzing UTXO data.",
    inputs: [
      {
        method: "action",
        description: "The action to execute",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "scanobjects",
        description: "Array of scan objects. Required for “start” action",
        required: false,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  {
    method: "send",
    linkPath: "/rpc/send",
    summary:
      "Sends a transaction with specified outputs and optional parameters.",
    description:
      "This RPC command facilitates the transmission of a transaction on the Bitcoin network, allowing users to send funds to specified addresses or embed data within the transaction. It supports various options for fee estimation and transaction customization.",
    callable: true,
    category: "wallet",
    howIsThisUsed:
      "This command is utilized to initiate Bitcoin transactions, enabling users to transfer funds to designated recipients or embed data in the blockchain. It is essential for conducting financial transactions securely and efficiently on the Bitcoin network.",
    inputs: [
      {
        method: "outputs",
        description:
          "The outputs (key-value pairs), where none of the keys are duplicated",
        required: true,
        type: PARAMETER_TYPE.json,
      },
      {
        method: "fee_rate",
        description: "Specify a fee rate in sat/vB",
        required: false,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "conf_target",
        description: "Confirmation target in blocks",
        required: false,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "estimate_mode",
        description: "The fee estimate mode, must be one of (case insensitive)",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "options",
        description:
          "locktime: n, (numeric, optional, default=0) Raw locktime. Non-0 value also locktime-activates inputs",
        required: false,
        type: PARAMETER_TYPE.json,
      },
    ],
  },
  // this one wasn't in the rpc api reference
  {
    method: "sendall",
    linkPath: "/rpc/sendall",
    summary:
      "Spends all or specific confirmed UTXOs in the wallet to one or more recipients.",
    description:
      "This RPC command allows users to spend the value of all or specific confirmed Unspent Transaction Outputs (UTXOs) in the wallet to one or more recipients. It provides flexibility in fee estimation and transaction customization.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The sendall command is used to efficiently manage and distribute funds held within the wallet. It enables users to consolidate UTXOs and make payments to multiple recipients in a single transaction, streamlining wallet management and reducing transaction fees.",
    inputs: [],
  },

  {
    method: "sendmany",
    linkPath: "/rpc/sendmany",
    summary:
      "Facilitates the creation and broadcasting of transactions to send funds across multiple addresses.",
    description:
      "This RPC command orchestrates the formation and dissemination of a transaction designed to distribute funds among several specified addresses. It provides a mechanism for efficient bulk payments or disbursements.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "The sendmany command is utilized to streamline the process of distributing Bitcoin across numerous addresses in a single transaction. It serves as a vital tool for businesses, organizations, or individuals needing to conduct mass payments or disbursements efficiently.",
    inputs: [
      {
        method: "amounts",
        description: "The addresses and amounts",
        required: true,
        type: PARAMETER_TYPE.json,
      },
      {
        method: "subtractfeefrom",
        description:
          "A list of addresses. The fee will be equally deducted from the amount of each selected address",
        required: false,
        type: PARAMETER_TYPE.json,
      },
      {
        method: "replaceable",
        description:
          "Allow this transaction to be replaced by a transaction with higher fees via BIP 125",
        required: false,
        type: PARAMETER_TYPE.boolean,
      },
      {
        method: "conf_target",
        description: "Confirmation target in blocks",
        required: false,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "estimate_mode",
        description: "The fee estimate mode, must be one of (case insensitive)",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "dummy",
        description: "Must be set to “” for backwards compatibility",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "minconf",
        description: "Ignored dummy value",
        required: false,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "fee_rate",
        description: "Specify a fee rate in sat/vB",
        required: false,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "comment",
        description: "A comment ",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "sendtoaddress",
    linkPath: "/rpc/sendtoaddress",
    summary:
      "Facilitates sending a specific amount of Bitcoin to a designated address.",
    description:
      "The sendtoaddress command enables the transmission of a specified quantity of Bitcoin to a given address. This function is integral for executing individual payments or transactions from a wallet to a recipient.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is essential for transferring Bitcoin from one address to another. It is particularly useful for conducting single transactions, whether they are personal payments, donations, or business transactions.",
    inputs: [
      {
        method: "address",
        description: "The Bitcoin address to send to",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "amount",
        description: "The amount in BTC to send",
        required: true,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "comment",
        description: "A comment used to store what the transaction is for",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "comment_to",
        description:
          "A comment to store the name of the person or organization to which you're sending the transaction",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "subtractfeefromamount",
        description:
          "The fee will be deducted from the amount being sent. The recipient will receive less bitcoins than you enter in the amount field",
        required: false,
        type: PARAMETER_TYPE.boolean,
      },
      {
        method: "replaceable",
        description:
          "Allow this transaction to be replaced by a transaction with higher fees via BIP 125",
        required: false,
        type: PARAMETER_TYPE.boolean,
      },
      {
        method: "conf_target",
        description: "Confirmation target in blocks",
        required: false,
        type: PARAMETER_TYPE.number,
      },
      {
        method: "estimate_mode",
        description: "The fee estimate mode, must be one of (case insensitive)",
        required: false,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "avoid_reuse",
        description:
          "(only available if avoid_reuse wallet flag is set) Avoid spending from dirty addresses; addresses are considered",
        required: false,
        type: PARAMETER_TYPE.boolean,
      },
    ],
  },
  {
    method: "setban",
    linkPath: "/rpc/setban",
    summary: "Manages the banned list of IP addresses or subnets.",
    description:
      "The setban command allows for the addition or removal of an IP address or subnet from the banned list. This feature is crucial for network management and security, enabling administrators to control access and prevent unwanted connections.",
    callable: false,
    category: "network",
    howIsThisUsed:
      "This command is employed to ban specific IP addresses or subnets from connecting to the Bitcoin network. It can be utilized to mitigate spam, prevent attacks, or block malicious nodes. Additionally, it provides flexibility in setting ban durations, either for a specific duration or indefinitely.",
    inputs: [
      {
        method: "subnet",
        description:
          "The IP/Subnet (see getpeerinfo for nodes IP) with an optional netmask",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "command",
        description:
          "‘add’ to add an IP/Subnet to the list, ‘remove’ to remove an IP/Subnet from the list",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "bantime",
        description: "The duration in seconds (0 or less to ban indefinitely)",
        required: false,
        type: PARAMETER_TYPE.number,
        defaultValue: 0,
      },
      {
        method: "absolute",
        description:
          "If set, the bantime must be an absolute timestamp expressed in UNIX epoch time",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: false,
      },
    ],
  },
  {
    method: "sethdseed",
    linkPath: "/rpc/sethdseed",
    summary: "Sets or generates a new HD wallet seed.",
    description:
      "The sethdseed command allows users to set a new HD wallet seed or generate one if not provided. This enables the derivation of new keys for the wallet, improving security and privacy. It's important to create a new backup of the wallet after setting a new HD seed to ensure all future keys are correctly derived.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is used to manage the HD seed of a Bitcoin wallet. Users can either generate a new seed or provide their own. By setting a new HD seed, users ensure that future keys derived from this seed will be used, enhancing the security and privacy of their wallet. It's crucial to make a new backup of the wallet after setting a new HD seed to safeguard against potential loss of funds.",
    inputs: [
      {
        method: "newkeypool",
        description:
          "Whether to flush old unused addresses, including change addresses, from the keypool and regenerate it",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
      {
        method: "seed",
        description: "The WIF private key to use as the new HD seed",
        required: false,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "setlabel",
    linkPath: "/rpc/setlabel",
    summary: "Associates a label with a Bitcoin address.",
    description:
      "The setlabel command is used to assign a label to a specific Bitcoin address in the wallet. This label can be any string and is used for organizational purposes.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is used to assign a label to a Bitcoin address in the wallet. Users may want to label addresses for various reasons, such as categorizing addresses by their purpose or associating them with specific transactions or recipients. The label assigned using setlabel can then be used for reference when managing addresses within the wallet.",
    inputs: [
      {
        method: "address",
        description: "The Bitcoin address associated with the label",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "label",
        description: "The label to assign to the address",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "setnetworkactive",
    linkPath: "/rpc/setnetworkactive",
    summary: "Enables or disables all P2P network activity.",
    description:
      "The setnetworkactive command allows users to enable or disable all peer-to-peer (P2P) network activity in the Bitcoin client.",
    callable: false,
    category: "network",
    howIsThisUsed:
      "This command is used to control the P2P network activity of the Bitcoin client. By passing a boolean value (true or false), users can either enable or disable all network activity. This can be helpful in situations where users need to temporarily stop network communication, such as when performing maintenance tasks or diagnosing network-related issues. The command returns a boolean value indicating whether the network activity was successfully enabled or disabled as requested.",
    inputs: [
      {
        method: "state",
        description:
          "Whether to enable (true) or disable (false) network activity",
        required: true,
        type: PARAMETER_TYPE.boolean,
      },
    ],
  },
  {
    method: "settxfee",
    linkPath: "/rpc/settxfee",
    summary:
      "Sets the transaction fee per kilobyte for transactions created by the wallet.",
    description:
      "The settxfee command is used to set the transaction fee per kilobyte (kB) for transactions created by the wallet. This fee overrides the global -paytxfee command-line parameter.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is used to customize the transaction fee for transactions generated by the wallet. Users may want to adjust the transaction fee based on factors such as network congestion, desired confirmation time, and personal preferences. Setting an appropriate transaction fee ensures that transactions are processed in a timely manner and incentivizes miners to include them in blocks.",
    inputs: [
      {
        method: "amount",
        description: "The transaction fee in BTC/kvB",
        required: true,
        type: PARAMETER_TYPE.number,
      },
    ],
  },
  {
    method: "setwalletflag",
    linkPath: "/rpc/setwalletflag",
    summary: "Changes the state of a specified wallet flag for a wallet.",
    description:
      "The setwalletflag command modifies the state of a given wallet flag for a specific wallet.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is used to manage wallet-specific behaviors or settings by toggling specific flags. For example, the 'avoid_reuse' flag helps to improve privacy and security by preventing the wallet from spending from addresses that have been used in previous transactions. By changing the state of flags like 'avoid_reuse', users can customize the behavior of their wallet according to their preferences and security requirements.",
    inputs: [
      {
        method: "flag",
        description:
          "The name of the flag to change. Current available flags: avoid_reuse",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "value",
        description: "The new state",
        required: false,
        type: PARAMETER_TYPE.boolean,
        defaultValue: true,
      },
    ],
  },
  {
    method: "signmessage",
    linkPath: "/rpc/signmessage",
    summary: "Signs a message with the private key of a specified address.",
    description:
      "The signmessage command generates a digital signature for a given message using the private key associated with a specified Bitcoin address.",
    callable: false,
    category: "wallet",
    howIsThisUsed:
      "This command is used to provide cryptographic proof of ownership or authorship for a specific message by signing it with the private key corresponding to a Bitcoin address. The resulting signature can be used to verify the authenticity of the message later using the verifymessage command. This functionality is commonly used in various applications such as proving ownership of Bitcoin addresses, signing messages for authentication purposes, and cryptographic identity verification.",
    inputs: [
      {
        method: "address",
        description: "The Bitcoin address to use for the private key",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "message",
        description: "The message to create a signature of ",
        required: true,
        type: PARAMETER_TYPE.string,
      },
    ],
  },
  {
    method: "signmessagewithprivkey",
    linkPath: "/rpc/signmessagewithprivkey",
    summary: "Signs a message with a specified private key.",
    description:
      "The signmessagewithprivkey command generates a digital signature for a given message using the provided private key.",
    callable: false,
    category: "utility",
    howIsThisUsed:
      "This command is used when direct access to a private key is available and there is no need to involve a wallet or passphrase. It allows for signing messages using a specific private key, which can be useful in scenarios where messages need to be signed offline or where the signer wants full control over the signing process. It is typically used for signing messages for authentication purposes or cryptographic identity verification.",
    inputs: [
      {
        method: "privkey",
        description: "he private key to sign the message with",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      {
        method: "message",
        description: "The message to create a signature of",
        required: true,
        type: PARAMETER_TYPE.string,
      },
      
    ],
  },

  
];

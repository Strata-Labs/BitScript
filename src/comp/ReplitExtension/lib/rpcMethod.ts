import { PARAMETER_TYPE } from "../types";
import { RPCFunctionParams } from "./utils";

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
];
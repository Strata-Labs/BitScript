const rpcUrl = "http://localhost:18443/"; // Adjust for your environment
const rpcUser = "setbern";
const rpcPassword = "setbern";

enum RpcMethods {
  generateToAddress = "generatetoaddress",
  getBlockChainInfo = "getblockchaininfo",
  listUnspent = "listunspent",
}

const rpcHandlerCore = async (method: RpcMethods, params: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Basic " + Buffer.from(`${rpcUser}:${rpcPassword}`).toString("base64"),
  };

  const timestamp = Date.now();

  const body = JSON.stringify({
    jsonrpc: "1.0",
    id: `${method}-${timestamp}`,
    method: method,
    params,
  });

  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (err) {
    console.log(err);
  }
};

/* 
  GenerateToAddress
*/
type GenerateToAddress = {
  nblocks: number;
  address: string;
};

export const generateToAddress = async ({
  address,
  nblocks,
}: GenerateToAddress) => {
  return await rpcHandlerCore(RpcMethods.generateToAddress, [nblocks, address]);
};

/* 
  GetBlockchainInfo
*/
export const getBlockChainInfo = async () => {
  return await rpcHandlerCore(RpcMethods.getBlockChainInfo, []);
};

/* 
  ListUnspent
*/
type ListUnspent = {
  minconf: number;
  maxconf: number;
  addresses: string[];
};
export const listUnspent = async ({
  minconf,
  maxconf,
  addresses,
}: ListUnspent) => {
  return await rpcHandlerCore(RpcMethods.listUnspent, [
    minconf,
    maxconf,
    addresses,
  ]);
};

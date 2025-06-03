import { NextApiRequest, NextApiResponse } from "next";

///cors configuration
type NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;
const allowCors =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin ?? "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const mainnetUrl = process.env.BTC_MAINNET_RPC_URL;
  const testnetUrl = process.env.BTC_TESTNET_RPC_URL;

  if (!mainnetUrl || !testnetUrl) {
    res.status(500).json({ error: "RPC URLs are not set" });
    return;
  }

  try {
    const { method, params, env } = req.body;

    const environment =
      env && env.toUpperCase() === "TESTNET" ? "TESTNET" : "MAINNET";
    const rpcUrl = environment === "TESTNET" ? testnetUrl : mainnetUrl;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      method: method,
      params: params,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const btcRpcRes_ = await fetch(rpcUrl, requestOptions);

    const btcRpcRes: any = await btcRpcRes_.json();

    // return the result as json response
    if (btcRpcRes.result !== null) {
      res.status(200).json(btcRpcRes.result);
    } else {
      if (btcRpcRes.error !== null) {
        res.status(400).json({ error: btcRpcRes.error.message });
      } else {
        res.status(404).json({ error: "Resource could not be found" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default allowCors(handler);

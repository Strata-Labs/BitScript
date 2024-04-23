import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // get the params from header
    /* 
      headers {
        method: string
        params: any[]
      }
    */
    const { method, params } = req.headers as { method: string; params: any[] };
    // validate the params
    const input = z
      .object({
        method: z.string(),
        params: z.array(z.any()),
      })
      .parse({ method, params });

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

    const btcRpcRes_ = await fetch(
      "https://withered-rough-lake.btc.quiknode.pro/f46b3a795512b0cf36f9607866beea5bd10ce940/",
      requestOptions
    );

    console.log("btcRpcRes_", btcRpcRes_);
    const btcRpcRes: any = await btcRpcRes_.json();

    console.log("btcRpcRes", btcRpcRes);

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
}

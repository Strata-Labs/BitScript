import { z } from "zod";
import { procedure } from "../trpc";

export const fetchBTCRPC = procedure
  .input(
    z.object({
      method: z.string(),
      params: z.array(z.any()),
    })
  )
  .output(z.any())
  .mutation(async (opts) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        method: opts.input.method,
        params: opts.input.params,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const rpcUrl = process.env.BTC_MAINNET_RPC_URL;
      if (!rpcUrl) {
        throw new Error("BTC_MAINNET_RPC_URL is not set");
      }

      const btcRpcRes_ = await fetch(rpcUrl, requestOptions);

      const btcRpcRes: any = await btcRpcRes_.json();

      if (btcRpcRes.result !== null) {
        return btcRpcRes.result;
      } else {
        if (btcRpcRes.error !== null) {
          throw new Error(btcRpcRes.error.message);
        } else {
          throw new Error("Resource could not be found");
        }
      }
    } catch (err: any) {
      throw new Error(err);
    }
  });

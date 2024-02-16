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

      console.log("opts", opts.input.params);
      var raw = JSON.stringify({
        method: opts.input.method,
        params: opts.input.params,
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
      console.log("err", err);
      throw new Error(err);
    }
  });

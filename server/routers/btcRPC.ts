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
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const btcRpcRes_ = await fetch(
        "https://docs-demo.btc.quiknode.pro/",
        requestOptions
      );

      const btcRpcRes: any = await btcRpcRes_.json();

      console.log("btcRpcRes", btcRpcRes);
      if (btcRpcRes.result) {
        return btcRpcRes.result;
      } else {
        throw new Error(btcRpcRes.error.message);
      }
    } catch (err: any) {
      throw new Error(err);
    }
  });

import { z } from "zod";
import { procedure } from "./trpc";
import { getP2pkh } from "./wallet";
import { generateToAddress, getBlockChainInfo } from "./rpcCommands";

export const mineSomeBlocks = procedure
  .input(
    z.object({
      numBlocks: z.number(),
      walletName: z.string(),
    })
  )
  .mutation(async (opts) => {
    const { numBlocks, walletName } = opts.input;

    // create a faucet wallet
    const wallet = getP2pkh("faucet");
    if (!wallet) throw new Error("no wallet");

    const sendToAddress = await generateToAddress({
      address: wallet,
      nblocks: numBlocks,
    });

    // mine some blocks
    return sendToAddress;
  });

export const getBitSimTip = procedure.query(async (opts) => {
  const blockChainInfo = await getBlockChainInfo();
  return blockChainInfo;
});

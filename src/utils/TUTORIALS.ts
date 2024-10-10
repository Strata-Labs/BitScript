import { ArticleViewProps } from "@/comp/Tutorials/ArticleView";
import { ECDSAGeneration } from "@/const/Articles/ECDSAGeneration";
import { ATaleOfTwoPaths } from "@/const/Articles/ataleoftwopaths";
import { ECDSADerFormat } from "@/const/Articles/ecdsaDerFormat";
import { ECDSAVerification } from "@/const/Articles/ecdsaVerification";
import { FormattingWitnessScript } from "@/const/Articles/formattingwitnessscript";
import { FromKeysToWallets } from "@/const/Articles/fromKeysToWallets";
import { GeneratingTaprootPubKey } from "@/const/Articles/generatingATaprootOutput";
import { GeneratingTaprootPubKey2 } from "@/const/Articles/generatingTaprootPubkey2";
import { MerkleTreeReview } from "@/const/Articles/merkletreereview";
import { VMF } from "@/const/Articles/vmf";
import { WhatsInAnInputAnyways } from "@/const/Articles/whatsinaninputanyways";
import { WhyTaproot } from "@/const/Articles/whytaproot";

export const BitcoinBasics: ArticleViewProps[] = [
  ECDSAGeneration,
  ECDSAVerification,
  ECDSADerFormat,
  WhatsInAnInputAnyways,
  FormattingWitnessScript,
  VMF,
  WhyTaproot,
  ATaleOfTwoPaths,
  MerkleTreeReview,
  GeneratingTaprootPubKey, 
  GeneratingTaprootPubKey2, 
  FromKeysToWallets

];

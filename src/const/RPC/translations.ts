import { RPC_METHODS, RPCFunctionParams } from "../RPC";

// Per-locale RPC translations, keyed by the English RPC's `method` name
// (e.g. "abandontransaction"). To add a new translation:
//   1. Create a sibling file like `abandontransaction.fr.ts` that exports
//      the translated RPCFunctionParams (the simplest pattern is to look up
//      the English record and spread it; see abandontransaction.fr.ts).
//   2. Import it below and register it under its locale by `method`.
// Missing translations fall back to English automatically.
//
// Keep `method`, `linkPath`, `callable`, each input's `method` (param name),
// `type`, `defaultValue`, and `enumValues` identical to the English version
// so URLs, RPC param wiring, and call payloads stay stable across locales.

import { abandontransactionFr } from "./abandontransaction.fr";
import { abortrescanFr } from "./abortrescan.fr";
import { addmultisigaddressFr } from "./addmultisigaddress.fr";
import { addnodeFr } from "./addnode.fr";
import { analyzepsbtFr } from "./analyzepsbt.fr";
import { backupwalletFr } from "./backupwallet.fr";
import { bumpfeeFr } from "./bumpfee.fr";
import { clearbannedFr } from "./clearbanned.fr";
import { combinepsbtFr } from "./combinepsbt.fr";
import { createrawtransactionFr } from "./createrawtransaction.fr";
import { createwalletFr } from "./createwallet.fr";
import { decodepsbtFr } from "./decodepsbt.fr";
import { decoderawtransactionFr } from "./decoderawtransaction.fr";
import { decodescriptFr } from "./decodescript.fr";
import { deriveaddressesFr } from "./deriveaddresses.fr";
import { disconnectnodeFr } from "./disconnectnode.fr";
import { dumpprivkeyFr } from "./dumpprivkey.fr";
import { dumpwalletFr } from "./dumpwallet.fr";
import { encryptwalletFr } from "./encryptwallet.fr";
import { enumeratesignersFr } from "./enumeratesigners.fr";
import { estimaterawfeeFr } from "./estimaterawfee.fr";
import { estimatesmartfeeFr } from "./estimatesmartfee.fr";
import { finalizepsbtFr } from "./finalizepsbt.fr";
import { fundrawtransactionFr } from "./fundrawtransaction.fr";
import { generateblockFr } from "./generateblock.fr";
import { generatetoaddressFr } from "./generatetoaddress.fr";
import { generatetodescriptorFr } from "./generatetodescriptor.fr";
import { getaddednodeinfoFr } from "./getaddednodeinfo.fr";
import { getaddressbylabelFr } from "./getaddressbylabel.fr";
import { getaddressinfoFr } from "./getaddressinfo.fr";
import { getbalanceFr } from "./getbalance.fr";
import { getbalancesFr } from "./getbalances.fr";
import { getbestblockhashFr } from "./getbestblockhash.fr";
import { getblockFr } from "./getblock.fr";
import { getblockchaininfoFr } from "./getblockchaininfo.fr";
import { getblockcountFr } from "./getblockcount.fr";
import { getblockfilterFr } from "./getblockfilter.fr";
import { getblockfrompeerFr } from "./getblockfrompeer.fr";
import { getblockhashFr } from "./getblockhash.fr";
import { getblockheaderFr } from "./getblockheader.fr";
import { getblockstatsFr } from "./getblockstats.fr";
import { getblocktemplateFr } from "./getblocktemplate.fr";
import { getchaintipsFr } from "./getchaintips.fr";
import { getchaintxstatsFr } from "./getchaintxstats.fr";
import { getconnectioncountFr } from "./getconnectioncount.fr";
import { getdeploymentinfoFr } from "./getdeploymentinfo.fr";
import { getdescriptorinfoFr } from "./getdescriptorinfo.fr";
import { getdifficultyFr } from "./getdifficulty.fr";
import { getindexinfoFr } from "./getindexinfo.fr";
import { getmemoryinfoFr } from "./getmemoryinfo.fr";
import { getmempoolancestorsFr } from "./getmempoolancestors.fr";
import { getmempoolinfoFr } from "./getmempoolinfo.fr";
import { getrawmempoolFr } from "./getrawmempool.fr";
import { getrawtransactionFr } from "./getrawtransaction.fr";
import { gettxoutproofFr } from "./gettxoutproof.fr";
import { gettxoutsetinfoFr } from "./gettxoutsetinfo.fr";
import { gettxoutFr } from "./gettxout.fr";
import { sendrawtransactionFr } from "./sendrawtransaction.fr";
import { submitpackageFr } from "./submitpackage.fr";
import { testmempoolacceptFr } from "./testmempoolaccept.fr";
import { validateaddressFr } from "./validateaddress.fr";
import { verifymessageFr } from "./verifymessage.fr";
import { getmempooldescendantsFr } from "./getmempooldescendants.fr";
import { getmempoolentryFr } from "./getmempoolentry.fr";
import { getmininginfoFr } from "./getmininginfo.fr";
import { getnettotalsFr } from "./getnettotals.fr";
import { getnetworkhashpsFr } from "./getnetworkhashps.fr";
import { getnetworkinfoFr } from "./getnetworkinfo.fr";
import { getnewaddressFr } from "./getnewaddress.fr";
import { getnodeaddressesFr } from "./getnodeaddresses.fr";
import { getpeerinfoFr } from "./getpeerinfo.fr";
import { getrawchangeaddressFr } from "./getrawchangeaddress.fr";
import { getreceivedbyaddressFr } from "./getreceivedbyaddress.fr";
import { getreceivedbylabelFr } from "./getreceivedbylabel.fr";
import { getrpcinfoFr } from "./getrpcinfo.fr";
import { gettransactionFr } from "./gettransaction.fr";
import { gettxspendingprevoutFr } from "./gettxspendingprevout.fr";
import { getwalletinfoFr } from "./getwalletinfo.fr";
import { getzmqnotificationsFr } from "./getzmqnotifications.fr";
import { helpFr } from "./help.fr";
import { importaddressFr } from "./importaddress.fr";
import { importdescriptorsFr } from "./importdescriptors.fr";
import { importmultiFr } from "./importmulti.fr";
import { importprivkeyFr } from "./importprivkey.fr";
import { importprunedfundsFr } from "./importprunedfunds.fr";
import { importpubkeyFr } from "./importpubkey.fr";
import { importwalletFr } from "./importwallet.fr";
import { joinpsbtsFr } from "./joinpsbts.fr";
import { keypoolrefillFr } from "./keypoolrefill.fr";
import { listaddressgroupingsFr } from "./listaddressgroupings.fr";
import { listbannedFr } from "./listbanned.fr";
import { listdescriptorsFr } from "./listdescriptors.fr";
import { listlabelsFr } from "./listlabels.fr";
import { listlockunspentFr } from "./listlockunspent.fr";
import { listreceivedbyaddressFr } from "./listreceivedbyaddress.fr";
import { listreceivedbylabelFr } from "./listreceivedbylabel.fr";
import { listsinceblockFr } from "./listsinceblock.fr";
import { listtransactionsFr } from "./listtransactions.fr";
import { listunspentFr } from "./listunspent.fr";
import { listwalletdirFr } from "./listwalletdir.fr";
import { listwalletsFr } from "./listwallets.fr";
import { loadwalletFr } from "./loadwallet.fr";
import { lockunspentFr } from "./lockunspent.fr";
import { loggingFr } from "./logging.fr";
import { migratewalletFr } from "./migratewallet.fr";
import { newkeypoolFr } from "./newkeypool.fr";
import { pingFr } from "./ping.fr";
import { preciousblockFr } from "./preciousblock.fr";
import { prioritisetransactionFr } from "./prioritisetransaction.fr";
import { pruneblockchainFr } from "./pruneblockchain.fr";
import { psbtbumpfeeFr } from "./psbtbumpfee.fr";
import { removeprunedfundsFr } from "./removeprunedfunds.fr";
import { rescanblockchainFr } from "./rescanblockchain.fr";
import { restorewalletFr } from "./restorewallet.fr";
import { savemempoolFr } from "./savemempool.fr";
import { scantxoutsetFr } from "./scantxoutset.fr";
import { sendFr } from "./send.fr";
import { sendallFr } from "./sendall.fr";
import { sendmanyFr } from "./sendmany.fr";
import { sendtoaddressFr } from "./sendtoaddress.fr";
import { setbanFr } from "./setban.fr";
import { sethdseedFr } from "./sethdseed.fr";
import { setlabelFr } from "./setlabel.fr";
import { setnetworkactiveFr } from "./setnetworkactive.fr";
import { settxfeeFr } from "./settxfee.fr";
import { setwalletflagFr } from "./setwalletflag.fr";
import { signmessageFr } from "./signmessage.fr";
import { signmessagewithprivkeyFr } from "./signmessagewithprivkey.fr";
import { signrawtransactionwithkeyFr } from "./signrawtransactionwithkey.fr";
import { signrawtransactionwithwalletFr } from "./signrawtransactionwithwallet.fr";
import { simulaterawtransactionFr } from "./simulaterawtransaction.fr";
import { stopFr } from "./stop.fr";
import { submitblockFr } from "./submitblock.fr";
import { submitheaderFr } from "./submitheader.fr";
import { unloadwalletFr } from "./unloadwallet.fr";
import { upgradewalletFr } from "./upgradewallet.fr";
import { uptimeFr } from "./uptime.fr";
import { utxoupdatepsbtFr } from "./utxoupdatepsbt.fr";
import { verifychainFr } from "./verifychain.fr";
import { verifytxoutproofFr } from "./verifytxoutproof.fr";
import { walletcreatefundedpsbtFr } from "./walletcreatefundedpsbt.fr";
import { walletdisplayaddressFr } from "./walletdisplayaddress.fr";
import { walletlockFr } from "./walletlock.fr";
import { walletpassphraseFr } from "./walletpassphrase.fr";
import { walletpassphrasechangeFr } from "./walletpassphrasechange.fr";
import { walletprocesspsbtFr } from "./walletprocesspsbt.fr";

type LocaleRPCRegistry = Record<string, RPCFunctionParams>;

const fr: LocaleRPCRegistry = {
  abandontransaction: abandontransactionFr,
  abortrescan: abortrescanFr,
  addmultisigaddress: addmultisigaddressFr,
  addnode: addnodeFr,
  analyzepsbt: analyzepsbtFr,
  backupwallet: backupwalletFr,
  bumpfee: bumpfeeFr,
  clearbanned: clearbannedFr,
  combinepsbt: combinepsbtFr,
  createrawtransaction: createrawtransactionFr,
  createwallet: createwalletFr,
  decodepsbt: decodepsbtFr,
  decoderawtransaction: decoderawtransactionFr,
  decodescript: decodescriptFr,
  deriveaddresses: deriveaddressesFr,
  disconnectnode: disconnectnodeFr,
  dumpprivkey: dumpprivkeyFr,
  dumpwallet: dumpwalletFr,
  encryptwallet: encryptwalletFr,
  enumeratesigners: enumeratesignersFr,
  estimaterawfee: estimaterawfeeFr,
  estimatesmartfee: estimatesmartfeeFr,
  finalizepsbt: finalizepsbtFr,
  fundrawtransaction: fundrawtransactionFr,
  generateblock: generateblockFr,
  generatetoaddress: generatetoaddressFr,
  generatetodescriptor: generatetodescriptorFr,
  getaddednodeinfo: getaddednodeinfoFr,
  getaddressbylabel: getaddressbylabelFr,
  getaddressinfo: getaddressinfoFr,
  getbalance: getbalanceFr,
  getbalances: getbalancesFr,
  getbestblockhash: getbestblockhashFr,
  getblock: getblockFr,
  getblockchaininfo: getblockchaininfoFr,
  getblockcount: getblockcountFr,
  getblockfilter: getblockfilterFr,
  getblockfrompeer: getblockfrompeerFr,
  getblockhash: getblockhashFr,
  getblockheader: getblockheaderFr,
  getblockstats: getblockstatsFr,
  getblocktemplate: getblocktemplateFr,
  getchaintips: getchaintipsFr,
  getchaintxstats: getchaintxstatsFr,
  getconnectioncount: getconnectioncountFr,
  getdeploymentinfo: getdeploymentinfoFr,
  getdescriptorinfo: getdescriptorinfoFr,
  getdifficulty: getdifficultyFr,
  getindexinfo: getindexinfoFr,
  getmemoryinfo: getmemoryinfoFr,
  getmempoolancestors: getmempoolancestorsFr,
  getmempoolinfo: getmempoolinfoFr,
  getrawmempool: getrawmempoolFr,
  getrawtransaction: getrawtransactionFr,
  gettxoutproof: gettxoutproofFr,
  gettxoutsetinfo: gettxoutsetinfoFr,
  gettxout: gettxoutFr,
  sendrawtransaction: sendrawtransactionFr,
  submitpackage: submitpackageFr,
  testmempoolaccept: testmempoolacceptFr,
  validateaddress: validateaddressFr,
  verifymessage: verifymessageFr,
  getmempooldescendants: getmempooldescendantsFr,
  getmempoolentry: getmempoolentryFr,
  getmininginfo: getmininginfoFr,
  getnettotals: getnettotalsFr,
  getnetworkhashps: getnetworkhashpsFr,
  getnetworkinfo: getnetworkinfoFr,
  getnewaddress: getnewaddressFr,
  getnodeaddresses: getnodeaddressesFr,
  getpeerinfo: getpeerinfoFr,
  getrawchangeaddress: getrawchangeaddressFr,
  getreceivedbyaddress: getreceivedbyaddressFr,
  getreceivedbylabel: getreceivedbylabelFr,
  getrpcinfo: getrpcinfoFr,
  gettransaction: gettransactionFr,
  gettxspendingprevout: gettxspendingprevoutFr,
  getwalletinfo: getwalletinfoFr,
  getzmqnotifications: getzmqnotificationsFr,
  help: helpFr,
  importaddress: importaddressFr,
  importdescriptors: importdescriptorsFr,
  importmulti: importmultiFr,
  importprivkey: importprivkeyFr,
  importprunedfunds: importprunedfundsFr,
  importpubkey: importpubkeyFr,
  importwallet: importwalletFr,
  joinpsbts: joinpsbtsFr,
  keypoolrefill: keypoolrefillFr,
  listaddressgroupings: listaddressgroupingsFr,
  listbanned: listbannedFr,
  listdescriptors: listdescriptorsFr,
  listlabels: listlabelsFr,
  listlockunspent: listlockunspentFr,
  listreceivedbyaddress: listreceivedbyaddressFr,
  listreceivedbylabel: listreceivedbylabelFr,
  listsinceblock: listsinceblockFr,
  listtransactions: listtransactionsFr,
  listunspent: listunspentFr,
  listwalletdir: listwalletdirFr,
  listwallets: listwalletsFr,
  loadwallet: loadwalletFr,
  lockunspent: lockunspentFr,
  logging: loggingFr,
  migratewallet: migratewalletFr,
  newkeypool: newkeypoolFr,
  ping: pingFr,
  preciousblock: preciousblockFr,
  prioritisetransaction: prioritisetransactionFr,
  pruneblockchain: pruneblockchainFr,
  psbtbumpfee: psbtbumpfeeFr,
  removeprunedfunds: removeprunedfundsFr,
  rescanblockchain: rescanblockchainFr,
  restorewallet: restorewalletFr,
  savemempool: savemempoolFr,
  scantxoutset: scantxoutsetFr,
  send: sendFr,
  sendall: sendallFr,
  sendmany: sendmanyFr,
  sendtoaddress: sendtoaddressFr,
  setban: setbanFr,
  sethdseed: sethdseedFr,
  setlabel: setlabelFr,
  setnetworkactive: setnetworkactiveFr,
  settxfee: settxfeeFr,
  setwalletflag: setwalletflagFr,
  signmessage: signmessageFr,
  signmessagewithprivkey: signmessagewithprivkeyFr,
  signrawtransactionwithkey: signrawtransactionwithkeyFr,
  signrawtransactionwithwallet: signrawtransactionwithwalletFr,
  simulaterawtransaction: simulaterawtransactionFr,
  stop: stopFr,
  submitblock: submitblockFr,
  submitheader: submitheaderFr,
  unloadwallet: unloadwalletFr,
  upgradewallet: upgradewalletFr,
  uptime: uptimeFr,
  utxoupdatepsbt: utxoupdatepsbtFr,
  verifychain: verifychainFr,
  verifytxoutproof: verifytxoutproofFr,
  walletcreatefundedpsbt: walletcreatefundedpsbtFr,
  walletdisplayaddress: walletdisplayaddressFr,
  walletlock: walletlockFr,
  walletpassphrase: walletpassphraseFr,
  walletpassphrasechange: walletpassphrasechangeFr,
  walletprocesspsbt: walletprocesspsbtFr,
};

const es: LocaleRPCRegistry = {
  // coworker: add Spanish RPC entries here, e.g.
  // abandontransaction: abandontransactionEs,
};

const rpcsByLocale: Record<string, LocaleRPCRegistry> = { fr, es };

export function getLocalizedRPC(
  english: RPCFunctionParams,
  locale: string | undefined
): RPCFunctionParams {
  if (!locale || locale === "en") return english;
  return rpcsByLocale[locale]?.[english.method] ?? english;
}

export function getEnglishRPC(method: string): RPCFunctionParams | undefined {
  return RPC_METHODS.find((m) => m.method === method);
}

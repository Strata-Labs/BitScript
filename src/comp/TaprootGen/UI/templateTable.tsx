import { useAtom, useSetAtom } from "jotai";
import { OUTPUT_TYPE, SCRIPT_LEAF, TaprootGenComponents } from "../types";
import {
  activeTaprootComponent,
  internalPublicKey,
  TaprootNodes,
} from "@/comp/atom";

export const TaprootTemplateTable = () => {
  const [nodeLeaf, setNodeLeaf] = useAtom(TaprootNodes);
  const setTaprootComponent = useSetAtom(activeTaprootComponent);
  const setInternalPubKey = useSetAtom(internalPublicKey);

  const addTapLeaf = (data: SCRIPT_LEAF[], internalPubkey: string) => {
    console.log("this is the public key: ", internalPubkey);
    setInternalPubKey(internalPubkey);
    setNodeLeaf(data);
    setTaprootComponent(TaprootGenComponents.NewScriptPathView);
  };
  // the Db table show follow this schema
  const templateData: {
    title: string;
    internalPubKey: string;
    description: string;
    tapLeafs: number;
    inputsRequired: number;
    scriptType: OUTPUT_TYPE;
    tapleafData: SCRIPT_LEAF[];
  }[] = [
    {
      title: "Ordinals",
      description:
        "A template for creating and managing Bitcoin Ordinals, allowing for the inscription of digital assets on individual satoshis.",
      internalPubKey:
        "a1633cafcc01ebfb6d78e39f687a1f0995c62fc95f51ead10a02ee0be551b5dc",
      tapLeafs: 2,
      inputsRequired: 2,
      scriptType: OUTPUT_TYPE.ORDINAL_TEMPLATE,
      tapleafData: [
        // add real data to this
        {
          description: "A template for creating and managing Bitcoin Ordinals.",
          id: "Ordinals-1",
          outputType: OUTPUT_TYPE.ORDINAL_TEMPLATE,
          script: [
            "OP_IF",
            "OP_PUSHDATA1",
            "ord",
            "OP_PUSHDATA1",
            "746578742f706c61696e3b636861727365743d7574662d38",
            "OP_PUSHDATA1",
            "666466646664666466646664666466",
            "OP_ENDIF",
          ],
          scriptType: OUTPUT_TYPE.ORDINAL_TEMPLATE,
          inputs: {
            mediaType: "text/plain;charset=utf-8",
            content: "68656C6C6F20776F726C64",
          },
          scriptHash:
            "2ca86cb7fc5991d16ae5ac419b4faa0011046bd654a0784a00a078cb0b95394a",
          scriptSize: 32,
          title: "ordinals and testing 1",
        },
        {
          description: "A template for creating and managing Bitcoin Ordinals.",
          id: "Ordinals-2",
          outputType: OUTPUT_TYPE.ORDINAL_TEMPLATE,
          script: [
            "OP_IF",
            "OP_PUSHDATA1",
            "ord",
            "OP_PUSHDATA1",
            "6170706c69636174696f6e2f6a736f6e",
            "OP_PUSHDATA1",
            "37423232373436353738373432323341323032323638363536433643364632303737364637323643363432323744",
            "OP_ENDIF",
          ],
          scriptType: OUTPUT_TYPE.ORDINAL_TEMPLATE,
          inputs: {
            mediaType: "application/json",
            content: "7B2274657874223A202268656C6C6F20776F726C64227D",
          },
          scriptHash:
            "06f566202a98ff07ad5a3419cd6b12b996a36fed69feebf4c7c006bbafb0177e",
          scriptSize: 32,
          title: "ordinals and testing 3",
        },
      ],
    },
    {
      title: "Family Vault",
      internalPubKey:
        "a1633cafcc01ebfb6d78e39f687a1f0995c62fc95f51ead10a02ee0be551b5dc",
      description:
        "A multi-signature setup for family wealth management, requiring multiple family members to authorize transactions for enhanced security.",
      tapLeafs: 2,
      inputsRequired: 2,
      scriptType: OUTPUT_TYPE.P2SH_MULTISIG,
      tapleafData: [
        {
          description:
            "Family Vault is a multi-signature setup for family wealth management, requiring multiple family members to authorize transactions for enhanced security.",
          id: "Family Vault",
          outputType: OUTPUT_TYPE.P2SH_MULTISIG,
          script: [
            "OP_2",
            "0269f54cbaa80145e008ed7d111c487593014632daa6b92b7c15960579d3482dfe",
            "022e5ae1a71603fe8c4770c2ce8bf99beb5edca0431695c74ebb74c059b0e6e7e8",
            "OP_2",
            "OP_CHECKMULTISIG",
          ],
          scriptType: OUTPUT_TYPE.P2SH_MULTISIG,
          inputs: {
            totalPublicKeys: "2",
            requiredSignatures: "2",
            "publicKey-0":
              "0269f54cbaa80145e008ed7d111c487593014632daa6b92b7c15960579d3482dfe",
            "publicKey-1":
              "022e5ae1a71603fe8c4770c2ce8bf99beb5edca0431695c74ebb74c059b0e6e7e8",
          },
          scriptHash:
            "85c27761b6acb0042e834e535bf155563c3bbc9d873904a5d983374c338ea9ca",
          scriptSize: 32,
          title: "Family Vault testing 1",
        },
        {
          description:
            "Family Vault is a multi-signature setup for family wealth management, requiring multiple family members to authorize transactions for enhanced security.",
          id: "Family Vault tesing ",
          outputType: OUTPUT_TYPE.P2SH_MULTISIG,
          script: [
            "OP_2",
            "03534c4c51931e49849e9f8a0d893060ffb5a7d94c1017527c532717ed75276f20",
            "03be6e7dea075f3714c743ab7a2b45d544e9f9c905765241232fbf50ecc9180456",
            "OP_2",
            "OP_CHECKMULTISIG",
          ],
          scriptType: OUTPUT_TYPE.P2SH_MULTISIG,
          inputs: {
            totalPublicKeys: "2",
            requiredSignatures: "2",
            "publicKey-0":
              "03534c4c51931e49849e9f8a0d893060ffb5a7d94c1017527c532717ed75276f20",
            "publicKey-1":
              "03be6e7dea075f3714c743ab7a2b45d544e9f9c905765241232fbf50ecc9180456",
          },
          scriptHash:
            "16759f998024df0d858b3ed9e536e15135cdd66cdff5987a0cccf825e8823926",
          scriptSize: 32,
          title: "Family Vault testing 1",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden">
          <p className="my-4 text-white">
            Select
            <span className="text-dark-orange"> Template </span>
            P2TR Output | Taproot Public Key
          </p>
          <div className="overflow-x-auto bg-dark-purple p-5">
            <table className="w-full table-auto">
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "75%" }} />
                <col style={{ width: "5%" }} />
                <col style={{ width: "5%" }} />
              </colgroup>
              <thead>
                <tr className="bg-lighter-dark-purple">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-xs font-light text-[#687588] sm:pl-3"
                  >
                    <div className="flex items-center gap-1">
                      <span>Title</span>
                      <img src="/drop-down.svg" alt="" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-light text-[#687588]"
                  >
                    <div className="flex items-center gap-1">
                      Description
                      <img src="/drop-down.svg" alt="" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-light text-[#687588]"
                  >
                    <div className="flex items-center gap-1">
                      Tapleafs
                      <img src="/drop-down.svg" alt="" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-light text-[#687588]"
                  >
                    <div className="flex items-center gap-1">
                      InputRequired
                      <img src="/drop-down.svg" alt="" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {templateData.map((data, i) => (
                  <tr
                    key={i}
                    onClick={() => {
                      addTapLeaf(data.tapleafData, data.internalPubKey);
                    }}
                    className="cursor-pointer"
                  >
                    <td className="py-4 pl-4 pr-3 text-sm font-light text-white  sm:pl-3">
                      {data.title}
                    </td>
                    <td className="px-3 py-4 text-xs font-light text-white">
                      {data.description}
                    </td>
                    <td className="px-3 py-4 text-xs font-light text-white">
                      {data.tapLeafs}
                    </td>
                    <td className="px-3 py-4 text-xs font-light text-white">
                      {data.inputsRequired}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaprootTemplateTable;

//   style={{
//     // maxHeight: "5em",
//     display: "-webkit-box",
//     WebkitLineClamp: 2,
//     WebkitBoxOrient: "vertical",
//   }}

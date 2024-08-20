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
    console.log("this is the public key: ", internalPubkey)
    setInternalPubKey(internalPubkey);
    setNodeLeaf(data);
    setTaprootComponent(TaprootGenComponents.NewScriptPathView);
  };
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
        {
          description: "A template for creating and managing Bitcoin Ordinals.",
          id: "Ordinals-1",
          outputType: OUTPUT_TYPE.ORDINAL_TEMPLATE,
          script: ["fdfdfdf"],
          scriptType: OUTPUT_TYPE.ORDINAL_TEMPLATE,
          inputs: {
            mediaType: "application/json",
            content: "fdfdfdfdfdfdfdfdfdfdfdfdf",
          },
          scriptHash: "2fdfdfdfjdiju9",
          scriptSize: 32,
          title: "ordinals and testing 1",
        },
        {
          description: "A template for creating and managing Bitcoin Ordinals.",
          id: "Ordinals-2",
          outputType: OUTPUT_TYPE.ORDINAL_TEMPLATE,
          script: ["fdfdfdf"],
          scriptType: OUTPUT_TYPE.ORDINAL_TEMPLATE,
          inputs: {
            mediaType: "application/json",
            content: "fdfdfdfdfdfdfdfdfdfdfdfdffdfdfdfd3434",
          },
          scriptHash: "2fdfdfdfjdiju9iufdfdfdf",
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
      tapLeafs: 3,
      inputsRequired: 3,
      scriptType: OUTPUT_TYPE.P2SH_MULTISIG,
      tapleafData: [
        {
          description: "Family Vault",
          id: "Family Vault",
          outputType: OUTPUT_TYPE.P2SH_MULTISIG,
          script: ["fdfdfdf"],
          scriptType: OUTPUT_TYPE.P2SH_MULTISIG,
          inputs: {
            totalPublicKeys: "2",
            requiredSignatures: "1",
            "publicKey-0": "f2b97d8c4f89bcd3e64f78e8a6b7c7a9d5f3e1a7",
            "publicKey-1": "f2b97d8c4f89bcd3e64f78e8a6b7c7a9d5f3e1a7",
          },
          scriptHash: "fdfkdjfdkfjdfkdjfkdjfdkfdjf",
          scriptSize: 32,
          title: "Family Vault testing 1",
        },
        {
          description:
            "Family Vault is a multi-signature setup for family wealth management, requiring multiple family members to authorize transactions for enhanced security.",
          id: "Family Vault tesing ",
          outputType: OUTPUT_TYPE.P2SH_MULTISIG,
          script: ["fdfdfdf"],
          scriptType: OUTPUT_TYPE.P2SH_MULTISIG,
          inputs: {
            totalPublicKeys: "2",
            requiredSignatures: "1",
            "publicKey-0": "f2b97d8c4f89bcd3e64f78e8a6b7c7a9d5f3e1a7",
            "publicKey-1": "f2b97d8c4f89bcd3e64f78e8a6b7c7a9d5f3e1a7",
          },
          scriptHash: "fdfdfdkfdfdfdkfjdfkdjf",
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
          <p className="my-4">
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
                    <td className="py-4 pl-4 pr-3 text-sm font-light  sm:pl-3">
                      {data.title}
                    </td>
                    <td className="px-3 py-4 text-xs font-light">
                      {data.description}
                    </td>
                    <td className="px-3 py-4 text-xs font-light">
                      {data.tapLeafs}
                    </td>
                    <td className="px-3 py-4 text-xs font-light">
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

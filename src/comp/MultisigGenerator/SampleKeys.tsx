import { useState } from "react";

// Sample keys for Bitcoin multisig testing
// These are public keys in compressed format (33 bytes, 66 hex chars)
const SAMPLE_KEYS = [
  // Compressed public keys (for all address types)
  "02e9af6073d5c1cb5234b9fd7b8bc35e640f9fda28589d84d1640b4c431a4c4e5a",
  "029fcd29f189f668cbe8b06b9ab3593b68d43456f27a5d1fb624ad1f98ca7424ee",
  "02c6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee5",
  "03fff97bd5755eeea420453a14355235d382f6472f8568a18b2f057a1460297556",
  "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
  "02f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
  "023aa7b2544fa6518089655e2a67d495391dd1c65d2a8cd9aed75ad74c556e7eed",
  // Uncompressed public keys (only for P2SH and P2MS)
  "04887c4d1f9a92798c9095636fc794b8a784b60ba54e35d02d0313e6555c6c1e8e0478bba6c0d09f61df5b6e4572a3fa2a1f8d188380b9d81655e8b18f66d61b27",
  "04d0de0aaeaefad02b8bdc8a01a1b8b11c696bd3d66a2c5f10780d95b7df42645cd85228a6fb29940e858e7e55842ae2bd115d1ed7cc0e82d934e929c97648cb0a",
];

interface SampleKeysProps {
  onSelectKey: (key: string) => void;
  copyToClipboard: (text: string) => Promise<boolean>;
  isCopied: boolean;
}

const SampleKeys = ({
  onSelectKey,
  copyToClipboard,
  isCopied,
}: SampleKeysProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (key: string, index: number) => {
    copyToClipboard(key);
    setCopiedIndex(index);
  };

  return (
    <div className="mb-6 rounded-lg border border-[#F3F3F3] bg-white p-4">
      <h3 className="mb-3 text-lg font-medium text-black">
        Sample Public Keys
      </h3>
      <p className="mb-3 text-sm font-extralight text-[#687588]">
        Click on a key to use it in your multisig address or click the copy
        button to copy it to clipboard.
      </p>
      <div className="space-y-2">
        {SAMPLE_KEYS.map((key, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => onSelectKey(key)}
              className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap rounded-l-full bg-[#F3F3F3] px-3 py-2 text-left text-sm font-extralight text-black hover:bg-[#E5E5E5]"
            >
              {key.length > 70
                ? key.substring(0, 30) + "..." + key.substring(key.length - 10)
                : key}
            </button>
            <button
              onClick={() => handleCopy(key, index)}
              className="rounded-r-full bg-[#0C071D] px-3 py-2 text-sm text-white hover:bg-[#1A1A2E]"
            >
              {copiedIndex === index && isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-[#687588]">
        <p>
          Note: Compressed keys (starting with 02/03) work with all address
          types.
        </p>
        <p>
          Uncompressed keys (starting with 04) only work with P2SH and Legacy
          formats.
        </p>
        <p>Taproot (P2TR) requires compressed keys only.</p>
      </div>
    </div>
  );
};

export default SampleKeys;

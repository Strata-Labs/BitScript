import { Handle, NodeProps, Position } from "react-flow-renderer";
import Image from "next/image";
import TapRootGenParnetIcon from "@/../public/TapRootGenParnetIcon.svg";

// Custom node component for parent nodes
 export const ParentNode = (props: NodeProps) => {
  console.log("props", props);
  const { data } = props;

  const lengthOfLetterId = data.letterId.length;

  // make 4 differnet ca
  // we need to dynmically handle the size of the text for the id cause that will overflow so fast
  return (
    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-dark-orange p-4">
      <div className="relative">
        <Image
          src={TapRootGenParnetIcon}
          height={40}
          width={40}
          alt="TapRootGenParnetIcon"
        />
        <div
          className="flex h-[25px] w-[25px] flex-col items-start justify-center bg-dark-orange px-2 py-1"
          style={{
            position: "absolute",
            bottom: "0px",
            right: "-4px",
          }}
        >
          <p className="text-[12px] font-bold text-white">
            {` ${data.letterId}`}
          </p>
        </div>
      </div>

      <Handle
        style={{
          opacity: 0,
        }}
        type="target"
        position={Position.Top}
      />
      {/* <div style={{ fontWeight: "bold", color: "#111827" }}>
        {data.label.slice(0, 4) + "..." + data.label.slice(-4)}
      </div> */}
      <Handle
        style={{
          opacity: 0,
        }}
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
};
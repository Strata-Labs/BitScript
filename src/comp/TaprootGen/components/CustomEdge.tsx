import { EdgeProps } from "react-flow-renderer";

export const CustomEdge = (props: EdgeProps) => {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } =
    props;
  const midY = (sourceY + targetY) / 2;

  const midX = (sourceX + targetX) / 2;

  const path = `
    M ${sourceX} ${sourceY}
    L ${sourceX} ${sourceY + 20}
    L ${midX} ${sourceY + 20}
    L ${midX} ${targetY - 20}
    L ${targetX} ${targetY - 20}
    L ${targetX} ${targetY}
  `;

  return (
    <path
      className="react-flow__edge-path"
      d={path}
      style={{
        fill: "none",
        stroke: "#6C5E70",
        strokeWidth: 2,
        strokeDasharray: "5,5",
      }}
    />
  );
};
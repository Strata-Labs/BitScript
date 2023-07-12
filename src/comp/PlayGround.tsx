import * as d3 from "d3";

import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_CON_COLOR = "#662B64";

const TopLevelPlayGround = () => {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(500);
  const [data, setData] = useState<number[]>([1, 2]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    renderStacks();
  }, [data]);
  const renderStacks = () => {
    const blocks = data;

    const squareSize = 150;

    const svg = d3.select(svgRef.current);

    return blocks.forEach((d, i) => {
      const x = squareSize * (i ? i + 0.4 : i) + 50;
      console.log(x);
      console.log(i);
      const y = height - 200;

      svg
        .append("line")
        .attr("x1", x - 4)
        .attr("y1", y + squareSize)
        .attr("x2", x + squareSize + 4)
        .attr("y2", y + squareSize)
        .attr("stroke", PLACEHOLDER_CON_COLOR)
        .attr("stroke-width", 8);

      svg
        .append("line")
        .attr("x1", x)
        .attr("y1", y + squareSize)
        .attr("x2", x)
        .attr("y2", y + squareSize * 0.25)
        .attr("stroke", PLACEHOLDER_CON_COLOR)
        .attr("stroke-width", 8);

      svg
        .append("line")
        .attr("x1", x + squareSize)
        .attr("y1", y + squareSize)
        .attr("x2", x + squareSize)
        .attr("y2", y + squareSize * 0.25)
        .attr("stroke", PLACEHOLDER_CON_COLOR)
        .attr("stroke-width", 8);

      svg
        .append("rect")
        .attr("x", x)
        .attr("y", y + squareSize * 0.25)
        .attr("width", squareSize)
        .attr("height", squareSize * 0.75)
        .attr("fill", "white");

      svg
        .append("line")
        .attr("x1", x)
        .attr("y1", y + squareSize * 0.25)
        .attr("x2", x + squareSize)
        .attr("y2", y + squareSize * 0.25)
        .attr("stroke", "white")
        .attr("stroke-width", 8);

      const itemsInBlock = [1, 2, 4];
      const renderItemsInBlock = itemsInBlock.forEach((d, i) => {
        const blockHeight = squareSize * 0.2;
        const paddingBlockHeight = blockHeight * 1.2;
        const blockWidth = squareSize * 0.8;
        const rec = svg
          .append("rect")
          .attr("x", x + squareSize * 0.1)
          .attr(
            "y",
            y +
              squareSize * 0.55 +
              (i > 0 ? i * paddingBlockHeight : i * blockHeight)
          )
          .attr("width", blockWidth)
          .attr("height", blockHeight)
          .attr("fill", "blue");

        rec
          .transition()
          .delay(i * 1000)
          .duration(2000)
          .attr("y", 0)

          .on("end", function () {
            // Reset the rectangle's position after the animation is complete
            // d3.select(this).attr(
            //   "y",
            //   y +
            //     squareSize * 0.55 +
            //     (i > 0 ? i * paddingBlockHeight : i * blockHeight)
            // );
            console.log("animation complete");
          });
      });
    });
  };

  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center">
      <svg ref={svgRef} className="bg-primary-gray"></svg>
    </div>
  );
};

const AnimatedView = () => {
  const data = [1, 2, 3, 4];
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 400;
    const height = 200;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Initial rendering
    render(data);

    // Update rendering when data changes
    function render(data: any) {
      // Data join
      const circles = svg.selectAll("circle").data(data);

      // Enter selection
      circles
        .enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", (d, i) => i * 40 + 20)
        .attr("r", 10)
        .attr("fill", "blue")
        .transition()
        .duration(1000)
        .attr("cx", width / 2);

      // Update selection
      circles
        .transition()
        .duration(1000)
        .attr("cy", (d, i) => i * 40 + 20);

      // Exit selection
      circles.exit().transition().duration(1000).attr("cx", width).remove();
    }
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

const PlayGround = () => {
  // Define the dimensions of the SVG container and the square

  const svgRef = useRef(null);

  useEffect(() => {
    const width = 200;
    const height = 200;
    const squareSize = 150;
    const x = (width - squareSize) / 2;
    const y = (height - squareSize) / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg
      .append("line")
      .attr("x1", x - 4)
      .attr("y1", y + squareSize)
      .attr("x2", x + squareSize + 4)
      .attr("y2", y + squareSize)
      .attr("stroke", PLACEHOLDER_CON_COLOR)
      .attr("stroke-width", 8);

    svg
      .append("line")
      .attr("x1", x)
      .attr("y1", y + squareSize)
      .attr("x2", x)
      .attr("y2", y + squareSize * 0.25)
      .attr("stroke", PLACEHOLDER_CON_COLOR)
      .attr("stroke-width", 8);

    svg
      .append("line")
      .attr("x1", x + squareSize)
      .attr("y1", y + squareSize)
      .attr("x2", x + squareSize)
      .attr("y2", y + squareSize * 0.25)
      .attr("stroke", PLACEHOLDER_CON_COLOR)
      .attr("stroke-width", 8);

    svg
      .append("rect")
      .attr("x", x)
      .attr("y", y + squareSize * 0.25)
      .attr("width", squareSize)
      .attr("height", squareSize * 0.75)
      .attr("fill", "white");

    svg
      .append("line")
      .attr("x1", x)
      .attr("y1", y + squareSize * 0.25)
      .attr("x2", x + squareSize)
      .attr("y2", y + squareSize * 0.25)
      .attr("stroke", "white")
      .attr("stroke-width", 8);
  }, []);

  return (
    <div className="min-h-screen w-full bg-primary-gray flex items-center justify-center">
      <svg ref={svgRef}></svg>;
    </div>
  );
};

const RandomD3ThatDetectsMouse = () => {
  const [data, setData] = useState<number[]>(() =>
    d3.ticks(-2, 2, 200).map(Math.sin)
  );

  const width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20;

  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );
  const y = d3.scaleLinear(d3.extent([1, 4]) as number[], [
    height - marginBottom,
    marginTop,
  ]);
  const line = d3.line((d, i) => x(i), y);

  function onMouseMove(event: any) {
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className="min-h-screen w-full bg-gray-100 flex items-center justify-center"
    >
      <svg width={width} height={height}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          d={line(data) as any}
        />
        <g fill="white" stroke="currentColor" strokeWidth="1.5">
          {data.map((d, i) => (
            <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
          ))}
        </g>
      </svg>
    </div>
  );
};
export default TopLevelPlayGround;

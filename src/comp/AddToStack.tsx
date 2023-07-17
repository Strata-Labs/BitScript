import * as d3 from "d3";

import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_CON_COLOR = "#662B64";

type DATA_NODE = {
  text: string | null;
  value: number;
};

const SQUARE_SIZE = 150;
const AddToStack = () => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);
  const [data, setData] = useState<Array<Array<number>>>([[], []]);
  const svgRef = useRef(null);

  const handlePopFromStack = () => {
    // need to be able to get the item at the tope of the stack in first column
    // and then push it up to the next stack
    if (data[0].length === 0) return;
    const svg = d3.select(svgRef.current);

    const rec = svg.select(`.COLUMN-0-${data[0].length - 1}`);
    if (rec) {
      const oldHeight = data[0].length;

      const stackLength = data[1].length;
      const squareSize = SQUARE_SIZE;

      const blockHeight = squareSize * 0.2;
      console.log("blockHeight", blockHeight);
      const blockWidth = squareSize * 0.8;

      const _y = height - blockHeight / 0.5;

      const oldY =
        _y -
        (stackLength > 0 ? blockHeight * 1.08 : blockHeight) *
          (stackLength + 1);

      const y = height - blockHeight / 0.5;

      const newY =
        y -
        (stackLength > 0 ? blockHeight * 1.08 : blockHeight) *
          (stackLength + 1);
      console.log("newY", newY);
      const x = squareSize * 1 + 50;

      const update = data[0];
      // rmeove the last item from the stack
      update.pop();

      const latestSecondIndex = [...data[1]];
      latestSecondIndex.push(1);
      const latest = [update, latestSecondIndex];

      rec
        .classed(`COLUMN-0-${data[0].length}`, false)
        .classed(`COLUMN-1-${stackLength}`, true)
        .transition()

        .duration(1000)
        .attr("y", oldY - 100)
        .transition()
        .duration(1000)
        .attr("x", x + squareSize * 0.5)

        .transition()
        .duration(1000)
        .attr("y", newY)
        .on("end", () => {
          setData(latest);
        });
    }
  };
  const handleAddToStack = () => {
    // add an item to the stack at thr top
    const stackLength = data[0].length;
    const squareSize = SQUARE_SIZE;

    const blockHeight = squareSize * 0.2;
    console.log("blockHeight", blockHeight);
    const blockWidth = squareSize * 0.8;

    const y = height - blockHeight / 0.5;

    const startY =
      y -
      (stackLength > 0 ? blockHeight * 1.08 : blockHeight) * (stackLength + 1);
    console.log("startY", startY);
    const x = squareSize * 0 + 50;

    const svg = d3.select(svgRef.current);
    const latest = [...data];
    latest[0].push(1);
    setData(latest);

    const group = svg.append("g");

    const rec = group
      .append("rect")
      .attr("x", x - squareSize)
      .attr("y", startY - 100)
      .attr("width", blockWidth)
      .attr("height", blockHeight)
      .attr("fill", "blue")
      .classed(`COLUMN-0-${stackLength}`, true)
      .transition()
      .duration(1000)
      .attr("x", x + squareSize * 0.1)
      .transition()
      .duration(1000)
      .attr("y", startY);
  };
  useEffect(() => {
    const squareSize = SQUARE_SIZE;

    data.forEach((d, i) => {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      // we need to set the first container that is the stack
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
        .attr("stroke", i === 0 ? PLACEHOLDER_CON_COLOR : "transparent")
        .attr("stroke-width", 8);

      svg
        .append("line")
        .attr("x1", x)
        .attr("y1", y + squareSize)
        .attr("x2", x)
        .attr("y2", y + squareSize * 0.25)
        .attr("stroke", i === 0 ? PLACEHOLDER_CON_COLOR : "transparent")
        .attr("stroke-width", 8);

      svg
        .append("line")
        .attr("x1", x + squareSize)
        .attr("y1", y + squareSize)
        .attr("x2", x + squareSize)
        .attr("y2", y + squareSize * 0.25)
        .attr("stroke", i === 0 ? PLACEHOLDER_CON_COLOR : "transparent")
        .attr("stroke-width", 8);

      svg
        .append("rect")
        .attr("x", x)
        .attr("y", y + squareSize * 0.25)
        .attr("width", squareSize)
        .attr("height", squareSize * 0.75)
        .attr("fill", "transparent");
    });

    // svg
    //   .append("line")
    //   .attr("x1", x)
    //   .attr("y1", y + squareSize * 0.25)
    //   .attr("x2", x + squareSize)
    //   .attr("y2", y + squareSize * 0.25)
    //   .attr("stroke", "white")
    //   .attr("stroke-width", 8);
  }, [data]);

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col gap-y-10 items-center justify-center">
      <svg ref={svgRef} className="bg-primary-gray"></svg>
      <div className="flex flex-row items-center gap-x-4">
        <button
          onClick={() => handleAddToStack()}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Add to Stack
        </button>
        <button
          type="button"
          onClick={() => handlePopFromStack()}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Pop from Stack
        </button>
      </div>
    </div>
  );
};

export default AddToStack;

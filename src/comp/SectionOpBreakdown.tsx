import * as d3 from "d3";

import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_CON_COLOR = "#456F97";
const SQUARE_SIZE = 155;
const COLUMN_WIDTH = 200;
const BLOCK_WIDTH = SQUARE_SIZE * 0.8;

const BLOCK_ITEM_HEIGHT = SQUARE_SIZE * 0.2;
enum LANG_TYPE {
  OPERATORS = "OPERATORS",
  LANG_TYPE = "LANG_TYPE",
}
type DATA_NODE = {
  text: string | null;
  value: number;
  tye: LANG_TYPE;
  className: string;
};
const BasicOp = () => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);

  const [queStack, setQueStack] = useState<Array<DATA_NODE>>([]);
  const [processStack, setProcessStack] = useState<Array<DATA_NODE>>([]);

  const svgRef = useRef(null);

  useEffect(() => {
    const squareSize = SQUARE_SIZE;
    const data = [queStack, processStack];
    const sectionRecWidth = 200;
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Animate the dashed line to follow the path
    // path
    //   .attr("stroke-dashoffset", 200) // Start the dash pattern from the end
    //   .transition()
    //   .duration(3000) // Set the duration of the animation
    //   .ease(d3.easeLinear) // Set the easing function
    //   .attr("stroke-dashoffset", 0); // Animate the dash pattern to the beginning

    // Add the arrow marker definition
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow-marker")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("refX", 9)
      .attr("refY", 3)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,0 L0,6 L9,3 z")
      .attr("fill", "blue");
    // setting up the placeholder columns for visualizing the stacks
    // svg
    //   .append("rect")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("width", sectionRecWidth)
    //   .attr("height", height)
    //   .attr("fill", "red");

    svg
      .append("rect")
      .attr("x", sectionRecWidth)
      .attr("y", 0)
      .attr("width", sectionRecWidth)
      .attr("height", height)
      .attr("fill", "orange");

    svg
      .append("rect")
      .attr("x", sectionRecWidth * 2)
      .attr("y", 0)
      .attr("width", sectionRecWidth)
      .attr("height", height)
      .attr("fill", "gray");

    svg
      .append("rect")
      .attr("x", sectionRecWidth * 3)
      .attr("y", 0)
      .attr("width", sectionRecWidth)
      .attr("height", height)
      .attr("fill", "pink");

    data.forEach((d, i) => {
      // we need to set the first container that is the stack

      // we need to find where the top left of the contaienr should be
      // we know that the width of the whole thing is 200 and the width of the container is 150
      // so we need to find the difference and divide by 2

      const halfCon = COLUMN_WIDTH / 2;
      const halfSquare = SQUARE_SIZE / 2;
      const startX = halfCon - halfSquare;

      const y = height - SQUARE_SIZE * 1.25;

      console.log(i);

      const SquareBottomConWidth = SQUARE_SIZE * 1.15;
      const halfSquareBottom = SquareBottomConWidth / 2;
      const startXBottom = halfCon - halfSquareBottom + 10;

      // Define the path data

      const initArrowPathData = `  
        M ${halfCon}, ${y + squareSize * 0.8}, 
        L ${halfCon},${y + squareSize * 0.8} 
        L ${halfCon},${y + squareSize * 0.8} 
        L ${halfCon},${y + squareSize * 0.8} 
      `;

      const init2 = ` 
        M ${halfCon},${y + squareSize * 0.8}  
        L ${halfCon}, 250 
        L ${halfCon}, 250 
        L ${halfCon}, 250 
      `;

      const init3 = `  
        M ${halfCon},${y + squareSize * 0.8} 
        L ${halfCon},250 
        L ${COLUMN_WIDTH + halfCon},250
        L ${COLUMN_WIDTH + halfCon},250
      `;

      const arrowPathData = `
        M ${halfCon},${y + squareSize * 0.8} 
        L ${halfCon},250 
        L ${COLUMN_WIDTH + halfCon},250
        L ${COLUMN_WIDTH + halfCon}, ${y + squareSize * 0.55}
      `;

      // Append the path element
      const path = svg
        .append("path")
        .attr("d", initArrowPathData)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "10,5") // Set the dash pattern
        .attr("marker-end", "url(#arrow-marker)") // Add an arrow marker at the end
        .transition()

        .duration(1000) // Set the duration of the animation in milliseconds
        .attrTween("d", function () {
          const interpolator = d3.interpolate(initArrowPathData, init2);
          return function (t) {
            console.log("t", t);
            return interpolator(t);
          };
        })
        .transition()

        .duration(1000) // Set the duration of the animation in milliseconds
        .attrTween("d", function () {
          const interpolator = d3.interpolate(init2, init3);
          return function (t) {
            console.log("t", t);
            return interpolator(t);
          };
        })
        .transition()

        .duration(1000) // Set the duration of the animation in milliseconds
        .attrTween("d", function () {
          const interpolator = d3.interpolate(init3, arrowPathData);
          return function (t) {
            console.log("t", t);
            return interpolator(t);
          };
        });
      // Calculate the total length of the path

      const pathData = `
      M ${startXBottom},${y + squareSize * 0.95}
      L ${SquareBottomConWidth},${y + squareSize * 0.95}
    `;

      svg
        .append("path")
        .attr("d", pathData)

        .attr("stroke", "#456F974D")
        .attr("stroke-width", 10)
        .attr("stroke-linecap", "round");

      const leftSidePathData = `
        M ${startXBottom},${y + squareSize * 0.95}
        L ${startXBottom},${y}
      `;

      svg
        .append("path")
        .attr("d", leftSidePathData)

        .attr("stroke", "#456F974D")
        .attr("stroke-width", 8)
        .attr("stroke-linecap", "round");

      const rightSidePathData = `

        M ${SquareBottomConWidth},${y + squareSize * 0.95}
        L ${SquareBottomConWidth},${y}
      `;

      svg
        .append("path")
        .attr("d", rightSidePathData)

        .attr("stroke", "#456F974D")
        .attr("stroke-width", 8)
        .attr("stroke-linecap", "round");

      if (i === 0) {
        svg
          .append("rect")
          .attr("x", startX)
          .attr("y", y)
          .attr("width", squareSize)
          .attr("height", squareSize * 0.95)
          .attr("fill", "white");
      }
    });
  }, []);

  const handleAddToStack = () => {
    // add an item to the stack at thr top
    const stackLength = queStack.length;

    const latest = [...queStack];
    latest.push({
      text: "test",
      value: 1,
      tye: LANG_TYPE.LANG_TYPE,
      className: `COLUMN-0-${stackLength}`,
    });

    const svg = d3.select(svgRef.current);
    const group = svg.append("g");

    const finalXPosition = COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2;
    let finalYPosition = 0;

    const CONTAINER_TOP_LEFT_Y = height - SQUARE_SIZE * 1.25;
    const CONTAINER_BOTTOM_LEFT_Y = CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 0.95;
    console.log("stackLength", stackLength);
    if (stackLength === 0) {
      finalYPosition = CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4;
    } else {
      finalYPosition =
        CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4 * (stackLength + 1);
    }
    console.log("finalYPosition", finalYPosition);
    const startY = finalYPosition - 140;
    const startX = finalXPosition - 100;
    const rec = group
      .append("rect")
      .attr("x", startX)
      .attr("y", startY)
      .attr("width", BLOCK_WIDTH)
      .attr("height", BLOCK_ITEM_HEIGHT)
      .attr("fill", "blue")
      .classed(`COLUMN-0-${stackLength}`, true)
      .transition()
      .duration(500)
      .attr("x", finalXPosition)
      .transition()
      .duration(1000)
      .attr("y", finalYPosition)
      .on("end", () => {
        setQueStack(latest);
      });
  };

  const popLatestToProcess = () => {
    const processStackLength = processStack.length;
    if (queStack.length === 0) return;

    const svg = d3.select(svgRef.current);
    const rec = svg.select(`.COLUMN-0-${queStack.length - 1}`);

    if (rec) {
      const finalXPosition = COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2 + 200;
      let finalYPosition = 0;

      const CONTAINER_TOP_LEFT_Y = height - SQUARE_SIZE * 1.25;
      const CONTAINER_BOTTOM_LEFT_Y = CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 0.95;

      if (processStackLength === 0) {
        finalYPosition = CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4;
      } else {
        finalYPosition =
          CONTAINER_BOTTOM_LEFT_Y -
          BLOCK_ITEM_HEIGHT * 1.4 * (processStackLength + 1);
      }

      const update = queStack;
      const lastItem = queStack[queStack.length - 1];

      // remove the last item from the stack
      update.pop();

      const latestSecondIndex = [...processStack];
      latestSecondIndex.push({
        ...lastItem,
        className: `COLUMN-1-${processStackLength}`,
      });

      const oldY = +rec.attr("y");
      // const oldX = +rec.attr("x");
      // console.log("oldX", oldX);

      rec
        .classed(`COLUMN-0-${queStack.length}`, false)
        .classed(`COLUMN-1-${processStackLength}`, true)
        .transition()

        .duration(1000)
        .attr("y", oldY - SQUARE_SIZE * 0.95)
        .transition()
        .duration(1000)
        .attr("x", finalXPosition)

        .transition()
        .duration(1000)
        .attr("y", finalYPosition)
        .on("end", () => {
          setProcessStack(latestSecondIndex);
          setQueStack(update);
        });
    }
  };

  const addOpAdd = () => {
    if (processStack.length <= 1) return;

    // check if any items in the stack are operators
    // if not then return
    const hasOperators = processStack.some(
      (d) => d.tye === LANG_TYPE.OPERATORS
    );
    console.log("hasOperators", hasOperators);
    if (hasOperators) {
      //handleProcessOpAdd();
    } else {
      const svg = d3.select(svgRef.current);

      const processStackLength = processStack.length;
      SQUARE_SIZE;

      const finalXPosition = COLUMN_WIDTH / 2 - BLOCK_WIDTH / 2 + 200;
      let finalYPosition = 0;

      const CONTAINER_TOP_LEFT_Y = height - SQUARE_SIZE * 1.25;
      const CONTAINER_BOTTOM_LEFT_Y = CONTAINER_TOP_LEFT_Y + SQUARE_SIZE * 0.95;

      if (processStackLength === 0) {
        finalYPosition = CONTAINER_BOTTOM_LEFT_Y - BLOCK_ITEM_HEIGHT * 1.4;
      } else {
        finalYPosition =
          CONTAINER_BOTTOM_LEFT_Y -
          BLOCK_ITEM_HEIGHT * 1.4 * (processStackLength + 1);
      }

      const latest = [...processStack];
      latest.push({
        text: "OP_ADD",
        value: 1,
        tye: LANG_TYPE.OPERATORS,
        className: `COLUMN-1-${processStackLength}`,
      });

      console.log("latest", latest);

      const rec = svg
        .append("rect")
        .attr("x", finalXPosition)
        .attr("y", 0)
        .attr("width", BLOCK_WIDTH)
        .attr("height", BLOCK_ITEM_HEIGHT)
        .attr("fill", "purple")
        .classed(`COLUMN-1-${processStackLength}`, true)
        // .transition()
        // .duration(1000)
        // .attr("x", finalXPosition)
        .transition()
        .duration(1000)
        .attr("y", finalYPosition)
        .on("end", () => {
          setProcessStack(latest);
        });
    }
  };

  const handleProcessOpAdd = () => {
    console.log("does this run");
    // first we need to animate the items in the processing stack to get deleted
    // get the top 3 items in process stack
    const svg = d3.select(svgRef.current);

    // get the top 3 items in process stack
    console.log("processStack", processStack);
    const topThree = processStack.slice(
      processStack.length - 3,
      processStack.length
    );

    const updatedProcessStack = processStack.slice(0, processStack.length - 3);

    console.log("topThree", topThree);
    // make a single string holding all the classNames
    const classNames = topThree.reduce((acc, curr, index) => {
      return (
        acc +
        `.COLUMN-1-${processStack.length - index - 1}${
          topThree.length - 1 !== index ? "," : ""
        }`
      );
      return "";
    }, "");

    const elements = svg.selectAll(classNames);
    if (elements) {
      elements
        .transition()

        .duration(1000)
        .attr("y", height - 100)
        .end()
        .then(() => {
          // Remove nodes after animation completes

          elements.remove();

          setProcessStack(updatedProcessStack);
          handleShowSum();
        });
    }
    console.log("classNames", classNames);
  };

  const handleShowSum = () => {
    const svg = d3.select(svgRef.current);

    const initHeight = height;
    const stackLength = 1;
    const squareSize = SQUARE_SIZE;
    const blockHeight = squareSize * 0.2;
    const blockWidth = squareSize * 0.8;

    const _y = height - blockHeight / 0.5;
    const y = height - blockHeight / 0.5;

    const newY =
      y -
      (queStack.length > 0 ? blockHeight * 1.08 : blockHeight) *
        (queStack.length + 1);

    const xOld = squareSize * 1 + 50;
    const xNew = squareSize * 0 + 50;

    const rec = svg
      .append("rect")
      .attr("x", xOld + squareSize * 0.5)
      .attr("y", newY)
      .attr("width", blockWidth)
      .attr("height", blockHeight)
      .attr("fill", "green")
      .classed(`COLUMN-0-${queStack.length}`, true)
      .transition()
      .duration(1000)
      .attr("y", newY - 150)
      .transition()
      .duration(1000)
      .attr("x", xNew + squareSize * 0.1)
      .transition()
      .duration(1000)
      .attr("y", newY)
      .on("end", () => {
        const latest = [...queStack];
        latest.push({
          text: "text",
          value: 1,
          tye: LANG_TYPE.LANG_TYPE,
          className: `COLUMN-1-${queStack.length}`,
        });

        setQueStack(latest);
      });
  };
  return (
    <div className="min-h-screen w-screen bg-white flex flex-col gap-y-10 items-center justify-center">
      <svg ref={svgRef} className="bg-primary-gray"></svg>
      <div className="flex flex-row items-center gap-x-4">
        <button
          type="button"
          onClick={() => handleAddToStack()}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Add to Stack
        </button>
        <button
          onClick={() => popLatestToProcess()}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Pop from Stack
        </button>
        <button
          onClick={() => addOpAdd()}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Add OP_ADD
        </button>
        <button
          onClick={() => handleProcessOpAdd()}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          process OP_ADD
        </button>
      </div>
    </div>
  );
};

export default BasicOp;

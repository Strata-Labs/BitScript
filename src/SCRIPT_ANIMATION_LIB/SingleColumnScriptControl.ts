import * as d3 from "d3"

import { CORE_OP_CODE, CORE_SCRIPT_DATA, SATOSHI_ART_BOARD } from "@/OPS_ANIMATION_LIB"

import { SCRIPT_DATA_STACK } from "."
import { OpDupAnimator } from "./SingleColumnOpCodeAnimators/OpDupAnimator"
import OpCodeAnimator from "./SingleColumnOpCodeAnimators/OpCodeAnimator"
import { OpHash160Animator } from "./SingleColumnOpCodeAnimators/OpHash160Animator"
import { OpCheckSigAnimator } from "./SingleColumnOpCodeAnimators/OpCheckSigAnimator"

// backgroundFillColor: '#29233a',

interface SingleColumnScriptControlParams {
  height: number
  scriptSteps: SCRIPT_DATA_STACK[]
  width: number
}

interface BlockPosition {
  x: number,
  y: number,
}

export class SingleColumnScriptControl {
  readonly BACKGROUND_FILL_COLOR = '#29233a'
  readonly OPS_FONT_STYLE = '16px sora'
  readonly STACK_DATA_COLOR = "#1D267D"
  readonly MIN_STACK_CAPACITY = 3

  readonly STACK_CONTAINER_SIZE = 200
  readonly SQUARE_BORDER_COLOR = '#456f974d'

  readonly BLOCK_BORDER_RADIUS = 3
  readonly BLOCK_HEIGHT = this.STACK_CONTAINER_SIZE * 0.25
  readonly BLOCK_WIDTH = this.STACK_CONTAINER_SIZE * 0.8

  currentStack: CORE_SCRIPT_DATA[]
  height: number
  scriptSteps: SCRIPT_DATA_STACK[]
  currentStepIndex: number
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
  width: number

  constructor(params: SingleColumnScriptControlParams) {
    const {
      height,
      scriptSteps,
      width,
    } = params

    this.scriptSteps = scriptSteps
    this.svg = d3.select(`#${SATOSHI_ART_BOARD}`)
      .attr('width', width)
      .attr('height', height)

    this.height = height
    this.width = width

    this.currentStepIndex = 0
    this.currentStack = []
    console.log(scriptSteps)
  }

  async setStep(step: number) {
    if (step < 0 || step >= this.scriptSteps.length) {
      return
    }

    this.currentStepIndex = step

    await this.clearRender()

    this.currentStack = this.scriptSteps[this.currentStepIndex].beforeStack
    await this.renderStack(this.currentStack, this.scriptSteps[this.currentStepIndex].currentStack.length)

    await this.renderAction()
  }

  async clearRender() {
    // fade out
    await this.svg.selectAll('*')
      .transition()
      .duration(750)
      .style('opacity', 0)
      .end()
  
    // delete elements
    this.svg.selectAll('*').remove()
  }

  async renderStack(stack: CORE_SCRIPT_DATA[], stackLength: number) {
    const startX = (this.width / 2) - (this.STACK_CONTAINER_SIZE / 2)
    const y = this.height - (this.STACK_CONTAINER_SIZE * 1.25)

    this.drawBackground(startX, y)
    this.drawStackContainer(startX, y)
    this.drawStack(stack, stackLength)
  }

  async renderAction() {
    const currentStep = this.scriptSteps[this.currentStepIndex]

    if (currentStep.stackData) {
      await this.pushStackData(currentStep.stackData)
    } else if (currentStep.opCode) {
      await this.executeOpCode(currentStep.opCode)
    }
  }

  async pushStackData(stackData: CORE_SCRIPT_DATA) {
    const {
      x: blockX,
      y: blockY,
    } = this.getStackBlockPosition(this.currentStack.length, this.currentStack.length + 1)

    const startX = blockX - 100
    const startY = blockY - 140

    const drawRect = this.svg
      .append("rect")
      .attr("x", startX)
      .attr("y", startY)
      .attr("rx", this.BLOCK_BORDER_RADIUS)
      .attr("width", this.BLOCK_WIDTH)
      .attr("height", this.getBlockHeight(this.currentStack.length + 1))
      .attr("fill", this.STACK_DATA_COLOR)
      .classed(`COLUMN-0-${this.currentStack.length}`, true)
      .transition()
      .duration(500)
      .attr("x", blockX)
      .transition()
      .duration(1000)
      .attr("y", blockY)
      .end()

    const text = this.svg
      .append("text")
      .text(stackData.dataString || stackData.dataNumber || "")
      .attr("fill", "white")
      .attr("x", startX + (this.getBlockHeight(this.currentStack.length + 1) / 2))
      .attr("y", startY + (this.getBlockHeight(this.currentStack.length + 1) / 1.5))
      .style("font", this.OPS_FONT_STYLE)
      .style("opacity", 0)
      .classed(`COLUMN-0-${this.currentStack.length}-text`, true)

    const textWidth = text.node()?.getBBox().width
    const textHeight = text.node()?.getBBox().height

    if (textWidth && textHeight) {
      text.attr("x", blockX + (this.BLOCK_WIDTH / 2) - (textWidth / 2))
    }

    const drawText = text
      .transition()
      .duration(500)
      .style("opacity", 1)
      .transition()
      .duration(1000)
      .attr("y", blockY + (this.getBlockHeight(this.currentStack.length + 1) / 1.5))
      .end()

    await Promise.all([drawRect, drawText])

    this.currentStack.push(stackData)
  }

  async pushStackDataFromOpCode(stackData: CORE_SCRIPT_DATA) {
    const {
      x: blockX,
      y: blockY,
    } = this.getStackBlockPosition(this.currentStack.length, this.currentStack.length + 1)

    const {
      x: startX,
      y: startY,
    } = this.getOpCodeBlockPosition()

    const drawRect = this.svg
      .append("rect")
      .attr("x", startX)
      .attr("y", startY)
      .attr("rx", this.BLOCK_BORDER_RADIUS)
      .attr("width", this.BLOCK_WIDTH)
      .attr("height", this.getBlockHeight(this.currentStack.length + 1))
      .attr("fill", this.STACK_DATA_COLOR)
      .classed(`COLUMN-0-${this.currentStack.length}`, true)
      .transition()
      .duration(500)
      .attr("x", blockX)
      .transition()
      .duration(1000)
      .attr("y", blockY)
      .end()

    const text = this.svg
      .append("text")
      .text(stackData.dataString || stackData.dataNumber || "")
      .attr("fill", "white")
      .attr("x", startX + (this.getBlockHeight(this.currentStack.length + 1) / 2))
      .attr("y", startY + (this.getBlockHeight(this.currentStack.length + 1) / 1.5))
      .style("font", this.OPS_FONT_STYLE)
      .style("opacity", 0)
      .classed(`COLUMN-0-${this.currentStack.length}-text`, true)

    const textWidth = text.node()?.getBBox().width
    const textHeight = text.node()?.getBBox().height

    if (textWidth && textHeight) {
      text.attr("x", blockX + (this.BLOCK_WIDTH / 2) - (textWidth / 2))
    }

    const drawText = text
      .transition()
      .duration(500)
      .style("opacity", 1)
      .transition()
      .duration(1000)
      .attr("y", blockY + (this.getBlockHeight(this.currentStack.length + 1) / 1.5))
      .end()

    await Promise.all([drawRect, drawText])

    this.currentStack.push(stackData)
  }

  async popStackData() {
    const finalY = this.getOpCodeBlockPosition()

    const drawRect = this.svg
      .select(`.COLUMN-0-${this.currentStack.length - 1}`)
      .transition()
      .duration(1000)
      .attr("y", finalY.y)
      .style("opacity", 0)
      .end()


    const drawText = this.svg
      .select(`.COLUMN-0-${this.currentStack.length - 1}-text`)
      .transition()
      .duration(1000)
      .attr("y", finalY.y + (this.getBlockHeight(this.currentStack.length) / 1.5))
      .style("opacity", 0)
      .end()

    await Promise.all([drawRect, drawText])

    this.currentStack.pop()
  }

  // like popStackData, but floats an outline of the top element of the stack while leaving the stack intact
  async ghostPopStackData() {
    const stackData = this.currentStack[this.currentStack.length - 1]

    const {
      x: startX,
      y: startY,
    } = this.getStackBlockPosition(this.currentStack.length - 1, this.currentStack.length)

    const finalY = this.getOpCodeBlockPosition()

    const drawRect = this.svg
      .append("rect")
      .attr("x", startX)
      .attr("y", startY)
      .attr("rx", this.BLOCK_BORDER_RADIUS)
      .attr("width", this.BLOCK_WIDTH)
      .attr("height", this.getBlockHeight(this.currentStack.length))
      .attr("fill", 'transparent')
      .attr("stroke", "white")
      .attr("stroke-dasharray", "7,7")
      .attr("stroke-width", 4)
      .classed(`COLUMN-0-${this.currentStack.length}`, true)
      .transition()
      .duration(2000)
      .attr("y", finalY.y)
      .style("opacity", 0)
      .end()

    const text = this.svg
      .append("text")
      .text(stackData.dataString || stackData.dataNumber || "")
      .attr("fill", "white")
      .attr("x", startX + (this.getBlockHeight(this.currentStack.length) / 2))
      .attr("y", startY + (this.getBlockHeight(this.currentStack.length) / 1.5))
      .style("font", this.OPS_FONT_STYLE)
      .style("opacity", 1)
      .classed(`COLUMN-0-${this.currentStack.length}-text`, true)

    const textWidth = text.node()?.getBBox().width
    const textHeight = text.node()?.getBBox().height

    if (textWidth && textHeight) {
      text.attr("x", startX + (this.BLOCK_WIDTH / 2) - (textWidth / 2))
    }

    const drawText = text
      .transition()
      .duration(2000)
      .style("opacity", 0)
      .attr("y", finalY.y + (this.getBlockHeight(this.currentStack.length) / 1.5))
      .end()

    await Promise.all([drawRect, drawText])
  }

  async executeOpCode(opCode: CORE_OP_CODE) {
    const {
      x: blockX,
      y: blockY,
    } = this.getOpCodeBlockPosition()

    const startX = blockX
    const startY = blockY

    const rect = this.svg
      .append("rect")
      .attr("x", startX)
      .attr("y", startY)
      .attr("rx", this.BLOCK_BORDER_RADIUS)
      .attr("width", this.BLOCK_WIDTH)
      .attr("height", this.getBlockHeight(this.currentStack.length))
      .attr("fill", this.STACK_DATA_COLOR)
      .style("opacity", 0)
      .classed(`OPCODE-0-${this.currentStack.length}`, true)

    const text = this.svg
      .append("text")
      .text(opCode.name || "")
      .attr("fill", "white")
      .attr("x", startX + (this.getBlockHeight(this.currentStack.length) / 2))
      .attr("y", blockY + (this.getBlockHeight(this.currentStack.length) / 1.5))
      .style("font", this.OPS_FONT_STYLE)
      .style("opacity", 0)
      .classed(`OPCODE-0-${this.currentStack.length}`, true)

    const textWidth = text.node()?.getBBox().width
    const textHeight = text.node()?.getBBox().height

    if (textWidth && textHeight) {
      text.attr("x", blockX + (this.BLOCK_WIDTH / 2) - (textWidth / 2))
    }

    const drawRect = rect
      .transition()
      .duration(500)
      .style("opacity", 1)
      .transition()
      .duration(1000)
      .attr("y", blockY)
      .transition()
      .duration(500)
      .attr("x", blockX)
      .end()

    const drawText = text
      .transition()
      .duration(500)
      .style("opacity", 1)
      .transition()
      .duration(1000)
      .end()
      
    await Promise.all([drawRect, drawText])
  
    const opCodeAnimator = this.getOpCodeAnimator(opCode.name)
    if (opCodeAnimator != null) {
      await opCodeAnimator.animate()
    }
  }

  drawBackground(startX: number, y: number) {
    this.svg
      .append("rect")
      .attr("x", startX)
      .attr("y", y)
      .attr("width", this.STACK_CONTAINER_SIZE)
      .attr("height", this.STACK_CONTAINER_SIZE * 0.95)
      .attr("fill", this.BACKGROUND_FILL_COLOR)
      .classed('STACK-0', true)
  }

  drawStackContainer(startX: number, y: number) {
    const pathData = `
      M ${startX},  ${y} 
      L ${startX}, ${y + this.STACK_CONTAINER_SIZE * 0.95 - 10} 
      
      Q ${startX}, ${y + this.STACK_CONTAINER_SIZE * 0.95} ${startX + 10}, ${
        y + this.STACK_CONTAINER_SIZE * 0.95
      }
      L ${startX + this.STACK_CONTAINER_SIZE - 10},${y + this.STACK_CONTAINER_SIZE * 0.95}
      Q ${startX + this.STACK_CONTAINER_SIZE}, ${y + this.STACK_CONTAINER_SIZE * 0.95} ${
        startX + this.STACK_CONTAINER_SIZE
      }, ${y + this.STACK_CONTAINER_SIZE * 0.95 - 10} 
      L ${startX + this.STACK_CONTAINER_SIZE}, ${y}
  `

    this.svg
      .append("path")
      .attr("d", pathData)
      .attr("fill", "none")
      .attr("stroke", this.SQUARE_BORDER_COLOR)
      .attr("stroke-width", this.width < 400 ? 4 : 10)
      .classed('STACK-0', true)
  }

  drawStack(stack: CORE_SCRIPT_DATA[], stackLength: number) {
    stack.forEach((stackData, index) => {
      const dataStyleClass = `COLUMN-0-${index}`
      const {
        x: blockX,
        y: blockY,
      } = this.getStackBlockPosition(index, stackLength)

      const rec = this.svg
        .append("rect")
        .attr("width", this.BLOCK_WIDTH)
        .attr("height", this.getBlockHeight(stackLength))
        .attr("rx", this.BLOCK_BORDER_RADIUS)
        .classed(dataStyleClass, true)
        .attr("x", blockX)
        .attr("y", blockY)
        .attr("fill", this.STACK_DATA_COLOR)

      const text = this.svg
        .append("text")
        .text(stackData.dataString || stackData.dataNumber || "")
        .classed(`${dataStyleClass}-text`, true)
        .attr("x", blockX + (this.BLOCK_WIDTH / 2))
        .attr("y", blockY + (this.getBlockHeight(stackLength) / 1.5))
        .style("font", this.OPS_FONT_STYLE)
        .attr('fill', 'white')
      
      const textWidth = text.node()?.getBBox().width
      if (textWidth) {
        text.attr('x', blockX + (this.BLOCK_WIDTH / 2) - (textWidth / 2))
          .style('opacity', 1)
      }
    })
  }

  getStackBlockPosition(stackIndex: number, stackLength: number): BlockPosition {
    const x = (this.width / 2) - ((this.STACK_CONTAINER_SIZE * 0.8) / 2)

    const containerTopLeftY = this.height - (this.STACK_CONTAINER_SIZE * 1.25)
    const containerBottomLeftY = containerTopLeftY + (this.STACK_CONTAINER_SIZE * 0.95)

    // const y = containerBottomLeftY - (this.getBlockHeight(stackLength) * 1.1 * (stackIndex + 2))
    const y = containerBottomLeftY - ((this.getBlockHeight(stackLength) * 1.1) + 5) * (stackIndex + 1)

    return { x, y }
  }

  getBlockHeight(stackHeight: number): number {
    const maxStackHeight = this.BLOCK_HEIGHT * this.MIN_STACK_CAPACITY

    return Math.min(maxStackHeight / stackHeight, this.BLOCK_HEIGHT)
  }

  getOpCodeBlockPosition(): BlockPosition {
    const x = (this.width / 2) - ((this.STACK_CONTAINER_SIZE * 0.8) / 2)

    const containerTopLeftY = this.height - (this.STACK_CONTAINER_SIZE * 1.25)

    const y = containerTopLeftY - (this.getBlockHeight(this.currentStack.length) * 1.5)

    return { x, y }
  }

  getOpCodeAnimator(opCodeName: string): (OpCodeAnimator | null) {
    switch (opCodeName) {
      case "OP_DUP":
        return new OpDupAnimator(this)
      case "OP_HASH160":
        return new OpHash160Animator(this)
      case "OP_CHECKSIG":
        return new OpCheckSigAnimator(this)
    }

    return null
  }
}

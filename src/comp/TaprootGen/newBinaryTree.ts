import crypto from "crypto";
import { SCRIPT_LEAF } from "./types";

// function that get the equivalent letter in the alphabet from a number
export const getLetter = (num: number): string => {
  // in uppercase plz
  return String.fromCharCode(65 + num);
};

const hash = (data: string): string => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

function merkleTreeHeight(n: number): number {
  if (n < 1) {
    throw new Error("Number of contents must be at least 1");
  }
  return Math.ceil(Math.log2(n));
}

function numberOfLeaves(height: number): number {
  if (height < 0) {
    throw new Error("Height must be at least 0");
  }
  return Math.pow(2, height);
}

export class TreeNodeMerkle {
  value: string;
  left: TreeNodeMerkle | null;
  right: TreeNodeMerkle | null;
  ogData: string;
  coreData: boolean;
  letterId: string;
  height: number;

  // additional data
  size?: number;
  script?: string[];
  title?: string;
  description?: string;
  outputType?: string;

  constructor(
    value: string,
    ogData: string,
    coreData: boolean = false,
    letterId: string,
    height: number,
    // additional data
    size?: number,
    script?: string[],
    title?: string,
    description?: string,
    outputType?: string
  ) {
    this.value = value;
    this.ogData = ogData;
    this.coreData = coreData;
    this.letterId = letterId;
    this.height = height;
    this.left = null;
    this.right = null;

    // additional data
    if (size !== undefined) this.size = size;
    if (script !== undefined) this.script = script;
    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (outputType !== undefined) this.outputType = outputType;
  }
}
export class NewMerkleTree {
  root: TreeNodeMerkle | null;
  //   script: string[];

  // change this data to be an array of tapleaves instead
  constructor(data: SCRIPT_LEAF[]) {
    if (data.length === 0) {
      throw new Error("Merkle tree must have at least one node");
    }
    // const scriptArray: string[] = [];

    const height = merkleTreeHeight(data.length);

    const arrOfHashes = data.map((d, i) => {
      const letterId = getLetter(i);
      const script = d.script;
      const scriptSize = d.scriptSize;
      const title = d.title;
      const scriptHash = d.scriptHash;
      const description = d.description;
      const outputType = d.outputType;

      // returns the new Array with the data I want in it
      return new TreeNodeMerkle(
        scriptHash,
        d.title,
        true,
        letterId,
        height,
        scriptSize,
        script,
        title,
        description,
        outputType
      );
    });

    console.log("arrOfHashes", arrOfHashes);

    const tempRoot = this.buildChildren(arrOfHashes);
    console.log("tempRoot", tempRoot);
    this.root = tempRoot;
    // this.script = scriptArray;
  }

  buildChildren(leafs: TreeNodeMerkle[]): TreeNodeMerkle | null {
    // so this has to be done because we handle creation of children node diffrent than parents since it may be uneven

    // if there are one child it should return a single parent
    // if there are two child it should return a single parent
    // if there are 3 child it should return 2 parents
    // and so on
    const parents = [];
    for (let i = 0; i < leafs.length; i += 2) {
      // check if there are i has a leaf

      // there should always be a left if this is running
      let left = leafs[i];
      let right: any = null;

      if (leafs[i + 1]) {
        right = leafs[i + 1];
      }

      const height = merkleTreeHeight(leafs.length);

      const parent = hash(left.value + (right !== null ? right.value : ""));
      const parentNode = new TreeNodeMerkle(
        parent,
        `parent-${left.ogData}-${right !== null ? right.ogData : ""}`,
        false,
        `${left.letterId}${right !== null ? right.letterId : ""}`,
        height
      );

      parentNode.left = left;
      parentNode.right = right;

      parents.push(parentNode);
    }

    console.log("parents", parents);

    return this.buildTree(parents);
  }
  buildTree(leafs: TreeNodeMerkle[]): TreeNodeMerkle | null {
    if (leafs.length === 1) {
      return leafs[0];
    }

    const parents = [];

    for (let i = 0; i < leafs.length; i += 2) {
      // check if there are i has a leaf

      // there should always be a left if this is running
      let left = leafs[i];
      let right: any = null;

      if (leafs[i + 1]) right = leafs[i + 1];

      const height = merkleTreeHeight(leafs.length);

      const parent = hash(left.value + (right !== null ? right.value : ""));
      const parentNode = new TreeNodeMerkle(
        parent,
        `parent-${left.ogData}-${right !== null ? right.ogData : ""}`,
        false,
        `${left.letterId}${right !== null ? right.letterId : ""}`,
        height
      );

      parentNode.left = left;
      parentNode.right = right;

      parents.push(parentNode);
    }

    return this.buildTree(parents);
  }

  toReactFlowNodes(
    screenWidth: number,
    screenHeight: number
  ): { nodes: any[]; edges: any[] } {
    const nodes: any[] = [];
    const edges: any[] = [];
    const levelHeight = 150; // Vertical spacing between levels
    const minLeafSpacing = 200;

    const countLeaves = (node: TreeNodeMerkle | null): number => {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
      return countLeaves(node.left) + countLeaves(node.right);
    };

    const totalLeaves = countLeaves(this.root);
    const totalWidth = Math.max(screenWidth, totalLeaves * minLeafSpacing);

    const getLeafIndex = (node: TreeNodeMerkle | null): number => {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
      return getLeafIndex(node.left) + getLeafIndex(node.right);
    };

    const traverse = (
      node: TreeNodeMerkle | null,
      level: number,
      leafIndexStart: number,
      parentId: string | null
    ) => {
      if (node !== null) {
        const id = node.value;
        const isParent = !node.coreData;

        let x;
        if (!node.left && !node.right) {
          // Leaf node
          x = (leafIndexStart + 0.1) * ((totalWidth * 1.5) / totalLeaves);
        } else {
          // Parent node
          const leftLeaves = node.left ? getLeafIndex(node.left) : 0;
          const rightLeaves = node.right ? getLeafIndex(node.right) : 0;
          x =
            (leafIndexStart + (leftLeaves + rightLeaves) / 2) *
            (totalWidth / totalLeaves);
        }

        const y = level * levelHeight + 50; // 50 is top margin

        nodes.push({
          id,
          data: { label: node.value, isParent, ...node },
          position: { x, y },
          type: isParent ? "parentNode" : "childNode",
        });

        if (parentId) {
          edges.push({
            id: `e${parentId}-${id}`,
            source: parentId,
            target: id,
            type: "custom",
          });
        }

        if (node.left) {
          traverse(node.left, level + 1, leafIndexStart, id);
        }
        if (node.right) {
          const rightLeafStart =
            leafIndexStart + (node.left ? getLeafIndex(node.left) : 0);
          traverse(node.right, level + 1, rightLeafStart, id);
        }
      }
    };

    traverse(this.root, 0, 0, null);

    // Adjust node positions if the tree is wider than the screen
    if (totalWidth > screenWidth) {
      const scale = screenWidth / totalWidth;
      nodes.forEach((node) => {
        node.position.x *= scale;
      });
    }

    console.log("nodes", nodes, "edges", edges);
    return { nodes, edges };
  }
}

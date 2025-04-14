import crypto from "crypto";

// function that get the equivalent letter in the alphabet from a number
export const getLetter = (num: number): string => {
  // in uppercase plz

  return String.fromCharCode(65 + num);
};

const hash = (data: string): string => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

// export class TreeNode {
//   value: number;
//   left: TreeNode | null;
//   right: TreeNode | null;

//   constructor(value: number) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }

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

  constructor(
    value: string,
    ogData: string,
    coreData: boolean = false,
    letterId: string,
    height: number
  ) {
    this.value = value;
    this.ogData = ogData;
    this.coreData = coreData;
    this.letterId = letterId;
    this.height = height;

    this.left = null;
    this.right = null;
  }
}
export class MerkleTree {
  root: TreeNodeMerkle | null;

  constructor(data: string[]) {
    if (data.length === 0) {
      throw new Error("Merkle tree must have at least one node");
    }

    const height = merkleTreeHeight(data.length);

    const arrOfHashes = data.map((d, i) => {
      const letterId = getLetter(i);
      return new TreeNodeMerkle(hash(d), d, true, letterId, height);
    });


    const tempRoot = this.buildChildren(arrOfHashes);
    this.root = tempRoot;
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

    const traverse = (
      node: TreeNodeMerkle | null,
      x: number,
      y: number,
      isParent: boolean
    ) => {
      if (node !== null) {
        const numLeaves = numberOfLeaves(node.height);

        const widthBetween = (screenWidth * 0.5) / numLeaves;

        const id = node.value;
        nodes.push({
          id,
          data: { label: node.value, isParent, ...node },
          position: { x, y },
          type: !node.coreData ? "parentNode" : "childNode",
        });

        if (node.left) {
          const leftX = node.right ? x - widthBetween : x - 35;
          edges.push({
            id: `e${id}-${node.left.value}`,
            source: id,
            target: node.left.value,
            type: "bitEdge",
          });
          traverse(node.left, leftX, y + 100, false);
        }

        if (node.right) {
          edges.push({
            id: `e${id}-${node.right.value}`,
            source: id,
            target: node.right.value,
            type: "bitEdge",
          });
          traverse(node.right, x + widthBetween, y + 100, false);
        }
      }
    };

    traverse(this.root, screenWidth / 2 - 40, -80, true);

    return { nodes, edges };
  }
}

/* 
export class BinaryTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  insert(value: number) {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node: TreeNode, newNode: TreeNode) {
    if (node.left === null) {
      node.left = newNode;
    } else if (node.right === null) {
      node.right = newNode;
    } else {
      // if both nodes are not null  then we need to create a new child node for the left node
      this.insertNode(node.left, newNode);
    }
  }

  toReactFlow(): { nodes: any[]; edges: any[] } {
    const nodes: any[] = [];
    const edges: any[] = [];

    const traverse = (node: TreeNode | null, x: number, y: number) => {
      if (node !== null) {
        const id = `${node.value}`;
        nodes.push({ id, data: { label: node.value }, position: { x, y } });

        if (node.left) {
          edges.push({
            id: `e${id}-${node.left.value}`,
            source: id,
            target: `${node.left.value}`,
          });
          traverse(node.left, x - 100, y + 100);
        }

        if (node.right) {
          edges.push({
            id: `e${id}-${node.right.value}`,
            source: id,
            target: `${node.right.value}`,
          });
          traverse(node.right, x + 100, y + 100);
        }
      }
    };

    traverse(this.root, 760, 0);

    return { nodes, edges };
  }
}

*/

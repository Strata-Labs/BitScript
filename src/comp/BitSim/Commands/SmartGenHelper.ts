class TrieNode {
  key: string;
  parent: TrieNode | null;
  children: Map<string, TrieNode>;
  end: boolean;
  originalCaseValue: string | null;

  constructor(key: string) {
    this.key = key;
    this.parent = null;
    this.children = new Map();
    this.end = false;
    this.originalCaseValue = null;
  }

  getWord(): string {
    const output: string[] = [];
    let node: TrieNode | null = this;

    while (node !== null) {
      output.unshift(node.key);
      node = node.parent;
    }

    return output.join("");
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode("");
  }

  insert(word: string): void {
    let node: TrieNode = this.root;

    for (const char of word.toLocaleLowerCase()) {
      if (node.children.has(char)) {
        node = node.children.get(char)!;
      } else {
        const newNode = new TrieNode(char);
        node.children.set(char, newNode);
        node = newNode;
      }
    }

    node.end = true;
    node.originalCaseValue = word;

    // for (let i = 0; i < word.length; i++) {
    //   if (!node.children[word[i]]) {
    //     node.children[word[i]] = new TrieNode(word[i]);
    //     node.children[word[i]].parent = node;
    //   }

    //   node = node.children[word[i]];

    //   if (i === word.length - 1) {
    //     node.end = true;
    //   }
    // }
  }

  // contains(word: string): boolean {
  //   let node: TrieNode | null = this.root;

  //   for (let i = 0; i < word.length; i++) {
  //     if (node.children[word[i]]) {
  //       node = node.children[word[i]];
  //     } else {
  //       return false;
  //     }
  //   }
  //   return node.end;
  // }

  find(prefix: string): string[] {
    let node = this.root;
    const output: string[] = [];

    // Convert prefix to lowercase for case-insensitive search
    for (const char of prefix.toLowerCase()) {
      if (node.children.has(char)) {
        node = node.children.get(char)!;
      } else {
        return output;
      }
    }

    this.findAllWords(node, output);
    return output;
  }

  private findAllWords(node: TrieNode, arr: string[]): void {
    if (node.end && node.originalCaseValue) {
      arr.push(node.originalCaseValue); // Use push to add elements to the end of the array
    }

    node.children.forEach((childNode) => {
      this.findAllWords(childNode, arr);
    });
  }
}

export const COMMANDS_SMART_GEN_NOUNS = new Trie();
COMMANDS_SMART_GEN_NOUNS.insert("import");
COMMANDS_SMART_GEN_NOUNS.insert("generate");
COMMANDS_SMART_GEN_NOUNS.insert("send");

/* 
 SINGULAR GENERATE COMMANDS
*/
export const COMMAND_GENERATE_SINGULAR_ADJECTIVES = new Trie();
COMMAND_GENERATE_SINGULAR_ADJECTIVES.insert("P2PK transaction");
COMMAND_GENERATE_SINGULAR_ADJECTIVES.insert("P2PKH transaction");
COMMAND_GENERATE_SINGULAR_ADJECTIVES.insert("P2WKH transaction");
COMMAND_GENERATE_SINGULAR_ADJECTIVES.insert("P2WSH (general) transaction");
COMMAND_GENERATE_SINGULAR_ADJECTIVES.insert("P2SH (general) transaction");
COMMAND_GENERATE_SINGULAR_ADJECTIVES.insert("P2SH (multi-sig) transaction");
COMMAND_GENERATE_SINGULAR_ADJECTIVES.insert("P2SH  (time-lock) transaction");
COMMAND_GENERATE_SINGULAR_ADJECTIVES.insert("P2SH (hash-lock) transaction");
COMMAND_GENERATE_SINGULAR_ADJECTIVES.insert("P2SH (timehash-lock) transaction");
COMMAND_GENERATE_SINGULAR_ADJECTIVES.insert("P2TR (general) transaction");

/* 
 PLURAL GENERATE COMMANDS
*/

export const COMMAND_GENERATE_PLURAL_ADJECTIVES = new Trie();
COMMAND_GENERATE_PLURAL_ADJECTIVES.insert("blocks");
COMMAND_GENERATE_PLURAL_ADJECTIVES.insert("wallet");

export const TRIE_HELPER: any = {
  import: {
    singular: COMMAND_GENERATE_SINGULAR_ADJECTIVES,
    plural: COMMAND_GENERATE_PLURAL_ADJECTIVES,
  },
  generate: {
    singular: COMMAND_GENERATE_SINGULAR_ADJECTIVES,
    plural: COMMAND_GENERATE_PLURAL_ADJECTIVES,
  },
  send: {
    singular: COMMAND_GENERATE_SINGULAR_ADJECTIVES,
    plural: COMMAND_GENERATE_PLURAL_ADJECTIVES,
  },
};

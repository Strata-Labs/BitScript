class TrieNode {
  key: string;
  parent: TrieNode | null;
  children: { [key: string]: TrieNode };
  end: boolean;

  constructor(key: string) {
    this.key = key;
    this.parent = null;
    this.children = {};
    this.end = false;
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

    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i]);
        node.children[word[i]].parent = node;
      }

      node = node.children[word[i]];

      if (i === word.length - 1) {
        node.end = true;
      }
    }
  }

  contains(word: string): boolean {
    let node: TrieNode | null = this.root;

    for (let i = 0; i < word.length; i++) {
      if (node.children[word[i]]) {
        node = node.children[word[i]];
      } else {
        return false;
      }
    }
    return node.end;
  }

  find(prefix: string): string[] {
    let node: TrieNode | null = this.root;
    const output: string[] = [];

    for (let i = 0; i < prefix.length; i++) {
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        return output;
      }
    }

    this.findAllWords(node, output);
    return output;
  }

  // Recursive function to find all words in the given node
  private findAllWords(node: TrieNode, arr: string[]): void {
    if (node.end) {
      arr.unshift(node.getWord());
    }

    for (const child in node.children) {
      this.findAllWords(node.children[child], arr);
    }
  }
}

export const COMMANDS_SMART_GEN_NOUNS = new Trie();
COMMANDS_SMART_GEN_NOUNS.insert("import");
COMMANDS_SMART_GEN_NOUNS.insert("generate");
COMMANDS_SMART_GEN_NOUNS.insert("send");

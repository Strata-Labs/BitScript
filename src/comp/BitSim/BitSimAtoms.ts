import { atom } from "jotai";

export const blockHeightAtom = atom(0);

export const testNameAtom = atom("");
export const testBlockHeightAtom = atom("");
export const testCategoryAtom = atom("");
export const testCategoryPropertyAtom = atom("");
export const testWhoAtom = atom("");
export const testHowMuchAtom = atom("");
export const testToWhoAtom = atom("");

interface Test {
  linkPath?: string;
  name?: string;
  shortDescription?: string;
  type?: string;
  property?: string;
  value?: string;
  passed?: string;
}
export const testArrayAtom = atom<Test[]>([]);

export enum COMMANDS {
  mineSomeBlocks = "mineSomeBlocks",
}

export type Command = {
  title: string;
  blocksLength: number;
  data: GenerateBlocks;
  type: COMMANDS;
};

export type GenerateBlocks = {
  address: string;
  blocks: number;
};

export const commandAtoms = atom<Command[]>([]);

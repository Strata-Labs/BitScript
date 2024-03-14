import { atom } from "jotai";

export const blockHeightAtom = atom(0);

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

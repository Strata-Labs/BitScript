import { atom } from "jotai";

export const menuOpen = atom(false);
export const menuSelected = atom("home");
export const popUpOpen = atom(false);
export const activeViewMenu = atom(1);
export const activeSearchView = atom(false);
export const searchQuery = atom("");

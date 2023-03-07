import { atom } from "jotai";

export const entryList = atom<{ key: string; content: string }[]>([]);

const angle = atom(0);

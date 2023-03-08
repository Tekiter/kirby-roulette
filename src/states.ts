import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const entryList = atomWithStorage<{ key: string; content: string }[]>(
  "entryList",
  []
);

const angle = atom(0);

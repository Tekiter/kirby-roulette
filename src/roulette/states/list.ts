import { atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";

export const entryListAtom = atomWithStorage<
  { key: string; content: string }[]
>("entryList", [
  {
    key: nanoid(),
    content: "Kirby",
  },
  {
    key: nanoid(),
    content: "Mario",
  },
  {
    key: nanoid(),
    content: "Pikachu",
  },
]);

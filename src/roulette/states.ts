import { atom } from "jotai";
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

export const targetAngleAtom = atom(0);

export const targetItemAtom = atom((get) => {
  const list = get(entryListAtom);
  let angle = get(targetAngleAtom);

  while (angle >= 2 * Math.PI) {
    angle -= 2 * Math.PI;
  }

  const pieceAngle = (2 * Math.PI) / list.length;

  return list.find((_, idx) => pieceAngle * (idx + 1) > angle) ?? null;
});

export const cameraStateAtom = atom<"play" | "edit">("edit");

export const spinnerStateAtom = atom<"idle" | "running" | "result">("idle");

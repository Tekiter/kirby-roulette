import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const entryListAtom = atomWithStorage<
  { key: string; content: string }[]
>("entryList", []);

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

export const cameraState = atom<"" | "">("");

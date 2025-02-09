import { atom } from "jotai";

import { entryListAtom } from "./list";

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

export const cameraStateAtom = atom<"play" | "edit">("play");

export const spinnerStateAtom = atom<"idle" | "running" | "result">("idle");

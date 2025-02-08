import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<boolean>(() => window.sessionStorage);

export const isDebugCameraAtom = atomWithStorage(
  "is-debug-camera",
  false,
  storage
);

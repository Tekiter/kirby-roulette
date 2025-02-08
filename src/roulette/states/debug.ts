import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<boolean>(() => window.sessionStorage);

export const isDebugAtom = atomWithStorage("is-debug", false, storage);

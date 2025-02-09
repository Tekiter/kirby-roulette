import { Pencil1Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { FC } from "react";

import useEventLogger from "../eventLogger/useEventLogger";
import { cameraStateAtom } from "./states";

const MobileButtons: FC = () => {
  const [cameraState, setCameraState] = useAtom(cameraStateAtom);
  const { logEvent } = useEventLogger();

  function handleEdit() {
    setCameraState("edit");
    logEvent("Action-SpinRoulette");
  }

  return (
    <div className="absolute right-0 bottom-0 max-w-full overflow-hidden font-hand md:hidden">
      <AnimatePresence>
        {cameraState !== "edit" && (
          <motion.div
            className="flex mb-3 mr-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="px-3 py-2 flex items-center text-xl rounded bg-purple-500/30 backdrop-blur-sm"
              onClick={handleEdit}
            >
              <Pencil1Icon className="mr-2 scale-110" />
              Edit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileButtons;

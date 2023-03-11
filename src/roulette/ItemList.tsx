import { useAtom, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { FC, KeyboardEvent, useRef, useState } from "react";
import { entryListAtom, cameraStateAtom, spinnerStateAtom } from "./states";
import { AnimatePresence, motion } from "framer-motion";
import { Cross2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

interface ItemListProps {}

const ItemList: FC<ItemListProps> = ({}) => {
  const [itemList, setItemList] = useAtom(entryListAtom);
  const [mode, setMode] = useAtom(cameraStateAtom);
  const setSpinnerState = useSetAtom(spinnerStateAtom);

  const textRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");

  function handleKeyDown(e: KeyboardEvent) {
    if (e.nativeEvent.isComposing || e.keyCode === 229) {
      return;
    }
    if (e.key === "Enter") {
      addItem();
    }
  }

  function addItem() {
    textRef.current?.focus();
    if (!text) {
      return;
    }
    setItemList((list) => [...list, { key: nanoid(), content: text }]);
    setText("");
    setSpinnerState("idle");
  }

  function handleDelete(key: string) {
    setItemList((items) => items.filter((item) => item.key !== key));
    setSpinnerState("idle");
  }

  function handleClose() {
    setMode("play");
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 max-w-full overflow-hidden font-hand">
      <AnimatePresence>
        {mode === "edit" && (
          <motion.div
            className="relative h-full p-5"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{
              duration: 0.5,
            }}
          >
            <div className="h-full max-w-full w-80 flex flex-col backdrop-blur-md bg-white/30 rounded border border-slate-200">
              <div className="flex">
                <h1 className="text-lg pt-3 pl-3 grow">Edit Item</h1>
                <button
                  className="hover:bg-purple-300 w-8 h-8 mt-1 mr-1 flex items-center justify-center rounded focus:outline-none"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <Cross2Icon className="scale-125" />
                </button>
              </div>
              <div className="flex items-stretch pt-5 px-3 pb-2">
                <input
                  ref={textRef}
                  type="text"
                  className="grow block rounded px-3 py-2 border-stone-200 border w-full backdrop-blur-sm bg-white/30"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={addItem}
                  className="ml-2 rounded bg-purple-500/40 px-3"
                >
                  <PlusIcon />
                </button>
              </div>
              <motion.div className="overflow-y-auto overflow-x-clip flex-1">
                <AnimatePresence initial={false}>
                  {itemList.map((item) => (
                    <motion.div
                      key={item.key}
                      className="flex items-stretch"
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.2 },
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="grow text-lg pl-5 py-2">
                        {item.content}
                      </div>
                      <button
                        className="w-10 mr-3 rounded hover:bg-purple-400/20 transition-colors flex justify-center items-center"
                        onClick={() => handleDelete(item.key)}
                      >
                        <TrashIcon />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItemList;

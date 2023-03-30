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

              <a
                className="flex items-center ml-3 py-2 text-slate-700"
                href="https://github.com/Tekiter/kirby-roulette"
                target="_blank"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div className="ml-2">Kirby Roulette</div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItemList;

import { useAtom, useAtomValue } from "jotai";
import { nanoid } from "nanoid";
import { FC, KeyboardEvent, useRef, useState } from "react";
import { entryListAtom, modeAtom } from "./states";
import { AnimatePresence, Reorder, motion } from "framer-motion";

interface ItemListProps {}

const ItemList: FC<ItemListProps> = ({}) => {
  const [itemList, setItemList] = useAtom(entryListAtom);
  const mode = useAtomValue(modeAtom);

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
  }

  function handleDelete(key: string) {
    setItemList((items) => items.filter((item) => item.key !== key));
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 overflow-hidden">
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
            <div className="h-full flex flex-col backdrop-blur-md bg-white/30 rounded border border-slate-200">
              <div className="flex items-stretch pt-3 px-3">
                <input
                  ref={textRef}
                  type="text"
                  className="grow block rounded px-3 py-2 border-stone-300 border"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={addItem}
                  className="ml-2 rounded bg-sky-500/75 px-3"
                >
                  +
                </button>
              </div>
              <Reorder.Group
                className="overflow-y-auto overflow-x-clip flex-1"
                axis="y"
                values={itemList}
                onReorder={setItemList}
              >
                <AnimatePresence initial={false}>
                  {itemList.map((item) => (
                    <Reorder.Item
                      key={item.key}
                      className="flex px-3 py-2 items-center"
                      value={item}
                      exit={{
                        opacity: 0,
                        x: 20,
                        transition: { duration: 0.2 },
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileDrag={{ backgroundColor: "#e3e3e3" }}
                    >
                      <div className="grow">{item.content}</div>
                      <div>
                        <button
                          className="px-2 hover:bg-slate-400/30 transition-colors"
                          onClick={() => handleDelete(item.key)}
                        >
                          X
                        </button>
                      </div>
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItemList;

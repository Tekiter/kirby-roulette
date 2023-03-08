import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import { FC, KeyboardEvent, useRef, useState } from "react";
import { entryList } from "../states";

interface ItemListProps {}

const ItemList: FC<ItemListProps> = ({}) => {
  const [itemList, setItemList] = useAtom(entryList);

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
    setItemList((list) => [...list, { key: nanoid(), content: text }]);
    setText("");
  }

  function handleDelete(key: string) {
    setItemList((items) => items.filter((item) => item.key !== key));
  }

  return (
    <div className="absolute top-0 right-0 bottom-0">
      <div className="flex">
        <input
          ref={textRef}
          type="text"
          className="grow block"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <div>
        {itemList.map((item) => (
          <div className="flex ">
            <div className="grow">{item.content}</div>
            <div>
              <button onClick={() => handleDelete(item.key)}>X</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;

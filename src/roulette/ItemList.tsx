import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import { FC, KeyboardEvent, useRef, useState } from "react";
import { entryList } from "../states";

interface ItemListProps {}

const ItemList: FC<ItemListProps> = ({}) => {
  const [itemList, setItemList] = useAtom(entryList);

  const [text, setText] = useState("");

  function handleKeyDown(e: KeyboardEvent) {
    if (e.nativeEvent.isComposing || e.keyCode === 229) {
      return;
    }
    if (e.key === "Enter") {
      setItemList((list) => [...list, { key: nanoid(), content: text }]);
      setText("");
    }
  }

  return (
    <div className="absolute top-0 right-0 bottom-0">
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        {itemList.map((item) => (
          <div>{item.content}</div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;

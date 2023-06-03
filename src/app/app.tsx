import { useState } from "react";

import { Button, ResizableContainer } from "../shared/components";
import { ColorPreview } from "../widgets/color-preview";
// import { Board } from "../widgets/board";
import { ColorPickerIcon } from "../shared/components/icons";

import s from "./app.module.css";
import "./global.css";

export const App = () => {
  const [isDropperActive, setIsDropperActive] = useState<boolean>(false);
  const [selectedColor /*, setSelectedColor */] = useState<string | null>(null);

  const toggleDropper = () => setIsDropperActive((isActive) => !isActive);

  return (
    <>
      <header className={s.header}>
        <Button active={isDropperActive} onClick={toggleDropper}>
          <ColorPickerIcon />
        </Button>
        {isDropperActive && <ColorPreview color={selectedColor} />}
      </header>
      <main className={s.content}>
        <ResizableContainer>
          {(sizes) => (
            <p>{JSON.stringify(sizes)}</p>
            // <Board {...sizes} cursor={isDropperActive ? "dropper" : "default"} onColorSelect={setSelectedColor} />
          )}
        </ResizableContainer>
      </main>
    </>
  );
};

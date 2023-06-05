import { useState } from "react";

import { Button, ResizableContainer } from "../shared/components";
import { ColorPreview } from "../features/color-preview";
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
        {isDropperActive && <ColorPreview color={selectedColor} fallback="Click on image to see the color!" />}
      </header>
      <main className={s.content}>
        <ResizableContainer>{(dimensions) => <p>{JSON.stringify(dimensions)}</p>}</ResizableContainer>
      </main>
    </>
  );
};

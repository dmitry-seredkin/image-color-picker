import { useState } from "react";

import { ColorPreview } from "features/color-preview";
import { Button, ResizableContainer } from "shared/components";
import { ColorPickerIcon } from "shared/components/icons";
import type { Color } from "shared/models";
import { Board } from "widgets/board";

import s from "./app.module.css";
import "./global.css";

const renderPrompt = (isDropperActive: boolean, selectedColor: Color | null) => {
  if (!isDropperActive) return <p>Paste image and use dropper to pick color</p>;

  if (!selectedColor) return <p>Click on image to pick color!</p>;

  return <ColorPreview color={selectedColor} />;
};

export const App = () => {
  const [isDropperActive, setIsDropperActive] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const toggleDropper = () =>
    setIsDropperActive((isActive) => {
      if (isActive) setSelectedColor(null);

      return !isActive;
    });

  return (
    <>
      <header className={s.header}>
        <Button active={isDropperActive} onClick={toggleDropper}>
          <ColorPickerIcon />
        </Button>
        {renderPrompt(isDropperActive, selectedColor)}
      </header>
      <main className={s.content}>
        <ResizableContainer>
          {(dimensions) => (
            <Board {...dimensions} cursor={isDropperActive ? "dropper" : "default"} onColorSelect={setSelectedColor} />
          )}
        </ResizableContainer>
      </main>
    </>
  );
};

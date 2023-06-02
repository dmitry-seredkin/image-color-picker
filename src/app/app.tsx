import { useState } from 'react';

import { Button, ResizableContainer } from '../shared/components';
import { ColorPreview } from '../widgets/color-preview';
import { ColorDropper } from '../widgets/color-dropper';

import s from "./app.module.css";
import './global.css';

export const  App = () => {
  const [isDropperActive, setIsDropperActive] = useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const toggleDropper = () => setIsDropperActive(prev => !prev);
  
  return (
    <>
      <header className={s.header}>
        <Button onClick={toggleDropper}>Dropper</Button>
        {selectedColor && <ColorPreview color={selectedColor} />}
      </header>
      <main className={s.content}>
        <ResizableContainer>
          {(sizes) => <div>{sizes.width} {sizes.height}</div>}
        </ResizableContainer>
      </main>
      {isDropperActive && <ColorDropper colors={[
        ["#ff0", "#f0f", "#ff0"],
        ["#ff0", "#f0f", "#ff0"],
        ["#ff0", "#f0f", "#ff0"],
    
    ]} position={{ x: 300, y: 300 }} />}
    </>
   
  );
}

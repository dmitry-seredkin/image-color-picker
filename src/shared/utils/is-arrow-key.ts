import { ArrowKey } from "shared/models";

export const isArrowKey = (key: string): key is ArrowKey => {
  const arrows = Array.of<string>(ArrowKey.Up, ArrowKey.Right, ArrowKey.Down, ArrowKey.Left);

  return arrows.includes(key);
};

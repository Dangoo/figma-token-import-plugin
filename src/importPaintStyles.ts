import { createStyleImporter } from './createStyleImporter';
import { PaintStyleData } from './types';

const createNewStyle = (name: string) => {
  const style = figma.createPaintStyle();
  style.name = name;
  return style;
};

const createPaintStyleWithColor = ({ name, paints, description }: PaintStyleData, existingStyle?: PaintStyle) => {
  const style = existingStyle || createNewStyle(name);

  try {
    style.paints = paints;
    style.description = description;
  } catch (error) {
    console.error(error);
  }
};

export const importPaintStyles = createStyleImporter<PaintStyleData, PaintStyle>(
  figma.getLocalPaintStyles,
  createPaintStyleWithColor,
);

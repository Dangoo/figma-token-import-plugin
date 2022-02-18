import { createStyleImporter } from './createStyleImporter';
import { GridStyleData } from './types';

const createNewStyle = (name: string) => {
  const style = figma.createGridStyle();
  style.name = name;
  return style;
};

const createGridStyleWithColor = (
  { name, layoutGrids, description }: GridStyleData,
  existingStyle?: GridStyle,
) => {
  const style = existingStyle || createNewStyle(name);

  try {
    style.layoutGrids = layoutGrids;
    style.description = description;
  } catch (error) {
    console.error(error);
  }
};

export const importGridStyles = createStyleImporter<GridStyleData, GridStyle>(
  figma.getLocalGridStyles,
  createGridStyleWithColor,
);

import { importGridStyles } from './importGridStyles';
import { importPaintStyles } from './importPaintStyles';
import { FigmaStylesData, ImportPromise, isPaintStyle, isGridStyle, BaseStyleData } from './types';

const importer: { [k in StyleType]: (tokens: BaseStyleData[]) => ImportPromise } = {
  PAINT: (tokens) => {
    if (tokens.every(isPaintStyle)) {
      return importPaintStyles(tokens);
    }

    throw new Error('Tokens contain entries other than type color');
  },
  GRID: (tokens) => {
    if (tokens.every(isGridStyle)) {
      return importGridStyles(tokens);
    }

    throw new Error('Tokens contain entries other than type grid');
  },
  TEXT: () =>
    Promise.resolve({
      success: true,
      newStylesCount: 0,
      preexistingStylesCount: 0,
      updatedStylesCount: 0,
    }),
  EFFECT: () =>
    Promise.resolve({
      success: true,
      newStylesCount: 0,
      preexistingStylesCount: 0,
      updatedStylesCount: 0,
    }),
};

export async function importTokens(
  tokens: FigmaStylesData,
  { categories }: { categories: StyleType[] },
) {
  return Promise.all(categories.map((category) => importer[category](tokens[category])));
}

import type { DesignToken } from 'style-dictionary';
import { importGridStyles } from './importGridStyles';
import { importPaintStyles } from './importPaintStyles';
import { DesignTokensByType, ImportPromise, isColor, isSize } from './types';

const importer: { [k in StyleType]: (tokens: DesignToken[]) => ImportPromise } = {
  PAINT: (tokens) => {
    if (tokens.every(isColor)) {
      return importPaintStyles(tokens);
    }

    throw new Error('Tokens contain entries other than type color');
  },
  GRID: (tokens) => {
    if (tokens.every(isSize)) {
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
  tokens: DesignTokensByType,
  { categories }: { categories: StyleType[] },
) {
  return Promise.all(categories.map((category) => importer[category](tokens[category])));
}

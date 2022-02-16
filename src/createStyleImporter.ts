import type { DesignToken } from 'style-dictionary';
import type { ImportPromise } from './types';

export function createStyleImporter<T extends DesignToken, S extends BaseStyle>(
  getExistingStyles: () => S[],
  createNewStyle: (token: T, existingStyle: S) => void,
): (tokens: Array<T>) => ImportPromise {
  return async (tokens) => {
    const allStyles = getExistingStyles();
    const allStylesMap = new Map(allStyles.map((style) => [style.name, style]));
    let updatedStylesCount = 0;

    return await Promise.all(
      tokens.map(async (token) => {
        const existingStyle = allStylesMap.get(token.name);

        if (existingStyle) {
          updatedStylesCount++;
        }

        return createNewStyle(token, existingStyle);
      }),
    ).then(
      () => ({
        success: true,
        newStylesCount: tokens.length - updatedStylesCount,
        preexistingStylesCount: allStyles.length,
        updatedStylesCount,
      }),
      (err) => {
        console.error(err);
        return { success: false };
      },
    );
  };
}

import { FigmaStylesData, isStyleType } from './types';

export function parsePayload(payload: { styles: FigmaStylesData; selectedCategories: string[] }): {
  styles: FigmaStylesData;
  selectedCategories: StyleType[];
} {
  return {
    ...payload,
    selectedCategories: payload.selectedCategories.filter(isStyleType),
  };
}

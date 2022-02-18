export type BaseStyleData = Pick<BaseStyle, 'name' | 'type' | 'description'>;
export type PaintStyleData = Pick<PaintStyle, keyof BaseStyleData | 'paints'>;
export type GridStyleData = Pick<GridStyle, keyof BaseStyleData | 'layoutGrids'>;
export type TextStyleData = Pick<TextStyle, keyof BaseStyleData>;
export type EffectStyleData = Pick<EffectStyle, keyof BaseStyleData>;

export function isPaintStyle(obj: Record<string, unknown>): obj is PaintStyleData {
  return obj?.type === 'PAINT';
}

export function isGridStyle(obj: Record<string, unknown>): obj is GridStyleData {
  return obj?.type === 'GRID';
}

export function isStyleType(str: string): str is StyleType {
  return ['PAINT', 'GRID', 'TEXT', 'EFFECT'].includes(str);
}

export interface FigmaStylesData {
  PAINT?: PaintStyleData[];
  GRID?: GridStyleData[];
  EFFECT?: EffectStyleData[];
  TEXT?: TextStyleData[];
}

export interface ImportStatus {
  success: boolean;
  importedTokensCount?: number;
  newStylesCount?: number;
  preexistingStylesCount?: number;
  updatedStylesCount?: number;
}

export type ImportPromise = Promise<ImportStatus>;

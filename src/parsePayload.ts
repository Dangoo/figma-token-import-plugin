import { FigmaStylesData, PaintStyleData } from './types';

export function parsePayload(payload: Record<'PAINT', PaintStyleData[]>): FigmaStylesData {
  return payload;
}

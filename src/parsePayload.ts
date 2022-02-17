import { flattenObjectToArray } from './utils/flattenObjectToArray';
import { DesignTokensByType, isDesignToken } from './types';

export function parsePayload(
  payload: Record<'color', Record<string, unknown>>,
): DesignTokensByType {
  return {
    PAINT: flattenObjectToArray(payload.color || {}, isDesignToken),
  };
}

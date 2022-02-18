import { importTokens } from './importTokens';
import { parsePayload } from './parsePayload';
import type { ImportStatus } from './types';

figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
  const { type, payload } = msg;

  switch (type) {
    case 'IMPORT_THEME': {
      const { styles, selectedCategories } = parsePayload(payload);
      const statusResults = await importTokens(styles, { categories: selectedCategories });
      const aggregatedStatus = statusResults.reduce(
        (acc: ImportStatus, status) => {
          return {
            success: acc.success && status.success,
            importedTokensCount: acc.importedTokensCount + status.importedTokensCount,
            updatedStylesCount: acc.updatedStylesCount + status.updatedStylesCount,
            preexistingStylesCount: acc.preexistingStylesCount + status.preexistingStylesCount,
            newStylesCount: acc.newStylesCount + status.newStylesCount,
          };
        },
        {
          success: true,
          importedTokensCount: 0,
          updatedStylesCount: 0,
          preexistingStylesCount: 0,
          newStylesCount: 0,
        },
      );
      if (aggregatedStatus.success) {
        figma.notify(
          `✅ Successfully imported ${aggregatedStatus.importedTokensCount || 0} tokens. ${
            aggregatedStatus.updatedStylesCount || 0
          } updated, ${aggregatedStatus.newStylesCount} new`,
        );
      } else {
        figma.notify('❌ Oops, something went wrong…');
      }
      break;
    }
    case 'RESIZE': {
      const { height, width } = payload;
      const { height: viewportHeight, width: viewportWidth } = figma.viewport.bounds;

      figma.ui.resize(Math.min(width, viewportWidth), Math.min(height, viewportHeight));

      return;
    }
    case 'CANCEL':
    default:
      break;
  }

  figma.closePlugin();
};

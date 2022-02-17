import { importTokens } from './importTokens';
import { parsePayload } from './parsePayload';

figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
  const { type, payload } = msg;

  switch (type) {
    case 'IMPORT_THEME':
      const tokens = parsePayload(payload);
      const [status] = await importTokens(tokens, { categories: ['PAINT'] });

      if (status.success) {
        figma.notify(
          `✅ Successfully imported ${status.importedTokensCount || 0} tokens. ${
            status.updatedStylesCount || 0
          } updated, ${status.newStylesCount} new`,
        );
      } else {
        figma.notify('❌ Oops, something went wrong…');
      }
      break;
    case 'RESIZE':
      const { height, width } = payload;
      const { height: viewportHeight, width: viewportWidth } = figma.viewport.bounds;

      figma.ui.resize(Math.min(width, viewportWidth), Math.min(height, viewportHeight));

      return;
    case 'CANCEL':
    default:
      break;
  }

  figma.closePlugin();
};

import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type LayerOptionsModes = SUB_COMPONENT_CSS_MODES.DEFAULT;

export const layerTopOptions: SubcomponentOptions<LayerOptionsModes> = {
  [SUB_COMPONENT_CSS_MODES.DEFAULT]: [
    {
      buttonName: 'Border',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BORDER_BOTTOM,
    },
    {
      buttonName: 'Color',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.COLOR,
    },
    {
      buttonName: 'Shadow',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SHADOW_VERTICAL,
    },
    {
      buttonName: 'Size',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SIZE_HEIGHT,
    },
    {
      buttonName: 'Padding',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.PADDING,
    },
    {
      buttonName: 'Text',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT_WTH_ALIGN,
    },
  ],
};

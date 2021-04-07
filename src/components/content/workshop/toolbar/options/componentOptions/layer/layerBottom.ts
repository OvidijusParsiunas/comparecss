import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_STATES } from '../../../../../../../consts/subcomponentCssStates.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type LayerOptionsModes = CSS_STATES.DEFAULT;

export const layerBottomOptions: SubcomponentOptions<LayerOptionsModes> = {
  [CSS_STATES.DEFAULT]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_TOP,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.COLOR,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.COLOR,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW_VERTICAL,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SIZE,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_HEIGHT,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.PADDING,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING,
    },
  ],
};

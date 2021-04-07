import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_STATES } from '../../../../../../../consts/subcomponentCssStates.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type TextWithNoBackgroundOptions = CSS_STATES.DEFAULT;

export const buttonTextOptions: SubcomponentOptions<TextWithNoBackgroundOptions> = {
  [CSS_STATES.DEFAULT]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.TEXT_FONT,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_FONT,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.PADDING,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.MARGIN,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.NESTED_SUBCOMPONENT_MARGIN,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.POSITION,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_POSITION_NO_ALIGN,
    },
  ],
};

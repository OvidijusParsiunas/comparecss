import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../..//consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type TextOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

export const textOptions: SubcomponentOptions<TextOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.TEXT_FONT,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_FONT,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SIZE,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_SIZE,
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
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_POSITION,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.TEXT,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT,
    },
  ],
};

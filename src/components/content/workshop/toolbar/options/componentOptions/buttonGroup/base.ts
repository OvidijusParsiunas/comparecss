import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type ButtonGroupBaseOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

export const buttonGroupBaseOptions: SubcomponentOptions<ButtonGroupBaseOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BACKGROUND,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND_COLOR_IMAGE,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.MARGIN,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN,
    },
  ],
};

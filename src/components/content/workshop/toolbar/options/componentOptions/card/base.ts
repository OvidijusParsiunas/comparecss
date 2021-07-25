import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type ModalBaseOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

export const cardBaseOptions: SubcomponentOptions<ModalBaseOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BACKGROUND,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND_COLOR,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SIZE,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.MARGIN,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN,
    },
  ],
};

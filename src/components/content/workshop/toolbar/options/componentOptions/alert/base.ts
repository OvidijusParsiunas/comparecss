import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type AlertBaseOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

export const alertBaseOptions: SubcomponentOptions<AlertBaseOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.COLOR,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.COLOR,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SIZE,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.PADDING,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.MARGIN,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.ANIMATIONS,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ANIMATIONS,
      displayIfSubcomponentDisplayed: CORE_SUBCOMPONENTS_NAMES.CLOSE,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.ACTIONS,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ACTIONS,
      displayIfSubcomponentDisplayed: CORE_SUBCOMPONENTS_NAMES.CLOSE,
    },
  ],
};

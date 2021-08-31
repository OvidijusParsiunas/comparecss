import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { buttonBaseOptions } from './base';

type ButtonOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT | CSS_PSEUDO_CLASSES.HOVER | CSS_PSEUDO_CLASSES.CLICK;

export const childButtonOptions: SubcomponentOptions<ButtonOptionsModes> = {
  ...buttonBaseOptions,
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...buttonBaseOptions[CSS_PSEUDO_CLASSES.DEFAULT],
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.POSITION,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.CHILD_COMPONENT_POSITION,
    },
  ],
};

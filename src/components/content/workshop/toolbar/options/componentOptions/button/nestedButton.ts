import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { buttonBaseOptions } from './base';

type ButtonOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT | CSS_PSEUDO_CLASSES.HOVER | CSS_PSEUDO_CLASSES.CLICK;

const nestedSubcomponentSpecificOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.MARGIN,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.NESTED_SUBCOMPONENT_MARGIN,
  },
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.POSITION,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.NESTED_SUBCOMPONENT_POSITION,
  },
]

export const nestedButtonOptions: SubcomponentOptions<ButtonOptionsModes> = {
  ...buttonBaseOptions,
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.overwriteOptions(buttonBaseOptions[CSS_PSEUDO_CLASSES.DEFAULT], nestedSubcomponentSpecificOptions),
  ],
};

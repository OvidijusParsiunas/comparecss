import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { buttonBaseOptions } from '../button/base';

type MenuOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT | CSS_PSEUDO_CLASSES.HOVER | CSS_PSEUDO_CLASSES.CLICK;

const dropdownButtonSpecificOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SIZE,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.DROPDOWN_BUTTON_SIZE,
  },
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.POSITION,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.DROPDOWN_BUTTON_POSITION,
  }
];

export const dropdownButtonOptions: SubcomponentOptions<MenuOptionsModes> = {
  ...buttonBaseOptions,
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.overwriteOptions(buttonBaseOptions[CSS_PSEUDO_CLASSES.DEFAULT], dropdownButtonSpecificOptions),
  ],
};

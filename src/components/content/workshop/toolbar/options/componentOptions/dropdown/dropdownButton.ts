import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { buttonBaseOptions } from '../button/base';

type DropdownButtonOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT | CSS_PSEUDO_CLASSES.HOVER | CSS_PSEUDO_CLASSES.CLICK;

const dropdownButtonSpecificOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SELECT,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.SELECT_DROPDOWN,
  },
];

export const dropdownButtonOptions: SubcomponentOptions<DropdownButtonOptionsModes> = {
  ...buttonBaseOptions,
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.removeOptions(
      buttonBaseOptions[CSS_PSEUDO_CLASSES.DEFAULT], WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW),
    ...dropdownButtonSpecificOptions,
  ],
};

import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { dropdownButtonOptions } from './dropdownButton';

type MenuOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

const selectDropdownButtonSpecificOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SIZE,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.SELECT_DROPDOWN_SIZE,
  },
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SELECT,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.SELECT_DROPDOWN,
  },
];

export const selectDropdownButtonOptions: SubcomponentOptions<MenuOptionsModes> = {
  ...dropdownButtonOptions,
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.overwriteOptions(dropdownButtonOptions[CSS_PSEUDO_CLASSES.DEFAULT], selectDropdownButtonSpecificOptions),
  ],
};

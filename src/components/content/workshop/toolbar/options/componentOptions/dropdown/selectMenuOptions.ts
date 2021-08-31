import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { menuOptions } from './menu';

type MenuOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

const selectMenuSpecificOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SIZE,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.SELECT_DROPDOWN_WIDTH,
  },
];

export const selectMenuOptions: SubcomponentOptions<MenuOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.overwriteOptions(menuOptions[CSS_PSEUDO_CLASSES.DEFAULT], selectMenuSpecificOptions),
  ],
};

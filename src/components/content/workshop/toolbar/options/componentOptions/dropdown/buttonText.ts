import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { buttonTextOptions } from '../text/buttonText';

type DropdownButtonTextOptions = CSS_PSEUDO_CLASSES.DEFAULT | CSS_PSEUDO_CLASSES.HOVER | CSS_PSEUDO_CLASSES.CLICK;

const dropdownButtonTextSpecificOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.TEXT,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.DROPDOWN_BUTTON_TEXT,
  },
];

export const dropdownButtonTextOptions: SubcomponentOptions<DropdownButtonTextOptions> = {
  ...buttonTextOptions,
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
      ...ComponentOptionsUtils.overwriteOptions(buttonTextOptions[CSS_PSEUDO_CLASSES.DEFAULT], dropdownButtonTextSpecificOptions),
  ],
};

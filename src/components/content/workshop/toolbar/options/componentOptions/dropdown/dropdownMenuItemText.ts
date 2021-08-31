import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { buttonTextOptions } from '../text/buttonText';

type DropdownMenuItemTextOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT | CSS_PSEUDO_CLASSES.HOVER | CSS_PSEUDO_CLASSES.CLICK;

export const dropdownMenuItemTextOptions: SubcomponentOptions<DropdownMenuItemTextOptionsModes> = {
  ...buttonTextOptions,
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.removeOptions(buttonTextOptions[CSS_PSEUDO_CLASSES.DEFAULT],
      WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.PADDING, WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.MARGIN, WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.POSITION),
  ],
};

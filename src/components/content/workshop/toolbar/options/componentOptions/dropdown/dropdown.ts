import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type DropdownOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

export const dropdownOptions: SubcomponentOptions<DropdownOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SELECT,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SELECT_DROPDOWN,
    },
  ],
};

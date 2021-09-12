import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type ChildDropdownOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

export const childDropdownOptions: SubcomponentOptions<ChildDropdownOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SELECT,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SELECT_DROPDOWN,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.POSITION,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.CHILD_COMPONENT_POSITION,
    }
  ],
};

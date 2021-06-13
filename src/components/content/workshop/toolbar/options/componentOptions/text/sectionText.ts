import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { textOptions } from './text';

type ButtonOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

const sectionTextSubcomponentSpecificOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_BORDER,
  },
]

export const sectionTextOptions: SubcomponentOptions<ButtonOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...textOptions[CSS_PSEUDO_CLASSES.DEFAULT],
    ...sectionTextSubcomponentSpecificOptions,
  ],
};

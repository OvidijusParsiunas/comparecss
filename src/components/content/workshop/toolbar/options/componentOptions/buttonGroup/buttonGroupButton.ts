import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { childButtonOptions } from '../button/childButton';

type ButtonGroupButtonOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT | CSS_PSEUDO_CLASSES.HOVER | CSS_PSEUDO_CLASSES.CLICK;

const buttonGroupButtonSpecificOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_GROUP_BUTTON_BORDER,
  },
];

const buttonGroupButtonSpecificActiveOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_COLOR,
  },
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_GROUP_BUTTON_SHADOW,
  },
];

export const buttonGroupButtonOptions: SubcomponentOptions<ButtonGroupButtonOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.overwriteOptions(
      ComponentOptionsUtils.removeOptions(childButtonOptions[CSS_PSEUDO_CLASSES.DEFAULT],  WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW),
      buttonGroupButtonSpecificOptions),
  ],
  [CSS_PSEUDO_CLASSES.HOVER]: [
    ...ComponentOptionsUtils.overwriteOptions(childButtonOptions[CSS_PSEUDO_CLASSES.HOVER], buttonGroupButtonSpecificActiveOptions),
  ],
  [CSS_PSEUDO_CLASSES.CLICK]: [
    ...ComponentOptionsUtils.overwriteOptions(childButtonOptions[CSS_PSEUDO_CLASSES.CLICK], buttonGroupButtonSpecificActiveOptions),
  ],
};

import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { defaultLayerOptions } from './defaultLayer';

type DropdownItem = CSS_PSEUDO_CLASSES.DEFAULT | CSS_PSEUDO_CLASSES.HOVER | CSS_PSEUDO_CLASSES.CLICK;

const cardLayerSpecificOptionsOverwrite = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_BOTTOM,
  },
];

const animationOption = {
  buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.ANIMATIONS,
  type: WORKSHOP_TOOLBAR_OPTION_TYPES.FADE_ANIMATION,
};

export const dropdownItemOptions: SubcomponentOptions<DropdownItem> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.removeOptions(
      ComponentOptionsUtils.overwriteOptions(defaultLayerOptions[CSS_PSEUDO_CLASSES.DEFAULT], cardLayerSpecificOptionsOverwrite),
    WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BACKGROUND, WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW),
    animationOption,
  ],
  [CSS_PSEUDO_CLASSES.HOVER]: [
    ...ComponentOptionsUtils.removeOptions(
      ComponentOptionsUtils.overwriteOptions(defaultLayerOptions[CSS_PSEUDO_CLASSES.DEFAULT], cardLayerSpecificOptionsOverwrite),
    WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW),
  ],
  [CSS_PSEUDO_CLASSES.CLICK]: [
    ...ComponentOptionsUtils.removeOptions(
      ComponentOptionsUtils.overwriteOptions(defaultLayerOptions[CSS_PSEUDO_CLASSES.DEFAULT], cardLayerSpecificOptionsOverwrite),
    WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW),
  ],
};

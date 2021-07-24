import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { defaultLayerOptions } from './defaultLayer';

type LayerOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

const cardLayerSpecificOptionsOverwrite = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BACKGROUND,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND_IMAGE,
  },
];

const cardLayerSpecificOptionsStatic = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.POSITION,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.LAYER_POSITION,
  },
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.ANIMATIONS,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.IMAGE_ANIMATIONS,
  },
];

export const cardBottomLayerOptions: SubcomponentOptions<LayerOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.removeOptions(
      ComponentOptionsUtils.overwriteOptions(defaultLayerOptions[CSS_PSEUDO_CLASSES.DEFAULT], cardLayerSpecificOptionsOverwrite),
      WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER, WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW),
    ...cardLayerSpecificOptionsStatic,
  ],
};

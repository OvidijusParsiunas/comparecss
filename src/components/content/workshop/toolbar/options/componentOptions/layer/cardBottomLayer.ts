import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { defaultLayerOptions } from './defaultLayer';

type LayerOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

const cardLayerSpecificOptionsStatic = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.POSITION,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.LAYER_POSITION,
  },
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.IMAGE,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.IMAGE_SCALE,
  }
];

export const cardBottomLayerOptions: SubcomponentOptions<LayerOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.removeOptions(defaultLayerOptions[CSS_PSEUDO_CLASSES.DEFAULT],
      WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER, WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW),
    ...cardLayerSpecificOptionsStatic,
  ],
};

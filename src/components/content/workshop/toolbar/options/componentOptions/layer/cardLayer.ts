import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { defaultLayerOptions } from './defaultLayer';

type LayerOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

const cardLayerSpecificOptionsOverwrite = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_TOP,
  },
];

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

export const cardLayerOptions: SubcomponentOptions<LayerOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...ComponentOptionsUtils.overwriteOptions(defaultLayerOptions[CSS_PSEUDO_CLASSES.DEFAULT], cardLayerSpecificOptionsOverwrite),
    ...cardLayerSpecificOptionsStatic,
  ],
};

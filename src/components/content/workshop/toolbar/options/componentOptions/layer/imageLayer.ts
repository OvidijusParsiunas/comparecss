import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { ComponentOptionsUtils } from '../componentOptionsUtils';
import { defaultLayerOptions } from './defaultLayer';

type LayerOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

const imageLayerSpecificOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.IMAGE,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.IMAGE_SCALE,
  },
];

export const imageLayerOptions: SubcomponentOptions<LayerOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...imageLayerSpecificOptions,
    ...ComponentOptionsUtils.removeOptions(defaultLayerOptions[CSS_PSEUDO_CLASSES.DEFAULT], WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER),
  ],
};

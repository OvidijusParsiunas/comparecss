import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';
import { layerTopOptions } from './layerTop';

type LayerOptionsModes = CSS_PSEUDO_CLASSES.DEFAULT;

const imageLayerTopSpecificOptions = [
  {
    buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.IMAGE,
    type: WORKSHOP_TOOLBAR_OPTION_TYPES.IMAGE_SCALE,
  },
]

export const imageLayerTopOptions: SubcomponentOptions<LayerOptionsModes> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    ...imageLayerTopSpecificOptions,
    ...layerTopOptions[CSS_PSEUDO_CLASSES.DEFAULT],
  ],
};

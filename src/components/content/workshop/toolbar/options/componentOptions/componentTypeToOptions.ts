import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { Options } from '../../../../../../interfaces/options';
import { closeButtonTextOptions } from './button/closeText';
import { nestedButtonOptions } from './button/nestedButton';
import { closeButtonOptions } from './button/closeButton';
import { layerBottomOptions } from './layer/layerBottom';
import { layerMiddleOptions } from './layer/layerMiddle';
import { getCardOptions } from './card/cardOptions';
import { layerTopOptions } from './layer/layerTop';
import { buttonBaseOptions } from './button/base';
import { buttonTextOptions } from './button/text';
import { alertBaseOptions } from './alert/base';
import { modalBaseOptions } from './modal/base';
import { textOptions } from './text/text';

type SubcomponentTypeToOptions = {
  [key in SUBCOMPONENT_TYPES]?: Options;
}

export type ComponentTypeToOptions = {
  [key in NEW_COMPONENT_TYPES]?: SubcomponentTypeToOptions;
}

// WORK1: change type
export const componentTypeToOptions: any = {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    [SUBCOMPONENT_TYPES.BUTTON]: buttonBaseOptions as Options,
    [SUBCOMPONENT_TYPES.BUTTON_TEXT]: buttonTextOptions as Options,
  },
  [NEW_COMPONENT_TYPES.ALERT]: {
    [SUBCOMPONENT_TYPES.BASE]: alertBaseOptions as Options,
    [SUBCOMPONENT_TYPES.TEXT]: textOptions as Options,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: closeButtonOptions as Options,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT]: closeButtonTextOptions as Options,
  },
  [NEW_COMPONENT_TYPES.MODAL]: {
    [SUBCOMPONENT_TYPES.BASE]: modalBaseOptions as Options,
    [SUBCOMPONENT_TYPES.TEXT]: textOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER_1]: layerTopOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER_2]: layerMiddleOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER_3]: layerBottomOptions as Options,
    [SUBCOMPONENT_TYPES.BUTTON]: nestedButtonOptions as Options,
    [SUBCOMPONENT_TYPES.BUTTON_TEXT]: buttonTextOptions as Options,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: closeButtonOptions as Options,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT]: closeButtonTextOptions as Options,
  },
  [NEW_COMPONENT_TYPES.CARD]: getCardOptions,
};

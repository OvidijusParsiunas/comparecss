import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { Options } from '../../../../../../interfaces/options';
import { closeButtonTextOptions } from './button/closeText';
import { nestedButtonOptions } from './button/nestedButton';
import { defaultLayerOptions } from './layer/defaultLayer';
import { ButtonOptions } from './button/buttonOptions';
import { cardLayerOptions } from './layer/cardLayer';
import { buttonTextOptions } from './button/text';
import { CardOptions } from './card/cardOptions';
import { alertBaseOptions } from './alert/base';
import { modalBaseOptions } from './modal/base';
import { textOptions } from './text/text';

type SubcomponentTypeToOptions = {
  [key in SUBCOMPONENT_TYPES]?: Options;
}

export type ComponentTypeToOptions = {
  [key in COMPONENT_TYPES]?: SubcomponentTypeToOptions;
}

// WORK1: change type
export const componentTypeToOptions: any = {
  [COMPONENT_TYPES.BUTTON]: ButtonOptions.getButtonOptions,
  [COMPONENT_TYPES.ALERT]: {
    [SUBCOMPONENT_TYPES.BASE]: alertBaseOptions as Options,
    [SUBCOMPONENT_TYPES.TEXT]: textOptions as Options,
    // [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: closeButtonOptions as Options,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT]: closeButtonTextOptions as Options,
  },
  [COMPONENT_TYPES.MODAL]: {
    [SUBCOMPONENT_TYPES.BASE]: modalBaseOptions as Options,
    [SUBCOMPONENT_TYPES.TEXT]: textOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER_1]: defaultLayerOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER_2]: defaultLayerOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER_3]: cardLayerOptions as Options,
    [SUBCOMPONENT_TYPES.BUTTON]: nestedButtonOptions as Options,
    [SUBCOMPONENT_TYPES.BUTTON_TEXT]: buttonTextOptions as Options,
    // [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: closeButtonOptions as Options,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT]: closeButtonTextOptions as Options,
  },
  [COMPONENT_TYPES.CARD]: CardOptions.getCardOptions,
};

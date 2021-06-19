import { SubcomponentCssPseudoClasses } from '../../../../../../interfaces/subcomponentCssPseudoClasses';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { SubcomponentOptions } from '../../../../../../interfaces/componentOptions';
import { imageLayerTopOptions } from './layer/imageLayerTop';
import { closeButtonTextOptions } from './button/closeText';
import { nestedButtonOptions } from './button/nestedButton';
import { closeButtonOptions } from './button/closeButton';
import { layerBottomOptions } from './layer/layerBottom';
import { layerMiddleOptions } from './layer/layerMiddle';
import { sectionTextOptions } from './text/sectionText';
import { layerTopOptions } from './layer/layerTop';
import { buttonTextOptions } from './button/text';
import { buttonBaseOptions } from './button/base';
import { alertBaseOptions } from './alert/base';
import { modalBaseOptions } from './modal/base';
import { cardBaseOptions } from './card/base';
import { avatarOptions } from './card/avatar';
import { textOptions } from './text/text';

type SubcomponentTypeToOptions = {
  [key in SUBCOMPONENT_TYPES]?: SubcomponentOptions<keyof SubcomponentCssPseudoClasses>;
}

export type ComponentTypeToOptions = {
  [key in NEW_COMPONENT_TYPES]?: SubcomponentTypeToOptions;
}

export const componentTypeToOptions: ComponentTypeToOptions = {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    [SUBCOMPONENT_TYPES.BUTTON]: buttonBaseOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.BUTTON_TEXT]: buttonTextOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
  },
  [NEW_COMPONENT_TYPES.ALERT]: {
    [SUBCOMPONENT_TYPES.BASE]: alertBaseOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.TEXT]: textOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: closeButtonOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT]: closeButtonTextOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
  },
  [NEW_COMPONENT_TYPES.MODAL]: {
    [SUBCOMPONENT_TYPES.BASE]: modalBaseOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.TEXT]: textOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.LAYER_1]: layerTopOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.LAYER_2]: layerMiddleOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.LAYER_3]: layerBottomOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.BUTTON]: nestedButtonOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.BUTTON_TEXT]: buttonTextOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: closeButtonOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT]: closeButtonTextOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
  },
  [NEW_COMPONENT_TYPES.CARD]: {
    [SUBCOMPONENT_TYPES.BASE]: cardBaseOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.TEXT]: textOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.SECTION_TEXT]: sectionTextOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    // WORK1: refactor this to know when to apply layer top/middle/bottom
    [SUBCOMPONENT_TYPES.LAYER]: layerMiddleOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.LAYER_1]: imageLayerTopOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.LAYER_2]: layerMiddleOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.LAYER_3]: layerBottomOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.BUTTON]: nestedButtonOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.BUTTON_TEXT]: buttonTextOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: closeButtonOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT]: closeButtonTextOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
    [SUBCOMPONENT_TYPES.AVATAR]: avatarOptions as SubcomponentOptions<keyof SubcomponentCssPseudoClasses>,
  },
};

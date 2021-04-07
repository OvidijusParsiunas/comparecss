import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../consts/coreSubcomponentNames.enum';
import { SubcomponentCssStates } from '../../../../../../interfaces/SubcomponentCssStates';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import { SubcomponentOptions } from '../../../../../../interfaces/componentOptions';
import { nestedButtonOptions } from './button/nestedBase';
import { layerBottomOptions } from './layer/layerBottom';
import { layerMiddleOptions } from './layer/layerMiddle';
import { layerTopOptions } from './layer/layerTop';
import { buttonTextOptions } from './button/text';
import { buttonBaseOptions } from './button/base';
import { alertCloseOptions } from './alert/close';
import { alertBaseOptions } from './alert/base';
import { modalBaseOptions } from './modal/base';
import { textOptions } from './text/text';

type subcomponentTypeToOptions = {
  [key in CORE_SUBCOMPONENTS_NAMES]?: SubcomponentOptions<keyof SubcomponentCssStates>;
}

export type ComponentTypeToOptions = {
  [key in NEW_COMPONENT_TYPES]: subcomponentTypeToOptions;
}

export const componentTypeToOptions: ComponentTypeToOptions = {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: buttonBaseOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: buttonTextOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
  },
  [NEW_COMPONENT_TYPES.ALERT]: {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: alertBaseOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: textOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.CLOSE]: alertCloseOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
  },
  [NEW_COMPONENT_TYPES.MODAL]: {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: modalBaseOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: textOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.TEXT_2]: textOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.CLOSE]: alertCloseOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: layerTopOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.LAYER_2]: layerMiddleOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.LAYER_3]: layerBottomOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.BUTTON_1]: nestedButtonOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
    [CORE_SUBCOMPONENTS_NAMES.BUTTON_2]: nestedButtonOptions as SubcomponentOptions<keyof SubcomponentCssStates>,
  },
};

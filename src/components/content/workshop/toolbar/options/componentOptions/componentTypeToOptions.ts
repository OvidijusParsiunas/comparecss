import { SubcomponentCssModes } from '../../../../../../interfaces/subcomponentCssModes';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import { SubcomponentOptions } from '../../../../../../interfaces/componentOptions';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';
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
  [key in SUB_COMPONENTS]?: SubcomponentOptions<keyof SubcomponentCssModes>;
}

type ComponentTypeToOptions = {
  [key in NEW_COMPONENT_TYPES]: subcomponentTypeToOptions;
}

export const componentTypeToOptions: ComponentTypeToOptions = {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    [SUB_COMPONENTS.BASE]: buttonBaseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.TEXT_1]: buttonTextOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
  },
  [NEW_COMPONENT_TYPES.ALERT]: {
    [SUB_COMPONENTS.BASE]: alertBaseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.TEXT_1]: textOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.CLOSE]: alertCloseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
  },
  [NEW_COMPONENT_TYPES.MODAL]: {
    [SUB_COMPONENTS.BASE]: modalBaseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.TEXT_1]: textOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.TEXT_2]: textOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.CLOSE]: alertCloseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.LAYER_1]: layerTopOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.LAYER_2]: layerMiddleOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.LAYER_3]: layerBottomOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.BUTTON_1]: nestedButtonOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.BUTTON_2]: nestedButtonOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
  },
};

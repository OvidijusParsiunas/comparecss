import { SubcomponentCssModes } from '../../../../../../interfaces/subcomponentCssModes';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import { SubcomponentOptions } from '../../../../../../interfaces/componentOptions';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';
import { buttonBaseOptions } from './button/base';
import { alertCloseOptions } from './alert/close';
import { alertBaseOptions } from './alert/base';

type subcomponentTypeToOptions = {
  [key in SUB_COMPONENTS]?: SubcomponentOptions<keyof SubcomponentCssModes>;
}

type ComponentTypeToOptions = {
  [key in NEW_COMPONENT_TYPES]: subcomponentTypeToOptions;
}

export const componentTypeToOptions: ComponentTypeToOptions = {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    [SUB_COMPONENTS.BASE]: buttonBaseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
  },
  [NEW_COMPONENT_TYPES.ALERT]: {
    [SUB_COMPONENTS.BASE]: alertBaseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.CLOSE]: alertCloseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
  },
  [NEW_COMPONENT_TYPES.MODAL]: {
    [SUB_COMPONENTS.BASE]: alertBaseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.CLOSE]: alertCloseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.LAYER_1]: alertBaseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.LAYER_2]: alertCloseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.LAYER_3]: alertBaseOptions as SubcomponentOptions<keyof SubcomponentCssModes>,
  },
};

import { SubcomponentCssModes } from '../../../../../../interfaces/subcomponentCssModes';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';
import { ComponentOptions } from '../../../../../../interfaces/componentOptions';
import { buttonBaseOptions } from './button/base';
import { alertBaseOptions } from './alert/base';
import { alertCloseOptions } from './alert/close';

type subcomponentTypeToOptions = {
  [key in SUB_COMPONENTS]?: ComponentOptions<keyof SubcomponentCssModes>;
}

type ComponentTypeToOptions = {
  [key in NEW_COMPONENT_TYPES]: subcomponentTypeToOptions;
}

export const componentTypeToOptions: ComponentTypeToOptions = {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    [SUB_COMPONENTS.BASE]: buttonBaseOptions as ComponentOptions<keyof SubcomponentCssModes>,
  },
  [NEW_COMPONENT_TYPES.ALERT]: {
    [SUB_COMPONENTS.BASE]: alertBaseOptions as ComponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.CLOSE]: alertCloseOptions as ComponentOptions<keyof SubcomponentCssModes>,
  },
};

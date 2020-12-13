import { SubcomponentCssModes } from '../../../../../../interfaces/subcomponentCssModes';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';
import { ComponentOptions } from '../../../../../../interfaces/componentOptions';
import { buttonContainerOptions } from './button/container';
import { alertContainerOptions } from './alert/container';
import { alertCloseOptions } from './alert/close';

type subcomponentTypeToOptions = {
  [key in SUB_COMPONENTS]?: ComponentOptions<keyof SubcomponentCssModes>;
}

type ComponentTypeToOptions = {
  [key in NEW_COMPONENT_TYPES]: subcomponentTypeToOptions;
}

export const componentTypeToOptions: ComponentTypeToOptions = {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    [SUB_COMPONENTS.BASE]: buttonContainerOptions as ComponentOptions<keyof SubcomponentCssModes>,
  },
  [NEW_COMPONENT_TYPES.ALERT]: {
    [SUB_COMPONENTS.BASE]: alertContainerOptions as ComponentOptions<keyof SubcomponentCssModes>,
    [SUB_COMPONENTS.CLOSE]: alertCloseOptions as ComponentOptions<keyof SubcomponentCssModes>,
  },
};

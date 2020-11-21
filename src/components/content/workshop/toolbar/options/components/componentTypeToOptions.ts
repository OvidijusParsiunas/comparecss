import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import { ComponentOptions } from '../../../../../../interfaces/componentOptions';
import { ComponentModes } from '../../../../../../interfaces/componentModes';
import { buttonOptions } from './button';
import { alertOptions } from './alert';

type ComponentTypeToOptions = {
  [key in NEW_COMPONENT_TYPES]: ComponentOptions<keyof ComponentModes>;
}

export const componentTypeToOptions: ComponentTypeToOptions = {
  [NEW_COMPONENT_TYPES.BUTTON]: buttonOptions as ComponentOptions<keyof ComponentModes>,
  [NEW_COMPONENT_TYPES.ALERT]: alertOptions as ComponentOptions<keyof ComponentModes>,
};

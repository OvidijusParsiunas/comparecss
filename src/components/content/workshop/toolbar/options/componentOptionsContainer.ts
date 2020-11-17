import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum';
import { ComponentOptions } from '../../../../../interfaces/componentOptions';
import { buttonOptions } from './button';
import { ComponentModes } from '../../../../../interfaces/componentModes';

type ComponentOptionsContainer = {
  [key in NEW_COMPONENT_TYPES]?: ComponentOptions<keyof ComponentModes>;
}

export const componentOptionsContainer: ComponentOptionsContainer = {
  [NEW_COMPONENT_TYPES.BUTTON]: buttonOptions,
};

import { COMPONENT_MODES } from '../consts/componentModes.enum';
import { ComponentModes } from './componentModes';

type SpecificButtonComponentModes = Required<Pick<ComponentModes, 'default' | 'hover' | 'click'>>

type ButtonComponentModes = {
  [key in keyof SpecificButtonComponentModes]: COMPONENT_MODES;
}

const buttonComponentModes: ComponentModes = {
  default: COMPONENT_MODES.DEFAULT,
  hover: COMPONENT_MODES.HOVER,
  click: COMPONENT_MODES.CLICK,
}

export default buttonComponentModes as ButtonComponentModes;

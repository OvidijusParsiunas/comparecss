import { COMPONENT_MODES } from '../consts/componentModes.enum';

export type ComponentModes = {
  [property in COMPONENT_MODES]?: property;
}

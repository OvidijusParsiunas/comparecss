import { SUB_COMPONENT_CSS_MODES } from '../consts/subcomponentCssModes.enum';

export type SubcomponentCssModes = {
  [property in SUB_COMPONENT_CSS_MODES]?: property;
}

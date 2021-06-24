import { COMPONENT_STYLES } from '../consts/componentStyles.enum'
import { ComponentGenerator } from './componentGenerator';

export type ComponentStyleToGenerator = {
  [key in COMPONENT_STYLES]?: ComponentGenerator;
}

import { NEW_COMPONENT_STYLES } from '../consts/newComponentStyles.enum'
import { ComponentGenerator } from './componentGenerator';

export type ComponentStyleToGenerator = {
  [key in NEW_COMPONENT_STYLES]?: ComponentGenerator;
}

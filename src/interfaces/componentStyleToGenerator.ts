import { NEW_COMPONENT_STYLES } from '../consts/newComponentStyles.enum'
import { ComponentGenerator } from './newComponent';

export type ComponentStyleToGenerator = {
  [key in NEW_COMPONENT_STYLES]?: ComponentGenerator;
}

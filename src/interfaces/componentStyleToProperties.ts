import { NEW_COMPONENT_STYLES } from '../consts/newComponentStyles.enum'
import { NewComponent } from './newComponent';

export type ComponentStyleToProperties = {
  [key in NEW_COMPONENT_STYLES]?: NewComponent;
}

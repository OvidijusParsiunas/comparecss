import { WorkshopComponent } from './workshopComponent';
import { NEW_COMPONENT_STYLES } from '../consts/newComponentStyles.enum'

export type NewComponentStylesContainer = {
  [key in NEW_COMPONENT_STYLES]?: WorkshopComponent;
}

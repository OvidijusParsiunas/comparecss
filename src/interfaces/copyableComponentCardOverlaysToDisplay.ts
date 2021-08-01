import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { COMPONENT_STYLES } from '../consts/componentStyles.enum';

export interface CopyableComponentCardOverlaysToDisplay {
  isDisplaying: boolean;
  baseType?: SUBCOMPONENT_TYPES;
  componentStyle?: COMPONENT_STYLES;
}

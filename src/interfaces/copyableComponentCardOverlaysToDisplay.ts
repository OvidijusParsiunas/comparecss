import { COMPONENT_TYPES } from '../consts/componentTypes.enum';

export interface CopyableComponentCardOverlaysToDisplay {
  isDisplaying: boolean;
  componentType?: COMPONENT_TYPES;
}

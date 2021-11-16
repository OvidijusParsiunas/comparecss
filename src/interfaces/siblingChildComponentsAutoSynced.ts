import { CustomDynamicProperties, WorkshopComponent } from './workshopComponent';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';

export interface SiblingComponentState {
  currentCount: number;
  customDynamicProperties: CustomDynamicProperties;
}

export type SiblingComponentTypes = {
  [key in COMPONENT_TYPES]?: SiblingComponentState;
};

export interface SiblingChildComponentsAutoSynced {
  resyncFunc?: (container: WorkshopComponent) => void;
  siblingComponentTypes?: SiblingComponentTypes;
}

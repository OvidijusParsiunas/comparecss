import { CustomDynamicProperties, WorkshopComponent } from './workshopComponent';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';

// WORK 2 - component?
export interface SiblingSubcomponentState {
  currentCount: number;
  customDynamicProperties: CustomDynamicProperties;
}

export type SiblingSubcomponentTypes = {
  [key in SUBCOMPONENT_TYPES]?: SiblingSubcomponentState;
};

export interface SiblingChildComponentsAutoSynced {
  resyncFunc?: (container: WorkshopComponent) => void;
  siblingSubcomponentTypes?: SiblingSubcomponentTypes;
}

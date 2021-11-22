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
  // this is used for instances where multiple components are autosynced with each other (buttons in a button group)
  // and during the child sync mode - upon hovering a button card - only the currently selected button would have
  // the tempOriginalCustomProperties property set on it - which would not allow the ButtonGroupCompositionAPIUtils class
  // getButtonGroupCss method to identify that each button is temporarily synced, hence not overwriting the required properties
  // this property allows the parent layer to indicate whether the auto synced components are temporarily synced to another
  // component - which will allow getButtonGroupCss to overwrite the required properties (border/shadow) for every button
  areChildrenComponentsTemporarilySynced?: boolean;
}

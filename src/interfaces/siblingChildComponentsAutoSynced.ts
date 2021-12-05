import { CustomCss, CustomDynamicProperties, WorkshopComponent } from './workshopComponent';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';

export interface SiblingComponentState {
  components: Set<WorkshopComponent>;
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
  // getButtonGroupButtonCss method to identify that each button is temporarily synced, hence not overwriting the required properties
  // this property allows the parent layer to indicate whether the auto synced components are temporarily synced to another
  // component - which will allow getButtonGroupButtonCss to overwrite the required properties (border/shadow) for every button
  areChildrenComponentsTemporarilySynced?: boolean;
  // used to prevent same logic from being executed for each sibling component and store the result
  // also used to prevent logic from being executed when the user changes the css pseudo class
  overwriteCssForSyncedComponent?: CustomCss;
}

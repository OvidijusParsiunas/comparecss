import { SubcomponentTypeToProperties } from './subcomponentTypeToProperties';
import { Subcomponent } from './workshopComponent';

interface ComponentCompositionAPI {
  trigger?: boolean;
  triggered?: boolean;
}

export interface OtherSubcomponentTriggers {
  // when a subcomponent's mouse event is triggered, trigger other subcomponents' mouse events
  // when a subcomponent's css pseudo class is trigger via dropdown, trigger other subcomponents' css pseudo classes
  // the reason for using two different approaches is because when the css pseudo class is selected via the dropdown
  // the css pseudo class on the triggered subcomponents is set and there is no need to worry about any further logic
  // for managing them when their mouse events are triggered by the user's mouse, logic for going between click and
  // default as useSubcomponentPreviewEventHandlers tracks the hover event to populate the css inbetween those classes
  // and mouse event animations that occur when the user hovers and clicks a subcomponent with their mouse
  // on the other hand when the user changes the css pseudo class using the mouse - a simple event trigger does
  // the trick as default hover and click are triggered in a natural way. Additionally there is no need to worry
  // about triggering the parent subcomponent as parent is the one that does all the triggering
  subcomponentsToTrigger?: SubcomponentTypeToProperties;
  // reference to the subcomponent that triggered it (can currently be triggered by one subcomponent)
  subcomponentThatTriggersThis?: Subcomponent;
  componentCompositionAPI: ComponentCompositionAPI;
}

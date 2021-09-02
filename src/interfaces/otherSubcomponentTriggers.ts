import { CoreSubcomponentRefs } from './coreSubcomponentRefs';
import { SubcomponentProperties } from './workshopComponent';

interface ComponentCompositionAPI {
  trigger?: boolean;
  triggered?: boolean;
}

export interface OtherSubcomponentTriggers {
  // when a subcomponent's mouse event is triggered, trigger other subcomponents' mouse events
  // when a subcomponent's css pseudo class is trigger via dropdown, trigger other subcomponents' css pseudo classes
  // the reason for using two different approaches is because when the css pseudo class is selected via the dropdown
  // the css pseudo class on the trigger subcomponents be set and sp there is no need to worry about any further logic
  // for managing them when their mouse events are triggered by the user's mouse
  // on the other hand - when the user changes the css pseudo class using the mouse - a simple event trigger does
  // the trick without having to go out and set the subcomponents active classes, especially because other children
  // of the subcomponent that triggers a hovered subcompont do not need to have their css pseudo classes changed
  subcomponentsToTrigger?: CoreSubcomponentRefs;
  // reference to the subcomponent that triggered it (can currently be triggered by one subcomponent)
  subcomponentThatTriggersThis?: SubcomponentProperties;
  componentCompositionAPI: ComponentCompositionAPI;
}

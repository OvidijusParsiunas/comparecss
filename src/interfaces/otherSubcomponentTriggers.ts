import { CoreSubcomponentRefs } from './coreSubcomponentRefs';
import { SubcomponentProperties } from './workshopComponent';

interface ComponentCompositionAPI {
  trigger?: boolean;
  triggered?: boolean;
}

export interface OtherSubcomponentTriggers {
  // when a subcomponent's mouse event is triggered, trigger other subcomponents' mouse events
  // when a subcomponent's css pseudo class is trigger, trigger other subcomponents' css pseudo classes
  // WORK 1 - consider triggering subcomponents same way
  subcomponentsToTrigger?: CoreSubcomponentRefs;
  // reference to the subcomponent that triggered it (can currently be triggered by one subcomponent)
  subcomponentThatTriggersThis?: SubcomponentProperties;
  componentCompositionAPI: ComponentCompositionAPI;
}

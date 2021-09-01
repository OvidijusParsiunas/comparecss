import { CoreSubcomponentRefs } from './coreSubcomponentRefs';
import { SubcomponentProperties } from './workshopComponent';

export interface OtherSubcomponentTriggers {
  // when a subcomponent's mouse event is triggered, trigger other subcomponents' mouse events
  // when a subcomponent's css pseudo class is trigger, trigger other subcomponents' css pseudo classes
  // WORK 1 - consider triggering subcomponents same way
  // WORK 1 - rename
  otherSubcomponentsToTrigger?: CoreSubcomponentRefs;
  // reference to the subcomponent that triggered it (can currently be triggered by one subcomponent)
  triggeredByAnotherSubcomponent?: SubcomponentProperties;
}

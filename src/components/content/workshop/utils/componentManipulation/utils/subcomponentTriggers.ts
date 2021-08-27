import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../generic/jsonUtils';

export class SubcomponentTriggers {

  private static setPropertyValues(newComponentBase: SubcomponentProperties, subcomponentType: number,
      triggerSubcomponent: SubcomponentProperties): void {
    if (!triggerSubcomponent.otherSubcomponentsToTrigger) return;
    newComponentBase.triggeredByAnotherSubcomponent = triggerSubcomponent;
    JSONUtils.setPropertyIfExists(triggerSubcomponent.otherSubcomponentsToTrigger, subcomponentType, newComponentBase);
  }

  public static set(newComponentContainer: WorkshopComponent, newComponentParentLayerSubcomponent: SubcomponentProperties,
      newComponentBase: SubcomponentProperties, subcomponentType: number): void {
    const newComponentContainerBase = newComponentContainer.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    SubcomponentTriggers.setPropertyValues(newComponentBase, subcomponentType, newComponentContainerBase);
    SubcomponentTriggers.setPropertyValues(newComponentBase, subcomponentType, newComponentParentLayerSubcomponent);
  }

  // Only need to set one other subcomponent's otherSubcomponentsToTrigger value to null as this subcomponent can only be triggered
  // by one other subcomponent
  // WORK1 - copy
  public static remove({ triggeredByAnotherSubcomponent, subcomponentType }: SubcomponentProperties): void {
    if (!triggeredByAnotherSubcomponent) return;
    triggeredByAnotherSubcomponent.otherSubcomponentsToTrigger[subcomponentType] = null;
  }
}

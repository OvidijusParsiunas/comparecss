import { CompositionAPISubcomponentTriggerState } from '../../../../../../interfaces/compositionAPISubcomponentTriggerState';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentRefsUtils } from '../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../generic/jsonUtils';

export class SubcomponentTriggers {

  private static setPropertyValues(newComponentBase: SubcomponentProperties, subcomponentType: number,
      triggerSubcomponent: SubcomponentProperties): void {
    if (!triggerSubcomponent.otherSubcomponentTriggers.otherSubcomponentsToTrigger) return;
    newComponentBase.otherSubcomponentTriggers.triggeredByAnotherSubcomponent = triggerSubcomponent;
    JSONUtils.setPropertyIfExists(triggerSubcomponent.otherSubcomponentTriggers.otherSubcomponentsToTrigger, subcomponentType, newComponentBase);
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
  public static remove({ otherSubcomponentTriggers: { triggeredByAnotherSubcomponent }, subcomponentType }: SubcomponentProperties): void {
    if (!triggeredByAnotherSubcomponent) return;
    triggeredByAnotherSubcomponent.otherSubcomponentTriggers.otherSubcomponentsToTrigger[subcomponentType] = null;
  }

  private static setThisSubcomponentTriggerCss(baseSubcomponent: SubcomponentProperties, triggeredByAnotherSubcomponent: SubcomponentProperties,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES, isTriggered: boolean): void {
    if (triggeredByAnotherSubcomponent && triggeredByAnotherSubcomponent.activeCssPseudoClass !== activeCssPseudoClass) {
      triggeredByAnotherSubcomponent.activeCssPseudoClass = activeCssPseudoClass;
      baseSubcomponent.initiator = isTriggered;
    }
  }

  private static setOtherSubcomponentCss(otherSubcomponentProperties: SubcomponentProperties, activeCssPseudoClass: CSS_PSEUDO_CLASSES,
      isTriggered: boolean): void {
    if (!otherSubcomponentProperties.initiator && otherSubcomponentProperties.activeCssPseudoClass !== activeCssPseudoClass) {
      otherSubcomponentProperties.activeCssPseudoClass = activeCssPseudoClass;
      otherSubcomponentProperties.triggered = isTriggered;
    }
  }

  private static setOtherSubcomponentsCss(baseSubcomponent: SubcomponentProperties, activeCssPseudoClass: CSS_PSEUDO_CLASSES, isTriggered: boolean): void {
    const { otherSubcomponentTriggers: { otherSubcomponentsToTrigger, triggeredByAnotherSubcomponent }, triggered } = baseSubcomponent;
    if (triggered) return;
    CoreSubcomponentRefsUtils.getActiveRefKeys(otherSubcomponentsToTrigger).forEach((subcomponentType) => {
      const otherSubcomponentProperties = otherSubcomponentsToTrigger[subcomponentType];
      SubcomponentTriggers.setOtherSubcomponentCss(otherSubcomponentProperties, activeCssPseudoClass, isTriggered);
    });
    SubcomponentTriggers.setThisSubcomponentTriggerCss(baseSubcomponent, triggeredByAnotherSubcomponent, activeCssPseudoClass, isTriggered);
  }

  // subcomponents here are triggered slightly differently than the useSubcomponentPreviewHandlers file's triggerOtherSubcomponentsMouseEvents
  // method because there are no events fired and the customCss is augmented directly
  public static triggerOtherSubcomponentsCss(baseSubcomponent: SubcomponentProperties, activeCssPseudoClass: CSS_PSEUDO_CLASSES,
      otherSubcomponentTriggerState: CompositionAPISubcomponentTriggerState): void {
    if (activeCssPseudoClass !== CSS_PSEUDO_CLASSES.DEFAULT) {
      SubcomponentTriggers.setOtherSubcomponentsCss(baseSubcomponent, activeCssPseudoClass, true);
      otherSubcomponentTriggerState.subcomponentProperties = baseSubcomponent;
    } else if (otherSubcomponentTriggerState.subcomponentProperties === baseSubcomponent) {
      SubcomponentTriggers.setOtherSubcomponentsCss(baseSubcomponent, activeCssPseudoClass, false);
      otherSubcomponentTriggerState.subcomponentProperties = null;
    }
  }
}

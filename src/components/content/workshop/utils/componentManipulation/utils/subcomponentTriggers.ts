import { CompositionAPISubcomponentTriggerState } from '../../../../../../interfaces/compositionAPISubcomponentTriggerState';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentRefsUtils } from '../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../generic/jsonUtils';

export class SubcomponentTriggers {

  private static setPropertyValues(newComponentBase: SubcomponentProperties, subcomponentType: number,
      triggerSubcomponent: SubcomponentProperties): void {
    const { subcomponentsToTrigger } = triggerSubcomponent.otherSubcomponentTriggers || {};
    if (!subcomponentsToTrigger) return;
    // WORK1 - create a consructor func for this
    newComponentBase.otherSubcomponentTriggers = { subcomponentThatTriggersThis: triggerSubcomponent, componentCompositionAPI: { }};
    JSONUtils.setPropertyIfExists(subcomponentsToTrigger, subcomponentType, newComponentBase);
  }

  public static set(newComponentContainer: WorkshopComponent, newComponentParentLayerSubcomponent: SubcomponentProperties,
      newComponentBase: SubcomponentProperties, subcomponentType: number): void {
    const newComponentContainerBase = newComponentContainer.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    SubcomponentTriggers.setPropertyValues(newComponentBase, subcomponentType, newComponentContainerBase);
    SubcomponentTriggers.setPropertyValues(newComponentBase, subcomponentType, newComponentParentLayerSubcomponent);
  }

  // Only need to set one other subcomponent's subcomponentsToTrigger value to null as this subcomponent can only be triggered
  // by one other subcomponent
  // WORK1 - copy
  public static removeTriggerReferenceFromSubcomponentThatTriggersThis(triggerSubcomponent: SubcomponentProperties): void {
    const { subcomponentType, otherSubcomponentTriggers } = triggerSubcomponent;
    const { subcomponentThatTriggersThis } = otherSubcomponentTriggers || {};
    if (!subcomponentThatTriggersThis) return;
    subcomponentThatTriggersThis.otherSubcomponentTriggers.subcomponentsToTrigger[subcomponentType] = null;
  }

  private static setThisSubcomponentTriggerCss(baseSubcomponent: SubcomponentProperties, subcomponentThatTriggersThis: SubcomponentProperties,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES, isTriggered: boolean): void {
    const { componentCompositionAPI } = baseSubcomponent.otherSubcomponentTriggers || {};
    if (subcomponentThatTriggersThis && componentCompositionAPI && subcomponentThatTriggersThis.activeCssPseudoClass !== activeCssPseudoClass) {
      subcomponentThatTriggersThis.activeCssPseudoClass = activeCssPseudoClass;
      componentCompositionAPI.trigger = isTriggered;
    }
  }

  private static setOtherSubcomponentCss(otherSubcomponentProperties: SubcomponentProperties, activeCssPseudoClass: CSS_PSEUDO_CLASSES,
      isTriggered: boolean): void {
    const { componentCompositionAPI } = otherSubcomponentProperties.otherSubcomponentTriggers || {};
    if (componentCompositionAPI && !componentCompositionAPI.trigger && otherSubcomponentProperties.activeCssPseudoClass !== activeCssPseudoClass) {
      otherSubcomponentProperties.activeCssPseudoClass = activeCssPseudoClass;
      componentCompositionAPI.triggered = isTriggered;
    }
  }

  private static setOtherSubcomponentsCss(baseSubcomponent: SubcomponentProperties, activeCssPseudoClass: CSS_PSEUDO_CLASSES, isTriggered: boolean): void {
    const { subcomponentsToTrigger, subcomponentThatTriggersThis, componentCompositionAPI } = baseSubcomponent.otherSubcomponentTriggers || {};
    if (!componentCompositionAPI || componentCompositionAPI.triggered) return;
    CoreSubcomponentRefsUtils.getActiveRefKeys(subcomponentsToTrigger).forEach((subcomponentType) => {
      const otherSubcomponentProperties = subcomponentsToTrigger[subcomponentType];
      SubcomponentTriggers.setOtherSubcomponentCss(otherSubcomponentProperties, activeCssPseudoClass, isTriggered);
    });
    SubcomponentTriggers.setThisSubcomponentTriggerCss(baseSubcomponent, subcomponentThatTriggersThis, activeCssPseudoClass, isTriggered);
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

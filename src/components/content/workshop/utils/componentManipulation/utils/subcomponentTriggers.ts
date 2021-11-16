import { CompositionAPISubcomponentTriggerState } from '../../../../../../interfaces/compositionAPISubcomponentTriggerState';
import { SubcomponentTypeToPropertiesUtils } from '../../subcomponentTypeToProperties/subcomponentTypeToPropertiesUtils';
import { SubcomponentTypeToProperties } from '../../../../../../interfaces/subcomponentTypeToProperties';
import { OtherSubcomponentTriggers } from '../../../../../../interfaces/otherSubcomponentTriggers';
import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../generic/jsonUtils';

export class SubcomponentTriggers {

  private static createSubcomponentsToTriggerObject(subcomponentsToTrigger?: SUBCOMPONENT_TYPES[]): SubcomponentTypeToProperties {
    return (subcomponentsToTrigger || []).reduce((accummulator, currentValue) => Object.assign(accummulator, {[currentValue]: null}), {});
  }

  public static createOtherSubcomponentTriggersTemplate(subcomponentsToTrigger?: SUBCOMPONENT_TYPES[]): OtherSubcomponentTriggers {
    const otherSubcomponentTriggers: OtherSubcomponentTriggers = { componentCompositionAPI: {} };
    if (subcomponentsToTrigger) otherSubcomponentTriggers.subcomponentsToTrigger = SubcomponentTriggers.createSubcomponentsToTriggerObject(subcomponentsToTrigger);
    return otherSubcomponentTriggers;
  }

  private static setSubcomponentThatTriggersThis(newComponentBase: Subcomponent, triggerSubcomponent: Subcomponent): void {
    if (!newComponentBase.otherSubcomponentTriggers) {
      newComponentBase.otherSubcomponentTriggers = SubcomponentTriggers.createOtherSubcomponentTriggersTemplate();
    }
    newComponentBase.otherSubcomponentTriggers.subcomponentThatTriggersThis = triggerSubcomponent;
  }

  private static setPropertyValues(newComponentBase: Subcomponent, subcomponentType: number,
      triggerSubcomponent: Subcomponent): void {
    const { subcomponentsToTrigger } = triggerSubcomponent.otherSubcomponentTriggers || {};
    if (!subcomponentsToTrigger) return;
    SubcomponentTriggers.setSubcomponentThatTriggersThis(newComponentBase, triggerSubcomponent)
    JSONUtils.setPropertyIfExists(subcomponentsToTrigger, subcomponentType, newComponentBase);
  }

  public static set(containerComponent: WorkshopComponent, newComponentParentLayerSubcomponent: Subcomponent,
      newComponentBase: Subcomponent, subcomponentType: number): void {
    const newComponentContainerBase = containerComponent.baseSubcomponent;
    SubcomponentTriggers.setPropertyValues(newComponentBase, subcomponentType, newComponentContainerBase);
    SubcomponentTriggers.setPropertyValues(newComponentBase, subcomponentType, newComponentParentLayerSubcomponent);
  }

  // only need to set one other subcomponent's subcomponentsToTrigger value to null as this subcomponent can only be triggered
  // by one other subcomponent
  public static removeTriggerReferenceFromSubcomponentThatTriggersThis(triggerSubcomponent: Subcomponent): void {
    const { subcomponentType, otherSubcomponentTriggers } = triggerSubcomponent;
    const { subcomponentThatTriggersThis } = otherSubcomponentTriggers || {};
    if (!subcomponentThatTriggersThis) return;
    subcomponentThatTriggersThis.otherSubcomponentTriggers.subcomponentsToTrigger[subcomponentType] = null;
  }

  private static setThisSubcomponentTriggerCss(baseSubcomponent: Subcomponent, subcomponentThatTriggersThis: Subcomponent,
      activeCssPseudoClass: CSS_PSEUDO_CLASSES, isTriggered: boolean): void {
    const { componentCompositionAPI } = baseSubcomponent.otherSubcomponentTriggers || {};
    if (subcomponentThatTriggersThis && componentCompositionAPI && subcomponentThatTriggersThis.activeCssPseudoClass !== activeCssPseudoClass) {
      subcomponentThatTriggersThis.activeCssPseudoClass = activeCssPseudoClass;
      componentCompositionAPI.trigger = isTriggered;
    }
  }

  private static setOtherSubcomponentCss(otherSubcomponent: Subcomponent, activeCssPseudoClass: CSS_PSEUDO_CLASSES,
      isTriggered: boolean): void {
    const { componentCompositionAPI } = otherSubcomponent.otherSubcomponentTriggers || {};
    if (componentCompositionAPI && !componentCompositionAPI.trigger && otherSubcomponent.activeCssPseudoClass !== activeCssPseudoClass) {
      otherSubcomponent.activeCssPseudoClass = activeCssPseudoClass;
      componentCompositionAPI.triggered = isTriggered;
    }
  }

  private static setOtherSubcomponentsCss(baseSubcomponent: Subcomponent, activeCssPseudoClass: CSS_PSEUDO_CLASSES, isTriggered: boolean): void {
    const { subcomponentsToTrigger, subcomponentThatTriggersThis, componentCompositionAPI } = baseSubcomponent.otherSubcomponentTriggers || {};
    if (!componentCompositionAPI || componentCompositionAPI.triggered) return;
    SubcomponentTypeToPropertiesUtils.getTypesWithNonNullSubcomponents(subcomponentsToTrigger).forEach((subcomponentType) => {
      const otherSubcomponent = subcomponentsToTrigger[subcomponentType];
      SubcomponentTriggers.setOtherSubcomponentCss(otherSubcomponent, activeCssPseudoClass, isTriggered);
    });
    SubcomponentTriggers.setThisSubcomponentTriggerCss(baseSubcomponent, subcomponentThatTriggersThis, activeCssPseudoClass, isTriggered);
  }

  // subcomponents here are triggered slightly differently than the useSubcomponentPreviewHandlers file's triggerOtherSubcomponentsMouseEvents
  // method because there are no events fired and the customCss is augmented directly
  public static triggerOtherSubcomponentsCss(baseSubcomponent: Subcomponent, activeCssPseudoClass: CSS_PSEUDO_CLASSES,
      otherSubcomponentTriggerState: CompositionAPISubcomponentTriggerState): void {
    if (activeCssPseudoClass !== CSS_PSEUDO_CLASSES.DEFAULT) {
      SubcomponentTriggers.setOtherSubcomponentsCss(baseSubcomponent, activeCssPseudoClass, true);
      otherSubcomponentTriggerState.subcomponent = baseSubcomponent;
    } else if (otherSubcomponentTriggerState.subcomponent === baseSubcomponent) {
      SubcomponentTriggers.setOtherSubcomponentsCss(baseSubcomponent, activeCssPseudoClass, false);
      otherSubcomponentTriggerState.subcomponent = null;
    }
  }
}

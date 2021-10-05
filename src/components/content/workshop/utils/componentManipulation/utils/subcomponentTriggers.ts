import { CompositionAPISubcomponentTriggerState } from '../../../../../../interfaces/compositionAPISubcomponentTriggerState';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { OtherSubcomponentTriggers } from '../../../../../../interfaces/otherSubcomponentTriggers';
import { CoreSubcomponentRefsUtils } from '../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../../interfaces/coreSubcomponentRefs';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../generic/jsonUtils';

export class SubcomponentTriggers {

  private static createSubcomponentsToTriggerObject(subcomponentsToTrigger?: SUBCOMPONENT_TYPES[]): CoreSubcomponentRefs {
    return (subcomponentsToTrigger || []).reduce((accummulator, currentValue) => Object.assign(accummulator, {[currentValue]: null}), {});
  }

  public static createOtherSubcomponentTriggersTemplate(subcomponentsToTrigger?: SUBCOMPONENT_TYPES[]): OtherSubcomponentTriggers {
    const otherSubcomponentTriggers: OtherSubcomponentTriggers = { componentCompositionAPI: {} };
    if (subcomponentsToTrigger) otherSubcomponentTriggers.subcomponentsToTrigger = SubcomponentTriggers.createSubcomponentsToTriggerObject(subcomponentsToTrigger);
    return otherSubcomponentTriggers;
  }

  private static setSubcomponentThatTriggersThis(newComponentBase: SubcomponentProperties, triggerSubcomponent: SubcomponentProperties): void {
    if (!newComponentBase.otherSubcomponentTriggers) {
      newComponentBase.otherSubcomponentTriggers = SubcomponentTriggers.createOtherSubcomponentTriggersTemplate();
    }
    newComponentBase.otherSubcomponentTriggers.subcomponentThatTriggersThis = triggerSubcomponent;
  }

  private static setPropertyValues(newComponentBase: SubcomponentProperties, subcomponentType: number,
      triggerSubcomponent: SubcomponentProperties): void {
    const { subcomponentsToTrigger } = triggerSubcomponent.otherSubcomponentTriggers || {};
    if (!subcomponentsToTrigger) return;
    SubcomponentTriggers.setSubcomponentThatTriggersThis(newComponentBase, triggerSubcomponent)
    JSONUtils.setPropertyIfExists(subcomponentsToTrigger, subcomponentType, newComponentBase);
  }

  public static set(newComponentContainer: WorkshopComponent, newComponentParentLayerSubcomponent: SubcomponentProperties,
      newComponentBase: SubcomponentProperties, subcomponentType: number): void {
    const newComponentContainerBase = newComponentContainer.baseSubcomponent;
    SubcomponentTriggers.setPropertyValues(newComponentBase, subcomponentType, newComponentContainerBase);
    SubcomponentTriggers.setPropertyValues(newComponentBase, subcomponentType, newComponentParentLayerSubcomponent);
  }

  // only need to set one other subcomponent's subcomponentsToTrigger value to null as this subcomponent can only be triggered
  // by one other subcomponent
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

import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

interface BaseComponents {
  activeBaseComponent: WorkshopComponent;
  masterComponent: WorkshopComponent;
}

export class ActiveComponentUtils {

  private static getActiveSubcomponent(parentComponent: WorkshopComponent): SubcomponentProperties {
    const { subcomponents, activeSubcomponentName, coreSubcomponentRefs } = parentComponent;
    // when working with nested components inside nested components (e.g. card component's nested button arrow) - the parent component is the button
    // which no longer has its subcomponents - hence its base can still be referenced via coreSubcomponentRefs
    return subcomponents[activeSubcomponentName] || coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
  }

  // WORK1: rename to activeTopParentComponent
  public static getBaseComponents(parentComponent: WorkshopComponent): BaseComponents {
    const parentComponentBase = ActiveComponentUtils.getActiveSubcomponent(parentComponent).seedComponent.ref;
    const activeBaseComponent = parentComponentBase.parentComponent || parentComponentBase;
    // this serves as a way to get to the master subcomponents, dropdown properties
    const masterComponent = parentComponent.masterComponentRef;
    return { activeBaseComponent, masterComponent };
  }

  public static getActiveNestedComponentParent(parentComponent: WorkshopComponent): WorkshopComponent {
    const activeSubcomponent = ActiveComponentUtils.getActiveSubcomponent(parentComponent);
    const activeNestedComponent = activeSubcomponent.seedComponent.ref;
    return activeNestedComponent.type === COMPONENT_TYPES.LAYER ? activeNestedComponent.parentComponent : activeNestedComponent;
  }
}

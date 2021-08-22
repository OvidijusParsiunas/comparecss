import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

interface BaseComponents {
  activeBaseComponent: WorkshopComponent;
  coreBaseComponent: WorkshopComponent;
}

export class ActiveComponentUtils {

  private static getActiveSubcomponent(parentComponent: WorkshopComponent): SubcomponentProperties {
    const { subcomponents, activeSubcomponentName, coreSubcomponentRefs } = parentComponent;
    // when working with nested components inside nested components (e.g. card component's nested button arrow) - the parent component is the button
    // which no longer has its subcomponents - hence its base can still be referenced via coreSubcomponentRefs
    return subcomponents[activeSubcomponentName] || coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
  }

  private static getActiveBaseComponent(parentComponent: WorkshopComponent): WorkshopComponent {
    const activeSubcomponent = ActiveComponentUtils.getActiveSubcomponent(parentComponent);
    // if the parentBaseComponentRef property has not yet been set, reference the current parent component as the base
    return activeSubcomponent.parentBaseComponentRef || parentComponent;
  }

  // WORK1: rename to activeTopParentComponent
  public static getBaseComponents(parentComponent: WorkshopComponent): BaseComponents {
    const activeBaseComponent = ActiveComponentUtils.getActiveBaseComponent(parentComponent);
    const coreBaseComponent = activeBaseComponent.coreBaseComponent || activeBaseComponent;
    return { activeBaseComponent, coreBaseComponent };
  }

  public static getActiveNestedComponentParent(parentComponent: WorkshopComponent): WorkshopComponent {
    const activeSubcomponent = ActiveComponentUtils.getActiveSubcomponent(parentComponent);
    const activeNestedComponent = activeSubcomponent.nestedComponent.ref;
    return activeNestedComponent.type === COMPONENT_TYPES.LAYER ? activeNestedComponent.nestedComponentParent : activeNestedComponent;
  }
}

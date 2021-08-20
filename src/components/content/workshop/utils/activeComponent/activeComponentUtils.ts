import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

export class ActiveComponentUtils {

  // WORK1: rename to activeTopParentComponent
  public static getActiveBaseComponent(parentComponent: WorkshopComponent): WorkshopComponent {
    // WORK1 - confirm if this is needed
    const baseSubcomponent = parentComponent.subcomponents[parentComponent.activeSubcomponentName] || parentComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    // if the parentBaseComponentRef property has not yet been set, reference the current parent component as the base
    return baseSubcomponent.parentBaseComponentRef || parentComponent;
  }

  public static getActiveNestedComponentParent(parentComponent: WorkshopComponent): WorkshopComponent {
    // WORK1 - confirm if this is needed
    const activeNestedComponent = (parentComponent.subcomponents[parentComponent.activeSubcomponentName] || parentComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]).nestedComponent.ref;
    return activeNestedComponent.type === COMPONENT_TYPES.LAYER ? activeNestedComponent.nestedComponentParent : activeNestedComponent;
  }
}

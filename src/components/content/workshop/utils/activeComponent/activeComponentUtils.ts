import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

export class ActiveComponentUtils {

  // WORK1: rename to activeTopParentComponent
  public static getActiveBaseComponent(parentComponent: WorkshopComponent): WorkshopComponent {
    // if the parentBaseComponentRef property has not yet been set, reference the current parent component as the base
    return parentComponent.subcomponents[parentComponent.activeSubcomponentName].parentBaseComponentRef || parentComponent;
  }

  public static getActiveNestedComponentParent(parentComponent: WorkshopComponent): WorkshopComponent {
    const activeNestedComponent = parentComponent.subcomponents[parentComponent.activeSubcomponentName].nestedComponent.ref;
    return activeNestedComponent.type === COMPONENT_TYPES.LAYER ? activeNestedComponent.nestedComponentParent : activeNestedComponent;
  }
}

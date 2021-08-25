import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

interface ActiveComponentParents {
  activeComponentParent: WorkshopComponent;
  masterComponent: WorkshopComponent;
}

export class ActiveComponentUtils {

  // parentComponent around the project should perhaps be renamed to component
  public static getComponentParents(component: WorkshopComponent): ActiveComponentParents {
    const activeComponentParent = component.parentComponent || component;
    const masterComponent = component.masterComponentRef;
    return { activeComponentParent, masterComponent };
  }

  private static getActiveSubcomponent(parentComponent: WorkshopComponent): SubcomponentProperties {
    const { subcomponents, activeSubcomponentName, coreSubcomponentRefs } = parentComponent;
    // when working with child components inside child components (e.g. card component's child button arrow) - the parent component is the button
    // which no longer has its subcomponents - hence its base can still be referenced via coreSubcomponentRefs
    return subcomponents[activeSubcomponentName] || coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
  }

  // WORK1: may not be needed
  public static getActiveSeedComponentParent(parentComponent: WorkshopComponent): WorkshopComponent {
    const activeSubcomponent = ActiveComponentUtils.getActiveSubcomponent(parentComponent);
    const activeChildComponent = activeSubcomponent.seedComponent.ref;
    return activeChildComponent.type === COMPONENT_TYPES.LAYER ? activeChildComponent.parentComponent : activeChildComponent;
  }
}

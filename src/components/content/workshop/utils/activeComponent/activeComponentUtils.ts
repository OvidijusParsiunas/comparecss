import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

interface ActiveHighLevelComponents {
  activeLinkedComponent: WorkshopComponent;
  masterComponent: WorkshopComponent;
}

export class ActiveComponentUtils {

  private static getActiveSubcomponent(parentComponent: WorkshopComponent): SubcomponentProperties {
    const { subcomponents, activeSubcomponentName, coreSubcomponentRefs } = parentComponent;
    // when working with child components inside child components (e.g. card component's child button arrow) - the parent component is the button
    // which no longer has its subcomponents - hence its base can still be referenced via coreSubcomponentRefs
    return subcomponents[activeSubcomponentName] || coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
  }

  public static getActiveHighLevelComponents(parentComponent: WorkshopComponent): ActiveHighLevelComponents {
    const parentComponentBase = ActiveComponentUtils.getActiveSubcomponent(parentComponent).seedComponent.ref;
    const activeLinkedComponent = parentComponentBase.parentComponent || parentComponentBase;
    // this serves as a way to get to the master subcomponents, dropdown properties
    const masterComponent = parentComponent.masterComponentRef;
    return { activeLinkedComponent, masterComponent };
  }

  public static getActiveChildComponentParent(parentComponent: WorkshopComponent): WorkshopComponent {
    const activeSubcomponent = ActiveComponentUtils.getActiveSubcomponent(parentComponent);
    const activeChildComponent = activeSubcomponent.seedComponent.ref;
    return activeChildComponent.type === COMPONENT_TYPES.LAYER ? activeChildComponent.parentComponent : activeChildComponent;
  }
}

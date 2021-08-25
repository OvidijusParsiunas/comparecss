import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

interface ActiveComponentParents {
  containerComponent: WorkshopComponent;
  masterComponent: WorkshopComponent;
}

export class ActiveComponentUtils {

  public static getHigherLevelComponents(component: WorkshopComponent): ActiveComponentParents {
    const containerComponent = component.containerComponent || component;
    const { masterComponent } = component;
    return { containerComponent, masterComponent };
  }

  public static getActiveContainerComponent(parentComponent: WorkshopComponent): WorkshopComponent {
    const { masterComponent: { subcomponents }, activeSubcomponentName } = parentComponent;
    const activeComponent = subcomponents[activeSubcomponentName].seedComponent.ref;
    return activeComponent.type === COMPONENT_TYPES.LAYER ? activeComponent.containerComponent : activeComponent;
  }
}

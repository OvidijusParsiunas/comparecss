import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

interface HigherLevelComponents {
  higherComponentContainer: WorkshopComponent;
  masterComponent: WorkshopComponent;
}

export class ActiveComponentUtils {

  public static getHigherLevelComponents(containerComponent: WorkshopComponent): HigherLevelComponents {
    const higherComponentContainer = containerComponent.containerComponent || containerComponent;
    const { masterComponent } = containerComponent;
    return { higherComponentContainer, masterComponent };
  }

  public static getActiveContainerComponent(concreteComponent: WorkshopComponent): WorkshopComponent {
    const { masterComponent: { subcomponents }, activeSubcomponentName } = concreteComponent;
    const activeComponent = subcomponents[activeSubcomponentName].seedComponent.ref;
    return activeComponent.type === COMPONENT_TYPES.LAYER ? activeComponent.containerComponent : activeComponent;
  }
}

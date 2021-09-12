import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

interface HigherLevelComponents {
  higherComponentContainer: WorkshopComponent;
  higherActiveComponentContainer: WorkshopComponent;
  masterComponent: WorkshopComponent;
}

export class ActiveComponentUtils {

  public static getActiveContainerComponent(containerComponent: WorkshopComponent): WorkshopComponent {
    const { subcomponents, activeSubcomponentName } = containerComponent.masterComponent;
    const activeComponent = subcomponents[activeSubcomponentName].seedComponent;
    return activeComponent.type === COMPONENT_TYPES.LAYER ? activeComponent.containerComponent : activeComponent;
  }

  public static getHigherLevelComponents(containerComponent: WorkshopComponent): HigherLevelComponents {
    const higherComponentContainer = containerComponent.containerComponent || containerComponent;
    const activeContainerComponent = ActiveComponentUtils.getActiveContainerComponent(containerComponent);
    const higherActiveComponentContainer = activeContainerComponent.containerComponent || activeContainerComponent;
    const { masterComponent } = containerComponent;
    return { higherComponentContainer, higherActiveComponentContainer, masterComponent };
  }
}

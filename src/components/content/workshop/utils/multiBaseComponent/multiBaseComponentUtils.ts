import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';

export class MultiBaseComponentUtils {

  public static getCurrentlyActiveBaseComponent(parentComponent: WorkshopComponent): WorkshopComponent {
    // if the parentBaseComponentRef property has not yet been set, reference the current parent component as the base
    return parentComponent.subcomponents[parentComponent.activeSubcomponentName].parentBaseComponentRef || parentComponent;
  }
}

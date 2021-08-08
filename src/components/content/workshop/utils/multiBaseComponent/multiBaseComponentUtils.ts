import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';

export class MultiBaseComponentUtils {

  public static getCurrentlyActiveBaseComponent(parentComponent: WorkshopComponent): WorkshopComponent {
    return parentComponent.subcomponents[parentComponent.activeSubcomponentName].parentAuxiliaryComponent || parentComponent;
  }
}

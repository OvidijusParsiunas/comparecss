import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';

export class MultiBaseComponentUtils {

  public static getCurrentlyActiveBaseComponent(parentComponent: WorkshopComponent): WorkshopComponent {
    return parentComponent.auxiliaryComponent?.coreSubcomponentNames.base === parentComponent.activeSubcomponentName
      ? parentComponent.auxiliaryComponent : parentComponent;
  }
}

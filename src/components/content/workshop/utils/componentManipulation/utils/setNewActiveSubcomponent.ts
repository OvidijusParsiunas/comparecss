import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { PaddingComponentUtils } from './paddingComponentUtils';

export class SetNewActiveSubcomponent {

  public static set(component: WorkshopComponent, newActiveSubcomponentName: string, isDefault = false): void {
    component.activeSubcomponentName = newActiveSubcomponentName;
    PaddingComponentUtils.setActiveSubcomponent(component, newActiveSubcomponentName, isDefault);
  }
}

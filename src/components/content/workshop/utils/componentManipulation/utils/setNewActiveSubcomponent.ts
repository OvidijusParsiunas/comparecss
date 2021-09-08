import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class SetNewActiveSubcomponent {

  public static set(component: WorkshopComponent, newActiveSubcomponentName: string, isDefault = false): void {
    component.activeSubcomponentName = newActiveSubcomponentName;
    const paddingComponentLink = component.paddingComponent || component.paddingComponentChild;
    if (paddingComponentLink) { 
      paddingComponentLink.activeSubcomponentName = isDefault ? paddingComponentLink.defaultSubcomponentName : newActiveSubcomponentName;
    }
  }
}

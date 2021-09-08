import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class PaddingComponentUtils {
  
  public static setActiveSubcomponent(component: WorkshopComponent, newActiveSubcomponentName: string, isDefault = false): void {
    const paddingComponentLink = component.paddingComponent || component.paddingComponentChild;
    if (paddingComponentLink) { 
      paddingComponentLink.activeSubcomponentName = isDefault ? paddingComponentLink.defaultSubcomponentName : newActiveSubcomponentName;
    }
  }

  public static overwriteSubcomponentsRef(component: WorkshopComponent): void {
    if (component.paddingComponent) {
      component.paddingComponent.subcomponents = component.subcomponents;
    }
  }
}

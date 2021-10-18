import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class PropertyReferenceSharingFuncsUtils {

  public static executePropertyReferenceSharingFuns(overwriteDefaultProperties: boolean, ...components: WorkshopComponent[]): void {
    components.forEach((component) => {
      component.newChildComponents.propertyOverwritables?.propertyReferenceSharingFuncs
        ?.forEach((executable) => executable(component, overwriteDefaultProperties));
    });
  }
}

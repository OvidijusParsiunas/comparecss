import { ReferenceSharingFuncType } from '../../../../../../../interfaces/childComponentHandlers';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class PropertyReferenceSharingFuncsUtils {

  public static executePropertyReferenceSharingFuncs(overwriteDefaultProperties: boolean, sharingFuncType: keyof ReferenceSharingFuncType,
      ...components: WorkshopComponent[]): void {
    components.forEach((component) => {
      component.childComponentHandlers.onAddOverwritables?.propertyReferenceSharingFuncs?.[sharingFuncType]
        ?.forEach((executable) => executable(component, overwriteDefaultProperties));
    });
  }
}

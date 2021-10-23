import { ReferenceSharingFuncType } from '../../../../../../../interfaces/newChildComponents';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class PropertyReferenceSharingFuncsUtils {

  public static executePropertyReferenceSharingFuncs(overwriteDefaultProperties: boolean, sharingFuncType: keyof ReferenceSharingFuncType,
      ...components: WorkshopComponent[]): void {
    components.forEach((component) => {
      component.newChildComponents.propertyOverwritables?.propertyReferenceSharingFuncs?.[sharingFuncType]
        ?.forEach((executable) => executable(component, overwriteDefaultProperties));
    });
  }
}

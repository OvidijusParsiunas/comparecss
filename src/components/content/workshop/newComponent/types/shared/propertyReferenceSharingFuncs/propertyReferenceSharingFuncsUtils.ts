import { ReferenceSharingFunType } from '../../../../../../../interfaces/newChildComponents';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class PropertyReferenceSharingFuncsUtils {

  public static executePropertyReferenceSharingFuns(overwriteDefaultProperties: boolean, sharingFuncType: keyof ReferenceSharingFunType,
      ...components: WorkshopComponent[]): void {
    components.forEach((component) => {
      component.newChildComponents.propertyOverwritables?.propertyReferenceSharingFuncsOnComponentChange?.[sharingFuncType]
        ?.forEach((executable) => executable(component, overwriteDefaultProperties));
    });
  }
}

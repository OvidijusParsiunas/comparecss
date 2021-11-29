import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { TargetDetails } from '../../../../../interfaces/componentTraversal';

export default class ComponentTraversalUtils {

  public static generateTargetDetails(masterComponent: WorkshopComponent, targetSubcomponentName: string): TargetDetails {
    return {
      targetSubcomponentName,
      targetDropdownItemName: masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[targetSubcomponentName],
      masterComponent,
      targetComponent: masterComponent.subcomponents[targetSubcomponentName].seedComponent,
    };
  }
}

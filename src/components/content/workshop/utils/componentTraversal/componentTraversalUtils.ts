import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { TargetDetails } from '../../../../../interfaces/componentTraversal';

export default class ComponentTraversalUtils {

  public static generateTargetDetails(containerComponent: WorkshopComponent, targetSubcomponentName: string): TargetDetails {
    return {
      targetSubcomponentName,
      targetDropdownItemName: containerComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[targetSubcomponentName],
      containerComponent,
      masterComponent: containerComponent.masterComponent,
      targetSubcomponentProperties: containerComponent.subcomponents[targetSubcomponentName],
    };
  }
}

import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { ChangeOrderTargetDetails } from '../../../../../../interfaces/changeOrderTargetDetails';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class ChangeLayerOrderShared {
  
  protected static generateTargetSubcomponent(direction: SUBCOMPONENT_ORDER_DIRECTIONS, parentComponent: WorkshopComponent): ChangeOrderTargetDetails {
    return {
      targetSubcomponentName: parentComponent.activeSubcomponentName,
      targetDropdownOptionName: parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentComponent.activeSubcomponentName],
      parentComponent,
      targetSubcomponentProperties: parentComponent.subcomponents[parentComponent.activeSubcomponentName],
      direction,
    };
  }
}

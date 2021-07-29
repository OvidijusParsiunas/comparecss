import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { RemoveNestedComponent } from './removeNestedComponent';

export class RemoveTemporaryAddPreviewComponent extends RemoveNestedComponent {

  public static remove(parentComponent: WorkshopComponent): void {
    const targetDetails: TargetDetails = ComponentTraversalUtils.generateTargetDetails(parentComponent, NESTED_COMPONENTS_BASE_NAMES.TEMPORARY);
    ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      parentComponent.componentPreviewStructure,
      RemoveTemporaryAddPreviewComponent.removeNestedComponentInPreviewStructureIfFound.bind(targetDetails));
    Object.keys(targetDetails.targetSubcomponentProperties?.nestedComponent?.ref?.subcomponents || {}).forEach((keyName) => {
      delete parentComponent.subcomponents[keyName];
    });
  }
}

import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../consts/baseSubcomponentNames.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { NestedComponentsInLayer } from '../../../../../../interfaces/nestedComponentsInLayer';
import { MultiBaseComponentUtils } from '../../multiBaseComponent/multiBaseComponentUtils';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { RemoveNestedComponent } from './removeNestedComponent';

export class RemoveTemporaryAddPreviewComponent extends RemoveNestedComponent {

  // temp auxiliary subcomponents are not merged into the parentComponentBase so removing it just from aux base is sufficient
  private static removeTargetNestedComponent(activeBaseComponent: WorkshopComponent, targetDetails: TargetDetails, subcomponents: Subcomponents): void {
    ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      activeBaseComponent.componentPreviewStructure,
      RemoveTemporaryAddPreviewComponent.removeNestedComponentInPreviewStructureIfFound.bind(targetDetails));
    Object.keys(subcomponents).forEach((subcomponentName) => delete activeBaseComponent.subcomponents[subcomponentName]);
  }

  // temp auxiliary subcomponents are not merged into the parentComponentBase so removing it just from aux base is sufficient
  // the reason why we need to fully remove the layer's nested component properties is because their addition has altered the parent dropdown structure
  // (nested components within temp nested components (text in button component) usually do not affect dropdown structure as they don't use parent
  private static removeNestedComponentsInLayer(activeBaseComponent: WorkshopComponent, nestedComponentsInLayer: NestedComponentsInLayer): void {
    nestedComponentsInLayer?.list.forEach((subcomponentName) => RemoveNestedComponent.remove(activeBaseComponent, subcomponentName));
  }

  public static remove(parentComponent: WorkshopComponent): void {
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const targetDetails: TargetDetails = ComponentTraversalUtils.generateTargetDetails(activeBaseComponent, NESTED_COMPONENTS_BASE_NAMES.TEMPORARY);
    const nestedComponentParentRef = targetDetails.targetSubcomponentProperties?.nestedComponent?.ref;
    if (!nestedComponentParentRef) return;
    const { subcomponents, nestedComponentsInLayer } = nestedComponentParentRef;
    RemoveTemporaryAddPreviewComponent.removeNestedComponentsInLayer(activeBaseComponent, nestedComponentsInLayer);
    RemoveTemporaryAddPreviewComponent.removeTargetNestedComponent(activeBaseComponent, targetDetails, subcomponents);
  }
}

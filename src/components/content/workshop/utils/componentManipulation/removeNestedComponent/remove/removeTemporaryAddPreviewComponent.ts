import { NestedComponentsInLayer } from '../../../../../../../interfaces/nestedComponentsLockedToLayer';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { RemoveAnyNestedComponent } from './removeAnyNestedComponent';

export class RemoveTemporaryAddPreviewComponent extends RemoveAnyNestedComponent {

  // all subcomponents are stored in the core activeComponent, however the preview structure for an auxiliary component is within its component
  private static removeTargetNestedComponent(activeComponent: WorkshopComponent, targetDetails: TargetDetails, subcomponents: Subcomponents): void {
    Object.keys(subcomponents).forEach((subcomponentName) => delete activeComponent.subcomponents[subcomponentName]);
    const activeBaseComponent = ActiveComponentUtils.getActiveBaseComponent(activeComponent);
    ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      activeBaseComponent.componentPreviewStructure,
      RemoveTemporaryAddPreviewComponent.removeNestedComponentInPreviewStructureIfFound.bind(targetDetails));
  }

  // the reason why we need to fully remove the layer's nested component properties is because their addition alters the parent dropdown structure
  // (nested components within other temp nested components (text in button component) do not affect dropdown structure as they don't use parent)
  private static removeNestedComponentsInLayer(activeComponent: WorkshopComponent, nestedComponentsLockedToLayer: NestedComponentsInLayer): void {
    nestedComponentsLockedToLayer?.list.forEach((subcomponent) => RemoveAnyNestedComponent.remove(activeComponent, subcomponent.name));
  }

  public static remove(activeComponent: WorkshopComponent): void {
    const targetDetails: TargetDetails = ComponentTraversalUtils.generateTargetDetails(activeComponent, TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY);
    const nestedComponentParentRef = targetDetails.targetSubcomponentProperties?.nestedComponent?.ref;
    if (!nestedComponentParentRef) return;
    const { nestedComponentsLockedToLayer, subcomponents } = nestedComponentParentRef;
    RemoveTemporaryAddPreviewComponent.removeNestedComponentsInLayer(activeComponent, nestedComponentsLockedToLayer);
    RemoveTemporaryAddPreviewComponent.removeTargetNestedComponent(activeComponent, targetDetails, subcomponents);
  }
}

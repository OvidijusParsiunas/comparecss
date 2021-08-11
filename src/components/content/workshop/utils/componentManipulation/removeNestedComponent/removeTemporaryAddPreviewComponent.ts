import { NestedComponentsInLayer } from '../../../../../../interfaces/nestedComponentsLockedToLayer';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../consts/baseSubcomponentNames.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { MultiBaseComponentUtils } from '../../multiBaseComponent/multiBaseComponentUtils';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { RemoveNestedComponent } from './removeNestedComponent';

export class RemoveTemporaryAddPreviewComponent extends RemoveNestedComponent {

  // all subcomponents are stored in the core parentComponent, however the preview structure for an auxiliary component is within its component
  private static removeTargetNestedComponent(parentComponent: WorkshopComponent, targetDetails: TargetDetails, subcomponents: Subcomponents): void {
    Object.keys(subcomponents).forEach((subcomponentName) => delete parentComponent.subcomponents[subcomponentName]);
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      activeBaseComponent.componentPreviewStructure,
      RemoveTemporaryAddPreviewComponent.removeNestedComponentInPreviewStructureIfFound.bind(targetDetails));
  }

  // the reason why we need to fully remove the layer's nested component properties is because their addition alters the parent dropdown structure
  // (nested components within other temp nested components (text in button component) do not affect dropdown structure as they don't use parent)
  private static removeNestedComponentsInLayer(parentComponent: WorkshopComponent, nestedComponentsLockedToLayer: NestedComponentsInLayer): void {
    nestedComponentsLockedToLayer?.list.forEach((subcomponent) => RemoveNestedComponent.remove(parentComponent, subcomponent.name));
  }

  public static remove(parentComponent: WorkshopComponent): void {
    const targetDetails: TargetDetails = ComponentTraversalUtils.generateTargetDetails(parentComponent, TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY);
    const nestedComponentParentRef = targetDetails.targetSubcomponentProperties?.nestedComponent?.ref;
    if (!nestedComponentParentRef) return;
    const { nestedComponentsLockedToLayer, subcomponents } = nestedComponentParentRef;
    RemoveTemporaryAddPreviewComponent.removeNestedComponentsInLayer(parentComponent, nestedComponentsLockedToLayer);
    RemoveTemporaryAddPreviewComponent.removeTargetNestedComponent(parentComponent, targetDetails, subcomponents);
  }
}

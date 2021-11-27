import { TraverseComponentViaPreviewStructureParentFirst } from '../../../componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { RemoveAnyChildComponent } from './removeAnyChildComponent';

export class RemoveTemporaryAddPreviewComponent extends RemoveAnyChildComponent {

  // all subcomponents are stored in the activeComponent, however the preview structure for an auxiliary component is within its component
  private static removeTargetChildComponent(activeComponent: WorkshopComponent, targetDetails: TargetDetails, subcomponents: Subcomponents): void {
    Object.keys(subcomponents).forEach((subcomponentName) => delete activeComponent.subcomponents[subcomponentName]);
    const { higherComponentContainer } = ActiveComponentUtils.getHigherLevelComponents(activeComponent);
    TraverseComponentViaPreviewStructureParentFirst.traverse(
      RemoveTemporaryAddPreviewComponent.removeChildComponentInPreviewStructureIfFound.bind(targetDetails), higherComponentContainer);
  }

  // the reason why we need to fully remove the layer's child component properties is because their addition alters the parent dropdown structure
  // (child components within other temp child components (text in button component) do not affect dropdown structure as they don't use parent)
  private static removeChildComponentsInLayer(activeComponent: WorkshopComponent, childComponentsLockedToThis: WorkshopComponent[]): void {
    childComponentsLockedToThis?.forEach((component) => RemoveAnyChildComponent.remove(activeComponent, component.baseSubcomponent.name));
  }

  public static remove(activeComponent: WorkshopComponent): void {
    if (!activeComponent.subcomponents[TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY]) return;
    const targetDetails: TargetDetails = ComponentTraversalUtils.generateTargetDetails(activeComponent, TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY);
    const { childComponentsLockedToThis, subcomponents } = targetDetails.targetComponent;
    RemoveTemporaryAddPreviewComponent.removeChildComponentsInLayer(activeComponent, childComponentsLockedToThis);
    RemoveTemporaryAddPreviewComponent.removeTargetChildComponent(activeComponent, targetDetails, subcomponents);
  }
}

import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { SelectedChildComponentUtil } from '../../../../utils/componentManipulation/selectedChildComponent/selectedChildComponentUtil';
import { ComponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../../interfaces/componentTraversal';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class SelectButtonUtils {

  private static traversalCallback(traversalState: ComponentPreviewTraversalState): PreviewTraversalResult {
    const isCurrentlySelected = this as any as boolean;
    const { child } = traversalState.component.baseSubcomponent.customStaticFeatures.selectComponent || {};
    if (child) child.isSelected = isCurrentlySelected;
    return { stopTraversal: false };
  }

  private static selectNewButton(newButton: WorkshopComponent): void {
    TraverseComponentViaPreviewStructureParentFirst.traverse(SelectButtonUtils.traversalCallback.bind(true), newButton);
  }

  private static unselectCurrentButton(selectedChildComponent: WorkshopComponent): void {
    TraverseComponentViaPreviewStructureParentFirst.traverse(SelectButtonUtils.traversalCallback.bind(false),
      selectedChildComponent.baseSubcomponent.seedComponent);
  }

  private static setNewSelectedComponentOnButtonGroup(newButton: WorkshopComponent): void {
    const selectedChildComponentContainer = SelectedChildComponentUtil.getChildContainerSelectComponentObj(newButton);
    if (selectedChildComponentContainer.selectedComponent) SelectButtonUtils.unselectCurrentButton(selectedChildComponentContainer.selectedComponent);
    selectedChildComponentContainer.selectedComponent = newButton;
  }

  public static select(buttonBaseSubcomponent: Subcomponent): void {
    SelectButtonUtils.setNewSelectedComponentOnButtonGroup(buttonBaseSubcomponent.seedComponent);
    SelectButtonUtils.selectNewButton(buttonBaseSubcomponent.seedComponent);
  }
}

import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { ComponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../../interfaces/componentTraversal';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class SelectButtonUtils {

  private static traversalCallback(traversalState: ComponentPreviewTraversalState): PreviewTraversalResult {
    const isCurrentlySelected = this as any as boolean;
    traversalState.component.baseSubcomponent.customStaticFeatures.isCurrentlySelected = isCurrentlySelected;
    return { stopTraversal: false };
  }

  private static selectNewButton(newButton: WorkshopComponent): void {
    TraverseComponentViaPreviewStructureParentFirst.traverse(SelectButtonUtils.traversalCallback.bind(true), newButton);
  }

  private static unselectCurrentButton(selectedChildComponent: WorkshopComponent): void {
    TraverseComponentViaPreviewStructureParentFirst.traverse(SelectButtonUtils.traversalCallback.bind(false),
      selectedChildComponent.baseSubcomponent.seedComponent);
  }

  private static setNewSelectedComponentOnButtonGroup(buttonBaseSubcomponent: Subcomponent): void {
    const { customStaticFeatures } = buttonBaseSubcomponent.seedComponent.containerComponent.baseSubcomponent;
    if (customStaticFeatures.selectedChildComponent) SelectButtonUtils.unselectCurrentButton(customStaticFeatures.selectedChildComponent);
    customStaticFeatures.selectedChildComponent = buttonBaseSubcomponent.seedComponent;
  }

  public static select(buttonBaseSubcomponent: Subcomponent): void {
    SelectButtonUtils.setNewSelectedComponentOnButtonGroup(buttonBaseSubcomponent);
    SelectButtonUtils.selectNewButton(buttonBaseSubcomponent.seedComponent);
  }
}

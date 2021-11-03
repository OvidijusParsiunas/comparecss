import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SubcomponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';

export class CleanSyncChildComponentMode {
  
  private static resetOriginalCss(subcomponentProperties: SubcomponentProperties): void {
    if (!subcomponentProperties.tempOriginalCustomProperties) return;
    Object.assign(subcomponentProperties.customCss, subcomponentProperties.tempOriginalCustomProperties.customCss);
    Object.assign(subcomponentProperties.customFeatures, subcomponentProperties.tempOriginalCustomProperties.customFeatures);
  }

  private static resetSubcomponentProperties(activeComponentTraversal: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const resetSubcomponentProperties = this as any as boolean;
    const activeSubcomponent = activeComponentTraversal.subcomponentProperties;
    if (resetSubcomponentProperties) CleanSyncChildComponentMode.resetOriginalCss(activeSubcomponent);
    delete activeSubcomponent.tempOriginalCustomProperties;
    return activeComponentTraversal;
  }

  public static cleanComponent(currentlySelectedComponent: WorkshopComponent, resetSubcomponentProperties = true): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentViaPreviewStructureParentFirst.traverse(
      CleanSyncChildComponentMode.resetSubcomponentProperties.bind(resetSubcomponentProperties), activeComponent);
  }
  
  public static deleteLastSelectedComponentToSync(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}

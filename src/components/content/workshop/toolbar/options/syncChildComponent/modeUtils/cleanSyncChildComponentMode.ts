import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { SiblingComponentState } from '../../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { SubcomponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class CleanSyncChildComponentMode {

  // WORK 2 - should this work
  private static removeSiblingComponentPropertiesThatWereMissing(activeComponent: WorkshopComponent): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(activeComponent);
    if (!siblingComponentTypes) return;
    Object.keys(siblingComponentTypes).forEach((subcomponentType) => {
      const subcomponent = (siblingComponentTypes[subcomponentType] as SiblingComponentState).customDynamicProperties;
      if (subcomponent.tempOriginalCustomProperties) {
        Object.assign(subcomponent.customCss, subcomponent.tempOriginalCustomProperties.customCss);
        Object.assign(subcomponent.customFeatures, subcomponent.tempOriginalCustomProperties.customFeatures);
      }
    });
  }

  private static resetOriginalCss(subcomponent: Subcomponent): void {
    if (!subcomponent.tempOriginalCustomProperties) return;
    Object.assign(subcomponent.customCss, subcomponent.tempOriginalCustomProperties.customCss);
    Object.assign(subcomponent.customFeatures, subcomponent.tempOriginalCustomProperties.customFeatures);
  }

  private static resetSubcomponent(activeComponentTraversal: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const resetSubcomponent = this as any as boolean;
    const activeSubcomponent = activeComponentTraversal.subcomponent;
    if (resetSubcomponent) {
      CleanSyncChildComponentMode.resetOriginalCss(activeSubcomponent);
      activeSubcomponent.seedComponent.sync.temporarySyncExecutables?.off?.(activeSubcomponent.seedComponent);
    }
    delete activeSubcomponent.tempOriginalCustomProperties;
    return activeComponentTraversal;
  }

  public static cleanComponent(currentlySelectedComponent: WorkshopComponent, resetSubcomponent = true): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentViaPreviewStructureParentFirst.traverse(
      CleanSyncChildComponentMode.resetSubcomponent.bind(resetSubcomponent), activeComponent);
    CleanSyncChildComponentMode.removeSiblingComponentPropertiesThatWereMissing(activeComponent);
  }
  
  public static deleteLastSelectedComponentToSync(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}

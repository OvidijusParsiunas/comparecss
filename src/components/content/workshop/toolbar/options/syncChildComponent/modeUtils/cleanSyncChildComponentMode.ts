import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SiblingComponentState } from '../../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { SubcomponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';

export class CleanSyncChildComponentMode {

  // WORK 2 - should this work
  private static removeSiblingComponentPropertiesThatWereMissing(activeComponent: WorkshopComponent): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(activeComponent);
    if (!siblingComponentTypes) return;
    Object.keys(siblingComponentTypes).forEach((subcomponentType) => {
      const subcomponentProperties = (siblingComponentTypes[subcomponentType] as SiblingComponentState).customDynamicProperties;
      if (subcomponentProperties.tempOriginalCustomProperties) {
        Object.assign(subcomponentProperties.customCss, subcomponentProperties.tempOriginalCustomProperties.customCss);
        Object.assign(subcomponentProperties.customFeatures, subcomponentProperties.tempOriginalCustomProperties.customFeatures);
      }
    });
  }

  private static resetOriginalCss(subcomponentProperties: SubcomponentProperties): void {
    if (!subcomponentProperties.tempOriginalCustomProperties) return;
    Object.assign(subcomponentProperties.customCss, subcomponentProperties.tempOriginalCustomProperties.customCss);
    Object.assign(subcomponentProperties.customFeatures, subcomponentProperties.tempOriginalCustomProperties.customFeatures);
  }

  private static resetSubcomponentProperties(activeComponentTraversal: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const resetSubcomponentProperties = this as any as boolean;
    const activeSubcomponent = activeComponentTraversal.subcomponentProperties;
    if (resetSubcomponentProperties) {
      CleanSyncChildComponentMode.resetOriginalCss(activeSubcomponent);
      activeSubcomponent.seedComponent.sync.temporarySyncExecutables?.off?.(activeSubcomponent.seedComponent);
    }
    delete activeSubcomponent.tempOriginalCustomProperties;
    return activeComponentTraversal;
  }

  public static cleanComponent(currentlySelectedComponent: WorkshopComponent, resetSubcomponentProperties = true): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentViaPreviewStructureParentFirst.traverse(
      CleanSyncChildComponentMode.resetSubcomponentProperties.bind(resetSubcomponentProperties), activeComponent);
    CleanSyncChildComponentMode.removeSiblingComponentPropertiesThatWereMissing(activeComponent);
  }
  
  public static deleteLastSelectedComponentToSync(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}

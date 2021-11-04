import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SiblingSubcomponentState } from '../../../../../../../interfaces/siblingChildComponentsAutoSynced';
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

  private static removeSiblingSubcomponentPropertiesThatWereMissing(activeComponent: WorkshopComponent): void {
    const siblingSubcomponents = AutoSyncedSiblingContainerComponentUtils.getSiblingSubcomponents(activeComponent);
    Object.keys(siblingSubcomponents).forEach((subcomponentType) => {
      const subcomponentProperties = (siblingSubcomponents[subcomponentType] as SiblingSubcomponentState).customDynamicProperties;
      if (subcomponentProperties.tempOriginalCustomProperties) {
        if (Object.keys(subcomponentProperties.tempOriginalCustomProperties.customCss).length === 0) {
          delete siblingSubcomponents[subcomponentType];
        } else {
          Object.assign(subcomponentProperties.customCss, subcomponentProperties.tempOriginalCustomProperties.customCss);
          Object.assign(subcomponentProperties.customFeatures, subcomponentProperties.tempOriginalCustomProperties.customFeatures);
        }
      }
    });
  }

  public static cleanComponent(currentlySelectedComponent: WorkshopComponent, resetSubcomponentProperties = true): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentViaPreviewStructureParentFirst.traverse(
      CleanSyncChildComponentMode.resetSubcomponentProperties.bind(resetSubcomponentProperties), activeComponent);
    CleanSyncChildComponentMode.removeSiblingSubcomponentPropertiesThatWereMissing(activeComponent);
  }
  
  public static deleteLastSelectedComponentToSync(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}

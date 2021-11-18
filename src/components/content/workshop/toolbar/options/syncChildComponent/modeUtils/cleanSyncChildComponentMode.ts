import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { SiblingComponentState } from '../../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { ComponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class CleanSyncChildComponentMode {

  // WORK 2 - should this work
  private static unsetSiblingComponentPropertiesThatWereMissing(activeComponent: WorkshopComponent): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(activeComponent);
    if (!siblingComponentTypes) return;
    Object.keys(siblingComponentTypes).forEach((componentType: COMPONENT_TYPES) => {
      const subcomponent = (siblingComponentTypes[componentType] as SiblingComponentState).customDynamicProperties;
      if (subcomponent.tempOriginalCustomProperties) {
        Object.assign(subcomponent.customCss, subcomponent.tempOriginalCustomProperties.customCss);
        Object.assign(subcomponent.customFeatures, subcomponent.tempOriginalCustomProperties.customFeatures);
      }
    });
  }

  private static resetOriginalCss(baseSubcomponent: Subcomponent): void {
    if (!baseSubcomponent.tempOriginalCustomProperties) return;
    baseSubcomponent.customCss = baseSubcomponent.tempOriginalCustomProperties.customCss;
    baseSubcomponent.customFeatures = baseSubcomponent.tempOriginalCustomProperties.customFeatures;
  }

  private static resetBaseSubcomponent(activeComponentTraversal: ComponentPreviewTraversalState): ComponentPreviewTraversalState {
    const resetBaseSubcomponent = this as any as boolean;
    const { component } = activeComponentTraversal;
    const { baseSubcomponent, sync: { temporarySyncExecutables } } = component;
    if (resetBaseSubcomponent) {
      CleanSyncChildComponentMode.resetOriginalCss(baseSubcomponent);
      temporarySyncExecutables?.off?.(component);
    }
    delete baseSubcomponent.tempOriginalCustomProperties;
    return activeComponentTraversal;
  }

  public static cleanComponent(currentlySelectedComponent: WorkshopComponent, resetBaseSubcomponent = true): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentViaPreviewStructureParentFirst.traverse(
      CleanSyncChildComponentMode.resetBaseSubcomponent.bind(resetBaseSubcomponent), null, activeComponent);
    CleanSyncChildComponentMode.unsetSiblingComponentPropertiesThatWereMissing(activeComponent);
  }
  
  public static deleteLastSelectedComponentToSync(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}

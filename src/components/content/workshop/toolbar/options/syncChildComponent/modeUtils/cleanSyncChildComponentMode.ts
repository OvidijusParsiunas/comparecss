import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { SiblingComponentState } from '../../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { ComponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class CleanSyncChildComponentMode {

  private static unsetSiblingComponentPropertiesThatWereMissing(activeComponent: WorkshopComponent): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(activeComponent.parentLayer);
    if (!siblingComponentTypes) return;
    Object.keys(siblingComponentTypes).forEach((componentType: COMPONENT_TYPES) => {
      const subcomponent = (siblingComponentTypes[componentType] as SiblingComponentState).customDynamicProperties;
      if (subcomponent.tempOriginalCustomProperties) {
        Object.assign(subcomponent.customCss, subcomponent.tempOriginalCustomProperties.customCss);
        Object.assign(subcomponent.customFeatures, subcomponent.tempOriginalCustomProperties.customFeatures);
      }
    });
  }

  private static resetOriginalCustomProperties(baseSubcomponent: Subcomponent): void {
    if (!baseSubcomponent.tempOriginalCustomProperties) return;
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(baseSubcomponent.seedComponent.parentLayer);
    if (siblingComponentTypes) {
      // this is used to unsync custom properties for synced auto synced components like buttons in a button group
      Object.assign(baseSubcomponent.customCss, baseSubcomponent.tempOriginalCustomProperties.customCss);
      Object.assign(baseSubcomponent.customFeatures, baseSubcomponent.tempOriginalCustomProperties.customFeatures);
    } else {
      // this is the default way for unsyncing custom properties for child components as the one above causes the following issue:
      // upon viewing a syncable component (by hovering over its card with the mouse) and then blurring would edit the actual
      // syncable component as Object.assign edits that component's referecne instead of overwriting it. This can be reproduced
      // by hovering over sync button card and blurring it when in a dropdown component, switch to see that button's properties
      baseSubcomponent.customCss = baseSubcomponent.tempOriginalCustomProperties.customCss;
      baseSubcomponent.customFeatures = baseSubcomponent.tempOriginalCustomProperties.customFeatures;
    }
  }

  private static resetBaseSubcomponent(activeComponentTraversal: ComponentPreviewTraversalState): ComponentPreviewTraversalState {
    const resetBaseSubcomponent = this as any as boolean;
    const { component } = activeComponentTraversal;
    const { baseSubcomponent, sync: { temporarySyncExecutables } } = component;
    if (resetBaseSubcomponent) {
      CleanSyncChildComponentMode.resetOriginalCustomProperties(baseSubcomponent);
      temporarySyncExecutables?.off?.(component);
    }
    delete baseSubcomponent.tempOriginalCustomProperties;
    return activeComponentTraversal;
  }

  public static cleanComponent(currentlySelectedComponent: WorkshopComponent, resetBaseSubcomponent = true): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentViaPreviewStructureParentFirst.traverse(
      CleanSyncChildComponentMode.resetBaseSubcomponent.bind(resetBaseSubcomponent), activeComponent);
    CleanSyncChildComponentMode.unsetSiblingComponentPropertiesThatWereMissing(activeComponent);
  }
  
  public static deleteLastSelectedComponentToSync(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}

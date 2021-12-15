import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { SiblingComponentState, SiblingComponentTypes } from '../../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { ComponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

interface CleanPropertiesContext {
  resetCustomProperties: boolean;
  siblingComponentTypes: SiblingComponentTypes;
}

export class CleanSyncChildComponentMode {

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

  private static resetOriginalCustomProperties(baseSubcomponent: Subcomponent, siblingComponentTypes: SiblingComponentTypes): void {
    if (!baseSubcomponent.tempOriginalCustomProperties) return;
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

  private static unsetSiblingChildComponentsAutoSynced(component: WorkshopComponent): void {
    setTimeout(() => {
      // the reason why this is in a timeout is because after confirming sync there is an intermidiate period when the dom has
      // not refreshed to indicate that the component is in sync and the areChildrenComponentsTemporarilySynced are removed
      // causing original properties that were overwritten in ButtonGroupCompositionAPIUtils to be briefly displayed
      const { siblingChildComponentsAutoSynced } = component.parentLayer?.subcomponent.seedComponent.sync || {};
      if (siblingChildComponentsAutoSynced) siblingChildComponentsAutoSynced.areChildrenComponentsTemporarilySynced = false;
    });
  }

  private static cleanProperties(activeComponentTraversal: ComponentPreviewTraversalState): ComponentPreviewTraversalState {
    const { resetCustomProperties, siblingComponentTypes } = this as any as CleanPropertiesContext;
    const { component } = activeComponentTraversal;
    const { baseSubcomponent, sync: { syncExecutables } } = component;
    if (resetCustomProperties) {
      CleanSyncChildComponentMode.resetOriginalCustomProperties(baseSubcomponent, siblingComponentTypes);
      syncExecutables?.off?.(component, false);
    }
    delete baseSubcomponent.tempOriginalCustomProperties;
    CleanSyncChildComponentMode.unsetSiblingChildComponentsAutoSynced(baseSubcomponent.seedComponent);
    return activeComponentTraversal;
  }

  public static cleanComponent(currentlySelectedComponent: WorkshopComponent, resetCustomProperties = true): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(activeComponent);
    TraverseComponentViaPreviewStructureParentFirst.traverse(
      CleanSyncChildComponentMode.cleanProperties.bind({resetCustomProperties, siblingComponentTypes} as CleanPropertiesContext), activeComponent);
    CleanSyncChildComponentMode.unsetSiblingComponentPropertiesThatWereMissing(activeComponent);
  }
  
  public static deleteLastSelectedComponentToSync(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}

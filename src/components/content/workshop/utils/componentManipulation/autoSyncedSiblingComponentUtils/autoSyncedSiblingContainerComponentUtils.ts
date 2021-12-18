import { SyncableComponentTraversalCallback, SyncChildComponentUtils } from '../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { SiblingComponentTypes } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../consts/baseSubcomponentNames.enum';
import { SyncChildComponent } from '../../../toolbar/options/syncChildComponent/syncChildComponent';
import { AutoSyncedSiblingComponentUtils } from './autoSyncedSiblingComponentUtils';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

// note that this only works if the child container type that can be added is the same - e.g. only buttons
// current implementation copies all child components in any sections, however if needed can add section
// type to abstract siblingComponentTypes property
export class AutoSyncedSiblingContainerComponentUtils {

  public static getSiblingComponentTypes(component: WorkshopComponent, numberOfLevels = 1): SiblingComponentTypes {
    if (numberOfLevels === 0) return null;
    const parentLayerComponent = component?.parentLayer?.subcomponent.seedComponent;
    if (!parentLayerComponent) return null;
    if (parentLayerComponent.sync.siblingChildComponentsAutoSynced) {
      return parentLayerComponent.sync.siblingChildComponentsAutoSynced?.siblingComponentTypes;
    }
    return AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(component.containerComponent, numberOfLevels -= 1);
  }

  private static addAndCopy(component: WorkshopComponent, siblingComponentTypes: SiblingComponentTypes): void {
    if (!siblingComponentTypes[component.type]) {
      siblingComponentTypes[component.type] = { components: new Set([]), customDynamicProperties: null };
    }
    if (siblingComponentTypes[component.type].components.size === 0) {
      siblingComponentTypes[component.type].components.add(component);
      siblingComponentTypes[component.type].customDynamicProperties = component.baseSubcomponent;
    } else {
      siblingComponentTypes[component.type].components.add(component);
      AutoSyncedSiblingComponentUtils.copySiblingCustomDynamicProperties(
        component.baseSubcomponent, siblingComponentTypes[component.type].customDynamicProperties);
    }
  }

  private static callCountManipulationCallbackOnSubcomponents(callback: SyncableComponentTraversalCallback, childComponent: WorkshopComponent): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(childComponent, 2);
    if (siblingComponentTypes) {
      SyncChildComponentUtils.callFuncOnSyncableComponents(callback, childComponent, siblingComponentTypes);
    }
  }

  private static copy(component: WorkshopComponent, siblingComponentTypes: SiblingComponentTypes): void {
    const { customDynamicProperties } = siblingComponentTypes[component.type] || {};
    if (customDynamicProperties) {
      AutoSyncedSiblingComponentUtils.copySiblingCustomDynamicProperties(component.baseSubcomponent, customDynamicProperties);
    }
  }

  private static copyComponent(childComponent: WorkshopComponent, containerComponent: WorkshopComponent): void {
    const siblingComponentTypes = AutoSyncedSiblingComponentUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(childComponent)?.siblingComponentTypes
      || AutoSyncedSiblingComponentUtils.getParentLayerSiblingChildComponentsAutoSyncedObject(containerComponent)?.siblingComponentTypes;
    if (siblingComponentTypes) {
      SyncChildComponentUtils.callFuncOnSyncableComponents(AutoSyncedSiblingContainerComponentUtils.copy, childComponent, siblingComponentTypes);
    }
  }

  public static copySiblingIfAutoSynced(childComponent: WorkshopComponent, containerComponent: WorkshopComponent): void {
    if (childComponent.activeSubcomponentName === TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY) {
      AutoSyncedSiblingContainerComponentUtils.copyComponent(childComponent, containerComponent);
    } else {
      AutoSyncedSiblingContainerComponentUtils.callCountManipulationCallbackOnSubcomponents(
        AutoSyncedSiblingContainerComponentUtils.addAndCopy, childComponent);
    }
  }

  private static remove(component: WorkshopComponent, siblingComponentTypes: SiblingComponentTypes): void {
    if (siblingComponentTypes[component.type]) {
      siblingComponentTypes[component.type].components.delete(component);
    }
    if (siblingComponentTypes[component.type]?.components.size === 0) {
      siblingComponentTypes[component.type].customDynamicProperties = null;
    }
  }

  public static decrementSiblingComponentCount(childComponent: WorkshopComponent): void {
    AutoSyncedSiblingContainerComponentUtils.callCountManipulationCallbackOnSubcomponents(
      AutoSyncedSiblingContainerComponentUtils.remove, childComponent);
  }

  private static findChildComponentSibling(parentLayer: Layer, childComponent: WorkshopComponent): WorkshopComponent {
    const { alignmentSectionToComponents } = parentLayer;
    const alignmentSections = Object.keys(alignmentSectionToComponents);
    for (let i = 0; i < alignmentSections.length; i += 1) {
      const components: WorkshopComponent[] = alignmentSectionToComponents[alignmentSections[i]];
      for (let j = 0; j < components.length; j += 1) {
        const alignedComponent = components[j];
        if (alignedComponent !== childComponent) return alignedComponent;
      }
    }
    return null;
  }

  public static setComponentToBeInSyncIfSiblingsSynced(parentLayer: Layer, component: WorkshopComponent): void {
    const siblingComponent = AutoSyncedSiblingContainerComponentUtils.findChildComponentSibling(parentLayer, component);
    if (siblingComponent) {
      const { componentThisIsSyncedTo } = siblingComponent.sync;
      if (componentThisIsSyncedTo) SyncChildComponent.setComponentPropertiesToBeInSync(component, componentThisIsSyncedTo);
    }
  }
}

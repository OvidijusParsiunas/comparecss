import { SyncableComponentTraversalCallback, SyncChildComponentUtils } from '../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { SiblingComponentTypes } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { SyncChildComponent } from '../../../toolbar/options/syncChildComponent/syncChildComponent';
import { AutoSyncedSiblingComponentUtils } from './autoSyncedSiblingComponentUtils';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

// note that this only works if the child container type that can be added is the same - e.g. only buttons
// current implementation copies all child components in any sections, however if needed can add section
// type to abstract siblingComponentTypes property
export class AutoSyncedSiblingContainerComponentUtils {

  // passing parentLayer instead ofn the actual component because temporary components do not have parentLayer
  public static getSiblingComponentTypes(parentLayer: Layer, numberOfLevels = 1): SiblingComponentTypes {
    if (numberOfLevels === 0) return null;
    const parentLayerComponent = parentLayer?.subcomponent.seedComponent;
    if (!parentLayerComponent) return null;
    if (parentLayerComponent.sync.siblingChildComponentsAutoSynced) {
      return parentLayerComponent.sync.siblingChildComponentsAutoSynced?.siblingComponentTypes;
    }
    return AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(parentLayerComponent.containerComponent.parentLayer,
      numberOfLevels -= 1);
  }

  private static callCountManipulationCallbackOnSubcomponents(parentLayer: Layer, childComponent: WorkshopComponent,
      callback: SyncableComponentTraversalCallback): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(parentLayer, 2);
    if (siblingComponentTypes) {
      SyncChildComponentUtils.callFuncOnSyncableComponents(callback, childComponent, siblingComponentTypes);
    }
  }

  private static incrementAndCopy(component: WorkshopComponent, siblingComponentTypes: SiblingComponentTypes): void {
    if (!siblingComponentTypes[component.type]) {
      siblingComponentTypes[component.type] = { currentCount: 1, customDynamicProperties: component.baseSubcomponent };
    } else {
      siblingComponentTypes[component.type].currentCount += 1;
      AutoSyncedSiblingComponentUtils.copySiblingCustomDynamicProperties(
        component.baseSubcomponent, siblingComponentTypes[component.type].customDynamicProperties);
    }
  }

  public static copySiblingIfAutoSynced(parentLayer: Layer, childComponent: WorkshopComponent): void {
    AutoSyncedSiblingContainerComponentUtils.callCountManipulationCallbackOnSubcomponents(
      parentLayer, childComponent, AutoSyncedSiblingContainerComponentUtils.incrementAndCopy);
  }

  private static decrementAndRemoveIfNoneLeft(component: WorkshopComponent, siblingComponentTypes: SiblingComponentTypes): void {
    if (siblingComponentTypes[component.type]) {
      siblingComponentTypes[component.type].currentCount -= 1;
    }
    if (siblingComponentTypes[component.type]?.currentCount === 0) {
      delete siblingComponentTypes[component.type];
    }
  }

  public static decrementSiblingComponentCount(parentLayer: Layer, childComponent: WorkshopComponent): void {
    AutoSyncedSiblingContainerComponentUtils.callCountManipulationCallbackOnSubcomponents(
      parentLayer, childComponent, AutoSyncedSiblingContainerComponentUtils.decrementAndRemoveIfNoneLeft);
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

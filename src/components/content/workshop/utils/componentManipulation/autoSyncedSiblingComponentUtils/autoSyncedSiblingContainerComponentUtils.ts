import { SyncableComponentTraversalCallback, SyncChildComponentUtils } from '../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { SiblingComponentTypes } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { SyncChildComponent } from '../../../toolbar/options/syncChildComponent/syncChildComponent';
import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AutoSyncedSiblingComponentUtils } from './autoSyncedSiblingComponentUtils';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

// note that this only works if the child container type that can be added is the same - e.g. only buttons
// current implementation copies all child components in any sections, however if needed can add section
// type to abstract siblingComponentTypes property
export class AutoSyncedSiblingContainerComponentUtils {

  // only goes as far as 2 parent layer levels
  private static getAutoSyncedSiblingComponents(parentLayer: Layer): SiblingComponentTypes {
    const parentLayerComponent = parentLayer.subcomponent.seedComponent;
    if (parentLayerComponent.sync.siblingChildComponentsAutoSynced) {
      return parentLayerComponent.sync.siblingChildComponentsAutoSynced?.siblingComponentTypes;
    }
    const parentParentSiblingChildComponentsAutoSynced = parentLayerComponent.containerComponent
      ?.parentLayer?.subcomponent.seedComponent.sync.siblingChildComponentsAutoSynced;
    if (parentParentSiblingChildComponentsAutoSynced) {
      return parentParentSiblingChildComponentsAutoSynced.siblingComponentTypes;
    }
    return null;
  }

  private static callCountManipulationCallbackOnSubcomponents(parentLayer: Layer, childComponent: WorkshopComponent,
      callback: SyncableComponentTraversalCallback): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getAutoSyncedSiblingComponents(parentLayer);
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

  public static getSiblingComponentTypes(component: WorkshopComponent): SiblingComponentTypes {
    return component.parentLayer?.subcomponent.seedComponent.sync?.siblingChildComponentsAutoSynced?.siblingComponentTypes;
  }

  private static findChildComponentSibling(parentLayer: Layer, childComponent: WorkshopComponent): WorkshopComponent {
    const { alignmentSectionToSubcomponents } = parentLayer;
    for (let i = 0; i < Object.keys(alignmentSectionToSubcomponents).length; i += 1) {
      const subcomponents: Subcomponent[] = alignmentSectionToSubcomponents[Object.keys(alignmentSectionToSubcomponents)[i]];
      for (let j = 0; j < subcomponents.length; j += 1) {
        const alignedComponent = subcomponents[j].seedComponent;
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

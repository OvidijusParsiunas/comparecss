import { SyncableSubcomponentTraversalCallback, SyncChildComponentUtils } from '../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SiblingSubcomponentTypes } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { BaseSubcomponentRef, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { SyncChildComponent } from '../../../toolbar/options/syncChildComponent/syncChildComponent';
import { AutoSyncedSiblingComponentUtils } from './autoSyncedSiblingComponentUtils';

// note that this only works if the child container type that can be added is the same - e.g. only buttons
// current implementation copies all child components in any sections, however if needed can add section
// type to abstract siblingSubcomponentTypes property
export class AutoSyncedSiblingContainerComponentUtils {

  // only goes as far as 2 parent layer levels
  private static getAutoSyncedSiblingSubcomponents(parentLayer: Layer): SiblingSubcomponentTypes {
    const parentLayerComponent = parentLayer.subcomponentProperties.seedComponent;
    if (parentLayerComponent.sync.siblingChildComponentsAutoSynced) {
      return parentLayerComponent.sync.siblingChildComponentsAutoSynced?.siblingSubcomponentTypes;
    }
    const parentParentSiblingChildComponentsAutoSynced = parentLayerComponent.containerComponent
      ?.parentLayer?.subcomponentProperties.seedComponent.sync.siblingChildComponentsAutoSynced;
    if (parentParentSiblingChildComponentsAutoSynced) {
      return parentParentSiblingChildComponentsAutoSynced.siblingSubcomponentTypes;
    }
    return null;
  }

  private static callCountManipulationCallbackOnSubcomponents(parentLayer: Layer, childComponent: WorkshopComponent,
      callback: SyncableSubcomponentTraversalCallback): void {
    const siblingSubcomponentTypes = AutoSyncedSiblingContainerComponentUtils.getAutoSyncedSiblingSubcomponents(parentLayer);
    if (siblingSubcomponentTypes) {
      SyncChildComponentUtils.callFuncOnSyncableSubcomponents(callback, childComponent, siblingSubcomponentTypes);
    }
  }

  private static incrementAndCopy(subcomponent: SubcomponentProperties, siblingSubcomponentTypes: SiblingSubcomponentTypes): void {
    if (!siblingSubcomponentTypes[subcomponent.subcomponentType]) {
      siblingSubcomponentTypes[subcomponent.subcomponentType] = { currentCount: 1, customDynamicProperties: subcomponent };
    } else {
      siblingSubcomponentTypes[subcomponent.subcomponentType].currentCount += 1;
      AutoSyncedSiblingComponentUtils.copySiblingSubcomponent(siblingSubcomponentTypes[subcomponent.subcomponentType].customDynamicProperties, subcomponent);
    }
  }

  public static copySiblingIfAutoSynced(parentLayer: Layer, childComponent: WorkshopComponent): void {
    AutoSyncedSiblingContainerComponentUtils.callCountManipulationCallbackOnSubcomponents(
      parentLayer, childComponent, AutoSyncedSiblingContainerComponentUtils.incrementAndCopy);
  }

  private static decrementAndRemoveIfNoneLeft(subcomponent: SubcomponentProperties, siblingSubcomponentTypes: SiblingSubcomponentTypes): void {
    if (siblingSubcomponentTypes[subcomponent.subcomponentType]) {
      siblingSubcomponentTypes[subcomponent.subcomponentType].currentCount -= 1;
    }
    if (siblingSubcomponentTypes[subcomponent.subcomponentType]?.currentCount === 0) {
      delete siblingSubcomponentTypes[subcomponent.subcomponentType];
    }
  }

  public static decrementSiblingSubcomponentCount(parentLayer: Layer, childComponent: WorkshopComponent): void {
    AutoSyncedSiblingContainerComponentUtils.callCountManipulationCallbackOnSubcomponents(
      parentLayer, childComponent, AutoSyncedSiblingContainerComponentUtils.decrementAndRemoveIfNoneLeft);
  }

  public static getSiblingSubcomponents(component: WorkshopComponent): SiblingSubcomponentTypes {
    return component.parentLayer.subcomponentProperties.seedComponent.sync?.siblingChildComponentsAutoSynced?.siblingSubcomponentTypes;
  }

  private static findChildComponentSibling(parentLayer: Layer, childComponent: WorkshopComponent): WorkshopComponent {
    const { alignedSections } = parentLayer.sections;
    for (let i = 0; i < Object.keys(alignedSections).length; i += 1) {
      const alignedSection: BaseSubcomponentRef[] = alignedSections[Object.keys(alignedSections)[i]];
      for (let j = 0; j < alignedSection.length; j += 1) {
        const alignedComponent = alignedSection[j].subcomponentProperties.seedComponent;
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

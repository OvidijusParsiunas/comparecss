import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SiblingSubcomponentTypes } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { AutoSyncedSiblingComponentUtils } from './autoSyncedSiblingComponentUtils';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

type SiblingManipulationCallback = (siblingSubcomponentTypes: SiblingSubcomponentTypes, subcomponent: SubcomponentProperties) => void;

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
      callback: SiblingManipulationCallback): void {
    const autoSyncedSiblingSubcomponents = AutoSyncedSiblingContainerComponentUtils.getAutoSyncedSiblingSubcomponents(parentLayer);
    if (autoSyncedSiblingSubcomponents) {
      const syncableSubcomponents = childComponent.sync.syncables.onCopy?.subcomponents;
      if (syncableSubcomponents) {
        Object.keys(syncableSubcomponents).forEach((subcomponentType) => {
          const subcomponent = syncableSubcomponents[subcomponentType];
          if (subcomponent) callback(autoSyncedSiblingSubcomponents, subcomponent);
        });
      } else {
        callback(autoSyncedSiblingSubcomponents, childComponent.baseSubcomponent);
      }
    }
  }

  private static incrementAndCopy(siblingSubcomponentTypes: SiblingSubcomponentTypes, subcomponent: SubcomponentProperties): void {
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

  private static decrementAndRemoveIfNoneLeft(siblingSubcomponentTypes: SiblingSubcomponentTypes, subcomponent: SubcomponentProperties): void {
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
}

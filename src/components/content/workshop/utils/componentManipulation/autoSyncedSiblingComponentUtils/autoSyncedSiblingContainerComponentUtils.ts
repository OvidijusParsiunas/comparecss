import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SiblingSubcomponents } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { AutoSyncedSiblingComponentUtils } from './autoSyncedSiblingComponentUtils';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

type SiblingManipulationCallback = (siblingSubcomponents: SiblingSubcomponents, subcomponent: SubcomponentProperties) => void;

// note that this only works if the child container type that can be added is the same - e.g. only buttons
// current implementation copies all child components in any sections, however if needed can add section
// type to abstract siblingSubcomponents property
export class AutoSyncedSiblingContainerComponentUtils {

  // only goes as far as 2 parent layer levels
  private static getAutoSyncedSiblingSubcomponents(parentLayer: Layer): SiblingSubcomponents {
    const parentLayerComponent = parentLayer.subcomponentProperties.seedComponent;
    if (parentLayerComponent.sync.siblingChildComponentsAutoSynced) {
      return parentLayerComponent.sync.siblingChildComponentsAutoSynced?.siblingSubcomponents;
    }
    const parentParentSiblingChildComponentsAutoSynced = parentLayerComponent.containerComponent
      ?.parentLayer?.subcomponentProperties.seedComponent.sync.siblingChildComponentsAutoSynced;
    if (parentParentSiblingChildComponentsAutoSynced) {
      return parentParentSiblingChildComponentsAutoSynced.siblingSubcomponents;
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

  private static incrementAndCopy(siblingSubcomponents: SiblingSubcomponents, subcomponent: SubcomponentProperties): void {
    if (!siblingSubcomponents[subcomponent.subcomponentType]) {
      siblingSubcomponents[subcomponent.subcomponentType] = { currentCount: 1, subcomponentProperties: subcomponent };
    } else {
      siblingSubcomponents[subcomponent.subcomponentType].currentCount += 1;
      AutoSyncedSiblingComponentUtils.copySiblingSubcomponent(siblingSubcomponents[subcomponent.subcomponentType].subcomponentProperties, subcomponent);
    }
  }

  public static copySiblingIfAutoSynced(parentLayer: Layer, childComponent: WorkshopComponent): void {
    AutoSyncedSiblingContainerComponentUtils.callCountManipulationCallbackOnSubcomponents(
      parentLayer, childComponent, AutoSyncedSiblingContainerComponentUtils.incrementAndCopy);
  }

  private static decrementAndRemoveIfNoneLeft(siblingSubcomponents: SiblingSubcomponents, subcomponent: SubcomponentProperties): void {
    if (siblingSubcomponents[subcomponent.subcomponentType]) {
      siblingSubcomponents[subcomponent.subcomponentType].currentCount -= 1;
    }
    if (siblingSubcomponents[subcomponent.subcomponentType]?.currentCount === 0) {
      delete siblingSubcomponents[subcomponent.subcomponentType];
    }
  }

  public static decrementSiblingSubcomponentCount(parentLayer: Layer, childComponent: WorkshopComponent): void {
    AutoSyncedSiblingContainerComponentUtils.callCountManipulationCallbackOnSubcomponents(
      parentLayer, childComponent, AutoSyncedSiblingContainerComponentUtils.decrementAndRemoveIfNoneLeft);
  }
}

import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SiblingSubcomponents } from '../../../../../../interfaces/siblingLayersInSyncWithEachOther';
import { AddComponentShared } from '../addChildComponent/add/addComponentShared';

// note that this only works if the child container type that can be added is the same - e.g. only buttons
// this copies all child components within any section, if needed can add section type before the subcomponents property
// in the siblingLayersInSyncWithEachOther interface
export class SyncedSiblingComponentUtils extends AddComponentShared {

  // only goes two levels up max
  private static getSyncedSiblingSubcomponents(containerComponent: WorkshopComponent): SiblingSubcomponents {
    if (containerComponent.siblingLayersInSyncWithEachOther) {
      return containerComponent.siblingLayersInSyncWithEachOther?.subcomponents;
    }
    if (containerComponent.containerComponent?.siblingLayersInSyncWithEachOther) {
      return containerComponent.containerComponent?.siblingLayersInSyncWithEachOther?.subcomponents;
    }
    return null;
  }

  private static incrementAndCopy(siblingSubcomponents: SiblingSubcomponents, newSubcomponent: SubcomponentProperties): void {
    if (!siblingSubcomponents[newSubcomponent.subcomponentType]) {
      siblingSubcomponents[newSubcomponent.subcomponentType] = { currentCount: 1, subcomponentProperties: newSubcomponent };
    } else {
      siblingSubcomponents[newSubcomponent.subcomponentType].currentCount += 1;
      AddComponentShared.copySiblingSubcomponent(siblingSubcomponents[newSubcomponent.subcomponentType].subcomponentProperties, newSubcomponent);
    }
  }

  private static decrementAndRemoveIfNoneLeft(siblingSubcomponents: SiblingSubcomponents, subcomponent: SubcomponentProperties): void {
    if (siblingSubcomponents[subcomponent.subcomponentType]) {
      siblingSubcomponents[subcomponent.subcomponentType].currentCount -= 1;
    }
    if (siblingSubcomponents[subcomponent.subcomponentType]?.currentCount === 0) {
      delete siblingSubcomponents[subcomponent.subcomponentType];
    }
  }

  public static callCurrentCountManipulationCallbackOnSubcomponents(containerComponent: WorkshopComponent, childComponent: WorkshopComponent,
      callback: (siblingSubcomponents: SiblingSubcomponents, subcomponent: SubcomponentProperties) => void): void {
    const syncedSiblingSubcomponents = SyncedSiblingComponentUtils.getSyncedSiblingSubcomponents(containerComponent);
    if (syncedSiblingSubcomponents) {
      const syncableSubcomponents = childComponent.sync.syncables.onCopy?.subcomponents;
      if (syncableSubcomponents) {
        Object.keys(syncableSubcomponents).forEach((subcomponentType) => {
          const subcomponent = syncableSubcomponents[subcomponentType];
          if (subcomponent) callback(syncedSiblingSubcomponents, subcomponent);
        });
      } else {
        callback(syncedSiblingSubcomponents, childComponent.baseSubcomponent);
      }
    }
  }
  
  public static copySiblingIfSiblingsSynced(containerComponent: WorkshopComponent, childComponent: WorkshopComponent): void {
    SyncedSiblingComponentUtils.callCurrentCountManipulationCallbackOnSubcomponents(
      containerComponent, childComponent, SyncedSiblingComponentUtils.incrementAndCopy);
  }

  public static decrementSiblingSubcomponentCount(containerComponent: WorkshopComponent, childComponent: WorkshopComponent): void {
    SyncedSiblingComponentUtils.callCurrentCountManipulationCallbackOnSubcomponents(
      containerComponent, childComponent, SyncedSiblingComponentUtils.decrementAndRemoveIfNoneLeft);
  }
}

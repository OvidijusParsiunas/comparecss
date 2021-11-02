import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SiblingSubcomponents } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { AddComponentShared } from '../addChildComponent/add/addComponentShared';

type SiblingManipulationCallback = (siblingSubcomponents: SiblingSubcomponents, subcomponent: SubcomponentProperties) => void;

// note that this only works if the child container type that can be added is the same - e.g. only buttons
// current implementation copies all child components in any sections, however if needed can add section
// type to abstract siblingSubcomponents property
export class AutoSyncedSiblingComponentUtils extends AddComponentShared {

  // only goes as far as 2 container component levels
  private static getAutoSyncedSiblingSubcomponents(containerComponent: WorkshopComponent): SiblingSubcomponents {
    if (containerComponent.sync.siblingChildComponentsAutoSynced) {
      return containerComponent.sync.siblingChildComponentsAutoSynced?.siblingSubcomponents;
    }
    if (containerComponent.containerComponent?.sync.siblingChildComponentsAutoSynced) {
      return containerComponent.containerComponent?.sync.siblingChildComponentsAutoSynced?.siblingSubcomponents;
    }
    return null;
  }

  private static callCountManipulationCallbackOnSubcomponents(containerComponent: WorkshopComponent, childComponent: WorkshopComponent,
      callback: SiblingManipulationCallback): void {
    const autoSyncedSiblingSubcomponents = AutoSyncedSiblingComponentUtils.getAutoSyncedSiblingSubcomponents(containerComponent);
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

  private static incrementAndCopy(siblingSubcomponents: SiblingSubcomponents, newSubcomponent: SubcomponentProperties): void {
    if (!siblingSubcomponents[newSubcomponent.subcomponentType]) {
      siblingSubcomponents[newSubcomponent.subcomponentType] = { currentCount: 1, subcomponentProperties: newSubcomponent };
    } else {
      siblingSubcomponents[newSubcomponent.subcomponentType].currentCount += 1;
      AddComponentShared.copySiblingSubcomponent(siblingSubcomponents[newSubcomponent.subcomponentType].subcomponentProperties, newSubcomponent);
    }
  }

  public static copySiblingIfAutoSynced(containerComponent: WorkshopComponent, childComponent: WorkshopComponent): void {
    AutoSyncedSiblingComponentUtils.callCountManipulationCallbackOnSubcomponents(
      containerComponent, childComponent, AutoSyncedSiblingComponentUtils.incrementAndCopy);
  }

  private static decrementAndRemoveIfNoneLeft(siblingSubcomponents: SiblingSubcomponents, subcomponent: SubcomponentProperties): void {
    if (siblingSubcomponents[subcomponent.subcomponentType]) {
      siblingSubcomponents[subcomponent.subcomponentType].currentCount -= 1;
    }
    if (siblingSubcomponents[subcomponent.subcomponentType]?.currentCount === 0) {
      delete siblingSubcomponents[subcomponent.subcomponentType];
    }
  }

  public static decrementSiblingSubcomponentCount(containerComponent: WorkshopComponent, childComponent: WorkshopComponent): void {
    AutoSyncedSiblingComponentUtils.callCountManipulationCallbackOnSubcomponents(
      containerComponent, childComponent, AutoSyncedSiblingComponentUtils.decrementAndRemoveIfNoneLeft);
  }
}

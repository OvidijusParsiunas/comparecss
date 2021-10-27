import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CleanSyncChildComponentMode } from './cleanSyncChildComponentMode';
import { SyncChildComponentUtils } from '../syncChildComponentUtils';
import { SyncChildComponent } from '../syncChildComponent';
import { ComponentOptions } from 'vue';

export class SyncChildComponentModeCardEvents {

  public static mouseClick(workshopComponent: ComponentOptions, componentToBeSyncedTo: WorkshopComponent): void {
    SyncChildComponent.syncComponentToTargetTemporarily(workshopComponent.currentlySelectedComponent, componentToBeSyncedTo);
    SyncChildComponent.syncLastSelectectedComponentToTarget(workshopComponent.currentlySelectedComponent, componentToBeSyncedTo);
    workshopComponent.currentlySelectedComponentForSync = componentToBeSyncedTo;
  }

  public static mouseEnter(workshopComponent: ComponentOptions, componentToBeSyncedTo: WorkshopComponent): void {
    const { subcomponents, activeSubcomponentName } = workshopComponent.currentlySelectedComponent;
    // the condition is a bug fix as when the sync child component mode is toggled on, during the component list animation the user can hover over a modal card
    if (!SyncChildComponentUtils.isComponentSyncable(subcomponents[activeSubcomponentName].seedComponent, componentToBeSyncedTo)) return;
    SyncChildComponent.syncComponentToTargetTemporarily(workshopComponent.currentlySelectedComponent, componentToBeSyncedTo);
    workshopComponent.currentlyHoveredComponentToSync = componentToBeSyncedTo;
  }
  
  public static mouseLeave(workshopComponent: ComponentOptions): void {
    const { currentlySelectedComponentForSync, currentlySelectedComponent } = workshopComponent;
    if (currentlySelectedComponentForSync) {
      SyncChildComponent.syncComponentToTargetTemporarily(currentlySelectedComponent, currentlySelectedComponentForSync);
    } else {
      CleanSyncChildComponentMode.cleanComponent(currentlySelectedComponent);
    }
  }
}

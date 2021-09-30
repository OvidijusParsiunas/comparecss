import { SyncChildComponentModeTempPropertiesUtils } from './syncChildComponentModeTempPropertiesUtils';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SyncChildComponentUtils } from '../syncChildComponentUtils';
import { ComponentOptions } from 'vue';

export class SyncChildComponentModeCardEvents {

  public static mouseClick(workshopComponent: ComponentOptions, componentToBeSynced: WorkshopComponent): void {
    SyncChildComponentModeTempPropertiesUtils.syncComponentToTarget(workshopComponent.currentlySelectedComponent, componentToBeSynced);
    SyncChildComponentModeTempPropertiesUtils.syncLastSelectectedComponentToTarget(workshopComponent.currentlySelectedComponent, componentToBeSynced);
    workshopComponent.currentlySelectedComponentForSync = componentToBeSynced;
  }

  public static mouseEnter(workshopComponent: ComponentOptions, componentToBeSynced: WorkshopComponent): void {
    const { subcomponents, activeSubcomponentName } = workshopComponent.currentlySelectedComponent;
    // the condition is a bug fix as when the sync child component mode is toggled on, during the component list animation the user can hover over a modal card
    if (!SyncChildComponentUtils.isComponentSyncable(subcomponents[activeSubcomponentName].seedComponent, componentToBeSynced)) return;
    SyncChildComponentModeTempPropertiesUtils.syncComponentToTarget(workshopComponent.currentlySelectedComponent, componentToBeSynced);
    workshopComponent.currentlyHoveredComponentToSync = componentToBeSynced;
  }
  
  public static mouseLeave(workshopComponent: ComponentOptions): void {
    const { currentlySelectedComponentForSync, currentlySelectedComponent } = workshopComponent;
    if (currentlySelectedComponentForSync) {
      SyncChildComponentModeTempPropertiesUtils.syncComponentToTarget(currentlySelectedComponent, currentlySelectedComponentForSync, );
    } else {
      SyncChildComponentModeTempPropertiesUtils.cleanComponent(currentlySelectedComponent);
    }
  }
}

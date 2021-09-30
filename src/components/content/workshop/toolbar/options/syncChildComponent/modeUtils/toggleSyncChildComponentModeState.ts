import { WorkshopEventCallback } from '../../../../../../../interfaces/workshopEventCallback';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SyncChildComponentModeToggleOff } from './syncChildComponentModeToggleOff';
import { SyncChildComponentUtils } from '../syncChildComponentUtils';
import { ComponentOptions } from 'vue';

export class ToggleSyncChildComponentModeState {

  private static toggleOff(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }): void {
    workshopComponent.components = workshopComponent.tempComponents;
    workshopComponent.tempComponents = [];
    workshopComponent.currentlySelectedComponentForSync = null;
    workshopComponent.currentlyHoveredComponentToSync = null;
  }

  private static toggleSyncChildComponentMode(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
    const workshopEventCallback: WorkshopEventCallback = {
      keyTriggers, func: SyncChildComponentModeToggleOff.toggleSyncChildComponentModeOff.bind(this, workshopComponent, optionsComponent) };
    workshopComponent.addWorkshopEventCallback(workshopEventCallback);
  }

  private static toggleOn(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    workshopComponent.tempComponents = workshopComponent.components;
    const activeComponent: WorkshopComponent = workshopComponent.currentlySelectedComponent.subcomponents[workshopComponent.currentlySelectedComponent.activeSubcomponentName].seedComponent;
    (workshopComponent.components as WorkshopComponent[]) = workshopComponent.components
      .filter((component: WorkshopComponent) => SyncChildComponentUtils.isComponentSyncable(component, activeComponent));
    ToggleSyncChildComponentModeState.toggleSyncChildComponentMode(workshopComponent, optionsComponent);
  }

  public static toggle(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    if (optionsComponent.isSyncChildComponentModeActive) {
      ToggleSyncChildComponentModeState.toggleOn(workshopComponent, optionsComponent);
    } else {
      ToggleSyncChildComponentModeState.toggleOff(workshopComponent);
    }
    workshopComponent.isSyncChildComponentModeActive = optionsComponent.isSyncChildComponentModeActive;
  }
}

import { ImportComponedModeToggleOff } from '../../toolbar/options/importComponent/modeUtils/importComponentModeToggleOff';
import { WorkshopEventCallback } from '../../../../../interfaces/workshopEventCallback';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

export class ToggleImportComponentModeState {

  private static toggleOff(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }): void {
    workshopComponent.components = workshopComponent.tempComponents;
    workshopComponent.tempComponents = [];
    workshopComponent.currentlySelectedImportComponent = null;
    workshopComponent.currentlyHoveredImportComponent = null;
  }

  private static toggleImportComponentMode(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
    const workshopEventCallback: WorkshopEventCallback = {
      keyTriggers, func: ImportComponedModeToggleOff.toggleImportComponentModeOff.bind(this, workshopComponent, optionsComponent) };
    workshopComponent.addWorkshopEventCallback(workshopEventCallback);
  }

  private static toggleOn(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    workshopComponent.tempComponents = workshopComponent.components;
    const componentType = workshopComponent.currentlySelectedComponent.subcomponents[workshopComponent.currentlySelectedComponent.activeSubcomponentName]
      .nestedComponent.ref.type;
    (workshopComponent.components as WorkshopComponent[]) = workshopComponent.components.filter((component: WorkshopComponent) => component.type === componentType);
    ToggleImportComponentModeState.toggleImportComponentMode(workshopComponent, optionsComponent);
  }
  
  public static toggle(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    if (optionsComponent.isImportComponentModeActive) {
      ToggleImportComponentModeState.toggleOn(workshopComponent, optionsComponent);
    } else {
      ToggleImportComponentModeState.toggleOff(workshopComponent);
    }
    workshopComponent.isImportComponentModeActive = optionsComponent.isImportComponentModeActive;
  }
}

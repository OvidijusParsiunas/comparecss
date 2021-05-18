import { ToggleImportComponentModeEvent } from '../../../../../interfaces/toggleImportComponentModeEvent';
import { WorkshopEventCallback } from '../../../../../interfaces/workshopEventCallback';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

export class ToggleImportComponentModeState {

  private static toggleOff(workshopComonent: ComponentOptions & { components: WorkshopComponent[] }): void {
    workshopComonent.components = workshopComonent.tempComponents;
    workshopComonent.tempComponents = [];
    workshopComonent.currentlySelectedImportComponent = null;
    workshopComonent.currentlyHoveredImportComponent = null;
  }

  private static toggleOn(workshopComonent: ComponentOptions & { components: WorkshopComponent[] }, workshopEventCallback: WorkshopEventCallback): void {
    workshopComonent.tempComponents = workshopComonent.components;
    const componentType = workshopComonent.currentlySelectedComponent.subcomponents[workshopComonent.currentlySelectedComponent.activeSubcomponentName]
      .importedComponent.componentRef.type;
    (workshopComonent.components as WorkshopComponent[]) = workshopComonent.components.filter((component: WorkshopComponent) => component.type === componentType);
    workshopComonent.addWorkshopEventCallback(workshopEventCallback);
  }
  
  public static toggle(workshopComonent: ComponentOptions & { components: WorkshopComponent[] }, toggleImportComponentModeEvent: ToggleImportComponentModeEvent): void {
    const [isActive, workshopEventCallback] = toggleImportComponentModeEvent;
    if (isActive) {
      ToggleImportComponentModeState.toggleOn(workshopComonent, workshopEventCallback);
    } else {
      ToggleImportComponentModeState.toggleOff(workshopComonent);
    }
    workshopComonent.isImportComponentModeActive = isActive;
  }
}

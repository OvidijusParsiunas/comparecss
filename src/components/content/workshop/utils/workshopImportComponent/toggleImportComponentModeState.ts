import { ToggleImportComponentModeEvent } from '../../../../../interfaces/toggleImportComponentModeEvent';
import { WorkshopEventCallback } from '../../../../../interfaces/workshopEventCallback';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

export class ToggleImportComponentModeState {

  private static toggleOff(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }): void {
    workshopComponent.components = workshopComponent.tempComponents;
    workshopComponent.tempComponents = [];
    workshopComponent.currentlySelectedImportComponent = null;
    workshopComponent.currentlyHoveredImportComponent = null;
  }

  private static toggleOn(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, workshopEventCallback: WorkshopEventCallback): void {
    workshopComponent.tempComponents = workshopComponent.components;
    const componentType = workshopComponent.currentlySelectedComponent.subcomponents[workshopComponent.currentlySelectedComponent.activeSubcomponentName]
      .importedComponent.componentRef.type;
    (workshopComponent.components as WorkshopComponent[]) = workshopComponent.components.filter((component: WorkshopComponent) => component.type === componentType);
    workshopComponent.addWorkshopEventCallback(workshopEventCallback);
  }
  
  public static toggle(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, toggleImportComponentModeEvent: ToggleImportComponentModeEvent): void {
    const [isActive, workshopEventCallback] = toggleImportComponentModeEvent;
    if (isActive) {
      ToggleImportComponentModeState.toggleOn(workshopComponent, workshopEventCallback);
    } else {
      ToggleImportComponentModeState.toggleOff(workshopComponent);
    }
    workshopComponent.isImportComponentModeActive = isActive;
  }
}

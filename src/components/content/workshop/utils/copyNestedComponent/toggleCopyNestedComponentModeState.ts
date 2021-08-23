import { CopyNestedComponedModeToggleOff } from '../../toolbar/options/copyNestedComponent/modeUtils/copyNestedComponentModeToggleOff';
import { WorkshopEventCallback } from '../../../../../interfaces/workshopEventCallback';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

export class ToggleCopyNestedComponentModeState {

  private static toggleOff(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }): void {
    workshopComponent.components = workshopComponent.tempComponents;
    workshopComponent.tempComponents = [];
    workshopComponent.currentlySelectedComponentForCopyNested = null;
    workshopComponent.currentlyHoveredComponentForCopyNested = null;
  }

  private static toggleCopyNestedComponentMode(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
    const workshopEventCallback: WorkshopEventCallback = {
      keyTriggers, func: CopyNestedComponedModeToggleOff.toggleCopyNestedComponentModeOff.bind(this, workshopComponent, optionsComponent) };
    workshopComponent.addWorkshopEventCallback(workshopEventCallback);
  }

  private static toggleOn(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    workshopComponent.tempComponents = workshopComponent.components;
    const componentType = workshopComponent.currentlySelectedComponent.subcomponents[workshopComponent.currentlySelectedComponent.activeSubcomponentName]
      .seedComponent.ref.type;
    (workshopComponent.components as WorkshopComponent[]) = workshopComponent.components.filter((component: WorkshopComponent) => component.type === componentType);
    ToggleCopyNestedComponentModeState.toggleCopyNestedComponentMode(workshopComponent, optionsComponent);
  }
  
  public static toggle(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    if (optionsComponent.isCopyNestedComponentModeActive) {
      ToggleCopyNestedComponentModeState.toggleOn(workshopComponent, optionsComponent);
    } else {
      ToggleCopyNestedComponentModeState.toggleOff(workshopComponent);
    }
    workshopComponent.isCopyNestedComponentModeActive = optionsComponent.isCopyNestedComponentModeActive;
  }
}

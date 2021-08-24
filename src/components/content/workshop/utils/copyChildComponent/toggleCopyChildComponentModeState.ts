import { CopyChildComponedModeToggleOff } from '../../toolbar/options/copyChildComponent/modeUtils/copyChildComponentModeToggleOff';
import { WorkshopEventCallback } from '../../../../../interfaces/workshopEventCallback';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

export class ToggleCopyChildComponentModeState {

  private static toggleOff(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }): void {
    workshopComponent.components = workshopComponent.tempComponents;
    workshopComponent.tempComponents = [];
    workshopComponent.currentlySelectedComponentForCopyChild = null;
    workshopComponent.currentlyHoveredComponentForCopyChild = null;
  }

  private static toggleCopyChildComponentMode(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
    const workshopEventCallback: WorkshopEventCallback = {
      keyTriggers, func: CopyChildComponedModeToggleOff.toggleCopyChildComponentModeOff.bind(this, workshopComponent, optionsComponent) };
    workshopComponent.addWorkshopEventCallback(workshopEventCallback);
  }

  private static toggleOn(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    workshopComponent.tempComponents = workshopComponent.components;
    const componentType = workshopComponent.currentlySelectedComponent.subcomponents[workshopComponent.currentlySelectedComponent.activeSubcomponentName]
      .seedComponent.ref.type;
    (workshopComponent.components as WorkshopComponent[]) = workshopComponent.components.filter((component: WorkshopComponent) => component.type === componentType);
    ToggleCopyChildComponentModeState.toggleCopyChildComponentMode(workshopComponent, optionsComponent);
  }
  
  public static toggle(workshopComponent: ComponentOptions & { components: WorkshopComponent[] }, optionsComponent: ComponentOptions): void {
    if (optionsComponent.isCopyChildComponentModeActive) {
      ToggleCopyChildComponentModeState.toggleOn(workshopComponent, optionsComponent);
    } else {
      ToggleCopyChildComponentModeState.toggleOff(workshopComponent);
    }
    workshopComponent.isCopyChildComponentModeActive = optionsComponent.isCopyChildComponentModeActive;
  }
}

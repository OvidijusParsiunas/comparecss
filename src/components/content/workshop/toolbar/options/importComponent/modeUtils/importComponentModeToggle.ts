import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/expandedModalPreviewMode/consts/sharedConsts';
import { ToggleImportComponentModeEvent } from '../../../../../../../interfaces/toggleImportComponentModeEvent';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../../interfaces/workshopEventCallback';
import { ImportComponedModeToggleOff } from './importComponentModeToggleOff';
import { ComponentOptions } from 'vue';

export default class ImportComponentModeToggleUtils {

  private static toggleImportComponentMode(optionsComponent: ComponentOptions): void {
    const toggleImportComponentModeEvent: ToggleImportComponentModeEvent = [optionsComponent.isImportComponentModeActive];
    if (optionsComponent.isImportComponentModeActive) {
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: ImportComponedModeToggleOff.toggleImportComponentModeOff.bind(this, optionsComponent) };
      toggleImportComponentModeEvent[1] = workshopEventCallback;
    }
    optionsComponent.$emit('toggle-import-subcomponent-mode', toggleImportComponentModeEvent);
  }

  private static toggleDuringExpandedModalMode(optionsComponent: ComponentOptions): boolean {
    if (optionsComponent.isExpandedModalPreviewModeActive) {
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasImportComponentModeClosedExpandedModal = true;
    } else if (optionsComponent.hasImportComponentModeClosedExpandedModal) {
      setTimeout(() => {
        ImportComponentModeToggleUtils.toggleImportComponentMode(optionsComponent);
        optionsComponent.hasImportComponentModeClosedExpandedModal = false;
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
      optionsComponent.toggleModalExpandMode();
      return true;
    }
    return false;
  }

  public static toggleSubcomponentImport(optionsComponent: ComponentOptions): void {
    optionsComponent.isImportComponentModeActive = !optionsComponent.isImportComponentModeActive;
    if (optionsComponent.isImportComponentModeActive) {
      optionsComponent.hideSettings();
    } else {
      ImportComponedModeToggleOff.displayOptionSettings(optionsComponent);
    }
    const hasBeenToggled = ImportComponentModeToggleUtils.toggleDuringExpandedModalMode(optionsComponent);
    if (!hasBeenToggled) ImportComponentModeToggleUtils.toggleImportComponentMode(optionsComponent);
  }
}

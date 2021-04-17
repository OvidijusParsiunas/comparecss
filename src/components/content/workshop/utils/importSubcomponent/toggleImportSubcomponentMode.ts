import { CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER, OPTION_MENU_BUTTON_MARKER } from '../../../../../consts/elementClassMarkers';
import { TOOLBAR_FADE_TRANSITION_DURATION_MILLISECONDS } from '../../componentPreview/utils/expandedModalPreviewMode/consts/sharedConsts';
import { ToggleImportSubcomponentModeEvent } from '../../../../../interfaces/toggleImportSubcomponentModeEvent';
import { WorkshopEventCallbackReturn } from '../../../../../interfaces/workshopEventCallbackReturn';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../interfaces/workshopEventCallback';
import { ComponentOptions } from 'vue';

export default class ToggleImportSubcomponentMode {

  private static displayOptionSettings(optionsComponent: ComponentOptions): void {
    if (optionsComponent.activeOption.buttonName) {
      const defaultOption = optionsComponent.getDefaultOption();
      optionsComponent.selectOption(defaultOption); 
    }
  }

  private static removeTempCustomProperties(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    if (subcomponents[activeSubcomponentName].tempCustomProperties) {
      delete subcomponents[activeSubcomponentName].tempCustomProperties;
    }
  }

  private static toggleOff(optionsComponent: ComponentOptions): WorkshopEventCallbackReturn {
    optionsComponent.isImportSubcomponentModeActive = !optionsComponent.isImportSubcomponentModeActive;
    ToggleImportSubcomponentMode.displayOptionSettings(optionsComponent);
    if (optionsComponent.hasImportSubcomponentModeClosedExpandedModal) {
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasImportSubcomponentModeClosedExpandedModal = false;
      setTimeout(() => {
        optionsComponent.$emit('toggle-import-subcomponent-mode', [false] as ToggleImportSubcomponentModeEvent);
      }, TOOLBAR_FADE_TRANSITION_DURATION_MILLISECONDS);
    } else {
      optionsComponent.$emit('toggle-import-subcomponent-mode', [false] as ToggleImportSubcomponentModeEvent);
    }
    ToggleImportSubcomponentMode.removeTempCustomProperties(optionsComponent);
    return { shouldRepeat: false };
  }

  private static getButtonElement(clickedElement: HTMLElement): HTMLElement {
    if (clickedElement.tagName === 'path') {
      clickedElement = clickedElement.parentElement;
    }
    if (clickedElement.tagName === 'svg') {
      clickedElement = clickedElement.parentElement;
    }
    return clickedElement;
  }

  private static resetSubcomponent(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    if (subcomponents[activeSubcomponentName].tempCustomProperties) {
      const { customCss, customFeatures } = subcomponents[activeSubcomponentName].tempCustomProperties;
      subcomponents[activeSubcomponentName].customCss = customCss;
      subcomponents[activeSubcomponentName].customFeatures = customFeatures;
    }
  }

  private static toggleImportSubcomponentModeOff(optionsComponent: ComponentOptions, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        ToggleImportSubcomponentMode.resetSubcomponent(optionsComponent);
        return ToggleImportSubcomponentMode.toggleOff(optionsComponent);
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        return ToggleImportSubcomponentMode.toggleOff(optionsComponent);
      }
      return { shouldRepeat: true };
    }
    const buttonElement = ToggleImportSubcomponentMode.getButtonElement(event.target as HTMLElement);
    if (buttonElement === optionsComponent.$refs.importSubcomponentToggle) {
      ToggleImportSubcomponentMode.resetSubcomponent(optionsComponent);
      ToggleImportSubcomponentMode.removeTempCustomProperties(optionsComponent);
      return { shouldRepeat: false };
    }
    if (buttonElement.classList.contains(EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER)) {
      optionsComponent.hasImportSubcomponentModeClosedExpandedModal = false;
    } else if (buttonElement.classList.contains(CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER)
      || buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)
      || buttonElement.classList.contains(optionsComponent.SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)
      || buttonElement.classList.contains(optionsComponent.CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)) {
        return ToggleImportSubcomponentMode.toggleOff(optionsComponent);
    }
    return { shouldRepeat: true };
  }

  private static toggleImportSubcomponentModeOn(optionsComponent: ComponentOptions): void {
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
    const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: this.toggleImportSubcomponentModeOff.bind(this, optionsComponent) };
    optionsComponent.$emit('toggle-import-subcomponent-mode', [optionsComponent.isImportSubcomponentModeActive, workshopEventCallback] as ToggleImportSubcomponentModeEvent);
  }

  private static toggleDuringExpandedModalMode(optionsComponent: ComponentOptions): boolean {
    if (optionsComponent.isExpandedModalPreviewModeActive) {
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasImportSubcomponentModeClosedExpandedModal = true;
    } else if (optionsComponent.hasImportSubcomponentModeClosedExpandedModal) {
      setTimeout(() => {
        ToggleImportSubcomponentMode.toggleImportSubcomponentModeOn(optionsComponent);
      }, TOOLBAR_FADE_TRANSITION_DURATION_MILLISECONDS);
      optionsComponent.toggleModalExpandMode();
      optionsComponent.hasImportSubcomponentModeClosedExpandedModal = false;
      return true;
    }
    return false;
  }

  public static toggleSubcomponentImport(optionsComponent: ComponentOptions): void {
    optionsComponent.isImportSubcomponentModeActive = !optionsComponent.isImportSubcomponentModeActive;
    const hasBeenToggled = ToggleImportSubcomponentMode.toggleDuringExpandedModalMode(optionsComponent);
    if (optionsComponent.isImportSubcomponentModeActive) {
      optionsComponent.hideSettings();
    } else {
      ToggleImportSubcomponentMode.displayOptionSettings(optionsComponent);
    }
    if (!hasBeenToggled) ToggleImportSubcomponentMode.toggleImportSubcomponentModeOn(optionsComponent);
  }
}

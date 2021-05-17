import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/expandedModalPreviewMode/consts/sharedConsts';
import { ToggleImportComponentModeEvent } from '../../../../../../../interfaces/toggleImportComponentModeEvent';
import { WorkshopEventCallbackReturn } from '../../../../../../../interfaces/workshopEventCallbackReturn';
import { WorkshopEventCallbackUtils } from '../../workshopEventCallbackUtils/workshopEventCallbackUtils';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { ImportComponentModeTempPropertiesUtils } from './importComponentModeTempPropertiesUtils';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';
import {
  OPTION_MENU_BUTTON_MARKER, OPTION_MENU_SETTING_OPTION_BUTTON_MARKER, FULL_PREVIEW_MODE_BUTTON_MARKER,
  CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER,
} from '../../../../../../../consts/elementClassMarkers';

export class ImportComponedModeToggleOff {
  
  public static displayOptionSettings(optionsComponent: ComponentOptions, isWaitFadeAnimation?: boolean): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    if (optionsComponent.activeOption.buttonName && subcomponents[activeSubcomponentName].subcomponentDisplayStatus.isDisplayed) {
      const defaultOption = optionsComponent.getDefaultOption();
      // timeout used for the inSync button animation to work
      setTimeout(() => {
        optionsComponent.selectOption(defaultOption);
      }, isWaitFadeAnimation || optionsComponent.hasImportComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
  }

  public static removeTemporaryProperties(optionsComponent: ComponentOptions): void {
    const { optionsComponent: activeComponent, hasImportComponentModeClosedExpandedModal } = optionsComponent;
    setTimeout(() => {
      ImportComponentModeTempPropertiesUtils.removeTempCustomProperties(activeComponent);
      ImportComponentModeTempPropertiesUtils.deleteLastSelectedSubcomponentToImport(activeComponent);
    }, hasImportComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0)
  }

  private static toggleOff(optionsComponent: ComponentOptions, toggleOptionSettings: boolean): WorkshopEventCallbackReturn {
    optionsComponent.isImportComponentModeActive = !optionsComponent.isImportComponentModeActive;
    if (!toggleOptionSettings) ImportComponedModeToggleOff.displayOptionSettings(optionsComponent);
    if (optionsComponent.hasImportComponentModeClosedExpandedModal) {
      // the following timeout is a fix for when the user clicks the full preview mode toggle as toolbar blinks before moving to the right
      setTimeout(() => {
        optionsComponent.toggleModalExpandMode();
      });
      setTimeout(() => {
        optionsComponent.hasImportComponentModeClosedExpandedModal = false;
        optionsComponent.$emit('toggle-import-subcomponent-mode', [false] as ToggleImportComponentModeEvent);
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
    } else {
      optionsComponent.$emit('toggle-import-subcomponent-mode', [false] as ToggleImportComponentModeEvent);
    }
    ImportComponedModeToggleOff.removeTemporaryProperties(optionsComponent);
    return { shouldRepeat: false };
  }

  private static setImportedComponentProperties(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    if (subcomponents[activeSubcomponentName].importedComponent.lastSelectedComponentToImport) {
      subcomponents[activeSubcomponentName].importedComponent.componentRef.componentStatus = subcomponents[activeSubcomponentName]
        .importedComponent.lastSelectedComponentToImport.componentStatus;
      // timeout used to not display the animation immediately if expanded modal mode has been temporarily closed
      setTimeout(() => {
        subcomponents[activeSubcomponentName].importedComponent.inSync = true;
        subcomponents[activeSubcomponentName].subcomponentDisplayStatus.isDisplayed = true;
      }, optionsComponent.hasImportComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
    ImportComponedModeToggleOff.toggleOff(optionsComponent, false);
  }

  public static resetComponent(activeComponent: WorkshopComponent, isWaitFadeAnimation: boolean): void {
    setTimeout(() => {
      ImportComponentModeTempPropertiesUtils.resetComponent(activeComponent);
    }, isWaitFadeAnimation ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
  }

  public static toggleImportComponentModeOff(optionsComponent: ComponentOptions, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        ImportComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasImportComponentModeClosedExpandedModal);
        return ImportComponedModeToggleOff.toggleOff(optionsComponent, false);
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        optionsComponent.temporarilyAllowOptionAnimations(ImportComponedModeToggleOff.setImportedComponentProperties.bind(this, optionsComponent), true, true);
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    }
    const buttonElement = WorkshopEventCallbackUtils.getButtonElement(event.target as HTMLElement);
    if (buttonElement === optionsComponent.$refs.importComponentToggle) {
      ImportComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasImportComponentModeClosedExpandedModal);
      // WORK1 - can use this for all
      ImportComponedModeToggleOff.removeTemporaryProperties(optionsComponent);
      return { shouldRepeat: false };
    }
    if (buttonElement.classList.contains(CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER)) {
      optionsComponent.temporarilyAllowOptionAnimations(ImportComponedModeToggleOff.setImportedComponentProperties.bind(this, optionsComponent), true, true);
      return { shouldRepeat: false };
    } 
    if (buttonElement.classList.contains(EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER)) {
      optionsComponent.hasImportComponentModeClosedExpandedModal = false;
      ImportComponedModeToggleOff.resetComponent(optionsComponent.component, true);
      ImportComponedModeToggleOff.displayOptionSettings(optionsComponent, true);
      return ImportComponedModeToggleOff.toggleOff(optionsComponent, true);
    }
    if (buttonElement.classList.contains(OPTION_MENU_SETTING_OPTION_BUTTON_MARKER)
        || buttonElement.classList.contains(FULL_PREVIEW_MODE_BUTTON_MARKER)) {
      ImportComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasImportComponentModeClosedExpandedModal);
      return ImportComponedModeToggleOff.toggleOff(optionsComponent, true);
    }
    if (buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)
        || buttonElement.classList.contains(optionsComponent.SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)
        || buttonElement.classList.contains(optionsComponent.CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)) {
      ImportComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasImportComponentModeClosedExpandedModal);
      return ImportComponedModeToggleOff.toggleOff(optionsComponent, false);
    }
    return { shouldRepeat: true };
  }
}

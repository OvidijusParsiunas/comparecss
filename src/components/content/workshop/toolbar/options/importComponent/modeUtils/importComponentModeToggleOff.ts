import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/animations/consts/sharedConsts';
import { ToggleImportComponentModeEvent } from '../../../../../../../interfaces/toggleImportComponentModeEvent';
import { WorkshopEventCallbackReturn } from '../../../../../../../interfaces/workshopEventCallbackReturn';
import { WorkshopEventCallbackUtils } from '../../workshopEventCallbackUtils/workshopEventCallbackUtils';
import { ImportComponentModeTempPropertiesUtils } from './importComponentModeTempPropertiesUtils';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';
import {
  OPTION_MENU_BUTTON_MARKER, OPTION_MENU_SETTING_OPTION_BUTTON_MARKER, COMPONENT_PREVIEW_MARKER, COMPONENT_CARD_MARKER,
  CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER, FULL_PREVIEW_MODE_BUTTON_MARKER, TOGGLE_SUBCOMPONENT_BUTTON_MARKER,
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
    return { shouldRepeat: false };
  }

  private static setImportedComponentProperties(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    if (subcomponents[activeSubcomponentName].nestedComponent.lastSelectedComponentToImport) {
      subcomponents[activeSubcomponentName].nestedComponent.ref.componentStatus = subcomponents[activeSubcomponentName]
        .nestedComponent.lastSelectedComponentToImport.componentStatus;
      // timeout used to not display the animation immediately if expanded modal mode has been temporarily closed
      setTimeout(() => {
        const wasRemoved = !subcomponents[activeSubcomponentName].subcomponentDisplayStatus.isDisplayed;
        subcomponents[activeSubcomponentName].subcomponentDisplayStatus.isDisplayed = true;
        if (wasRemoved) ImportComponedModeToggleOff.displayOptionSettings(optionsComponent);
        // timeout used to make sure that when a subcomponent was removed - the options buttons are displayed before the sync animation starts as they will
        // come from top left side of the screen
        setTimeout(() => {
          subcomponents[activeSubcomponentName].nestedComponent.inSync = true;
        });
      }, optionsComponent.hasImportComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
    ImportComponentModeTempPropertiesUtils.cleanComponent(optionsComponent.component, false);
    ImportComponentModeTempPropertiesUtils.deleteLastSelectedSubcomponentToImport(optionsComponent.component);
    ImportComponedModeToggleOff.toggleOff(optionsComponent, false);
  }

  public static resetComponent(activeComponent: WorkshopComponent, isWaitFadeAnimation: boolean): void {
    // timeout is used to not reset component imemdiately when the expanded modal mode has been closed by the import mode
    setTimeout(() => {
      ImportComponentModeTempPropertiesUtils.cleanComponent(activeComponent, true);
    }, isWaitFadeAnimation ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    ImportComponentModeTempPropertiesUtils.deleteLastSelectedSubcomponentToImport(activeComponent);
  }

  public static toggleImportComponentModeOff(workshopComponent: ComponentOptions, optionsComponent: ComponentOptions, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
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
    const targetElement = WorkshopEventCallbackUtils.getParentElementIfSvg(event.target as HTMLElement);
    if (targetElement === optionsComponent.$refs.importComponentToggle) {
      ImportComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasImportComponentModeClosedExpandedModal);
      return { shouldRepeat: false };
    }
    if (targetElement.classList.contains(CONFIRM_SUBCOMPONENT_TO_IMPORT_MARKER)) {
      optionsComponent.temporarilyAllowOptionAnimations(ImportComponedModeToggleOff.setImportedComponentProperties.bind(this, optionsComponent), true, true);
      return { shouldRepeat: false };
    } 
    if (targetElement.classList.contains(EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER)) {
      optionsComponent.hasImportComponentModeClosedExpandedModal = false;
      ImportComponedModeToggleOff.resetComponent(optionsComponent.component, true);
      ImportComponedModeToggleOff.displayOptionSettings(optionsComponent, true);
      return ImportComponedModeToggleOff.toggleOff(optionsComponent, true);
    }
    if (targetElement.classList.contains(OPTION_MENU_SETTING_OPTION_BUTTON_MARKER)
        || targetElement.classList.contains(FULL_PREVIEW_MODE_BUTTON_MARKER)) {
      ImportComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasImportComponentModeClosedExpandedModal);
      return ImportComponedModeToggleOff.toggleOff(optionsComponent, true);
    }
    if (targetElement.classList.contains(TOGGLE_SUBCOMPONENT_BUTTON_MARKER)) {
      const { subcomponents, activeSubcomponentName } = optionsComponent.component;
      if (workshopComponent.currentlySelectedImportComponent && subcomponents[activeSubcomponentName].subcomponentDisplayStatus.isDisplayedTemporarily) {
        ImportComponentModeTempPropertiesUtils.removeTempProperties(optionsComponent.component);
      }
      ImportComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasImportComponentModeClosedExpandedModal);
      return ImportComponedModeToggleOff.toggleOff(optionsComponent, false);
    }
    if (targetElement.classList.contains(OPTION_MENU_BUTTON_MARKER)
        || targetElement.classList.contains(optionsComponent.SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)
        || targetElement.classList.contains(optionsComponent.CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)) {
      ImportComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasImportComponentModeClosedExpandedModal);
      return ImportComponedModeToggleOff.toggleOff(optionsComponent, false);
    }
    // if a component card has been selected and the user clicks on the background - reset
    if (!targetElement.classList.contains(COMPONENT_CARD_MARKER) && !targetElement.classList.contains(COMPONENT_PREVIEW_MARKER)
        && workshopComponent.currentlySelectedImportComponent) {
      ImportComponentModeTempPropertiesUtils.cleanComponent(optionsComponent.component, true);
      workshopComponent.currentlySelectedImportComponent = null;
    }
    return { shouldRepeat: true };
  }
}

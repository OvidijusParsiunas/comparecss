import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/animations/consts/sharedConsts';
import { ToggleCopyNestedComponentModeEvent } from '../../../../../../../interfaces/toggleCopyNestedComponentModeEvent';
import { WorkshopEventCallbackReturn } from '../../../../../../../interfaces/workshopEventCallbackReturn';
import { CopyNestedComponentModeTempPropertiesUtils } from './copyNestedComponentModeTempPropertiesUtils';
import { WorkshopEventCallbackUtils } from '../../workshopEventCallbackUtils/workshopEventCallbackUtils';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';
import {
  OPTION_MENU_BUTTON_MARKER, OPTION_MENU_SETTING_OPTION_BUTTON_MARKER, COMPONENT_PREVIEW_MARKER, COMPONENT_CARD_MARKER,
  CONFIRM_NESTED_COMPONENT_TO_COPY_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER, FULL_PREVIEW_MODE_BUTTON_MARKER, REMOVE_SUBCOMPONENT_BUTTON_MARKER,
} from '../../../../../../../consts/elementClassMarkers';

export class CopyNestedComponedModeToggleOff {
  
  public static displayOptionSettings(optionsComponent: ComponentOptions, isWaitFadeAnimation?: boolean): void {
    if (optionsComponent.activeOption.buttonName) {
      const defaultOption = optionsComponent.getDefaultOption();
      // timeout used for the inSync button animation to work
      setTimeout(() => {
        optionsComponent.selectOption(defaultOption);
      }, isWaitFadeAnimation || optionsComponent.hasCopyNestedComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
  }

  private static toggleOff(optionsComponent: ComponentOptions, toggleOptionSettings: boolean): WorkshopEventCallbackReturn {
    optionsComponent.isCopyNestedComponentModeActive = !optionsComponent.isCopyNestedComponentModeActive;
    if (!toggleOptionSettings) CopyNestedComponedModeToggleOff.displayOptionSettings(optionsComponent);
    if (optionsComponent.hasCopyNestedComponentModeClosedExpandedModal) {
      // the following timeout is a fix for when the user clicks the full preview mode toggle as toolbar blinks before moving to the right
      setTimeout(() => {
        optionsComponent.toggleModalExpandMode();
      });
      setTimeout(() => {
        optionsComponent.hasCopyNestedComponentModeClosedExpandedModal = false;
        optionsComponent.$emit('toggle-copy-nested-component-mode', [false] as ToggleCopyNestedComponentModeEvent);
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
    } else {
      optionsComponent.$emit('toggle-copy-nested-component-mode', [false] as ToggleCopyNestedComponentModeEvent);
    }
    return { shouldRepeat: false };
  }

  private static setCopiedNestedComponentProperties(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component;
    if (subcomponents[activeSubcomponentName].nestedComponent.lastSelectedComponentToCopy) {
      subcomponents[activeSubcomponentName].nestedComponent.ref.componentStatus = subcomponents[activeSubcomponentName]
        .nestedComponent.lastSelectedComponentToCopy.componentStatus;
      // timeout used to not display the animation immediately if expanded modal mode has been temporarily closed
      setTimeout(() => {
          subcomponents[activeSubcomponentName].nestedComponent.inSync = true;
      }, optionsComponent.hasCopyNestedComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
    CopyNestedComponentModeTempPropertiesUtils.cleanComponent(optionsComponent.component, false);
    CopyNestedComponentModeTempPropertiesUtils.deleteLastSelectedComponentToCopy(optionsComponent.component);
    CopyNestedComponedModeToggleOff.toggleOff(optionsComponent, false);
  }

  public static resetComponent(activeComponent: WorkshopComponent, isWaitFadeAnimation: boolean): void {
    // timeout is used to not reset component immediately when the expanded modal mode has been closed by the copy nested component mode
    setTimeout(() => {
      CopyNestedComponentModeTempPropertiesUtils.cleanComponent(activeComponent, true);
    }, isWaitFadeAnimation ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    CopyNestedComponentModeTempPropertiesUtils.deleteLastSelectedComponentToCopy(activeComponent);
  }

  public static toggleCopyNestedComponentModeOff(workshopComponent: ComponentOptions, optionsComponent: ComponentOptions, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        CopyNestedComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasCopyNestedComponentModeClosedExpandedModal);
        return CopyNestedComponedModeToggleOff.toggleOff(optionsComponent, false);
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        optionsComponent.temporarilyAllowOptionAnimations(CopyNestedComponedModeToggleOff.setCopiedNestedComponentProperties.bind(this, optionsComponent), true, true);
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    }
    const targetElement = WorkshopEventCallbackUtils.getParentElementIfSvg(event.target as HTMLElement);
    if (targetElement === optionsComponent.$refs.copyNestedComponentToggle) {
      CopyNestedComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasCopyNestedComponentModeClosedExpandedModal);
      return { shouldRepeat: false };
    }
    if (targetElement.classList.contains(CONFIRM_NESTED_COMPONENT_TO_COPY_MARKER)) {
      optionsComponent.temporarilyAllowOptionAnimations(CopyNestedComponedModeToggleOff.setCopiedNestedComponentProperties.bind(this, optionsComponent), true, true);
      return { shouldRepeat: false };
    } 
    if (targetElement.classList.contains(EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER)) {
      optionsComponent.hasCopyNestedComponentModeClosedExpandedModal = false;
      CopyNestedComponedModeToggleOff.resetComponent(optionsComponent.component, true);
      CopyNestedComponedModeToggleOff.displayOptionSettings(optionsComponent, true);
      return CopyNestedComponedModeToggleOff.toggleOff(optionsComponent, true);
    }
    if (targetElement.classList.contains(OPTION_MENU_SETTING_OPTION_BUTTON_MARKER)
        || targetElement.classList.contains(FULL_PREVIEW_MODE_BUTTON_MARKER)) {
      CopyNestedComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasCopyNestedComponentModeClosedExpandedModal);
      return CopyNestedComponedModeToggleOff.toggleOff(optionsComponent, true);
    }
    if (targetElement.classList.contains(REMOVE_SUBCOMPONENT_BUTTON_MARKER)) {
      CopyNestedComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasCopyNestedComponentModeClosedExpandedModal);
      return CopyNestedComponedModeToggleOff.toggleOff(optionsComponent, false);
    }
    if (targetElement.classList.contains(OPTION_MENU_BUTTON_MARKER)
        || targetElement.classList.contains(optionsComponent.SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)
        || targetElement.classList.contains(optionsComponent.CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)) {
      CopyNestedComponedModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasCopyNestedComponentModeClosedExpandedModal);
      return CopyNestedComponedModeToggleOff.toggleOff(optionsComponent, false);
    }
    // if a component card has been selected and the user clicks on the background - reset
    if (!targetElement.classList.contains(COMPONENT_CARD_MARKER) && !targetElement.classList.contains(COMPONENT_PREVIEW_MARKER)
        && workshopComponent.currentlySelectedComponentForCopyNested) {
      CopyNestedComponentModeTempPropertiesUtils.cleanComponent(optionsComponent.component, true);
      workshopComponent.currentlySelectedComponentForCopyNested = null;
    }
    return { shouldRepeat: true };
  }
}

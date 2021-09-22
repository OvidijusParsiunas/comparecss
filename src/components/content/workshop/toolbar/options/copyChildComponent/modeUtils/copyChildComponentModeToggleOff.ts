import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/animations/consts/sharedConsts';
import { ToggleCopyChildComponentModeEvent } from '../../../../../../../interfaces/toggleCopyChildComponentModeEvent';
import { WorkshopEventCallbackReturn } from '../../../../../../../interfaces/workshopEventCallbackReturn';
import { WorkshopEventCallbackUtils } from '../../workshopEventCallbackUtils/workshopEventCallbackUtils';
import { CopyChildComponentModeTempPropertiesUtils } from './copyChildComponentModeTempPropertiesUtils';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SyncedComponent } from '../syncedComponent';
import { ComponentOptions } from 'vue';
import {
  CONFIRM_CHILD_COMPONENT_TO_COPY_MARKER, COMPONENT_CARD_MARKER, FULL_PREVIEW_MODE_BUTTON_MARKER, REMOVE_CHILD_COMPONENT_BUTTON_MARKER,
  OPTION_MENU_BUTTON_MARKER, OPTION_MENU_SETTING_OPTION_BUTTON_MARKER, COMPONENT_PREVIEW_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER,
} from '../../../../../../../consts/elementClassMarkers';

export class CopyChildComponentModeToggleOff {
  
  public static displayOptionSettings(optionsComponent: ComponentOptions, isWaitFadeAnimation?: boolean): void {
    if (optionsComponent.activeOption.buttonName) {
      const defaultOption = optionsComponent.getDefaultOption();
      // timeout used for the inSync button animation to work
      setTimeout(() => {
        optionsComponent.selectOption(defaultOption);
      }, isWaitFadeAnimation || optionsComponent.hasCopyChildComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
  }

  private static toggleOff(optionsComponent: ComponentOptions, toggleOptionSettings: boolean): WorkshopEventCallbackReturn {
    optionsComponent.isCopyChildComponentModeActive = !optionsComponent.isCopyChildComponentModeActive;
    if (!toggleOptionSettings) CopyChildComponentModeToggleOff.displayOptionSettings(optionsComponent);
    if (optionsComponent.hasCopyChildComponentModeClosedExpandedModal) {
      // the following timeout is a fix for when the user clicks the full preview mode toggle as toolbar blinks before moving to the right
      setTimeout(() => {
        optionsComponent.toggleModalExpandMode();
      });
      setTimeout(() => {
        optionsComponent.hasCopyChildComponentModeClosedExpandedModal = false;
        optionsComponent.$emit('toggle-copy-child-component-mode', [false] as ToggleCopyChildComponentModeEvent);
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
    } else {
      optionsComponent.$emit('toggle-copy-child-component-mode', [false] as ToggleCopyChildComponentModeEvent);
    }
    return { shouldRepeat: false };
  }

  private static updateComponentsSyncedToThis(component: WorkshopComponent): void {
    const inSyncParentComponent = SyncedComponent.getParentComponentWithComponentsSyncedToIt(component);
    if (inSyncParentComponent) {
      CopyChildComponentModeTempPropertiesUtils.copyComponentToMultipleTargets(inSyncParentComponent, inSyncParentComponent.sync.componentsSyncedToThis);
    }
  }

  private static setCopiedChildComponentProperties(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component as WorkshopComponent;
    const activeSeedComponent = subcomponents[activeSubcomponentName].seedComponent;
    if (activeSeedComponent.sync.lastSelectedComponentToSync) {
      // saving reference as it gets removed before timeout gets executed
      const lastSelectedComponentToSync = activeSeedComponent.sync.lastSelectedComponentToSync;
      activeSeedComponent.componentStatus = lastSelectedComponentToSync.componentStatus;
      // timeout used to not display the animation immediately if expanded modal mode has been temporarily closed
      setTimeout(() => {
        activeSeedComponent.sync.componentThisIsSyncedTo = lastSelectedComponentToSync;
        lastSelectedComponentToSync.sync.componentsSyncedToThis.add(activeSeedComponent);
        CopyChildComponentModeToggleOff.updateComponentsSyncedToThis(activeSeedComponent);
      }, optionsComponent.hasCopyChildComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
    CopyChildComponentModeTempPropertiesUtils.cleanComponent(optionsComponent.component, false);
    CopyChildComponentModeTempPropertiesUtils.deleteLastSelectedComponentToCopy(optionsComponent.component);
    CopyChildComponentModeToggleOff.toggleOff(optionsComponent, false);
  }

  public static resetComponent(activeComponent: WorkshopComponent, isWaitFadeAnimation: boolean): void {
    // timeout is used to not reset component immediately when the expanded modal mode has been closed by the copy child component mode
    setTimeout(() => {
      CopyChildComponentModeTempPropertiesUtils.cleanComponent(activeComponent);
    }, isWaitFadeAnimation ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    CopyChildComponentModeTempPropertiesUtils.deleteLastSelectedComponentToCopy(activeComponent);
  }

  public static toggleCopyChildComponentModeOff(workshopComponent: ComponentOptions, optionsComponent: ComponentOptions, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        CopyChildComponentModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasCopyChildComponentModeClosedExpandedModal);
        return CopyChildComponentModeToggleOff.toggleOff(optionsComponent, false);
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        optionsComponent.temporarilyAllowOptionAnimations(CopyChildComponentModeToggleOff.setCopiedChildComponentProperties.bind(this, optionsComponent), true, true);
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    }
    const targetElement = WorkshopEventCallbackUtils.getParentElementIfSvg(event.target as HTMLElement);
    if (targetElement === optionsComponent.$refs.copyChildComponentToggle) {
      CopyChildComponentModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasCopyChildComponentModeClosedExpandedModal);
      return { shouldRepeat: false };
    }
    if (targetElement.classList.contains(CONFIRM_CHILD_COMPONENT_TO_COPY_MARKER)) {
      optionsComponent.temporarilyAllowOptionAnimations(CopyChildComponentModeToggleOff.setCopiedChildComponentProperties.bind(this, optionsComponent), true, true);
      return { shouldRepeat: false };
    } 
    if (targetElement.classList.contains(EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER)) {
      optionsComponent.hasCopyChildComponentModeClosedExpandedModal = false;
      CopyChildComponentModeToggleOff.resetComponent(optionsComponent.component, true);
      CopyChildComponentModeToggleOff.displayOptionSettings(optionsComponent, true);
      return CopyChildComponentModeToggleOff.toggleOff(optionsComponent, true);
    }
    if (targetElement.classList.contains(OPTION_MENU_SETTING_OPTION_BUTTON_MARKER)
        || targetElement.classList.contains(FULL_PREVIEW_MODE_BUTTON_MARKER)) {
      CopyChildComponentModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasCopyChildComponentModeClosedExpandedModal);
      return CopyChildComponentModeToggleOff.toggleOff(optionsComponent, true);
    }
    if (targetElement.classList.contains(REMOVE_CHILD_COMPONENT_BUTTON_MARKER)) {
      CopyChildComponentModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasCopyChildComponentModeClosedExpandedModal);
      return CopyChildComponentModeToggleOff.toggleOff(optionsComponent, false);
    }
    if (targetElement.classList.contains(OPTION_MENU_BUTTON_MARKER)
        || targetElement.classList.contains(optionsComponent.SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)
        || targetElement.classList.contains(optionsComponent.CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)
        || targetElement.classList.contains(optionsComponent.ADD_CHILD_COMPONENT_DROPDOWN_UNIQUE_IDENTIFIER)) {
      CopyChildComponentModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasCopyChildComponentModeClosedExpandedModal);
      return CopyChildComponentModeToggleOff.toggleOff(optionsComponent, false);
    }
    // if a component card has been selected and the user clicks on the background - reset
    if (!targetElement.classList.contains(COMPONENT_CARD_MARKER) && !targetElement.classList.contains(COMPONENT_PREVIEW_MARKER)
        && workshopComponent.currentlySelectedComponentForCopyChild) {
      CopyChildComponentModeTempPropertiesUtils.cleanComponent(optionsComponent.component);
      workshopComponent.currentlySelectedComponentForCopyChild = null;
    }
    return { shouldRepeat: true };
  }
}

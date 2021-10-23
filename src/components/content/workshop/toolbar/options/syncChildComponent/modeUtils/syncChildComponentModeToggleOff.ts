import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/animations/consts/sharedConsts';
import { ToggleSyncChildComponentModeEvent } from '../../../../../../../interfaces/toggleSyncChildComponentModeEvent';
import { WorkshopEventCallbackReturn } from '../../../../../../../interfaces/workshopEventCallbackReturn';
import { WorkshopEventCallbackUtils } from '../../workshopEventCallbackUtils/workshopEventCallbackUtils';
import { SyncChildComponentModeTempPropertiesUtils } from './syncChildComponentModeTempPropertiesUtils';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SyncChildComponentUtils } from '../syncChildComponentUtils';
import { ComponentOptions } from 'vue';
import {
  CONFIRM_CHILD_COMPONENT_TO_SYNC_MARKER, COMPONENT_CARD_MARKER, FULL_PREVIEW_MODE_BUTTON_MARKER, REMOVE_CHILD_COMPONENT_BUTTON_MARKER,
  OPTION_MENU_BUTTON_MARKER, OPTION_MENU_SETTING_OPTION_BUTTON_MARKER, COMPONENT_PREVIEW_MARKER, EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER,
} from '../../../../../../../consts/elementClassMarkers';

export class SyncChildComponentModeToggleOff {
  
  public static displayOptionSettings(optionsComponent: ComponentOptions, isWaitFadeAnimation?: boolean): void {
    if (optionsComponent.activeOption.buttonName) {
      const defaultOption = optionsComponent.getDefaultOption();
      // timeout used for the inSync button animation to work
      setTimeout(() => {
        optionsComponent.selectOption(defaultOption);
      }, isWaitFadeAnimation || optionsComponent.hasSyncChildComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
  }

  private static toggleOff(optionsComponent: ComponentOptions, toggleOptionSettings: boolean): WorkshopEventCallbackReturn {
    optionsComponent.isSyncChildComponentModeActive = !optionsComponent.isSyncChildComponentModeActive;
    if (!toggleOptionSettings) SyncChildComponentModeToggleOff.displayOptionSettings(optionsComponent);
    if (optionsComponent.hasSyncChildComponentModeClosedExpandedModal) {
      // the following timeout is a fix for when the user clicks the full preview mode toggle as toolbar blinks before moving to the right
      setTimeout(() => {
        optionsComponent.toggleModalExpandMode();
      });
      setTimeout(() => {
        optionsComponent.hasSyncChildComponentModeClosedExpandedModal = false;
        optionsComponent.$emit('toggle-sync-child-component-mode', [false] as ToggleSyncChildComponentModeEvent);
      }, TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS);
    } else {
      optionsComponent.$emit('toggle-sync-child-component-mode', [false] as ToggleSyncChildComponentModeEvent);
    }
    return { shouldRepeat: false };
  }

  private static updateComponentsSyncedToThis(component: WorkshopComponent): void {
    const parentComponent = SyncChildComponentUtils.getParentComponentWithOtherComponentsSyncedToIt(component);
    if (parentComponent) {
      SyncChildComponentModeTempPropertiesUtils.syncComponentToTargets(parentComponent, ...parentComponent.sync.componentsSyncedToThis);
    }
  }

  private static setSyncedChildComponentProperties(optionsComponent: ComponentOptions): void {
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
        SyncChildComponentModeToggleOff.updateComponentsSyncedToThis(activeSeedComponent);
      }, optionsComponent.hasSyncChildComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
    SyncChildComponentModeTempPropertiesUtils.cleanComponent(optionsComponent.component, false);
    SyncChildComponentModeTempPropertiesUtils.deleteLastSelectedComponentToSync(optionsComponent.component);
    SyncChildComponentModeToggleOff.toggleOff(optionsComponent, false);
  }

  public static resetComponent(activeComponent: WorkshopComponent, isWaitFadeAnimation: boolean): void {
    // timeout is used to not reset component immediately when the expanded modal mode has been closed by the sync child component mode
    setTimeout(() => {
      SyncChildComponentModeTempPropertiesUtils.cleanComponent(activeComponent);
    }, isWaitFadeAnimation ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    SyncChildComponentModeTempPropertiesUtils.deleteLastSelectedComponentToSync(activeComponent);
  }

  public static toggleSyncChildComponentModeOff(workshopComponent: ComponentOptions, optionsComponent: ComponentOptions, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        SyncChildComponentModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasSyncChildComponentModeClosedExpandedModal);
        return SyncChildComponentModeToggleOff.toggleOff(optionsComponent, false);
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        optionsComponent.temporarilyAllowOptionAnimations(SyncChildComponentModeToggleOff.setSyncedChildComponentProperties.bind(this, optionsComponent), true, true);
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    }
    const targetElement = WorkshopEventCallbackUtils.getParentElementIfSvg(event.target as HTMLElement);
    if (targetElement === optionsComponent.$refs.syncChildComponentToggle) {
      SyncChildComponentModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasSyncChildComponentModeClosedExpandedModal);
      return { shouldRepeat: false };
    }
    if (targetElement.classList.contains(CONFIRM_CHILD_COMPONENT_TO_SYNC_MARKER)) {
      optionsComponent.temporarilyAllowOptionAnimations(SyncChildComponentModeToggleOff.setSyncedChildComponentProperties.bind(this, optionsComponent), true, true);
      return { shouldRepeat: false };
    } 
    if (targetElement.classList.contains(EXPANDED_MODAL_PREVIEW_MODE_BUTTON_MARKER)) {
      optionsComponent.hasSyncChildComponentModeClosedExpandedModal = false;
      SyncChildComponentModeToggleOff.resetComponent(optionsComponent.component, true);
      SyncChildComponentModeToggleOff.displayOptionSettings(optionsComponent, true);
      return SyncChildComponentModeToggleOff.toggleOff(optionsComponent, true);
    }
    if (targetElement.classList.contains(OPTION_MENU_SETTING_OPTION_BUTTON_MARKER)
        || targetElement.classList.contains(FULL_PREVIEW_MODE_BUTTON_MARKER)) {
      SyncChildComponentModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasSyncChildComponentModeClosedExpandedModal);
      return SyncChildComponentModeToggleOff.toggleOff(optionsComponent, true);
    }
    if (targetElement.classList.contains(REMOVE_CHILD_COMPONENT_BUTTON_MARKER)) {
      SyncChildComponentModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasSyncChildComponentModeClosedExpandedModal);
      return SyncChildComponentModeToggleOff.toggleOff(optionsComponent, false);
    }
    if (targetElement.classList.contains(OPTION_MENU_BUTTON_MARKER)
        || targetElement.classList.contains(optionsComponent.SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)
        || targetElement.classList.contains(optionsComponent.CSS_PSEUDO_CLASSES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER)
        || targetElement.classList.contains(optionsComponent.ADD_CHILD_COMPONENT_DROPDOWN_UNIQUE_IDENTIFIER)) {
      SyncChildComponentModeToggleOff.resetComponent(optionsComponent.component, optionsComponent.hasSyncChildComponentModeClosedExpandedModal);
      return SyncChildComponentModeToggleOff.toggleOff(optionsComponent, false);
    }
    // if a component card has been selected and the user clicks on the background - reset
    if (!targetElement.classList.contains(COMPONENT_CARD_MARKER) && !targetElement.classList.contains(COMPONENT_PREVIEW_MARKER)
        && workshopComponent.currentlySelectedComponentForSync) {
      SyncChildComponentModeTempPropertiesUtils.cleanComponent(optionsComponent.component);
      workshopComponent.currentlySelectedComponentForSync = null;
    }
    return { shouldRepeat: true };
  }
}

import { TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS } from '../../../../componentPreview/utils/animations/consts/sharedConsts';
import { ToggleSyncChildComponentModeEvent } from '../../../../../../../interfaces/toggleSyncChildComponentModeEvent';
import { WorkshopEventCallbackReturn } from '../../../../../../../interfaces/workshopEventCallbackReturn';
import { WorkshopEventCallbackUtils } from '../../workshopEventCallbackUtils/workshopEventCallbackUtils';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CleanSyncChildComponentMode } from './cleanSyncChildComponentMode';
import { SyncChildComponent } from '../syncChildComponent';
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

  private static finishSyncingComponent(activeComponent: WorkshopComponent, lastSelectedComponentToSync: WorkshopComponent): void {
    activeComponent.sync.componentThisIsSyncedTo = lastSelectedComponentToSync;
    activeComponent.componentStatus = lastSelectedComponentToSync.componentStatus;
    lastSelectedComponentToSync.sync.componentsSyncedToThis.add(activeComponent);
    SyncChildComponent.reSyncComponentsSyncedToThisComponent(activeComponent, activeComponent.type);
    SyncChildComponent.setAutoSyncedSiblingComponentsToInSync(activeComponent, lastSelectedComponentToSync);
    activeComponent.sync.syncExecutables?.on?.(activeComponent, true);
  }

  private static setSyncedChildComponentProperties(optionsComponent: ComponentOptions): void {
    const { subcomponents, activeSubcomponentName } = optionsComponent.component as WorkshopComponent;
    const activeComponent = subcomponents[activeSubcomponentName].seedComponent;
    if (activeComponent.sync.lastSelectedComponentToSync) {
      // saving reference as it gets removed before timeout gets executed
      const lastSelectedComponentToSync = activeComponent.sync.lastSelectedComponentToSync;
      // timeout used to not display the animation immediately if expanded modal mode has been temporarily closed
      setTimeout(() => {
        SyncChildComponentModeToggleOff.finishSyncingComponent(activeComponent, lastSelectedComponentToSync);
      }, optionsComponent.hasSyncChildComponentModeClosedExpandedModal ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    }
    // the reason why cleanComponent is in a timeout is because after confirming sync there is an intermidiate period when the dom
    // has not refreshed to indicate that the component is in sync and the areChildrenComponentsTemporarilySynced are removed
    // causing original properties that were overwritten in ButtonGroupCompositionAPIUtils to be briefly displayed
    // the issue can be replicated by attempting to sync to a button that has a lot of properties like borders and shadows
    setTimeout(() => CleanSyncChildComponentMode.cleanComponent(optionsComponent.component, false));
    CleanSyncChildComponentMode.deleteLastSelectedComponentToSync(optionsComponent.component);
    SyncChildComponentModeToggleOff.toggleOff(optionsComponent, false);
  }

  private static resetComponent(activeComponent: WorkshopComponent, isWaitFadeAnimation: boolean): void {
    // timeout is used to not reset component immediately when the expanded modal mode has been closed by the sync child component mode
    setTimeout(() => {
      CleanSyncChildComponentMode.cleanComponent(activeComponent);
    }, isWaitFadeAnimation ? TOOLBAR_FADE_ANIMATION_DURATION_MILLISECONDS : 0);
    CleanSyncChildComponentMode.deleteLastSelectedComponentToSync(activeComponent);
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
      CleanSyncChildComponentMode.cleanComponent(optionsComponent.component);
      workshopComponent.currentlySelectedComponentForSync = null;
    }
    return { shouldRepeat: true };
  }
}

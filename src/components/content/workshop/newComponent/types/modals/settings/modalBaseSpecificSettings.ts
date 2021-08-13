import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { PlayAnimationPreviewEvent } from '../../../../../../../interfaces/settingsComponentEvents';
import { CardBaseSpecificSettings } from '../../cards/settings/cardBaseSpecificSettings';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class ModalBaseSpecificSettings {

  private static getActionsDropdownMouseEventCallbacks(isOpenAnimation: boolean): ActionsDropdownMouseEventCallbacks {
    return {
      mouseEnterButtonCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
        event.settingsComponent.$emit('play-animation-preview', [event.triggeredOptionName, isOpenAnimation] as PlayAnimationPreviewEvent);
      },
      mouseLeaveButtonCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
        event.settingsComponent.$emit('stop-animation-preview');
      },
      mouseEnterOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
        event.settingsComponent.$emit('play-animation-preview', [event.triggeredOptionName, isOpenAnimation] as PlayAnimationPreviewEvent);
      },
      mouseLeaveDropdownCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
        event.settingsComponent.$emit('stop-animation-preview');
      },
      mouseClickOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
        if (!event.isCustomFeatureResetTriggered) {
          event.settingsComponent.$emit('stop-animation-preview');
        }
      }
    };
  };

  private static readonly EXIT_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS: ActionsDropdownMouseEventCallbacks = {
    ...ModalBaseSpecificSettings.getActionsDropdownMouseEventCallbacks(false),
  };

  private static readonly ENTRANCE_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS: ActionsDropdownMouseEventCallbacks = {
    ...ModalBaseSpecificSettings.getActionsDropdownMouseEventCallbacks(true),
  };

  private static MODAL_BASE_SPECIFIC_COMPONENTS: SubcomponentSpecificSettings = {
    ...CardBaseSpecificSettings.CARD_BASE_SPECIFIC_COMPONENTS,
    [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ANIMATIONS]: {
      [SETTING_NAMES.ENTRANCE]: {
        actionsDropdownMouseEvents: ModalBaseSpecificSettings.ENTRANCE_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS,
      },
    },
    [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ANIMATIONS]: {
      [SETTING_NAMES.ENTRANCE]: {
        actionsDropdownMouseEvents: ModalBaseSpecificSettings.EXIT_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS,
      },
    },
  };

  private static setSubcomponentSpecificSettings(component: WorkshopComponent): void {
    const baseSubcomponent = component.coreSubcomponentRefs.base;
    baseSubcomponent.subcomponentSpecificSettings = ModalBaseSpecificSettings.MODAL_BASE_SPECIFIC_COMPONENTS;
  }

  public static set(component: WorkshopComponent): void {
    ModalBaseSpecificSettings.setSubcomponentSpecificSettings(component);
  }
}

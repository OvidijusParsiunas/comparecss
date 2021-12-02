import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { PlayAnimationPreviewEvent } from '../../../../../../../interfaces/settingsComponentEvents';

export class AnimationPreviewActionsDropdownMouseEvents {

  private static getActionsDropdownMouseEventCallbacks(isOpenAnimation: boolean): ActionsDropdownMouseEventCallbacks {
    return {
      mouseEnterButtonCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
        event.settingsComponent.$emit('play-animation-preview', [event.triggeredItemName, isOpenAnimation] as PlayAnimationPreviewEvent);
      },
      mouseLeaveButtonCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
        event.settingsComponent.$emit('stop-animation-preview');
      },
      mouseEnterItemCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
        event.settingsComponent.$emit('play-animation-preview', [event.triggeredItemName, isOpenAnimation] as PlayAnimationPreviewEvent);
      },
      mouseLeaveDropdownCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
        event.settingsComponent.$emit('stop-animation-preview');
      },
      mouseClickItemCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
        if (!event.isCustomFeatureResetTriggered) {
          event.settingsComponent.$emit('stop-animation-preview');
        }
      }
    };
  }

  public static readonly EXIT_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS: ActionsDropdownMouseEventCallbacks = {
    ...AnimationPreviewActionsDropdownMouseEvents.getActionsDropdownMouseEventCallbacks(false),
  };

  public static readonly ENTRANCE_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS: ActionsDropdownMouseEventCallbacks = {
    ...AnimationPreviewActionsDropdownMouseEvents.getActionsDropdownMouseEventCallbacks(true),
  };
}

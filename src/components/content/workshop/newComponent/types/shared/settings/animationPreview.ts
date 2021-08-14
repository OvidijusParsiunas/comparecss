import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { PlayAnimationPreviewEvent } from '../../../../../../../interfaces/settingsComponentEvents';

export class AnimationPreview {

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

  public static readonly EXIT_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS: ActionsDropdownMouseEventCallbacks = {
    ...AnimationPreview.getActionsDropdownMouseEventCallbacks(false),
  };

  public static readonly ENTRANCE_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS: ActionsDropdownMouseEventCallbacks = {
    ...AnimationPreview.getActionsDropdownMouseEventCallbacks(true),
  };
}

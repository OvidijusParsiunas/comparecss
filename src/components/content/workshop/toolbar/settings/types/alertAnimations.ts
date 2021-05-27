import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { PlayModalAnimationPreviewEvent } from '../../../../../../interfaces/playModalAnimationPreviewEvent';
import { ALERT_ANIMATION_EXIT_TYPES } from '../../../../../../consts/animationTypes.enum';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

function generateMouseEventCallbacks(isEntranceAnimation: boolean): ActionsDropdownMouseEventCallbacks {
  return {
    mouseEnterButtonCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('play-modal-animation-preview', [event.triggeredOptionName, isEntranceAnimation] as PlayModalAnimationPreviewEvent);
    },
    mouseLeaveButtonCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('stop-modal-animation-preview');
    },
    mouseEnterOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('play-modal-animation-preview', [event.triggeredOptionName, isEntranceAnimation] as PlayModalAnimationPreviewEvent);
    },
    mouseLeaveDropdownCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('stop-modal-animation-preview');
    },
    mouseClickOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      if (event.isCustomFeatureResetTriggered) return;
      event.settingsComponent.$emit('stop-modal-animation-preview');
    },
  };
}

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Close',
        options: { [ALERT_ANIMATION_EXIT_TYPES.FADE_OUT]: null },
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'exit', 'type'],
        ...generateMouseEventCallbacks(false),
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Duration',
        default: 0,
        scale: [0, 40],
        smoothingDivisible: 20,
        customFeatureObjectKeys: ['customFeatures', 'animations', 'exit', 'duration'],
        postfix: 's',
      },
    },
  ]
};

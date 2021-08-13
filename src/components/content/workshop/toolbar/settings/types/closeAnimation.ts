import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { PlayAnimationPreviewEvent } from '../../../../../../interfaces/settingsComponentEvents';
import { GENERAL_ANIMATION_CLOSE_TYPES } from '../../../../../../consts/animationTypes.enum';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

function generateMouseEventCallbacks(isOpenAnimation: boolean): ActionsDropdownMouseEventCallbacks {
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
    },
  };
}

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Dismiss',
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure(Object.values(GENERAL_ANIMATION_CLOSE_TYPES)),
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'close', 'type'],
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
        customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'close', 'duration'],
        postfix: 's',
      },
    },
  ]
};

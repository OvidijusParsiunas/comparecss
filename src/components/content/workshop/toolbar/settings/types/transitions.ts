import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownMouseEventCallbacks';
import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../../../../../../consts/modalTransitionTypes.enum';
import { PlayPreviewTransitionAnimationEvent } from '../../../../../../interfaces/playPreviewTransitionAnimationEvent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

function generateMouseEventCallbacks(isEntranceAnimation: boolean): ActionsDropdownMouseEventCallbacks {
  return {
    mouseEnterButtonCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('play-preview-transition-animation', [event.triggeredOptionName, isEntranceAnimation] as PlayPreviewTransitionAnimationEvent)
    },
    mouseLeaveButtonCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('stop-preview-transition-animation');
    },
    mouseEnterOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('play-preview-transition-animation', [event.triggeredOptionName, isEntranceAnimation] as PlayPreviewTransitionAnimationEvent)
    },
    mouseLeaveDropdownCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('stop-preview-transition-animation');
    },
    mouseClickOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('stop-preview-transition-animation');
    },
  };
}

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Entrance',
        options: { [MODAL_TRANSITION_ENTRANCE_TYPES.FADE_IN]: null, [MODAL_TRANSITION_ENTRANCE_TYPES.SLIDE_IN]: null },
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['transitions', 'entrance', 'type'],
        ...generateMouseEventCallbacks(true),
      },
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Exit',
        options: { [MODAL_TRANSITION_EXIT_TYPES.FADE_OUT]: null, [MODAL_TRANSITION_EXIT_TYPES.SLIDE_OUT]: null },
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['transitions', 'exit', 'type'],
        ...generateMouseEventCallbacks(false),
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Duration',
        default: 0,
        scale: [0, 30],
        smoothingDivisible: 10,
        customFeatureObjectKeys: ['transitions', 'entrance', 'duration'],
        postfix: 's',
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Duration',
        default: 0,
        scale: [0, 30],
        smoothingDivisible: 10,
        customFeatureObjectKeys: ['transitions', 'exit', 'duration'],
        postfix: 's',
      },
    },
  ]
};

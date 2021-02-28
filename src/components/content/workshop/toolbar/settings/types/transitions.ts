import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../../../../../../consts/modalTransitionTypes.enum';
import { PlayPreviewTransitionAnimationEvent } from '../../../../../../interfaces/playPreviewTransitionAnimationEvent';
import { ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/ActionsDropdownMouseEventCallbacks';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { ComponentOptions } from 'vue';

function generateMouseEventCallbacks(isEntranceAnimation: boolean): ActionsDropdownMouseEventCallbacks {
  return {
    mouseEnterButtonCallback: (settingsComponent: ComponentOptions, event: MODAL_TRANSITION_ENTRANCE_TYPES | MODAL_TRANSITION_EXIT_TYPES) => {
      settingsComponent.$emit('play-preview-transition-animation', [event, isEntranceAnimation] as PlayPreviewTransitionAnimationEvent)
    },
    mouseLeaveButtonCallback: (settingsComponent: ComponentOptions) => {
      settingsComponent.$emit('stop-preview-transition-animation');
    },
    mouseEnterOptionCallback: (settingsComponent: ComponentOptions, event: MODAL_TRANSITION_ENTRANCE_TYPES | MODAL_TRANSITION_EXIT_TYPES) => {
      settingsComponent.$emit('play-preview-transition-animation', [event, isEntranceAnimation] as PlayPreviewTransitionAnimationEvent)
    },
    mouseLeaveDropdownCallback: (settingsComponent: ComponentOptions) => {
      settingsComponent.$emit('stop-preview-transition-animation');
    },
    mouseClickOptionCallback: (settingsComponent: ComponentOptions) => {
      settingsComponent.$emit('stop-preview-transition-animation');
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
        subcomponentPropertyObjectKeys: ['transitions', 'entrance', 'type'],
        ...generateMouseEventCallbacks(true),
      },
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Exit',
        options: { [MODAL_TRANSITION_EXIT_TYPES.FADE_OUT]: null, [MODAL_TRANSITION_EXIT_TYPES.SLIDE_OUT]: null },
        activeOptionPropertyKeyName: 'type',
        subcomponentPropertyObjectKeys: ['transitions', 'exit', 'type'],
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
        subcomponentPropertyObjectKeys: ['transitions', 'entrance', 'duration'],
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
        subcomponentPropertyObjectKeys: ['transitions', 'exit', 'duration'],
        postfix: 's',
      },
    },
  ]
};

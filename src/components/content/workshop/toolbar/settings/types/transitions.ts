import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownMouseEventCallbacks';
import { MODAL_TRANSITION_ENTRANCE_TYPES, MODAL_TRANSITION_EXIT_TYPES } from '../../../../../../consts/modalTransitionTypes.enum';
import { PlayTransitionPreviewEvent } from '../../../../../../interfaces/playTransitionPreviewEvent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import backdrop from './backdrop';

function generateMouseEventCallbacks(isEntranceAnimation: boolean): ActionsDropdownMouseEventCallbacks {
  return {
    mouseEnterButtonCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('play-transition-preview', [event.triggeredOptionName, isEntranceAnimation] as PlayTransitionPreviewEvent)
    },
    mouseLeaveButtonCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('stop-transition-preview');
    },
    mouseEnterOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('play-transition-preview', [event.triggeredOptionName, isEntranceAnimation] as PlayTransitionPreviewEvent)
    },
    mouseLeaveDropdownCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      event.settingsComponent.$emit('stop-transition-preview');
    },
    mouseClickOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      if (event.isCustomFeatureResetTriggered) return;
      event.settingsComponent.$emit('stop-transition-preview');
    },
  };
}

function getBackdropTransitionDurationSetting(): any {
  return backdrop.options.find((option) => option.spec.name === 'Transition-Duration');
}

const entranceDurationTransitionSpec = {
  name: 'Duration',
  default: 0,
  scale: [0, 20],
  smoothingDivisible: 10,
  customFeatureObjectKeys: ['transitions', 'entrance', 'duration'],
  postfix: 's'
};

const entranceDelayTransitionSpec = {
  name: 'Entrance Delay',
  default: 0,
  scale: [0, 40],
  smoothingDivisible: 20,
  customFeatureObjectKeys: ['transitions', 'entrance', 'delay'],
  postfix: 's',
};

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
      spec: entranceDurationTransitionSpec,
      triggers: [
        {
          setting: getBackdropTransitionDurationSetting(),
          aggregateSettingSpecs: [entranceDelayTransitionSpec],
          // valueLowerThanCurrent
        },
      ]
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Duration',
        default: 0,
        scale: [0, 20],
        smoothingDivisible: 10,
        customFeatureObjectKeys: ['transitions', 'exit', 'duration'],
        postfix: 's',
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: entranceDelayTransitionSpec,
      triggers: [
        {
          setting: getBackdropTransitionDurationSetting(),
          aggregateSettingSpecs: [entranceDurationTransitionSpec],
          // valueLowerThanCurrent
        },
      ]
    },
  ]
};

import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownMouseEventCallbacks';
import { MODAL_ANIMATION_ENTRANCE_TYPES, MODAL_ANIMATION_EXIT_TYPES } from '../../../../../../consts/modalAnimationTypes.enum';
import { PlayModalAnimationPreviewEvent } from '../../../../../../interfaces/playModalAnimationPreviewEvent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SettingPaths } from '../../../../../../interfaces/settingPaths';

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

// cannot point to the setting directly due to dependency invertion
function getSettingPath(): SettingPaths {
  return [
    {optionName: WORKSHOP_TOOLBAR_OPTION_TYPES.BACKDROP, settingName: 'Animation Duration'},
  ];
}

const entranceAnimationDurationSpec = {
  name: 'Duration',
  default: 0,
  scale: [0, 40],
  smoothingDivisible: 20,
  customFeatureObjectKeys: ['modalAnimations', 'entrance', 'duration'],
  postfix: 's'
};

const entranceAnimationDelaySpec = {
  name: 'Entrance Delay',
  default: 0,
  scale: [0, 40],
  smoothingDivisible: 20,
  customFeatureObjectKeys: ['modalAnimations', 'entrance', 'delay'],
  postfix: 's',
};

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Entrance',
        options: { [MODAL_ANIMATION_ENTRANCE_TYPES.FADE_IN]: null, [MODAL_ANIMATION_ENTRANCE_TYPES.SLIDE_IN]: null },
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['modalAnimations', 'entrance', 'type'],
        ...generateMouseEventCallbacks(true),
      },
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Exit',
        options: { [MODAL_ANIMATION_EXIT_TYPES.FADE_OUT]: null, [MODAL_ANIMATION_EXIT_TYPES.SLIDE_OUT]: null },
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['modalAnimations', 'exit', 'type'],
        ...generateMouseEventCallbacks(false),
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: entranceAnimationDurationSpec,
      triggers: [
        {
          setting: getSettingPath(),
          aggregateSettingSpecs: [entranceAnimationDelaySpec],
          updateUsingScaleMax: true,
        },
      ]
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Duration',
        default: 0,
        scale: [0, 40],
        smoothingDivisible: 20,
        customFeatureObjectKeys: ['modalAnimations', 'exit', 'duration'],
        postfix: 's',
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: entranceAnimationDelaySpec,
      triggers: [
        {
          setting: getSettingPath(),
          aggregateSettingSpecs: [entranceAnimationDurationSpec],
          updateUsingScaleMax: true,
        },
      ]
    },
  ]
};

import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { MODAL_ANIMATION_OPEN_TYPES, MODAL_ANIMATION_CLOSE_TYPES } from '../../../../../../consts/animationTypes.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import { PlayAnimationPreviewEvent } from '../../../../../../interfaces/playAnimationPreviewEvent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SettingPaths } from '../../../../../../interfaces/settingPaths';

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
      if (event.isCustomFeatureResetTriggered) return;
      event.settingsComponent.$emit('stop-animation-preview');
    },
  };
}

// cannot point to the setting directly due to dependency invertion
function getSettingPath(): SettingPaths {
  return [
    {optionName: WORKSHOP_TOOLBAR_OPTION_TYPES.BACKDROP, settingName: 'Animation Duration'},
  ];
}

const openAnimationDurationSpec = {
  name: 'Duration',
  default: 0,
  scale: [0, 40],
  smoothingDivisible: 20,
  customFeatureObjectKeys: ['customFeatures', 'animations', 'open', 'duration'],
  postfix: 's'
};

const openAnimationDelaySpec = {
  name: 'Entrance Delay',
  default: 0,
  scale: [0, 40],
  smoothingDivisible: 20,
  customFeatureObjectKeys: ['customFeatures', 'animations', 'open', 'delay'],
  postfix: 's',
};

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Entrance',
        options: { [MODAL_ANIMATION_OPEN_TYPES.FADE_IN]: null, [MODAL_ANIMATION_OPEN_TYPES.SLIDE_IN]: null },
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'open', 'type'],
        ...generateMouseEventCallbacks(true),
      },
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Exit',
        options: { [MODAL_ANIMATION_CLOSE_TYPES.FADE_OUT]: null, [MODAL_ANIMATION_CLOSE_TYPES.SLIDE_OUT]: null },
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'close', 'type'],
        ...generateMouseEventCallbacks(false),
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: openAnimationDurationSpec,
      triggers: [
        {
          setting: getSettingPath(),
          aggregateSettingSpecs: [openAnimationDelaySpec],
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
        customFeatureObjectKeys: ['customFeatures', 'animations', 'close', 'duration'],
        postfix: 's',
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: openAnimationDelaySpec,
      triggers: [
        {
          setting: getSettingPath(),
          aggregateSettingSpecs: [openAnimationDurationSpec],
          updateUsingScaleMax: true,
        },
      ]
    },
  ]
};

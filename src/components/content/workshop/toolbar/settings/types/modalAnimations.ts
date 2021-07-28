import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { MODAL_ANIMATION_OPEN_TYPES, MODAL_ANIMATION_CLOSE_TYPES } from '../../../../../../consts/animationTypes.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import { PlayAnimationPreviewEvent } from '../../../../../../interfaces/settingsComponentEvents';
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
  customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'open', 'duration'],
  postfix: 's'
};

const openAnimationDelaySpec = {
  name: 'Entrance Delay',
  default: 0,
  scale: [0, 40],
  smoothingDivisible: 20,
  customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'open', 'delay'],
  postfix: 's',
};

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Entrance',
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure([MODAL_ANIMATION_OPEN_TYPES.FADE_IN, MODAL_ANIMATION_OPEN_TYPES.SLIDE_IN]),
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'open', 'type'],
        ...generateMouseEventCallbacks(true),
      },
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Exit',
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure([MODAL_ANIMATION_CLOSE_TYPES.FADE_OUT, MODAL_ANIMATION_CLOSE_TYPES.SLIDE_OUT]),
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'close', 'type'],
        ...generateMouseEventCallbacks(false),
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: openAnimationDurationSpec,
      triggers: [
        {
          otherOptionSettingPath: getSettingPath(),
          aggregateSettingSpecs: [openAnimationDelaySpec],
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
        customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'close', 'duration'],
        postfix: 's',
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: openAnimationDelaySpec,
      triggers: [
        {
          otherOptionSettingPath: getSettingPath(),
          aggregateSettingSpecs: [openAnimationDurationSpec],
        },
      ]
    },
  ]
};

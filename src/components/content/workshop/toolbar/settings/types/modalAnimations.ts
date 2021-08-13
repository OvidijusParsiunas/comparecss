import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { MODAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../../../../../../consts/animationTypes.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';
import { SettingPaths } from '../../../../../../interfaces/settingPaths';

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
        name: SETTING_NAMES.ENTRANCE,
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure(Object.values(MODAL_ANIMATION_OPEN_TYPES)),
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'open', 'type'],
      },
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Exit',
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure(Object.values(MODAL_ANIMATION_CLOSE_TYPES)),
        activeOptionPropertyKeyName: 'type',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'close', 'type'],
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

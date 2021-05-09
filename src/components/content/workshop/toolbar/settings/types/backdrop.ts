import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SettingPaths } from '../../../../../../interfaces/settingPaths';

// cannot point to the setting directly due to dependency invertion
function getAggregatedSettingsPaths(): SettingPaths {
  return [
    {optionName: WORKSHOP_TOOLBAR_OPTION_TYPES.TRANSITIONS, settingName: 'Duration'},
    {optionName: WORKSHOP_TOOLBAR_OPTION_TYPES.TRANSITIONS, settingName: 'Entrance Delay'}
  ];
}

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.COLOR_PICKER,
      spec: {
        name: 'Color',
        default: '#000000',
        alphaValueCustomFeatureObjectKeys: ['backdrop', 'alpha'],
        customFeatureObjectKeys: ['backdrop', 'color'],
        unsetColorButtonAvailable: true,
      },
      removeColorTriggers: [
        {
          customFeatureObjectKeys: ['backdrop', 'alpha'],
          defaultValue: '0',
        },
      ]
    },
    // does not edit actual opacity css property
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Opacity',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 100,
        colorValueCustomFeatureObjectKeys: ['backdrop', 'color'],
        customFeatureObjectKeys: ['backdrop', 'alpha'],
        postfix: '',
      },
      triggers: [
        {
          customFeatureObjectKeys: ['backdrop', 'color'],
          defaultValue: '#00000000',
          conditions: new Set(['unset']),
        },
      ]
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Transition-Duration',
        default: 0,
        scale: [0, 40],
        smoothingDivisible: 20,
        customFeatureObjectKeys: ['backdrop', 'entranceTransitionDuration', 'currentValue'],
        lastSelectedValueKeys: ['backdrop', 'entranceTransitionDuration', 'lastSelectedValue'],
        postfix: 's',
        updateSettingSpecViaOtherSettings: {
          aggregatedSettingPaths: getAggregatedSettingsPaths(),
          updateIfLower: true,
        } 
      },
    },
  ]
};

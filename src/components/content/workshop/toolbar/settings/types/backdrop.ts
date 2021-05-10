import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SettingPaths } from '../../../../../../interfaces/settingPaths';

// cannot point to the setting directly due to dependency invertion
function getAggregatedSettingsPaths(): SettingPaths {
  return [
    {optionName: WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ANIMATIONS, settingName: 'Duration'},
    {optionName: WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ANIMATIONS, settingName: 'Entrance Delay'}
  ];
}

const backdropTransitionDurationSpec = {
  name: 'Transition Duration',
  default: 0,
  scale: [0, 40],
  smoothingDivisible: 20,
  customFeatureObjectKeys: ['backdrop', 'entranceTransitionDuration', 'currentValue'],
  lastSelectedValueObjectKeys: ['backdrop', 'entranceTransitionDuration', 'lastSelectedValue'],
  isAutoObjectKeys: ['backdrop', 'entranceTransitionDuration', 'isAuto'],
  postfix: 's',
  updateSettingSpecViaOtherSettings: {
    aggregatedSettingPaths: getAggregatedSettingsPaths(),
    updateUsingScaleMax: true,
  },
};

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
      spec: backdropTransitionDurationSpec,
      triggers: [
        {
          customFeatureObjectKeys: ['backdrop', 'entranceTransitionDuration', 'isAuto'],
          defaultValue: false,
          conditions: new Set([true]),
        },
      ],
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Auto',
        customFeatureObjectKeys: ['backdrop', 'entranceTransitionDuration', 'isAuto'],
        default: false,
      },
      triggers: {
        true: [
          {
            updateSettingSpec: backdropTransitionDurationSpec,
          }
        ],
        false: [
          {
            customFeatureObjectKeys: backdropTransitionDurationSpec.lastSelectedValueObjectKeys,
            updateUsingValueFromAnotherObjectKeys: backdropTransitionDurationSpec.customFeatureObjectKeys,
          }
        ]
      },
    }
  ]
};

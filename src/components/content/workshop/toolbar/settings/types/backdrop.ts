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

const backdropAnimationDurationSpec = {
  name: 'Animation Duration',
  default: 0,
  scale: [0, 40],
  smoothingDivisible: 20,
  customFeatureObjectKeys: ['customFeatures', 'backdrop', 'entranceAnimationDuration', 'currentValue'],
  lastSelectedValueObjectKeys: ['customFeatures', 'backdrop', 'entranceAnimationDuration', 'lastSelectedValue'],
  isAutoObjectKeys: ['customFeatures', 'backdrop', 'entranceAnimationDuration', 'isAuto'],
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
        alphaValueCustomFeatureObjectKeys: ['customFeatures', 'backdrop', 'alpha'],
        customFeatureObjectKeys: ['customFeatures', 'backdrop', 'color'],
        unsetColorButtonAvailable: true,
      },
      removeColorTriggers: [
        {
          customFeatureObjectKeys: ['customFeatures', 'backdrop', 'alpha'],
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
        colorValueCustomFeatureObjectKeys: ['customFeatures', 'backdrop', 'color'],
        customFeatureObjectKeys: ['customFeatures', 'backdrop', 'alpha'],
        postfix: '',
      },
      triggers: [
        {
          customFeatureObjectKeys: ['customFeatures', 'backdrop', 'color'],
          defaultValue: '#00000000',
          conditions: new Set(['unset']),
        },
      ]
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: backdropAnimationDurationSpec,
      triggers: [
        {
          customFeatureObjectKeys: ['customFeatures', 'backdrop', 'entranceAnimationDuration', 'isAuto'],
          defaultValue: false,
          conditions: new Set([true]),
        },
      ],
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Auto',
        customFeatureObjectKeys: ['customFeatures', 'backdrop', 'entranceAnimationDuration', 'isAuto'],
        default: false,
      },
      triggers: {
        true: [
          {
            updateSettingSpec: backdropAnimationDurationSpec,
          }
        ],
        false: [
          {
            customFeatureObjectKeys: backdropAnimationDurationSpec.lastSelectedValueObjectKeys,
            updateUsingValueFromAnotherObjectKeys: backdropAnimationDurationSpec.customFeatureObjectKeys,
          }
        ]
      },
    }
  ]
};

import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Width',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'width',
        postfix: 'px',
      },
      triggers: [
        {
          customFeatureObjectKeys: ['customFeatures', 'autoSize', 'width'],
          defaultValue: false,
          conditions: new Set([true]),
        },
      ],
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Largest Item Text',
        customFeatureObjectKeys: ['customFeatures', 'autoSize', 'width'],
        default: true,
      },
      triggers: {
        true: [
          {
            cssProperty: 'width',
            customFunctionKeys: ['customFeatures', 'autoSize', 'widthCalculationFunc'],
          }
        ],
      },
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Min Width',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'minWidth',
        postfix: 'px',
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: SETTING_NAMES.HEIGHT,
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'height',
        postfix: 'px',
      },
    },
  ]
};

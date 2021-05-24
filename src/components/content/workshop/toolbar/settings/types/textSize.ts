import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

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
        name: 'Auto',
        customFeatureObjectKeys: ['customFeatures', 'autoSize', 'width'],
        default: true,
      },
      triggers: {
        true: [
          {
            cssProperty: 'width',
            newValue: 'max-content',
          }
        ],
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Height',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'height',
        postfix: 'px',
      },
      triggers: [
        {
          customFeatureObjectKeys: ['customFeatures', 'autoSize', 'height'],
          defaultValue: false,
          conditions: new Set([true]),
        },
      ],
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Auto',
        customFeatureObjectKeys: ['customFeatures', 'autoSize', 'height'],
        default: true,
      },
      triggers: {
        true: [
          {
            cssProperty: 'height',
            newValue: 'auto',
          }
        ],
      },
    },
  ]
};

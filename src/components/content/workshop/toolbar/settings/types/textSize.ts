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
          customFeatureObjectKeys: ['customFeatures', 'autoWidth', 'auto'],
          defaultValue: false,
          conditions: new Set([true]),
        },
      ],
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Auto',
        customFeatureObjectKeys: ['customFeatures', 'autoWidth', 'auto'],
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
  ]
};

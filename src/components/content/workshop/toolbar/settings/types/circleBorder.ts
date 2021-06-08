import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Radius',
        default: 0,
        scale: [0, 120],
        smoothingDivisible: 4,
        cssProperty: 'borderRadius',
        postfix: 'px',
        greatestControlledNumber: '30',
      },
      triggers: [
        {
          customFeatureObjectKeys: ['customFeatures', 'circleBorder'],
          defaultValue: false,
          conditions: new Set([true]),
        },
      ],
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Circle',
        customFeatureObjectKeys: ['customFeatures', 'circleBorder'],
        default: true,
      },
      triggers: {
        true: [
          {
            cssProperty: 'borderRadius',
            newValue: '50%',
          }
        ],
        false: [
          {
            cssProperty: 'borderRadius',
            newValue: '0px',
          }
        ],
      },
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Width',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'borderWidth',
        postfix: 'px',
      },
      triggers: [
        {
          cssProperty: 'borderColor',
          defaultValue: '#000000',
          conditions: new Set([undefined]),
        },
        {
          cssProperty: 'borderStyle',
          defaultValue: 'solid',
          conditions: new Set([undefined, 'none', 'hidden']),
          selector: true,
        }
      ]
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Style',
        options: { 'none': null, 'hidden': null, 'dotted': null, 'dashed': null, 'solid': null, 'double': null, 'groove': null, 'ridge': null, 'inset': null, 'outset': null },
        default: 'none',
        cssProperty: 'borderStyle',
      },
      triggers: {
        none: {
          cssProperty: 'borderWidth',
          defaultValue: '0px',
          negativeConditions: new Set([0, undefined]),
        },
      },
    },
    {
      type: SETTINGS_TYPES.COLOR_PICKER,
      spec: {
        name: 'Color',
        default: '#000000',
        cssProperty: 'borderColor',
        unsetColorButtonAvailable: false,
      },
    }
  ]
};

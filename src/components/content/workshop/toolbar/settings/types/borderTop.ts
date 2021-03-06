import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Width',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'borderTopWidth',
        postfix: 'px',
      },
      triggers: [
        {
          cssProperty: 'borderTopColor',
          defaultValue: '#000000',
          conditions: new Set([undefined]),
        },
        {
          cssProperty: 'borderTopStyle',
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
        cssProperty: 'borderTopStyle',
      },
      triggers: {
        none: {
          cssProperty: 'borderTopWidth',
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
        cssProperty: 'borderTopColor',
        unsetColorButtonAvailable: false,
      },
    }
  ]
};

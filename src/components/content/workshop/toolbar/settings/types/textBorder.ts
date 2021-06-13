import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Left',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'borderLeftWidth',
        postfix: 'px',
      },
      triggers: [
        {
          cssProperty: 'borderColor',
          defaultValue: '#000000',
          conditions: new Set([undefined]),
        },
      ]
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Right',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'borderRightWidth',
        postfix: 'px',
      },
      triggers: [
        {
          cssProperty: 'borderColor',
          defaultValue: '#000000',
          conditions: new Set([undefined]),
        },
      ]
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

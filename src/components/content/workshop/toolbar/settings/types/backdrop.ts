import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.COLOR_PICKER,
      spec: {
        name: 'Color',
        default: '#000000',
        alphaValueSubcomponentPropertyObjectKeys: ['backdrop', 'alpha'],
        subcomponentPropertyObjectKeys: ['backdrop', 'color'],
        unsetColorButtonAvailable: true,
      },
      removeColorTriggers: [
        {
          subcomponentPropertyObjectKeys: ['backdrop', 'alpha'],
          defaultValue: '0',
        },
      ]
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Opacity',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 100,
        colorValueSubcomponentPropertyObjectKeys: ['backdrop', 'color'],
        subcomponentPropertyObjectKeys: ['backdrop', 'alpha'],
        postfix: '',
      },
      triggers: [
        {
          subcomponentPropertyObjectKeys: ['backdrop', 'color'],
          defaultValue: '#00000000',
          conditions: new Set(['unset']),
        },
      ]
    },
  ]
};

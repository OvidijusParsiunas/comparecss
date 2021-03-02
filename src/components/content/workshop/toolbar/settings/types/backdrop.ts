import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

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
  ]
};

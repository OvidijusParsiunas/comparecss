import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Size',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'fontSize'
      },
    },
    { 
      type: SETTINGS_TYPES.COLOR_PICKER,
      spec: {
        name: 'Color',
        default: '#000000',
        cssProperty: 'color',
        unsetColorButtonAvailable: true,
      },
    },
  ]
};

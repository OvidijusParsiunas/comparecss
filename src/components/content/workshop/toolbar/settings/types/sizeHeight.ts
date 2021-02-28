import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
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
    },
  ]
};

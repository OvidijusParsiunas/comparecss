import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Left',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'marginLeft',
        postfix: 'px',
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Right',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'marginRight',
        postfix: 'px',
      },
    },
  ]
};

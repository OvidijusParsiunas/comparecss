import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: SETTING_NAMES.TOP,
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'paddingTop',
        postfix: 'px',
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: SETTING_NAMES.BOTTOM,
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'paddingBottom',
        postfix: 'px',
      },
    },
  ]
};
    
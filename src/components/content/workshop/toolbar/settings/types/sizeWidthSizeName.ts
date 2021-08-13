import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: SETTING_NAMES.SIZE,
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'width',
        postfix: 'px',
      },
    },
  ],
};

import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: SETTING_NAMES.Y_OFFSET,
        default: 0,
        scale: [-50, 50],
        smoothingDivisible: 1,
        partialCss: {
          position: 1,
          fullDefaultValues: ['0px', '0px', '0px', '0px', '#000000'],
        }, 
        cssProperty: 'boxShadow',
        postfix: 'px',
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Blur',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 1,
        partialCss: {
          position: 2,
          fullDefaultValues: ['0px', '0px', '0px', '0px', '#000000'],
        }, 
        cssProperty: 'boxShadow',
        postfix: 'px',
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Spread',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 1,
        partialCss: {
          position: 3,
          fullDefaultValues: ['0px', '0px', '0px', '0px', '#000000'],
        }, 
        cssProperty: 'boxShadow',
        postfix: 'px',
      },
    },
    { 
      type: SETTINGS_TYPES.COLOR_PICKER,
      spec: {
        name: 'Color',
        default: '#000000',
        partialCss: {
          position: 4,
          fullDefaultValues: ['0px', '0px', '0px', '0px', '#000000'],
        }, 
        cssProperty: 'boxShadow',
        isUnsetButtonAvailable: false,
      },
    }
  ]
};
  
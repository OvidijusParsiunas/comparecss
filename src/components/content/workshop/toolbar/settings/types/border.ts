import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { BORDER_STYLES } from '../../../../../../consts/borderStyles.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: SETTING_NAMES.RADIUS,
        default: 0,
        scale: [0, 120],
        smoothingDivisible: 4,
        cssProperty: 'borderRadius',
        postfix: 'px',
      },
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: SETTING_NAMES.WIDTH,
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'borderWidth',
        postfix: 'px',
      },
      triggers: [
        {
          cssProperty: 'borderColor',
          defaultValue: '#000000',
          conditions: new Set([undefined]),
        },
        {
          cssProperty: 'borderStyle',
          defaultValue: BORDER_STYLES.SOLID,
          conditions: new Set([undefined, BORDER_STYLES.NONE, BORDER_STYLES.HIDDEN]),
          selector: true,
        }
      ]
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Style',
        options: DropdownUtils.generateDropdownStructure(Object.values(BORDER_STYLES)),
        default: BORDER_STYLES.NONE,
        cssProperty: 'borderStyle',
      },
      triggers: {
        none: {
          cssProperty: 'borderWidth',
          defaultValue: '0px',
          negativeConditions: new Set([0, undefined]),
        },
      },
    },
    {
      type: SETTINGS_TYPES.COLOR_PICKER,
      spec: {
        name: SETTING_NAMES.COLOR,
        default: '#000000',
        cssProperty: 'borderColor',
        unsetColorButtonAvailable: false,
      },
    }
  ]
};

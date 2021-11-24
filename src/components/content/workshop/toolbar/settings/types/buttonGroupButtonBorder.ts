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
        name: SETTING_NAMES.DIVIDER_WIDTH,
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'borderRightWidth',
        postfix: 'px',
      },
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Outline Width',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'borderTopWidth',
        postfix: 'px',
      },
    },
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
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Style',
        options: DropdownUtils.generateDropdownStructure(Object.values(BORDER_STYLES)),
        default: BORDER_STYLES.NONE,
        cssProperty: 'borderStyle',
      },
      triggers: {
        none: {
          cssProperty: 'borderStyle',
          defaultValue: '0px',
          negativeConditions: new Set([0, undefined]),
        },
      },
    },
    {
      type: SETTINGS_TYPES.COLOR_PICKER,
      spec: {
        name: 'Color',
        default: '#000000',
        cssProperty: 'borderColor',
        unsetColorButtonAvailable: false,
      },
    },
  ]
};

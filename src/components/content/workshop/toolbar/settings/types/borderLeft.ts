import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { BORDER_STYLES } from '../../../../../../consts/borderStyles.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Width',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'borderLeftWidth',
        postfix: 'px',
      },
      triggers: [
        {
          cssProperty: 'borderLeftColor',
          defaultValue: '#000000',
          conditions: new Set([undefined]),
        },
        {
          cssProperty: 'borderLeftStyle',
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
        cssProperty: 'borderLeftStyle',
      },
      triggers: {
        none: {
          cssProperty: 'borderLeftWidth',
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
        cssProperty: 'borderLeftColor',
        unsetColorButtonAvailable: false,
      },
    }
  ]
};

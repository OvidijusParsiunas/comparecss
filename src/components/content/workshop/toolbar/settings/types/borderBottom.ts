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
        cssProperty: 'borderBottomWidth',
        postfix: 'px',
      },
      triggers: [
        {
          cssProperty: 'borderBottomColor',
          defaultValue: '#000000',
          conditions: new Set([undefined]),
        },
        {
          cssProperty: 'borderBottomStyle',
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
        cssProperty: 'borderBottomStyle',
      },
      triggers: {
        none: {
          cssProperty: 'borderBottomWidth',
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
        cssProperty: 'borderBottomColor',
        isUnsetButtonAvailable: false,
      },
    }
  ]
};

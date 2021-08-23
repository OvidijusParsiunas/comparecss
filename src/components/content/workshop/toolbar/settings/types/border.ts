import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { BORDER_STYLES } from '../../../../../../consts/borderStyles.enum';

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Radius',
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
        name: 'Width',
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
        options: UpdateDropdownOptionNamesShared.generateDropdownStructure(Object.values(BORDER_STYLES)),
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
        name: 'Color',
        default: '#000000',
        cssProperty: 'borderColor',
        unsetColorButtonAvailable: false,
      },
    }
  ]
};

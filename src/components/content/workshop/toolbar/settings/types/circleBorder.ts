import { BORDER_WIDTH_CSS_PROPERTY_ALIAS } from '../../../../../../consts/borderWidthAlias';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
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
        greatestControlledNumber: '30',
      },
      triggers: [
        {
          customFeatureObjectKeys: ['customFeatures', 'circleBorder'],
          defaultValue: false,
          conditions: new Set([true]),
        },
      ],
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Circle',
        customFeatureObjectKeys: ['customFeatures', 'circleBorder'],
        default: true,
      },
      triggers: {
        true: [
          {
            cssProperty: 'borderRadius',
            newValue: '50%',
          }
        ],
        false: [
          {
            cssProperty: 'borderRadius',
            newValue: '0px',
          }
        ],
      },
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Width',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: BORDER_WIDTH_CSS_PROPERTY_ALIAS,
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
          cssProperty: BORDER_WIDTH_CSS_PROPERTY_ALIAS,
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
        isUnsetButtonAvailable: false,
      },
    }
  ]
};

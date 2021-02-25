import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Center',
        subcomponentPropertiesObject: 'componentCenteringInParent',
        propertyKeyName: 'vertical',
        default: false,
      },
      triggers: {
        true: {
          cssProperty: 'top',
          defaultValue: undefined,
        }
      },
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Top',
        default: 0,
        scale: [0, 2000],
        smoothingDivisible: 4,
        cssProperty: 'top',
      },
      triggers: [
        {
          subcomponentPropertiesObject: 'componentCenteringInParent',
          propertyKeyName: 'vertical',
          defaultValue: false,
          conditions: new Set([true]),
        },
      ]
    },
  ]
};

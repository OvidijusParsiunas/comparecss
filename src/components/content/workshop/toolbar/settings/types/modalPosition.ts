import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Top',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'top',
      },
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Vertically Centred',
        subcomponentPropertiesObject: 'componentCenteringInParent',
        propertyKeyName: 'vertical',
        default: false,
      },
    }
  ]
};

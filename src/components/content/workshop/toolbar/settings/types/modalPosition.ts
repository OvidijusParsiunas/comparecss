import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Vertically Centered',
        subcomponentPropertyObjectKeys: ['componentCenteringInParent', 'vertical'],
        default: false,
        changeOtherProperties: {
          true: {
            cssProperty: 'top',
            newValue: undefined,
          }
        },
      },
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Vertical-Offset',
        default: 0,
        scale: [0, 2000],
        smoothingDivisible: 4,
        cssProperty: 'top',
        postfix: 'px',
      },
      triggers: [
        {
          subcomponentPropertyObjectKeys: ['componentCenteringInParent', 'vertical'],
          defaultValue: false,
          conditions: new Set([true]),
        },
      ]
    },
  ]
};
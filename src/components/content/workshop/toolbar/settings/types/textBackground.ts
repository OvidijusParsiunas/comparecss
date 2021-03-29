import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Width',
        default: 0,
        scale: [0, 250],
        smoothingDivisible: 1,
        cssProperty: 'width',
        postfix: 'px',
      },
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Width-Auto',
        cssProperty: 'width',
        default: true,
        conditionalStyle: {
          truthy: 'auto',
        }
      },
      triggers: {
        true: [
          {
            cssProperty: 'width',
            newValue: 'auto',
          }
        ],
      },
    },
    {
      type: SETTINGS_TYPES.COLOR_PICKER,
      spec: {
        name: 'Color',
        default: '#000000',
        cssProperty: 'backgroundColor',
        unsetColorButtonAvailable: true,
      },
    }
  ]
};

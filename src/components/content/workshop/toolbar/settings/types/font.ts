import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Size',
        default: 0,
        scale: [0, 100],
        smoothingDivisible: 4,
        cssProperty: 'fontSize',
        postfix: 'px',
      },
    },
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Weight',
        options: { '100': null, '200': null, '300': null, '400': null, '500': null, '600': null, '700': null, '800': null, '900': null, '1000': null },
        default: '100',
        cssProperty: 'fontWeight',
      },
    },
    {
      type: SETTINGS_TYPES.INPUT_DROPDOWN,
      spec: {
        name: 'Font',
        options: ['Poppins', 'Accordion', 'Lato', 'cursive', 'sans-serif', 'groove', 'ridge', 'inset', 'outset', '"Poppins", sans-serif', '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif'],
        cssProperty: 'fontFamily'
      },
    },
  ]
};

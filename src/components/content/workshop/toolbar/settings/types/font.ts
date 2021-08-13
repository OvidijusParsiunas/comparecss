import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: SETTING_NAMES.SIZE,
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
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure(['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']),
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

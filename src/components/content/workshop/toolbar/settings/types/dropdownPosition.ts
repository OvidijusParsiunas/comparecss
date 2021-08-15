import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { DROPDOWN_MENU_POSITIONS } from '../../../../../../consts/dropdownMenuPositions.enum';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Position',
        options: UpdateDropdownOptionNamesShared.generateDropdownStructure(Object.values(DROPDOWN_MENU_POSITIONS)),
        activeOptionPropertyKeyName: 'position',
        customFeatureObjectKeys: ['customFeatures', 'dropdownMenuPosition', 'position'],
      },
    },
  ]
};

import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { DROPDOWN_POSITIONS } from '../../../../../../consts/dropdownPositions.enum';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Position',
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure(Object.values(DROPDOWN_POSITIONS)),
        activeOptionPropertyKeyName: 'position',
        customFeatureObjectKeys: ['customFeatures', 'dropdownPosition', 'position'],
      },
    },
  ]
};

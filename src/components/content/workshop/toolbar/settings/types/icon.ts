import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateChildComponent/updateDropdownOptionNamesShared';
import { DROPDOWN_ARROW_ICON_TYPES } from '../../../../../../consts/dropdownArrowIcons';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: SETTING_NAMES.TYPE,
        options: UpdateDropdownOptionNamesShared.generateDropdownStructure(Object.values(DROPDOWN_ARROW_ICON_TYPES)),
        activeOptionPropertyKeyName: 'name',
        customFeatureObjectKeys: ['customStaticFeatures', 'icon', 'name'],
        customFunctionKeys: ['customStaticFeatures', 'icon', 'changeIconFunc'],
      },
    },
  ]
};

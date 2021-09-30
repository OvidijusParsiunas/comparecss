import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
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
        options: DropdownUtils.generateDropdownStructure(Object.values(DROPDOWN_ARROW_ICON_TYPES)),
        activeItemPropertyKeyName: 'name',
        customFeatureObjectKeys: ['customStaticFeatures', 'icon', 'name'],
      },
    },
  ]
};

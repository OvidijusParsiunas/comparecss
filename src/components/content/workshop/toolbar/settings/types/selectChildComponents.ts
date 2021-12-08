import { SELECT_CHILD_COMPONENT_STYLE_OPTIONS } from '../../../../../../interfaces/selectedChildComponent';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Active style',
        options: DropdownUtils.generateDropdownStructure(Object.values(SELECT_CHILD_COMPONENT_STYLE_OPTIONS)),
        activeItemPropertyKeyName: 'activeStyle',
        customFeatureObjectKeys: ['customStaticFeatures', 'selectComponent', 'container', 'activeStyle'],
      },
    },
  ]
};

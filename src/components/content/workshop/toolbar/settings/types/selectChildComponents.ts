import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Active style',
        options: DropdownUtils.generateDropdownStructure([CSS_PSEUDO_CLASSES.HOVER, CSS_PSEUDO_CLASSES.CLICK]),
        activeItemPropertyKeyName: 'activeCssPseudoClass',
        customFeatureObjectKeys: ['customStaticFeatures', 'selectComponent', 'container', 'activeCssPseudoClass'],
      },
    },
  ]
};

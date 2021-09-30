import { GENERAL_ANIMATION_CLOSE_TYPES } from '../../../../../../consts/animationTypes.enum';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: SETTING_NAMES.DISMISS,
        options: DropdownUtils.generateDropdownStructure(Object.values(GENERAL_ANIMATION_CLOSE_TYPES)),
        activeItemPropertyKeyName: 'type',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'close', 'type'],
      },
    },
    { 
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Duration',
        default: 0,
        scale: [0, 40],
        smoothingDivisible: 20,
        customFeatureObjectKeys: ['customFeatures', 'animations', 'display', 'close', 'duration'],
        postfix: 's',
      },
    },
  ]
};

import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: SETTING_NAMES.FADE,
        default: 0,
        scale: [0, 12],
        smoothingDivisible: 20,
        customFeatureObjectKeys: ['customFeatures', 'animations', 'stationary', 'fade', 'duration'],
        postfix: 's',
      },
    },
  ]
};

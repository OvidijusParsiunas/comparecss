import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Enabled',
        customFeatureObjectKeys: ['customStaticFeatures', 'selectDropdown', 'enabled'],
        default: false,
      },
      triggers: {
        true: [
          {
            customFunctionKeys: ['customStaticFeatures', 'selectDropdown', 'callback'],
          }
        ],
        false: [
          {
            customFunctionKeys: ['customStaticFeatures', 'selectDropdown', 'callback'],
          }
        ],
      },
    },
  ]
};

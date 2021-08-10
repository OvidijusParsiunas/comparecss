import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Enabled',
        customFeatureObjectKeys: ['customStaticFeatures', 'dropdownSelect', 'enabled'],
        default: false,
      },
      triggers: {
        true: [
          {
            customFunctionKeys: ['customStaticFeatures', 'dropdownSelect', 'callback'],
          }
        ],
        false: [
          {
            customFunctionKeys: ['customStaticFeatures', 'dropdownSelect', 'callback'],
          }
        ],
      },
    },
  ]
};

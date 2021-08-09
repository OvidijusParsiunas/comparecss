import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Enabled',
        customFeatureObjectKeys: ['customFeatures', 'dropdownSelect', 'enabled'],
        default: false,
      },
      triggers: {
        true: [
          {
            customFunctionKeys: ['customFeatures', 'dropdownSelect', 'callback'],
          }
        ],
        false: [
          {
            customFunctionKeys: ['customFeatures', 'dropdownSelect', 'callback'],
          }
        ],
      },
    },
  ]
};

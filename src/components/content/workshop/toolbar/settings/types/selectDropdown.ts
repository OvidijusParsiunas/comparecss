import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Enabled',
        customFeatureObjectKeys: ['customStaticFeatures', 'dropdown', 'select', 'enabled'],
        default: false,
      },
      triggers: {
        true: [
          {
            customFunctionKeys: ['customStaticFeatures', 'dropdown', 'select', 'callback'],
          }
        ],
        false: [
          {
            customFunctionKeys: ['customStaticFeatures', 'dropdown', 'select', 'callback'],
          }
        ],
      },
    },
  ]
};

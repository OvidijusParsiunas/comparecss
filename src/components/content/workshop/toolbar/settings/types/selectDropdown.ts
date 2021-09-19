import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Enabled',
        customFeatureObjectKeys: ['customFeatures', 'dropdown', 'select', 'enabled'],
        default: false,
      },
      triggers: {
        true: [
          {
            customFunctionKeys: ['customFeatures', 'dropdown', 'select', 'callback'],
          }
        ],
        false: [
          {
            customFunctionKeys: ['customFeatures', 'dropdown', 'select', 'callback'],
          }
        ],
      },
    },
  ]
};

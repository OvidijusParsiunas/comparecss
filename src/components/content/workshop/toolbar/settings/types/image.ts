import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.UPLOAD_FILE,
      spec: {
        name: 'Background Image',
        customFeatureObjectKeys: ['customStaticFeatures', 'image', 'data'],
        default: 'text',
      },
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Fit to scale',
        customFeatureObjectKeys: ['customStaticFeatures', 'image', 'size'],
        default: false,
      },
      triggers: {
        true: [
          {
            cssProperty: 'backgroundSize',
            newValue: '100% 100%',
          }
        ],
        false: [
          {
            cssProperty: 'backgroundSize',
            newValue: 'auto',
          }
        ],
      },
    },
  ]
};
  
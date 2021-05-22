import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.INPUT,
      spec: {
        name: 'Font',
        customFeatureObjectKeys: ['customStaticFeatures', 'subcomponentText', 'text'],
        default: 'text',
      },
    },
  ]
};
    
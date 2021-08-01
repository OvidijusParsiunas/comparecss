import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Hover zoom',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'stationary', 'backgroundZoom', 'isOn'],
        default: false,
      },
    },
  ]
};

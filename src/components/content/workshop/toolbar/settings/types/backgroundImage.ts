import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.COLOR_PICKER,
      spec: {
        name: 'Color',
        default: '#000000',
        cssProperty: 'backgroundColor',
        unsetColorButtonAvailable: true,
      },
    },
    {},
    {
      type: SETTINGS_TYPES.UPLOAD_FILE,
      spec: {
        name: 'Image',
        customFeatureObjectKeys: ['customStaticFeatures', 'image', 'data'],
        auxiliaryCustomFeatureObjectKeys: ['customStaticFeatures', 'image', 'name'],
        default: 'text',
      },
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Fit to scale',
        customFeatureObjectKeys: ['customStaticFeatures', 'image', 'size'],
        default: false,
        resetCustomCss: 'backgroundSize', // reset the css that was changed, other settings that are checkboxes
        // and update custom css use other settings to do the reset for them
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

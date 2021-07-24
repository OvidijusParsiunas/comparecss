import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Zoom',
        customFeatureObjectKeys: ['customFeatures', 'animations', 'stationary', 'backgroundZoom', 'isOn'],
        default: false,
      },
      triggers: {
        true: [
          {
            cssProperty: 'backgroundSize',
            pseudoClass: CSS_PSEUDO_CLASSES.HOVER,
            newValue: '120% 120%',
          },
        ],
        false: [
          {
            cssProperty: 'backgroundSize',
            pseudoClass: CSS_PSEUDO_CLASSES.HOVER,
            newValue: '100% 100%',
          },
        ]
      },
    },
  ]
};

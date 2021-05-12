import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Close on Enter',
        customFeatureObjectKeys: ['backdrop', 'closeTriggers', 'enter'],
        default: false,
      },
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Close on Escape',
        customFeatureObjectKeys: ['backdrop', 'closeTriggers', 'escape'],
        default: false,
      },
    },
    {
      type: SETTINGS_TYPES.CHECKBOX,
      spec: {
        name: 'Close on Backdrop click',
        customFeatureObjectKeys: ['backdrop', 'closeTriggers', 'backdrop'],
        default: false,
      },
    }
  ]
};

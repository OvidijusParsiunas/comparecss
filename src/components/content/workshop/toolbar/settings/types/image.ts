import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    {
      type: SETTINGS_TYPES.UPLOAD_FILE,
      spec: {
        name: 'Image',
        customFeatureObjectKeys: ['customStaticFeatures', 'image', 'data'],
        auxiliaryCustomFeatureObjectKeys: ['customStaticFeatures', 'image', 'name'],
        default: 'text',
        uploadFileButtonProps: {
          text: 'Upload',
          fileTypes: 'image/*',
        }
      },
    },
  ]
};

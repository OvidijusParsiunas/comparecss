import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.COLOR_PICKER,
      spec: {
        name: 'Color',
        default: '#000000',
        alphaValueSubcomponentPropertyObjectKeys: ['backdrop', 'alpha'],
        subcomponentPropertyObjectKeys: ['backdrop', 'color'],
        unsetColorButtonAvailable: true,
      },
    }
  ]
};

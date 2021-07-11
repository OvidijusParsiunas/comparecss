import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export const cardLayerSpecificSettings: SubcomponentSpecificSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW_VERTICAL]: {
    [SETTING_NAMES.Y_OFFSET]: { scale: [0, 100] },
  },
};

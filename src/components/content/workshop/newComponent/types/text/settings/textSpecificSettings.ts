import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export const textSpecificSettings: SubcomponentSpecificSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_SIZE]: {
    [SETTING_NAMES.WIDTH]: { scale: [0, 1000] },
  },
}

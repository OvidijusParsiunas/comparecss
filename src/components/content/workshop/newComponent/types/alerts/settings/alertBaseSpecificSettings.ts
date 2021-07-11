import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export const alertBaseSpecificSettings: SubcomponentSpecificSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING]: {
    [SETTING_NAMES.LEFT]: { scale: [0, 100] },
  },
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: {
    [SETTING_NAMES.WIDTH]: { scale: [100, 700] },
    [SETTING_NAMES.HEIGHT]: { scale: [30, 200] },
  },
};

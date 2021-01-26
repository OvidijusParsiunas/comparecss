import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CustomSettings } from '../../../../../../../interfaces/workshopComponent';

export const alertCloseCustomSettings: CustomSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: {
    'width': { scale: [14, 80] },
    'height': { scale: [10, 80] },
  },
}

import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CustomSettings } from '../../../../../../../interfaces/workshopComponent';

export const buttonCustomSettings: CustomSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: {
    'width': { scale: [0, 250] },
    'height': { scale: [0, 250] },
  },
}

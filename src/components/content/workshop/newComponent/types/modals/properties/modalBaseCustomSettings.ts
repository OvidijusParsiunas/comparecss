import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CustomSettings } from '../../../../../../../interfaces/workshopComponent';

export const modalBaseCustomSettings: CustomSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH]: {
    'width': { scale: [170, 700] },
  },
}

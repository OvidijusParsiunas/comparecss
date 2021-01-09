import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { CustomSettings } from '../../../../../../../interfaces/workshopComponent';

export const alertCloseCustomSettings: CustomSettings = {
  [WORKSHOP_TOOLBAR_OPTIONS.SIZE]: {
    'width': { scale: [14, 80] },
    'height': { scale: [10, 80] },
  },
}

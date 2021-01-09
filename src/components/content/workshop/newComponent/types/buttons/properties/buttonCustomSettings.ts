import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { CustomSettings } from '../../../../../../../interfaces/workshopComponent';

export const buttonCustomSettings: CustomSettings = {
  [WORKSHOP_TOOLBAR_OPTIONS.SIZE]: {
    'width': { scale: [0, 250] },
    'height': { scale: [0, 250] },
  },
}

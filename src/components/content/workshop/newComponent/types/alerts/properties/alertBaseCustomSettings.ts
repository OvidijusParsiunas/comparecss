import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { CustomSettings } from '../../../../../../../interfaces/workshopComponent';

export const alertBaseCustomSettings: CustomSettings = {
  [WORKSHOP_TOOLBAR_OPTIONS.PADDING]: {
    'paddingLeft': { scale: [0, 100] },
  },
  [WORKSHOP_TOOLBAR_OPTIONS.SIZE]: {
    'width': { scale: [100, 700] },
    'height': { scale: [30, 200] },
  },
}
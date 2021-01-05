import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { CustomSettings } from '../../../../../../../interfaces/workshopComponent';

export const alertBaseCustomSettings: CustomSettings = {
  [WORKSHOP_TOOLBAR_OPTIONS.PADDING]: {
    cssProperty: 'paddingLeft',
    scale: [0, 100],
  }
}

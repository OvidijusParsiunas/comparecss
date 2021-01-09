import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { CustomSettings } from '../../../../../../../interfaces/workshopComponent';

export const modalLayerTopCustomSettings: CustomSettings = {
  [WORKSHOP_TOOLBAR_OPTIONS.SHADOW]: {
    partialCssPosition: 1,
    cssProperty: 'boxShadow',
    scale: [0, 100],
  },
}

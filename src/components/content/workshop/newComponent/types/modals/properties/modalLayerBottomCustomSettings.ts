import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { CustomSettings } from '../../../../../../../interfaces/workshopComponent';

export const modalLayerBottomCustomSettings: CustomSettings = {
  [WORKSHOP_TOOLBAR_OPTIONS.SHADOW]: {
    partialCssPosition: 1,
    cssProperty: 'boxShadow',
    scale: [-100, 0],
  },
}

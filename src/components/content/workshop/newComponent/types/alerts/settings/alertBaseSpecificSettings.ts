import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';

export const alertBaseSpecificSettings: SubcomponentSpecificSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING]: {
    'paddingLeft': { scale: [0, 100] },
  },
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: {
    'width': { scale: [100, 700] },
    'height': { scale: [30, 200] },
  },
};

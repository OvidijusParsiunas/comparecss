import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';

export const buttonSpecificSettings: SubcomponentSpecificSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: {
    'width': { scale: [0, 250] },
    'height': { scale: [0, 250] },
  },
}

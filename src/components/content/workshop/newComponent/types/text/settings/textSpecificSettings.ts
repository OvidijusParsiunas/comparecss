import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';

export const textSpecificSettings: SubcomponentSpecificSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_SIZE]: {
    width: { scale: [0, 1000] },
  },
}

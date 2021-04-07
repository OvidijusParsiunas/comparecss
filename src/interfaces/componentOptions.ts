import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentCssStates } from './SubcomponentCssStates';

export interface Option {
  buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES,
  type: WORKSHOP_TOOLBAR_OPTION_TYPES,
  enabledOnExpandedModalPreviewMode?: boolean,
}

export type SubcomponentOptions<T extends keyof SubcomponentCssStates> = {
  [key in T]: Option[];
}

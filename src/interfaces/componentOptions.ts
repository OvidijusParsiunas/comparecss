import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../consts/workshopToolbarOptionTypes.enum';
import { CORE_SUBCOMPONENTS_NAMES } from '../consts/coreSubcomponentNames.enum';
import { SubcomponentCssPseudoClasses } from './SubcomponentCssPseudoClasses';

export interface Option {
  buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES;
  type: WORKSHOP_TOOLBAR_OPTION_TYPES;
  enabledOnExpandedModalPreviewMode?: boolean;
  displayIfSubcomponentDisplayed?: CORE_SUBCOMPONENTS_NAMES;
}

export type SubcomponentOptions<T extends keyof SubcomponentCssPseudoClasses> = {
  [key in T]: Option[];
}

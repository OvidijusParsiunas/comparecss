import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentCssPseudoClasses } from './SubcomponentCssPseudoClasses';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { COMPONENT_STYLES } from '../consts/componentStyles.enum';

export interface EnabledIfChildComponentPresent {
  type: SUBCOMPONENT_TYPES;
  style?: COMPONENT_STYLES;
}

export interface Option {
  buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES;
  type: WORKSHOP_TOOLBAR_OPTION_TYPES;
  enabledOnExpandedModalPreviewMode?: boolean;
  enabledIfCustomFeaturePresentWithKeys?: string[];
  enabledIfChildComponentPresent?: EnabledIfChildComponentPresent;
}

export type SubcomponentOptions<T extends keyof SubcomponentCssPseudoClasses> = {
  [key in T]: Option[];
}

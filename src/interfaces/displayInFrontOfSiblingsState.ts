import { CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from './workshopComponent';

export interface DisplayInFrontOfSiblingsContainerState {
  highestZIndex: number;
}

export interface DisplayInFrontOfSiblingsState {
  zIndex: number;
  conditionalFunc?: (subcomponentProperties: SubcomponentProperties, cssPseudoClass: CSS_PSEUDO_CLASSES) => boolean;
}

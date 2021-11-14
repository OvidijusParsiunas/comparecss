import { CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from './workshopComponent';

export interface DisplayInFrontOfSiblingsContainerState {
  highestZIndex: number;
  numberOfCurrentlyHighlightedButtons: number;
  conditionalFunc?: (subcomponentProperties: SubcomponentProperties, cssPseudoClass: CSS_PSEUDO_CLASSES) => boolean;
}

export interface DisplayInFrontOfSiblingsState {
  zIndex: number;
  setZIndexTimeout?: NodeJS.Timeout;
}

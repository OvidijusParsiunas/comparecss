import { CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from './workshopComponent';

export interface DisplayInFrontOfSiblingsContainerState {
  highestZIndex: number;
  numberOfCurrentlyHighlightedButtons: number;
  conditionalFunc?: (subcomponentProperties: SubcomponentProperties, cssPseudoClass: CSS_PSEUDO_CLASSES) => boolean;
}

export interface DisplayInFrontOfSiblingsState {
  zIndex: number;
  // used to not have to move to front on click when the component has already been moved on hover
  isInFrontOnHover?: boolean;
  setZIndexTimeout?: NodeJS.Timeout;
}

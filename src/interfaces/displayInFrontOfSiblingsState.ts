import { CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from './workshopComponent';

export interface DisplayInFrontOfSiblingsState {
  isInFront: boolean;
  conditionalFunc?: (subcomponentProperties: SubcomponentProperties, csspseudoClass: CSS_PSEUDO_CLASSES) => boolean;
}

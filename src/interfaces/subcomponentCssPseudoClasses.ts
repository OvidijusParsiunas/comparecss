import { CSS_PSEUDO_CLASSES } from '../consts/subcomponentCssClasses.enum';

export type SubcomponentCssPseudoClasses = {
  [property in CSS_PSEUDO_CLASSES]?: property;
}

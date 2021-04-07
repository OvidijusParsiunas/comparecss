import { CSS_STATES } from '../consts/subcomponentCssStates.enum';

export type SubcomponentCssStates = {
  [property in CSS_STATES]?: property;
}

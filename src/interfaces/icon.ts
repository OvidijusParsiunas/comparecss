import { ICON_TYPES } from '../consts/iconTypes.enum';
import { Image } from './image';

export interface Icon {
  name: string;
  // primarily used to refresh icon so that the new one would be rendered on the dom
  isComponentDisplayed: boolean;
  type: ICON_TYPES;
  svgImage: Image;
}

import { BASE_SUBCOMPONENT_NAMES } from '../consts/baseSubcomponentNames.enum';
import { WorkshopComponentCss } from './workshopComponentCss';

export type SubcomponentCssPropertyDetails = {
  subcomponentName: BASE_SUBCOMPONENT_NAMES;
  cssProperty: keyof WorkshopComponentCss;
}[];

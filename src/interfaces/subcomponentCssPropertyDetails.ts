import { CORE_SUBCOMPONENTS_NAMES } from '../consts/coreSubcomponentNames.enum';
import { WorkshopComponentCss } from './workshopComponentCss';

export type SubcomponentCssPropertyDetails = {
  subcomponentName: CORE_SUBCOMPONENTS_NAMES;
  cssProperty: keyof WorkshopComponentCss;
}[];

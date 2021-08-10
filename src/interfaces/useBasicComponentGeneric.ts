import { WorkshopComponent } from './workshopComponent';
import { WorkshopComponentCss } from './workshopComponentCss';

export interface UseBaseComponentGeneric {
  getStyleProperties: (component: WorkshopComponent) => WorkshopComponentCss[];
  getSubcomponentText: (component: WorkshopComponent) => string;
}

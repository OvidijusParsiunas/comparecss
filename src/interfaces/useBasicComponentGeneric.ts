import { WorkshopComponent } from './workshopComponent';
import { WorkshopComponentCss } from './workshopComponentCss';

export interface UseBaseComponentGeneric {
  isIcon: (component: WorkshopComponent) => boolean;
  generateStyleProperties: (component: WorkshopComponent) => WorkshopComponentCss[];
  getSubcomponentText: (component: WorkshopComponent) => string;
}

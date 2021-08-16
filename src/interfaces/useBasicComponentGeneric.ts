import { WorkshopComponent } from './workshopComponent';
import { WorkshopComponentCss } from './workshopComponentCss';

export interface UseBaseComponentGeneric {
  isIcon: (component: WorkshopComponent) => boolean;
  getStyleProperties: (component: WorkshopComponent) => WorkshopComponentCss[];
  getSubcomponentText: (component: WorkshopComponent) => string;
}

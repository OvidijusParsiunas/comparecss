import { WorkshopComponentCss } from './workshopComponentCss';
import { WorkshopComponent } from './workshopComponent';

export interface UseBaseComponent {
  isIcon: (component: WorkshopComponent) => boolean;
  getStyleProperties: (component: WorkshopComponent) => WorkshopComponentCss[];
  getSubcomponentText: (component: WorkshopComponent) => string;
  getButtonGroupBorderCss: (component: WorkshopComponent) => WorkshopComponentCss;
}

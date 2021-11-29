import { WorkshopComponentCss } from './workshopComponentCss';
import { WorkshopComponent } from './workshopComponent';

export interface UseBaseComponent {
  isIcon: (component: WorkshopComponent) => boolean;
  getSubcomponentText: (component: WorkshopComponent) => string;
  getBaseContainerCss:(component: WorkshopComponent) => WorkshopComponentCss;
  getComponentStyleProperties: (component: WorkshopComponent) => WorkshopComponentCss[];
  getBaseContainerCssClasses: (component: WorkshopComponent, isChildComponent: boolean) => string[];
  getOverlayStyleProperties: (component: WorkshopComponent, isChildComponent: boolean) => WorkshopComponentCss;
}

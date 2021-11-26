import { WorkshopComponentCss } from './workshopComponentCss';
import { WorkshopComponent } from './workshopComponent';

export interface UseBaseComponent {
  isIcon: (component: WorkshopComponent) => boolean;
  getSubcomponentText: (component: WorkshopComponent) => string;
  getBaseContainerCss:(component: WorkshopComponent) => WorkshopComponentCss;
  getComponentStyleProperties: (component: WorkshopComponent) => WorkshopComponentCss[];
  getOverlayStyleProperties: (component: WorkshopComponent, isChildComponent: boolean) => WorkshopComponentCss;
}

import { WorkshopComponentCss } from './workshopComponentCss';
import { WorkshopComponent } from './workshopComponent';

export interface UseBaseComponent {
  isIcon: (component: WorkshopComponent) => boolean;
  isXButtonText: (component: WorkshopComponent) => boolean;
  getSubcomponentText: (component: WorkshopComponent) => string;
  getLayerCssClasses: (component: WorkshopComponent, isChildComponent: boolean, isIconOverlayTrigger?: boolean) => string[];
  getComponentCssClasses: (component: WorkshopComponent) => string[]|Set<string>;
  getBaseContainerCssClasses: (component: WorkshopComponent, isChildComponent: boolean) => string[];
  getComponentStyleProperties: (component: WorkshopComponent) => WorkshopComponentCss[];
  getBaseContainerStyleProperties: (component: WorkshopComponent) => WorkshopComponentCss;
  getBaseContainerParentStyleProperties: (component: WorkshopComponent) => WorkshopComponentCss;
  getOverlayStyleProperties: (component: WorkshopComponent, isChildComponent: boolean) => WorkshopComponentCss;
}

import { WorkshopComponentCss } from './workshopComponentCss';

export interface UseBaseComponent {
  isXButtonText: () => boolean;
  getSubcomponentText: () => string;
  getOverlayCssClasses: (isIconOverlayTrigger?: boolean) => string[];
  getComponentCssClasses: () => Set<string>|string[];
  getBaseContainerCssClasses: () => string[];
  getComponentStyleProperties: () => WorkshopComponentCss[];
  getBaseContainerStyleProperties: () => WorkshopComponentCss;
  getBaseContainerParentStyleProperties: () => WorkshopComponentCss;
  getOverlayStyleProperties: () => WorkshopComponentCss;
}

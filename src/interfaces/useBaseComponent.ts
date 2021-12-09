import { WorkshopComponentCss } from './workshopComponentCss';

export interface UseBaseComponent {
  isIcon: () => boolean;
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

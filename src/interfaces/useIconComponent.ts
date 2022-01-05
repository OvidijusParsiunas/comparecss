import { WorkshopComponentCss } from './workshopComponentCss';

export interface UseIconComponent {
  isIcon: () => boolean;
  isSVGIcon: () => boolean;
  getSVGIconName: () => string;
  setOverlayCustomCss: (overlayCss: WorkshopComponentCss) => void;
}

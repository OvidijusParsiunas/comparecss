import { WorkshopComponentCss } from './workshopComponentCss';
import { Subcomponent } from './workshopComponent';

export interface UseLayerSectionComponent {
  getStyleProperties: (subcomponent: Subcomponent, index: string) => WorkshopComponentCss[];
}

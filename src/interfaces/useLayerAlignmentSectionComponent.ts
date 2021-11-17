import { WorkshopComponentCss } from './workshopComponentCss';
import { Subcomponent } from './workshopComponent';

export interface UseLayerAlignmentSectionComponent {
  getStyleProperties: (subcomponent: Subcomponent, index: string) => WorkshopComponentCss[];
}

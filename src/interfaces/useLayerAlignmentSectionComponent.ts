import { WorkshopComponentCss } from './workshopComponentCss';
import { Subcomponent } from './workshopComponent';

export interface UseLayerAlignmentSectionComponent {
  getComponentStyleProperties: (subcomponent: Subcomponent, index: string) => WorkshopComponentCss[];
}

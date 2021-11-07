import { WorkshopComponentCss } from './workshopComponentCss';
import { SubcomponentProperties } from './workshopComponent';

export interface UseLayerSectionComponent {
  getStyleProperties: (subcomponentProperties: SubcomponentProperties, index: string) => WorkshopComponentCss[];
}

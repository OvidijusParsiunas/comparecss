import { WorkshopComponentCss } from './workshopComponentCss';
import { SubcomponentProperties } from './workshopComponent';

export interface UseLayerSectionComponent {
  generateStyleProperties: (subcomponentProperties: SubcomponentProperties, index: string) => WorkshopComponentCss[];
}

import { WorkshopComponentCss } from './workshopComponentCss';
import { Layer } from './componentPreviewStructure';

export interface UseLayerComponent {
  generateStyleProperties: (layer: Layer, isLastLayer: boolean) => WorkshopComponentCss[];
}

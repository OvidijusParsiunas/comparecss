import { WorkshopComponentCss } from './workshopComponentCss';
import { Layer } from './componentPreviewStructure';

export interface UseLayerComponent {
  getStyleProperties: (layer: Layer, isLastLayer: boolean) => WorkshopComponentCss[];
}

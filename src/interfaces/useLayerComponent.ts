import { WorkshopComponentCss } from './workshopComponentCss';
import { Layer } from './componentPreviewStructure';

export interface UseLayerComponent {
  getLayerCssClasses: (layer: Layer) => string[];
  getOverlayStyleProperties: (layer: Layer, currentIndex: number) => WorkshopComponentCss;
  getComponentStyleProperties: (layer: Layer, isLastLayer: boolean) => WorkshopComponentCss[];
}

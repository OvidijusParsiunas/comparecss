import { WorkshopComponentCss } from './workshopComponentCss';
import { Layer } from './componentPreviewStructure';

export interface UseLayerComponent {
  getLayerCssClasses: (layer: Layer) => string[];
  getComponentStyleProperties: (layer: Layer, isLastLayer: boolean) => WorkshopComponentCss[];
  getOverlayStyleProperties: (layer: Layer, layers: Layer[], currentIndex: number) => WorkshopComponentCss;
}

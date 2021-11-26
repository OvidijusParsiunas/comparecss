import { WorkshopComponentCss } from './workshopComponentCss';
import { Layer } from './componentPreviewStructure';

export interface UseLayerComponent {
  getComponentStyleProperties: (layer: Layer, isLastLayer: boolean) => WorkshopComponentCss[];
  getOverlayStyleProperties: (layer: Layer, layers: Layer[], currentIndex: number) => WorkshopComponentCss;
}

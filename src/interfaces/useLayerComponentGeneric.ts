import { WorkshopComponentCss } from './workshopComponentCss';
import { Layer } from './componentPreviewStructure';

export interface UseLayerComponentGeneric {
  getStyleProperties: (layer: Layer, isLastLayer: boolean) => WorkshopComponentCss[];
}

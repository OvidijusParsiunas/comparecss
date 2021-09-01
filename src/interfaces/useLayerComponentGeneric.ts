import { WorkshopComponentCss } from './workshopComponentCss';
import { Layer } from './componentPreviewStructure';

export interface UseLayerComponentGeneric {
  generateStyleProperties: (layer: Layer, isLastLayer: boolean) => WorkshopComponentCss[];
}

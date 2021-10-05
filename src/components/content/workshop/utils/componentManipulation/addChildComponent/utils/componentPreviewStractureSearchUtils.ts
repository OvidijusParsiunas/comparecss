import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';

export class ComponentPreviewStructureSearchUtils {

  public static getLayerByName(containerComponent: WorkshopComponent, layerName: string): Layer {
    return containerComponent.componentPreviewStructure.layers.find((layer) => layer.subcomponentProperties.name === layerName);
  }
}

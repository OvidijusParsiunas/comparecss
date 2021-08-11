import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';

export class ComponentPreviewStructureSearchUtils {

  public static getComponentLayers(currentlySelectedComponent: WorkshopComponent): NestedDropdownStructure {
    const { coreSubcomponentRefs: { base: { name } }, componentPreviewStructure: { subcomponentDropdownStructure } } = currentlySelectedComponent;
    return subcomponentDropdownStructure[name] as NestedDropdownStructure;
  }

  public static getLayerByName(parentComponent: WorkshopComponent, layerName: string): Layer {
    return parentComponent.componentPreviewStructure.layers.find((layer) => layer.name === layerName);
  }
}

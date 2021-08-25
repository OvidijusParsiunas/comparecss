import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';

export class ComponentPreviewStructureSearchUtils {

  public static getComponentLayers(masterComponent: WorkshopComponent): NestedDropdownStructure {
    const { coreSubcomponentRefs: { [SUBCOMPONENT_TYPES.BASE]: { name } }, componentPreviewStructure: { subcomponentDropdownStructure } } = masterComponent;
    return subcomponentDropdownStructure[name] as NestedDropdownStructure;
  }

  public static getLayerByName(containerComponent: WorkshopComponent, layerName: string): Layer {
    return containerComponent.componentPreviewStructure.layers.find((layer) => layer.subcomponentProperties.name === layerName);
  }
}

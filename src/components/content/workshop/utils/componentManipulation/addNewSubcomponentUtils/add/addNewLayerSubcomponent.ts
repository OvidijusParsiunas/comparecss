import { NewComponentProperties, OverwritePropertiesFunc } from '../../../../../../../interfaces/addNewSubcomponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { EntityDisplayStatusUtils } from '../../../entityDisplayStatus/entityDisplayStatusUtils';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { layer } from '../../../../newComponent/types/layers/properties/layer';
import PreviewStructure from '../../../componentGenerator/previewStructure';
import { JsUtils } from '../../../../../../../services/jsUtils/jsUtils';

export class AddNewLayerSubcomponent {

  private static updateComponentPreviewStructure(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewComponentProperties,
      layerBaseSubcomponent: SubcomponentProperties): void {
    currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE] = {
      ...currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE],
      [newSubcomponentProperties.baseName]: { 
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layerBaseSubcomponent.subcomponentDisplayStatus),
      },
    }
  }

  private static addNewSubcomponentToBase(currentlySelectedComponent: WorkshopComponent, layer: Layer): void {
    currentlySelectedComponent.componentPreviewStructure.layers.push(layer);
  }

  private static addNewSubcomponentToComponentPreview(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewComponentProperties): void {
    const layerSubcomponent = newSubcomponentProperties.subcomponents[newSubcomponentProperties.baseName];
    const layer: Layer = PreviewStructure.createEmptyLayer(newSubcomponentProperties.baseName, layerSubcomponent);
    AddNewLayerSubcomponent.addNewSubcomponentToBase(currentlySelectedComponent, layer);
    AddNewLayerSubcomponent.updateComponentPreviewStructure(currentlySelectedComponent, newSubcomponentProperties, layerSubcomponent);
  }

  protected static createNewImportedComponent(currentlySelectedComponent: WorkshopComponent, componentGenerator: ComponentGenerator,
      overwritePropertiesFunc?: OverwritePropertiesFunc): NewComponentProperties {
    const baseName = `${UniqueSubcomponentNameGenerator.generate(CORE_SUBCOMPONENTS_NAMES.LAYER)} ${currentlySelectedComponent.componentPreviewStructure.layers.length + 1}`;
    const subcomponents = ImportedComponentGenerator.createImportedComponentSubcomponents(componentGenerator, baseName);
    const { subcomponentNames } = subcomponents[baseName].importedComponent.componentRef;
    if (overwritePropertiesFunc) overwritePropertiesFunc(subcomponents, subcomponentNames);
    return { baseName, subcomponents };
  }

  public static add(currentlySelectedComponent: WorkshopComponent, overwritePropertiesFunc?: OverwritePropertiesFunc): NewComponentProperties {
    const newLayerSubcomponent = AddNewLayerSubcomponent.createNewImportedComponent(currentlySelectedComponent, layer, overwritePropertiesFunc);
    JsUtils.addObjects(currentlySelectedComponent, 'subcomponents', newLayerSubcomponent.subcomponents);
    AddNewLayerSubcomponent.addNewSubcomponentToComponentPreview(currentlySelectedComponent, newLayerSubcomponent);
    return newLayerSubcomponent;
  }
}

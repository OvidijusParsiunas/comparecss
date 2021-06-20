import { NewComponentProperties, OverwritePropertiesFunc } from '../../../../../../../interfaces/addNewSubcomponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { EntityDisplayStatusUtils } from '../../../entityDisplayStatus/entityDisplayStatusUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { layer } from '../../../../newComponent/types/layers/properties/layer';
import PreviewStructure from '../../../componentGenerator/previewStructure';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

export class AddNewLayerSubcomponent extends AddNewSubcomponentShared {

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

  public static add(currentlySelectedComponent: WorkshopComponent, overwritePropertiesFunc?: OverwritePropertiesFunc): NewComponentProperties {
    const newLayerSubcomponent = AddNewLayerSubcomponent.createNewImportedComponent(SUBCOMPONENT_TYPES.LAYER, layer, overwritePropertiesFunc);
    AddNewSubcomponentShared.addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent, newLayerSubcomponent.subcomponents);
    AddNewLayerSubcomponent.addNewSubcomponentToComponentPreview(currentlySelectedComponent, newLayerSubcomponent);
    return newLayerSubcomponent;
  }
}

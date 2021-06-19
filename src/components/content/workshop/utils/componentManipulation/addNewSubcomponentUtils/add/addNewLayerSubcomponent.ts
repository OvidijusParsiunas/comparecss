import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewImportedComponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { EntityDisplayStatusUtils } from '../../../entityDisplayStatus/entityDisplayStatusUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { layer } from '../../../../newComponent/types/layers/properties/layer';
import PreviewStructure from '../../../componentGenerator/previewStructure';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

type OverwritePropertiesFunc = (subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames) => void

export class AddNewLayerSubcomponent extends AddNewSubcomponentShared {

  private static updateComponentPreviewStructure(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewImportedComponentProperties,
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

  private static addNewSubcomponentToComponentPreview(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewImportedComponentProperties): void {
    const layerSubcomponent = newSubcomponentProperties.subcomponents[newSubcomponentProperties.baseName];
    const layer: Layer = PreviewStructure.createEmptyLayer(newSubcomponentProperties.baseName, layerSubcomponent);
    AddNewLayerSubcomponent.addNewSubcomponentToBase(currentlySelectedComponent, layer);
    AddNewLayerSubcomponent.updateComponentPreviewStructure(currentlySelectedComponent, newSubcomponentProperties, layerSubcomponent);
  }

  public static add(currentlySelectedComponent: WorkshopComponent, overwritePropertiesFunc?: OverwritePropertiesFunc): NewImportedComponentProperties {
    const newLayerSubcomponent = AddNewLayerSubcomponent.createNewImportedComponent(SUBCOMPONENT_TYPES.LAYER, layer, overwritePropertiesFunc);
    AddNewSubcomponentShared.addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent, newLayerSubcomponent.subcomponents);
    AddNewLayerSubcomponent.addNewSubcomponentToComponentPreview(currentlySelectedComponent, newLayerSubcomponent);
    return newLayerSubcomponent;
  }
}

import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { EntityDisplayStatusUtils } from '../../../entityDisplayStatus/entityDisplayStatusUtils';
import { NewSubcomponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import PreviewStructure from '../../../componentGenerator/previewStructure';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

export class AddNewLayerSubcomponent extends AddNewSubcomponentShared {

  private static updateComponentPreviewStructure(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties): void {
    currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE] = {
      ...currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE],
      [newSubcomponentProperties.name]: { 
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(newSubcomponentProperties.subcomponentProperties.subcomponentDisplayStatus),
      },
    }
  }

  private static addNewSubcomponentToBase(currentlySelectedComponent: WorkshopComponent, layer: Layer): void {
    currentlySelectedComponent.componentPreviewStructure.layers.push(layer);
  }

  private static addNewSubcomponentToComponentPreview(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties): void {
    const layer: Layer = PreviewStructure.createEmptyLayer(newSubcomponentProperties.name, newSubcomponentProperties.subcomponentProperties);
    AddNewLayerSubcomponent.addNewSubcomponentToBase(currentlySelectedComponent, layer);
    AddNewLayerSubcomponent.updateComponentPreviewStructure(currentlySelectedComponent, newSubcomponentProperties);
  }

  public static add(currentlySelectedComponent: WorkshopComponent, subcomponentType: SUBCOMPONENT_TYPES): void {
    const componentGenerator = componentTypeToStyleGenerators[currentlySelectedComponent.type][currentlySelectedComponent.style];
    // WORK1: should layer3 be changed to something else or would the options adjust depending on layer depth
    const newLayerSubcomponent = AddNewLayerSubcomponent.createNewSubcomponent(componentGenerator, subcomponentType);
    AddNewLayerSubcomponent.addNewSubcomponentToExistingSubcomponents(currentlySelectedComponent, newLayerSubcomponent);
    AddNewLayerSubcomponent.addNewSubcomponentToComponentPreview(currentlySelectedComponent, newLayerSubcomponent); 
  }
}

import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { EntityDisplayStatusUtils } from '../../../entityDisplayStatus/entityDisplayStatusUtils';
import { NewSubcomponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

export class AddNewSubcomponent extends AddNewSubcomponentShared {

  private static updateComponentPreviewStructure(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties,
      currentLayer: Layer): void {
    currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name] = {
      [newSubcomponentProperties.name]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(newSubcomponentProperties.subcomponentProperties.subcomponentDisplayStatus),
      ...currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name],
    }
  }

  private static addNewSubcomponentToComponentPreview(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties): void {
    // WORK1: remove this if statement
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].layerSectionsType) {
      const currentLayer = AddNewSubcomponent.findCurrentLayer(currentlySelectedComponent);
      AddNewSubcomponent.updateNewSubcomponentParentLayer(newSubcomponentProperties, currentLayer);
      AddNewSubcomponent.addNewSubcomponentToCurrentLayer(currentLayer, newSubcomponentProperties);
      AddNewSubcomponent.updateComponentPreviewStructure(currentlySelectedComponent, newSubcomponentProperties, currentLayer);
    }
  }
  
  public static add(currentlySelectedComponent: WorkshopComponent): void {
    const newSubcomponent = AddNewSubcomponent.createNewSubcomponent(CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_TEXT, SUBCOMPONENT_TYPES.SECTION_TEXT);
    AddNewSubcomponent.addNewSubcomponentToExistingSubcomponents(currentlySelectedComponent, newSubcomponent);
    AddNewSubcomponent.addNewSubcomponentToComponentPreview(currentlySelectedComponent, newSubcomponent); 
  }
}

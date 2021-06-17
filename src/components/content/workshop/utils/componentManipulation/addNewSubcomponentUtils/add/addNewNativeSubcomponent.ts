import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { EntityDisplayStatusUtils } from '../../../entityDisplayStatus/entityDisplayStatusUtils';
import { NewSubcomponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

export class AddNewNativeSubcomponent extends AddNewSubcomponentShared {

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
      const currentLayer = AddNewNativeSubcomponent.findCurrentLayer(currentlySelectedComponent);
      AddNewNativeSubcomponent.updateNewSubcomponentParentLayer(newSubcomponentProperties, currentLayer);
      AddNewNativeSubcomponent.addNewSubcomponentToCurrentLayer(currentLayer, newSubcomponentProperties);
      AddNewNativeSubcomponent.updateComponentPreviewStructure(currentlySelectedComponent, newSubcomponentProperties, currentLayer);
    }
  }
  
  public static add(currentlySelectedComponent: WorkshopComponent, subcomponentType: SUBCOMPONENT_TYPES): void {
    const newSubcomponent = AddNewNativeSubcomponent.createNewSubcomponent(subcomponentType);
    AddNewNativeSubcomponent.addNewSubcomponentToExistingSubcomponents(currentlySelectedComponent, newSubcomponent);
    AddNewNativeSubcomponent.addNewSubcomponentToComponentPreview(currentlySelectedComponent, newSubcomponent); 
  }
}

import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { NewImportedComponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { defaultButton } from '../../../../newComponent/types/buttons/properties/default';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

export class AddNewImportedComponent extends AddNewSubcomponentShared {

  private static updateComponentPreviewStructure(currentlySelectedComponent: WorkshopComponent, importedComponent: NewImportedComponentProperties,
      currentLayer: Layer): void {
    const importedComponentStructure = ImportedComponentGenerator.createImportedComponentStructure(
      currentlySelectedComponent.subcomponents, importedComponent.baseName, ALIGNED_SECTION_TYPES.RIGHT);
    currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name] = {
      [importedComponent.baseName]: { ...importedComponentStructure.component[importedComponentStructure.baseName]},
      ...currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name],
    }
  }

  private static addNewSubcomponentsToComponentPreview(currentlySelectedComponent: WorkshopComponent, importedComponent: NewImportedComponentProperties): void {
    // WORK1: remove this if statement
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].layerSectionsType) {
      const currentLayer = AddNewImportedComponent.findCurrentLayer(currentlySelectedComponent);
      const baseSubcomponentProperties = {
        name: importedComponent.baseName, subcomponentProperties: importedComponent.subcomponents[importedComponent.baseName]};
      AddNewImportedComponent.updateNewSubcomponentParentLayer(baseSubcomponentProperties, currentLayer);
      AddNewImportedComponent.addNewSubcomponentToCurrentLayer(currentLayer, baseSubcomponentProperties);
      AddNewImportedComponent.updateComponentPreviewStructure(currentlySelectedComponent, importedComponent, currentLayer);
    }
  }

  private static createNewImportedComponent(): NewImportedComponentProperties {
    const newSubcomponentName = UniqueSubcomponentNameGenerator.generate(CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON);
    return {
      baseName: newSubcomponentName,
      subcomponents: ImportedComponentGenerator.createImportedComponents(defaultButton, newSubcomponentName),
    }
  }

  public static add(currentlySelectedComponent: WorkshopComponent): void {
    const importedComponent = AddNewImportedComponent.createNewImportedComponent();
    AddNewImportedComponent.addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent, importedComponent.subcomponents);
    AddNewImportedComponent.addNewSubcomponentsToComponentPreview(currentlySelectedComponent, importedComponent); 
  }
}

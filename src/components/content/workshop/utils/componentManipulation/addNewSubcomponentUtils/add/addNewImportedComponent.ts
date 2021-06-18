import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { NewImportedComponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { closeButton } from '../../../../newComponent/types/buttons/properties/closeButton';
import { defaultButton } from '../../../../newComponent/types/buttons/properties/default';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { defaultText } from '../../../../newComponent/types/text/properties/default';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

export class AddNewImportedComponent extends AddNewSubcomponentShared {

  private static readonly componentTypeToGenerator: { [key in SUBCOMPONENT_TYPES]?: ComponentGenerator } = {
    [SUBCOMPONENT_TYPES.TEXT]: defaultText,
    [SUBCOMPONENT_TYPES.BUTTON]: defaultButton,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: closeButton,
  }

  private static updateComponentPreviewStructure(currentlySelectedComponent: WorkshopComponent, importedComponent: NewImportedComponentProperties,
      currentLayer: Layer): void {
    const importedComponentStructure = ImportedComponentGenerator.createImportedComponentStructure(
      currentlySelectedComponent.subcomponents, importedComponent.baseName);
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

  private static createNewImportedComponent(parentSubcomponentType: SUBCOMPONENT_TYPES): NewImportedComponentProperties {
    const baseName = UniqueSubcomponentNameGenerator.generate(
      AddNewSubcomponentShared.subcomponentTypeToName[parentSubcomponentType]);
    const subcomponents = ImportedComponentGenerator.createImportedComponentSubcomponents(
      AddNewImportedComponent.componentTypeToGenerator[parentSubcomponentType], baseName);
    return { baseName, subcomponents }
  }

  public static add(currentlySelectedComponent: WorkshopComponent, parentSubcomponentType: SUBCOMPONENT_TYPES): void {
    const importedComponent = AddNewImportedComponent.createNewImportedComponent(parentSubcomponentType);
    AddNewImportedComponent.addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent, importedComponent.subcomponents);
    AddNewImportedComponent.addNewSubcomponentsToComponentPreview(currentlySelectedComponent, importedComponent); 
  }
}

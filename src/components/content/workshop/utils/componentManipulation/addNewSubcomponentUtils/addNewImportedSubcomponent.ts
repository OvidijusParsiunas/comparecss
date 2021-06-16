import { UniqueSubcomponentNameGenerator } from '../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../consts/layerSections.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../consts/coreSubcomponentNames.enum';
import { ImportedComponentGenerator } from '../../importComponent/importedComponentGenerator';
import { defaultButton } from '../../../newComponent/types/buttons/properties/default';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

type NewImportedSubcomponentsProperties = {
  baseName: string;
  subcomponents: Subcomponents;
}

export class AddNewImportedSubcomponent {

  private static findCurrentLayer(currentlySelectedComponent: WorkshopComponent): Layer {
    const currentLayer = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName];
    const { layers } = currentlySelectedComponent.componentPreviewStructure;
    return layers.find((layer) => layer.subcomponentProperties === currentLayer);
  }

  private static updateComponentPreviewStructureForImported(currentlySelectedComponent: WorkshopComponent, newImportedSubcomponentsProperties: NewImportedSubcomponentsProperties,
      currentLayer: Layer): void {
    const importedComponentStructure = ImportedComponentGenerator.createImportedComponentStructure(
      currentlySelectedComponent.subcomponents, newImportedSubcomponentsProperties.baseName, ALIGNED_SECTION_TYPES.RIGHT);
    currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name] = {
      [newImportedSubcomponentsProperties.baseName]: { ...importedComponentStructure.component[importedComponentStructure.baseName]},
      ...currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name],
    }
  }

  private static addNewImportedSubcomponentsToCurrentLayer(currentLayer: Layer, newImportedSubcomponentsProperties: NewImportedSubcomponentsProperties): void {
    currentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.LEFT].push(
      { name: newImportedSubcomponentsProperties.baseName, subcomponentProperties: newImportedSubcomponentsProperties.subcomponents[newImportedSubcomponentsProperties.baseName] },
    );
  }

  private static updateNewImportedSubcomponent(newImportedSubcomponentsProperties: NewImportedSubcomponentsProperties, currentLayer: Layer): void {
    newImportedSubcomponentsProperties.subcomponents[newImportedSubcomponentsProperties.baseName].parentLayer = currentLayer;
  }

  private static addNewImportedSubcomponentToComponentPreview(currentlySelectedComponent: WorkshopComponent, newImportedSubcomponentsProperties: NewImportedSubcomponentsProperties): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].layerSectionsType) {
      const currentLayer = AddNewImportedSubcomponent.findCurrentLayer(currentlySelectedComponent);
      AddNewImportedSubcomponent.updateNewImportedSubcomponent(newImportedSubcomponentsProperties, currentLayer);
      AddNewImportedSubcomponent.addNewImportedSubcomponentsToCurrentLayer(currentLayer, newImportedSubcomponentsProperties);
      AddNewImportedSubcomponent.updateComponentPreviewStructureForImported(currentlySelectedComponent, newImportedSubcomponentsProperties, currentLayer);
    }
  }

  private static addNewImportedSubcomponentsToSubcomponents(currentlySelectedComponent: WorkshopComponent, newImportedSubcomponentsProperties: Subcomponents): void {
    currentlySelectedComponent.subcomponents = {
      ...currentlySelectedComponent.subcomponents,
      ...newImportedSubcomponentsProperties,
    };  
  }

  private static createNewImportedSubcomponents(): NewImportedSubcomponentsProperties {
    const newSubcomponentName = UniqueSubcomponentNameGenerator.generate(CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON);
    return {
      baseName: newSubcomponentName,
      subcomponents: ImportedComponentGenerator.createImportedComponents(defaultButton, newSubcomponentName),
    }
  }

  public static add(currentlySelectedComponent: WorkshopComponent): void {
    const newImportedSubcomponentsProperties = AddNewImportedSubcomponent.createNewImportedSubcomponents();
    AddNewImportedSubcomponent.addNewImportedSubcomponentsToSubcomponents(currentlySelectedComponent, newImportedSubcomponentsProperties.subcomponents);
    AddNewImportedSubcomponent.addNewImportedSubcomponentToComponentPreview(currentlySelectedComponent, newImportedSubcomponentsProperties); 
  }
}

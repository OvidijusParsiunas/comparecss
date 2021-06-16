import { UniqueSubcomponentNameGenerator } from '../componentGenerator/uniqueSubcomponentNameGenerator';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../consts/layerSections.enum';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { EntityDisplayStatusUtils } from '../entityDisplayStatus/entityDisplayStatusUtils';
import { defaultCard } from '../../newComponent/types/cards/properties/default';
import { Layer } from '../../../../../interfaces/componentPreviewStructure';

type NewSubcomponentProperties = {
  id: string;
  subcomponentProperties: SubcomponentProperties;
}

export class AddSubcomponentUtils {

  private static updateComponentPreviewStructure(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties,
      currentLayer: Layer): void {
    currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name] = {
      [newSubcomponentProperties.id]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(newSubcomponentProperties.subcomponentProperties.subcomponentDisplayStatus),
      ...currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name],
    }
  }

  private static addNewSubcomponentToCurrentLayer(currentLayer: Layer, newSubcomponentProperties: NewSubcomponentProperties): void {
    currentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.LEFT].push(
      { name: newSubcomponentProperties.id, subcomponentProperties: newSubcomponentProperties.subcomponentProperties },
    );
  }

  private static updateNewSubcomponent(newSubcomponentProperties: NewSubcomponentProperties, currentLayer: Layer): void {
    newSubcomponentProperties.subcomponentProperties.parentLayer = currentLayer;
  }

  private static findCurrentLayer(currentlySelectedComponent: WorkshopComponent): Layer {
    const currentLayer = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName];
    const { layers } = currentlySelectedComponent.componentPreviewStructure;
    return layers.find((layer) => layer.subcomponentProperties === currentLayer);
  }

  private static addNewSubcomponentToComponentPreview(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].layerSectionsType) {
      const currentLayer = AddSubcomponentUtils.findCurrentLayer(currentlySelectedComponent);
      AddSubcomponentUtils.updateNewSubcomponent(newSubcomponentProperties, currentLayer);
      AddSubcomponentUtils.addNewSubcomponentToCurrentLayer(currentLayer, newSubcomponentProperties);
      AddSubcomponentUtils.updateComponentPreviewStructure(currentlySelectedComponent, newSubcomponentProperties, currentLayer);
    }
  }

  private static addNewSubcomponentToSubcomponents(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties): void {
    const { id, subcomponentProperties } = newSubcomponentProperties;
    currentlySelectedComponent.subcomponents = {
      ...currentlySelectedComponent.subcomponents,
      [id]: subcomponentProperties,
    };
  }

  private static createNewSubcomponent(): NewSubcomponentProperties {
    const newSubcomponentId = UniqueSubcomponentNameGenerator.generate(CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_TEXT);
    return { id: newSubcomponentId, subcomponentProperties: defaultCard.createNewSubcomponent() };
  }

  private static addImportedSubcomponent(currentlySelectedComponent: WorkshopComponent): void {
    // create new
    // const subcomponents = ImportedComponentGenerator.createImportedComponents(defaultButton, CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON);
    // // add new
    // currentlySelectedComponent.subcomponents = {
    //   ...currentlySelectedComponent.subcomponents,
    //   ...subcomponents,
    // };  
    // // update
    // currentlySelectedComponent.componentPreviewStructure.layers[2].sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.RIGHT].push(
    //   { name: CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON, subcomponentProperties: subcomponents[CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON] },
    // );
    // const importedComponentStructure = ImportedComponentGenerator.createImportedComponentStructure(
    //   currentlySelectedComponent.subcomponents, CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON, ALIGNED_SECTION_TYPES.RIGHT);
    //   subcomponents[CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON].parentLayer = currentlySelectedComponent.componentPreviewStructure.layers[2];
    // currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][CORE_SUBCOMPONENTS_NAMES.LAYER_3] = {
    //   [CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON]: { ...importedComponentStructure.component[importedComponentStructure.baseName]},
    //   ...currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][CORE_SUBCOMPONENTS_NAMES.LAYER_3],
    // }
  }
  
  public static addSubcomponent(currentlySelectedComponent: WorkshopComponent, subcomponentType = 'importedButton'): void {
    if (subcomponentType === 'importedButton') {
      AddSubcomponentUtils.addImportedSubcomponent(currentlySelectedComponent);
    } else {
      const newSubcomponent = AddSubcomponentUtils.createNewSubcomponent();
      AddSubcomponentUtils.addNewSubcomponentToSubcomponents(currentlySelectedComponent, newSubcomponent);
      AddSubcomponentUtils.addNewSubcomponentToComponentPreview(currentlySelectedComponent, newSubcomponent); 
    }
  }
}
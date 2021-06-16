import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../consts/layerSections.enum';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../consts/coreSubcomponentNames.enum';
import { EntityDisplayStatusUtils } from '../../entityDisplayStatus/entityDisplayStatusUtils';
import { defaultCard } from '../../../newComponent/types/cards/properties/default';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

type NewSubcomponentProperties = {
  name: string;
  subcomponentProperties: SubcomponentProperties;
}

export class AddNewNativeSubcomponent {

  private static findCurrentLayer(currentlySelectedComponent: WorkshopComponent): Layer {
    const currentLayer = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName];
    const { layers } = currentlySelectedComponent.componentPreviewStructure;
    return layers.find((layer) => layer.subcomponentProperties === currentLayer);
  }

  private static updateComponentPreviewStructure(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties,
      currentLayer: Layer): void {
    currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name] = {
      [newSubcomponentProperties.name]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(newSubcomponentProperties.subcomponentProperties.subcomponentDisplayStatus),
      ...currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name],
    }
  }

  private static addNewSubcomponentToCurrentLayer(currentLayer: Layer, newSubcomponentProperties: NewSubcomponentProperties): void {
    currentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.LEFT].push(
      { name: newSubcomponentProperties.name, subcomponentProperties: newSubcomponentProperties.subcomponentProperties },
    );
  }

  private static updateNewSubcomponent(newSubcomponentProperties: NewSubcomponentProperties, currentLayer: Layer): void {
    newSubcomponentProperties.subcomponentProperties.parentLayer = currentLayer;
  }

  private static addNewSubcomponentToComponentPreview(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties): void {
    if (currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].layerSectionsType) {
      const currentLayer = AddNewNativeSubcomponent.findCurrentLayer(currentlySelectedComponent);
      AddNewNativeSubcomponent.updateNewSubcomponent(newSubcomponentProperties, currentLayer);
      AddNewNativeSubcomponent.addNewSubcomponentToCurrentLayer(currentLayer, newSubcomponentProperties);
      AddNewNativeSubcomponent.updateComponentPreviewStructure(currentlySelectedComponent, newSubcomponentProperties, currentLayer);
    }
  }

  private static addNewSubcomponentToSubcomponents(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties): void {
    const { name, subcomponentProperties } = newSubcomponentProperties;
    currentlySelectedComponent.subcomponents = {
      ...currentlySelectedComponent.subcomponents,
      [name]: subcomponentProperties,
    };
  }

  private static createNewSubcomponent(): NewSubcomponentProperties {
    const newSubcomponentName = UniqueSubcomponentNameGenerator.generate(CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_TEXT);
    return { name: newSubcomponentName, subcomponentProperties: defaultCard.createNewSubcomponent() };
  }
  
  public static add(currentlySelectedComponent: WorkshopComponent): void {
    const newSubcomponent = AddNewNativeSubcomponent.createNewSubcomponent();
    AddNewNativeSubcomponent.addNewSubcomponentToSubcomponents(currentlySelectedComponent, newSubcomponent);
    AddNewNativeSubcomponent.addNewSubcomponentToComponentPreview(currentlySelectedComponent, newSubcomponent); 
  }
}

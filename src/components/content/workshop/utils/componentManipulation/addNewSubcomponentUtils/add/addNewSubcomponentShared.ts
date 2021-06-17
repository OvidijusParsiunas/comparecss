import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NewSubcomponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { defaultCard } from '../../../../newComponent/types/cards/properties/default';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';

export class AddNewSubcomponentShared {

  protected static readonly subcomponentTypeToName: { [key in SUBCOMPONENT_TYPES]?: CORE_SUBCOMPONENTS_NAMES } = {
    [SUBCOMPONENT_TYPES.LAYER_3]: CORE_SUBCOMPONENTS_NAMES.LAYER,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: CORE_SUBCOMPONENTS_NAMES.CLOSE,
    [SUBCOMPONENT_TYPES.BUTTON]: CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON,
    [SUBCOMPONENT_TYPES.SECTION_TEXT]: CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_TEXT,
    [SUBCOMPONENT_TYPES.TEXT]: CORE_SUBCOMPONENTS_NAMES.TEXT,
  }

  protected static addNewSubcomponentToCurrentLayer(currentLayer: Layer, newSubcomponentProperties: NewSubcomponentProperties): void {
    currentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.LEFT].push(newSubcomponentProperties);
  }

  protected static updateNewSubcomponentParentLayer(newSubcomponentProperties: NewSubcomponentProperties, currentLayer: Layer): void {
    newSubcomponentProperties.subcomponentProperties.parentLayer = currentLayer;
  }

  protected static findCurrentLayer(currentlySelectedComponent: WorkshopComponent): Layer {
    const currentLayer = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName];
    const { layers } = currentlySelectedComponent.componentPreviewStructure;
    return layers.find((layer) => layer.subcomponentProperties === currentLayer);
  }

  protected static addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent: WorkshopComponent, newSubcomponents: Subcomponents): void {
    currentlySelectedComponent.subcomponents = {
      ...currentlySelectedComponent.subcomponents,
      ...newSubcomponents,
    };  
  }

  protected static addNewSubcomponentToExistingSubcomponents(currentlySelectedComponent: WorkshopComponent, newSubcomponentProperties: NewSubcomponentProperties): void {
    const { name, subcomponentProperties } = newSubcomponentProperties;
    currentlySelectedComponent.subcomponents = {
      ...currentlySelectedComponent.subcomponents,
      [name]: subcomponentProperties,
    };
  }

  protected static createNewSubcomponent(subcomponentType: SUBCOMPONENT_TYPES): NewSubcomponentProperties {
    const subcomponentNamePrefix = AddNewSubcomponentShared.subcomponentTypeToName[subcomponentType];
    const newSubcomponentName = UniqueSubcomponentNameGenerator.generate(subcomponentNamePrefix);
    return { name: newSubcomponentName, subcomponentProperties: defaultCard.createNewSubcomponent(subcomponentType), };
  }
}

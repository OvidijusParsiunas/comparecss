import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NewSubcomponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';

export class AddNewSubcomponentShared {

  protected static readonly subcomponentTypeToName: { [key in SUBCOMPONENT_TYPES]?: CORE_SUBCOMPONENTS_NAMES } = {
    [SUBCOMPONENT_TYPES.LAYER]: CORE_SUBCOMPONENTS_NAMES.LAYER,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: CORE_SUBCOMPONENTS_NAMES.CLOSE,
    [SUBCOMPONENT_TYPES.BUTTON]: CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_BUTTON,
    [SUBCOMPONENT_TYPES.SECTION_TEXT]: CORE_SUBCOMPONENTS_NAMES.DYNAMICALLY_GENERATED_TEXT,
    [SUBCOMPONENT_TYPES.TEXT]: CORE_SUBCOMPONENTS_NAMES.TEXT,
    [SUBCOMPONENT_TYPES.AVATAR]: CORE_SUBCOMPONENTS_NAMES.AVATAR,
  }

  protected static addNewSubcomponentToCurrentLayer(currentLayer: Layer, newSubcomponentProperties: NewSubcomponentProperties): void {
    const alignment = newSubcomponentProperties.subcomponentProperties?.customFeatures?.alignedLayerSection?.section;
    currentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(newSubcomponentProperties);
  }

  protected static updateNewSubcomponentParentLayer(newSubcomponentProperties: NewSubcomponentProperties, currentLayer: Layer): void {
  newSubcomponentProperties.subcomponentProperties.parentLayer = currentLayer;
  }

  protected static findCurrentLayer(currentlySelectedComponent: WorkshopComponent, layerName?: CORE_SUBCOMPONENTS_NAMES | string): Layer {
    const { layers } = currentlySelectedComponent.componentPreviewStructure;
    if (layerName) {
      return layers.find((layer) => layer.name === layerName);
    }
    const currentLayer = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName];
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

  protected static createNewSubcomponent(componentGenerator: ComponentGenerator, subcomponentType: SUBCOMPONENT_TYPES): NewSubcomponentProperties {
    const subcomponentNamePrefix = AddNewSubcomponentShared.subcomponentTypeToName[subcomponentType];
    const newSubcomponentName = UniqueSubcomponentNameGenerator.generate(subcomponentNamePrefix);
    return { name: newSubcomponentName, subcomponentProperties: componentGenerator.createNewSubcomponent(subcomponentType) };
  }
}

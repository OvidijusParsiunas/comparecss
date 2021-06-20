import { NewComponentProperties, OverwritePropertiesFunc } from '../../../../../../../interfaces/addNewSubcomponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { Layer, NestedSubcomponent } from '../../../../../../../interfaces/componentPreviewStructure';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { closeButton } from '../../../../newComponent/types/buttons/properties/closeButton';
import { defaultButton } from '../../../../newComponent/types/buttons/properties/default';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { defaultText } from '../../../../newComponent/types/text/properties/default';
import { avatar } from '../../../../newComponent/types/avatar/properties/avatar';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

export class AddNewImportedComponent extends AddNewSubcomponentShared {

  private static readonly componentTypeToGenerator: { [key in SUBCOMPONENT_TYPES]?: ComponentGenerator } = {
    [SUBCOMPONENT_TYPES.AVATAR]: avatar,
    [SUBCOMPONENT_TYPES.TEXT]: defaultText,
    [SUBCOMPONENT_TYPES.BUTTON]: defaultButton,
    [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: closeButton,
  }

  private static updateComponentPreviewStructure(currentlySelectedComponent: WorkshopComponent, importedComponent: NewComponentProperties,
      currentLayer: Layer): void {
    const importedComponentStructure = ImportedComponentGenerator.createImportedComponentStructure(
      currentlySelectedComponent.subcomponents, importedComponent.baseName);
    currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name] = {
      [importedComponent.baseName]: { ...importedComponentStructure.component[importedComponentStructure.baseName]},
      ...currentlySelectedComponent.componentPreviewStructure.subcomponentDropdownStructure[CORE_SUBCOMPONENTS_NAMES.BASE][currentLayer.name],
    }
  }

  private static addNewSubcomponentToCurrentLayer(currentLayer: Layer, baseSubcomponentProperties: SubcomponentProperties,
      importedComponent: NewComponentProperties): void {
    const alignment = baseSubcomponentProperties?.customFeatures?.alignedLayerSection?.section;
    const nestedSubcomponentProperties: NestedSubcomponent = {
      name: importedComponent.baseName, subcomponentProperties: baseSubcomponentProperties};
    currentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(nestedSubcomponentProperties);
  }

  private static updateNewSubcomponentParentLayer(baseSubcomponentProperties: SubcomponentProperties, currentLayer: Layer): void {
    baseSubcomponentProperties.parentLayer = currentLayer;
  }

  private static findCurrentLayer(currentlySelectedComponent: WorkshopComponent, layerName?: CORE_SUBCOMPONENTS_NAMES | string): Layer {
    const { layers } = currentlySelectedComponent.componentPreviewStructure;
    if (layerName) {
      return layers.find((layer) => layer.name === layerName);
    }
    const currentLayer = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName];
    return layers.find((layer) => layer.subcomponentProperties === currentLayer);
  }

  private static addNewSubcomponentsToComponentPreview(currentlySelectedComponent: WorkshopComponent, importedComponent: NewComponentProperties,
      layerName?: CORE_SUBCOMPONENTS_NAMES | string): void {
    const currentLayer = AddNewImportedComponent.findCurrentLayer(currentlySelectedComponent, layerName);
    const baseSubcomponentProperties = importedComponent.subcomponents[importedComponent.baseName];
    AddNewImportedComponent.updateNewSubcomponentParentLayer(baseSubcomponentProperties, currentLayer);
    AddNewImportedComponent.addNewSubcomponentToCurrentLayer(currentLayer, baseSubcomponentProperties, importedComponent);
    AddNewImportedComponent.updateComponentPreviewStructure(currentlySelectedComponent, importedComponent, currentLayer);
  }

  // WORK1: currently adding default styles but may need to add a non default style in the future
  public static add(currentlySelectedComponent: WorkshopComponent, parentSubcomponentType: SUBCOMPONENT_TYPES,
      layerName?: CORE_SUBCOMPONENTS_NAMES | string, overwritePropertiesFunc?: OverwritePropertiesFunc): NewComponentProperties {
    const importedComponent = AddNewImportedComponent.createNewImportedComponent(parentSubcomponentType,
      AddNewImportedComponent.componentTypeToGenerator[parentSubcomponentType], overwritePropertiesFunc);
    AddNewImportedComponent.addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent, importedComponent.subcomponents);
    AddNewImportedComponent.addNewSubcomponentsToComponentPreview(currentlySelectedComponent, importedComponent, layerName);
    return importedComponent;
  }
}

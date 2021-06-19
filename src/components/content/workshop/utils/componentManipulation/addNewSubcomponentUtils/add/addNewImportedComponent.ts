import { NewImportedComponentProperties, NewSubcomponentProperties } from '../../../../../../../interfaces/addNewSubcomponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { closeButton } from '../../../../newComponent/types/buttons/properties/closeButton';
import { defaultButton } from '../../../../newComponent/types/buttons/properties/default';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { defaultText } from '../../../../newComponent/types/text/properties/default';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { avatar } from '../../../../newComponent/types/avatar/properties/avatar';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

type OverwritePropertiesFunc = (subcomponents: Subcomponents, subcomponentNames: CustomSubcomponentNames) => void

export class AddNewImportedComponent extends AddNewSubcomponentShared {

  private static readonly componentTypeToGenerator: { [key in SUBCOMPONENT_TYPES]?: ComponentGenerator } = {
    [SUBCOMPONENT_TYPES.AVATAR]: avatar,
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

  private static addNewSubcomponentToCurrentLayer(currentLayer: Layer, newSubcomponentProperties: NewSubcomponentProperties): void {
    const alignment = newSubcomponentProperties.subcomponentProperties?.customFeatures?.alignedLayerSection?.section;
    currentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(newSubcomponentProperties);
  }

  private static updateNewSubcomponentParentLayer(newSubcomponentProperties: NewSubcomponentProperties, currentLayer: Layer): void {
    newSubcomponentProperties.subcomponentProperties.parentLayer = currentLayer;
  }

  private static findCurrentLayer(currentlySelectedComponent: WorkshopComponent, layerName?: CORE_SUBCOMPONENTS_NAMES | string): Layer {
    const { layers } = currentlySelectedComponent.componentPreviewStructure;
    if (layerName) {
      return layers.find((layer) => layer.name === layerName);
    }
    const currentLayer = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName];
    return layers.find((layer) => layer.subcomponentProperties === currentLayer);
  }

  private static addNewSubcomponentsToComponentPreview(currentlySelectedComponent: WorkshopComponent, importedComponent: NewImportedComponentProperties,
      layerName?: CORE_SUBCOMPONENTS_NAMES | string): void {
    const currentLayer = AddNewImportedComponent.findCurrentLayer(currentlySelectedComponent, layerName);
    const baseSubcomponentProperties = {
      name: importedComponent.baseName, subcomponentProperties: importedComponent.subcomponents[importedComponent.baseName]};
    AddNewImportedComponent.updateNewSubcomponentParentLayer(baseSubcomponentProperties, currentLayer);
    AddNewImportedComponent.addNewSubcomponentToCurrentLayer(currentLayer, baseSubcomponentProperties);
    AddNewImportedComponent.updateComponentPreviewStructure(currentlySelectedComponent, importedComponent, currentLayer);
  }

  // WORK1: currently adding default styles but may need to add a non default style in the future
  public static add(currentlySelectedComponent: WorkshopComponent, parentSubcomponentType: SUBCOMPONENT_TYPES,
      layerName?: CORE_SUBCOMPONENTS_NAMES | string, overwritePropertiesFunc?: OverwritePropertiesFunc): NewImportedComponentProperties {
    const importedComponent = AddNewImportedComponent.createNewImportedComponent(parentSubcomponentType,
      AddNewImportedComponent.componentTypeToGenerator[parentSubcomponentType], overwritePropertiesFunc);
    AddNewImportedComponent.addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent, importedComponent.subcomponents);
    AddNewImportedComponent.addNewSubcomponentsToComponentPreview(currentlySelectedComponent, importedComponent, layerName);
    return importedComponent;
  }
}

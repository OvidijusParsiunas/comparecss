import { NewComponentProperties, OverwritePropertiesFunc } from '../../../../../../../interfaces/addNewSubcomponent';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { Layer, NestedSubcomponent } from '../../../../../../../interfaces/componentPreviewStructure';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { AddNewSubcomponentShared } from './addNewSubcomponentShared';

export class AddNewImportedComponent extends AddNewSubcomponentShared {

  // WORK1: The dropdown structure names should be adjusted every time to reflect better in the actual dropdown options
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

  private static findCurrentLayer(currentlySelectedComponent: WorkshopComponent, layerName: CORE_SUBCOMPONENTS_NAMES | string): Layer {
    return currentlySelectedComponent.componentPreviewStructure.layers.find((layer) => layer.name === layerName);
  }

  private static addNewSubcomponentsToComponentPreview(currentlySelectedComponent: WorkshopComponent, importedComponent: NewComponentProperties,
      layerName: CORE_SUBCOMPONENTS_NAMES | string): void {
    const currentLayer = AddNewImportedComponent.findCurrentLayer(currentlySelectedComponent, layerName);
    const baseSubcomponentProperties = importedComponent.subcomponents[importedComponent.baseName];
    AddNewImportedComponent.updateNewSubcomponentParentLayer(baseSubcomponentProperties, currentLayer);
    AddNewImportedComponent.addNewSubcomponentToCurrentLayer(currentLayer, baseSubcomponentProperties, importedComponent);
    AddNewImportedComponent.updateComponentPreviewStructure(currentlySelectedComponent, importedComponent, currentLayer);
  }

  public static add(currentlySelectedComponent: WorkshopComponent, componentType: NEW_COMPONENT_TYPES,
      layerName: CORE_SUBCOMPONENTS_NAMES | string, componentStyle: NEW_COMPONENT_STYLES,
      overwritePropertiesFunc?: OverwritePropertiesFunc): NewComponentProperties {
    const importedComponent = AddNewImportedComponent.createNewImportedComponent(componentType,
      componentTypeToStyleGenerators[componentType][componentStyle], overwritePropertiesFunc);
    AddNewImportedComponent.addNewSubcomponentsToExistingSubcomponents(currentlySelectedComponent, importedComponent.subcomponents);
    AddNewImportedComponent.addNewSubcomponentsToComponentPreview(currentlySelectedComponent, importedComponent, layerName);
    return importedComponent;
  }
}

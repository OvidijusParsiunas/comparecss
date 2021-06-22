import { NewComponentProperties, OverwritePropertiesFunc } from '../../../../../../../interfaces/addNewSubcomponent';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { Layer, NestedSubcomponent } from '../../../../../../../interfaces/componentPreviewStructure';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { ImportedComponentGenerator } from '../../../importComponent/importedComponentGenerator';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { NEW_COMPONENT_TYPES } from '../../../../../../../consts/newComponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { JsUtils } from '../../../../../../../services/jsUtils/jsUtils';

interface SubcomponentData {
  parentLayer: Layer;
  parentComponentBaseName: string;
  baseSubcomponentProperties: SubcomponentProperties;
  subcomponentDropdownStructure: NestedDropdownStructure;
  isParentLayerInSubcomponentsDropdown: boolean;
}

export class AddNewImportedComponent {

  private static readonly componentTypeToName: { [key in NEW_COMPONENT_TYPES]?: CORE_SUBCOMPONENTS_NAMES } = {
    [NEW_COMPONENT_TYPES.LAYER]: CORE_SUBCOMPONENTS_NAMES.LAYER,
    [NEW_COMPONENT_TYPES.BUTTON]: CORE_SUBCOMPONENTS_NAMES.BUTTON,
    [NEW_COMPONENT_TYPES.TEXT]: CORE_SUBCOMPONENTS_NAMES.TEXT,
    [NEW_COMPONENT_TYPES.AVATAR]: CORE_SUBCOMPONENTS_NAMES.AVATAR,
  }

  private static updateComponentPreviewStructure(parentComponent: WorkshopComponent, importedComponent: NewComponentProperties,
      parentSubcomponentObject: NestedDropdownStructure, subcomponentName: string): void {
    const importedComponentStructure = ImportedComponentGenerator.createImportedComponentStructure(
        parentComponent.subcomponents, importedComponent.baseName);
    const newNestedDropdownStructure = {
      [importedComponent.baseName]: { ...importedComponentStructure.component[importedComponentStructure.baseName] }};
    JsUtils.addObjects(parentSubcomponentObject, subcomponentName, newNestedDropdownStructure, false);
  }

  private static updateNewSubcomponentParentLayer(baseSubcomponentProperties: SubcomponentProperties, parentLayer: Layer): void {
    baseSubcomponentProperties.parentLayer = parentLayer;
  }

  private static addNewSubcomponentToparentLayer(parentLayer: Layer, baseSubcomponentProperties: SubcomponentProperties,
      importedComponent: NewComponentProperties): void {
    const alignment = baseSubcomponentProperties?.customFeatures?.alignedLayerSection?.section;
    const nestedSubcomponentProperties: NestedSubcomponent = {
      name: importedComponent.baseName, subcomponentProperties: baseSubcomponentProperties};
    parentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(nestedSubcomponentProperties);
  }

  private static findparentLayer(parentComponent: WorkshopComponent, layerName: CORE_SUBCOMPONENTS_NAMES | string): Layer {
    return parentComponent.componentPreviewStructure.layers.find((layer) => layer.name === layerName);
  }

  private static assembleSubcomponentData(parentComponent: WorkshopComponent, importedComponent: NewComponentProperties,
      layerName: CORE_SUBCOMPONENTS_NAMES | string): SubcomponentData {
    const parentLayer = AddNewImportedComponent.findparentLayer(parentComponent, layerName);
    const baseSubcomponentProperties = importedComponent.subcomponents[importedComponent.baseName];
    const { subcomponentDropdownStructure } = parentComponent.componentPreviewStructure;
    const parentComponentBaseName = Object.keys(subcomponentDropdownStructure)[0];
    const isParentLayerInSubcomponentsDropdown = !!subcomponentDropdownStructure[parentComponentBaseName][parentLayer.name];
    return { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure, parentComponentBaseName, isParentLayerInSubcomponentsDropdown };
  }

  private static addNewSubcomponentsToComponentPreview(parentComponent: WorkshopComponent, importedComponent: NewComponentProperties,
      layerName: CORE_SUBCOMPONENTS_NAMES | string): void {
    const { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure, parentComponentBaseName,
      isParentLayerInSubcomponentsDropdown } = AddNewImportedComponent.assembleSubcomponentData(parentComponent, importedComponent, layerName);
    AddNewImportedComponent.addNewSubcomponentToparentLayer(parentLayer, baseSubcomponentProperties, importedComponent);
    if (isParentLayerInSubcomponentsDropdown) {
      AddNewImportedComponent.updateNewSubcomponentParentLayer(baseSubcomponentProperties, parentLayer);
      AddNewImportedComponent.updateComponentPreviewStructure(parentComponent, importedComponent,
        subcomponentDropdownStructure[parentComponentBaseName] as NestedDropdownStructure, parentLayer.name);
    } else {
      AddNewImportedComponent.updateComponentPreviewStructure(parentComponent, importedComponent,
        subcomponentDropdownStructure, parentComponentBaseName);
    }
  }

  // WORK 1 - change names
  private static createNewImportedComponent(componentType: NEW_COMPONENT_TYPES, componentGenerator: ComponentGenerator,
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): NewComponentProperties {
    const baseName = UniqueSubcomponentNameGenerator.generate(AddNewImportedComponent.componentTypeToName[componentType]);
    const subcomponents = ImportedComponentGenerator.createImportedComponentSubcomponents(componentGenerator, baseName);
    const { subcomponentNames } = subcomponents[baseName].importedComponent.componentRef;
    (overwritePropertiesFunc || []).forEach((overwritePropertiesFunc) => {
      overwritePropertiesFunc(subcomponents, subcomponentNames);
    });
    return { baseName, subcomponents };
  }

  public static add(parentComponent: WorkshopComponent, componentType: NEW_COMPONENT_TYPES,
      componentStyle: NEW_COMPONENT_STYLES, layerName: CORE_SUBCOMPONENTS_NAMES | string,
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): NewComponentProperties {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const importedComponent = AddNewImportedComponent.createNewImportedComponent(componentType, componentGenerator, overwritePropertiesFunc);
    JsUtils.addObjects(parentComponent, 'subcomponents', importedComponent.subcomponents);
    AddNewImportedComponent.addNewSubcomponentsToComponentPreview(parentComponent, importedComponent, layerName);
    return importedComponent;
  }
}

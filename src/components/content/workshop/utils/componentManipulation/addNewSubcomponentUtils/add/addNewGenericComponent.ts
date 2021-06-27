import { NewComponentProperties, OverwritePropertiesFunc } from '../../../../../../../interfaces/addNewSubcomponent';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { Layer, NestedSubcomponent } from '../../../../../../../interfaces/componentPreviewStructure';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { NestedComponentGenerator } from '../../../importComponent/nestedComponentGenerator';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { JsUtils } from '../../../../../../../services/jsUtils/jsUtils';

interface SubcomponentData {
  parentLayer: Layer;
  parentComponentBaseName: string;
  baseSubcomponentProperties: SubcomponentProperties;
  subcomponentDropdownStructure: NestedDropdownStructure;
  isParentLayerInSubcomponentsDropdown: boolean;
}

export class AddNewGenericComponent {

  private static readonly componentTypeToName: { [key in COMPONENT_TYPES]?: CORE_SUBCOMPONENTS_NAMES } = {
    [COMPONENT_TYPES.LAYER]: CORE_SUBCOMPONENTS_NAMES.LAYER,
    [COMPONENT_TYPES.BUTTON]: CORE_SUBCOMPONENTS_NAMES.BUTTON,
    [COMPONENT_TYPES.TEXT]: CORE_SUBCOMPONENTS_NAMES.TEXT,
    [COMPONENT_TYPES.AVATAR]: CORE_SUBCOMPONENTS_NAMES.AVATAR,
  }

  private static updateComponentPreviewStructure(parentComponent: WorkshopComponent, nestedComponent: NewComponentProperties,
      parentSubcomponentObject: NestedDropdownStructure, subcomponentName: string): void {
    // WORK1: the NestedComponentStructure is no longer required and createNestedComponentStructure should just create a new nestedDropdownStructure
    const nestedComponentStructure = NestedComponentGenerator.createNestedComponentStructure(
        parentComponent.subcomponents, nestedComponent.baseName);
    const newNestedDropdownStructure = {
      [nestedComponent.baseName]: { ...nestedComponentStructure.component[nestedComponentStructure.baseName] }};
    JsUtils.addObjects(parentSubcomponentObject, subcomponentName, newNestedDropdownStructure, false);
  }

  private static updateNewSubcomponentParentLayer(baseSubcomponentProperties: SubcomponentProperties, parentLayer: Layer): void {
    baseSubcomponentProperties.parentLayer = parentLayer;
  }

  private static addNewSubcomponentToparentLayer(parentLayer: Layer, baseSubcomponentProperties: SubcomponentProperties,
      nestedComponent: NewComponentProperties): void {
    const alignment = baseSubcomponentProperties?.customFeatures?.alignedLayerSection?.section;
    const nestedSubcomponentProperties: NestedSubcomponent = {
      name: nestedComponent.baseName, subcomponentProperties: baseSubcomponentProperties};
    parentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(nestedSubcomponentProperties);
  }

  private static findparentLayer(parentComponent: WorkshopComponent, layerName: CORE_SUBCOMPONENTS_NAMES | string): Layer {
    return parentComponent.componentPreviewStructure.layers.find((layer) => layer.name === layerName);
  }

  private static assembleSubcomponentData(parentComponent: WorkshopComponent, nestedComponent: NewComponentProperties,
      layerName: CORE_SUBCOMPONENTS_NAMES | string): SubcomponentData {
    const parentLayer = AddNewGenericComponent.findparentLayer(parentComponent, layerName);
    const baseSubcomponentProperties = nestedComponent.subcomponents[nestedComponent.baseName];
    const { subcomponentDropdownStructure } = parentComponent.componentPreviewStructure;
    const parentComponentBaseName = Object.keys(subcomponentDropdownStructure)[0];
    const isParentLayerInSubcomponentsDropdown = !!subcomponentDropdownStructure[parentComponentBaseName][parentLayer.name];
    return { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure, parentComponentBaseName, isParentLayerInSubcomponentsDropdown };
  }

  private static addNewSubcomponentsToComponentPreview(parentComponent: WorkshopComponent, nestedComponent: NewComponentProperties,
      layerName: CORE_SUBCOMPONENTS_NAMES | string): void {
    const { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure, parentComponentBaseName,
      isParentLayerInSubcomponentsDropdown } = AddNewGenericComponent.assembleSubcomponentData(parentComponent, nestedComponent, layerName);
    AddNewGenericComponent.addNewSubcomponentToparentLayer(parentLayer, baseSubcomponentProperties, nestedComponent);
    if (isParentLayerInSubcomponentsDropdown) {
      AddNewGenericComponent.updateNewSubcomponentParentLayer(baseSubcomponentProperties, parentLayer);
      AddNewGenericComponent.updateComponentPreviewStructure(parentComponent, nestedComponent,
        subcomponentDropdownStructure[parentComponentBaseName] as NestedDropdownStructure, parentLayer.name);
    } else {
      AddNewGenericComponent.updateComponentPreviewStructure(parentComponent, nestedComponent,
        subcomponentDropdownStructure, parentComponentBaseName);
    }
  }

  // WORK 1 - change names
  private static createNewNestedComponent(componentType: COMPONENT_TYPES, componentGenerator: ComponentGenerator,
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): NewComponentProperties {
    const baseName = UniqueSubcomponentNameGenerator.generate(AddNewGenericComponent.componentTypeToName[componentType]);
    const subcomponents = NestedComponentGenerator.createNestedComponentSubcomponents(componentGenerator, baseName);
    const { subcomponentNames } = subcomponents[baseName].nestedComponent.ref;
    const funcArray = overwritePropertiesFunc.filter((func) => typeof func === 'function');
    funcArray.forEach((overwritePropertiesFunc) => {
      overwritePropertiesFunc(subcomponents, subcomponentNames);
    });
    return { baseName, subcomponents };
  }

  public static add(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES,
      componentStyle: COMPONENT_STYLES, layerName: CORE_SUBCOMPONENTS_NAMES | string,
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): NewComponentProperties {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const nestedComponent = AddNewGenericComponent.createNewNestedComponent(componentType, componentGenerator, overwritePropertiesFunc);
    JsUtils.addObjects(parentComponent, 'subcomponents', nestedComponent.subcomponents);
    AddNewGenericComponent.addNewSubcomponentsToComponentPreview(parentComponent, nestedComponent, layerName);
    return nestedComponent;
  }
}

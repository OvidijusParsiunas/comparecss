import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NewComponentProperties, OverwritePropertiesFunc } from '../../../../../../../interfaces/addNewSubcomponent';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { NESTED_SUBCOMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { Layer, NestedSubcomponent } from '../../../../../../../interfaces/componentPreviewStructure';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewNestedComponentShared } from './addNewNestedComponentShared';
import { JsUtils } from '../../../../../../../services/jsUtils/jsUtils';

interface SubcomponentData {
  parentLayer: Layer;
  parentComponentBaseName: string;
  baseSubcomponentProperties: SubcomponentProperties;
  subcomponentDropdownStructure: NestedDropdownStructure;
  isParentLayerInSubcomponentsDropdown: boolean;
}

export class AddNewGenericComponent extends AddNewNestedComponentShared {

  // base name is also used in the dropdown
  private static readonly componentTypeToBaseName: { [key in COMPONENT_TYPES]?: NESTED_SUBCOMPONENTS_BASE_NAMES } = {
    [COMPONENT_TYPES.LAYER]: NESTED_SUBCOMPONENTS_BASE_NAMES.LAYER,
    [COMPONENT_TYPES.BUTTON]: NESTED_SUBCOMPONENTS_BASE_NAMES.BUTTON,
    [COMPONENT_TYPES.TEXT]: NESTED_SUBCOMPONENTS_BASE_NAMES.TEXT,
    [COMPONENT_TYPES.AVATAR]: NESTED_SUBCOMPONENTS_BASE_NAMES.AVATAR,
  }
  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  private static updateComponentPreviewStructure(parentComponent: WorkshopComponent, nestedComponent: NewComponentProperties,
      parentSubcomponentObject: NestedDropdownStructure, subcomponentName: string): void {
    // subcomponent base dropdown structure
    const base = parentComponent.subcomponents[nestedComponent.baseName].nestedComponent.ref
      .componentPreviewStructure.subcomponentDropdownStructure[nestedComponent.baseName];
    // WORK1 this will not be needed
    base.optionalSubcomponentRef.isDisplayed = true;
    const newNestedDropdownStructure = {
      [nestedComponent.baseName]: { ...base }};
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

  private static findParentLayer(parentComponent: WorkshopComponent, layerName: string): Layer {
    return parentComponent.componentPreviewStructure.layers.find((layer) => layer.name === layerName);
  }

  private static assembleSubcomponentData(parentComponent: WorkshopComponent, nestedComponent: NewComponentProperties,
      layerName: string): SubcomponentData {
    const parentLayer = AddNewGenericComponent.findParentLayer(parentComponent, layerName);
    const baseSubcomponentProperties = nestedComponent.subcomponents[nestedComponent.baseName];
    const { subcomponentDropdownStructure } = parentComponent.componentPreviewStructure;
    const parentComponentBaseName = Object.keys(subcomponentDropdownStructure)[0];
    const isParentLayerInSubcomponentsDropdown = !!subcomponentDropdownStructure[parentComponentBaseName][parentLayer.name];
    return { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure, parentComponentBaseName, isParentLayerInSubcomponentsDropdown };
  }

  private static addNewSubcomponentsToComponentPreview(parentComponent: WorkshopComponent, nestedComponent: NewComponentProperties,
      layerName: string): void {
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

  private static executeOverwritePropertiesFuncs(overwritePropertiesFunc: OverwritePropertiesFunc[], subcomponents: Subcomponents,
      baseName: string): void {
    const { coreSubcomponentNames } = subcomponents[baseName].nestedComponent.ref;
    const funcArray = overwritePropertiesFunc.filter((func) => typeof func === 'function');
    funcArray.forEach((overwritePropertiesFunc) => {
      overwritePropertiesFunc(subcomponents, coreSubcomponentNames);
    });
  }

  private static applyTopProperty(baseSubcomponent: SubcomponentProperties): void {
    const customCssProperties = baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const defaultCustomCssProperties = baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT];
    if (!customCssProperties.top) {
      customCssProperties.top = AddNewGenericComponent.DEFAULT_TOP_PROPERTY;
      defaultCustomCssProperties.top = AddNewGenericComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  private static createNewComponent(componentType: COMPONENT_TYPES, componentGenerator: ComponentGenerator,
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): NewComponentProperties {
    const baseName = UniqueSubcomponentNameGenerator.generate(AddNewGenericComponent.componentTypeToBaseName[componentType]);
    const subcomponents = AddNewNestedComponentShared.createNewComponentSubcomponents(componentGenerator, baseName);
    AddNewGenericComponent.applyTopProperty(subcomponents[baseName]);
    if (overwritePropertiesFunc) {
      AddNewGenericComponent.executeOverwritePropertiesFuncs(overwritePropertiesFunc, subcomponents, baseName);
    }
    return { baseName, subcomponents };
  }

  public static add(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, layerName: string,
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): NewComponentProperties {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const nestedComponent = AddNewGenericComponent.createNewComponent(componentType, componentGenerator, overwritePropertiesFunc);
    JsUtils.addObjects(parentComponent, 'subcomponents', nestedComponent.subcomponents);
    AddNewGenericComponent.addNewSubcomponentsToComponentPreview(parentComponent, nestedComponent, layerName);
    return nestedComponent;
  }
}

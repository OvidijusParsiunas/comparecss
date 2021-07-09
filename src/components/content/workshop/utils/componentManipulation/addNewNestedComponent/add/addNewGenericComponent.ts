import { DropdownOptionDisplayStatus, DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { NESTED_SUBCOMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { Layer, NestedSubcomponent } from '../../../../../../../interfaces/componentPreviewStructure';
import { ComponentPreviewStructureSearchUtils } from '../utils/componentPreviewStractureSearchUtils';
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

  // base name is used in dropdown options
  private static readonly componentTypeToBaseName: { [key in COMPONENT_TYPES]?: NESTED_SUBCOMPONENTS_BASE_NAMES } = {
    [COMPONENT_TYPES.LAYER]: NESTED_SUBCOMPONENTS_BASE_NAMES.LAYER,
    [COMPONENT_TYPES.BUTTON]: NESTED_SUBCOMPONENTS_BASE_NAMES.BUTTON,
    [COMPONENT_TYPES.TEXT]: NESTED_SUBCOMPONENTS_BASE_NAMES.TEXT,
    [COMPONENT_TYPES.AVATAR]: NESTED_SUBCOMPONENTS_BASE_NAMES.AVATAR,
  }
  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  private static updateComponentDropdownStructure(nestedComponent: WorkshopComponent,
      subcomponentDropdownStructure: NestedDropdownStructure, baseSubcomponentName: string): void {
    const { coreSubcomponentNames: { base: baseName }, componentPreviewStructure } = nestedComponent;
    const nestedComponentBaseDropdownStructure = componentPreviewStructure.subcomponentDropdownStructure[baseName];
    (nestedComponentBaseDropdownStructure[DROPDOWN_OPTION_DISPLAY_STATUS_REF] as DropdownOptionDisplayStatus).isEnabled = true;
    const newComponentDropdownStructure = {
      [baseName]: { ...nestedComponentBaseDropdownStructure }};
    JsUtils.addObjects(subcomponentDropdownStructure, baseSubcomponentName, newComponentDropdownStructure, true);
  }

  private static updateNewSubcomponentParentLayer(baseSubcomponentProperties: SubcomponentProperties, parentLayer: Layer): void {
    baseSubcomponentProperties.parentLayer = parentLayer;
  }

  private static addNewSubcomponentToParentLayer(parentLayer: Layer, baseSubcomponentProperties: SubcomponentProperties,
      nestedComponent: WorkshopComponent): void {
    const alignment = baseSubcomponentProperties?.customFeatures?.alignedLayerSection?.section;
    const nestedSubcomponentProperties: NestedSubcomponent = {
      name: nestedComponent.coreSubcomponentNames.base, subcomponentProperties: baseSubcomponentProperties};
    parentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(nestedSubcomponentProperties);
  }

  private static assembleSubcomponentData(parentComponent: WorkshopComponent, nestedComponent: WorkshopComponent,
      layerName: string): SubcomponentData {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(parentComponent, layerName);
    const baseSubcomponentProperties = nestedComponent.componentPreviewStructure.baseSubcomponentProperties;
    const { subcomponentDropdownStructure } = parentComponent.componentPreviewStructure;
    const parentComponentBaseName = Object.keys(subcomponentDropdownStructure)[0];
    const isParentLayerInSubcomponentsDropdown = !!subcomponentDropdownStructure[parentComponentBaseName][parentLayer.name];
    return { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure, parentComponentBaseName, isParentLayerInSubcomponentsDropdown };
  }

  private static addNewSubcomponentsToComponentPreview(parentComponent: WorkshopComponent, nestedComponent: WorkshopComponent,
      layerName: string): void {
    const { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure, parentComponentBaseName,
      isParentLayerInSubcomponentsDropdown } = AddNewGenericComponent.assembleSubcomponentData(parentComponent, nestedComponent, layerName);
    AddNewGenericComponent.addNewSubcomponentToParentLayer(parentLayer, baseSubcomponentProperties, nestedComponent);
    if (isParentLayerInSubcomponentsDropdown) {
      AddNewGenericComponent.updateNewSubcomponentParentLayer(baseSubcomponentProperties, parentLayer);
      AddNewGenericComponent.updateComponentDropdownStructure(nestedComponent,
        subcomponentDropdownStructure[parentComponentBaseName] as NestedDropdownStructure, parentLayer.name);
    } else {
      AddNewGenericComponent.updateComponentDropdownStructure(nestedComponent, subcomponentDropdownStructure, parentComponentBaseName);
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
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const baseName = UniqueSubcomponentNameGenerator.generate(AddNewGenericComponent.componentTypeToBaseName[componentType]);
    const subcomponents = AddNewNestedComponentShared.createNewComponentSubcomponents(componentGenerator, baseName);
    AddNewGenericComponent.applyTopProperty(subcomponents[baseName]);
    if (overwritePropertiesFunc) {
      AddNewGenericComponent.executeOverwritePropertiesFuncs(overwritePropertiesFunc, subcomponents, baseName);
    }
    return subcomponents[baseName].nestedComponent.ref;
  }

  public static add(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, layerName: string,
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const nestedComponent = AddNewGenericComponent.createNewComponent(componentType, componentGenerator, overwritePropertiesFunc);
    JsUtils.addObjects(parentComponent, 'subcomponents', nestedComponent.subcomponents);
    AddNewGenericComponent.addNewSubcomponentsToComponentPreview(parentComponent, nestedComponent, layerName);
    return nestedComponent;
  }
}

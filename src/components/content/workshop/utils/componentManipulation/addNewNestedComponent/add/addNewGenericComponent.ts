import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { NESTED_SUBCOMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { Layer, NestedSubcomponent } from '../../../../../../../interfaces/componentPreviewStructure';
import { ComponentPreviewStructureSearchUtils } from '../utils/componentPreviewStractureSearchUtils';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewComponentShared } from './addNewComponentShared';
import JSONUtils from '../../../generic/jsonUtils';

interface SubcomponentData {
  parentLayer: Layer;
  parentComponentBaseName: string;
  baseSubcomponentProperties: SubcomponentProperties;
  subcomponentDropdownStructure: NestedDropdownStructure;
  isParentLayerInSubcomponentsDropdown: boolean;
}

export class AddNewGenericComponent extends AddNewComponentShared {

  // base name is used in dropdown options
  private static readonly componentTypeToBaseName: { [key in COMPONENT_TYPES]?: NESTED_SUBCOMPONENTS_BASE_NAMES } = {
    [COMPONENT_TYPES.LAYER]: NESTED_SUBCOMPONENTS_BASE_NAMES.LAYER,
    [COMPONENT_TYPES.BUTTON]: NESTED_SUBCOMPONENTS_BASE_NAMES.BUTTON,
    [COMPONENT_TYPES.TEXT]: NESTED_SUBCOMPONENTS_BASE_NAMES.TEXT,
    [COMPONENT_TYPES.AVATAR]: NESTED_SUBCOMPONENTS_BASE_NAMES.AVATAR,
  }
  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  // WORK2 - repeated
  private static addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    const baseName = newComponent.coreSubcomponentNames.base;
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[baseName] = baseName;
  }

  private static updateComponentDropdownStructure(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      subcomponentDropdownStructure: NestedDropdownStructure, baseSubcomponentName: string): void {
    const { coreSubcomponentNames: { base: baseName }, componentPreviewStructure } = newComponent;
    const nestedComponentBaseDropdownStructure = componentPreviewStructure.subcomponentDropdownStructure[baseName]; 
    nestedComponentBaseDropdownStructure[DROPDOWN_OPTION_AUX_DETAILS_REF] = { isEnabled: true, actualObjectName: baseName }
    const newComponentDropdownStructure = { [baseName]: { ...nestedComponentBaseDropdownStructure }};
    JSONUtils.addObjects(subcomponentDropdownStructure, baseSubcomponentName, newComponentDropdownStructure, true);
    JSONUtils.addObjects(parentComponent.componentPreviewStructure, 'subcomponentNameToDropdownOptionName',
      newComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, true);
  }

  private static updateNewSubcomponentParentLayer(baseSubcomponentProperties: SubcomponentProperties, parentLayer: Layer): void {
    baseSubcomponentProperties.parentLayer = parentLayer;
  }

  private static addNewSubcomponentToParentLayer(parentLayer: Layer, baseSubcomponentProperties: SubcomponentProperties,
    newComponent: WorkshopComponent): void {
    const alignment = baseSubcomponentProperties?.customFeatures?.alignedLayerSection?.section;
    const nestedSubcomponentProperties: NestedSubcomponent = {
      name: newComponent.coreSubcomponentNames.base, subcomponentProperties: baseSubcomponentProperties};
    parentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(nestedSubcomponentProperties);
  }

  private static assembleSubcomponentData(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      layerName: string): SubcomponentData {
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(parentComponent, layerName);
    const baseSubcomponentProperties = newComponent.componentPreviewStructure.baseSubcomponentProperties;
    const { subcomponentDropdownStructure } = parentComponent.componentPreviewStructure;
    const parentComponentBaseName = Object.keys(subcomponentDropdownStructure)[0];
    const isParentLayerInSubcomponentsDropdown = !!subcomponentDropdownStructure[parentComponentBaseName][parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentLayer.name]];
    return { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure, parentComponentBaseName, isParentLayerInSubcomponentsDropdown };
  }

  private static addNewSubcomponentsToComponentPreview(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      layerName: string): void {
    const { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure, parentComponentBaseName,
      isParentLayerInSubcomponentsDropdown } = AddNewGenericComponent.assembleSubcomponentData(parentComponent, newComponent, layerName);
    AddNewGenericComponent.addNewSubcomponentToParentLayer(parentLayer, baseSubcomponentProperties, newComponent);
    if (isParentLayerInSubcomponentsDropdown) {
      AddNewGenericComponent.updateNewSubcomponentParentLayer(baseSubcomponentProperties, parentLayer);
      const parentLayerDropdownName = parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentLayer.name];
      AddNewGenericComponent.updateComponentDropdownStructure(parentComponent, newComponent,
        subcomponentDropdownStructure[parentComponentBaseName] as NestedDropdownStructure, parentLayerDropdownName);
    } else {
      AddNewGenericComponent.updateComponentDropdownStructure(parentComponent, newComponent,
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
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const baseName = UniqueSubcomponentNameGenerator.generate(AddNewGenericComponent.componentTypeToBaseName[componentType]);
    const subcomponents = AddNewComponentShared.createNewComponentSubcomponents(componentGenerator, baseName);
    AddNewGenericComponent.applyTopProperty(subcomponents[baseName]);
    if (overwritePropertiesFunc) {
      AddNewGenericComponent.executeOverwritePropertiesFuncs(overwritePropertiesFunc, subcomponents, baseName);
    }
    return subcomponents[baseName].nestedComponent.ref;
  }

  public static add(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, layerName: string,
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const newComponent = AddNewGenericComponent.createNewComponent(componentType, componentGenerator, overwritePropertiesFunc);
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    AddNewGenericComponent.addNewSubcomponentsToComponentPreview(parentComponent, newComponent, layerName);
    InterconnectedSettings.update(true, parentComponent, newComponent.subcomponents[newComponent.coreSubcomponentNames.base]);
    AddNewGenericComponent.addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent, newComponent);
    return newComponent;
  }
}

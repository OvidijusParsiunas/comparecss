import { BUTTON_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { IncrementNestedComponentCount } from '../../nestedComponentCount/incrementNestedComponentCount';
import { ComponentPreviewStructureSearchUtils } from '../utils/componentPreviewStractureSearchUtils';
import { Layer, NestedComponent } from '../../../../../../../interfaces/componentPreviewStructure';
import { BUTTON_STYLES, COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import { MultiBaseComponentUtils } from '../../../multiBaseComponent/multiBaseComponentUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
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
type NewComponentDetails = [WorkshopComponent, string];

export class AddNewGenericComponent extends AddNewComponentShared {

  // base name is used in dropdown options
  private static readonly componentTypeToBaseName: { [key in COMPONENT_TYPES]?: NESTED_COMPONENTS_BASE_NAMES } = {
    [COMPONENT_TYPES.LAYER]: LAYER_COMPONENTS_BASE_NAMES.LAYER,
    [COMPONENT_TYPES.BUTTON]: BUTTON_COMPONENTS_BASE_NAMES.BUTTON,
    [COMPONENT_TYPES.TEXT]: PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT,
    [COMPONENT_TYPES.IMAGE]: PRIMITIVE_COMPONENTS_BASE_NAMES.IMAGE,
  };
  public static readonly componentBaseNameToType: { [key in NESTED_COMPONENTS_BASE_NAMES]?: COMPONENT_TYPES } = {
    ...JSONUtils.reverseMap(AddNewGenericComponent.componentTypeToBaseName),
    [BUTTON_COMPONENTS_BASE_NAMES.CLOSE]: COMPONENT_TYPES.BUTTON,
    [LAYER_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM]: COMPONENT_TYPES.LAYER,
  };
  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  private static getBaseSubcomponentNamePrefix(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES): NESTED_COMPONENTS_BASE_NAMES {
    if (componentType === COMPONENT_TYPES.BUTTON) {
      if (componentStyle === BUTTON_STYLES.CLOSE) {
        return BUTTON_COMPONENTS_BASE_NAMES.CLOSE;
      }
      return BUTTON_COMPONENTS_BASE_NAMES.BUTTON;
    }
    return AddNewGenericComponent.componentTypeToBaseName[componentType];
  }

  private static updateComponentDropdownStructure(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      subcomponentDropdownStructure: NestedDropdownStructure, baseSubcomponentName: string): void {
    const { coreSubcomponentNames: { base: baseName }, componentPreviewStructure } = newComponent;
    const nestedComponentBaseDropdownStructure = componentPreviewStructure.subcomponentDropdownStructure[baseName]; 
    nestedComponentBaseDropdownStructure[DROPDOWN_OPTION_AUX_DETAILS_REF] = { isEnabled: true, actualObjectName: baseName };
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
    const nestedComponent: NestedComponent = {
      name: newComponent.coreSubcomponentNames.base, subcomponentProperties: baseSubcomponentProperties};
    parentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(nestedComponent);
  }

  private static assembleSubcomponentData(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      layerName: string): SubcomponentData {
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(activeBaseComponent, layerName);
    const baseSubcomponentProperties = newComponent.componentPreviewStructure.baseSubcomponentProperties;
    const parentComponentBaseName = Object.keys(activeBaseComponent.componentPreviewStructure.subcomponentDropdownStructure)[0];
    const isParentLayerInSubcomponentsDropdown = !!parentComponent.componentPreviewStructure.subcomponentDropdownStructure[parentComponentBaseName]
      [parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentLayer.name]];
    return { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure: parentComponent.componentPreviewStructure.subcomponentDropdownStructure, parentComponentBaseName, isParentLayerInSubcomponentsDropdown };
  }

  private static addNewComponentToDropdownStructure(parentComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent, newComponent: WorkshopComponent,
      subcomponentData: SubcomponentData): void {
    const { parentLayer, baseSubcomponentProperties, subcomponentDropdownStructure, parentComponentBaseName, isParentLayerInSubcomponentsDropdown } = subcomponentData;
    if (isParentLayerInSubcomponentsDropdown) {
      AddNewGenericComponent.updateNewSubcomponentParentLayer(baseSubcomponentProperties, parentLayer);
      const parentLayerDropdownName = parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentLayer.name];
      AddNewGenericComponent.updateComponentDropdownStructure(parentComponent, newComponent,
        subcomponentDropdownStructure[parentComponentBaseName] as NestedDropdownStructure, parentLayerDropdownName);
    } else {
      AddNewGenericComponent.updateComponentDropdownStructure(parentComponent, newComponent, subcomponentDropdownStructure, parentComponentBaseName);
    }
  }

  protected static addNewComponentToComponentPreview(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      layerName: string): SubcomponentData {
    const subcomponentData = AddNewGenericComponent.assembleSubcomponentData(parentComponent, newComponent, layerName);
    const { parentLayer, baseSubcomponentProperties } = subcomponentData;
    AddNewGenericComponent.addNewSubcomponentToParentLayer(parentLayer, baseSubcomponentProperties, newComponent);
    return subcomponentData;
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

  protected static createNewComponent(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      componentGenerator: ComponentGenerator, overwritePropertiesFunc?: OverwritePropertiesFunc[], customBaseName?: string): NewComponentDetails {
    const baseNamePrefix = AddNewGenericComponent.getBaseSubcomponentNamePrefix(componentType, componentStyle);
    const baseName = customBaseName || UniqueSubcomponentNameGenerator.generate(baseNamePrefix);
    const subcomponents = AddNewComponentShared.createNewComponentSubcomponents(componentGenerator, baseName);
    AddNewGenericComponent.applyTopProperty(subcomponents[baseName]);
    if (overwritePropertiesFunc) {
      AddNewGenericComponent.executeOverwritePropertiesFuncs(overwritePropertiesFunc, subcomponents, baseName);
    }
    return [subcomponents[baseName].nestedComponent.ref, baseNamePrefix];
  }

  public static add(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      layerName: string, overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const [newComponent, baseNamePrefix] = AddNewGenericComponent.createNewComponent(componentType, componentStyle,
      componentGenerator, overwritePropertiesFunc);
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const subcomponentData = AddNewGenericComponent.addNewComponentToComponentPreview(parentComponent, newComponent, layerName);
    AddNewGenericComponent.addNewComponentToDropdownStructure(parentComponent, activeBaseComponent, newComponent, subcomponentData);
    AddNewComponentShared.addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent, newComponent);
    InterconnectedSettings.update(true, activeBaseComponent, newComponent.subcomponents[newComponent.coreSubcomponentNames.base]);
    IncrementNestedComponentCount.increment(activeBaseComponent, baseNamePrefix, layerName);
    return newComponent;
  }
}

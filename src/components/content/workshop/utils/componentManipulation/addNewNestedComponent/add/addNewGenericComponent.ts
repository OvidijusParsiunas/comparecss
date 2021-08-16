import { BUTTON_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { IncrementNestedComponentCount } from '../../nestedComponentCount/incrementNestedComponentCount';
import { ComponentPreviewStructureSearchUtils } from '../utils/componentPreviewStractureSearchUtils';
import { Layer, NestedComponent } from '../../../../../../../interfaces/componentPreviewStructure';
import { BUTTON_STYLES, COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CoreSubcomponentRefsUtils } from '../../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import { MultiBaseComponentUtils } from '../../../multiBaseComponent/multiBaseComponentUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewComponentShared } from './addNewComponentShared';
import JSONUtils from '../../../generic/jsonUtils';

interface SubcomponentData {
  parentLayer: Layer;
  parentComponentBaseName: string;
  baseSubcomponent: SubcomponentProperties;
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
    [COMPONENT_TYPES.ICON]: PRIMITIVE_COMPONENTS_BASE_NAMES.ICON,
  };
  public static readonly componentBaseNameToType: { [key in NESTED_COMPONENTS_BASE_NAMES]?: COMPONENT_TYPES } = {
    ...JSONUtils.reverseMap(AddNewGenericComponent.componentTypeToBaseName),
    [BUTTON_COMPONENTS_BASE_NAMES.CLOSE]: COMPONENT_TYPES.BUTTON,
    [LAYER_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM]: COMPONENT_TYPES.LAYER,
  };
  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  private static populateCoreComponentRef(parentComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    const baseSubcomponent = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const { subcomponentType }: { subcomponentType?: number } = baseSubcomponent;
    JSONUtils.setPropertyIfExists(parentComponent.coreSubcomponentRefs, subcomponentType, baseSubcomponent);
    const { otherSubcomponentsToTrigger } = parentComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (otherSubcomponentsToTrigger) JSONUtils.setPropertyIfExists(otherSubcomponentsToTrigger, subcomponentType, baseSubcomponent);
    CoreSubcomponentRefsUtils.executeReferenceSharingExecutables(parentComponent);
    parentComponent.referenceSharingExecutables?.[0]?.(parentComponent.coreSubcomponentRefs);
  }

  private static getBaseSubcomponentNamePrefix(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES): NESTED_COMPONENTS_BASE_NAMES {
    if (componentType === COMPONENT_TYPES.BUTTON) {
      return componentStyle === BUTTON_STYLES.CLOSE ? BUTTON_COMPONENTS_BASE_NAMES.CLOSE : BUTTON_COMPONENTS_BASE_NAMES.BUTTON;
    }
    return AddNewGenericComponent.componentTypeToBaseName[componentType];
  }

  private static updateComponentDropdownStructure(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      subcomponentDropdownStructure: NestedDropdownStructure, baseSubcomponentName: string): void {
    const { componentPreviewStructure, coreSubcomponentRefs } = newComponent;
    const baseName = coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    const nestedComponentBaseDropdownStructure = componentPreviewStructure.subcomponentDropdownStructure[baseName]; 
    nestedComponentBaseDropdownStructure[DROPDOWN_OPTION_AUX_DETAILS_REF] = { isEnabled: true, actualObjectName: baseName };
    const newComponentDropdownStructure = { [baseName]: { ...nestedComponentBaseDropdownStructure }};
    JSONUtils.addObjects(subcomponentDropdownStructure, baseSubcomponentName, newComponentDropdownStructure, true);
    JSONUtils.addObjects(parentComponent.componentPreviewStructure, 'subcomponentNameToDropdownOptionName',
      newComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, true);
  }

  private static updateNewSubcomponentParentLayer(subcomponentData: SubcomponentData): void {
    const { baseSubcomponent, parentLayer } = subcomponentData;
    baseSubcomponent.parentLayer = parentLayer;
  }

  private static addNewSubcomponentToParentLayer(parentLayer: Layer, baseSubcomponent: SubcomponentProperties,
    newComponent: WorkshopComponent): void {
    const alignment = baseSubcomponent?.customFeatures?.alignedLayerSection?.section;
    const nestedComponent: NestedComponent = {
      name: newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name, subcomponentProperties: baseSubcomponent};
    parentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(nestedComponent);
  }

  private static assembleSubcomponentData(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      parentLayerName: string): SubcomponentData {
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(activeBaseComponent, parentLayerName);
    const baseSubcomponent = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const parentComponentBaseName = Object.keys(activeBaseComponent.componentPreviewStructure.subcomponentDropdownStructure)[0];
    const isParentLayerInSubcomponentsDropdown = !!parentComponent.componentPreviewStructure.subcomponentDropdownStructure[parentComponentBaseName]
      [parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentLayerName]];
    return { parentLayer, baseSubcomponent, subcomponentDropdownStructure: parentComponent.componentPreviewStructure.subcomponentDropdownStructure, parentComponentBaseName, isParentLayerInSubcomponentsDropdown };
  }

  private static addNewComponentToDropdownStructure(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      subcomponentData: SubcomponentData): void {
    const { parentLayer, subcomponentDropdownStructure, parentComponentBaseName, isParentLayerInSubcomponentsDropdown } = subcomponentData;
    if (isParentLayerInSubcomponentsDropdown) {
      const parentLayerDropdownName = parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentLayer.name];
      AddNewGenericComponent.updateComponentDropdownStructure(parentComponent, newComponent,
        subcomponentDropdownStructure[parentComponentBaseName] as NestedDropdownStructure, parentLayerDropdownName);
    } else {
      AddNewGenericComponent.updateComponentDropdownStructure(parentComponent, newComponent, subcomponentDropdownStructure, parentComponentBaseName);
    }
  }

  protected static addNewComponentToComponentPreview(parentComponent: WorkshopComponent, newComponent: WorkshopComponent,
      parentLayerName: string): SubcomponentData {
    const subcomponentData = AddNewGenericComponent.assembleSubcomponentData(parentComponent, newComponent, parentLayerName);
    const { parentLayer, baseSubcomponent } = subcomponentData;
    AddNewGenericComponent.addNewSubcomponentToParentLayer(parentLayer, baseSubcomponent, newComponent);
    return subcomponentData;
  }

  private static executeOverwritePropertiesFuncs(overwritePropertiesFunc: OverwritePropertiesFunc[], newComponent: WorkshopComponent): void {
    const funcArray = overwritePropertiesFunc.filter((func) => typeof func === 'function');
    funcArray.forEach((overwritePropertiesFunc) => {
      overwritePropertiesFunc(newComponent.coreSubcomponentRefs);
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

  protected static createNewComponent(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, componentGenerator: ComponentGenerator,
      activeBaseComponent: WorkshopComponent, overwritePropertiesFunc?: OverwritePropertiesFunc[], customBaseName?: string): NewComponentDetails {
    const baseNamePrefix = AddNewGenericComponent.getBaseSubcomponentNamePrefix(componentType, componentStyle);
    const baseName = customBaseName || UniqueSubcomponentNameGenerator.generate(baseNamePrefix);
    const newComponent = AddNewComponentShared.createNewComponentViaGenerator(componentGenerator, activeBaseComponent, baseName);
    AddNewGenericComponent.applyTopProperty(newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
    if (overwritePropertiesFunc) {
      AddNewGenericComponent.executeOverwritePropertiesFuncs(overwritePropertiesFunc, newComponent);
    }
    return [newComponent, baseNamePrefix];
  }

  public static add(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      parentLayerName: string, overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const [newComponent, baseNamePrefix] = AddNewGenericComponent.createNewComponent(componentType, componentStyle,
      componentGenerator, activeBaseComponent, overwritePropertiesFunc);
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    const subcomponentData = AddNewGenericComponent.addNewComponentToComponentPreview(parentComponent, newComponent, parentLayerName);
    AddNewGenericComponent.updateNewSubcomponentParentLayer(subcomponentData);
    AddNewGenericComponent.addNewComponentToDropdownStructure(parentComponent, newComponent, subcomponentData);
    AddNewComponentShared.addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent, newComponent);
    InterconnectedSettings.update(true, activeBaseComponent, newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
    IncrementNestedComponentCount.increment(activeBaseComponent, baseNamePrefix, parentLayerName);
    AddNewGenericComponent.populateCoreComponentRef(parentComponent, newComponent);
    return newComponent;
  }
}

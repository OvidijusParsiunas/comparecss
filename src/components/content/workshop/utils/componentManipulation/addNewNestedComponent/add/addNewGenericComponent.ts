import { BUTTON_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { ComponentTraversalState, TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { IncrementNestedComponentCount } from '../../nestedComponentCount/incrementNestedComponentCount';
import { ComponentPreviewStructureSearchUtils } from '../utils/componentPreviewStractureSearchUtils';
import { Layer, NestedComponent } from '../../../../../../../interfaces/componentPreviewStructure';
import { BUTTON_STYLES, COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CoreSubcomponentRefsUtils } from '../../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
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
    // WORK1
    // get copy to work first
    // check isTriggeredByAnotherSubcomponent
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
    const activeBaseComponent = ActiveComponentUtils.getActiveNestedComponentParent(parentComponent);
    const parentLayer = ComponentPreviewStructureSearchUtils.getLayerByName(activeBaseComponent, parentLayerName);
    const baseSubcomponent = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const parentComponentBaseName = Object.keys(activeBaseComponent.componentPreviewStructure.subcomponentDropdownStructure)[0];
    const isParentLayerInSubcomponentsDropdown = !!parentComponent.componentPreviewStructure.subcomponentDropdownStructure[parentComponentBaseName]
      [parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentLayerName]];
    return { parentLayer, baseSubcomponent, subcomponentDropdownStructure: parentComponent.componentPreviewStructure.subcomponentDropdownStructure, parentComponentBaseName, isParentLayerInSubcomponentsDropdown };
  }

  // WORK2: refactor
  private static addNewComponentToDropdownStructure(parentComponent: WorkshopComponent, newComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent,
      subcomponentData: SubcomponentData, dropdownStructure: NestedDropdownStructure): void {
    // want to get away from using this
    const { parentLayer } = subcomponentData;
    const activeNestedComponentParent = ActiveComponentUtils.getActiveNestedComponentParent(parentComponent);
    const componentBaseName = Object.keys(activeNestedComponentParent.componentPreviewStructure.subcomponentDropdownStructure)[0];
    const isParentLayerInSubcomponentsDropdown = !!parentComponent.componentPreviewStructure.subcomponentDropdownStructure[componentBaseName]
      [parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentLayer.name]];
    if (isParentLayerInSubcomponentsDropdown) {
    const parentLayerDropdownName = parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentLayer.name];
      AddNewGenericComponent.updateComponentDropdownStructure(parentComponent, newComponent,
        (dropdownStructure[activeBaseComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[componentBaseName]] || dropdownStructure) as NestedDropdownStructure, parentLayerDropdownName);
    } else {
      AddNewGenericComponent.updateComponentDropdownStructure(parentComponent, newComponent, dropdownStructure, activeBaseComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[componentBaseName]);
    }
  }

  private static addNewComponentToDropdownStructureIfFound(parentComponent: WorkshopComponent, newComponent: WorkshopComponent, subcomponentData: SubcomponentData,
      activeBaseComponent: WorkshopComponent, componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const targetDetails = this as any as TargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const { subcomponentDropdownStructure } = componentTraversalState;
      AddNewGenericComponent.addNewComponentToDropdownStructure(parentComponent, newComponent, activeBaseComponent, subcomponentData, subcomponentDropdownStructure);
      return componentTraversalState;
    }
    return null;
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
  
  // WORK1
  private static removeInnerContents(newComponent: WorkshopComponent): void {
    // newComponent.subcomponents = {};
    // newComponent.componentPreviewStructure.subcomponentDropdownStructure = {};
    // newComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName = {};
  }

  public static addWithDropdown(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      parentLayerName: string, activeBaseComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure, overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const [newComponent, baseNamePrefix] = AddNewGenericComponent.createNewComponent(componentType, componentStyle,
      componentGenerator, activeBaseComponent, overwritePropertiesFunc);
    // WORK2 - check if this is needed
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    JSONUtils.addObjects(activeBaseComponent.coreBaseComponent || activeBaseComponent, 'subcomponents', newComponent.subcomponents);
    const subcomponentData = AddNewGenericComponent.addNewComponentToComponentPreview(parentComponent, newComponent, parentLayerName);
    AddNewGenericComponent.updateNewSubcomponentParentLayer(subcomponentData);
    AddNewGenericComponent.addNewComponentToDropdownStructure(parentComponent, newComponent, activeBaseComponent, subcomponentData, dropdownStructure);
    AddNewComponentShared.addNewComponentToSubcomponentNameToDropdownOptionNameMap(activeBaseComponent.coreBaseComponent || activeBaseComponent, newComponent);
    // WORK2 - check if this is needed
    AddNewComponentShared.addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent, newComponent);
    InterconnectedSettings.update(true, activeBaseComponent, newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
    IncrementNestedComponentCount.increment(activeBaseComponent, baseNamePrefix, parentLayerName);
    AddNewGenericComponent.populateCoreComponentRef(parentComponent, newComponent);
    newComponent.nestedComponentParent = parentComponent;
    AddNewGenericComponent.removeInnerContents(newComponent);
    return newComponent;
  }

  private static addWithDropdownIfFound(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      parentLayerName: string, activeBaseComponent: WorkshopComponent, overwritePropertiesFunc: OverwritePropertiesFunc[], componentTraversalState: ComponentTraversalState): WorkshopComponent {
    const targetDetails = this as any as TargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const { subcomponentDropdownStructure } = componentTraversalState;
      const newComponent = AddNewGenericComponent.addWithDropdown(parentComponent, componentType, componentStyle, parentLayerName, activeBaseComponent, subcomponentDropdownStructure, overwritePropertiesFunc);
      return newComponent;
    }
    return null;
  }

  public static add(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      parentLayerName: string, overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    // WORK1 - check if this affects anything
    const activeBaseComponent = ActiveComponentUtils.getActiveBaseComponent(parentComponent);
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(activeBaseComponent, activeBaseComponent.activeSubcomponentName);
    return ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      activeBaseComponent.componentPreviewStructure.subcomponentDropdownStructure,
      AddNewGenericComponent.addWithDropdownIfFound.bind(targetDetails, parentComponent, componentType, componentStyle, parentLayerName, activeBaseComponent, overwritePropertiesFunc)) as WorkshopComponent;
  }
}

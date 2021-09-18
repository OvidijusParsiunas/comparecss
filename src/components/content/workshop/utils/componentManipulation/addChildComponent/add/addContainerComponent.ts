import { BUTTON_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, CHILD_COMPONENTS_BASE_NAMES, DROPDOWN_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { TraverseComponentViaDropdownStructure } from '../../../componentTraversal/traverseComponentViaDropdownStructure';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { Layer, BaseSubcomponentRef } from '../../../../../../../interfaces/componentPreviewStructure';
import { IncrementChildComponentCount } from '../../childComponentCount/incrementChildComponentCount';
import { BUTTON_STYLES, COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CoreSubcomponentRefsUtils } from '../../coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { SyncedComponent } from '../../../../toolbar/options/copyChildComponent/syncedComponent';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { SubcomponentTriggers } from '../../utils/subcomponentTriggers';
import { AddComponentShared } from './addComponentShared';
import JSONUtils from '../../../generic/jsonUtils';

type NewComponentDetails = [WorkshopComponent, string];

export class AddContainerComponent extends AddComponentShared {

  // base name is used in dropdown options
  private static readonly componentTypeToBaseName: { [key in COMPONENT_TYPES]?: CHILD_COMPONENTS_BASE_NAMES } = {
    [COMPONENT_TYPES.LAYER]: LAYER_COMPONENTS_BASE_NAMES.LAYER,
    [COMPONENT_TYPES.BUTTON]: BUTTON_COMPONENTS_BASE_NAMES.BUTTON,
    [COMPONENT_TYPES.TEXT]: PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT,
    [COMPONENT_TYPES.IMAGE]: PRIMITIVE_COMPONENTS_BASE_NAMES.IMAGE,
    [COMPONENT_TYPES.ICON]: PRIMITIVE_COMPONENTS_BASE_NAMES.ICON,
    [COMPONENT_TYPES.DROPDOWN]: DROPDOWN_COMPONENTS_BASE_NAMES.DROPDOWN,
    [COMPONENT_TYPES.DROPDOWN_MENU]: DROPDOWN_COMPONENTS_BASE_NAMES.MENU,
  };
  public static readonly componentBaseNameToType: { [key in CHILD_COMPONENTS_BASE_NAMES]?: COMPONENT_TYPES } = {
    ...JSONUtils.reverseMap(AddContainerComponent.componentTypeToBaseName),
    [BUTTON_COMPONENTS_BASE_NAMES.CLOSE]: COMPONENT_TYPES.BUTTON,
    [LAYER_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM]: COMPONENT_TYPES.LAYER,
  };
  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  private static populateCoreComponentRef(newComponentContainer: WorkshopComponent, newComponent: WorkshopComponent): void {
    // WORK1
    // get copy to work first
    const newComponentBase = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const { subcomponentType, parentLayer } = newComponentBase;
    JSONUtils.setPropertyIfExists(newComponentContainer.coreSubcomponentRefs, subcomponentType as number, newComponentBase);
    SubcomponentTriggers.set(newComponentContainer, parentLayer.subcomponentProperties, newComponentBase, subcomponentType);
    CoreSubcomponentRefsUtils.executeReferenceSharingExecutables(newComponentContainer);
  }

  private static getBaseSubcomponentNamePrefix(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES): CHILD_COMPONENTS_BASE_NAMES {
    if (componentType === COMPONENT_TYPES.BUTTON) {
      return componentStyle === BUTTON_STYLES.CLOSE ? BUTTON_COMPONENTS_BASE_NAMES.CLOSE : BUTTON_COMPONENTS_BASE_NAMES.BUTTON;
    }
    return AddContainerComponent.componentTypeToBaseName[componentType];
  }

  private static updateComponentDropdownStructure(masterComponent: WorkshopComponent, newComponent: WorkshopComponent,
      subcomponentDropdownStructure: NestedDropdownStructure): void {
    const { componentPreviewStructure, coreSubcomponentRefs } = newComponent;
    const baseName = coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    const childComponentBaseDropdownStructure = componentPreviewStructure.subcomponentDropdownStructure[baseName]; 
    childComponentBaseDropdownStructure[DROPDOWN_OPTION_AUX_DETAILS_REF] = { isEnabled: true, actualObjectName: baseName };
    const newComponentDropdownStructure = { [baseName]: { ...childComponentBaseDropdownStructure }};
    Object.assign(subcomponentDropdownStructure, newComponentDropdownStructure);
    Object.assign(masterComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName,
      newComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName);
  }

  private static addNewSubcomponentToParentLayer(parentLayer: Layer, baseSubcomponent: SubcomponentProperties): void {
    const alignment = baseSubcomponent?.customFeatures?.alignedLayerSection?.section;
    const baseSubcomponentRef: BaseSubcomponentRef = { subcomponentProperties: baseSubcomponent };
    parentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(baseSubcomponentRef);
  }

  private static addNewComponentToDropdownStructure(newComponent: WorkshopComponent, masterComponent: WorkshopComponent,
      dropdownStructure: NestedDropdownStructure): void {
    const { componentPreviewStructure: { subcomponentNameToDropdownOptionName }, subcomponents, activeSubcomponentName } = masterComponent;
    const parentLayerOptionName = subcomponentNameToDropdownOptionName[
      newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].parentLayer.subcomponentProperties.name];
    // this gets activated when the user is manually adding a component to a layer
    if (subcomponents[activeSubcomponentName].seedComponent.type === COMPONENT_TYPES.LAYER) {
      const layerDropdownStructure = dropdownStructure[parentLayerOptionName];
      AddContainerComponent.updateComponentDropdownStructure(masterComponent, newComponent, layerDropdownStructure as NestedDropdownStructure);
    } else {
      // this gets activated when a new component is being programmatically generated or the user is manually adding a component to a base
      const subcomponentBaseName = subcomponents[activeSubcomponentName].name;
      const subcomponentOptionName = subcomponentNameToDropdownOptionName[subcomponentBaseName];
      const componentBaseDropdownStructure = dropdownStructure[subcomponentOptionName][parentLayerOptionName] || dropdownStructure[subcomponentOptionName];
      AddContainerComponent.updateComponentDropdownStructure(masterComponent, newComponent, componentBaseDropdownStructure as NestedDropdownStructure);
    }
  }

  protected static addNewComponentToComponentPreview(newComponent: WorkshopComponent, parentLayer: Layer): void {
    const baseSubcomponent = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    AddContainerComponent.addNewSubcomponentToParentLayer(parentLayer, baseSubcomponent);
    baseSubcomponent.parentLayer = parentLayer;
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
      customCssProperties.top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
      defaultCustomCssProperties.top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  protected static createNewComponent(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, componentGenerator: ComponentGenerator,
      syncedComponent: WorkshopComponent, masterComponent: WorkshopComponent, overwritePropertiesFunc?: OverwritePropertiesFunc[],
      customBaseName?: string): NewComponentDetails {
    const baseNamePrefix = AddContainerComponent.getBaseSubcomponentNamePrefix(componentType, componentStyle);
    const baseName = customBaseName || UniqueSubcomponentNameGenerator.generate(baseNamePrefix);
    const newComponent = AddComponentShared.createNewComponentViaGenerator(componentGenerator, masterComponent, baseName);
    AddContainerComponent.applyTopProperty(newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
    if (overwritePropertiesFunc) AddContainerComponent.executeOverwritePropertiesFuncs(overwritePropertiesFunc, newComponent);
    if (syncedComponent) SyncedComponent.copyChildPropertiesFromInSyncContainerComponent(newComponent, syncedComponent);
    return [newComponent, baseNamePrefix];
  }

  public static addUsingParentDropdownStructure(newComponentContainer: WorkshopComponent, dropdownStructure: NestedDropdownStructure,
      componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, parentLayer: Layer,
      overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const { masterComponent, sync: { syncedComponent } } = newComponentContainer;
    const [newComponent, baseNamePrefix] = AddContainerComponent.createNewComponent(componentType, componentStyle, componentGenerator,
      syncedComponent, masterComponent, overwritePropertiesFunc);
    AddComponentShared.populateMasterComponentWithNewSubcomponents(masterComponent, newComponent.subcomponents);
    AddContainerComponent.addNewComponentToComponentPreview(newComponent, parentLayer);
    AddContainerComponent.addNewComponentToDropdownStructure(newComponent, masterComponent, dropdownStructure);
    InterconnectedSettings.update(true, newComponentContainer, newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]);
    IncrementChildComponentCount.increment(newComponentContainer, baseNamePrefix);
    AddContainerComponent.populateCoreComponentRef(newComponentContainer, newComponent);
    AddComponentShared.cleanSubcomponentProperties(newComponent);
    newComponent.containerComponent = newComponentContainer;
    return newComponent;
  }

  public static add(newComponentContainer: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      parentLayerName: string, overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const parentLayer = AddComponentShared.getContainerComponentLayer(newComponentContainer, parentLayerName);
    return TraverseComponentViaDropdownStructure.traverseUsingComponent(
      newComponentContainer, AddContainerComponent.addUsingParentDropdownStructure,
      componentType, componentStyle, parentLayer, overwritePropertiesFunc) as WorkshopComponent;
  }
}

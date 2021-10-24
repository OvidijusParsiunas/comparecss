import { BUTTON_COMPONENTS_BASE_NAMES, CHILD_COMPONENTS_BASE_NAMES, DROPDOWN_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { TraverseComponentViaDropdownStructure } from '../../../componentTraversal/traverseComponentViaDropdownStructure';
import { ParentBasedPresetProperties, PropertiesAddedOnBuild } from '../../../../../../../interfaces/newChildComponents';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownItemDisplayStatus';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { SyncChildComponent } from '../../../../toolbar/options/syncChildComponent/syncChildComponent';
import { BaseSubcomponentRef, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { IncrementChildComponentCount } from '../../childComponentCount/incrementChildComponentCount';
import { BUTTON_STYLES, COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SyncedComponent } from '../../../../toolbar/options/syncChildComponent/syncedComponent';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { SubcomponentTriggers } from '../../utils/subcomponentTriggers';
import { AddComponentShared } from './addComponentShared';
import JSONUtils from '../../../generic/jsonUtils';

type NewComponentDetails = [WorkshopComponent, string];

export class AddContainerComponent extends AddComponentShared {

  // base name is used in dropdown items
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

  private static updateOtherComponentsThatAreSyncedToThis(containerComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    if (containerComponent.sync.componentsSyncedToThis.size > 0) {
      SyncChildComponent.reSyncSubcomponentsSyncedToThisSubcomponent(newComponent, ...containerComponent.sync.componentsSyncedToThis);
    }
  }

  private static updateComponentContainerProperties(containerComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    const newComponentBase = newComponent.baseSubcomponent;
    const { subcomponentType, parentLayer } = newComponentBase;
    JSONUtils.setPropertyIfExists(containerComponent.sync.syncables.onCopy?.subcomponents, subcomponentType as number, newComponentBase);
    SubcomponentTriggers.set(containerComponent, parentLayer.subcomponentProperties, newComponentBase, subcomponentType);
  }

  private static getBaseSubcomponentNamePrefix(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES): CHILD_COMPONENTS_BASE_NAMES {
    if (componentType === COMPONENT_TYPES.BUTTON) {
      return componentStyle === BUTTON_STYLES.CLOSE ? BUTTON_COMPONENTS_BASE_NAMES.CLOSE : BUTTON_COMPONENTS_BASE_NAMES.BUTTON;
    }
    return AddContainerComponent.componentTypeToBaseName[componentType];
  }

  private static updateComponentDropdownStructure(masterComponent: WorkshopComponent, newComponent: WorkshopComponent,
      subcomponentDropdownStructure: NestedDropdownStructure): void {
    const { componentPreviewStructure, baseSubcomponent } = newComponent;
    const baseName = baseSubcomponent.name;
    const childComponentBaseDropdownStructure = componentPreviewStructure.subcomponentDropdownStructure[baseName]; 
    childComponentBaseDropdownStructure[DROPDOWN_ITEM_AUX_DETAILS_REF] = { isEnabled: true, actualObjectName: baseName };
    const newComponentDropdownStructure = { [baseName]: { ...childComponentBaseDropdownStructure }};
    Object.assign(subcomponentDropdownStructure, newComponentDropdownStructure);
    Object.assign(masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName,
      newComponent.componentPreviewStructure.subcomponentNameToDropdownItemName);
  }

  private static addNewSubcomponentToParentLayer(parentLayer: Layer, baseSubcomponent: SubcomponentProperties): void {
    const alignment = baseSubcomponent?.customStaticFeatures?.alignedLayerSection?.section;
    const baseSubcomponentRef: BaseSubcomponentRef = { subcomponentProperties: baseSubcomponent };
    parentLayer.sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][alignment || ALIGNED_SECTION_TYPES.LEFT].push(baseSubcomponentRef);
  }

  private static addNewComponentToDropdownStructure(newComponent: WorkshopComponent, masterComponent: WorkshopComponent,
      dropdownStructure: NestedDropdownStructure): void {
    const { componentPreviewStructure: { subcomponentNameToDropdownItemName }, subcomponents, activeSubcomponentName } = masterComponent;
    const parentLayerItemName = subcomponentNameToDropdownItemName[
      newComponent.baseSubcomponent.parentLayer.subcomponentProperties.name];
    // this gets activated when the user is manually adding a component to a layer
    if (subcomponents[activeSubcomponentName].seedComponent.type === COMPONENT_TYPES.LAYER) {
      const layerDropdownStructure = dropdownStructure[parentLayerItemName] as NestedDropdownStructure;
      AddContainerComponent.updateComponentDropdownStructure(masterComponent, newComponent, layerDropdownStructure);
    } else {
      // this gets activated when a new component is being programmatically generated or the user is manually adding a component to a base
      const subcomponentBaseName = subcomponents[activeSubcomponentName].name;
      const subcomponentItemName = subcomponentNameToDropdownItemName[subcomponentBaseName];
      const componentBaseDropdownStructure = dropdownStructure[subcomponentItemName][parentLayerItemName] || dropdownStructure[subcomponentItemName];
      AddContainerComponent.updateComponentDropdownStructure(masterComponent, newComponent, componentBaseDropdownStructure as NestedDropdownStructure);
    }
  }

  protected static addNewComponentToComponentPreview(newComponent: WorkshopComponent, parentLayer: Layer): void {
    const baseSubcomponent = newComponent.baseSubcomponent;
    AddContainerComponent.addNewSubcomponentToParentLayer(parentLayer, baseSubcomponent);
    baseSubcomponent.parentLayer = parentLayer;
  }

  private static applyTopProperty(baseSubcomponent: SubcomponentProperties): void {
    const customCssProperties = baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const defaultCustomCssProperties = baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT];
    if (!customCssProperties.top) {
      customCssProperties.top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
      defaultCustomCssProperties.top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  private static generatePresetProperties(baseName: string, parentBasedPresetProperties: ParentBasedPresetProperties): PresetProperties {
    return Object.assign({ baseName }, parentBasedPresetProperties);
  }

  protected static createNewComponent(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, componentGenerator: ComponentGenerator,
      containerComponent: WorkshopComponent, masterComponent: WorkshopComponent, propertiesAddedOnGeneration: PropertiesAddedOnBuild,
      customBaseName?: string): NewComponentDetails {
    const baseNamePrefix = AddContainerComponent.getBaseSubcomponentNamePrefix(componentType, componentStyle);
    const baseName = customBaseName || UniqueSubcomponentNameGenerator.generate(baseNamePrefix);
    const presetProperties = AddContainerComponent.generatePresetProperties(baseName, propertiesAddedOnGeneration?.[componentType])
    const newComponent = AddComponentShared.createNewComponentViaGenerator(componentGenerator, masterComponent, presetProperties);
    AddContainerComponent.applyTopProperty(newComponent.baseSubcomponent);
    const syncedComponent =  SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(containerComponent);
    if (syncedComponent) SyncedComponent.copyChildPropertiesFromInSyncContainerComponent(newComponent, syncedComponent.sync.componentThisIsSyncedTo);
    return [newComponent, baseNamePrefix];
  }

  public static addUsingParentDropdownStructure(containerComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure,
      componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, parentLayer: Layer): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const { masterComponent } = containerComponent;
    const [newComponent, baseNamePrefix] = AddContainerComponent.createNewComponent(componentType, componentStyle, componentGenerator,
      containerComponent, masterComponent, containerComponent.newChildComponents.propertyOverwritables?.onBuildProperties);
    AddComponentShared.populateMasterComponentWithNewSubcomponents(masterComponent, newComponent.subcomponents);
    AddContainerComponent.addNewComponentToComponentPreview(newComponent, parentLayer);
    AddContainerComponent.addNewComponentToDropdownStructure(newComponent, masterComponent, dropdownStructure);
    InterconnectedSettings.update(true, containerComponent, newComponent.baseSubcomponent);
    IncrementChildComponentCount.increment(containerComponent, baseNamePrefix);
    AddContainerComponent.updateComponentContainerProperties(containerComponent, newComponent);
    AddComponentShared.cleanSubcomponentProperties(newComponent);
    AddComponentShared.executePropertyOverwritables(newComponent, containerComponent, 'container');
    // WORK 2 - setTimeout
    AddContainerComponent.updateOtherComponentsThatAreSyncedToThis(containerComponent, newComponent);
    SyncedComponent.addParentComponentSyncableContainerComponentsToChild(newComponent, containerComponent);
    newComponent.containerComponent = containerComponent;
    return newComponent;
  }

  public static add(containerComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      parentLayerName: string): WorkshopComponent {
    const parentLayer = AddComponentShared.getContainerComponentLayer(containerComponent, parentLayerName);
    const result = TraverseComponentViaDropdownStructure.traverseUsingComponent(
      containerComponent, AddContainerComponent.addUsingParentDropdownStructure,
      componentType, componentStyle, parentLayer);
    return result.result;
  }
}

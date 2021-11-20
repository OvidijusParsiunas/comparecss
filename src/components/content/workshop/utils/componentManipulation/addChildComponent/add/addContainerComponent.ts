import { BUTTON_COMPONENTS_BASE_NAMES, CHILD_COMPONENTS_BASE_NAMES, DROPDOWN_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { AutoSyncedSiblingContainerComponentUtils } from '../../autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { IncrementChildComponentCountLimitsState } from '../../childComponentCountLimitsState/incrementChildComponentCountLimitsState';
import { TraverseComponentViaDropdownStructure } from '../../../componentTraversal/traverseComponentViaDropdownStructure';
import { ParentBasedPresetProperties, PropertiesAddedOnBuild } from '../../../../../../../interfaces/newChildComponents';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownItemDisplayStatus';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../../consts/horizontalAlignmentSections';
import { SyncChildComponent } from '../../../../toolbar/options/syncChildComponent/syncChildComponent';
import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { BUTTON_STYLES, COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SyncedComponent } from '../../../../toolbar/options/syncChildComponent/syncedComponent';
import { InterconnectedSettings } from '../../../interconnectedSettings/interconnectedSettings';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
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

  private static asyncUpdateSyncedComponents(newComponent: WorkshopComponent, containerComponent: WorkshopComponent): void {
    setTimeout(() => {
      SyncedComponent.addParentComponentSyncableContainerComponentsToChild(newComponent, containerComponent);
      SyncChildComponent.reSyncComponentsSyncedToThisComponent(newComponent, newComponent.type);
    });
  }

  private static updateComponentContainerProperties(containerComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    const { baseSubcomponent, parentLayer } = newComponent;
    JSONUtils.setPropertyIfExists(containerComponent.sync.syncables.onSyncComponents?.uniqueComponents, newComponent.type, newComponent);
    SubcomponentTriggers.set(containerComponent, parentLayer.subcomponent, baseSubcomponent, baseSubcomponent.subcomponentType);
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

  private static addNewComponentToParentLayer(parentLayer: Layer, newComponent: WorkshopComponent): void {
    const { horizontalSection } = newComponent?.baseSubcomponent.customStaticFeatures?.alignment || {};
    parentLayer.alignmentSectionToComponents[horizontalSection || HORIZONTAL_ALIGNMENT_SECTIONS.LEFT].push(newComponent);
  }

  private static addNewComponentToDropdownStructure(newComponent: WorkshopComponent, masterComponent: WorkshopComponent,
      dropdownStructure: NestedDropdownStructure): void {
    const { componentPreviewStructure: { subcomponentNameToDropdownItemName }, subcomponents, activeSubcomponentName } = masterComponent;
    const parentLayerItemName = subcomponentNameToDropdownItemName[
      newComponent.parentLayer.subcomponent.name];
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
    AddContainerComponent.addNewComponentToParentLayer(parentLayer, newComponent);
    newComponent.parentLayer = parentLayer;
  }

  private static applyTopProperty(baseSubcomponent: Subcomponent): void {
    const customCssProperties = baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const defaultCustomCssProperties = baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT];
    if (!customCssProperties.top) {
      customCssProperties.top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
      defaultCustomCssProperties.top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  private static generatePresetProperties(baseName: string, componentStyle: COMPONENT_STYLES, parentBasedPresetProperties: ParentBasedPresetProperties): PresetProperties {
    return Object.assign({ baseName, componentStyle }, parentBasedPresetProperties);
  }

  protected static createNewComponent(componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES, componentGenerator: ComponentGenerator,
      containerComponent: WorkshopComponent, masterComponent: WorkshopComponent, propertiesAddedOnGeneration: PropertiesAddedOnBuild,
      customBaseName?: string): NewComponentDetails {
    const baseNamePrefix = AddContainerComponent.getBaseSubcomponentNamePrefix(componentType, componentStyle);
    const baseName = customBaseName || UniqueSubcomponentNameGenerator.generate(baseNamePrefix);
    const presetProperties = AddContainerComponent.generatePresetProperties(baseName, componentStyle, propertiesAddedOnGeneration?.[componentType]);
    const newComponent = AddComponentShared.createNewComponentViaGenerator(componentGenerator, masterComponent, presetProperties);
    AddContainerComponent.applyTopProperty(newComponent.baseSubcomponent);
    const syncedComponent =  SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(containerComponent);
    if (syncedComponent) SyncedComponent.copyChildPropertiesFromInSyncContainerComponent(newComponent,
      syncedComponent.sync.componentThisIsSyncedTo, containerComponent.type);
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
    IncrementChildComponentCountLimitsState.increment(containerComponent, baseNamePrefix);
    AddContainerComponent.updateComponentContainerProperties(containerComponent, newComponent);
    AddComponentShared.cleanComponent(newComponent);
    AddComponentShared.executeOverwritables(newComponent, containerComponent, 'container');
    AutoSyncedSiblingContainerComponentUtils.setComponentToBeInSyncIfSiblingsSynced(parentLayer, newComponent);
    AddContainerComponent.asyncUpdateSyncedComponents(newComponent, containerComponent);
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

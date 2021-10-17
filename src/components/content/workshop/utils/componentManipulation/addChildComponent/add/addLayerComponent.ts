import { DropdownItemsDisplayStatusUtils } from '../../../dropdownItemsDisplayStatusUtils/dropdownItemsDisplayStatusUtils';
import { TraverseComponentViaDropdownStructure } from '../../../componentTraversal/traverseComponentViaDropdownStructure';
import { SyncChildComponentUtils } from '../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { UniqueSubcomponentNameGenerator } from '../../../componentGenerator/uniqueSubcomponentNameGenerator';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../../../consts/layerSections.enum';
import { IncrementChildComponentCount } from '../../childComponentCount/incrementChildComponentCount';
import { AlignedSections, Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SyncedComponent } from '../../../../toolbar/options/syncChildComponent/syncedComponent';
import { ChildComponentBaseNamesToStyles } from '../utils/childComponentBaseNamesToStyles';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddComponentShared } from './addComponentShared';
import JSONUtils from '../../../generic/jsonUtils';

export class AddLayerComponent extends AddComponentShared {

  // this should be in a shared utils file
  private static executePropertyOverwritables(newComponent: WorkshopComponent, containerComponent: WorkshopComponent): void {
    // WORK 2 - strategy for getting in sync component is by having components synced to property inside container component
    const overwritable = containerComponent.newChildComponents.propertyOverwritables?.postBuildCallbacks?.[newComponent.type];
    overwritable?.(newComponent, containerComponent);
  }

  private static copySiblingSubcomponent(containerComponent: WorkshopComponent, newLayerProperties: SubcomponentProperties): void {
    const siblingSubcomponent = containerComponent.componentPreviewStructure.layers[containerComponent.componentPreviewStructure.layers.length - 2];
    const { customCss, defaultCss, customFeatures, defaultCustomFeatures } = siblingSubcomponent.subcomponentProperties;
    if (containerComponent.areLayersInSyncByDefault) {
      newLayerProperties.customCss = customCss;
      newLayerProperties.defaultCss = defaultCss;
      newLayerProperties.customFeatures = customFeatures;
      newLayerProperties.defaultCustomFeatures = defaultCustomFeatures;
    } else {
      newLayerProperties.customCss = JSONUtils.deepCopy(customCss);
      newLayerProperties.defaultCss = JSONUtils.deepCopy(defaultCss);
      newLayerProperties.customFeatures = JSONUtils.deepCopy(customFeatures);
      newLayerProperties.defaultCustomFeatures = JSONUtils.deepCopy(defaultCustomFeatures); 
    }
  }

  private static getMatchingComponentFromAnotherContainerSyncables(targetComponent: WorkshopComponent, anotherContainer: WorkshopComponent): WorkshopComponent {
    return anotherContainer.sync.syncables.onCopy.childComponents.find((component) => component.type === targetComponent.type);
  }

  private static copySyncedComponent(syncedComponent: WorkshopComponent, containerComponent: WorkshopComponent, newLayerProperties: SubcomponentProperties): void {
    const sameContainerComponentInSyncedComponent = AddLayerComponent.getMatchingComponentFromAnotherContainerSyncables(
      containerComponent, syncedComponent.sync.componentThisIsSyncedTo);
    if (sameContainerComponentInSyncedComponent.componentPreviewStructure.layers.length > 0) {
      const { customCss, customFeatures } = sameContainerComponentInSyncedComponent.componentPreviewStructure.layers[0].subcomponentProperties;
      newLayerProperties.customCss = customCss;
      newLayerProperties.customFeatures = customFeatures;
    }
  }

  // current strategy does not work if component is in sync and multiple layers have different child components
  private static overwriteSubcomponentCustomProperties(containerComponent: WorkshopComponent, newLayerProperties: SubcomponentProperties): void {
    if (containerComponent.componentPreviewStructure.layers.length === 1) {
      const syncedComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(containerComponent);
      if (syncedComponent) AddLayerComponent.copySyncedComponent(syncedComponent, containerComponent, newLayerProperties);
    } else {
      AddLayerComponent.copySiblingSubcomponent(containerComponent, newLayerProperties);
    }
  }

  // needs to be done after dropdown items have been updated as property overwritables can add new components
  protected static overwriteProperties(newComponent: WorkshopComponent, containerComponent: WorkshopComponent): void {
    AddLayerComponent.overwriteSubcomponentCustomProperties(containerComponent, newComponent.baseSubcomponent);
    AddLayerComponent.executePropertyOverwritables(newComponent, containerComponent);
  }

  private static addNewChildComponentsItems(containerComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    if (containerComponent.newChildComponents.sharedDropdownItemsRefs?.layer) {
      newComponent.newChildComponents = { dropdownItems: containerComponent.newChildComponents.sharedDropdownItemsRefs.layer };
    }
  }

  private static updateDropdownStructureIfItemFound(containerComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure,
      newComponent: WorkshopComponent, masterComponent: WorkshopComponent): boolean {
    const newComponentBaseName = newComponent.baseSubcomponent.name;
    const newComponentDropdownStructure = { [newComponentBaseName]: { 
      ...DropdownItemsDisplayStatusUtils.createDropdownItemDisplayStatusReferenceObject(newComponentBaseName),
    }};
    const { subcomponentNameToDropdownItemName } = masterComponent.componentPreviewStructure;
    const containerComponentBaseName = containerComponent.baseSubcomponent.name;
    Object.assign(dropdownStructure[subcomponentNameToDropdownItemName[containerComponentBaseName]], newComponentDropdownStructure);
    return true;
  }

  private static addLayerToContainerComponentPreview(containerComponent: WorkshopComponent, layer: Layer): void {
    containerComponent.componentPreviewStructure.layers.push(layer);
  }

  private static updateOtherLayers(parentComponent: WorkshopComponent, containerComponent: WorkshopComponent, newLayer: SubcomponentProperties): void {
    parentComponent.sync.componentsSyncedToThis.forEach((component) => {
      const sameContainerComponentInSyncedComponent = AddLayerComponent.getMatchingComponentFromAnotherContainerSyncables(containerComponent, component);
      const { subcomponentProperties } = sameContainerComponentInSyncedComponent.componentPreviewStructure.layers[0];
      JSONUtils.copyPropertiesThatExistInTarget(subcomponentProperties.customCss, newLayer.customCss);
      JSONUtils.copyPropertiesThatExistInTarget(subcomponentProperties.customFeatures, newLayer.customFeatures);
    });
  }

  private static updateOtherLayersThatAreSyncedToThis(containerComponent: WorkshopComponent, newLayer: SubcomponentProperties): void {
    if (containerComponent.componentPreviewStructure.layers.length === 1 && containerComponent.areLayersInSyncByDefault) {
      const parentComponent = SyncChildComponentUtils.getParentComponentWithOtherComponentsSyncedToIt(containerComponent);
      if (parentComponent) AddLayerComponent.updateOtherLayers(parentComponent, containerComponent, newLayer);
    }
  }

  private static createEmptyAlignedSections(): AlignedSections {
    return {
      [ALIGNED_SECTION_TYPES.LEFT]: [],
      [ALIGNED_SECTION_TYPES.CENTER]: [],
      [ALIGNED_SECTION_TYPES.RIGHT]: [],
    };
  }

  private static createEmptyLayer(newComponent: WorkshopComponent): Layer {
    const baseName = newComponent.baseSubcomponent.name;
    const baseSubcomponent = newComponent.subcomponents[baseName];
    const layerSections = baseSubcomponent.layerSectionsType === LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS
      ? AddLayerComponent.createEmptyAlignedSections() : [];
    return {
      subcomponentProperties: baseSubcomponent,
      sections: {
        [baseSubcomponent.layerSectionsType]: layerSections,
      },
    };
  }

  protected static addLayerToPreview(containerComponent: WorkshopComponent, newComponent: WorkshopComponent): void {
    const layer: Layer = AddLayerComponent.createEmptyLayer(newComponent);
    AddLayerComponent.addLayerToContainerComponentPreview(containerComponent, layer);
  }

  // masterComponent is relative to the current container component that the new component is being added to:
  // e.g. when creating a button within a card, upon adding text to a button - the master component to text is the button,
  // as the button is then added to the card - all of its subcomponents including text have card set as their master component
  // when adding text/icon to an existing button - it uses its container's master ref (button pointing to card),
  // hence its masterComponentRef property is going to point towards the card component
  protected static createNewComponent(componentGenerator: ComponentGenerator, masterComponent: WorkshopComponent, baseName?: string): WorkshopComponent {
    return AddComponentShared.createNewComponentViaGenerator(componentGenerator, masterComponent, { baseName });
  }

  public static add(containerComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES, isEditable: boolean): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    const layerName = ChildComponentBaseNamesToStyles.STYLE_TO_LAYER[componentStyle];
    const { higherComponentContainer, masterComponent } = ActiveComponentUtils.getHigherLevelComponents(containerComponent);
    const newComponent = AddLayerComponent.createNewComponent(componentGenerator, masterComponent,
      UniqueSubcomponentNameGenerator.generate(layerName));
    AddComponentShared.populateMasterComponentWithNewSubcomponents(masterComponent, newComponent.subcomponents);
    AddLayerComponent.addLayerToPreview(higherComponentContainer, newComponent);
    if (isEditable) TraverseComponentViaDropdownStructure.traverseUsingComponent(containerComponent,
      AddLayerComponent.updateDropdownStructureIfItemFound, newComponent, masterComponent);
    AddComponentShared.addNewSubcomponentNameInContainerDropdownItemNameMap(masterComponent, newComponent, isEditable);
    AddLayerComponent.addNewChildComponentsItems(higherComponentContainer, newComponent);
    IncrementChildComponentCount.increment(higherComponentContainer, layerName);
    AddComponentShared.cleanSubcomponentProperties(newComponent);
    AddLayerComponent.overwriteProperties(newComponent, containerComponent);
    AddLayerComponent.updateOtherLayersThatAreSyncedToThis(containerComponent, newComponent.baseSubcomponent);
    SyncedComponent.addParentComponentSyncableContainerComponentsToChild(newComponent, containerComponent);
    newComponent.containerComponent = higherComponentContainer;
    return newComponent;
  }
}

import { AutoSyncedSiblingContainerComponentUtils } from '../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { SiblingComponentTypes, SiblingComponentState } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { CustomDynamicProperties, Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddContainerComponent } from '../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { ComponentTypeToProperties } from '../../../../../../interfaces/componentTypeToProperties';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { SyncChildComponentUtils } from './syncChildComponentUtils';
import JSONUtils from '../../../utils/generic/jsonUtils';

interface SynSyncablesResult {
  wasTargetComponentFound: boolean;
  wasAComponentToBeSyncedToMissing: boolean;
}

export class SyncChildComponent {

  private static setAreChildrenComponentsTemporarilySynced(syncableSubcomponent: Subcomponent): void {
    const { siblingChildComponentsAutoSynced } = syncableSubcomponent.seedComponent.parentLayer.subcomponent.seedComponent.sync;
    if (siblingChildComponentsAutoSynced) siblingChildComponentsAutoSynced.areChildrenComponentsTemporarilySynced = true;
  }

  private static moveCustomPropertiesToTempProperties(syncableSubcomponent: CustomDynamicProperties): void {
    syncableSubcomponent.tempOriginalCustomProperties = {
      customCss: JSONUtils.deepCopy(syncableSubcomponent.customCss),
      customFeatures: JSONUtils.deepCopy(syncableSubcomponent.customFeatures),
    };
  }

  private static syncAllCustomProperties(subcomponentToBeSyncedTo: Subcomponent, syncableSubcomponent: Subcomponent): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(syncableSubcomponent.seedComponent, 2);
    if (siblingComponentTypes) {
      // this is used to sync custom properties for auto synced components like buttons in a button group
      Object.assign(syncableSubcomponent.customFeatures, subcomponentToBeSyncedTo.customFeatures);
      Object.assign(syncableSubcomponent.customCss, subcomponentToBeSyncedTo.customCss); 
    } else {
      // this is the default way for syncing custom properties for child components as the one above causes the following issue:
      // upon adding a child dropdown to card then syncing the dropdown button and syncing the whole dropdown after that still
      // keeps the synced to button custom properties reference
      // hence the above implementation restricts auto synced components to be in a component that can be a syncable child
      syncableSubcomponent.customFeatures = subcomponentToBeSyncedTo.customFeatures;
      syncableSubcomponent.customCss = subcomponentToBeSyncedTo.customCss;
    }
  }

  private static syncAllCustomPropertiesAndAddTop(subcomponentToBeSyncedTo: Subcomponent, syncableSubcomponent: Subcomponent): void {
    SyncChildComponent.syncAllCustomProperties(subcomponentToBeSyncedTo, syncableSubcomponent);
    const componentToBeSyncedCustomCss = subcomponentToBeSyncedTo.customCss;
    if (!componentToBeSyncedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top && subcomponentToBeSyncedTo.subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      componentToBeSyncedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  private static syncPropertiesThatOnlyExistInActiveComponent(subcomponentToBeSyncedTo: Subcomponent, syncableSubcomponent: Subcomponent): void {
    syncableSubcomponent.customCss = subcomponentToBeSyncedTo.customCss;
    // need to create a new object as otherwise tempOriginalCustomProperties would be overwritten by a normal traversal
    syncableSubcomponent.customFeatures = JSONUtils.createObjectUsingObject1AndSameObject2Properties(
      syncableSubcomponent.customFeatures, subcomponentToBeSyncedTo.customFeatures);
  }

  // WORK 2 - subcomponentToBeSyncedTo and syncableSubcomponent are mixed up, change syncableSubcomponent to targetSubcomponent and move to start
  // and move subcomponentToBeSyncedTo to the second parameter
  public static syncBaseSubcomponent(subcomponentToBeSyncedTo: Subcomponent, syncableSubcomponent: Subcomponent, addTemporaryProperties: boolean): boolean {
    if (addTemporaryProperties && !syncableSubcomponent.tempOriginalCustomProperties) {
      SyncChildComponent.moveCustomPropertiesToTempProperties(syncableSubcomponent);
      SyncChildComponent.setAreChildrenComponentsTemporarilySynced(syncableSubcomponent);
    }
    if (!subcomponentToBeSyncedTo) return true;
    // this is a naive approach to check if customFeatures are different but is a useful form of lazy evaluation to prevent
    // all features from being traversed all the time (used for components like dropdown button)
    if (Object.keys(subcomponentToBeSyncedTo.customFeatures).length !== Object.keys(syncableSubcomponent.customFeatures).length) {
      SyncChildComponent.syncPropertiesThatOnlyExistInActiveComponent(subcomponentToBeSyncedTo, syncableSubcomponent);
    } else {
      SyncChildComponent.syncAllCustomPropertiesAndAddTop(subcomponentToBeSyncedTo, syncableSubcomponent);
    }
  }

  // if a subcomponent does not exist in the componentToBeSyncedTo, but does in its siblings - add it
  private static setMissingSiblingComponentProperties(componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean,
      siblingComponentTypes: SiblingComponentTypes, componentType: COMPONENT_TYPES): void {
    const subcomponentToBeSyncedTo = componentToBeSyncedTo?.sync.syncables.onSyncComponents.uniqueComponents[componentType]?.baseSubcomponent;
    // when neither the component to be synced to nor the exact sibling component has a particular subcomponent
    // (if sibling component does have the subcomponent it is added by the normal syncSubcomponent process)
    if (!subcomponentToBeSyncedTo || !siblingComponentTypes[componentType]) return;
    const { customDynamicProperties: siblingComponentProperties } = siblingComponentTypes[componentType] as SiblingComponentState;
    if (isTemporary) SyncChildComponent.moveCustomPropertiesToTempProperties(siblingComponentProperties);
    Object.assign(siblingComponentProperties.customCss, subcomponentToBeSyncedTo.customCss);
    Object.assign(siblingComponentProperties.customFeatures, subcomponentToBeSyncedTo.customFeatures);
  }

  private static syncUniqueComponents(uniqueComponents: ComponentTypeToProperties, componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean,
      siblingComponentTypes?: SiblingComponentTypes): boolean {
    let wasAComponentToBeSyncedToMissing = false;
    Object.keys(uniqueComponents).forEach((componentType: COMPONENT_TYPES) => {
      const syncableSubcomponent = uniqueComponents[componentType]?.baseSubcomponent;
      if (!syncableSubcomponent) {
        if (siblingComponentTypes) SyncChildComponent.setMissingSiblingComponentProperties(
          componentToBeSyncedTo, isTemporary, siblingComponentTypes, componentType);
        return;
      }
      const WasAComponentToBeSyncedToMissing = !!SyncChildComponent.syncBaseSubcomponent(
        componentToBeSyncedTo?.sync.syncables.onSyncComponents.uniqueComponents[componentType]?.baseSubcomponent, syncableSubcomponent, isTemporary);
      if (!wasAComponentToBeSyncedToMissing && WasAComponentToBeSyncedToMissing) wasAComponentToBeSyncedToMissing = true;
    });
    return wasAComponentToBeSyncedToMissing;
  }

  // used to resync layer components when there are too many in the syncable component e.g. dropdown menu
  private static reSyncLayers(syncableComponent: WorkshopComponent): void {
    const { siblingChildComponentsAutoSynced } = syncableComponent.sync;
    if (siblingChildComponentsAutoSynced) siblingChildComponentsAutoSynced.resyncFunc(syncableComponent);
  }

  private static syncRepeatedComponents(syncableComponent: WorkshopComponent, repeatedComponents: WorkshopComponent[],
      componentToBeSyncedTo: WorkshopComponent, targeChildComponentType: COMPONENT_TYPES, traverseAll: boolean, isTemporary: boolean,
      siblingComponentTypes?: SiblingComponentTypes): boolean {
    let wasTargetComponentFound = false;
    let wasAComponentToBeSyncedToMissing = false;
    for (let i = 0; i < repeatedComponents.length; i += 1) {
      const { wasTargetComponentFound: WasTargetComponentFound, wasAComponentToBeSyncedToMissing: WasAComponentToBeSyncedToMissing } = SyncChildComponent.syncSyncables(
        repeatedComponents[i], componentToBeSyncedTo.sync.syncables.onSyncComponents.repeatedComponents[i], targeChildComponentType, traverseAll,
        isTemporary, siblingComponentTypes);
      if (!wasTargetComponentFound && WasTargetComponentFound) wasTargetComponentFound = true;
      if (!wasAComponentToBeSyncedToMissing && WasAComponentToBeSyncedToMissing) wasAComponentToBeSyncedToMissing = true;
      if (!traverseAll && wasTargetComponentFound) break;
    }
    // this is executed after the child components have all been traversed
    if (wasAComponentToBeSyncedToMissing) SyncChildComponent.reSyncLayers(syncableComponent);
    return wasTargetComponentFound;
  }

  // not using TraverseComponentViaPreviewStructureChildFirst as it abides to subcomponent order and instead sync components are tracked via syncables
  private static syncSyncables(syncableComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent, targeChildComponentType: COMPONENT_TYPES,
      traverseAll: boolean, isTemporary: boolean, siblingComponentTypes?: SiblingComponentTypes): SynSyncablesResult {
    const { uniqueComponents, repeatedComponents } = syncableComponent.sync.syncables.onSyncComponents;
    const wasAComponentToBeSyncedToMissing = SyncChildComponent.syncUniqueComponents(uniqueComponents, componentToBeSyncedTo, isTemporary, siblingComponentTypes);
    const areTargetSubcomponentsSynced = targeChildComponentType === syncableComponent.type;
    if (!traverseAll && areTargetSubcomponentsSynced) return { wasTargetComponentFound: true, wasAComponentToBeSyncedToMissing };
    const wasTargetComponentFound = SyncChildComponent.syncRepeatedComponents(syncableComponent, repeatedComponents, componentToBeSyncedTo, targeChildComponentType,
      traverseAll, isTemporary, siblingComponentTypes);
    return { wasTargetComponentFound: areTargetSubcomponentsSynced || wasTargetComponentFound, wasAComponentToBeSyncedToMissing };
  }

  // if this method does not work properly it could be because it is not traversing everything as traversAll is set to false
  public static reSyncComponentsSyncedToThisComponent(component: WorkshopComponent, targetChildComponentType: COMPONENT_TYPES): void {
    const parentComponent = SyncChildComponentUtils.getParentComponentWithOtherComponentsSyncedToIt(component);
    if (!parentComponent) return;
    const componentsSyncedToThisArr = Array.from(parentComponent.sync.componentsSyncedToThis);
    for (let i = 0; i < componentsSyncedToThisArr.length; i += 1) {
      const componentSyncedToThis = componentsSyncedToThisArr[i];
      SyncChildComponent.syncSyncables(componentSyncedToThis, parentComponent, targetChildComponentType, false, false);
      SyncChildComponent.reSyncComponentsSyncedToThisComponent(componentSyncedToThis, targetChildComponentType);
    }
  }

  public static syncComponentToTargetTemporarily(currentlySelectedComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(activeComponent);
    SyncChildComponent.syncSyncables(activeComponent, componentToBeSyncedTo, componentToBeSyncedTo.type, true, true, siblingComponentTypes);
    activeComponent.sync.syncExecutables?.on?.(activeComponent, false);
  }

  public static setComponentPropertiesToBeInSync(componentToBeSynced: WorkshopComponent, componentThisIsSyncedTo: WorkshopComponent): void {
    componentToBeSynced.sync.componentThisIsSyncedTo = componentThisIsSyncedTo;
    componentThisIsSyncedTo.sync.componentsSyncedToThis.add(componentToBeSynced);
    componentToBeSynced.componentStatus = componentThisIsSyncedTo.componentStatus;
  }

  public static setAutoSyncedSiblingComponentsToInSync(currentlySelectedComponent: WorkshopComponent, componenetThisIsSyncedTo: WorkshopComponent): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(currentlySelectedComponent);
    if (!siblingComponentTypes) return;
    const { alignmentSectionToComponents } = currentlySelectedComponent.parentLayer;
    Object.keys(alignmentSectionToComponents).forEach((alignmentSection: HORIZONTAL_ALIGNMENT_SECTIONS) => {
      alignmentSectionToComponents[alignmentSection].forEach((component) => {
        SyncChildComponent.setComponentPropertiesToBeInSync(component, componenetThisIsSyncedTo);
      });
    });
  }

  public static syncLastSelectectedComponentToTarget(activeComponent: WorkshopComponent, componentToBeSynced: WorkshopComponent): void {
    activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync
      .lastSelectedComponentToSync = componentToBeSynced;
  }
}

// Original implementation which synced all components within syncableComponent:

// private static syncUniqueComponents(uniqueComponents: SubcomponentTypeToProperties, componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean): boolean {
//   let wasAComponentToBeSyncedToMissing = false;
//   Object.keys(uniqueComponents).forEach((subcomponentType) => {
//     const syncableSubcomponent: Subcomponent = uniqueComponents[subcomponentType];
//     if (!syncableSubcomponent) return;
//     wasAComponentToBeSyncedToMissing = !!SyncChildComponent.syncSubcomponent(syncableSubcomponent,
//       componentToBeSyncedTo?.sync.syncables.onCopy.subcomponents[subcomponentType], isTemporary);
//   });
//   return wasAComponentToBeSyncedToMissing;
// }

// private static syncLayers(syncableComponent: WorkshopComponent): void {
//   const { siblingChildComponentsAutoSynced } = syncableComponent.sync;
//   if (siblingChildComponentsAutoSynced) siblingChildComponentsAutoSynced.resyncFunc(syncableComponent);
// }

// // not using TraverseComponentViaPreviewStructureChildFirst as it abides to component order and instead sync components are tracked via syncables
// private static syncSyncables(syncableComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean): boolean {
//   const { subcomponents, childComponents } = syncableComponent.sync.syncables.onCopy;
//   let wasAComponentToBeSyncedToMissing = SyncChildComponent.syncUniqueComponents(subcomponents, componentToBeSyncedTo, isTemporary);
//   childComponents.forEach((childComponent, index) => {
//     const wasTargetComponentMissingForChild = SyncChildComponent.syncSyncables(childComponent,
//       componentToBeSyncedTo.sync.syncables.onCopy.childComponents[index], isTemporary);
//     if (wasTargetComponentMissingForChild && !wasAComponentToBeSyncedToMissing) wasAComponentToBeSyncedToMissing = true;
//   });
//   if (wasAComponentToBeSyncedToMissing) SyncChildComponent.syncLayers(syncableComponent);
//   return wasAComponentToBeSyncedToMissing;
// }

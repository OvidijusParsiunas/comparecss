import { AutoSyncedSiblingContainerComponentUtils } from '../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { AutoSyncedSiblingComponentUtils } from '../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingComponentUtils';
import { SiblingComponentTypes, SiblingComponentState } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { CustomDynamicProperties, Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { AddContainerComponent } from '../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
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

  private static dereferenceChildWithNoCorrespondingChildToSyncTo(syncableComponent: WorkshopComponent, subcomponent: Subcomponent,
      siblingComponentTypes?: SiblingComponentTypes): void {
    if (siblingComponentTypes) {
      const { type } = subcomponent.seedComponent;
      AutoSyncedSiblingComponentUtils.dereferenceSpecificChildComponentTypeAndResyncTogether(syncableComponent, siblingComponentTypes, type);
    } else {
      SyncChildComponentUtils.dereferenceSubcomponent(subcomponent);
    }
  }

  private static syncCustomProperties(targetSubcomponent: Subcomponent, subcomponentToBeSyncedTo: Subcomponent): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(targetSubcomponent.seedComponent, 2);
    // for components that have different subcomponentToBeSyncedTo.customFeatures we need to create a new object as otherwise
    // tempOriginalCustomProperties would be overwritten by a normal traversal
    const customFeaturesToBeSyncedTo = Object.keys(subcomponentToBeSyncedTo.customFeatures).length === Object.keys(targetSubcomponent.customFeatures).length
      ? subcomponentToBeSyncedTo.customFeatures
      : JSONUtils.createObjectUsingObject1AndSameObject2Properties(targetSubcomponent.customFeatures, subcomponentToBeSyncedTo.customFeatures);
    if (siblingComponentTypes) {
      // this is used to sync custom properties for auto synced components like buttons in a button group
      Object.assign(targetSubcomponent.customFeatures, customFeaturesToBeSyncedTo);
      Object.assign(targetSubcomponent.customCss, subcomponentToBeSyncedTo.customCss);
    } else {
      // this is the default way for syncing custom properties for child components as the one above causes the following issue:
      // upon adding a child dropdown to card then syncing the dropdown button and syncing the whole dropdown after that still
      // keeps the synced to button custom properties reference
      // however the above implementation currently restricts auto synced components to be in a component that can be syncable as a child
      targetSubcomponent.customFeatures = customFeaturesToBeSyncedTo;
      targetSubcomponent.customCss = subcomponentToBeSyncedTo.customCss;
    }
  }

  private static syncAllCustomPropertiesAndAddTop(targetSubcomponent: Subcomponent, subcomponentToBeSyncedTo: Subcomponent, ): void {
    SyncChildComponent.syncCustomProperties(targetSubcomponent, subcomponentToBeSyncedTo);
    const componentToBeSyncedCustomCss = subcomponentToBeSyncedTo.customCss;
    if (!componentToBeSyncedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top && subcomponentToBeSyncedTo.subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      componentToBeSyncedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  private static setAreChildrenComponentsTemporarilySynced(targetSubcomponent: Subcomponent): void {
    const { siblingChildComponentsAutoSynced } = targetSubcomponent.seedComponent.parentLayer?.subcomponent.seedComponent.sync || {};
    if (siblingChildComponentsAutoSynced) siblingChildComponentsAutoSynced.areChildrenComponentsTemporarilySynced = true;
  }

  private static moveCustomPropertiesToTempProperties(targetSubcomponent: CustomDynamicProperties): void {
    targetSubcomponent.tempOriginalCustomProperties = {
      customCss: JSONUtils.deepCopy(targetSubcomponent.customCss),
      customFeatures: JSONUtils.deepCopy(targetSubcomponent.customFeatures),
    };
  }

  public static syncBaseSubcomponent(targetSubcomponent: Subcomponent, subcomponentToBeSyncedTo: Subcomponent, addTemporaryProperties: boolean): boolean {
    if (addTemporaryProperties && !targetSubcomponent.tempOriginalCustomProperties) {
      SyncChildComponent.moveCustomPropertiesToTempProperties(targetSubcomponent);
      SyncChildComponent.setAreChildrenComponentsTemporarilySynced(targetSubcomponent);
    }
    if (!subcomponentToBeSyncedTo) return true;
    SyncChildComponent.syncAllCustomPropertiesAndAddTop(targetSubcomponent, subcomponentToBeSyncedTo);
  }

  // if current subcomponent does not exist in the componentToBeSyncedTo, it may exist in its sibling
  private static setMissingSiblingComponentProperties(componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean,
      siblingComponentTypes: SiblingComponentTypes, componentType: COMPONENT_TYPES): void {
    const subcomponentToBeSyncedTo = componentToBeSyncedTo?.sync.syncables.onSyncComponents.uniqueComponents[componentType]?.baseSubcomponent;
    // when neither the component to be synced to nor the exact sibling component has a particular subcomponent
    // (if sibling component does have the subcomponent it is added by the normal syncSubcomponent process)
    if (!subcomponentToBeSyncedTo || !siblingComponentTypes[componentType] || siblingComponentTypes[componentType].components.size === 0) return;
    const { customDynamicProperties: siblingComponentProperties } = siblingComponentTypes[componentType] as SiblingComponentState;
    if (isTemporary) SyncChildComponent.moveCustomPropertiesToTempProperties(siblingComponentProperties);
    Object.assign(siblingComponentProperties.customCss, subcomponentToBeSyncedTo.customCss);
    Object.assign(siblingComponentProperties.customFeatures, subcomponentToBeSyncedTo.customFeatures);
  }

  private static syncUniqueComponents(syncableComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean,
      siblingComponentTypes?: SiblingComponentTypes): boolean {
    let wasAComponentToBeSyncedToMissing = false;
    const { uniqueComponents } = syncableComponent.sync.syncables.onSyncComponents;
    Object.keys(uniqueComponents).forEach((componentType: COMPONENT_TYPES) => {
      const targetSubcomponent = uniqueComponents[componentType]?.baseSubcomponent;
      if (!targetSubcomponent) {
        if (siblingComponentTypes) SyncChildComponent.setMissingSiblingComponentProperties(
          componentToBeSyncedTo, isTemporary, siblingComponentTypes, componentType);
        return;
      }
      // this is used to dereference missing components and also resync layers in the syncRepeatedComponents method
      const WasAComponentToBeSyncedToMissing = !!SyncChildComponent.syncBaseSubcomponent(
        targetSubcomponent, componentToBeSyncedTo?.sync.syncables.onSyncComponents.uniqueComponents[componentType]?.baseSubcomponent, isTemporary);
      if (WasAComponentToBeSyncedToMissing) SyncChildComponent.dereferenceChildWithNoCorrespondingChildToSyncTo(syncableComponent, targetSubcomponent,
        siblingComponentTypes);
      if (!wasAComponentToBeSyncedToMissing && WasAComponentToBeSyncedToMissing) wasAComponentToBeSyncedToMissing = true;
    });
    return wasAComponentToBeSyncedToMissing;
  }

  // used to resync layer components when there are too many in the syncable component e.g. dropdown menu
  private static reSyncLayers(syncableComponent: WorkshopComponent): void {
    const { siblingChildComponentsAutoSynced } = syncableComponent.sync;
    if (siblingChildComponentsAutoSynced) siblingChildComponentsAutoSynced.resyncFunc(syncableComponent);
  }

  private static syncRepeatedComponents(syncableComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent,
      targeChildComponentType: COMPONENT_TYPES, traverseAll: boolean, isTemporary: boolean, siblingComponentTypes?: SiblingComponentTypes): boolean {
    let wasTargetComponentFound = false;
    let wasAComponentToBeSyncedToMissing = false;
    const { repeatedComponents } = syncableComponent.sync.syncables.onSyncComponents;
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
    const wasAComponentToBeSyncedToMissing = SyncChildComponent.syncUniqueComponents(syncableComponent, componentToBeSyncedTo, isTemporary, siblingComponentTypes);
    const areTargetSubcomponentsSynced = targeChildComponentType === syncableComponent.type;
    if (!traverseAll && areTargetSubcomponentsSynced) return { wasTargetComponentFound: true, wasAComponentToBeSyncedToMissing };
    const wasTargetComponentFound = SyncChildComponent.syncRepeatedComponents(syncableComponent, componentToBeSyncedTo, targeChildComponentType,
      traverseAll, isTemporary, siblingComponentTypes);
    return { wasTargetComponentFound: areTargetSubcomponentsSynced || wasTargetComponentFound, wasAComponentToBeSyncedToMissing };
  }

  private static resyncComponentSyncedToThisComponent(componentSyncedToThis: WorkshopComponent, parentComponent: WorkshopComponent,
      targetChildComponentType: COMPONENT_TYPES, traversedSiblingComponentTypes: Set<SiblingComponentTypes>): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(componentSyncedToThis);
    if (siblingComponentTypes) {
      if (traversedSiblingComponentTypes.has(siblingComponentTypes)) return;
      traversedSiblingComponentTypes.add(siblingComponentTypes);
    }
    SyncChildComponent.syncSyncables(componentSyncedToThis, parentComponent, targetChildComponentType, false, false, siblingComponentTypes);
    SyncChildComponent.reSyncComponentsSyncedToThisComponent(componentSyncedToThis, targetChildComponentType);
  }

  // if this method does not work properly it could be because it is not traversing everything as traversAll is set to false
  public static reSyncComponentsSyncedToThisComponent(component: WorkshopComponent, targetChildComponentType: COMPONENT_TYPES): void {
    const parentComponent = SyncChildComponentUtils.getParentComponentWithOtherComponentsSyncedToIt(component);
    if (!parentComponent) return;
    // this is used to optimize the work for updating multiple sibling component types properties as they use the same siblingComponentTypes object,
    // hence iterating through each component is redundant (e.g. button group button components)
    const traversedSiblingComponentTypes: Set<SiblingComponentTypes> = new Set();
    const componentsSyncedToThisArr = Array.from(parentComponent.sync.componentsSyncedToThis);
    for (let i = 0; i < componentsSyncedToThisArr.length; i += 1) {
      const componentSyncedToThis = componentsSyncedToThisArr[i];
      SyncChildComponent.resyncComponentSyncedToThisComponent(componentSyncedToThis, parentComponent, targetChildComponentType, traversedSiblingComponentTypes);
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
    activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync = componentToBeSynced;
  }
}

// Original implementation which synced all components within syncableComponent:

// private static syncUniqueComponents(uniqueComponents: SubcomponentTypeToProperties, componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean): boolean {
//   let wasAComponentToBeSyncedToMissing = false;
//   Object.keys(uniqueComponents).forEach((subcomponentType) => {
//     const targetSubcomponent: Subcomponent = uniqueComponents[subcomponentType];
//     if (!targetSubcomponent) return;
//     wasAComponentToBeSyncedToMissing = !!SyncChildComponent.syncSubcomponent(targetSubcomponent,
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

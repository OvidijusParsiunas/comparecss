import { AddContainerComponent } from '../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SubcomponentTypeToProperties } from '../../../../../../interfaces/subcomponentTypeToProperties';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { SyncChildComponentUtils } from './syncChildComponentUtils';
import JSONUtils from '../../../utils/generic/jsonUtils';

interface SynSyncablesResult {
  wasTargetFound: boolean;
  wasTargetComponentMissing: boolean;
}

export class SyncChildComponent {
  
  private static moveCustomPropertiesToTempProperties(syncableSubcomponent: SubcomponentProperties): void {
    syncableSubcomponent.tempOriginalCustomProperties = {
      customCss: syncableSubcomponent.customCss,
      customFeatures: syncableSubcomponent.customFeatures,
    };
  }

  private static syncAllCustomProperties(syncableSubcomponent: SubcomponentProperties, subcomponentToBeSyncedTo: SubcomponentProperties): void {
    syncableSubcomponent.customFeatures = subcomponentToBeSyncedTo.customFeatures;
    const componentToBeSyncedCustomCss = subcomponentToBeSyncedTo.customCss;
    syncableSubcomponent.customCss = componentToBeSyncedCustomCss;
    if (!componentToBeSyncedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top && subcomponentToBeSyncedTo.subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      componentToBeSyncedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  private static syncPropertiesThatOnlyExistInActiveComponent(syncableSubcomponent: SubcomponentProperties, subcomponentToBeSyncedTo: SubcomponentProperties): void {
    syncableSubcomponent.customCss = subcomponentToBeSyncedTo.customCss;
    // need to create a new object as otherwise tempOriginalCustomProperties would be overwritten by a normal traversal
    syncableSubcomponent.customFeatures = JSONUtils.createObjectUsingObject1AndSameObject2Properties(
      syncableSubcomponent.customFeatures, subcomponentToBeSyncedTo.customFeatures);
  }

  public static syncSubcomponent(syncableSubcomponent: SubcomponentProperties, subcomponentToBeSyncedTo: SubcomponentProperties, addTemporaryProperties: boolean): boolean {
    if (addTemporaryProperties && !syncableSubcomponent.tempOriginalCustomProperties) {
      SyncChildComponent.moveCustomPropertiesToTempProperties(syncableSubcomponent);
    }
    if (!subcomponentToBeSyncedTo) return true;
    // this is a naive approach to check if customFeatures are different but is a useful form of lazy evaluation to prevent
    // all features from being traversed all the time (used for components like drodpown button)
    if (Object.keys(subcomponentToBeSyncedTo.customFeatures).length !== Object.keys(syncableSubcomponent.customFeatures).length) {
      SyncChildComponent.syncPropertiesThatOnlyExistInActiveComponent(syncableSubcomponent, subcomponentToBeSyncedTo);
    } else {
      SyncChildComponent.syncAllCustomProperties(syncableSubcomponent, subcomponentToBeSyncedTo);
    }
  }

  private static syncSyncableSubcomponents(syncableSubcomponents: SubcomponentTypeToProperties, componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean): boolean {
    let wasTargetComponentMissing = false;
    Object.keys(syncableSubcomponents).forEach((subcomponentType) => {
      const syncableSubcomponent: SubcomponentProperties = syncableSubcomponents[subcomponentType];
      if (!syncableSubcomponent) return;
      const WasTargetComponentMissing = !!SyncChildComponent.syncSubcomponent(syncableSubcomponent,
        componentToBeSyncedTo?.sync.syncables.onCopy.subcomponents[subcomponentType], isTemporary);
      if (!wasTargetComponentMissing && WasTargetComponentMissing) wasTargetComponentMissing = true;
    });
    return wasTargetComponentMissing;
  }

  // used to resync layer components when there are too many in the syncable component e.g. dropdown menu
  private static reSyncLayers(syncableComponent: WorkshopComponent): void {
    const { siblingLayersInSyncWithEachOther } = syncableComponent;
    if (siblingLayersInSyncWithEachOther) siblingLayersInSyncWithEachOther.containerSyncFunc(syncableComponent);
  }

  private static syncChildComponents(syncableComponent: WorkshopComponent, childComponents: WorkshopComponent[],
      componentToBeSyncedTo: WorkshopComponent, childComponentType: COMPONENT_TYPES, traverseAll: boolean, isTemporary: boolean): boolean {
    let wasTargetFound = false;
    let wasTargetComponentMissing = false;
    for (let i = 0; i < childComponents.length; i += 1) {
      const { wasTargetFound: WasTargetFound, wasTargetComponentMissing: WasTargetComponentMissing } = SyncChildComponent.syncSyncables(
        childComponents[i], componentToBeSyncedTo.sync.syncables.onCopy.childComponents[i], childComponentType, traverseAll, isTemporary);
      if (!wasTargetFound && WasTargetFound) wasTargetFound = true;
      if (!wasTargetComponentMissing && WasTargetComponentMissing) wasTargetComponentMissing = true;
      if (!traverseAll && wasTargetFound) break;
    }
    // this is executed after the child components have all been traversed
    if (wasTargetComponentMissing) SyncChildComponent.reSyncLayers(syncableComponent);
    return wasTargetFound;
  }

  // not using TraverseComponentViaPreviewStructureChildFirst as it abides to subcomponent order and instead sync components are tracked via syncables
  private static syncSyncables(syncableComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent, childComponentType: COMPONENT_TYPES,
      traversAll: boolean, isTemporary: boolean): SynSyncablesResult {
    const { subcomponents, childComponents } = syncableComponent.sync.syncables.onCopy;
    const wasTargetComponentMissing = SyncChildComponent.syncSyncableSubcomponents(subcomponents, componentToBeSyncedTo, isTemporary);
    const sameComponent = childComponentType === syncableComponent.type;
    if (!traversAll && sameComponent) return { wasTargetFound: true, wasTargetComponentMissing };
    const wasTargetFound = SyncChildComponent.syncChildComponents(syncableComponent, childComponents, componentToBeSyncedTo, childComponentType,
      traversAll, isTemporary);
    return { wasTargetFound: sameComponent || wasTargetFound, wasTargetComponentMissing };
  }

  // if this method does not work properly it could be because it is not traversing everything as traversAll is set to false
  public static reSyncSubcomponentsSyncedToThisSubcomponent(component: WorkshopComponent, childComponentType: COMPONENT_TYPES): void {
    const parentComponent = SyncChildComponentUtils.getParentComponentWithOtherComponentsSyncedToIt(component);
    if (!parentComponent) return;
    const componentsSyncedToThisArr = Array.from(parentComponent.sync.componentsSyncedToThis);
    for (let i = 0; i < componentsSyncedToThisArr.length; i += 1) {
      const componentSyncedToThis = componentsSyncedToThisArr[i];
      SyncChildComponent.syncSyncables(componentSyncedToThis, parentComponent, childComponentType, false, false);
      SyncChildComponent.reSyncSubcomponentsSyncedToThisSubcomponent(componentSyncedToThis, childComponentType);
    }
  }

  public static syncComponentToTargetTemporarily(currentlySelectedComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    SyncChildComponent.syncSyncables(activeComponent, componentToBeSyncedTo, componentToBeSyncedTo.type, true, true);
  }

  public static syncLastSelectectedComponentToTarget(activeComponent: WorkshopComponent, componentToBeSynced: WorkshopComponent): void {
    activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync
      .lastSelectedComponentToSync = componentToBeSynced;
  }
}

// Original implementation which synced all child components:

// private static syncSyncableSubcomponents(syncableSubcomponents: SubcomponentTypeToProperties, componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean): boolean {
//   let wasTargetComponentMissing = false;
//   Object.keys(syncableSubcomponents).forEach((subcomponentType) => {
//     const syncableSubcomponent: SubcomponentProperties = syncableSubcomponents[subcomponentType];
//     if (!syncableSubcomponent) return;
//     wasTargetComponentMissing = !!SyncChildComponent.syncSubcomponent(syncableSubcomponent,
//       componentToBeSyncedTo?.sync.syncables.onCopy.subcomponents[subcomponentType], isTemporary);
//   });
//   return wasTargetComponentMissing;
// }

// private static syncLayers(syncableComponent: WorkshopComponent): void {
//   const { siblingLayersInSyncWithEachOther } = syncableComponent;
//   if (siblingLayersInSyncWithEachOther) siblingLayersInSyncWithEachOther.containerSyncFunc(syncableComponent);
// }

// // not using TraverseComponentViaPreviewStructureChildFirst as it abides to subcomponent order and instead sync components are tracked via syncables
// private static syncSyncables(syncableComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean): boolean {
//   const { subcomponents, childComponents } = syncableComponent.sync.syncables.onCopy;
//   let wasTargetComponentMissing = SyncChildComponent.syncSyncableSubcomponents(subcomponents, componentToBeSyncedTo, isTemporary);
//   childComponents.forEach((childComponent, index) => {
//     const wasTargetComponentMissingForChild = SyncChildComponent.syncSyncables(childComponent,
//       componentToBeSyncedTo.sync.syncables.onCopy.childComponents[index], isTemporary);
//     if (wasTargetComponentMissingForChild && !wasTargetComponentMissing) wasTargetComponentMissing = true;
//   });
//   if (wasTargetComponentMissing) SyncChildComponent.syncLayers(syncableComponent);
//   return wasTargetComponentMissing;
// }

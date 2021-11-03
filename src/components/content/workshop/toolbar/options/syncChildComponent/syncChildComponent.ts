import { AddContainerComponent } from '../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SubcomponentTypeToProperties } from '../../../../../../interfaces/subcomponentTypeToProperties';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { SyncChildComponentUtils } from './syncChildComponentUtils';
import JSONUtils from '../../../utils/generic/jsonUtils';

interface SynSyncablesResult {
  wasTargetChildFound: boolean;
  wasAComponentToBeSyncedToMissing: boolean;
}

export class SyncChildComponent {
  
  private static moveCustomPropertiesToTempProperties(syncableSubcomponent: SubcomponentProperties): void {
    syncableSubcomponent.tempOriginalCustomProperties = {
      customCss: JSONUtils.deepCopy(syncableSubcomponent.customCss),
      customFeatures: JSONUtils.deepCopy(syncableSubcomponent.customFeatures),
    };
  }

  private static syncAllCustomProperties(syncableSubcomponent: SubcomponentProperties, subcomponentToBeSyncedTo: SubcomponentProperties): void {
    Object.assign(syncableSubcomponent.customFeatures, subcomponentToBeSyncedTo.customFeatures);
    Object.assign(syncableSubcomponent.customCss, subcomponentToBeSyncedTo.customCss);
    const componentToBeSyncedCustomCss = subcomponentToBeSyncedTo.customCss;
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
    let wasAComponentToBeSyncedToMissing = false;
    Object.keys(syncableSubcomponents).forEach((subcomponentType) => {
      const syncableSubcomponent: SubcomponentProperties = syncableSubcomponents[subcomponentType];
      if (!syncableSubcomponent) return;
      const WasAComponentToBeSyncedToMissing = !!SyncChildComponent.syncSubcomponent(syncableSubcomponent,
        componentToBeSyncedTo?.sync.syncables.onCopy.subcomponents[subcomponentType], isTemporary);
      if (!wasAComponentToBeSyncedToMissing && WasAComponentToBeSyncedToMissing) wasAComponentToBeSyncedToMissing = true;
    });
    return wasAComponentToBeSyncedToMissing;
  }

  // used to resync layer components when there are too many in the syncable component e.g. dropdown menu
  private static reSyncLayers(syncableComponent: WorkshopComponent): void {
    const { siblingChildComponentsAutoSynced } = syncableComponent.sync;
    if (siblingChildComponentsAutoSynced) siblingChildComponentsAutoSynced.resyncFunc(syncableComponent);
  }

  private static syncChildComponents(syncableComponent: WorkshopComponent, childComponents: WorkshopComponent[],
      componentToBeSyncedTo: WorkshopComponent, targeChildComponentType: COMPONENT_TYPES, traverseAll: boolean, isTemporary: boolean): boolean {
    let wasTargetChildFound = false;
    let wasAComponentToBeSyncedToMissing = false;
    for (let i = 0; i < childComponents.length; i += 1) {
      const { wasTargetChildFound: WasTargetChildFound, wasAComponentToBeSyncedToMissing: WasAComponentToBeSyncedToMissing } = SyncChildComponent.syncSyncables(
        childComponents[i], componentToBeSyncedTo.sync.syncables.onCopy.childComponents[i], targeChildComponentType, traverseAll, isTemporary);
      if (!wasTargetChildFound && WasTargetChildFound) wasTargetChildFound = true;
      if (!wasAComponentToBeSyncedToMissing && WasAComponentToBeSyncedToMissing) wasAComponentToBeSyncedToMissing = true;
      if (!traverseAll && wasTargetChildFound) break;
    }
    // this is executed after the child components have all been traversed
    if (wasAComponentToBeSyncedToMissing) SyncChildComponent.reSyncLayers(syncableComponent);
    return wasTargetChildFound;
  }

  // not using TraverseComponentViaPreviewStructureChildFirst as it abides to subcomponent order and instead sync components are tracked via syncables
  private static syncSyncables(syncableComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent, targeChildComponentType: COMPONENT_TYPES,
      traverseAll: boolean, isTemporary: boolean): SynSyncablesResult {
    const { subcomponents, childComponents } = syncableComponent.sync.syncables.onCopy;
    const wasAComponentToBeSyncedToMissing = SyncChildComponent.syncSyncableSubcomponents(subcomponents, componentToBeSyncedTo, isTemporary);
    const areTargetSubcomponentsSynced = targeChildComponentType === syncableComponent.type;
    if (!traverseAll && areTargetSubcomponentsSynced) return { wasTargetChildFound: true, wasAComponentToBeSyncedToMissing };
    const wasTargetChildFound = SyncChildComponent.syncChildComponents(syncableComponent, childComponents, componentToBeSyncedTo, targeChildComponentType,
      traverseAll, isTemporary);
    return { wasTargetChildFound: areTargetSubcomponentsSynced || wasTargetChildFound, wasAComponentToBeSyncedToMissing };
  }

  // if this method does not work properly it could be because it is not traversing everything as traversAll is set to false
  public static reSyncSubcomponentsSyncedToThisSubcomponent(component: WorkshopComponent, targetChildComponentType: COMPONENT_TYPES): void {
    const parentComponent = SyncChildComponentUtils.getParentComponentWithOtherComponentsSyncedToIt(component);
    if (!parentComponent) return;
    const componentsSyncedToThisArr = Array.from(parentComponent.sync.componentsSyncedToThis);
    for (let i = 0; i < componentsSyncedToThisArr.length; i += 1) {
      const componentSyncedToThis = componentsSyncedToThisArr[i];
      SyncChildComponent.syncSyncables(componentSyncedToThis, parentComponent, targetChildComponentType, false, false);
      SyncChildComponent.reSyncSubcomponentsSyncedToThisSubcomponent(componentSyncedToThis, targetChildComponentType);
    }
  }

  public static syncComponentToTargetTemporarily(currentlySelectedComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    SyncChildComponent.syncSyncables(activeComponent, componentToBeSyncedTo, componentToBeSyncedTo.type, true, true);
  }

  public static setAutoSyncedSiblingComponentsToInSync(currentlySelectedComponent: WorkshopComponent, componenetThisIsSyncedTo: WorkshopComponent): void {
    const { siblingSubcomponents } = currentlySelectedComponent.parentLayer.subcomponentProperties.seedComponent.sync?.siblingChildComponentsAutoSynced || {};
    if (!siblingSubcomponents) return;
    const { alignedSections } = currentlySelectedComponent.parentLayer.sections;
    Object.keys(alignedSections).forEach((alignedSectionType: ALIGNED_SECTION_TYPES) => {
      alignedSections[alignedSectionType].forEach((baseSubcomponent) => {
        baseSubcomponent.subcomponentProperties.seedComponent.sync.componentThisIsSyncedTo = componenetThisIsSyncedTo;
        componenetThisIsSyncedTo.sync.componentsSyncedToThis.add(baseSubcomponent.subcomponentProperties.seedComponent);
      });
    });
  }

  public static syncLastSelectectedComponentToTarget(activeComponent: WorkshopComponent, componentToBeSynced: WorkshopComponent): void {
    activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync
      .lastSelectedComponentToSync = componentToBeSynced;
  }
}

// Original implementation which synced all components within syncableComponent:

// private static syncSyncableSubcomponents(syncableSubcomponents: SubcomponentTypeToProperties, componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean): boolean {
//   let wasAComponentToBeSyncedToMissing = false;
//   Object.keys(syncableSubcomponents).forEach((subcomponentType) => {
//     const syncableSubcomponent: SubcomponentProperties = syncableSubcomponents[subcomponentType];
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

// // not using TraverseComponentViaPreviewStructureChildFirst as it abides to subcomponent order and instead sync components are tracked via syncables
// private static syncSyncables(syncableComponent: WorkshopComponent, componentToBeSyncedTo: WorkshopComponent, isTemporary: boolean): boolean {
//   const { subcomponents, childComponents } = syncableComponent.sync.syncables.onCopy;
//   let wasAComponentToBeSyncedToMissing = SyncChildComponent.syncSyncableSubcomponents(subcomponents, componentToBeSyncedTo, isTemporary);
//   childComponents.forEach((childComponent, index) => {
//     const wasTargetComponentMissingForChild = SyncChildComponent.syncSyncables(childComponent,
//       componentToBeSyncedTo.sync.syncables.onCopy.childComponents[index], isTemporary);
//     if (wasTargetComponentMissingForChild && !wasAComponentToBeSyncedToMissing) wasAComponentToBeSyncedToMissing = true;
//   });
//   if (wasAComponentToBeSyncedToMissing) SyncChildComponent.syncLayers(syncableComponent);
//   return wasAComponentToBeSyncedToMissing;
// }

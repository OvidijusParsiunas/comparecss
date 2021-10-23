import { AddContainerComponent } from '../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SubcomponentTypeToProperties } from '../../../../../../interfaces/subcomponentTypeToProperties';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../../utils/generic/jsonUtils';

type SyncSyncablesCallback = (isTemporary: boolean, targetSubcomponent: SubcomponentProperties, ...otherSubcomponents: SubcomponentProperties[]) => boolean | void;

export class SyncChildComponent {
  
  private static moveCustomPropertiesToTempProperties(syncableSubcomponent: SubcomponentProperties): void {
    syncableSubcomponent.tempOriginalCustomProperties = {
      customCss: syncableSubcomponent.customCss,
      customFeatures: syncableSubcomponent.customFeatures,
    };
  }

  private static syncAllCustomProperties(syncableSubcomponent: SubcomponentProperties, subcomponentToBeSynced: SubcomponentProperties): void {
    syncableSubcomponent.customFeatures = subcomponentToBeSynced.customFeatures;
    const componentToBeSyncedCustomCss = subcomponentToBeSynced.customCss;
    syncableSubcomponent.customCss = componentToBeSyncedCustomCss;
    if (!componentToBeSyncedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top && subcomponentToBeSynced.subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      componentToBeSyncedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = AddContainerComponent.DEFAULT_TOP_PROPERTY;
    }
  }

  private static syncPropertiesThatOnlyExistInActiveComponent(syncableSubcomponent: SubcomponentProperties, subcomponentToBeSynced: SubcomponentProperties): void {
    syncableSubcomponent.customCss = subcomponentToBeSynced.customCss;
    // need to create a new object as otherwise tempOriginalCustomProperties would be overwritten by a normal traversal
    syncableSubcomponent.customFeatures = JSONUtils.createObjectUsingObject1AndSameObject2Properties(
      syncableSubcomponent.customFeatures, subcomponentToBeSynced.customFeatures);
  }

  public static syncSubcomponent(addTemporaryProperties: boolean, syncableSubcomponent: SubcomponentProperties, subcomponentToBeSynced: SubcomponentProperties): boolean {
    if (addTemporaryProperties && !syncableSubcomponent.tempOriginalCustomProperties) {
      SyncChildComponent.moveCustomPropertiesToTempProperties(syncableSubcomponent);
    }
    if (!subcomponentToBeSynced) return true;
    // this is a naive approach to check if customFeatures are different but is a useful form of lazy evaluation to prevent
    // all features from being traversed all the time (used for components like drodpown button)
    if (Object.keys(subcomponentToBeSynced.customFeatures).length !== Object.keys(syncableSubcomponent.customFeatures).length) {
      SyncChildComponent.syncPropertiesThatOnlyExistInActiveComponent(syncableSubcomponent, subcomponentToBeSynced);
    } else {
      SyncChildComponent.syncAllCustomProperties(syncableSubcomponent, subcomponentToBeSynced);
    }
  }

  private static syncSyncableSubcomponents(callback: SyncSyncablesCallback, isTemporary: boolean, syncableSubcomponents: SubcomponentTypeToProperties,
      targetComponents: WorkshopComponent[]): boolean {
    let wasTargetComponentMissing = false;
    Object.keys(syncableSubcomponents).forEach((subcomponentType) => {
      const syncableSubcomponent: SubcomponentProperties = syncableSubcomponents[subcomponentType];
      if (!syncableSubcomponent) return;
      wasTargetComponentMissing = !!callback(isTemporary, syncableSubcomponent,
        ...targetComponents.map((targetComponent) => targetComponent?.sync.syncables.onCopy.subcomponents[subcomponentType]));
    });
    return wasTargetComponentMissing;
  }

  private static syncLayers(syncableComponent: WorkshopComponent): void {
    const { siblingLayersInSyncWithEachOther } = syncableComponent;
    if (siblingLayersInSyncWithEachOther) siblingLayersInSyncWithEachOther.containerSyncFunc(syncableComponent);
  }

  // not using TraverseComponentViaPreviewStructureChildFirst as it abides to subcomponent order and instead sync components are tracked via syncables
  private static syncSyncables(callback: SyncSyncablesCallback, isTemporary: boolean, syncableComponent: WorkshopComponent, ...targetComponents: WorkshopComponent[]): boolean {
    const { subcomponents, childComponents } = syncableComponent.sync.syncables.onCopy;
    let wasTargetComponentMissing = SyncChildComponent.syncSyncableSubcomponents(callback, isTemporary, subcomponents, targetComponents);
    childComponents.forEach((childComponent, index) => {
      const wasTargetComponentMissingForChild = SyncChildComponent.syncSyncables(callback, isTemporary, childComponent,
        ...targetComponents.map((targetComponent) => targetComponent.sync.syncables.onCopy.childComponents[index]));
      if (wasTargetComponentMissingForChild && !wasTargetComponentMissing) wasTargetComponentMissing = true;
    });
    if (wasTargetComponentMissing) SyncChildComponent.syncLayers(syncableComponent);
    return wasTargetComponentMissing;
  }

  public static syncComponentToTargetTemporarily(currentlySelectedComponent: WorkshopComponent, componentToBeSynced: WorkshopComponent): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    SyncChildComponent.syncSyncables(SyncChildComponent.syncSubcomponent, true, activeComponent, componentToBeSynced);
  }

  private static syncSubcomponentToMultipleDuringPreviewTraversal(isTemporary: boolean, subcomponentToSync: SubcomponentProperties,
      ...targetSubcomponents: SubcomponentProperties[]): void {
    targetSubcomponents.forEach((targetSubcomponent) => {
      SyncChildComponent.syncSubcomponent(isTemporary, targetSubcomponent, subcomponentToSync);
    });
  }

  public static syncComponentToTargets(component: WorkshopComponent, ...targetComponents: WorkshopComponent[]): void {
    SyncChildComponent.syncSyncables(SyncChildComponent.syncSubcomponentToMultipleDuringPreviewTraversal,
      false, component, ...targetComponents);
  }

  public static syncLastSelectectedComponentToTarget(activeComponent: WorkshopComponent, componentToBeSynced: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync = componentToBeSynced;
  }
}

import { TraverseComponentViaPreviewStructureParentFirst } from '../../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { AddContainerComponent } from '../../../../utils/componentManipulation/addChildComponent/add/addContainerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SubcomponentTypeToProperties } from '../../../../../../../interfaces/subcomponentTypeToProperties';
import { SubcomponentPreviewTraversalState } from '../../../../../../../interfaces/componentTraversal';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../../../utils/generic/jsonUtils';

type SyncSyncablesCallback = (isTemporary: boolean, targetSubcomponent: SubcomponentProperties, ...otherSubcomponents: SubcomponentProperties[]) => void;

export class SyncChildComponentModeTempPropertiesUtils {
  
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

  public static syncSubcomponent(addTemporaryProperties: boolean, syncableSubcomponent: SubcomponentProperties, subcomponentToBeSynced: SubcomponentProperties): void {
    if (!subcomponentToBeSynced) return;
    if (addTemporaryProperties && !syncableSubcomponent.tempOriginalCustomProperties) {
      SyncChildComponentModeTempPropertiesUtils.moveCustomPropertiesToTempProperties(syncableSubcomponent);
    }
    // this is a naive approach to check if customFeatures are different but is a useful form of lazy evaluation to prevent
    // all features from being traversed all the time (used for components like drodpown button)
    if (Object.keys(subcomponentToBeSynced.customFeatures).length !== Object.keys(syncableSubcomponent.customFeatures).length) {
      SyncChildComponentModeTempPropertiesUtils.syncPropertiesThatOnlyExistInActiveComponent(syncableSubcomponent, subcomponentToBeSynced);
    } else {
      SyncChildComponentModeTempPropertiesUtils.syncAllCustomProperties(syncableSubcomponent, subcomponentToBeSynced);
    }
  }

  private static syncSyncableSubcomponents(callback: SyncSyncablesCallback, isTemporary: boolean, syncableSubcomponents: SubcomponentTypeToProperties,
      targetComponents: WorkshopComponent[]): void {
    Object.keys(syncableSubcomponents).forEach((subcomponentType) => {
      const targetSubcomponent: SubcomponentProperties = syncableSubcomponents[subcomponentType];
      if (!targetSubcomponent) return;
      callback(isTemporary, targetSubcomponent,
        ...targetComponents.map((component) => component.sync.syncables.subcomponents[subcomponentType]));
    });
  }

  // not using TraverseComponentViaPreviewStructureChildFirst as it abides to subcomponent order and instead sync components are tracked via syncables
  private static syncSyncables(callback: SyncSyncablesCallback, isTemporary: boolean, component: WorkshopComponent, ...targetComponents: WorkshopComponent[]): void {
    const { subcomponents, childComponents } = component.sync.syncables;
    SyncChildComponentModeTempPropertiesUtils.syncSyncableSubcomponents(callback, isTemporary, subcomponents, targetComponents);
    childComponents.forEach((childComponent, index) => {
      SyncChildComponentModeTempPropertiesUtils.syncSyncables(callback, isTemporary, childComponent,
        ...targetComponents.map((targetComponent) => targetComponent.sync.syncables.childComponents[index]));
    });
  }

  public static syncComponentToTarget(currentlySelectedComponent: WorkshopComponent, componentToBeSynced: WorkshopComponent): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    SyncChildComponentModeTempPropertiesUtils.syncSyncables(SyncChildComponentModeTempPropertiesUtils.syncSubcomponent, true, activeComponent, componentToBeSynced);
  }

  private static syncSubcomponentToMultipleDuringPreviewTraversal(isTemporary: boolean, subcomponentToSync: SubcomponentProperties,
      ...targetSubcomponents: SubcomponentProperties[]): void {
    targetSubcomponents.forEach((targetSubcomponent) => {
      SyncChildComponentModeTempPropertiesUtils.syncSubcomponent(isTemporary, targetSubcomponent, subcomponentToSync);
    });
  }

  public static syncComponentToMultipleTargets(component: WorkshopComponent, targetComponents: Set<WorkshopComponent>): void {
    SyncChildComponentModeTempPropertiesUtils.syncSyncables(SyncChildComponentModeTempPropertiesUtils.syncSubcomponentToMultipleDuringPreviewTraversal,
      false, component, ...targetComponents);
  }

  private static resetOriginalCss(subcomponentProperties: SubcomponentProperties): void {
    if (!subcomponentProperties.tempOriginalCustomProperties) return;
    subcomponentProperties.customCss = subcomponentProperties.tempOriginalCustomProperties.customCss;
    subcomponentProperties.customFeatures = subcomponentProperties.tempOriginalCustomProperties.customFeatures; 
  }

  private static resetSubcomponentProperties(activeComponentTraversal: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const resetSubcomponentProperties = this as any as boolean;
    const activeSubcomponent = activeComponentTraversal.subcomponentProperties;
    if (resetSubcomponentProperties) SyncChildComponentModeTempPropertiesUtils.resetOriginalCss(activeSubcomponent);
    delete activeSubcomponent.tempOriginalCustomProperties;
    return activeComponentTraversal;
  }

  public static cleanComponent(currentlySelectedComponent: WorkshopComponent, resetSubcomponentProperties = true): void {
    const activeComponent = currentlySelectedComponent.subcomponents[currentlySelectedComponent.activeSubcomponentName].seedComponent;
    TraverseComponentViaPreviewStructureParentFirst.traverse(
      SyncChildComponentModeTempPropertiesUtils.resetSubcomponentProperties.bind(resetSubcomponentProperties), activeComponent);
  }

  public static syncLastSelectectedComponentToTarget(activeComponent: WorkshopComponent, componentToBeSynced: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync = componentToBeSynced;
  }

  public static deleteLastSelectedComponentToSync(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].seedComponent.sync.lastSelectedComponentToSync;
  }
}

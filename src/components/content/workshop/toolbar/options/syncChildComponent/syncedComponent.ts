import { TraverseComponentViaPreviewStructureChildFirst } from '../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureChildFirst';
import { SyncChildComponentModeTempPropertiesUtils } from './modeUtils/syncChildComponentModeTempPropertiesUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SubcomponentPreviewTraversalState } from '../../../../../../interfaces/componentTraversal';
import { SyncChildComponentUtils } from './syncChildComponentUtils';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class SyncedComponent {

  private static dereferenceCopiedComponentCustomProperties(componentTraversalState: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const { subcomponentProperties } = componentTraversalState;
    subcomponentProperties.customCss = JSONUtils.deepCopy(subcomponentProperties.customCss);
    subcomponentProperties.customFeatures = JSONUtils.deepCopy(subcomponentProperties.customFeatures);
    const { baseSubcomponent, propertyOverwritingExecutables } = subcomponentProperties.seedComponent;
    if (baseSubcomponent === subcomponentProperties) {
      (propertyOverwritingExecutables || []).forEach((executable) => executable(subcomponentProperties.seedComponent, false));
    }
    return componentTraversalState;
  }

  public static getParentComponentWithComponentsSyncedToIt(component: WorkshopComponent): WorkshopComponent {
    return SyncChildComponentUtils.getParentComponentWithCondition(component, (component) => component?.sync.componentsSyncedToThis.size > 0);
  }

  public static toggleSubcomponentSyncToOff(containerComponent: WorkshopComponent, callback?: () => void): void {
    const inSyncComponent = SyncChildComponentUtils.getInSyncComponent(containerComponent.subcomponents[containerComponent.activeSubcomponentName]);
    TraverseComponentViaPreviewStructureChildFirst.traverse(SyncedComponent.dereferenceCopiedComponentCustomProperties, inSyncComponent);
    inSyncComponent.sync.componentThisIsSyncedTo = null;
    if (callback) callback();
  }

  private static findSubcomponentToSync(componentThisIsSyncedTo: WorkshopComponent, newComponentBase: SubcomponentProperties): SubcomponentProperties {
    const { subcomponents } = componentThisIsSyncedTo;
    const subcomponentToSync = Object.keys(subcomponents).find((subcomponentName) => {
      return subcomponents[subcomponentName].subcomponentType === newComponentBase.subcomponentType;
    });
    return subcomponents[subcomponentToSync];
  }

  public static copyChildPropertiesFromInSyncContainerComponent(newComponent: WorkshopComponent, componentThisIsSyncedTo: WorkshopComponent): void {
    const newComponentBase = newComponent.baseSubcomponent;
    const subcomponentToSync = SyncedComponent.findSubcomponentToSync(componentThisIsSyncedTo, newComponentBase);
    if (subcomponentToSync) SyncChildComponentModeTempPropertiesUtils.syncSubcomponent(false, newComponentBase, subcomponentToSync);
  }

  public static updateIfSubcomponentNotInSync(masterComponent: WorkshopComponent, activeSubcomponent: SubcomponentProperties): void {
    const inSyncComponent = SyncChildComponentUtils.getInSyncComponent(activeSubcomponent);
    if (inSyncComponent && inSyncComponent.componentStatus.isRemoved) {
      SyncedComponent.toggleSubcomponentSyncToOff(masterComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    const inSyncComponent = SyncChildComponentUtils.getInSyncComponent(activeSubcomponent);
    return inSyncComponent && !inSyncComponent.componentStatus.isRemoved;
  }
}
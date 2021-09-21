import { TraverseComponentViaPreviewStructureChildFirst } from '../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureChildFirst';
import { CopyChildComponentModeTempPropertiesUtils } from './modeUtils/copyChildComponentModeTempPropertiesUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SubcomponentPreviewTraversalState } from '../../../../../../interfaces/componentTraversal';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class SyncedComponent {

  private static dereferenceCopiedComponentCustomProperties(componentTraversalState: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const { subcomponentProperties } = componentTraversalState;
    subcomponentProperties.customCss = JSONUtils.deepCopy(subcomponentProperties.customCss);
    subcomponentProperties.customFeatures = JSONUtils.deepCopy(subcomponentProperties.customFeatures);
    const { coreSubcomponentRefs, propertyOverwritingExecutables } = subcomponentProperties.seedComponent;
    if (coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE] === subcomponentProperties) {
      (propertyOverwritingExecutables || []).forEach((executable) => executable(subcomponentProperties.seedComponent, false));
    }
    return componentTraversalState;
  }

  private static getPaddingComponent(component: WorkshopComponent): WorkshopComponent {
    return component?.paddingComponent || component?.linkedComponents?.base?.paddingComponent;
  }

  private static getInSyncPaddingComponent(component: WorkshopComponent): WorkshopComponent {
    const paddingComponent = SyncedComponent.getPaddingComponent(component) || SyncedComponent.getPaddingComponent(component.containerComponent);
    return paddingComponent?.sync?.syncedComponent ? paddingComponent : null;
  }

  private static getActiveInSyncComponent({ seedComponent }: SubcomponentProperties): WorkshopComponent {
    if (seedComponent.sync?.syncedComponent) {
      return seedComponent;
    } else if (seedComponent.containerComponent?.sync?.syncedComponent) {
      return seedComponent.containerComponent;
    }
    return SyncedComponent.getInSyncPaddingComponent(seedComponent);
  }

  public static toggleSubcomponentSyncToOff(containerComponent: WorkshopComponent, callback?: () => void): void {
    const inSyncComponent = SyncedComponent.getActiveInSyncComponent(containerComponent.subcomponents[containerComponent.activeSubcomponentName]);
    TraverseComponentViaPreviewStructureChildFirst.traverseUsingComponent(SyncedComponent.dereferenceCopiedComponentCustomProperties, inSyncComponent);
    inSyncComponent.sync.syncedComponent = null;
    if (callback) callback();
  }

  private static findSubcomponentToCopy(syncedComponent: WorkshopComponent, newComponentBase: SubcomponentProperties): SubcomponentProperties {
    const { subcomponents } = syncedComponent;
    const subcomponentToCopy = Object.keys(subcomponents).find((subcomponentName) => {
      return subcomponents[subcomponentName].subcomponentType === newComponentBase.subcomponentType;
    });
    return subcomponents[subcomponentToCopy];
  }

  public static copyChildPropertiesFromInSyncContainerComponent(newComponent: WorkshopComponent, syncedComponent: WorkshopComponent): void {
    const newComponentBase = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const subcomponentToCopy = SyncedComponent.findSubcomponentToCopy(syncedComponent, newComponentBase);
    if (subcomponentToCopy) CopyChildComponentModeTempPropertiesUtils.copySubcomponent(newComponentBase, subcomponentToCopy);
  }

  public static updateIfSubcomponentNotInSync(masterComponent: WorkshopComponent, activeSubcomponent: SubcomponentProperties): void {
    const inSyncComponent = SyncedComponent.getActiveInSyncComponent(activeSubcomponent);
    if (inSyncComponent && inSyncComponent.componentStatus.isRemoved) {
      SyncedComponent.toggleSubcomponentSyncToOff(masterComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    const inSyncComponent = SyncedComponent.getActiveInSyncComponent(activeSubcomponent);
    return inSyncComponent && !inSyncComponent.componentStatus.isRemoved;
  }
}

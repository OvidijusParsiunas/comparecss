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

  private static getPaddingComponentWithCondition(component: WorkshopComponent, conditionCallback: (component: WorkshopComponent) => boolean): WorkshopComponent {
    const paddingComponent = SyncedComponent.getPaddingComponent(component) || SyncedComponent.getPaddingComponent(component.containerComponent);
    return conditionCallback(paddingComponent) ? paddingComponent : null;
  }

  private static getParentComponentWithCondition(component: WorkshopComponent, conditionCallback: (component: WorkshopComponent) => boolean): WorkshopComponent {
    if (conditionCallback(component.containerComponent)) {
      return component.containerComponent;
    }
    return SyncedComponent.getPaddingComponentWithCondition(component, conditionCallback);
  }

  public static getParentComponentWithComponentsSyncedToIt(component: WorkshopComponent): WorkshopComponent {
    return SyncedComponent.getParentComponentWithCondition(component, (component) => component?.sync.componentsSyncedToThis.size > 0);
  }

  private static getInSyncComponent({ seedComponent }: SubcomponentProperties): WorkshopComponent {
    if (seedComponent.sync?.componentThisIsSyncedTo) {
      return seedComponent;
    }
    return SyncedComponent.getParentComponentWithCondition(seedComponent, (component) => !!component?.sync.componentThisIsSyncedTo);
  }

  public static toggleSubcomponentSyncToOff(containerComponent: WorkshopComponent, callback?: () => void): void {
    const inSyncComponent = SyncedComponent.getInSyncComponent(containerComponent.subcomponents[containerComponent.activeSubcomponentName]);
    TraverseComponentViaPreviewStructureChildFirst.traverse(SyncedComponent.dereferenceCopiedComponentCustomProperties, inSyncComponent);
    inSyncComponent.sync.componentThisIsSyncedTo = null;
    if (callback) callback();
  }

  private static findSubcomponentToCopy(componentThisIsSyncedTo: WorkshopComponent, newComponentBase: SubcomponentProperties): SubcomponentProperties {
    const { subcomponents } = componentThisIsSyncedTo;
    const subcomponentToCopy = Object.keys(subcomponents).find((subcomponentName) => {
      return subcomponents[subcomponentName].subcomponentType === newComponentBase.subcomponentType;
    });
    return subcomponents[subcomponentToCopy];
  }

  public static copyChildPropertiesFromInSyncContainerComponent(newComponent: WorkshopComponent, componentThisIsSyncedTo: WorkshopComponent): void {
    const newComponentBase = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const subcomponentToCopy = SyncedComponent.findSubcomponentToCopy(componentThisIsSyncedTo, newComponentBase);
    if (subcomponentToCopy) CopyChildComponentModeTempPropertiesUtils.copySubcomponent(false, newComponentBase, subcomponentToCopy);
  }

  public static updateIfSubcomponentNotInSync(masterComponent: WorkshopComponent, activeSubcomponent: SubcomponentProperties): void {
    const inSyncComponent = SyncedComponent.getInSyncComponent(activeSubcomponent);
    if (inSyncComponent && inSyncComponent.componentStatus.isRemoved) {
      SyncedComponent.toggleSubcomponentSyncToOff(masterComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    const inSyncComponent = SyncedComponent.getInSyncComponent(activeSubcomponent);
    return inSyncComponent && !inSyncComponent.componentStatus.isRemoved;
  }
}

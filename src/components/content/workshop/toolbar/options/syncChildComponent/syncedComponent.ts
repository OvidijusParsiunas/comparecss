import { TraverseComponentViaPreviewStructureChildFirst } from '../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureChildFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { PropertyReferenceSharingFuncsUtils } from '../../../newComponent/types/shared/propertyReferenceSharingFuncs/propertyReferenceSharingFuncsUtils';
import { AutoSyncedSiblingComponentUtils } from '../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingComponentUtils';
import { ComponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { SyncChildComponentUtils } from './syncChildComponentUtils';
import { SyncChildComponent } from './syncChildComponent';

export class SyncedComponent {

  private static unsyncComponent(componentTraversalState: ComponentPreviewTraversalState): PreviewTraversalResult {
    const { component } = componentTraversalState;
    const { baseSubcomponent, sync: { syncExecutables } } = component;
    SyncChildComponentUtils.dereferenceSubcomponent(baseSubcomponent);
    const propertySharingFuncType = baseSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.LAYER ? 'layer' : 'container';
    PropertyReferenceSharingFuncsUtils.executePropertyReferenceSharingFuncs(false, propertySharingFuncType, component);
    syncExecutables?.off?.(component, true);
    return {};
  }

  private static unsyncFromComponentCurrentlySyncedTo(inSyncComponent: WorkshopComponent): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(inSyncComponent);
    if (siblingComponentTypes) {
      AutoSyncedSiblingComponentUtils.dereferenceAllChildComponentsAndResyncTogether(inSyncComponent, siblingComponentTypes);
    } else {
      TraverseComponentViaPreviewStructureChildFirst.traverse(SyncedComponent.unsyncComponent, inSyncComponent);
    }
  }

  private static unSyncComponent(inSyncComponent: WorkshopComponent, childComponentType: COMPONENT_TYPES): void {
    SyncedComponent.unsyncFromComponentCurrentlySyncedTo(inSyncComponent);
    inSyncComponent.sync.componentThisIsSyncedTo = null;
    setTimeout(() => {
      SyncChildComponent.reSyncComponentsSyncedToThisComponent(inSyncComponent, childComponentType);
    });
  }

  public static toggleChildComponentSyncToOff(containerComponent: WorkshopComponent, callback?: () => void): void {
    const activeComponent = containerComponent.subcomponents[containerComponent.activeSubcomponentName].seedComponent;
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(activeComponent);
    SyncedComponent.unSyncComponent(inSyncComponent, activeComponent.type);
    if (callback) callback();
  }

  public static findChildComponentToSync(targetChildComponent: WorkshopComponent, componentThisIsSyncedTo: WorkshopComponent,
      containerType: COMPONENT_TYPES): WorkshopComponent {
    const { sync: { syncables: { onSyncComponents: { uniqueComponents, repeatedComponents } } } } = componentThisIsSyncedTo;
    if (componentThisIsSyncedTo.type === containerType) {
      return uniqueComponents[targetChildComponent.type];
    }
    const repeatedComponentMatchingContainerType = repeatedComponents.find((repeatedComponent) => repeatedComponent.type === containerType);
    return repeatedComponentMatchingContainerType.sync.syncables.onSyncComponents.uniqueComponents[targetChildComponent.type];
  }

  public static copyChildPropertiesFromInSyncContainerComponent(targetChildComponent: WorkshopComponent, componentThisIsSyncedTo: WorkshopComponent,
      containerType: COMPONENT_TYPES): void {
    const componentToSync = SyncedComponent.findChildComponentToSync(targetChildComponent, componentThisIsSyncedTo, containerType);
    if (componentToSync) SyncChildComponent.syncBaseSubcomponent(targetChildComponent.baseSubcomponent, componentToSync.baseSubcomponent, false);
  }

  public static updateIfComponentSyncedToIsRemoved(component: WorkshopComponent): void {
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(component);
    // more information can be found in the documentation reference: DOC: 7878
    if (inSyncComponent?.componentStatus.isRemoved) {
      SyncedComponent.unSyncComponent(inSyncComponent, component.type);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: Subcomponent): boolean {
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(activeSubcomponent.seedComponent);
    return inSyncComponent && !inSyncComponent.componentStatus.isRemoved;
  }

  public static addParentComponentSyncableContainerComponentsToChild(childComponent: WorkshopComponent, parentComponent: WorkshopComponent): void {
    childComponent.sync.syncables.containerComponents.push(...parentComponent.sync.syncables.containerComponents)
  }
}

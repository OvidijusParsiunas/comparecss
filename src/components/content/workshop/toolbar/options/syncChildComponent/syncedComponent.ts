import { TraverseComponentViaPreviewStructureChildFirst } from '../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureChildFirst';
import { PropertyReferenceSharingFuncsUtils } from '../../../newComponent/types/shared/propertyReferenceSharingFuncs/propertyReferenceSharingFuncsUtils';
import { SubcomponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { SyncChildComponentUtils } from './syncChildComponentUtils';
import { SyncChildComponent } from './syncChildComponent';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class SyncedComponent {

  private static dereferenceCopiedComponentCustomProperties(componentTraversalState: SubcomponentPreviewTraversalState): PreviewTraversalResult {
    const { subcomponentProperties } = componentTraversalState;
    subcomponentProperties.customCss = JSONUtils.deepCopy(subcomponentProperties.customCss);
    subcomponentProperties.customFeatures = JSONUtils.deepCopy(subcomponentProperties.customFeatures);
    const propertySharingFuncType = subcomponentProperties.subcomponentType === SUBCOMPONENT_TYPES.LAYER ? 'layer' : 'container';
    PropertyReferenceSharingFuncsUtils.executePropertyReferenceSharingFuncs(false, propertySharingFuncType, subcomponentProperties.seedComponent);
    return {};
  }

  private static unSyncComponent(inSyncComponent: WorkshopComponent): void {
    TraverseComponentViaPreviewStructureChildFirst.traverse(SyncedComponent.dereferenceCopiedComponentCustomProperties, inSyncComponent);
    inSyncComponent.sync.componentThisIsSyncedTo = null;
    SyncChildComponent.reSyncSubcomponentsSyncedToThisSubcomponent(inSyncComponent);
  }

  public static toggleSubcomponentSyncToOff(containerComponent: WorkshopComponent, callback?: () => void): void {
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(
      containerComponent.subcomponents[containerComponent.activeSubcomponentName].seedComponent)
    SyncedComponent.unSyncComponent(inSyncComponent);
    if (callback) callback();
  }

  public static findSubcomponentToSync(componentThisIsSyncedTo: WorkshopComponent, newComponentBase: SubcomponentProperties,
      containerType: COMPONENT_TYPES): SubcomponentProperties {
    const { sync: { syncables: { onCopy: { subcomponents, childComponents } } } } = componentThisIsSyncedTo;
    if (componentThisIsSyncedTo.type === containerType) {
      return subcomponents[newComponentBase.subcomponentType];
    }
    const childComponentMatchingContainerType = childComponents.find((childComponent) => childComponent.type === containerType);
    return childComponentMatchingContainerType.sync.syncables.onCopy.subcomponents[newComponentBase.subcomponentType];
  }

  public static copyChildPropertiesFromInSyncContainerComponent(newComponent: WorkshopComponent, componentThisIsSyncedTo: WorkshopComponent,
      containerType: COMPONENT_TYPES): void {
    const newComponentBase = newComponent.baseSubcomponent;
    const subcomponentToSync = SyncedComponent.findSubcomponentToSync(componentThisIsSyncedTo, newComponentBase, containerType);
    if (subcomponentToSync) SyncChildComponent.syncSubcomponent(false, newComponentBase, subcomponentToSync);
  }

  public static updateIfComponentSyncedToIsRemoved(activeSubcomponent: SubcomponentProperties): void {
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(activeSubcomponent.seedComponent);
    // more information can be found in the documentation reference: DOC: 7878
    if (inSyncComponent?.componentStatus.isRemoved) {
      const componentsSyncedToThis = SyncChildComponentUtils.getParentComponentWithOtherComponentsSyncedToIt(activeSubcomponent.seedComponent);
      if (!componentsSyncedToThis || componentsSyncedToThis.sync.componentsSyncedToThis.size === 0) SyncedComponent.unSyncComponent(inSyncComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(activeSubcomponent.seedComponent);
    return inSyncComponent && !inSyncComponent.componentStatus.isRemoved;
  }

  public static addParentComponentSyncableContainerComponentsToChild(childComponent: WorkshopComponent, parentComponent: WorkshopComponent): void {
    childComponent.sync.syncables.containerComponents.push(...parentComponent.sync.syncables.containerComponents)
  }
}

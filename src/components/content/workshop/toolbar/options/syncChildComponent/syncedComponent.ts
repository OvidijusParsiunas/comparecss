import { TraverseComponentViaPreviewStructureChildFirst } from '../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureChildFirst';
import { PropertyReferenceSharingFuncsUtils } from '../../../newComponent/types/shared/propertyReferenceSharingFuncs/propertyReferenceSharingFuncsUtils';
import { SubcomponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
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

  public static toggleSubcomponentSyncToOff(containerComponent: WorkshopComponent, callback?: () => void): void {
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(containerComponent
      .subcomponents[containerComponent.activeSubcomponentName].seedComponent);
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
    if (subcomponentToSync) SyncChildComponent.syncSubcomponent(false, newComponentBase, subcomponentToSync);
  }

  public static updateIfSubcomponentNotInSync(masterComponent: WorkshopComponent, activeSubcomponent: SubcomponentProperties): void {
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(activeSubcomponent.seedComponent);
    // more information can be found in the documentation reference: DOC: 7878
    if (inSyncComponent && inSyncComponent.componentStatus.isRemoved) {
      const componentsSyncedToThis = SyncChildComponentUtils.getParentComponentWithOtherComponentsSyncedToIt(activeSubcomponent.seedComponent);
      if (componentsSyncedToThis.sync.componentsSyncedToThis.size === 0) SyncedComponent.toggleSubcomponentSyncToOff(masterComponent);
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

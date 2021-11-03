import { TraverseComponentViaPreviewStructureChildFirst } from '../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureChildFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { PropertyReferenceSharingFuncsUtils } from '../../../newComponent/types/shared/propertyReferenceSharingFuncs/propertyReferenceSharingFuncsUtils';
import { SubcomponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SiblingSubcomponents } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
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

  private static resyncSiblingChildComponents(siblingSubcomponents: SiblingSubcomponents): void {
    Object.keys(siblingSubcomponents).forEach((subcomponentType: keyof SUBCOMPONENT_TYPES) => {
      const { subcomponentProperties } = siblingSubcomponents[subcomponentType];
      Object.assign(subcomponentProperties.customCss, JSONUtils.deepCopy(subcomponentProperties.customCss));
      Object.assign(subcomponentProperties.customFeatures, JSONUtils.deepCopy(subcomponentProperties.customFeatures));
    });
  }

  private static unsyncFromComponentCurrentlySyncedTo(inSyncComponent: WorkshopComponent, siblingSubcomponents: SiblingSubcomponents): void {
    if (siblingSubcomponents) {
      SyncedComponent.resyncSiblingChildComponents(siblingSubcomponents);
    } else {
      TraverseComponentViaPreviewStructureChildFirst.traverse(SyncedComponent.dereferenceCopiedComponentCustomProperties, inSyncComponent);
    }
  }

  private static unSyncComponent(inSyncComponent: WorkshopComponent, siblingSubcomponents: SiblingSubcomponents, childComponentType: COMPONENT_TYPES): void {
    SyncedComponent.unsyncFromComponentCurrentlySyncedTo(inSyncComponent, siblingSubcomponents);
    inSyncComponent.sync.componentThisIsSyncedTo = null;
    setTimeout(() => {
      SyncChildComponent.reSyncSubcomponentsSyncedToThisSubcomponent(inSyncComponent, childComponentType);
    });
  }

  private static removeAutoSyncedSiblingComponentsSyncReferences(inSyncComponent: WorkshopComponent): void {
    const { alignedSections } = inSyncComponent.parentLayer.sections;
    Object.keys(alignedSections).forEach((alignedSectionType: ALIGNED_SECTION_TYPES) => {
      alignedSections[alignedSectionType].forEach((baseSubcomponent) => {
        const { seedComponent } = baseSubcomponent.subcomponentProperties;
        seedComponent.sync.componentThisIsSyncedTo.sync.componentsSyncedToThis.delete(seedComponent);
        seedComponent.sync.componentThisIsSyncedTo = null;
      });
    });
  }

  public static toggleSubcomponentSyncToOff(containerComponent: WorkshopComponent, callback?: () => void): void {
    const activeComponent = containerComponent.subcomponents[containerComponent.activeSubcomponentName].seedComponent;
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(activeComponent);
    const siblingSubcomponents = AutoSyncedSiblingContainerComponentUtils.getSiblingSubcomponents(inSyncComponent);
    if (siblingSubcomponents) SyncedComponent.removeAutoSyncedSiblingComponentsSyncReferences(inSyncComponent);
    SyncedComponent.unSyncComponent(inSyncComponent, siblingSubcomponents, activeComponent.type);
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
    if (subcomponentToSync) SyncChildComponent.syncSubcomponent(newComponentBase, subcomponentToSync, false);
  }

  public static updateIfComponentSyncedToIsRemoved(component: WorkshopComponent): void {
    const inSyncComponent = SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(component);
    // more information can be found in the documentation reference: DOC: 7878
    if (inSyncComponent?.componentStatus.isRemoved) {
      const siblingSubcomponents = AutoSyncedSiblingContainerComponentUtils.getSiblingSubcomponents(inSyncComponent);
      SyncedComponent.unSyncComponent(inSyncComponent, siblingSubcomponents, component.type);
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

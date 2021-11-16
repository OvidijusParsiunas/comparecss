import { TraverseComponentViaPreviewStructureChildFirst } from '../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureChildFirst';
import { AutoSyncedSiblingContainerComponentUtils } from '../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingContainerComponentUtils';
import { PropertyReferenceSharingFuncsUtils } from '../../../newComponent/types/shared/propertyReferenceSharingFuncs/propertyReferenceSharingFuncsUtils';
import { AutoSyncedSiblingComponentUtils } from '../../../utils/componentManipulation/autoSyncedSiblingComponentUtils/autoSyncedSiblingComponentUtils';
import { SiblingComponentTypes, SiblingComponentState } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { SubcomponentPreviewTraversalState, PreviewTraversalResult } from '../../../../../../interfaces/componentTraversal';
import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { SyncChildComponentUtils } from './syncChildComponentUtils';
import { SyncChildComponent } from './syncChildComponent';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class SyncedComponent {

  private static dereferenceCopiedComponentCustomProperties(componentTraversalState: SubcomponentPreviewTraversalState): PreviewTraversalResult {
    const { subcomponent } = componentTraversalState;
    subcomponent.customCss = JSONUtils.deepCopy(subcomponent.customCss);
    subcomponent.customFeatures = JSONUtils.deepCopy(subcomponent.customFeatures);
    const propertySharingFuncType = subcomponent.subcomponentType === SUBCOMPONENT_TYPES.LAYER ? 'layer' : 'container';
    PropertyReferenceSharingFuncsUtils.executePropertyReferenceSharingFuncs(false, propertySharingFuncType, subcomponent.seedComponent);
    return {};
  }

  private static removeAutoSyncedSiblingSyncReferencesAndResyncTogether(inSyncComponent: WorkshopComponent,
      siblingComponentTypes: SiblingComponentTypes): void {
    const { alignedSections } = inSyncComponent.parentLayer.sections;
    Object.keys(alignedSections).forEach((alignedSectionType: ALIGNED_SECTION_TYPES) => {
      alignedSections[alignedSectionType].forEach((baseSubcomponent) => {
        const { seedComponent } = baseSubcomponent;
        seedComponent.sync.componentThisIsSyncedTo.sync.componentsSyncedToThis.delete(seedComponent);
        seedComponent.sync.componentThisIsSyncedTo = null;
        SyncChildComponentUtils.callFuncOnSyncableComponents(AutoSyncedSiblingComponentUtils.copySiblingComponentSyncableTraversalCallback,
          seedComponent, siblingComponentTypes);
      });
    });
  }

  private static dereferenceSiblingChildComponents(siblingComponentTypes: SiblingComponentTypes): void {
    Object.keys(siblingComponentTypes).forEach((subcomponentType: keyof SUBCOMPONENT_TYPES) => {
      const { customDynamicProperties } = siblingComponentTypes[subcomponentType] as SiblingComponentState;
      customDynamicProperties.customCss = JSONUtils.deepCopy(customDynamicProperties.customCss);
      customDynamicProperties.customFeatures = JSONUtils.deepCopy(customDynamicProperties.customFeatures);
    });
  }

  private static unsyncFromComponentCurrentlySyncedTo(inSyncComponent: WorkshopComponent): void {
    const siblingComponentTypes = AutoSyncedSiblingContainerComponentUtils.getSiblingComponentTypes(inSyncComponent);
    if (siblingComponentTypes) {
      SyncedComponent.dereferenceSiblingChildComponents(siblingComponentTypes);
      SyncedComponent.removeAutoSyncedSiblingSyncReferencesAndResyncTogether(inSyncComponent, siblingComponentTypes);
    } else {
      TraverseComponentViaPreviewStructureChildFirst.traverse(SyncedComponent.dereferenceCopiedComponentCustomProperties, inSyncComponent);
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
    const { sync: { syncables: { onCopy: { uniqueComponents, repeatedComponents } } } } = componentThisIsSyncedTo;
    if (componentThisIsSyncedTo.type === containerType) {
      return uniqueComponents[targetChildComponent.type];
    }
    // WORK 2 - each text is called twice
    const repeatedComponentMatchingContainerType = repeatedComponents.find((repeatedComponent) => repeatedComponent.type === containerType);
    return repeatedComponentMatchingContainerType.sync.syncables.onCopy.uniqueComponents[targetChildComponent.type];
  }

  public static copyChildPropertiesFromInSyncContainerComponent(targetChildComponent: WorkshopComponent, componentThisIsSyncedTo: WorkshopComponent,
      containerType: COMPONENT_TYPES): void {
    const componentToSync = SyncedComponent.findChildComponentToSync(targetChildComponent, componentThisIsSyncedTo, containerType);
    if (componentToSync) SyncChildComponent.syncSubcomponent(targetChildComponent.baseSubcomponent, componentToSync.baseSubcomponent, false);
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

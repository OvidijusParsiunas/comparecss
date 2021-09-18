import { TraverseComponentViaPreviewStructureChildFirst } from '../../../utils/componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureChildFirst';
import { CopyChildComponentModeTempPropertiesUtils } from './modeUtils/copyChildComponentModeTempPropertiesUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ReferenceSharingExecutable } from '../../../../../../interfaces/referenceSharingExecutable';
import { SubcomponentPreviewTraversalState } from '../../../../../../interfaces/componentTraversal';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class SyncedComponent {

  private static dereferenceCopiedComponentCustomProperties(componentTraversalState: SubcomponentPreviewTraversalState): SubcomponentPreviewTraversalState {
    const { subcomponentProperties } = componentTraversalState;
    subcomponentProperties.customCss = JSONUtils.deepCopy(subcomponentProperties.customCss);
    subcomponentProperties.customFeatures = JSONUtils.deepCopy(subcomponentProperties.customFeatures);
    const { coreSubcomponentRefs, referenceSharingExecutables } = subcomponentProperties.seedComponent;
    if (coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE] === subcomponentProperties) {
      (referenceSharingExecutables || []).forEach((executable: ReferenceSharingExecutable) => executable(coreSubcomponentRefs));
    }
    return componentTraversalState;
  }

  // WORK2 - refactor
  private static getReferenceSharingComponent({ seedComponent }: SubcomponentProperties): WorkshopComponent {
    const { referenceSharingExecutables, containerComponent } = seedComponent;
    const activeSeedComponent = referenceSharingExecutables ? seedComponent : containerComponent;
    return activeSeedComponent?.paddingComponent || activeSeedComponent?.linkedComponents?.base?.paddingComponent || activeSeedComponent;
  }

  // if active subcomponent is text in a nested button, need to make sure to get the button base
  private static getActiveReferenceSharingComponentBase(containerComponent: WorkshopComponent): SubcomponentProperties {
    const activeSubcomponent = containerComponent.subcomponents[containerComponent.activeSubcomponentName];
    return SyncedComponent.getReferenceSharingComponent(activeSubcomponent).coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
  }

  // WORK2 - refactor
  public static toggleSubcomponentSync(containerComponent: WorkshopComponent, useActiveReferenceSharingComponent = true, callback?: () => void): void {
    const baseSubcomponent = useActiveReferenceSharingComponent
      ? SyncedComponent.getActiveReferenceSharingComponentBase(containerComponent) : containerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    TraverseComponentViaPreviewStructureChildFirst.traverseUsingComponent(SyncedComponent.dereferenceCopiedComponentCustomProperties, baseSubcomponent.seedComponent);
    baseSubcomponent.seedComponent.sync.syncedComponent = null;
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
    const referenceSharingComponent = SyncedComponent.getReferenceSharingComponent(activeSubcomponent);
    if (referenceSharingComponent?.sync.syncedComponent && referenceSharingComponent.componentStatus.isRemoved) {
      SyncedComponent.toggleSubcomponentSync(masterComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    const referenceSharingComponent = SyncedComponent.getReferenceSharingComponent(activeSubcomponent);
    return referenceSharingComponent?.sync.syncedComponent && !referenceSharingComponent.componentStatus.isRemoved;
  }
}

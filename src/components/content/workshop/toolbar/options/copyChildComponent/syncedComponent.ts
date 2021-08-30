import { CoreSubcomponentRefsUtils } from '../../../utils/componentManipulation/coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ReferenceSharingExecutable } from '../../../../../../interfaces/referenceSharingExecutable';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class SyncedComponent {
  
  private static dereferenceCopiedComponentCustomProperties(baseSubcomponent: SubcomponentProperties): void {
    const { referenceSharingExecutables, coreSubcomponentRefs } = baseSubcomponent.seedComponent;
    CoreSubcomponentRefsUtils.getActiveRefKeys(coreSubcomponentRefs).forEach((subcomponentType) => {
      const subcomponent = coreSubcomponentRefs[subcomponentType];
      if (!subcomponent) return;
      subcomponent.customCss = JSONUtils.deepCopy(subcomponent.customCss);
      subcomponent.customFeatures = JSONUtils.deepCopy(subcomponent.customFeatures);
    });
    referenceSharingExecutables.forEach((executable: ReferenceSharingExecutable) => executable(coreSubcomponentRefs));
  }

  // if active subcomponent is text in a nested button, need to make sure to get the button base
  private static getActiveReferenceSharingComponentBase(containerComponent: WorkshopComponent): SubcomponentProperties {
    const activeSubcomponent = containerComponent.subcomponents[containerComponent.activeSubcomponentName];
    const activeSeedComponent = activeSubcomponent.seedComponent.referenceSharingExecutables
      ? activeSubcomponent.seedComponent : activeSubcomponent.seedComponent.containerComponent;
    return activeSeedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
  }

  public static toggleSubcomponentSync(containerComponent: WorkshopComponent, useActiveReferenceSharingComponent = true, callback?: () => void): void {
    const baseSubcomponent = useActiveReferenceSharingComponent
      ? SyncedComponent.getActiveReferenceSharingComponentBase(containerComponent) : containerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (baseSubcomponent.seedComponent.sync.syncedComponent) SyncedComponent.dereferenceCopiedComponentCustomProperties(baseSubcomponent);
    // WORK3: activeComponentBase.seedComponent.inSync &&= null;
    if (baseSubcomponent.seedComponent.sync.syncedComponent) baseSubcomponent.seedComponent.sync.syncedComponent = null;
    if (callback) callback();
  }

  private static getReferenceSharingComponent(activeSubcomponent: SubcomponentProperties): WorkshopComponent {
    return activeSubcomponent.seedComponent.referenceSharingExecutables ?
      activeSubcomponent.seedComponent : activeSubcomponent.seedComponent.containerComponent;
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

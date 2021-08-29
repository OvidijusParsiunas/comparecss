import { CoreSubcomponentRefsUtils } from '../../../utils/componentManipulation/coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ReferenceSharingExecutable } from '../../../../../../interfaces/referenceSharingExecutable';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class SyncedComponent {
  
  private static dereferenceCopiedComponentCustomProperties(activeComponentBase: SubcomponentProperties): void {
    const { referenceSharingExecutables, coreSubcomponentRefs } = activeComponentBase.seedComponent;
    CoreSubcomponentRefsUtils.getActiveRefKeys(coreSubcomponentRefs).forEach((subcomponentType) => {
      const subcomponent = coreSubcomponentRefs[subcomponentType];
      if (!subcomponent) return;
      subcomponent.customCss = JSONUtils.deepCopy(subcomponent.customCss);
      subcomponent.customFeatures = JSONUtils.deepCopy(subcomponent.customFeatures);
    });
    referenceSharingExecutables.forEach((executable: ReferenceSharingExecutable) => executable(coreSubcomponentRefs));
  }

  // if active subcomponent is text in a nested button, need to make sure to get the button base
  private static getActiveContainerComponentBase(activeComponent: WorkshopComponent): SubcomponentProperties {
    const activeBaseSubcomponent = activeComponent.subcomponents[activeComponent.activeSubcomponentName];
    const activeSeedComponent = activeBaseSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.BASE
      ? activeBaseSubcomponent.seedComponent : activeBaseSubcomponent.seedComponent.containerComponent;
    return activeSeedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
  }

  public static toggleSubcomponentSync(activeComponent: WorkshopComponent, useActiveSeedComponentBase = true, callback?: () => void): void {
    const activeComponentBase = useActiveSeedComponentBase
      ? SyncedComponent.getActiveContainerComponentBase(activeComponent) : activeComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (activeComponentBase.seedComponent.sync.syncedComponent) SyncedComponent.dereferenceCopiedComponentCustomProperties(activeComponentBase);
    // WORK3: activeComponentBase.seedComponent.inSync &&= null;
    if (activeComponentBase.seedComponent.sync.syncedComponent) activeComponentBase.seedComponent.sync.syncedComponent = null;
    if (callback) callback();
  }

  public static updateIfSubcomponentNotInSync(activeComponent: WorkshopComponent, activeSubcomponent: SubcomponentProperties): void {
    const seedComponent = activeSubcomponent.seedComponent;
    if (seedComponent?.sync.syncedComponent && seedComponent.componentStatus.isRemoved) {
      SyncedComponent.toggleSubcomponentSync(activeComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    const seedComponent = activeSubcomponent.seedComponent;
    return seedComponent?.sync.syncedComponent && !seedComponent.componentStatus.isRemoved;
  }
}

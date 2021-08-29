import { CoreSubcomponentRefsUtils } from '../../../utils/componentManipulation/coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ReferenceSharingExecutable } from '../../../../../../interfaces/referenceSharingExecutable';
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

  public static toggleSubcomponentInSync(activeComponent: WorkshopComponent, callback?: () => void): void {
    const activeSubcomponent = activeComponent.subcomponents[activeComponent.activeSubcomponentName];
    const activeComponentBase = activeSubcomponent.baseSubcomponentRef || activeSubcomponent;
    if (activeComponentBase.seedComponent.sync.syncedComponent) {
      SyncedComponent.dereferenceCopiedComponentCustomProperties(activeComponentBase);
    }
    // WORK3: activeComponentBase.seedComponent.inSync &&= null;
    if (activeComponentBase.seedComponent.sync.syncedComponent) activeComponentBase.seedComponent.sync.syncedComponent = null;
    if (callback) callback();
  }

  private static getSeedSubcomponent(activeSubcomponent: SubcomponentProperties): WorkshopComponent {
    return activeSubcomponent.baseSubcomponentRef?.seedComponent || activeSubcomponent.seedComponent;
  }

  public static updateIfSubcomponentNotInSync(activeComponent: WorkshopComponent, activeSubcomponent: SubcomponentProperties): void {
    const seedComponent = SyncedComponent.getSeedSubcomponent(activeSubcomponent);
    if (seedComponent?.sync.syncedComponent && seedComponent.componentStatus.isRemoved) {
      SyncedComponent.toggleSubcomponentInSync(activeComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    const seedComponent = SyncedComponent.getSeedSubcomponent(activeSubcomponent);
    return seedComponent?.sync.syncedComponent && !seedComponent.componentStatus.isRemoved;
  }
}

import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ReferenceSharingExecutable } from '../../../../../../interfaces/referenceSharingExecutable';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class SyncedComponent {
  
  private static dereferenceCopiedComponentCustomProperties(activeComponent: WorkshopComponent, baseSubcomponent: SubcomponentProperties): void {
    const { subcomponents, referenceSharingExecutables, coreSubcomponentRefs } = baseSubcomponent.seedComponent;
    Object.keys(subcomponents).forEach((subcomponentName: string) => {
      const seedComponent = activeComponent.subcomponents[subcomponentName];
      seedComponent.customCss = JSONUtils.deepCopy(seedComponent.customCss);
      seedComponent.customFeatures = JSONUtils.deepCopy(seedComponent.customFeatures);
    });
    referenceSharingExecutables.forEach((executable: ReferenceSharingExecutable) => {
      executable(coreSubcomponentRefs);
    });
  }

  public static toggleSubcomponentInSync(activeComponent: WorkshopComponent, callback?: () => void): void {
    const activeSubcomponent = activeComponent.subcomponents[activeComponent.activeSubcomponentName];
    const baseSubcomponent = activeSubcomponent.baseSubcomponentRef || activeSubcomponent;
    if (baseSubcomponent.seedComponent.sync.syncedComponent) {
      SyncedComponent.dereferenceCopiedComponentCustomProperties(activeComponent, baseSubcomponent);
    }
    // WORK3: baseSubcomponent.seedComponent.inSync &&= null;
    if (baseSubcomponent.seedComponent.sync.syncedComponent) baseSubcomponent.seedComponent.sync.syncedComponent = null;
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

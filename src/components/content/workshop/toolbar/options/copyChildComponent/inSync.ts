import { SeedComponent, SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ReferenceSharingExecutable } from '../../../../../../interfaces/referenceSharingExecutable';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class InSync {
  
  private static dereferenceCopiedComponentCustomProperties(activeComponent: WorkshopComponent, baseSubcomponent: SubcomponentProperties): void {
    const { subcomponents, referenceSharingExecutables, coreSubcomponentRefs } = baseSubcomponent.seedComponent.ref;
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
    if (baseSubcomponent.seedComponent.inSync) {
      InSync.dereferenceCopiedComponentCustomProperties(activeComponent, baseSubcomponent);
    }
    // WORK3: baseSubcomponent.seedComponent.inSync &&= null;
    if (baseSubcomponent.seedComponent.inSync) baseSubcomponent.seedComponent.inSync = null;
    if (callback) callback();
  }

  private static getSeedSubcomponent(activeSubcomponent: SubcomponentProperties): SeedComponent {
    return activeSubcomponent.baseSubcomponentRef?.seedComponent || activeSubcomponent.seedComponent;
  }

  public static updateIfSubcomponentNotInSync(activeComponent: WorkshopComponent, activeSubcomponent: SubcomponentProperties): void {
    const seedComponent = InSync.getSeedSubcomponent(activeSubcomponent);
    if (seedComponent?.inSync && seedComponent.ref.componentStatus.isRemoved) {
      InSync.toggleSubcomponentInSync(activeComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    const seedComponent = InSync.getSeedSubcomponent(activeSubcomponent);
    return seedComponent?.inSync && !seedComponent.ref.componentStatus.isRemoved;
  }
}

import { NestedComponent, SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ReferenceSharingExecutable } from '../../../../../../interfaces/referenceSharingExecutable';
import JSONUtils from '../../../utils/generic/jsonUtils';

export class InSync {
  
  private static dereferenceImportedComponentCustomProperties(activeComponent: WorkshopComponent, baseSubcomponent: SubcomponentProperties): void {
    const { subcomponents, referenceSharingExecutables, coreSubcomponentNames } = baseSubcomponent.nestedComponent.ref;
    Object.keys(subcomponents).forEach((subcomponentName: string) => {
      const nestedComponent = activeComponent.subcomponents[subcomponentName];
      nestedComponent.customCss = JSONUtils.deepCopy(nestedComponent.customCss);
      nestedComponent.customFeatures = JSONUtils.deepCopy(nestedComponent.customFeatures);
    });
    referenceSharingExecutables.forEach((executable: ReferenceSharingExecutable) => {
      executable(activeComponent.subcomponents, coreSubcomponentNames);
    });
  }

  public static toggleSubcomponentInSync(activeComponent: WorkshopComponent, callback?: () => void): void {
    const activeSubcomponent = activeComponent.subcomponents[activeComponent.activeSubcomponentName];
    const baseSubcomponent = activeSubcomponent.baseSubcomponentRef || activeSubcomponent;
    if (baseSubcomponent.nestedComponent.inSync) {
      InSync.dereferenceImportedComponentCustomProperties(activeComponent, baseSubcomponent);
    }
    baseSubcomponent.nestedComponent.inSync = !baseSubcomponent.nestedComponent.inSync;
    if (callback) callback();
  }

  private static getBaseSubcomponent(activeSubcomponent: SubcomponentProperties): NestedComponent {
    return activeSubcomponent.baseSubcomponentRef?.nestedComponent || activeSubcomponent.nestedComponent;
  }

  public static updateIfSubcomponentNotInSync(activeComponent: WorkshopComponent, activeSubcomponent: SubcomponentProperties): void {
    const activeBaseSubcomponent = InSync.getBaseSubcomponent(activeSubcomponent);
    if (activeBaseSubcomponent?.inSync && activeBaseSubcomponent.ref.componentStatus.isRemoved) {
      InSync.toggleSubcomponentInSync(activeComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    const activeBaseSubcomponent = InSync.getBaseSubcomponent(activeSubcomponent);
    return activeBaseSubcomponent?.inSync && !activeBaseSubcomponent.ref.componentStatus.isRemoved;
  }
}

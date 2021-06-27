import { NestedComponent, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CustomSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import JSONManipulation from '../../../../../../services/workshop/jsonManipulation';

export class InSync {
  
  private static dereferenceImportedComponentCustomProperties(activeComponent: WorkshopComponent, baseSubcomponent: SubcomponentProperties): void {
    const { subcomponentNames, referenceSharingExecutables } = baseSubcomponent.nestedComponent.ref;
    Object.keys(subcomponentNames).forEach((subcomponentName: string) => {
      const nestedComponent = activeComponent.subcomponents[subcomponentNames[subcomponentName]];
      nestedComponent.customCss = JSONManipulation.deepCopy(nestedComponent.customCss);
      nestedComponent.customFeatures = JSONManipulation.deepCopy(nestedComponent.customFeatures);
    });
    referenceSharingExecutables.forEach((executable: (param1: Subcomponents, param2: CustomSubcomponentNames) => void) => {
      executable(activeComponent.subcomponents, subcomponentNames);
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

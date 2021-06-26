import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { CustomSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import JSONManipulation from '../../../../../../services/workshop/jsonManipulation';

export class InSync {
  
  private static dereferenceImportedComponentCustomProperties(activeComponent: WorkshopComponent, importedComponentBase: SubcomponentProperties): void {
    const { subcomponentNames, referenceSharingExecutables } = importedComponentBase.importedComponent.componentRef;
    Object.keys(subcomponentNames).forEach((subcomponentName: string) => {
      const importedComponent = activeComponent.subcomponents[subcomponentNames[subcomponentName]];
      importedComponent.customCss = JSONManipulation.deepCopy(importedComponent.customCss);
      importedComponent.customFeatures = JSONManipulation.deepCopy(importedComponent.customFeatures);
    });
    referenceSharingExecutables.forEach((executable: (param1: Subcomponents, param2: CustomSubcomponentNames) => void) => {
      executable(activeComponent.subcomponents, subcomponentNames);
    });
  }

  public static toggleSubcomponentInSync(activeComponent: WorkshopComponent, callback?: () => void): void {
    const activeSubcomponent = activeComponent.subcomponents[activeComponent.activeSubcomponentName];
    // use base subcomponent reference if the activeComponent is a child of base or activeSubcomponent if it is the base
    const importedComponentBase = activeSubcomponent.baseSubcomponentRef || activeSubcomponent;
    if (importedComponentBase.importedComponent.inSync) {
      InSync.dereferenceImportedComponentCustomProperties(activeComponent, importedComponentBase);
    }
    importedComponentBase.importedComponent.inSync = !importedComponentBase.importedComponent.inSync;
    if (callback) callback();
  }

  public static updateIfSubcomponentNotInSync(activeComponent: WorkshopComponent, activeSubcomponent: SubcomponentProperties): void {
    const activeBaseSubcomponent = activeSubcomponent.baseSubcomponentRef?.importedComponent || activeSubcomponent.importedComponent;
    if (activeBaseSubcomponent?.inSync && activeBaseSubcomponent.componentRef.componentStatus.isRemoved) {
      InSync.toggleSubcomponentInSync(activeComponent);
    }
  }

  public static isInSyncButtonDisplayed(activeSubcomponent: SubcomponentProperties): boolean {
    return (activeSubcomponent.importedComponent && !activeSubcomponent.importedComponent.componentRef.componentStatus.isRemoved
            && activeSubcomponent.importedComponent.inSync) 
        || (activeSubcomponent.baseSubcomponentRef && activeSubcomponent.baseSubcomponentRef.importedComponent
            && !activeSubcomponent.baseSubcomponentRef.importedComponent.componentRef.componentStatus.isRemoved
            && activeSubcomponent.baseSubcomponentRef.importedComponent.inSync);
  }
}

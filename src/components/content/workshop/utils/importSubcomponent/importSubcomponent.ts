import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import ImportedSubcomponentProperties from './importedSubcomponentProperties';

export default class ImportSubcomponent {

  private static moveCustomPropertiesToTempProperties(activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string): void {
    activeComponentSubcomponents[activeComponentSubcomponentName].tempCustomProperties = { 
      customCss: activeComponentSubcomponents[activeComponentSubcomponentName].customCss,
      customFeatures: activeComponentSubcomponents[activeComponentSubcomponentName].customFeatures,
    };
  }

  private static copyTargetSubcomponent(subcomponentsToBeImported: Subcomponents, subcomponentToBeImportedName: string,
      activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string): void {
    if (!activeComponentSubcomponents[activeComponentSubcomponentName].tempCustomProperties) {
      ImportSubcomponent.moveCustomPropertiesToTempProperties(activeComponentSubcomponents, activeComponentSubcomponentName);
    }
    const subcomponentToBeImportedCustomCss = subcomponentsToBeImported[subcomponentToBeImportedName].customCss;
    activeComponentSubcomponents[activeComponentSubcomponentName].customCss = subcomponentToBeImportedCustomCss;
    activeComponentSubcomponents[activeComponentSubcomponentName].customFeatures = subcomponentsToBeImported[subcomponentToBeImportedName].customFeatures;
    if (!subcomponentToBeImportedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top) {
      subcomponentToBeImportedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = ImportedSubcomponentProperties.DEFAULT_TOP_PROPERTY;
    }
  }

  public static setActiveComponentToImportedComponent(componentToBeImported: WorkshopComponent, activeComponent: WorkshopComponent): void {
    const componentToBeImportedSubcomponentNames = componentToBeImported.subcomponentNames;
    const activeComponentSubcomponentNames = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.componentRef.subcomponentNames;
    Object.keys(activeComponentSubcomponentNames).forEach((subcomponentName: string) => {
      ImportSubcomponent.copyTargetSubcomponent(componentToBeImported.subcomponents, componentToBeImportedSubcomponentNames[subcomponentName],
        activeComponent.subcomponents, activeComponentSubcomponentNames[subcomponentName]);
    });
  }

  private static setLastSelectectedSubcomponentToImport(componentToBeImported: WorkshopComponent, activeComponent: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.lastSelectectedSubcomponentToImport = componentToBeImported;
  }

  public static previewImportSubcomponent(selectedComponent: WorkshopComponent, activeComponent: WorkshopComponent): void {
    ImportSubcomponent.setActiveComponentToImportedComponent(selectedComponent, activeComponent);
    ImportSubcomponent.setLastSelectectedSubcomponentToImport(selectedComponent, activeComponent);
  }
}

import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import ImportedComponentProperties from './importedComponentProperties';

export default class ImportComponent {

  private static moveCustomPropertiesToTempProperties(activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string): void {
    activeComponentSubcomponents[activeComponentSubcomponentName].tempCustomProperties = { 
      customCss: activeComponentSubcomponents[activeComponentSubcomponentName].customCss,
      customFeatures: activeComponentSubcomponents[activeComponentSubcomponentName].customFeatures,
    };
  }

  private static copyTargetSubcomponent(subcomponentsToBeImported: Subcomponents, subcomponentToBeImportedName: string,
      activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string): void {
    if (!activeComponentSubcomponents[activeComponentSubcomponentName].tempCustomProperties) {
      ImportComponent.moveCustomPropertiesToTempProperties(activeComponentSubcomponents, activeComponentSubcomponentName);
    }
    const subcomponentToBeImportedCustomCss = subcomponentsToBeImported[subcomponentToBeImportedName].customCss;
    activeComponentSubcomponents[activeComponentSubcomponentName].customCss = subcomponentToBeImportedCustomCss;
    activeComponentSubcomponents[activeComponentSubcomponentName].customFeatures = subcomponentsToBeImported[subcomponentToBeImportedName].customFeatures;
    if (!subcomponentToBeImportedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top) {
      subcomponentToBeImportedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = ImportedComponentProperties.DEFAULT_TOP_PROPERTY;
    }
  }

  public static setActiveComponentToImportedComponent(componentToBeImported: WorkshopComponent, activeComponent: WorkshopComponent): void {
    const componentToBeImportedComponentNames = componentToBeImported.subcomponentNames;
    const activeComponentSubcomponentNames = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.componentRef.subcomponentNames;
    Object.keys(activeComponentSubcomponentNames).forEach((subcomponentName: string) => {
      ImportComponent.copyTargetSubcomponent(componentToBeImported.subcomponents, componentToBeImportedComponentNames[subcomponentName],
        activeComponent.subcomponents, activeComponentSubcomponentNames[subcomponentName]);
    });
  }

  private static setLastSelectectedSubcomponentToImport(componentToBeImported: WorkshopComponent, activeComponent: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.lastSelectectedSubcomponentToImport = componentToBeImported;
  }

  public static previewImportComponent(selectedComponent: WorkshopComponent, activeComponent: WorkshopComponent): void {
    ImportComponent.setActiveComponentToImportedComponent(selectedComponent, activeComponent);
    ImportComponent.setLastSelectectedSubcomponentToImport(selectedComponent, activeComponent);
  }
}

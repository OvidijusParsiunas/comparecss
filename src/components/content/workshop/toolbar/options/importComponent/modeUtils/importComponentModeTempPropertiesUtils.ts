import { ImportedComponentGenerator } from '../../../../utils/importedComponentGenerator/importedComponentGenerator';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';

export class ImportComponentModeTempPropertiesUtils {
  
  private static moveCustomPropertiesToTempProperties(activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string): void {
    const activeSubcomponent = activeComponentSubcomponents[activeComponentSubcomponentName];
    activeSubcomponent.tempOriginalCustomProperties = { 
      customCss: activeSubcomponent.customCss,
      customFeatures: activeSubcomponent.customFeatures,
    };
  }

  private static copyTargetSubcomponent(subcomponentsToBeImported: Subcomponents, subcomponentToBeImportedName: string,
      activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string): void {
    const activeSubcomponent = activeComponentSubcomponents[activeComponentSubcomponentName];
    if (!activeSubcomponent.tempOriginalCustomProperties) {
      ImportComponentModeTempPropertiesUtils.moveCustomPropertiesToTempProperties(activeComponentSubcomponents, activeComponentSubcomponentName);
    }
    const subcomponentToBeImportedCustomCss = subcomponentsToBeImported[subcomponentToBeImportedName].customCss;
    activeSubcomponent.customCss = subcomponentToBeImportedCustomCss;
    activeSubcomponent.customFeatures = subcomponentsToBeImported[subcomponentToBeImportedName].customFeatures;
    if (!subcomponentToBeImportedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top) {
      subcomponentToBeImportedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = ImportedComponentGenerator.DEFAULT_TOP_PROPERTY;
    }
  }

  public static setActiveComponentToImportComponent(componentToBeImported: WorkshopComponent, activeComponent: WorkshopComponent): void {
    const componentToBeImportedComponentNames = componentToBeImported.subcomponentNames;
    const activeComponentSubcomponentNames = activeComponent.subcomponents [activeComponent.activeSubcomponentName].importedComponent.componentRef.subcomponentNames;
    Object.keys(activeComponentSubcomponentNames).forEach((subcomponentName: string) => {
      ImportComponentModeTempPropertiesUtils.copyTargetSubcomponent(componentToBeImported.subcomponents, componentToBeImportedComponentNames[subcomponentName],
        activeComponent.subcomponents, activeComponentSubcomponentNames[subcomponentName]);
    });
  }

  private static moveTempPropertiesToCustomProperties(activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string): void {
    const activeSubcomponent = activeComponentSubcomponents[activeComponentSubcomponentName];
    if (activeSubcomponent.tempOriginalCustomProperties) {
      activeSubcomponent.customCss = activeSubcomponent.tempOriginalCustomProperties.customCss;
      activeSubcomponent.customFeatures = activeSubcomponent.tempOriginalCustomProperties.customFeatures;
      delete activeSubcomponent.tempOriginalCustomProperties;
    }
  }

  public static resetComponent(activeComponent: WorkshopComponent): void {
    const activeComponentSubcomponentNames = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.componentRef.subcomponentNames;
    Object.keys(activeComponentSubcomponentNames).forEach((subcomponentName: string) => {
      ImportComponentModeTempPropertiesUtils.moveTempPropertiesToCustomProperties(activeComponent.subcomponents, activeComponentSubcomponentNames[subcomponentName]);
    });
  }

  public static removeTempCustomProperties(activeComponent: WorkshopComponent): void {
    const activeComponentSubcomponentNamesObj = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.componentRef.subcomponentNames;
    const activeComponentSubcomponentNamesArr = Object.keys(activeComponentSubcomponentNamesObj);
    for (let i = 0; i < activeComponentSubcomponentNamesArr.length; i += 1) {
      // WORK1 - check if the traversal is needed
      // if already removed through moveTempPropertiesToCustomProperties, do not traverse further
      if (!activeComponent.subcomponents[activeComponentSubcomponentNamesObj[activeComponentSubcomponentNamesArr[i]]].tempOriginalCustomProperties) break;
      delete activeComponent.subcomponents[activeComponentSubcomponentNamesObj[activeComponentSubcomponentNamesArr[i]]].tempOriginalCustomProperties;
    }
  }

  public static setLastSelectectedSubcomponentToImport(componentToBeImported: WorkshopComponent, activeComponent: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.lastSelectedComponentToImport = componentToBeImported;
  }

  public static deleteLastSelectedSubcomponentToImport(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].importedComponent.lastSelectedComponentToImport;
  }
}

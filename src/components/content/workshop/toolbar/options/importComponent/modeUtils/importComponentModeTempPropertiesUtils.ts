import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ImportedComponentGenerator } from '../../../../utils/importedComponentGenerator/importedComponentGenerator';
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

  private static resetOriginalCss(activeSubcomponent: SubcomponentProperties): void {
    activeSubcomponent.customCss = activeSubcomponent.tempOriginalCustomProperties.customCss;
    activeSubcomponent.customFeatures = activeSubcomponent.tempOriginalCustomProperties.customFeatures; 
  }

  public static cleanComponent(activeComponent: WorkshopComponent, resetOriginalCss: boolean): void {
    const activeComponentSubcomponentNamesObj = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.componentRef.subcomponentNames;
    const activeComponentSubcomponentNamesArr = Object.keys(activeComponentSubcomponentNamesObj);
    for (let i = 0; i < activeComponentSubcomponentNamesArr.length; i += 1) {
      const activeSubcomponent = activeComponent.subcomponents[activeComponentSubcomponentNamesObj[activeComponentSubcomponentNamesArr[i]]];
      if (!activeSubcomponent.tempOriginalCustomProperties) break;
      if (resetOriginalCss) { ImportComponentModeTempPropertiesUtils.resetOriginalCss(activeSubcomponent); }
      delete activeSubcomponent.tempOriginalCustomProperties;
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

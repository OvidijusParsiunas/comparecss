import { SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ImportedComponentGenerator } from '../../../../utils/importComponent/importedComponentGenerator';
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
    const activeComponentSubcomponentNames = activeComponent.subcomponents[activeComponent.activeSubcomponentName].nestedComponent.ref.subcomponentNames;
    Object.keys(activeComponentSubcomponentNames).forEach((subcomponentName: string) => {
      ImportComponentModeTempPropertiesUtils.copyTargetSubcomponent(componentToBeImported.subcomponents, componentToBeImportedComponentNames[subcomponentName],
        activeComponent.subcomponents, activeComponentSubcomponentNames[subcomponentName]);
    });
  }

  private static resetOriginalCss(subcomponentProperties: SubcomponentProperties): void {
    subcomponentProperties.customCss = subcomponentProperties.tempOriginalCustomProperties.customCss;
    subcomponentProperties.customFeatures = subcomponentProperties.tempOriginalCustomProperties.customFeatures; 
  }

  public static cleanComponent(activeComponent: WorkshopComponent, resetOriginalProperties: boolean): void {
    const activeComponentSubcomponentNamesObj = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].nestedComponent.ref.subcomponentNames;
    const activeComponentSubcomponentNamesArr = Object.keys(activeComponentSubcomponentNamesObj);
    for (let i = 0; i < activeComponentSubcomponentNamesArr.length; i += 1) {
      const activeSubcomponent = activeComponent.subcomponents[activeComponentSubcomponentNamesObj[activeComponentSubcomponentNamesArr[i]]];
      if (!activeSubcomponent.tempOriginalCustomProperties) break;
      if (resetOriginalProperties) { ImportComponentModeTempPropertiesUtils.resetOriginalCss(activeSubcomponent); }
      delete activeSubcomponent.tempOriginalCustomProperties;
    }
    if (resetOriginalProperties) {
      ImportComponentModeTempPropertiesUtils.removeImportedComponentIfCurrentRemoved(activeComponent);
    }
  }

  public static setLastSelectectedSubcomponentToImport(componentToBeImported: WorkshopComponent, activeComponent: WorkshopComponent): void {
    activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].nestedComponent.lastSelectedComponentToImport = componentToBeImported;
  }

  public static deleteLastSelectedSubcomponentToImport(activeComponent: WorkshopComponent): void {
    delete activeComponent.subcomponents[activeComponent.activeSubcomponentName].nestedComponent.lastSelectedComponentToImport;
  }

  public static displayImportedComponentIfCurrentRemoved(activeSubcomponent: WorkshopComponent): void {
    const { subcomponentDisplayStatus } = activeSubcomponent.subcomponents[activeSubcomponent.activeSubcomponentName]
      .nestedComponent.ref.componentPreviewStructure.baseSubcomponentProperties;
    if (!subcomponentDisplayStatus.isDisplayed) { subcomponentDisplayStatus.isDisplayedTemporarily = true; }
  }

  public static removeImportedComponentIfCurrentRemoved(activeSubcomponent: WorkshopComponent): void {
    const { subcomponentDisplayStatus } = activeSubcomponent.subcomponents[activeSubcomponent.activeSubcomponentName]
      .nestedComponent.ref.componentPreviewStructure.baseSubcomponentProperties;
    if (!subcomponentDisplayStatus.isDisplayed && subcomponentDisplayStatus.isDisplayedTemporarily) {
      subcomponentDisplayStatus.isDisplayedTemporarily = false;
    }
  }

  public static switchTempPropertiesWithTheLastSelectedSubcomponent(activeComponent: WorkshopComponent): void {
    const activeComponentSubcomponentNamesObj = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].nestedComponent.ref.subcomponentNames;
    const activeComponentSubcomponentNamesArr = Object.keys(activeComponentSubcomponentNamesObj);
    for (let i = 0; i < activeComponentSubcomponentNamesArr.length; i += 1) {
      const activeSubcomponent = activeComponent.subcomponents[activeComponentSubcomponentNamesObj[activeComponentSubcomponentNamesArr[i]]];
      if (!activeSubcomponent.tempOriginalCustomProperties) break;
      const tempCustomCss = activeSubcomponent.customCss;
      const tempCustomfeatures = activeSubcomponent.customFeatures;
      activeSubcomponent.customCss = activeSubcomponent.tempOriginalCustomProperties.customCss;
      activeSubcomponent.customFeatures = activeSubcomponent.tempOriginalCustomProperties.customFeatures;
      activeSubcomponent.tempOriginalCustomProperties.customCss = tempCustomCss;
      activeSubcomponent.tempOriginalCustomProperties.customFeatures = tempCustomfeatures;
    }
  }

  public static removeTempProperties(activeComponent: WorkshopComponent): void {
    const activeComponentSubcomponentNamesObj = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].nestedComponent.ref.subcomponentNames;
    const activeComponentSubcomponentNamesArr = Object.keys(activeComponentSubcomponentNamesObj);
    for (let i = 0; i < activeComponentSubcomponentNamesArr.length; i += 1) {
      const activeSubcomponent = activeComponent.subcomponents[activeComponentSubcomponentNamesObj[activeComponentSubcomponentNamesArr[i]]];
      if (!activeSubcomponent.tempOriginalCustomProperties) break;
      delete activeSubcomponent.tempOriginalCustomProperties;
    }
  }
}

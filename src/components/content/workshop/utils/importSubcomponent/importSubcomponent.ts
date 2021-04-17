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

  private static copyTargetSubcomponent(activeComponentSubcomponents: Subcomponents, activeComponentSubcomponentName: string,
      targetSubcomponents: Subcomponents, targetSubcomponentName: string): void {
    if (!activeComponentSubcomponents[activeComponentSubcomponentName].tempCustomProperties) {
      ImportSubcomponent.moveCustomPropertiesToTempProperties(activeComponentSubcomponents, activeComponentSubcomponentName);
    }
    const selectedComponentCustomCss = targetSubcomponents[targetSubcomponentName].customCss;
    activeComponentSubcomponents[activeComponentSubcomponentName].customCss = selectedComponentCustomCss;
    activeComponentSubcomponents[activeComponentSubcomponentName].customFeatures = targetSubcomponents[targetSubcomponentName].customFeatures;
    if (!selectedComponentCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top) {
      selectedComponentCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = ImportedSubcomponentProperties.DEFAULT_TOP_PROPERTY;
    }
  }

  public static previewImportSubcomponent(selectedComponent: WorkshopComponent, activeComponent: WorkshopComponent): void {
    const selectedComponentSubcomponentNames = selectedComponent.subcomponentNames;
    const activeComponentSubcomponentNames = activeComponent.subcomponents
      [activeComponent.activeSubcomponentName].importedComponent.subcomponentNames;
    Object.keys(activeComponentSubcomponentNames).forEach((subcomponentName: string) => {
      ImportSubcomponent.copyTargetSubcomponent(activeComponent.subcomponents, activeComponentSubcomponentNames[subcomponentName],
        selectedComponent.subcomponents, selectedComponentSubcomponentNames[subcomponentName]);
    });
  }
}

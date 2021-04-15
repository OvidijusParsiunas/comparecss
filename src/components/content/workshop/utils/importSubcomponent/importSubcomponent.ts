import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import ImportedSubcomponentProperties from './importedSubcomponentProperties';

export default class ImportSubcomponent {

  private static copySubcomonent(currentComponents: Subcomponents, currentSubcomponentName: string,
      targetSubcomponents: Subcomponents, targetSubcomponentName: string): void {
    const selectedComponentCustomCss = targetSubcomponents[targetSubcomponentName].customCss;
    currentComponents[currentSubcomponentName].customCss = selectedComponentCustomCss;
    currentComponents[currentSubcomponentName].customFeatures = targetSubcomponents[targetSubcomponentName].customFeatures;
    if (!selectedComponentCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top) {
      selectedComponentCustomCss[CSS_PSEUDO_CLASSES.DEFAULT].top = ImportedSubcomponentProperties.DEFAULT_TOP_PROPERTY;
    }
  }

  public static previewImportSubcomponent(selectedComponent: WorkshopComponent, currentlyActiveComponent: WorkshopComponent): void {
    const selectedComponentSubcomponentNames = selectedComponent.subcomponentNames;
    const currentComponentSubcomponentNames = currentlyActiveComponent.subcomponents
      [currentlyActiveComponent.activeSubcomponentName].importedComponent.subcomponentNames;
    Object.keys(currentComponentSubcomponentNames).forEach((subcomponentName: string) => {
      ImportSubcomponent.copySubcomonent(currentlyActiveComponent.subcomponents, currentComponentSubcomponentNames[subcomponentName],
        selectedComponent.subcomponents, selectedComponentSubcomponentNames[subcomponentName]);
    });
  }
}

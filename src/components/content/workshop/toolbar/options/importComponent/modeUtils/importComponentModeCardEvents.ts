import { ImportComponentModeTempPropertiesUtils } from './importComponentModeTempPropertiesUtils';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

export class ImportComponentModeCardEvents {

  public static mouseClick(workshopComponent: ComponentOptions, componentToBeImported: WorkshopComponent): void {
    ImportComponentModeTempPropertiesUtils.setActiveComponentToImportComponent(componentToBeImported, workshopComponent.currentlySelectedComponent);
    ImportComponentModeTempPropertiesUtils.setLastSelectectedSubcomponentToImport(componentToBeImported, workshopComponent.currentlySelectedComponent);
    workshopComponent.currentlySelectedImportComponent = componentToBeImported;
  }

  public static mouseEnter(workshopComponent: ComponentOptions, componentToBeImported: WorkshopComponent): void {
    // the condition is a bug fix as when the import component mode is toggled on, during the component list animation the user can hover over a modal card
    if (workshopComponent.currentlySelectedComponent.subcomponents[workshopComponent.currentlySelectedComponent.activeSubcomponentName]
      .importedComponent.componentRef.type !== componentToBeImported.type) return;
    ImportComponentModeTempPropertiesUtils.setActiveComponentToImportComponent(componentToBeImported, workshopComponent.currentlySelectedComponent);
    workshopComponent.currentlyHoveredImportComponent = componentToBeImported;
  }
  
  public static mouseLeave(workshopComponent: ComponentOptions): void {
    const { currentlySelectedImportComponent, currentlySelectedComponent } = workshopComponent;
    if (currentlySelectedImportComponent) {
      ImportComponentModeTempPropertiesUtils.setActiveComponentToImportComponent(currentlySelectedImportComponent, currentlySelectedComponent);
    } else {
      ImportComponentModeTempPropertiesUtils.cleanComponent(currentlySelectedComponent, true);
    }
  }
}

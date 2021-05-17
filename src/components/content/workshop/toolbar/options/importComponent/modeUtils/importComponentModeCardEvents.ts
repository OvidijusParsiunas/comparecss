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
    ImportComponentModeTempPropertiesUtils.setActiveComponentToImportComponent(componentToBeImported, workshopComponent.currentlySelectedComponent);
    workshopComponent.currentlyHoveredImportComponent = componentToBeImported;
  }
  
  public static mouseLeave(workshopComponent: ComponentOptions): void {
    const { currentlySelectedImportComponent, currentlySelectedComponent } = workshopComponent;
    if (currentlySelectedImportComponent) {
      ImportComponentModeTempPropertiesUtils.setActiveComponentToImportComponent(currentlySelectedImportComponent, currentlySelectedComponent);
    } else {
      ImportComponentModeTempPropertiesUtils.resetComponent(currentlySelectedComponent);
    }
    ImportComponentModeTempPropertiesUtils.removeTempCustomProperties(currentlySelectedComponent); 
  }
}

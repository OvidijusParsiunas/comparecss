import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';

export class MultiBaseComponentUtils {
  
  public static addAuxiliarySubcomponentDetails(parentComponent: WorkshopComponent, auxiliaryComponent: WorkshopComponent): void {
    parentComponent.subcomponents = { ...parentComponent.subcomponents, ...auxiliaryComponent.subcomponents };
    const auxiliaryBaseName = Object.keys(auxiliaryComponent.componentPreviewStructure.subcomponentDropdownStructure)[0];
    // updated through key value in order to not overwrite directly and allow the subcomponent dropdown to update
    parentComponent.componentPreviewStructure.subcomponentDropdownStructure[auxiliaryBaseName] = {
      ...auxiliaryComponent.componentPreviewStructure.subcomponentDropdownStructure[auxiliaryBaseName],
    };
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName = {
      ...parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName,
      ...auxiliaryComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName,
    };
  }

  public static getCurrentlyActiveBaseComponent(parentComponent: WorkshopComponent): WorkshopComponent {
    return parentComponent.auxiliaryComponent?.coreSubcomponentNames.base === parentComponent.activeSubcomponentName
      ? parentComponent.auxiliaryComponent : parentComponent;
  }
}

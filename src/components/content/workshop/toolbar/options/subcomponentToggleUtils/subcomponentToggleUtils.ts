import { Imported, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { CustomSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import { ENTITY_DISPLAY_STATUS_REF } from '../../../../../../interfaces/entityDisplayStatus';
import JSONManipulation from '../../../../../../services/workshop/jsonManipulation';

export default class SubcomponentToggleUtils {

  private static resetSubcomponentProperties(activeSubcomponent: SubcomponentProperties): void {
    activeSubcomponent.customCss = JSONManipulation.deepCopy(activeSubcomponent.defaultCss);
    activeSubcomponent.customFeatures = JSONManipulation.deepCopy(activeSubcomponent.defaultCustomFeatures);
  }

  private static resetImportedSubcomponent(importedSubcomponent: Imported, activeComponent: WorkshopComponent): void {
    const { subcomponentNames, referenceSharingExecutables } = importedSubcomponent.componentRef;
    Object.keys(subcomponentNames).forEach((subcomponentName: string) => {
      const importedSubcomponent = activeComponent.subcomponents[subcomponentNames[subcomponentName]];
      SubcomponentToggleUtils.resetSubcomponentProperties(importedSubcomponent);
    });
    referenceSharingExecutables.forEach((executable: (param1: Subcomponents, param2: CustomSubcomponentNames) => void) => {
      executable(activeComponent.subcomponents, subcomponentNames);
    });
    // the timeout is used to allow the options buttons to disappear before inSync button removal animation begins
    setTimeout(() => {
      importedSubcomponent.inSync = false;
      importedSubcomponent.componentRef.componentStatus = { isRemoved: true };
    });
  }

  private static resetSubcomponent(activeSubcomponent: SubcomponentProperties, activeComponent: WorkshopComponent): void {
    if (activeSubcomponent.importedComponent) {
      SubcomponentToggleUtils.resetImportedSubcomponent(activeSubcomponent.importedComponent, activeComponent);
    } else {
      SubcomponentToggleUtils.resetSubcomponentProperties(activeSubcomponent);
    }
  }

  private static resetChildSubcomponents(subcomponentDropdownStructure: NestedDropdownStructure, component: WorkshopComponent): void {
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      if (subcomponentName === ENTITY_DISPLAY_STATUS_REF) return;
      SubcomponentToggleUtils.resetSubcomponent(component.subcomponents[subcomponentName], component);
      if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length > 0 && !component.subcomponents[subcomponentName].importedComponent) {
        SubcomponentToggleUtils.resetChildSubcomponents(subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure, component);
      }
    }
  }

  private static findAndResetAllChildSubcomponents(activeSubcomponentName: string, subcomponentDropdownStructure: NestedDropdownStructure,
      component: WorkshopComponent): void {
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      if (activeSubcomponentName === subcomponentName) {
        SubcomponentToggleUtils.resetChildSubcomponents(subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure, component);
        break;
      } else if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length > 0) {
        SubcomponentToggleUtils.findAndResetAllChildSubcomponents(activeSubcomponentName,
          subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure, component);
      }
    }
  }

  public static removeSubcomponent(component: WorkshopComponent, hideSettingsCallback: () => void): void {
    const activeSubcomponent = component.subcomponents[component.activeSubcomponentName];
    if (activeSubcomponent.layerSectionsType) {
      SubcomponentToggleUtils.findAndResetAllChildSubcomponents(component.activeSubcomponentName,
        component.componentPreviewStructure.subcomponentDropdownStructure, component);
    }
    SubcomponentToggleUtils.resetSubcomponent(activeSubcomponent, component);
    activeSubcomponent.subcomponentDisplayStatus.isDisplayed = false;
    hideSettingsCallback();
  }
}

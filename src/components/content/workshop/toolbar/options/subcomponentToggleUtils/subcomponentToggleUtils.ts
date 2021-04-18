import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { ENTITY_DISPLAY_STATUS_REF } from '../../../../../../interfaces/entityDisplayStatus';
import JSONManipulation from '../../../../../../services/workshop/jsonManipulation';

export default class SubcomponentToggleUtils {

  private static resetSubcomponent(activeSubcomponent: SubcomponentProperties): void {
    activeSubcomponent.customCss = JSONManipulation.deepCopy(activeSubcomponent.defaultCss);
    activeSubcomponent.customFeatures = JSONManipulation.deepCopy(activeSubcomponent.defaultCustomFeatures);
  }

  private static resetChildSubcomponents(subcomponentDropdownStructure: NestedDropdownStructure, component: WorkshopComponent): void {
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      if (subcomponentName === ENTITY_DISPLAY_STATUS_REF) return;
      SubcomponentToggleUtils.resetSubcomponent(component.subcomponents[subcomponentName]);
      if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length > 0) {
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
    SubcomponentToggleUtils.resetSubcomponent(activeSubcomponent);
    activeSubcomponent.subcomponentDisplayStatus.isDisplayed = false;
    if (activeSubcomponent.importedComponent) { activeSubcomponent.importedComponent.componentRef.componentStatus = { isRemoved: true }; }
    hideSettingsCallback();
  }
}

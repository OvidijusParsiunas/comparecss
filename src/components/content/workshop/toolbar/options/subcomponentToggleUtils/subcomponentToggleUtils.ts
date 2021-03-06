import { ImportedComponent, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import ComponentTraversalUtils from '../../../utils/componentTraversal/componentTraversalUtils';
import { CustomSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import JSONManipulation from '../../../../../../services/workshop/jsonManipulation';

export default class SubcomponentToggleUtils {

  private static resetSubcomponentProperties(activeSubcomponent: SubcomponentProperties): void {
    activeSubcomponent.customCss = JSONManipulation.deepCopy(activeSubcomponent.defaultCss);
    activeSubcomponent.customFeatures = JSONManipulation.deepCopy(activeSubcomponent.defaultCustomFeatures);
  }

  private static resetImportedComponent(importedComponent: ImportedComponent, activeComponent: WorkshopComponent): void {
    const { subcomponentNames, referenceSharingExecutables } = importedComponent.componentRef;
    Object.keys(subcomponentNames).forEach((subcomponentName: string) => {
      const importedComponent = activeComponent.subcomponents[subcomponentNames[subcomponentName]];
      SubcomponentToggleUtils.resetSubcomponentProperties(importedComponent);
    });
    referenceSharingExecutables.forEach((executable: (param1: Subcomponents, param2: CustomSubcomponentNames) => void) => {
      executable(activeComponent.subcomponents, subcomponentNames);
    });
    // the timeout is used to allow the options buttons to disappear before inSync button removal animation begins
    setTimeout(() => {
      importedComponent.inSync = false;
      importedComponent.componentRef.componentStatus = { isRemoved: true };
    });
  }

  private static resetSubcomponent(activeSubcomponentName: string, activeComponent: WorkshopComponent): void {
    const activeSubcomponent = activeComponent.subcomponents[activeSubcomponentName];
    if (activeSubcomponent.importedComponent) {
      SubcomponentToggleUtils.resetImportedComponent(activeSubcomponent.importedComponent, activeComponent);
    } else {
      SubcomponentToggleUtils.resetSubcomponentProperties(activeSubcomponent);
    }
  }

  public static removeSubcomponent(component: WorkshopComponent, hideSettingsCallback: () => void): void {
    const activeSubcomponent = component.subcomponents[component.activeSubcomponentName];
    if (activeSubcomponent.layerSectionsType) {
      const resetSubcomponentCallback = SubcomponentToggleUtils.resetSubcomponent;
      ComponentTraversalUtils.traverseSubcomponentsUsingDropdownStructureStaringWithParticularChild(component.activeSubcomponentName,
        component.componentPreviewStructure.subcomponentDropdownStructure, component, resetSubcomponentCallback);
    }
    SubcomponentToggleUtils.resetSubcomponent(component.activeSubcomponentName, component);
    activeSubcomponent.subcomponentDisplayStatus.isDisplayed = false;
    hideSettingsCallback();
  }
}

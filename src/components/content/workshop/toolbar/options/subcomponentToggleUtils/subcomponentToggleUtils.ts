import { NestedComponent, SubcomponentProperties, Subcomponents, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import ComponentTraversalUtils from '../../../utils/componentTraversal/componentTraversalUtils';
import { CoreSubcomponentNames } from '../../../../../../interfaces/customSubcomponentNames';
import JSONManipulation from '../../../../../../services/workshop/jsonManipulation';

export default class SubcomponentToggleUtils {

  private static resetSubcomponentProperties(activeSubcomponent: SubcomponentProperties): void {
    activeSubcomponent.customCss = JSONManipulation.deepCopy(activeSubcomponent.defaultCss);
    activeSubcomponent.customFeatures = JSONManipulation.deepCopy(activeSubcomponent.defaultCustomFeatures);
  }

  private static resetNestedComponent(nestedComponent: NestedComponent, activeComponent: WorkshopComponent): void {
    const { coreSubcomponentNames, referenceSharingExecutables } = nestedComponent.ref;
    Object.keys(coreSubcomponentNames).forEach((subcomponentName: string) => {
      const nestedComponent = activeComponent.subcomponents[coreSubcomponentNames[subcomponentName]];
      SubcomponentToggleUtils.resetSubcomponentProperties(nestedComponent);
    });
    referenceSharingExecutables.forEach((executable: (param1: Subcomponents, param2: CoreSubcomponentNames) => void) => {
      executable(activeComponent.subcomponents, coreSubcomponentNames);
    });
    // the timeout is used to allow the options buttons to disappear before inSync button removal animation begins
    setTimeout(() => {
      nestedComponent.inSync = false;
      nestedComponent.ref.componentStatus = { isRemoved: true };
    });
  }

  private static resetSubcomponent(activeSubcomponentName: string, activeComponent: WorkshopComponent): void {
    const activeSubcomponent = activeComponent.subcomponents[activeSubcomponentName];
    if (activeSubcomponent.nestedComponent) {
      SubcomponentToggleUtils.resetNestedComponent(activeSubcomponent.nestedComponent, activeComponent);
    } else {
      SubcomponentToggleUtils.resetSubcomponentProperties(activeSubcomponent);
    }
  }

  // WORK1: will need some refactoring
  public static removeSubcomponent(component: WorkshopComponent, hideSettingsCallback: () => void): void {
    const activeSubcomponent = component.subcomponents[component.activeSubcomponentName];
    if (activeSubcomponent.layerSectionsType) {
      const resetSubcomponentCallback = SubcomponentToggleUtils.resetSubcomponent;
      ComponentTraversalUtils.traverseSubcomponentsUsingDropdownStructureStartingWithParticularChild(component.activeSubcomponentName,
        component.componentPreviewStructure.subcomponentDropdownStructure, component, resetSubcomponentCallback);
    }
    SubcomponentToggleUtils.resetSubcomponent(component.activeSubcomponentName, component);
    activeSubcomponent.subcomponentDisplayStatus.isDisplayed = false;
    hideSettingsCallback();
  }
}

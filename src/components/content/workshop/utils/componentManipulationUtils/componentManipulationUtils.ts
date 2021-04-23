import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../consts/coreSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import JSONManipulation from '../../../../../services/workshop/jsonManipulation';
import ImportSubcomponent from '../importSubcomponent/importSubcomponent';
import ComponentJs from '../../../../../services/workshop/componentJs';
import ProcessClassName from '../componentGenerator/processClassName';
import { ComponentOptions } from 'vue';

export default class ComponentManipulationUtils {

  private static resetComponentModes(previousComponent: WorkshopComponent): void {
    if (!previousComponent) return;
    previousComponent.activeSubcomponentName = previousComponent.defaultSubcomponentName;
    Object.keys(previousComponent.subcomponents).forEach((key) => {
      const subcomponent: SubcomponentProperties = previousComponent.subcomponents[key];
      subcomponent.activeCssPseudoClass = subcomponent.defaultCssPseudoClass;
    });
  }

  private static switchActiveComponent(optionsComponent: ComponentOptions, newComponent: WorkshopComponent): void {
    ComponentManipulationUtils.resetComponentModes(optionsComponent.currentlySelectedComponent);
    if (optionsComponent.currentlySelectedComponent && optionsComponent.currentlySelectedComponent.type !== newComponent.type) {
      ComponentJs.manipulateJS(optionsComponent.currentlySelectedComponent.type, 'revokeJS');
    }
    optionsComponent.currentlySelectedComponent = newComponent;
    ComponentJs.manipulateJS(optionsComponent.currentlySelectedComponent.type, 'executeJS');
    optionsComponent.$refs.toolbar.updateToolbarForNewComponent();
  }
  
  public static addNewComponent(optionsComponent: ComponentOptions, newComponent: WorkshopComponent): void {
    (optionsComponent.components as undefined as WorkshopComponent[]).push(newComponent);
    ComponentManipulationUtils.switchActiveComponent(optionsComponent, newComponent);
  }

  public static copyComponent(optionsComponent: ComponentOptions, selectComponentCard: WorkshopComponent): void {
    const newComponent = JSONManipulation.deepCopy(selectComponentCard);
    newComponent.className = ProcessClassName.addPostfixIfClassNameTaken(newComponent.className,
      (optionsComponent.components as undefined as WorkshopComponent[]), '-copy');
    newComponent.activeSubcomponentName = CORE_SUBCOMPONENTS_NAMES.BASE;
    newComponent.subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE].activeCssPseudoClass = CSS_PSEUDO_CLASSES.DEFAULT;
    ComponentManipulationUtils.addNewComponent(optionsComponent, newComponent);
  }

  public static selectComponent(optionsComponent: ComponentOptions, selectedComponent: WorkshopComponent): void {
    if (optionsComponent.isImportSubcomponentModeActive) {
      ImportSubcomponent.previewImportSubcomponent(selectedComponent, optionsComponent.currentlySelectedComponent);
      optionsComponent.currentlySelectedImportComponent = selectedComponent;
    } else if (optionsComponent.currentlySelectedComponent !== selectedComponent) {
      ComponentManipulationUtils.switchActiveComponent(optionsComponent, selectedComponent);
    }
  }

  private static selectNextComponentAfterRemoving(optionsComponent: ComponentOptions, removedComponentIndex: number): void {
    const components = (optionsComponent.components as undefined as WorkshopComponent[]);
    const nextComponentIndex = removedComponentIndex === components.length ? removedComponentIndex - 1 : removedComponentIndex
    ComponentManipulationUtils.switchActiveComponent(optionsComponent, components[nextComponentIndex]);
  }

  private static removeComponentCallback(optionsComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): number {
    // the modal does not have a reference to the selected component card but we can be sure that currentlySelectedComponent is the one being removed,
    // however, when the don't show again checkbox is ticked and the user clicks on remove without selecting a modal, need to have its reference
    // passed in through the componentToBeRemovedWithoutSelecting argument
    const componentToBeRemoved: WorkshopComponent = componentToBeRemovedWithoutSelecting || optionsComponent.currentlySelectedComponent;
    const componentMatch = (component: WorkshopComponent) => componentToBeRemoved === component;
    const components = (optionsComponent.components as undefined as WorkshopComponent[]);
    const componentToBeRemovedIndex = components.findIndex(componentMatch);
    components.splice(componentToBeRemovedIndex, 1);
    componentToBeRemoved.componentStatus.isRemoved = true;
    if (components.length === 0) {
      optionsComponent.$refs.toolbar.saveLastActiveOptionPriorToAllComponentsDeletion();
      optionsComponent.componentPreviewAssistance.margin = false;
      ComponentJs.manipulateJS(componentToBeRemoved.type, 'revokeJS');
      optionsComponent.currentlySelectedComponent = undefined;
      return -1;
    }
    return componentToBeRemovedIndex;
  }

  public static removeComponent(optionsComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): void {
    // only switch after using the removal modal (componentToBeRemovedWithoutSelecting is undefined)
    // or not using the modal but directly removing the component that is currently selected
    if (!componentToBeRemovedWithoutSelecting || componentToBeRemovedWithoutSelecting === optionsComponent.currentlySelectedComponent) {
      const componentToBeRemovedIndex = ComponentManipulationUtils.removeComponentCallback(optionsComponent, componentToBeRemovedWithoutSelecting);
      if (componentToBeRemovedIndex > -1) ComponentManipulationUtils.selectNextComponentAfterRemoving(optionsComponent, componentToBeRemovedIndex);
    } else {
      optionsComponent.$refs.toolbar.$refs.options.temporarilyAllowOptionAnimations(
      ComponentManipulationUtils.removeComponentCallback.bind(this, optionsComponent, componentToBeRemovedWithoutSelecting), true, true);
    }
  }
}

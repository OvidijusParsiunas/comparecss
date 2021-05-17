import { ImportComponentModeCardEvents } from '../../toolbar/options/importComponent/modeUtils/importComponentModeCardEvents';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import ComponentJs from '../../../../../services/workshop/componentJs';
import CopyComponentUtils from './copyComponentUtils';
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

  private static switchActiveComponent(workshopComponent: ComponentOptions, newComponent: WorkshopComponent): void {
    ComponentManipulationUtils.resetComponentModes(workshopComponent.currentlySelectedComponent);
    if (workshopComponent.currentlySelectedComponent && workshopComponent.currentlySelectedComponent.type !== newComponent.type) {
      ComponentJs.manipulateJS(workshopComponent.currentlySelectedComponent.type, 'revokeJS');
    }
    workshopComponent.currentlySelectedComponent = newComponent;
    ComponentJs.manipulateJS(workshopComponent.currentlySelectedComponent.type, 'executeJS');
    workshopComponent.$refs.toolbar.updateToolbarForNewComponent();
  }

  public static addNewComponent(workshopComponent: ComponentOptions, newComponent: WorkshopComponent): void {
    (workshopComponent.components as undefined as WorkshopComponent[]).push(newComponent);
    ComponentManipulationUtils.switchActiveComponent(workshopComponent, newComponent);
  }

  public static copyComponent(workshopComponent: ComponentOptions, selectComponentCard: WorkshopComponent): void {
    const newComponent = CopyComponentUtils.copyComponent(workshopComponent, selectComponentCard);
    ComponentManipulationUtils.addNewComponent(workshopComponent, newComponent);
  }

  public static selectComponent(workshopComponent: ComponentOptions, selectedComponent: WorkshopComponent): void {
    if (workshopComponent.isImportComponentModeActive) {
      ImportComponentModeCardEvents.mouseClick(workshopComponent, selectedComponent);
    } else if (workshopComponent.currentlySelectedComponent !== selectedComponent) {
      ComponentManipulationUtils.switchActiveComponent(workshopComponent, selectedComponent);
    }
  }

  public static hoverComponentCard(workshopComponent: ComponentOptions, selectedComponent: WorkshopComponent, isMouseEnter: boolean): void {
    if (workshopComponent.isImportComponentModeActive) {
      if (isMouseEnter) {
        ImportComponentModeCardEvents.mouseEnter(workshopComponent, selectedComponent);
      } else {
        ImportComponentModeCardEvents.mouseLeave(workshopComponent);
      }
    }
  }

  private static selectNextComponentAfterRemoving(workshopComponent: ComponentOptions, removedComponentIndex: number): void {
    const components = (workshopComponent.components as undefined as WorkshopComponent[]);
    const nextComponentIndex = removedComponentIndex === components.length ? removedComponentIndex - 1 : removedComponentIndex;
    ComponentManipulationUtils.switchActiveComponent(workshopComponent, components[nextComponentIndex]);
  }

  private static removeComponentCallback(workshopComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): number {
    // the modal does not have a reference to the selected component card but we can be sure that currentlySelectedComponent is the one being removed,
    // however, when the don't show again checkbox is ticked and the user clicks on remove without selecting a modal, need to have its reference
    // passed in through the componentToBeRemovedWithoutSelecting argument
    const componentToBeRemoved: WorkshopComponent = componentToBeRemovedWithoutSelecting || workshopComponent.currentlySelectedComponent;
    const componentMatch = (component: WorkshopComponent) => componentToBeRemoved === component;
    const components = (workshopComponent.components as undefined as WorkshopComponent[]);
    const componentToBeRemovedIndex = components.findIndex(componentMatch);
    components.splice(componentToBeRemovedIndex, 1);
    componentToBeRemoved.componentStatus.isRemoved = true;
    if (components.length === 0) {
      workshopComponent.$refs.toolbar.saveLastActiveOptionPriorToAllComponentsDeletion();
      workshopComponent.componentPreviewAssistance.margin = false;
      ComponentJs.manipulateJS(componentToBeRemoved.type, 'revokeJS');
      workshopComponent.currentlySelectedComponent = undefined;
      return -1;
    }
    return componentToBeRemovedIndex;
  }

  public static removeComponent(workshopComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): void {
    // only switch after using the removal modal (componentToBeRemovedWithoutSelecting is undefined)
    // or not using the modal but directly removing the component that is currently selected
    if (!componentToBeRemovedWithoutSelecting || componentToBeRemovedWithoutSelecting === workshopComponent.currentlySelectedComponent) {
      const componentToBeRemovedIndex = ComponentManipulationUtils.removeComponentCallback(workshopComponent, componentToBeRemovedWithoutSelecting);
      if (componentToBeRemovedIndex > -1) ComponentManipulationUtils.selectNextComponentAfterRemoving(workshopComponent, componentToBeRemovedIndex);
    } else {
      workshopComponent.$refs.toolbar.$refs.options.temporarilyAllowOptionAnimations(
      ComponentManipulationUtils.removeComponentCallback.bind(this, workshopComponent, componentToBeRemovedWithoutSelecting), true, true);
    }
  }
}

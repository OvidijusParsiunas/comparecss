import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SetActiveComponentUtils } from '../utils/setActiveComponentUtils';
import ComponentJs from '../../generic/componentJs';
import { ComponentOptions } from 'vue';

export class RemoveComponent {

  private static selectNextComponentAfterRemoving(workshopComponent: ComponentOptions, removedComponentIndex: number): void {
    const components = (workshopComponent.components as undefined as WorkshopComponent[]);
    const nextComponentIndex = removedComponentIndex === components.length ? removedComponentIndex - 1 : removedComponentIndex;
    SetActiveComponentUtils.switchActiveComponent(workshopComponent, components[nextComponentIndex]);
  }

  private static removeInSync(componentToBeRemoved: WorkshopComponent): void {
    // WORK 2 - potentially can use componentsSyncedToThis to remove sync properties
    // used to allow components that have copied this to remove insync properties when they are opened up
    componentToBeRemoved.componentStatus.isRemoved = true;
    // remove all synced component references
    Object.keys(componentToBeRemoved.subcomponents).forEach((subcomponentName) => {
      const subcomponent = componentToBeRemoved.subcomponents[subcomponentName];
      if (subcomponent.seedComponent.sync.componentThisIsSyncedTo) {
        subcomponent.seedComponent.sync.componentThisIsSyncedTo.sync.componentsSyncedToThis.delete(subcomponent.seedComponent);
        subcomponent.seedComponent.sync.componentThisIsSyncedTo = null;
      }
    });
  }

  private static removeComponentCallback(workshopComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): number {
    // the modal does not have a reference to the selected component card but we can be sure that currentlySelectedComponent is the one being removed,
    // however, when the don't show again checkbox is ticked and the user clicks on remove without selecting a modal, need to have its reference
    // passed in through the componentToBeRemovedWithoutSelecting argument
    const componentToBeRemoved: WorkshopComponent = componentToBeRemovedWithoutSelecting || workshopComponent.currentlySelectedComponent;
    const componentMatch = (component: WorkshopComponent) => componentToBeRemoved === component;
    const components = workshopComponent.components as undefined as WorkshopComponent[];
    const componentToBeRemovedIndex = components.findIndex(componentMatch);
    components.splice(componentToBeRemovedIndex, 1);
    RemoveComponent.removeInSync(componentToBeRemoved);
    if (components.length === 0) {
      workshopComponent.$refs.toolbar.saveLastActiveOptionPriorToAllComponentsDeletion();
      workshopComponent.componentPreviewAssistance.margin = false;
      ComponentJs.manipulateJSClasses(componentToBeRemoved.type, 'revokeJS');
      workshopComponent.currentlySelectedComponent = undefined;
      return -1;
    }
    return componentToBeRemovedIndex;
  }

  public static remove(workshopComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): void {
    // only switch after using the removal modal (componentToBeRemovedWithoutSelecting is undefined)
    // or not using the modal but directly removing the component that is currently selected
    if (!componentToBeRemovedWithoutSelecting || componentToBeRemovedWithoutSelecting === workshopComponent.currentlySelectedComponent) {
      const componentToBeRemovedIndex = RemoveComponent.removeComponentCallback(workshopComponent, componentToBeRemovedWithoutSelecting);
      if (componentToBeRemovedIndex > -1) RemoveComponent.selectNextComponentAfterRemoving(workshopComponent, componentToBeRemovedIndex);
    } else {
      workshopComponent.$refs.toolbar.$refs.options.temporarilyAllowOptionAnimations(
        RemoveComponent.removeComponentCallback.bind(this, workshopComponent, componentToBeRemovedWithoutSelecting), true, true);
    }
  }
}

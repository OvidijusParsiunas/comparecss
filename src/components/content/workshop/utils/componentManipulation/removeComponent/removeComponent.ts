import { SyncChildComponent } from '../../../toolbar/options/syncChildComponent/syncChildComponent';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SetActiveComponentUtils } from '../utils/setActiveComponentUtils';
import ComponentJs from '../componentJs/componentJs';
import { ComponentOptions } from 'vue';

export class RemoveComponent {

  private static selectNextComponentAfterRemoving(workshopComponent: ComponentOptions, removedComponentIndex: number): void {
    const components = (workshopComponent.components as undefined as WorkshopComponent[]);
    const nextComponentIndex = removedComponentIndex === components.length ? removedComponentIndex - 1 : removedComponentIndex;
    SetActiveComponentUtils.switchActiveComponent(workshopComponent, components[nextComponentIndex]);
  }

  private static removeRefFromComponentsThisIsSyncedTo(componentToBeRemoved: WorkshopComponent): void {
    Object.keys(componentToBeRemoved.subcomponents).forEach((subcomponentName) => {
      const subcomponent = componentToBeRemoved.subcomponents[subcomponentName];
      if (subcomponent.seedComponent.sync.componentThisIsSyncedTo) {
        subcomponent.seedComponent.sync.componentThisIsSyncedTo.sync.componentsSyncedToThis.delete(subcomponent.seedComponent);
        subcomponent.seedComponent.sync.componentThisIsSyncedTo = null;
      }
    });
  }

  // this is used in cases where a button that was synced by a dropdown button that was synced in a child dropdown was removed,
  // the button inside the dropdown would need to be resynced by the dropdown components that are synced to it
  private static updateComponentsThatAreSyncedToComponentsThisIsSyncedTo(componentToBeRemoved: WorkshopComponent): void {
    (componentToBeRemoved.sync.componentsSyncedToThis || []).forEach((component: WorkshopComponent) => {
      SyncChildComponent.reSyncSubcomponentsSyncedToThisSubcomponent(component, componentToBeRemoved.type);
    });
  }

  private static removeInSync(componentToBeRemoved: WorkshopComponent): void {
    // used to allow components that have copied this to remove insync properties and dereference when they are opened up
    // more information can be found in the documentation reference: DOC: 7878
    componentToBeRemoved.componentStatus.isRemoved = true;
    setTimeout(() => {
      RemoveComponent.updateComponentsThatAreSyncedToComponentsThisIsSyncedTo(componentToBeRemoved);
      RemoveComponent.removeRefFromComponentsThisIsSyncedTo(componentToBeRemoved);
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

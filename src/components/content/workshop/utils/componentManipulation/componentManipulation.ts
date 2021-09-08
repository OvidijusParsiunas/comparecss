import { CopyChildComponentModeCardEvents } from '../../toolbar/options/copyChildComponent/modeUtils/copyChildComponentModeCardEvents';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../interfaces/subcomponentOrderDirections.enum';
import { AddTemporaryAddPreviewComponent } from './addNewChildComponent/addTemporaryAddPreviewComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { ChangeChildComponentAlignment } from './moveChildComponent/changeChildComponentAlignment';
import { AddNewSubcomponentEvent } from '../../../../../interfaces/addNewSubcomponentEvent';
import { ChangeChildComponentOrder } from './moveChildComponent/changeChildComponentOrder';
import { RemoveChildComponent } from './removeChildComponent/removeChildComponent';
import { AddNewChildComponent } from './addNewChildComponent/addNewChildComponent';
import { ALIGNED_SECTION_TYPES } from '../../../../../consts/layerSections.enum';
import { SetNewActiveSubcomponent } from './utils/setNewActiveSubcomponent';
import CopyComponent from './copyComponent/copyComponent';
import ComponentJs from '../generic/componentJs';
import { ComponentOptions } from 'vue';

export class ComponentManipulation {

  private static resetComponentModes(previousComponent: WorkshopComponent): void {
    if (!previousComponent) return;
    SetNewActiveSubcomponent.set(previousComponent, previousComponent.defaultSubcomponentName, true);
    Object.keys(previousComponent.subcomponents).forEach((key) => {
      const subcomponent: SubcomponentProperties = previousComponent.subcomponents[key];
      subcomponent.activeCssPseudoClass = subcomponent.defaultCssPseudoClass;
    });
  }

  private static switchActiveComponent(workshopComponent: ComponentOptions, component: WorkshopComponent): void {
    ComponentManipulation.resetComponentModes(workshopComponent.currentlySelectedComponent);
    if (workshopComponent.currentlySelectedComponent && workshopComponent.currentlySelectedComponent.type !== component.type) {
      ComponentJs.manipulateJSClasses(workshopComponent.currentlySelectedComponent.type, 'revokeJS');
    }
    workshopComponent.currentlySelectedComponent = component;
    ComponentJs.manipulateJSClasses(workshopComponent.currentlySelectedComponent.type, 'initializeJS');
    workshopComponent.$refs.toolbar.updateToolbarForNewComponent();
  }

  public static addNewComponent(workshopComponent: ComponentOptions, component: WorkshopComponent): void {
    (workshopComponent.components as undefined as WorkshopComponent[]).push(component);
    ComponentManipulation.switchActiveComponent(workshopComponent, component);
  }

  public static addNewSubcomponent(workshopComponent: ComponentOptions, addNewSubcomponentEvent: AddNewSubcomponentEvent): void {
    const [newComponentBaseName, isTemporaryAddPreview] = addNewSubcomponentEvent;
    if (isTemporaryAddPreview) {
      AddTemporaryAddPreviewComponent.add(workshopComponent.currentlySelectedComponent, newComponentBaseName);
    } else {
      AddNewChildComponent.add(workshopComponent.currentlySelectedComponent, newComponentBaseName);
    }
    workshopComponent.$refs.contents.refreshComponent();
  }

  public static removeSubcomponent(workshopComponent: ComponentOptions, isTemporaryAddPreview?: boolean): void {
    RemoveChildComponent.remove(workshopComponent.currentlySelectedComponent, isTemporaryAddPreview);
    workshopComponent.$refs.contents.refreshComponent();
  }

  public static changeSubcomponentOrder(workshopComponent: ComponentOptions, direction: SUBCOMPONENT_ORDER_DIRECTIONS,
      masterComponent: WorkshopComponent): void {
    ChangeChildComponentOrder.change(masterComponent, direction);
    workshopComponent.$refs.contents.refreshComponent();
  }

  public static changeSubcomponentAlignment(workshopComponent: ComponentOptions, previousAlignment: ALIGNED_SECTION_TYPES,
      newAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties, shouldSubcomponentNamesBeUpdated: boolean): void {
    ChangeChildComponentAlignment.change(previousAlignment, newAlignment, subcomponentProperties, shouldSubcomponentNamesBeUpdated,
      workshopComponent.currentlySelectedComponent);
    if (shouldSubcomponentNamesBeUpdated) workshopComponent.$refs.contents.refreshComponent();
  }

  public static copyComponent(workshopComponent: ComponentOptions, setActiveComponent: WorkshopComponent): void {
    const newComponent = CopyComponent.copyComponent(workshopComponent, setActiveComponent);
    ComponentManipulation.addNewComponent(workshopComponent, newComponent);
  }

  public static setActiveComponent(workshopComponent: ComponentOptions, component?: WorkshopComponent): void {
    if (workshopComponent.$refs.contents.isFullPreviewModeOn) {
      workshopComponent.componentSelectedBeforeFadeAnimation = component;
      return;
    }
    if (workshopComponent.componentSelectedBeforeFadeAnimation) {
      component = workshopComponent.componentSelectedBeforeFadeAnimation;
      workshopComponent.componentSelectedBeforeFadeAnimation = null;
    }
    if (!component) return;
    if (workshopComponent.isCopyChildComponentModeActive) {
      CopyChildComponentModeCardEvents.mouseClick(workshopComponent, component);
    } else if (workshopComponent.currentlySelectedComponent !== component) {
      ComponentManipulation.switchActiveComponent(workshopComponent, component);
    }
  }

  private static selectNextComponentAfterRemoving(workshopComponent: ComponentOptions, removedComponentIndex: number): void {
    const components = (workshopComponent.components as undefined as WorkshopComponent[]);
    const nextComponentIndex = removedComponentIndex === components.length ? removedComponentIndex - 1 : removedComponentIndex;
    ComponentManipulation.switchActiveComponent(workshopComponent, components[nextComponentIndex]);
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
    // used to allow components that have imported this to remove insync properties
    componentToBeRemoved.componentStatus.isRemoved = true;
    if (components.length === 0) {
      workshopComponent.$refs.toolbar.saveLastActiveOptionPriorToAllComponentsDeletion();
      workshopComponent.componentPreviewAssistance.margin = false;
      ComponentJs.manipulateJSClasses(componentToBeRemoved.type, 'revokeJS');
      workshopComponent.currentlySelectedComponent = undefined;
      return -1;
    }
    return componentToBeRemovedIndex;
  }

  public static removeComponent(workshopComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): void {
    // only switch after using the removal modal (componentToBeRemovedWithoutSelecting is undefined)
    // or not using the modal but directly removing the component that is currently selected
    if (!componentToBeRemovedWithoutSelecting || componentToBeRemovedWithoutSelecting === workshopComponent.currentlySelectedComponent) {
      const componentToBeRemovedIndex = ComponentManipulation.removeComponentCallback(workshopComponent, componentToBeRemovedWithoutSelecting);
      if (componentToBeRemovedIndex > -1) ComponentManipulation.selectNextComponentAfterRemoving(workshopComponent, componentToBeRemovedIndex);
    } else {
      workshopComponent.$refs.toolbar.$refs.options.temporarilyAllowOptionAnimations(
        ComponentManipulation.removeComponentCallback.bind(this, workshopComponent, componentToBeRemovedWithoutSelecting), true, true);
    }
  }
}

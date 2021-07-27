import { ImportComponentModeCardEvents } from '../../toolbar/options/importComponent/modeUtils/importComponentModeCardEvents';
import { RemoveTemporaryAddPreviewComponent } from './removeNestedComponent/removeTemporaryAddPreviewComponent';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../interfaces/subcomponentOrderDirections.enum';
import { AddTemporaryAddPreviewComponent } from './addNewNestedComponent/addTemporaryAddPreviewComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { ChangeNestedComponentAlignment } from './moveNestedComponent/changeNestedComponentAlignment';
import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../consts/baseSubcomponentNames.enum';
import { ChangeNestedComponentOrder } from './moveNestedComponent/changeNestedComponentOrder';
import { AddNewNestedComponent } from './addNewNestedComponent/addNewNestedComponent';
import { RemoveNestedComponent } from './removeNestedComponent/removeNestedComponent';
import { ALIGNED_SECTION_TYPES } from '../../../../../consts/layerSections.enum';
import CopyComponent from './copyComponent/copyComponent';
import ComponentJs from '../generic/componentJs';
import { ComponentOptions } from 'vue';
import { AddNewSubcomponentEvent } from '../../../../../interfaces/addNewSubcomponentEvent';

export class ComponentManipulation {

  private static resetComponentModes(previousComponent: WorkshopComponent): void {
    if (!previousComponent) return;
    previousComponent.activeSubcomponentName = previousComponent.defaultSubcomponentName;
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
    const [nestedComponentBaseName, isTemporaryAddPreview] = addNewSubcomponentEvent;
    if (isTemporaryAddPreview) {
      AddTemporaryAddPreviewComponent.add(workshopComponent.currentlySelectedComponent, nestedComponentBaseName);
    } else {
      AddNewNestedComponent.add(workshopComponent.currentlySelectedComponent, nestedComponentBaseName);
    }
    workshopComponent.$refs.contents.refreshComponent();
  }

  public static removeSubcomponent(workshopComponent: ComponentOptions, isTemporaryAddPreview?: boolean): void {
    const { currentlySelectedComponent } = workshopComponent;
    if (isTemporaryAddPreview) {
      RemoveTemporaryAddPreviewComponent.remove(currentlySelectedComponent);
    } else {
      RemoveNestedComponent.remove(currentlySelectedComponent);
    }
    workshopComponent.$refs.contents.refreshComponent();
  }

  public static changeSubcomponentOrder(workshopComponent: ComponentOptions, direction: SUBCOMPONENT_ORDER_DIRECTIONS,
      parentComponent: WorkshopComponent): void {
    ChangeNestedComponentOrder.change(parentComponent, direction);
    workshopComponent.$refs.contents.refreshComponent();
  }

  public static changeSubcomponentAlignment(workshopComponent: ComponentOptions, previousAlignment: ALIGNED_SECTION_TYPES,
      newAlignment: ALIGNED_SECTION_TYPES, subcomponentProperties: SubcomponentProperties, shouldSubcomponentNamesBeUpdated: boolean): void {
    ChangeNestedComponentAlignment.change(previousAlignment, newAlignment, subcomponentProperties, shouldSubcomponentNamesBeUpdated,
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
    if (workshopComponent.isImportComponentModeActive) {
      ImportComponentModeCardEvents.mouseClick(workshopComponent, component);
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

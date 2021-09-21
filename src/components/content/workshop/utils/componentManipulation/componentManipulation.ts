import { CopyChildComponentModeCardEvents } from '../../toolbar/options/copyChildComponent/modeUtils/copyChildComponentModeCardEvents';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../interfaces/subcomponentOrderDirections.enum';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { AddTemporaryAddPreviewComponent } from './addChildComponent/addTemporaryAddPreviewComponent';
import { ChangeChildComponentAlignment } from './moveChildComponent/changeChildComponentAlignment';
import { ChangeChildComponentOrder } from './moveChildComponent/changeChildComponentOrder';
import { AddChildComponentEvent } from '../../../../../interfaces/addChildComponentEvent';
import { RemoveChildComponent } from './removeChildComponent/removeChildComponent';
import { ALIGNED_SECTION_TYPES } from '../../../../../consts/layerSections.enum';
import { SetActiveComponentUtils } from './utils/setActiveComponentUtils';
import { AddChildComponent } from './addChildComponent/addChildComponent';
import { RemoveComponent } from './removeComponent/removeComponent';
import CopyComponent from './copyComponent/copyComponent';
import { ComponentOptions } from 'vue';

export class ComponentManipulation {

  public static addComponent(workshopComponent: ComponentOptions, component: WorkshopComponent): void {
    (workshopComponent.components as undefined as WorkshopComponent[]).push(component);
    SetActiveComponentUtils.switchActiveComponent(workshopComponent, component);
  }

  public static addChildComponent(workshopComponent: ComponentOptions, addChildComponentEvent: AddChildComponentEvent): void {
    const [newComponentBaseName, isTemporaryAddPreview] = addChildComponentEvent;
    if (isTemporaryAddPreview) {
      AddTemporaryAddPreviewComponent.add(workshopComponent.currentlySelectedComponent, newComponentBaseName);
    } else {
      AddChildComponent.add(workshopComponent.currentlySelectedComponent, newComponentBaseName);
    }
    workshopComponent.$refs.contents.refreshComponent();
  }

  public static removeChildComponent(workshopComponent: ComponentOptions, isTemporaryAddPreview?: boolean): void {
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
    ComponentManipulation.addComponent(workshopComponent, newComponent);
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
      SetActiveComponentUtils.switchActiveComponent(workshopComponent, component);
    }
  }

  public static removeComponent(workshopComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): void {
    RemoveComponent.remove(workshopComponent, componentToBeRemovedWithoutSelecting);
  }
}

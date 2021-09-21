import { AddTemporaryAddPreviewComponent } from '../utils/componentManipulation/addChildComponent/addTemporaryAddPreviewComponent';
import { ChangeChildComponentAlignment } from '../utils/componentManipulation/moveChildComponent/changeChildComponentAlignment';
import { ChangeSubcomponentAlignmentEvent, ChangeSubcomponentOrderEvent } from '../../../../interfaces/settingsComponentEvents';
import { ChangeChildComponentOrder } from '../utils/componentManipulation/moveChildComponent/changeChildComponentOrder';
import { RemoveChildComponent } from '../utils/componentManipulation/removeChildComponent/removeChildComponent';
import { AddChildComponent } from '../utils/componentManipulation/addChildComponent/addChildComponent';
import { RemoveComponent } from '../utils/componentManipulation/removeComponent/removeComponent';
import { AddComponent } from '../utils/componentManipulation/addComponent/addComponent';
import { AddChildComponentEvent } from '../../../../interfaces/addChildComponentEvent';
import CopyComponent from '../utils/componentManipulation/copyComponent/copyComponent';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

export default function useComponentManipulation(): any {

  const addComponent = (workshopComponent: ComponentOptions, component: WorkshopComponent): void => {
    AddComponent.add(workshopComponent, component);
  };

  const addChildComponent = (workshopComponent: ComponentOptions, addChildComponentEvent: AddChildComponentEvent): void => {
    const [newComponentBaseName, isTemporaryAddPreview] = addChildComponentEvent;
    if (isTemporaryAddPreview) {
      AddTemporaryAddPreviewComponent.add(workshopComponent.currentlySelectedComponent, newComponentBaseName);
    } else {
      AddChildComponent.add(workshopComponent.currentlySelectedComponent, newComponentBaseName);
    }
    workshopComponent.$refs.contents.refreshComponent();
  };

  const removeComponent = (workshopComponent: ComponentOptions, componentToBeRemovedWithoutSelecting: WorkshopComponent): void => {
    RemoveComponent.remove(workshopComponent, componentToBeRemovedWithoutSelecting);
  };

  const removeChildComponent = (workshopComponent: ComponentOptions, isTemporaryAddPreview?: boolean): void => {
    RemoveChildComponent.remove(workshopComponent.currentlySelectedComponent, isTemporaryAddPreview);
    workshopComponent.$refs.contents.refreshComponent();
  };

  const changeSubcomponentOrder = (workshopComponent: ComponentOptions, moveSubcomponentEvent: ChangeSubcomponentOrderEvent): void => {
    // WORK 2 - refactor
    ChangeChildComponentOrder.change(moveSubcomponentEvent[1], moveSubcomponentEvent[0]);
    workshopComponent.$refs.contents.refreshComponent();
  };

  const changeSubcomponentAlignment = (workshopComponent: ComponentOptions, changeSubcomponentAlignmentEvent: ChangeSubcomponentAlignmentEvent): void => {
    // WORK 2 - refactor
    ChangeChildComponentAlignment.change(changeSubcomponentAlignmentEvent[0], changeSubcomponentAlignmentEvent[1], changeSubcomponentAlignmentEvent[2], changeSubcomponentAlignmentEvent[3], workshopComponent.currentlySelectedComponent);
    if (changeSubcomponentAlignmentEvent[3]) workshopComponent.$refs.contents.refreshComponent();
  };

  const copyComponent = (workshopComponent: ComponentOptions, setActiveComponent: WorkshopComponent): void => {
    const newComponent = CopyComponent.copyComponent(workshopComponent, setActiveComponent);
    addComponent(workshopComponent, newComponent);
  };

  return {
    addComponent,
    addChildComponent,
    removeComponent,
    removeChildComponent,
    changeSubcomponentOrder,
    changeSubcomponentAlignment,
    copyComponent,
  };
}

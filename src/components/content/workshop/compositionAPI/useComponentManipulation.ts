import { ChangeChildComponentAlignmentEvent, ChangeChildComponentOrderEvent, RemoveChildComponentEvent } from '../../../../interfaces/settingsComponentEvents';
import { AddTemporaryAddPreviewComponent } from '../utils/componentManipulation/addChildComponent/addTemporaryAddPreviewComponent';
import { ChangeChildComponentAlignment } from '../utils/componentManipulation/moveChildComponent/changeChildComponentAlignment';
import { ChangeChildComponentOrder } from '../utils/componentManipulation/moveChildComponent/changeChildComponentOrder';
import { RemoveChildComponent } from '../utils/componentManipulation/removeChildComponent/removeChildComponent';
import { AddChildComponent } from '../utils/componentManipulation/addChildComponent/addChildComponent';
import { RemoveComponent } from '../utils/componentManipulation/removeComponent/removeComponent';
import { UseComponentManipulation } from '../../../../interfaces/useComponentManipulation';
import { CopyComponent } from '../utils/componentManipulation/copyComponent/copyComponent';
import { AddComponent } from '../utils/componentManipulation/addComponent/addComponent';
import { AddChildComponentEvent } from '../../../../interfaces/addChildComponentEvent';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

export default function useComponentManipulation(): UseComponentManipulation {

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
    workshopComponent.$refs.contents.refreshCurrentComponent();
  };

  const removeComponent = (workshopComponent: ComponentOptions, componentToBeRemovedWithoutSelecting?: WorkshopComponent): void => {
    RemoveComponent.remove(workshopComponent, componentToBeRemovedWithoutSelecting);
  };

  const removeChildComponent = (workshopComponent: ComponentOptions, removeChildComponentEvent: RemoveChildComponentEvent): void => {
    const [shouldSubcomponentNamesBeUpdated, isTemporaryAddPreview] = removeChildComponentEvent;
    RemoveChildComponent.remove(workshopComponent.currentlySelectedComponent, isTemporaryAddPreview);
    if (shouldSubcomponentNamesBeUpdated) workshopComponent.$refs.contents.refreshCurrentComponent();
  };

  const changeChildComponentOrder = (workshopComponent: ComponentOptions, moveSubcomponentEvent: ChangeChildComponentOrderEvent): void => {
    ChangeChildComponentOrder.change(...moveSubcomponentEvent);
    workshopComponent.$refs.contents.refreshCurrentComponent();
  };

  const changeChildComponentAlignment = (workshopComponent: ComponentOptions, changeChildComponentAlignmentEvent: ChangeChildComponentAlignmentEvent): void => {
    ChangeChildComponentAlignment.change(workshopComponent.currentlySelectedComponent, ...changeChildComponentAlignmentEvent);
    const shouldSubcomponentNamesBeUpdated = changeChildComponentAlignmentEvent[3];
    if (shouldSubcomponentNamesBeUpdated) workshopComponent.$refs.contents.refreshCurrentComponent();
  };

  const copyComponent = (workshopComponent: ComponentOptions, setActiveComponent: WorkshopComponent): void => {
    const newComponent = CopyComponent.copy(workshopComponent, setActiveComponent);
    addComponent(workshopComponent, newComponent);
  };

  return {
    addComponent,
    addChildComponent,
    removeComponent,
    removeChildComponent,
    changeChildComponentOrder,
    changeChildComponentAlignment,
    copyComponent,
  };
}

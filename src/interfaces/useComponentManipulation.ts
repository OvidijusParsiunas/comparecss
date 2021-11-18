import { ChangeChildComponentAlignmentEvent, ChangeChildComponentOrderEvent, RemoveChildComponentEvent } from './settingsComponentEvents';
import { AddChildComponentEvent } from './addChildComponentEvent';
import { WorkshopComponent } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface UseComponentManipulation {
  addComponent: (workshopComponent: ComponentOptions, component: WorkshopComponent) => void;
  addChildComponent: (workshopComponent: ComponentOptions, addChildComponentEvent: AddChildComponentEvent) => void;
  removeComponent: (workshopComponent: ComponentOptions, componentToBeRemovedWithoutSelecting?: WorkshopComponent) => void;
  removeChildComponent: (workshopComponent: ComponentOptions, removeChildComponentEvent: RemoveChildComponentEvent) => void;
  changeChildComponentOrder: (workshopComponent: ComponentOptions, moveSubcomponentEvent: ChangeChildComponentOrderEvent) => void;
  changeChildComponentAlignment: (workshopComponent: ComponentOptions, changeChildComponentAlignmentEvent: ChangeChildComponentAlignmentEvent) => void;
  copyComponent: (workshopComponent: ComponentOptions, setActiveComponent: WorkshopComponent) => void;
}

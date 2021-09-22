import { ChangeSubcomponentAlignmentEvent, ChangeSubcomponentOrderEvent } from './settingsComponentEvents';
import { AddChildComponentEvent } from './addChildComponentEvent';
import { WorkshopComponent } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface UseComponentManipulation {
  addComponent: (workshopComponent: ComponentOptions, component: WorkshopComponent) => void;
  addChildComponent: (workshopComponent: ComponentOptions, addChildComponentEvent: AddChildComponentEvent) => void;
  removeComponent: (workshopComponent: ComponentOptions, componentToBeRemovedWithoutSelecting?: WorkshopComponent) => void;
  removeChildComponent: (workshopComponent: ComponentOptions, isTemporaryAddPreview?: boolean) => void;
  changeSubcomponentOrder: (workshopComponent: ComponentOptions, moveSubcomponentEvent: ChangeSubcomponentOrderEvent) => void;
  changeSubcomponentAlignment: (workshopComponent: ComponentOptions, changeSubcomponentAlignmentEvent: ChangeSubcomponentAlignmentEvent) => void;
  copyComponent: (workshopComponent: ComponentOptions, setActiveComponent: WorkshopComponent) => void;
}

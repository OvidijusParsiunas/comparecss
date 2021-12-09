import { WorkshopComponent } from './workshopComponent';

export interface ComponentSwitchFuncs {
  onDisplay?: (component: WorkshopComponent) => void;
  onLeave?: (component: WorkshopComponent) => void;
}

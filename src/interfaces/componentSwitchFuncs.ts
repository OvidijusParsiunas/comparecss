import { WorkshopComponent } from './workshopComponent';

export interface ComponentSwitchFuncs {
  onDisplay?: (nextComponent: WorkshopComponent) => void;
  onLeave?: (previousComponent: WorkshopComponent) => void;
}

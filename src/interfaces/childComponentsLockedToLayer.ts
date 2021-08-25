import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';

export class ChildComponentsInLayer {
  add: (containerComponent: WorkshopComponent) => WorkshopComponent[];
  list: SubcomponentProperties[];
}

import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';

export class ChildComponentsInLayer {
  add: (parentComponent: WorkshopComponent) => WorkshopComponent[];
  list: SubcomponentProperties[];
}

import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';

export class NestedComponentsInLayer {
  add: (parentComponent: WorkshopComponent) => WorkshopComponent[];
  list: SubcomponentProperties[];
}

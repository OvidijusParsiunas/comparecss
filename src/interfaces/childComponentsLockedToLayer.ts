import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';

export class ChildComponentsInLayer {
  add: (containerComponent: WorkshopComponent, isTemporary?: boolean) => WorkshopComponent[];
  list: SubcomponentProperties[];
}

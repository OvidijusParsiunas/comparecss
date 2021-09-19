import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';

export class ChildComponentsInLayer {
  add: (newComponent: WorkshopComponent, containerComponent: WorkshopComponent) => WorkshopComponent[];
  list: SubcomponentProperties[];
}

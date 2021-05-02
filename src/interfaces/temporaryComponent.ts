import { SubcomponentAndOverlayElementIds } from './subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from './subcomponentPreviewMouseEvents';
import { WorkshopComponent } from './workshopComponent';

export interface TemporaryComponent {
  component: WorkshopComponent,
  mouseEvents: SubcomponentPreviewMouseEvents,
  subcomponentAndOverlayElementIds: SubcomponentAndOverlayElementIds;
}

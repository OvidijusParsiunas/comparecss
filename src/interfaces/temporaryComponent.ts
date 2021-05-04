import { SubcomponentAndOverlayElementIds } from './subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from './subcomponentPreviewMouseEvents';
import { WorkshopComponent } from './workshopComponent';

export interface TemporaryComponent {
  displayed?: boolean;
  component: WorkshopComponent;
  mouseEvents: SubcomponentPreviewMouseEvents;
  subcomponentAndOverlayElementIds: SubcomponentAndOverlayElementIds;
}

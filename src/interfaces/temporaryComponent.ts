import { SubcomponentAndOverlayElementIds } from './subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from './subcomponentPreviewMouseEvents';
import { WorkshopComponent } from './workshopComponent';

// WORK1: isFullPreviewModeOn should be attached to the ComponentPreview component
export interface TemporaryComponent {
  isFullPreviewModeOn?: boolean;
  displayed?: boolean;
  component: WorkshopComponent;
  mouseEvents: SubcomponentPreviewMouseEvents;
  subcomponentAndOverlayElementIds: SubcomponentAndOverlayElementIds;
}

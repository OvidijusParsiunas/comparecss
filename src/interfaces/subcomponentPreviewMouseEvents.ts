import { UseSubcomponentPreviewEventHandlers } from './useSubcomponentPreviewEventHandlers';

export type SubcomponentPreviewMouseEvents = {
  [subcomponentId: string]: UseSubcomponentPreviewEventHandlers;
}

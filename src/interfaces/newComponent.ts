import { WorkshopComponent } from './workshopComponent';

export interface NewComponent {
  getNewComponent: (baseName?: string, importId?: number) => WorkshopComponent;
}

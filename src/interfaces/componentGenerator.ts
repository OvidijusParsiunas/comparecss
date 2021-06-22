import { WorkshopComponent } from './workshopComponent';

export interface ComponentGenerator {
  createNewComponent: (baseName?: string) => WorkshopComponent;
}

import { WorkshopComponent } from './workshopComponent';

export interface ComponentGenerator {
  createNewComponent: (baseName?: string, importId?: number, subcomponentText?: string) => WorkshopComponent;
}

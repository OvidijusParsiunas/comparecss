import { WorkshopComponent } from './workshopComponent';

export type CreateNewComponent = (baseName?: string, paddingComponent?: WorkshopComponent) => WorkshopComponent;

export interface ComponentGenerator {
  createNewComponent: CreateNewComponent;
}

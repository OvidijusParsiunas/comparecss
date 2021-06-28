import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AlertBuilder } from './alertBuilder';

export const defaultAlert: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return AlertBuilder.create({ baseName });
  },
};

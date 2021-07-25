import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { imageBase } from './base';

export const defaultImage: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return imageBase.createNewComponent(baseName);
  },
};

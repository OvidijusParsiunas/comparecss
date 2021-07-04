import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ButtonBuilder } from './buttonBuilder';

export const defaultButton: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return ButtonBuilder.create({ baseName });
  },
};

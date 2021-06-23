import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ButtonBuilder } from './buttonBuilder';

export const defaultButton: ComponentGenerator = {
  // WORK1: on hover button change color text option - and fix mouse leave bug
  createNewComponent(importedComponentBaseName: string): WorkshopComponent {
    return ButtonBuilder.create({ baseName: importedComponentBaseName });
  },
};


import { ComponentGenerator } from '../../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { dropdownMenuBase } from './base';

export const defaultDropdownMenu: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return dropdownMenuBase.createNewComponent(baseName);
  },
}

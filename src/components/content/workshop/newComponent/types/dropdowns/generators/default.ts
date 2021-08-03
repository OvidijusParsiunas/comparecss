import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { dropdownBase } from './base';

export const defaultDropdown: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const dropdownComponent = dropdownBase.createNewComponent(baseName);
    return dropdownComponent;
  },
}

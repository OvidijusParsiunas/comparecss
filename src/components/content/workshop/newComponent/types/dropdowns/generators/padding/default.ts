import { ComponentGenerator } from '../../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { dropdownPaddingBase } from './base';

export const defaultDropdownPadding: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return dropdownPaddingBase.createNewComponent(baseName);
  },
}

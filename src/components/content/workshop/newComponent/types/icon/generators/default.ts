import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { iconBase } from './base';

export const defaultIcon: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const iconComponent = iconBase.createNewComponent(baseName);
    return iconComponent;
  },
};

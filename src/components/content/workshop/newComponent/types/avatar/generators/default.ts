import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { avatarBase } from './base';

export const defaultAvatar: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return avatarBase.createNewComponent(baseName);
  },
};

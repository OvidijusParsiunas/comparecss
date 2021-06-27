import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AvatarBuilder } from './avatarBuilder';

export const defaultAvatar: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return AvatarBuilder.create({ baseName });
  },
};

import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { imageBase } from './base';

export const defaultImage: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    return imageBase.createNewComponent(presetProperties);
  },
};

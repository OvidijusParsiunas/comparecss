import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { layerBase } from './base';

export const defaultLayer: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return layerBase.createNewComponent(baseName);
  },
};

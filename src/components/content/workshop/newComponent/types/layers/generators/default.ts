import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { LayerBuilder } from './layerBuilder';

export const defaultLayer: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    return LayerBuilder.create({ baseName });
  },
};

import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { layerBase } from './base';

export const defaultLayer: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    return layerBase.createNewComponent(presetProperties);
  },
};

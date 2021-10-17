import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { iconBase } from './base';

export const defaultIcon: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const iconComponent = iconBase.createNewComponent(presetProperties);
    return iconComponent;
  },
};

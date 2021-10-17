import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { TextSpecificSettings } from '../settings/textSpecificSettings';
import { textBase } from './base';

export const defaultText: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const textComponent = textBase.createNewComponent(presetProperties);
    TextSpecificSettings.set(textComponent);
    return textComponent;
  },
};

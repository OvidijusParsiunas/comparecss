import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { TextSpecificSettings } from '../settings/textSpecificSettings';
import { textBase } from './base';

export const defaultText: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const textComponent = textBase.createNewComponent(baseName);
    TextSpecificSettings.set(textComponent);
    return textComponent;
  },
};

import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { textSpecificSettings } from '../settings/textSpecificSettings';
import { textBase } from './base';

function addSubcomponentSpecificSettings(textComponent: WorkshopComponent): void {
  textComponent.coreSubcomponentRefs.base.subcomponentSpecificSettings = textSpecificSettings;
}

export const defaultText: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const textComponent = textBase.createNewComponent(baseName);
    addSubcomponentSpecificSettings(textComponent);
    return textComponent;
  },
};
